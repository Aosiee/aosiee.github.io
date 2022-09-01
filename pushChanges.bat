@echo off

::Set Log Output Location
set outputLog="outputLog.log"

::Set Where Files Are to Go
set copySource="%~dp0\dist\"
set copyTarget="%~dp0\docs2\"

echo Prompting For Whether to Push to GIT > %outputLog%
:again 
set /p pushToGit="Push to Git? (y/n) "
  
if %pushToGit%==y (GOTO answerSuccessful)
if %pushToGit%==n (GOTO answerSuccessful)

echo Please type Y for Yes or N for No
pause
  
cls
goto again

:answerSuccessful
echo Answer was: %pushToGit% >> %outputLog%

:copyFiles
echo Copying Files in Dist to Docs >> %outputLog%
xcopy /s /h /y %copySource% %copyTarget% >> %outputLog%


if not %pushToGit%==y GOTO end

:pushGit

echo Here Goes the Git Push >> %outputLog%


:end
echo Completed Bat File, Ending >> %outputLog%
pause