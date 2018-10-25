Param (
    [Parameter(Mandatory=$True)]
    [string] $ApplicationName,
    [Parameter(Mandatory=$True)]
    [string] $NlogConfigPath,
    [Parameter(Mandatory=$True)]
    [string] $RootLogPath
)
$xml = [xml](Get-Content $NlogConfigPath)
$nodeApplicationName = $xml.nlog.variable | where {$_.Name -eq 'applicationName'}
$nodeApplicationName.value = $ApplicationName
$nodeRootAppLogPath = $xml.nlog.variable | where {$_.Name -eq 'rootAppLogPath'}
$nodeRootAppLogPath.value = $(Join-Path -Path $RootLogPath -ChildPath $ApplicationName) + ""
$xml.Save($NlogConfigPath)
