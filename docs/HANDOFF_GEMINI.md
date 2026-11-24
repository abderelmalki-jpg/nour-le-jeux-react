# MISSION : reprendre et terminer le projet « NOUR » (jeu éducatif islamique pour enfants)

Tu reprends un projet en cours, développé jusqu'ici avec un autre assistant. Lis d'abord `docs/AUDIT_NOUR_2026-11-24.md`, `docs/ART_DIRECTION.md`, `docs/ART_INVENTORY.md`, `docs/ART_PROMPTS_LOT_A.md`, `docs/CHAPITRES_4_5_ET_STYLE.md` et `docs/seo/*`. Ils contiennent l'historique, les décisions et les listes de tâches. Réponds à l'utilisateur en français.

## 1. Le produit
- Jeu narratif et éducatif, gratuit, sans publicité ni violence. Le joueur incarne Othmân, guidé par Noura, et affronte l'Ombre (le « Waswâs ») par des choix moraux et des quiz, pas par des combats. Chaque chapitre travaille une vertu : 1 solitude/istiʿādhah, 2 Hilm (maîtrise de la colère), 3 Tawakkul (confiance, soin), 4 Birr al-Wālidayn (parents, à écrire), 5 Sabr (à écrire).
- Public : familles musulmanes, enfants de 8 à 12 ans environ. Langues : français (référence), anglais, arabe.
- Technique : React 19 + Vite + Tailwind 4 + TypeScript. Capacitor 8 (Android et iOS). Firebase Hosting (site `playnour.online`). PostHog (anonymisé, après consentement sur le web). Dépôt public : https://github.com/abderelmalki-jpg/nour-le-jeux-react, branche `main`.
- Poste de travail de l'utilisateur : Windows 11, PowerShell/Git Bash. Dossier : `C:\MES PROJETS\nour-le-jeux-react-main\nour-le-jeux-react-main`.

## 2. Règles non négociables
1. **Le dépôt est PUBLIC** : ne jamais y écrire de clé API, jeton, mot de passe, clé Apple (.p8) ni identifiant privé. Les secrets passent par des variables d'environnement. Ne demande pas à l'utilisateur de coller un secret dans le chat.
2. **Contenu religieux** : aucune affirmation de « fiabilité » ou de « vérification » tant qu'un savant n'a pas relu. Toute référence (verset, hadith, invocation) doit citer sa source (sourate:verset ou recueil + numéro), et rester signalée « à faire relire ». Pas de représentation des Prophètes ni des compagnons.
3. **Images** : aucun texte incrusté (l'interface s'en charge, pour la traduction) ; aucun visage détaillé (visages lisses) ; aucun lieu saint réel ; violet réservé au Waswâs. Voir `docs/ART_DIRECTION.md`.
4. **Honnêteté du discours public** : pas de fausse note d'avis, pas de classification d'âge officielle (PEGI) tant qu'elle n'est pas obtenue, pas de promesse de « doublage complet » ni de « comédiens » si les voix sont synthétiques. Dis la vérité sur ce qui existe.
5. **Paiements** : sur les versions natives (iOS/Android), aucun paiement externe (guideline Apple 3.1.1). Les liens Stripe du web sont encore en mode test.
6. **Actions sortantes** (publier, pousser, payer, télécharger, créer un compte) : demande confirmation à l'utilisateur avant de les faire. Ne commite ni ne pousse sans son accord explicite.
7. Termine chaque lot par `npm run lint` (typecheck) et `npm run build`, et vérifie dans le navigateur ce que tu as changé.

## 3. Architecture à connaître
- **Histoire** : `src/data/chapter1.ts`, `chapter2.ts`, `chapter3.ts` (scènes, beats, quiz, actions réelles, combats). Les scènes du chapitre 1 en EN/AR superposent des fichiers `src/data/locales/chapter1.en.ts` / `.ar.ts` à la structure française (`getChapter1Scenes`).
- **Traductions** : dictionnaire par identifiant de beat, de choix et de quiz dans `src/i18n/chapter1Translations.ts`, `chapter1Patch.ts`, `chapter2Translations.ts`, `chapter3Translations.ts`, fusionnés dans `src/utils/narrativeI18n.ts`. L'arabe est entièrement vocalisé. Libellés d'interface : `src/i18n/uiExtras.ts` et `src/i18n/translations.ts`.
- **Quiz** : mélangés (`src/utils/quizShuffle.ts`), relabellisés A–D. Un quiz nouveau doit exister en FR (`QUIZZES`) et dans le dictionnaire EN/AR.
- **Voix** : `src/utils/speech.ts` joue des MP3 : `public/audio/ch{N}/{beatId}.mp3` (FR) et `public/audio/ar/ch{N}/{beatId}.mp3` (AR). Pas de synthèse vocale de secours : sans fichier, c'est le silence. Seul le Waswâs n'a jamais de voix. Aucune voix en anglais.
- **Décors** : clés dans `src/utils/assets.ts` (`DEFAULT_ASSETS.backgrounds.*`) → fichiers de `src/assets/images/`; thèmes dans `src/components/SceneBackground.tsx`. Pour remplacer un décor, garde le même nom de fichier.
- **Combat final** : `src/components/ClimaxCombat.tsx` (rounds par chapitre : FR/EN/AR).
- **iOS** : `.github/workflows/ios-testflight.yml` (macOS, archive + upload TestFlight), `scripts/set_ios_secrets.ps1` (l'utilisateur l'exécute lui-même), `docs/IOS_TESTFLIGHT.md`, `ios/App/App/PrivacyInfo.xcprivacy`. Bundle id prévu : `com.lavoie.sagesse`.
- **Android** : `android/`, build de test : `npm run build`, `npx cap sync android`, puis `android\gradlew.bat assembleDebug` avec JDK 21 (`JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.11.10-hotspot`) et `ANDROID_HOME=C:\Users\<user>\AppData\Local\Android\Sdk`. Version actuelle : 1.0.5 (code 6). La version iOS (MARKETING_VERSION) est restée à 1.0.4.

