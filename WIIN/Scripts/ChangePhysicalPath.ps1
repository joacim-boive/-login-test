Param (
    [Parameter(Mandatory=$True)]
    [string] $ApplicationNamePath,
    [Parameter(Mandatory=$True)]
    [string] $NewPhysicalPath
)

Import-Module ServerManager
Add-WindowsFeature Web-Scripting-Tools
Import-Module WebAdministration

Write-Host "Changing physical path for $ApplicationNamePath to $NewPhysicalPath"

Set-ItemProperty $ApplicationNamePath -name physicalPath -value $NewPhysicalPath
