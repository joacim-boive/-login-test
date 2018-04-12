Param (
    [Parameter(Mandatory=$True)]
    [string] $versionJsonPath,
    [Parameter(Mandatory=$True)]
    [string] $hostName
)

$json = Get-Content $versionJsonPath -Raw | ConvertFrom-Json
$json | Add-Member -Name DeployTime -MemberType NoteProperty -Value "" -Force
$json | Add-Member -Name DeployHost -MemberType NoteProperty -Value "" -Force
$json.DeployTime = $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
$json.DeployHost = $hostName
$json | ConvertTo-Json | Set-Content $versionJsonPath
