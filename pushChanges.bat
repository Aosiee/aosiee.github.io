@echo off

::Get Date Time in Format
For /f "tokens=2-4 delims=/ " %%a in ('date /t') do (set mydate=%%c-%%a-%%b)
For /f "tokens=1-2 delims=/:" %%a in ("%TIME%") do (set mytime=%%a%%b)
set dateTime="%mydate%-%mytime%"

::Set Log Output Location
echo startText > %~dp0\logs\AutoLog-%dateTime%.log"
set outputLog="%~dp0\logs\AutoLog.log"

::Set Where Files Are to Go
set copySource="%~dp0\dist\"
set copyTarget="%~dp0\docs\"

set gitMessage="Automated Commit from Bat File %dateTime%"

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


git add %~dp0\ >> %outputLog%
git commit -am %gitMessage% >> %outputLog%

:end
echo Completed Bat File, Ending >> %outputLog%
pause