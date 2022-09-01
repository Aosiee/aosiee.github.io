set outputLog=%1
set customGitMessage=%2
set dateTime=%3


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
