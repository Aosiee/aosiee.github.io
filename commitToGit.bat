set dateTime=%1

set /p customGitMessage="Add Custom Commit Message: "

::--------------------------------------------------------
::Commit Message Add Custom // Auto Commit from Bat File
set gitMessage="%customGitMessage% - Automated Commit - %dateTime%"
::--------------------------------------------------------
::Safety Pull
git pull
::--------------------------------------------------------
::Add Changes to Directory
git add %~dp0\
::--------------------------------------------------------
::If Blank, Skip to Generic Commit, Else Continue
if [%customGitMessage%] == [] goto genericCommit
::--------------------------------------------------------

::Custom Message Commit
echo Custom Commit!
git commit -am %gitMessage%
goto push

::Generic Message if != Custom Message
:genericCommit
echo Generic Commit!

set genericGitMessage="Generic Commit - Automated Commit - %dateTime%"
git commit -am %genericGitMessage%
goto push

:push
git push
