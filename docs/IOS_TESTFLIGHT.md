# 🍎 Nour sur iOS : TestFlight via GitHub Actions

Pas besoin de Mac : le build iOS tourne sur un runner macOS de GitHub, signe l'app automatiquement
(signature gérée par Apple via une clé d'API) et l'envoie directement sur TestFlight.

- **Bundle ID** : `com.lavoie.sagesse` (identique à Android)
- **Version** : `1.0.4` (build = numéro d'exécution GitHub, incrémenté automatiquement)
- **Workflow** : `.github/workflows/ios-testflight.yml`

## A. Côté Apple (une seule fois)

1. **Compte Apple Developer payant** (99 $/an) → <https://developer.apple.com/programs/>.
2. **Team ID** : developer.apple.com → *Account* → *Membership details* → copier le `Team ID` (10 caractères).
3. **Identifiant d'app** : developer.apple.com → *Certificates, IDs & Profiles* → *Identifiers* → `+` →
   *App IDs* → *App* → Bundle ID **Explicit** : `com.lavoie.sagesse` (capabilities : aucune requise).
4. **Fiche app App Store Connect** : <https://appstoreconnect.apple.com> → *Apps* → `+` → *Nouvelle app* :
   plateforme iOS, nom « Nour : Jeu Islamique & Adab », langue principale, Bundle ID `com.lavoie.sagesse`,
   SKU libre (ex. `nour-sagesse-001`).
5. **Clé d'API** : App Store Connect → *Utilisateurs et accès* → *Intégrations* → *Clés d'API App Store Connect* →
   `+`, rôle **Admin** (nécessaire pour créer le certificat de distribution automatiquement).
   Notez le **Key ID** et l'**Issuer ID**, téléchargez le fichier `AuthKey_XXXX.p8` (**téléchargeable une seule fois**).

## B. Côté GitHub : secrets du dépôt

*Settings → Secrets and variables → Actions → New repository secret* :

| Secret | Valeur |
|---|---|
| `APPLE_TEAM_ID` | Team ID (étape A2) |
| `APP_STORE_CONNECT_KEY_ID` | Key ID (A5) |
| `APP_STORE_CONNECT_ISSUER_ID` | Issuer ID (A5) |
| `APP_STORE_CONNECT_KEY_P8` | contenu du `.p8` **encodé en base64** (commande ci-dessous) |
| `VITE_POSTHOG_PROJECT_TOKEN` *(optionnel)* | sinon la valeur par défaut du code est utilisée |
| `VITE_POSTHOG_HOST` *(optionnel)* | idem |

Encoder la clé (PowerShell) :

```powershell
[Convert]::ToBase64String([IO.File]::ReadAllBytes("C:\chemin\AuthKey_XXXX.p8")) | Set-Clipboard
```

> ⚠️ Ne jamais committer le `.p8` (déjà bloqué par `.gitignore`).

## C. Lancer un build

- **À la main** : onglet *Actions* → *iOS → TestFlight* → *Run workflow*.
- **Par tag** : `git tag v1.0.5 && git push origin v1.0.5` (la version marketing suit le tag).

Durée : ~10-15 min. Le build apparaît ensuite dans App Store Connect → *TestFlight* (traitement Apple : 5-30 min).

## D. Inviter les testeurs

- **Testeurs internes** (jusqu'à 100, membres de votre équipe App Store Connect) : disponibles tout de suite.
- **Testeurs externes** : *TestFlight* → *Groupes* → créer un groupe → ajouter des e-mails ou un lien public.
  Le premier build externe passe par une courte revue Apple (~24 h).
  Renseigner « Informations de test » (description, e-mail de contact).

## E. Dépannage

| Erreur | Cause probable |
|---|---|
| `No profiles for 'com.lavoie.sagesse'` | Bundle ID non créé (A3) ou clé API pas en rôle Admin |
| `Cloud signing permission error` | Clé API sans droits suffisants → recréer en Admin |
| `The bundle version must be higher` | Ne devrait pas arriver (build = n° d'exécution) ; relancer |
| `Missing compliance` | Déjà géré : `ITSAppUsesNonExemptEncryption = false` dans `Info.plist` |
| Icône refusée | Régénérer : `node scripts/generate_ios_assets.mjs` (1024×1024 sans transparence) |

## F. Mise à jour du contenu

Après chaque changement du code web : `npm run build && npx cap sync ios`, puis commit/push. Le workflow refait tout.

## G. Avant la soumission App Store (plus tard)

Fournir : captures d'écran (iPhone 6,7" + iPad si supporté), URL de politique de confidentialité
(`https://nour-le-jeux.web.app/privacy.html` existe déjà), classification d'âge, description, mots-clés.
