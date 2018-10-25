Param (
    [Parameter(Mandatory=$True)]
    [string] $ApplicationName,
    [Parameter(Mandatory=$True)]
    [string] $NlogConfigPath
)
$xml = [xml](Get-Content $NlogConfigPath)
$node = $xml.nlog.variable | where {$_.Name -eq 'applicationName'}
$node.value = $ApplicationName
$xml.Save($NlogConfigPath)
