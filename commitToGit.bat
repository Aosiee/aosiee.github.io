set dateTime=%1

echo Add Custom Commit Message: >> CON
set /p customGitMessage

echo Custom Commit Message = %customGitMessage% >> CON 

::Param Safety // Error
if [%dateTime%] == [] goto errorParam

::--------------------------------------------------------
::\ Safety Pull \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
echo Pulling Changes >> CON
echo Pulling Changes
echo.
git pull
echo.
echo Pulled Changes >> CON
echo Pulled Changes
echo.

::--------------------------------------------------------
::\ Mark Version \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
echo Getting Revision Count >> CON
echo Getting Revision Count

echo.
git rev-list --count main > %~dp0\git-version.txt
echo.

::Get Git Count as a Var
set /p gitCount=<git-version.txt

echo Set Revision Number >> CON
echo Set Revision Number
echo.

::--------------------------------------------------------
::\ Add Changes  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
::Add Changes to Directory
echo Adding Changes in Directory >> CON
echo Adding Changes in Directory

echo.
git add %~dp0\
echo.

echo Added Changes in Directory >> CON
echo Added Changes in Directory
echo.

::--------------------------------------------------------
::\ Commit Message & Commit \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
::If Blank, Skip to Generic Commit, Else Continue
if [%customGitMessage%] == [] goto genericCommit
::--------------------------------------------------------
::Create Custom Git Message // Auto Commit from Bat File
set gitMessage="%customGitMessage% - Automated Commit - %gitCount% - %dateTime%"

echo Created Custom Commit Message >> CON
echo Created Custom Commit Message
::--------------------------------------------------------
::Custom Message Commit
echo Committing with a Custom Commit! >> CON
echo Committing with a Custom Commit!

echo.
git commit -am %gitMessage%
echo.

echo Completed Custom Commit!
echo Completed Custom Commit! >> CON
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
echo Pushing Changes

echo.
git push
echo.

echo Pushed Changes >> CON
echo Pushed Changes 
echo.

GOTO :EOF

::--------------------------------------------------------
::\ Error \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
:errorParam
echo Failed Running Bat, as no Date Specified
echo Failed Running Bat, as no Date Specified >> CON
pause
GOTO :EOF