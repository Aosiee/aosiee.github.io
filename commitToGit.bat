set dateTime=%1

set /p customGitMessage="Add Custom Commit Message: " >> CON

::Param Safety // Error
if [%dateTime%] == [] goto errorParam

::--------------------------------------------------------
::\ Safety Pull \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
<<<<<<< HEAD
echo Pulling Changes >> CON
git pull
echo.
=======
git pull
>>>>>>> 405ad0f6c1dfa8d6062c290ed2672b0f53455d86

::--------------------------------------------------------
::\ Mark Version \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
<<<<<<< HEAD
echo Getting Revision Count >> CON

=======
>>>>>>> 405ad0f6c1dfa8d6062c290ed2672b0f53455d86
git rev-list --count main > %~dp0\git-version.txt

::Get Git Count as a Var
set /p gitCount=<git-version.txt

<<<<<<< HEAD
echo Set Revision Number >> CON
echo.

=======
>>>>>>> 405ad0f6c1dfa8d6062c290ed2672b0f53455d86
::--------------------------------------------------------
::\ Add Changes  \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
::Add Changes to Directory
<<<<<<< HEAD
echo Adding Changes in Directory >> CON

git add %~dp0\

echo Added Changes in Directory >> CON
echo.

=======
git add %~dp0\

>>>>>>> 405ad0f6c1dfa8d6062c290ed2672b0f53455d86
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
<<<<<<< HEAD
echo Committing with a Custom Commit! >> CON
git commit -am %gitMessage%
echo Committed! >> CON
echo.

=======
echo Custom Commit!
git commit -am %gitMessage%
>>>>>>> 405ad0f6c1dfa8d6062c290ed2672b0f53455d86
goto push
::--------------------------------------------------------
::Generic Message if != Custom Message
:genericCommit
echo Generic Commit!
::--------------------------------------------------------
::Set Generic Commit Message
<<<<<<< HEAD
echo Committing with a Generic Commit! >> CON
set genericGitMessage="Generic Commit - Automated Commit - %gitCount% - %dateTime%"
git commit -am %genericGitMessage%
echo Committed! >> CON
echo.

goto push
=======
set genericGitMessage="Generic Commit - Automated Commit - %gitCount% - %dateTime%"
git commit -am %genericGitMessage%
goto push

>>>>>>> 405ad0f6c1dfa8d6062c290ed2672b0f53455d86
::--------------------------------------------------------
::\ Push \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
:push
<<<<<<< HEAD
echo Pushing Changes >> CON
git push
echo Completed Pushing Changes >> CON
echo.

GOTO :EOF
=======
git push

GOTO :EOF

>>>>>>> 405ad0f6c1dfa8d6062c290ed2672b0f53455d86
::--------------------------------------------------------
::\ Error \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
::--------------------------------------------------------
:errorParam
echo Failed Running Bat, as no Date Specified
pause
GOTO :EOF