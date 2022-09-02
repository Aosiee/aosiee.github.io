set outputLog=%1
set dateTime=%2

set /p customGitMessage="Add Custom Commit Message: "

::Commit Message Add Custom // Auto Commit from Bat File
set gitMessage="%customGitMessage% - A.C.f.B.F - %dateTime%"

::Safety Pull
git pull >> %outputLog%

::Add Changes to Directory
git add %~dp0\ >> %outputLog%

::Commit
git commit -am %gitMessage% >> %outputLog%

::Push
git push >> %outputLog%
