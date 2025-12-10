@echo off
echo Auto-committing changes to git...

REM Add all changes
git add .

REM Get current timestamp
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set datetime=%%I
set timestamp=%datetime:~0,4%-%datetime:~4,2%-%datetime:~6,2% %datetime:~8,2%:%datetime:~10,2%:%datetime:~12,2%

REM Commit with timestamp
git commit -m "Auto-commit: %timestamp%"

REM Push to remote (uncomment the next line if you want to auto-push)
git push origin master

echo Changes committed successfully!
pause
