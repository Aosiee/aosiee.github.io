@echo off

::--------------------------------------------------------
::Get Date Time in Format
for /f "tokens=2 delims==" %%G in ('wmic os get localdatetime /value') do set datetime=%%G
set year=%datetime:~0,4%
set month=%datetime:~4,2%
set day=%datetime:~6,2%

::Get Time Hour-Minute // Filter Time Responce
set smallTime=%time: =0%
set smallTime=%smallTime:.=-%
set smallTime=%smallTime::=-%
set dateTime="%year%-%month%-%day%-%smallTime%"

if exist %~dp0\logs\ (
 echo Log Folder Exists >> %~dp0\logs\AutoLog-%dateTime%.log
) else (
 echo Log Folder Doesn't Exist, Creating Folder
 mkdir %~dp0\logs\
)

::Set Log Output Location
set outputLog="%~dp0\logs\AutoLog-%dateTime%.log"

::Set Where Files Are to Go
set copySource="%~dp0\dist\"
set copyTarget="%~dp0\docs\"

echo Running pushChanges.bat

::--------------------------------------------------------
::Whether to Build Fresh
echo Prompting For Whether to Create a Fresh Build >> %outputLog%
:againBuild
set /p freshBuild="Fresh Build? (y/n) "
  
if %freshBuild%==y (GOTO buildAnswerSuccessful)
if %freshBuild%==n (GOTO buildAnswerSuccessful)

echo Please type y for Yes or n for No
pause
  
cls
goto againBuild

:buildAnswerSuccessful
echo FreshBuild Answer was: %freshBuild% >> %outputLog%

::--------------------------------------------------------
::Whether to Copy Files from Dist -> Docs
echo Prompting For Whether to Copy Files from Dist > %outputLog%
:againCopy
set /p copyFiles="Copy Files from Dist -> Docs? (y/n) "
  
if %copyFiles%==y (GOTO copyAnswerSuccessful)
if %copyFiles%==n (GOTO copyAnswerSuccessful)

echo Please type y for Yes or n for No
pause
  
cls
goto againCopy

:copyAnswerSuccessful
echo Copy Files Answer was: %copyFiles% >> %outputLog%

::--------------------------------------------------------
::Whether to Push to Git Prompt
echo Prompting For Whether to Push to GIT >> %outputLog%
:againGit
set /p pushToGit="Push to Git? (y/n) "
  
if %pushToGit%==y (GOTO gitAnswerSuccessful)
if %pushToGit%==n (GOTO gitAnswerSuccessful)

echo Please type y for Yes or n for No
pause
  
cls
goto againGit

:gitAnswerSuccessful
echo CommitToGit Answer was: %pushToGit% >> %outputLog%

::--------------------------------------------------------
:freshBuild 
::--------------------------------------------------------
::If not supposed to freshBuild skip to copy
if not %freshBuild%==y goto copyFiles

echo Building Fresh Build
echo Building Fresh Build >> %outputLog%

::Fresh Build to dist
call "build.bat" >> %outputLog%

echo Completed Building Fresh Build
echo Completed Building Fresh Build >> %outputLog%
echo.

::--------------------------------------------------------
:copyFiles
::--------------------------------------------------------
::Skip if Not to Copy Files
if not %copyFiles%==y goto pushGit

echo Copying Files in Dist to Docs
echo Copying Files in Dist to Docs >> %outputLog%

xcopy /s /h /y %copySource% %copyTarget% >> %outputLog%

echo Completed Copying Files from Dist to Docs
echo Completed Copying Files from Dist to Docs >> %outputLog%
echo.

::--------------------------------------------------------
:pushGit
::--------------------------------------------------------
::If Not Supposed to Commit, Skip to End
if not %pushToGit%==y GOTO end

echo Commiting to Git...
echo Commiting to Git... >> %outputLog%

::Call Generic Commit
call "commitToGit.bat" %dateTime% noForceGeneric >> %outputLog%

echo Completed Commiting to Git...
echo Completed Commiting to Git... >> %outputLog%
echo.

::--------------------------------------------------------
:end
::--------------------------------------------------------

echo Completed Bat File, Ending >> %outputLog%
echo Completed Executing Bat File...
pause