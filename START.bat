@echo off
echo ============================================
echo   REDOANUZZAMAN Portfolio - Starting...
echo ============================================
echo.
echo Installing dependencies...
call npm install
echo.
echo Starting development server...
echo.
echo Frontend: http://localhost:3000
echo Admin Panel: http://localhost:3000/admin
echo.
echo Admin Login:
echo   Username: admin
echo   Password: admin123
echo.
call npm run dev
