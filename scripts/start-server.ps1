param(
  [int]$Port = 3000
)

$Root = Split-Path -Parent $PSScriptRoot
$NextCli = Join-Path $Root "node_modules\next\dist\bin\next"
$NodeExe = "C:\Program Files\nodejs\node.exe"
$LogFile = Join-Path $Root "server.log"

if (-not (Test-Path -LiteralPath $NodeExe)) {
  $NodeExe = "node"
}

Set-Location -LiteralPath $Root
"[$(Get-Date -Format o)] Starting EverydayFresh server on port $Port" | Out-File -FilePath $LogFile -Append
& $NodeExe $NextCli start -p $Port 2>&1 | Tee-Object -FilePath $LogFile -Append
"[$(Get-Date -Format o)] Server exited with code $LASTEXITCODE" | Out-File -FilePath $LogFile -Append
Start-Sleep -Seconds 3600
