# Envoie les secrets Apple vers le dépôt GitHub (chiffrés par GitHub, jamais affichés).
# Usage :
#   .\scripts\set_ios_secrets.ps1 -KeyPath "C:\chemin\AuthKey_XXXX.p8" -KeyId XXXX -IssuerId <uuid> -TeamId 24R487H4K8
param(
  [Parameter(Mandatory)][string]$KeyPath,
  [Parameter(Mandatory)][string]$KeyId,
  [Parameter(Mandatory)][string]$IssuerId,
  [Parameter(Mandatory)][string]$TeamId,
  [string]$Repo = "abderelmalki-jpg/nour-le-jeux-react"
)
$ErrorActionPreference = "Stop"
if (-not (Test-Path $KeyPath)) { throw "Fichier introuvable : $KeyPath" }
$b64 = [Convert]::ToBase64String([IO.File]::ReadAllBytes($KeyPath))
$b64 | gh secret set APP_STORE_CONNECT_KEY_P8 -R $Repo
$KeyId    | gh secret set APP_STORE_CONNECT_KEY_ID -R $Repo
$IssuerId | gh secret set APP_STORE_CONNECT_ISSUER_ID -R $Repo
$TeamId   | gh secret set APPLE_TEAM_ID -R $Repo
gh secret list -R $Repo