## 4. Ce qui est FAIT (ne le refais pas)
- Pipeline TestFlight prête (en attente de secrets), conformité App Store (vie privée, consentement analytics, iPhone seulement).
- Interface mobile corrigée, polices embarquées hors ligne.
- Audit complet et corrections techniques ; quiz mélangés ; voix liées à la langue.
- Chapitres 2 et 3 traduits EN/AR ; rattrapage des beats manquants du chapitre 1 ; combat final du chapitre 2 recentré sur la colère et le pardon ; quiz en double corrigé (`quiz_niyyah_discretion`), `quiz_hilm_afw` branché ; mauvaises réponses du chapitre 1 réécrites.
- Voix : 8 voix FR manquantes ajoutées ; 29 voix arabes pour la scène 1 (la Chambre).
- Site : note « 4,9/148 avis » supprimée, promesses (hadiths, PEGI, doublage) corrigées dans `index.html`, `llms.txt`, FAQ.
- Direction artistique « HD-2D » décidée : décors peints dorés + personnages en pixel-art HD sans visage. Lot A (carrefour sans texte, affiche, fin de chapitre, climax Hilm, ruelle) et lots B/C/D (cour à pergola, herboriste, marches de mosquée, atelier, cuisine, chêne ch.4, cour familiale, chemins du Waswâs, pavillon) générés et installés. La scène du carrefour affiche une image fixe (l'ancienne vidéo avait de faux noms de chapitres).
- Boîte de dialogue parchemin rendue translucide pour voir le décor.
- Docs : audit, direction artistique, inventaire visuel, dossier chapitres 4-5, plan SEO.
- Derniers commits sur `main` : `4d364c1` (décors lots B/C/D) ; la CI GitHub (lint + build) passe. Un APK de test existe en local (`NOUR-test-v3.apk`, non versionné, non signé).

## 5. Ce qu'il RESTE à faire, par priorité

### A. Alignement du discours « pixel art » (rapide, sans coût)
Le jeu n'est plus « pixel art 16-bit » : c'est « aventure illustrée, personnages en pixel-art ». Reformuler dans : `index.html` (description, JSON-LD « Pixel Art 16-Bit », vidéo), `public/llms.txt`, `public/sitemap.xml` (titres/légendes/tags), `src/i18n/translations.ts` (≈15 occurrences FR/EN/AR, dont « quiz vérifiés / verified quizzes » à adoucir), `src/components/landing/HeroSection.tsx`, `docs/APP_STORE_LISTING.md`, `src/data/gameData.ts` (un témoignage cite le « pixel art oriental » : **vérifie que les témoignages du site sont réels**, sinon signale-le à l'utilisateur). Les occurrences de « pixel » dans les noms de classes CSS/composants ne sont pas à changer.

### B. Visuels restants (voir `docs/ART_INVENTORY.md`)
Décors encore en pixel-art à repeindre : `bg_arbre_racines_anciennes`, `bg_halte_the_apaisement`, `bg_verger_fleur_lanterne`, `public/game-assets/waswas_bg.jpg`. À classer visuellement (79 fichiers marqués « à classer ») : `refus_jeune_corde`, `village_mefiant`, `marche_*`, `jardin_*`, `geste_*`, `vallee`, `the_artisan_soutien`, plans `ch1_shots/*` et `scene1/*`. Transitions 1 à 9 : basse résolution (1280×720), à harmoniser. Corrections : carrefour « avec sac » (variante A2, aujourd'hui identique à la version sans sac), épilogue recoloré aux couleurs canon, foules masquées de `village_accueillant` et visage du marchand de `marche.jpg` (à rendre lisses), image de partage `public/affiche_nour_whatsapp.jpg` (contient du texte), vidéos du jeu (`waswas_tornado.mp4`, etc.) non vérifiées, doublons de fichiers. Allègement : 64 Mo d'images, APK de 105 Mo (WebP, suppression des doublons et des fichiers non cités).
Outil d'images : l'utilisateur a un compte **Google Flow** (modèle Nano Banana 2.1, 2 variantes par prompt, quota quotidien). Les prompts types sont dans `docs/ART_PROMPTS_LOT_A.md`. Le téléchargement automatique depuis Flow est bloqué par le navigateur (Chrome refuse les téléchargements multiples) : le plus simple est de demander à l'utilisateur de télécharger les images (en 2K si possible) dans `art_incoming/` (dossier local ignoré par git), puis de les convertir (JPEG ≈ 82 %, 1920×1080 ou 2560×1440) et de les installer sous les noms existants.

### C. Sortie iOS
Il manque : l'Issuer ID App Store Connect du titulaire du compte, l'exécution de `scripts/set_ios_secrets.ps1` par l'utilisateur, la création de la fiche d'app `com.lavoie.sagesse` dans App Store Connect, puis le lancement du workflow `ios-testflight.yml` et la lecture de ses journaux. Aligner `MARKETING_VERSION` sur 1.0.5. Redéployer le site (`firebase deploy --only hosting`) pour la page de confidentialité à jour.

### D. Voix
- Arabe : environ 150 répliques restantes au chapitre 1, puis chapitres 2 et 3. Anglais : aucune voix. Les voix actuelles viennent de CAMB.AI (clé fournie par l'utilisateur via la variable d'environnement CAMB_API_KEY, jamais dans un fichier). L'utilisateur n'est pas convaincu par la cohérence entre les anciennes voix françaises et celles de CAMB : il faut qu'il valide un échantillon avant toute production en masse.
- Masquer le bouton « Voix active » quand une réplique n'a pas de fichier audio.

### E. Contenu
- Chapitres 4 et 5 : plan dans `docs/CHAPITRES_4_5_ET_STYLE.md` (7 + 6 scènes). Point technique : les tests `currentScene.id >= 17 ? 3 : …` dans `App.tsx` (7 occurrences) supposent 3 chapitres.
- Relecture religieuse (savant) et relecture de l'arabe (natif) : produire un document unique listant chaque référence.
- Le quiz libre (`src/data/islamicQuizzes.ts`) n'existe qu'en français.
- Textes restés en français en EN/AR (à rechercher).
- **Incohérence à faire trancher par l'utilisateur** : les textes affichent un « Pack Fondateur 4,99 € » pour débloquer les chapitres 2-3 alors que `getSupporterStatus()` rend tout accessible ; la FAQ parle de « comédiens de doublage » alors que les voix sont peut-être synthétiques. Ne change rien sans sa décision.

### F. SEO (voir `docs/seo/*`)
URL par langue avec pré-rendu, pages « valeurs » pour les parents (après relecture), accès Search Console, optimisation des performances (bundle > 500 Ko, vidéo d'accueil), fiches App Store / Google Play alignées.

### G. Android
Version signée pour le Play Store (fichier de signature à fournir par l'utilisateur), nouveau numéro de version.

## 6. Pièges rencontrés (gagne du temps)
- Sous Git Bash, les heredocs suppriment les antislashs : écris les scripts avec un éditeur de fichiers ou utilise `chr(92)`.
- Fichiers TypeScript parfois en CRLF : lis/écris avec `newline=''` en Python pour ne pas casser les fins de ligne.
- Les caractères non ASCII font planter `print` en Python sous Windows : `sys.stdout.reconfigure(encoding='utf-8')`.
- Les scripts avec `await` au niveau racine doivent être des `.mts` (lancés avec `npx tsx`).
- Une fois le serveur de dev lancé, pour atteindre une scène précise, modifie la clé `localStorage` `nour_pixelio_rpg_progress_v2` (`currentSceneIndex`, `currentBeatIndex`) puis recharge `/play`.
- Le service d'images CAMB/générateurs gratuits limitent à 1 tâche à la fois.
- Un filtre de sécurité d'image peut refuser un prompt qui mentionne « un garçon et une femme » : reformule (« deux voyageurs »).

## 7. Façon de travailler attendue
1. Commence par lire les docs listés, lance `git status` et `git log --oneline -10`, puis `npm run lint && npm run build` pour vérifier l'état de départ.
2. Propose un plan court en commençant par A (alignement du discours), puis B. Demande-moi les décisions listées en E avant d'y toucher.
3. Un lot = un commit clair en français, `lint` et `build` verts, vérification dans le navigateur.
4. Mets à jour `docs/AUDIT_NOUR_2026-11-24.md` (ou un nouveau fichier daté) à chaque lot.
5. Termine par un résumé : ce qui est fait, ce qui n'est pas vérifié, ce qui attend une décision de l'utilisateur.
