set outputLog=%1
set dateTime=%2

set /p customGitMessage="Add Custom Commit Message: "

::--------------------------------------------------------
::Commit Message Add Custom // Auto Commit from Bat File
set gitMessage="%customGitMessage% - Automated Commit - %dateTime%"
::--------------------------------------------------------
::Safety Pull
git pull >> %outputLog%
::--------------------------------------------------------
::Add Changes to Directory
git add %~dp0\ >> %outputLog%
::--------------------------------------------------------
::If Blank, Skip to Generic Commit, Else Continue
if %gitMessage%=="" goto genericCommit
::--------------------------------------------------------

::Custom Message Commit
git commit -am %gitMessage% >> %outputLog%
goto push

::Generic Message if != Custom Message
:genericCommit

set customGitMessage="Generic Commit"
git commit -am %gitMessage% >> %outputLog%
goto push

:push
git push >> %outputLog%
