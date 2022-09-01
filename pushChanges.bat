@echo off

::Get Date Time in Format
for /f "tokens=2 delims==" %%G in ('wmic os get localdatetime /value') do set datetime=%%G
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%

::Get Time Hour-Minute
For /f "tokens=1-2 delims=/:" %%a in ("%TIME%") do (set mytime=%%a-%%b)

set dateTime="%year%-%month%-%day%-%mytime%"

::Set Log Output Location
set outputLog="%~dp0\logs\AutoLog-%dateTime%.log"

::Set Where Files Are to Go
set copySource="%~dp0\dist\"
set copyTarget="%~dp0\docs\"

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

::If Not Supposed to Commit, Skip to End
if not %pushToGit%==y GOTO end

:pushGit
echo Here Goes the Git Push >> %outputLog%

::Commit Message Add Custom // Auto Commit from Bat File
set /p customGitMessage="Add Custom Commit Message: "
set gitMessage="%customGitMessage% - A.C.f.B.F - %dateTime%"

::Safety Pull
git pull >> %outputLog%

::Add Changes to Directory
git add %~dp0\ >> %outputLog%

::Commit
git commit -am %gitMessage% >> %outputLog%

::Push
git push >> %outputLog%

:end
echo Completed Bat File, Ending >> %outputLog%
pause