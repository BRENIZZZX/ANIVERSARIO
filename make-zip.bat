@echo off
echo 🌸 Criando arquivo site-rosa-qrcode.zip...

REM Remove arquivo zip anterior se existir
if exist site-rosa-qrcode.zip del site-rosa-qrcode.zip

REM Cria o arquivo zip usando PowerShell (disponível no Windows 10+)
powershell -command "Compress-Archive -Path 'frontend', 'backend', 'db', 'README.md' -DestinationPath 'site-rosa-qrcode.zip' -Force"

if exist site-rosa-qrcode.zip (
    echo ✅ Arquivo site-rosa-qrcode.zip criado com sucesso!
    echo 📁 Localização: %CD%\site-rosa-qrcode.zip
    echo.
    echo 📋 Conteúdo do zip:
    echo    - frontend/ (aplicação React)
    echo    - backend/ (aplicação Spring Boot)
    echo    - db/ (scripts SQL)
    echo    - README.md (documentação)
    echo.
    echo 🚀 Para usar:
    echo    1. Extrair o arquivo zip
    echo    2. Seguir instruções do README.md
) else (
    echo ❌ Erro ao criar arquivo zip
    echo Verifique se o PowerShell está disponível
)

pause