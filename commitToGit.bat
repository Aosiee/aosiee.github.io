set dateTime=%1

set /p customGitMessage="Add Custom Commit Message: "

::--------------------------------------------------------
::\ Safety Pull \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
git pull

::--------------------------------------------------------
::\ Mark Version \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
git rev-list --count main > %~dp0\git-version.txt

::Get Git Count as a Var
set /p gitCount=<git-version.txt

::--------------------------------------------------------
::\ Add Changes  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
::Add Changes to Directory
git add %~dp0\

::--------------------------------------------------------
::\ Commit Message & Commit \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
::If Blank, Skip to Generic Commit, Else Continue
if [%customGitMessage%] == [] goto genericCommit
::--------------------------------------------------------
::Create Custom Git Message // Auto Commit from Bat File
set gitMessage="%customGitMessage% - Automated Commit - %gitCount% - %dateTime%"
::--------------------------------------------------------
::Custom Message Commit
echo Custom Commit!
git commit -am %gitMessage%
goto push
::--------------------------------------------------------
::Generic Message if != Custom Message
:genericCommit
echo Generic Commit!
::--------------------------------------------------------
::Set Generic Commit Message
set genericGitMessage="Generic Commit - Automated Commit - %gitCount% - %dateTime%"
git commit -am %genericGitMessage%
goto push

::--------------------------------------------------------
::\ Push \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
:push
git push
::--------------------------------------------------------