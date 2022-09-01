echo off
set outputLog=%1

echo Starting Yarn Build
yarn build >> %outputLog%
echo Yarn Build Completed