set outputLog=%1
set dateTime=%2

set /p customGitMessage="Add Custom Commit Message: "

::Commit Message Add Custom // Auto Commit from Bat File
set gitMessage="%customGitMessage% - Automated Commit - %dateTime%"

::Safety Pull
git pull >> %outputLog%

::Add Changes to Directory
git add %~dp0\ >> %outputLog%

if %gitMessage%=="" set %gitMessage%="Generic Push"

::Commit
git commit -am %gitMessage% >> %outputLog%

::Push
git push >> %outputLog%
