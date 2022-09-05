set dateTime=%1

set /p customGitMessage="Add Custom Commit Message: " >> CON

::Param Safety // Error
if [%dateTime%] == [] goto errorParam

::--------------------------------------------------------
::\ Safety Pull \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
echo Pulling Changes >> CON
git pull
echo.

::--------------------------------------------------------
::\ Mark Version \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
echo Getting Revision Count >> CON

git rev-list --count main > %~dp0\git-version.txt

::Get Git Count as a Var
set /p gitCount=<git-version.txt

echo Set Revision Number >> CON
echo.

::--------------------------------------------------------
::\ Add Changes  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
::Add Changes to Directory
echo Adding Changes in Directory >> CON
git add %~dp0\
echo Added Changes in Directory >> CON
echo.

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
echo Committing with a Custom Commit! >> CON
git commit -am %gitMessage%
echo Committed! >> CON
echo.

::--------------------------------------------------------
::Generic Message if != Custom Message
:genericCommit
echo Generic Commit!
::--------------------------------------------------------
::Set Generic Commit Message
echo Committing with a Generic Commit! >> CON
set genericGitMessage="Generic Commit - Automated Commit - %gitCount% - %dateTime%"
git commit -am %genericGitMessage%
echo Committed! >> CON
echo.

::--------------------------------------------------------
::\ Push \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
:push
echo Pushing Changes >> CON
git push
echo Completed Pushing Changes >> CON
echo.

GOTO :EOF

::--------------------------------------------------------
::\ Error \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
:errorParam
echo Failed Running Bat, as no Date Specified
pause
GOTO :EOF