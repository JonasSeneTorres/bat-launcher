param(
  [string]$PipeName = $env:BAT_LAUNCHER_PIPE,
  [string]$Script = $env:BAT_LAUNCHER_SCRIPT,
  [string]$Cwd = $env:BAT_LAUNCHER_CWD,
  [string]$Token = $env:BAT_LAUNCHER_TOKEN
)

$ErrorActionPreference = 'Stop'
$pipeName = $PipeName
$scriptPath = $Script
$workingDirectory = $Cwd
$authToken = $Token
$pipe = $null
$writer = $null
$reader = $null
$process = $null
$inputTask = $null
$inputClosed = $false

function Send-RunnerMessage {
  param(
    [string]$Type,
    [string]$Text
  )
  if ($null -eq $script:writer) {
    return
  }
  $payload = @{ type = $Type; text = $Text } | ConvertTo-Json -Compress
  $script:writer.WriteLine($payload)
}

function Stop-ProcessTree {
  param(
    [System.Diagnostics.Process]$Target
  )
  if ($null -eq $Target -or $Target.HasExited) {
    return
  }
  try {
    $killer = Start-Process -FilePath 'taskkill.exe' -ArgumentList @('/PID', [string]$Target.Id, '/T', '/F') -NoNewWindow -PassThru -Wait -ErrorAction Stop
    $killer.ExitCode | Out-Null
    return
  } catch {
    
  }
  try {
    $Target.Kill()
  } catch {
    
  }
}

try {
  $pipe = [System.IO.Pipes.NamedPipeClientStream]::new('.', $pipeName, [System.IO.Pipes.PipeDirection]::InOut, [System.IO.Pipes.PipeOptions]::Asynchronous)
  $pipe.Connect(30000)
  $encoding = [System.Text.UTF8Encoding]::new($false)
  $writer = [System.IO.StreamWriter]::new($pipe, $encoding, 4096, $true)
  $writer.AutoFlush = $true
  $writer.NewLine = "`n"
  $reader = [System.IO.StreamReader]::new($pipe, $encoding, $false, 4096, $true)
  Send-RunnerMessage 'auth' $authToken

  $processInfo = [System.Diagnostics.ProcessStartInfo]::new()
  $processInfo.FileName = $env:ComSpec
  $processInfo.Arguments = '/d /s /c chcp 65001 >nul & call "' + $scriptPath + '"'
  $processInfo.WorkingDirectory = $workingDirectory
  $processInfo.UseShellExecute = $false
  $processInfo.CreateNoWindow = $true
  $processInfo.RedirectStandardInput = $true
  $processInfo.RedirectStandardOutput = $true
  $processInfo.RedirectStandardError = $true
  if ($processInfo.PSObject.Properties['StandardInputEncoding']) {
    $processInfo.StandardInputEncoding = $encoding
  }
  if ($processInfo.PSObject.Properties['StandardOutputEncoding']) {
    $processInfo.StandardOutputEncoding = $encoding
  }
  if ($processInfo.PSObject.Properties['StandardErrorEncoding']) {
    $processInfo.StandardErrorEncoding = $encoding
  }
  $process = [System.Diagnostics.Process]::new()
  $process.StartInfo = $processInfo
  $process.Start() | Out-Null
  Send-RunnerMessage 'ready' ''

  $stdoutBuffer = [char[]]::new(4096)
  $stderrBuffer = [char[]]::new(4096)
  $stdoutTask = $process.StandardOutput.ReadAsync($stdoutBuffer, 0, $stdoutBuffer.Length)
  $stderrTask = $process.StandardError.ReadAsync($stderrBuffer, 0, $stderrBuffer.Length)
  $inputTask = $reader.ReadLineAsync()

  while ($true) {
    $didWork = $false
    if ($null -ne $stdoutTask -and $stdoutTask.IsCompleted) {
      $didWork = $true
      try {
        $count = $stdoutTask.Result
        if ($count -gt 0) {
          $text = [System.String]::new($stdoutBuffer, 0, $count)
          Send-RunnerMessage 'stdout' $text
          $stdoutTask = $process.StandardOutput.ReadAsync($stdoutBuffer, 0, $stdoutBuffer.Length)
        } else {
          $stdoutTask = $null
        }
      } catch {
        Send-RunnerMessage 'stderr' ($_.Exception.Message + [Environment]::NewLine)
        $stdoutTask = $null
      }
    }
    if ($null -ne $stderrTask -and $stderrTask.IsCompleted) {
      $didWork = $true
      try {
        $count = $stderrTask.Result
        if ($count -gt 0) {
          $text = [System.String]::new($stderrBuffer, 0, $count)
          Send-RunnerMessage 'stderr' $text
          $stderrTask = $process.StandardError.ReadAsync($stderrBuffer, 0, $stderrBuffer.Length)
        } else {
          $stderrTask = $null
        }
      } catch {
        Send-RunnerMessage 'stderr' ($_.Exception.Message + [Environment]::NewLine)
        $stderrTask = $null
      }
    }
    if ($null -ne $inputTask -and $inputTask.IsCompleted) {
      $didWork = $true
      try {
        $line = $inputTask.Result
        if ($null -eq $line) {
          $inputClosed = $true
          $inputTask = $null
          if (-not $process.HasExited) {
            $process.StandardInput.Close()
            Stop-ProcessTree $process
          }
        } else {
          $message = $line | ConvertFrom-Json
          if ($message.type -eq 'input') {
            $process.StandardInput.WriteLine([string]$message.text)
            $process.StandardInput.Flush()
          } elseif ($message.type -eq 'cancel') {
            Stop-ProcessTree $process
          }
          if (-not $inputClosed) {
            $inputTask = $reader.ReadLineAsync()
          }
        }
      } catch {
        $inputTask = $null
      }
    }

    $outputFinished = $null -eq $stdoutTask -and $null -eq $stderrTask
    if ($process.HasExited -and $outputFinished) {
      break
    }
    if (-not $didWork) {
      Start-Sleep -Milliseconds 10
    }
  }

  $process.WaitForExit()
  Send-RunnerMessage 'exit' ([string]$process.ExitCode)
} catch {
  Send-RunnerMessage 'error' $_.Exception.Message
  if ($null -ne $process -and -not $process.HasExited) {
    Stop-ProcessTree $process
  }
  exit 1
} finally {
  if ($null -ne $writer) {
    $writer.Flush()
    $writer.Dispose()
  }
  if ($null -ne $reader) {
    $reader.Dispose()
  }
  if ($null -ne $pipe) {
    $pipe.Dispose()
  }
}
