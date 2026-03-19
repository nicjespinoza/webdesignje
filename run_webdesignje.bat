@echo off
title WebDesignJE Local Server
echo Iniciando servidor local para WebDesignJE en http://127.0.0.1:8000/
cd /d "%~dp0"
start "" "http://127.0.0.1:8000"
python -m http.server 8000
pause