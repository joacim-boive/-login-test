::
::	Filename: WRITE_Index.cmd
::
::	This program adds lines of text in Index.html
::	
::++++++++++++++++++++++++++++ Modification history ++++++++++++++++++++++++++++
:: When		Who	What
:: ----------   ------	--------------------------------------------------------
:: 2016-01-13	LEJA11	Original
:: 2017-01-26	JOLI44	Read version number from build-number.txt
::==============================================================================
::
:SET_UP:
::
@echo OFF
::
::================================ Preparations ================================
::
:CRE_VARS:						&:: Create variables
::
set APP_DIR=%1%
set APP_NAM=%2%
set APP_VER="unknown"
set version_file=%APP_DIR%\build-number.txt

if exist %version_file% (
    for /f "delims=" %%x in (%version_file%) do set APP_VER=%%x
)

set TEXT_FILE=%APP_DIR%\index.html
::
set TEXT_LINE1=Application : %APP_NAM% 
set TEXT_LINE2=Build number: %APP_VER%
set TEXT_LINE3=Deploy time : %DATE% %TIME%
set TEXT_LINE4=Hostname    : %COMPUTERNAME%
::
::=============================== Start program ================================
::
:START:
::
echo ^<!-- >> %TEXT_FILE%
echo %TEXT_LINE1% >> %TEXT_FILE%
echo %TEXT_LINE2% >> %TEXT_FILE%
echo %TEXT_LINE3% >> %TEXT_FILE%
echo %TEXT_LINE4% >> %TEXT_FILE%
echo --^> >> %TEXT_FILE%
::
::=============================== End of program ===============================
::
:FINISH:
::
echo ON