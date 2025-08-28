@echo off
REM Master script to fetch all product images in batches (Windows version)

set TOTAL=150
set BATCH=50
set DELAY=3.0

echo ⚡ Starting full image download automation...
echo   Total products: %TOTAL% | Batch size: %BATCH% | Delay: %DELAY% sec

set /a START=1

:LOOP
if %START% GTR %TOTAL% goto END

set /a END=%START% + %BATCH% - 1
if %END% GTR %TOTAL% set END=%TOTAL%

echo 👉 Running batch: %START% to %END%
set START=%START% set END=%END% set DELAY=%DELAY% set HEADLESS=true
python tools\fetch_amazon_images.py

echo ✅ Finished batch: %START% to %END%

set /a START=%END% + 1

echo ⏳ Cooling down for 10 seconds before next batch...
timeout /t 10 /nobreak >nul

goto LOOP

:END
echo 🎉 All product images downloaded successfully into public\images\
pause
