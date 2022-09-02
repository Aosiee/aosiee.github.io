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
if [%customGitMessage%] == [] goto genericCommit
::--------------------------------------------------------

::Custom Message Commit
echo Custom Commit!
git commit -am %gitMessage% >> %outputLog%
goto push

::Generic Message if != Custom Message
:genericCommit
echo Generic Commit!

set genericGitMessage="Generic Commit - Automated Commit - %dateTime%"
git commit -am %genericGitMessage% >> %outputLog%
goto push

:push
git push >> %outputLog%
