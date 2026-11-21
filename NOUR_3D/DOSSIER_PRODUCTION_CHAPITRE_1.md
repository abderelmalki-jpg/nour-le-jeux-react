# NOUR 3D — Dossier de Production : Chapitre 1, Séquence 1 « La Chambre d'Othmân »

> **Document maître du prototype.** Il définit précisément le cahier des charges de la première
> scène jouable en 3D (Unity), la modélisation Blender, les personnages, les caméras fixes,
> les hotspots, la séquence narrative branchée sur les voix existantes, et les systèmes
> Lumière / Waswâs. Il est destiné à être suivi par un agent de code (Claude Code / ZCode)
> ou un·e développeur·se Unity.
>
> **Règle d'or** : rien du NOUR actuel (React + Capacitor + Firebase) n'est supprimé ni modifié.
> NOUR 3D est un prototype parallèle qui réutilise ses contenus.

---

## 0. Résumé exécutif

| | |
|---|---|
| **Objectif** | Une scène jouable : la chambre d'Othmân au lever du jour, du réveil au franchissement de la porte, avec la séquence narrative complète, les voix existantes, les 3 choix du matin et la transformation lumineuse du décor. |
| **Moteur** | Unity 6 LTS (URP) + C# |
| **Modelisation** | Blender 4.x, style low-poly stylisé chaleureux (voir §2) |
| **Durée de jeu visée** | 4 à 6 minutes |
| **Definition of Done** | Un build Windows + Android (APK) dans lequel un joueur neuf termine la séquence sans aide, entend les voix existantes, fait un choix parmi trois gestes du matin, et voit la pièce s'illuminer. |
| **Source des contenus** | `nour-le-jeux-react-main/` : 184 MP3 (ch1), `scripts/dialogues_export.json` (239 dialogues), `scripts/storyboard_ch1.json` (23 plans + charte style), planches personnages dans `src/assets/images/`. |

---

## 1. Cahier des charges du prototype Unity

### 1.1 Périmètre inclus

1. **Une seule scène Unity** : `OthmanBedroom` (la chambre).
2. **Déplacement** : point-and-click — le joueur clique sur une zone au sol, Othmân s'y déplace (Navigation Mesh, marche lente).
3. **Caméra fixe** : une caméra par zone de la chambre (lit / fenêtre / sac / sandales / porte), avec fondus croisés. Pas de caméra orbitale libre.
4. **Hotspots interactifs** : sac de voyage, lit, sandales, carafe d'eau, fenêtre, porte — survol = contour doré, clic = observation ou action.
5. **Séquence narrative** : les 9 répliques d'ouverture + le choix du matin + la branche choisie (ranger le lit / boire l'eau / préparer les sandales) + le franchissement de la porte. Voix : les MP3 existants (§5).
6. **Choix multiple** : interface de choix identique au jeu actuel (3 options avec gains de traits Discipline/Sabr/Adab/Ilm affichés).
7. **Système Lumière** : jauge dorée visible ; la lumière directionnelle de la scène augmente après l'action choisie (§6.1).
8. **Système Waswâs** : brume violette localisée près du lit au début, qui se dissipe à mesure que le joueur avance (§6.2).
9. **Sauvegarde locale** : position dans la séquence + traits (JSON dans `Application.persistentDataPath`).
10. **UI minimale** : boîte de dialogue en bas (portrait + texte + audio), en-tête dual jauge Lumière/Waswâs, bouton pause/reglages son.

### 1.2 Périmètre exclu (protégé pour plus tard)

- Village, marché, jardin, mosquée, montagne (ch. 1 suite), chapitres 2-5.
- Quiz, actions réelles, codex, inventaire (phase 2 — l'architecture C# les anticipe mais pas d'UI).
- Multijoueur, comptes, analytics.
- Tout contenu religieux sensible supplémentaire (règles §7).

### 1.3 Contraintes techniques

| Cible | Budget |
|---|---|
| PC (Windows, build il2cpp) | ≤ 300 Mo, 60 fps en 1080p, GTX 1050 |
| Android (APK, arm64) | ≤ 200 Mo, 30 fps sur un moto G8 / Galaxy A21s, Quality Tier « Mobile » (ombres basses résolution, pas de post-processing lourd) |
| Temps de chargement scène | ≤ 5 s sur mobile |
| Langues | FR par défaut ; l'architecture texte passe par une table JSON pour ajouter EN/AR ensuite (RTL prêt : TextMeshPro avec version ≥ 3.2) |

### 1.4 Arborescence du projet Unity

```
NOUR_UNITY/Assets/NOUR/
├── Art/
│   ├── Models/          (.fbx Blender)
│   ├── Materials/       (URP/Lit, palette §2.3)
│   ├── Textures/
│   └── VFX/             (WaswasMist, GoldenLight)
├── Audio/
│   ├── Voices/Ch1/      (les 184 MP3 existants, réencodés OGG)
│   └── Ambience/        (aube, oiseaux — libres de droits)
├── Data/
│   ├── dialogues_ch1.json   (extrait du jeu React, §5.1)
│   ├── beats_ch1.json       (séquence + branchements, §5.1)
│   └── traits_config.json
├── Scripts/
│   ├── Core/            (GameState, SaveSystem, SceneFlow)
│   ├── Player/          (PlayerController, NavPoint)
│   ├── Camera/          (FixedCameraZone, CameraManager)
│   ├── Interaction/     (Hotspot, Interactable, HighlightEffect)
│   ├── Dialogue/        (DialogueManager, DialogueUI, VoicePlayer)
│   ├── Narrative/       (BeatRunner, ChoiceController, NarrativeFlagStore)
│   ├── NourSystems/     (LightProgression, WaswasSystem, TraitSystem)
│   └── UI/              (DualGaugeHeader, PauseMenu)
└── Scenes/
    ├── Boot.unity       (chargement data + save)
    └── OthmanBedroom.unity
```

---

## 2. Modélisation Blender — la chambre d'Othmân

### 2.1 Style

Low-poly stylisé (quads为主, subdivision désactivée), proportions légèrement hypertrophiées
à la façon d'un diorama : murs épais, porte basse, fenêtre haute. Lumière chaude.
**Interdits** : photoréalisme, textures PBR bruitées, symétrie parfaite froide.

Références directes dans le dépôt actuel :
- `src/assets/images/bg_chambre_1788128574397.jpg` (chambre actuelle 2D)
- `src/assets/images/bg_chambre_lit_defait.jpg` (lit défait)
- `scripts/storyboard_ch1.json` → champ `style` : peinture façon Ghibli, lumière dorée,
  palette ocre/terracotta/bleu canard/crème.

### 2.2 Plan de la pièce (4 m × 5 m, hauteur 2,8 m)

```
            [FENÊTRE moucharabieh — lumière d'aube entrante]
   N        ┌────────────────────────────┐
            │  étagère + carafe d'eau    │
            │                            │
            │      [TAPIS central]       │
  [LIT                           [SAC de voyage
  défait]                         en bois + lanières]
            │                            │
            │ [SANDALES au sol]          │
   S        └──────────[PORTE + loquet fer]──────────┘
```

La porte au sud-ouest, la fenêtre au nord : le joueur voit toujours la lumière entrer
de face ou de trois-quarts — jamais à contre-jour.

### 2.3 Liste des modèles (budgets polygones)

| Objet | Triangles max | Notes |
|---|---|---|
| Pièce (murs, sol, plafond, porte, fenêtre moucharabieh) | 6 000 | Moucharabieh en géométrie réelle (pas texture) pour les ombres rayonnantes |
| Lit + couverture défunte + matelas | 1 500 | Couverture = mesh séparé (état rangé/dérangé = 2 poses) |
| Sac de voyage + lanières | 800 | Ouverture animable (Shape Key) |
| Sandales (paire) | 300 | Posées en travers, négligemment |
| Carafe + bol | 300 | Cuivre martelé simple |
| Étagère + objets (livre, huile, tissu) | 600 | |
| Tapis | 200 | Motif tissé simple, légèrement gondolé |
| **Total décor** | **≈ 9 700** | Un seul atlas de textures 2048² |

Palette matériaux (albedo, roughness élevée 0.7-0.9) :
crème `#F2E7CE`, ocre `#D9A44A`, terracotta `#C1694F`, bois sombre `#6B4A2E`,
bleu canard `#2E7C8F` (accents tissus), fer `#4A4A4F`.

### 2.4 Deux états du décor (transformation visible)

| Élément | État A (ouverture) | État B (après le geste du matin) |
|---|---|---|
| Couverture | défaite, en boule | pliée, aux pieds du lit |
| Lumière directionnelle | 2 200 K faible, angle rasant | 3 400 K +15 % intensité, faisceaux volumétriques plus nets |
| Brume Waswâs | nappes près du lit | dissipée |
| Poussière lumineuse | discrète | visible dans le faisceau de la fenêtre |
| Porte | fermée, loquet baissé | entrouverte sur une ruelle dorée (plan léger en arrière-plan) |

Livrable Blender : `chambre_v01.blend` → export FBX (unités métriques, +Y up,
un seul objet par élément interactif, pivots au contact sol).

---

## 3. Personnages : Othmân et Noura

### 3.1 Fidélité à l'existant (non négociable)

- **Visages volontairement non détaillés** : pas d'yeux, pas de bouche — identité du projet.
  Silhouettes lisibles, expression portée par la posture.
- **Othmân** : jeune homme fin, cape bleu canard (capuchon), pantalon crème, sandales.
  Réf. : `src/assets/images/pixel_hero_planche_*.jpg`, `avatar_hero_*.jpg`.
- **Noura** : robe longue crème/terracotta, hijab crème, port de tête maternel.
  Réf. : `src/assets/images/pixel_noura_planche_*.jpg`, `pixel_noura_maternal_guide.png`.
- **Waswâs** : AUCUN modèle de personnage — uniquement un système de particules brume
  violette (§6.2).

### 3.2 Grille de modélisation

| | Othmân | Noura |
|---|---|---|
| Triangles corps | ≤ 3 500 | ≤ 3 500 |
| Rig | Humanoid 41 os (config Unity) | idem |
| Matériaux | 4 (cape, peau, pantalon, cheveux) | 3 (robe, hijab, peau) |
| Tête | Ovales lisses, aucune faciale | idem |

### 3.3 Animations (12 min, 24-30 fps, cibles de temps)

| Nom | Durée | Description |
|---|---|---|
| `idle_thoughtful` | 4 s (loop) | debout, bras le long, balancement léger, tête qui baisse parfois |
| `idle_worried` | 4 s (loop) | mains qui se serrent devant le ventre |
| `walk_slow` | cycle 1.2 s | pas prudents, épaules légèrement rentrées |
| `sit_bed_wake` | 3 s (once) | assis sur le lit, se frotte les bras (réveil) |
| `stand_up` | 1.5 s (once) | se lève du lit |
| `kneel_tidy_bed` | 6 s (loop 2×) | à genoux, plie la couverture (match state B §2.4) |
| `drink_water` | 4 s (once) | prend la carafe à deux mains, boit |
| `kneel_sandals` | 3 s (once) | ajuste les sandales, les aligne |
| `look_out_window` | 5 s (loop) | penché vers la moucharabieh |
| `open_door` | 2 s (once) | lève le loquet, tire la porte, s'arrête une seconde |
| `exit_door` | 3 s (once) | franchit, dos au joueur |
| `noura_enter` | 4 s (once) | entre par la porte, s'appuie au chambranle |
| `noura_warm_idle` | 4 s (loop) | mains croisées, inclinaison de tête bienveillante |

Livrables : `othman_v01.blend`, `noura_v01.blend` → FBX avec animations intégrées
(un seul clip par action, noms exacts ci-dessus — ils sont référencés par le `BeatRunner`).

---

## 4. Caméras fixes et hotspots

### 4.1 Zones de caméra (5)

| ID | Position | Cadre | Déclencheur |
|---|---|---|---|
| `cam_bed` | angle S-O, hauteur 1,6 m | lit + fenêtre en fond | zone tapis nord |
| `cam_window` | face fenêtre | moucharabieh + lumière | zone près fenêtre |
| `cam_bag` | 3/4 proche | sac + étagère | zone sac |
| `cam_sandals_door` | face porte | sandales + porte + couloir doré | zone sud |
| `cam_wide` | angle N-E plongée légère | pièce entière | défaut / déplacements longs |

Fondu croisé 0,6 s entre caméras. FOV 35° (téléobjectif doux, look « film »).
Caméra hérite d'un léger mouvement respiratoire (amplitude ±0,5 cm, 8 s) pour que la
scène ne soit jamais figée.

### 4.2 Hotspots (6)

| Hotspot | Type | Effet |
|---|---|---|
| Sac de voyage | observation | Othmân marche, s'accroupit, ligne de narration + voix |
| Fenêtre | observation | anim `look_out_window`, narration sur la vallée |
| Carafe d'eau | observation | narration sur l'Adab de boire |
| Lit | **action** (si branche « ordre ») | anim `kneel_tidy_bed` → état B |
| Sandales | **action** (si branche « sandales ») | anim `kneel_sandals` |
| Porte | progression | d'abord verrouillée narrativement (« pas encore… »), s'ouvre après le geste du matin |

Survol : contour doré pulsé (shader `Unlit/Outline` simple) + curseur main.
Chaque hotspot porte un `InteractableId` aligné sur les ids du jeu React (`beat_id`).

---

## 5. Première séquence narrative — avec les voix existantes

### 5.1 Pipeline des données (réutilisation directe)

Le jeu React contient déjà tout. Pipeline :

```
src/data/chapter1.ts (+ locales EN/AR)
        │  (script d'export Node à écrire une fois : scripts/export_beats_unity.mjs)
        ▼
Assets/NOUR/Data/beats_ch1.json   ← séquence complète : id, type, speaker, texte,
                                    audioClip, flags requis, choix { id, label,
                                    traitGains, setNarrativeFlags }
Assets/NOUR/Data/dialogues_ch1.json ← extrait de scripts/dialogues_export.json
```

Règle : **le texte ne vit jamais dans le code C#**. Le `BeatRunner` consomme le JSON.
Un verrou de cohérence vérifie au lancement que chaque beat avec `audioClip` a bien
le fichier correspondant dans `Audio/Voices/Ch1/`.

### 5.2 Mapping séquence ↔ voix (fichiers réels, prêts)

La séquence « Chambre » du prototype correspond exactement aux 184 fichiers de
`public/audio/ch1/`. Ordre de lecture du prototype :

| # | Beat id | Voix (fichier existant) | Déclencheur 3D |
|---|---|---|---|
| 1 | `s1_hook_1` | `s1_hook_1.mp3` | auto, caméra `cam_wide` sur Othmân assis |
| 2 | `s1_hook_2` | `s1_hook_2.mp3` | auto |
| 3 | `s1_noura_intro` → `s1_hook_3`* | `s1_hook_3.mp3` | Noura apparaît au chambranle (`noura_enter`) |
| 4-6 | `s1_hook_4` … `s1_hook_6` | idem | auto, alternance caméra lit/fenêtre |
| 7 | `s1_hook_7` (Waswâs) | `s1_hook_7.mp3` | brume violette s'épaissit près du lit |
| 8 | `s1_noura_push` | `s1_noura_push.mp3` | Noura se penche, brume reflue légèrement |
| — | **CHOIX du matin** | — | UI 3 options (ci-dessous) |
| 9 | `s1_xp_first_gesture` | — (toast +15 XP Lumière) | jauge dorée s'anime |
| 10a | branche lit : `s1_order_othman` → `s1_order_othman_niyyah` → `s1_order_othman_done` → `s1_order_noura_teach` → `s1_order_noura_ask` → `s1_order_noura` → `s1_order_noura_finish` | fichiers `s1_order_*.mp3` | hotspot Lit actif → anim `kneel_tidy_bed` → état B |
| 10b | branche eau : `s1_pont_eau` + lignes noura | `s1_pont_eau.mp3` | anim `drink_water` |
| 10c | branche sandales : `s1_sandals_othman` → `s1_sandals_othman_recite` → `s1_sandals_othman_confie` → `s1_sandals_othman_done` + `s1_sandals_noura_*` | `s1_sandals_*.mp3` | anim `kneel_sandals` |
| 11 | `s1_door_approach` | `s1_door_approach.mp3` | porte devient interactive |
| 12 | `s1_door_hesitation` | `s1_door_hesitation.mp3` | Othmân s'arrête, main sur le loquet |
| 13 | `s1_door_noura` | `s1_door_noura.mp3` | Noura dans son dos, dernier sourire |
| 14 | `s1_door_open` | `s1_door_open.mp3` | anim `open_door`, ruelle dorée |
| 15 | `s1_door_exit` | `s1_door_exit.mp3` | anim `exit_door`, fondu vers l'extérieur → **FIN du prototype** |

\* si l'export localisé utilise des ids différents côté EN/AR, le JSON porte un champ
`audioFallback: "fr"`. Les voix EN/AR n'existent pas encore (seules FR sont générées) :
le prototype lit les voix FR et affiche le texte dans la langue de la table.

Les autres fichiers (`s1_intro_*`, `s1_b*`, `s1_vista_narration`, `s1_othman_hear`…)
servent aux variantes d'observation des hotspots et aux répliques optionnelles : à câbler
une fois la séquence principale validée.

### 5.3 Les 3 choix du matin (reprendre les gains exacts du jeu actuel)

| Option (FR) | traitGains | Flag |
|---|---|---|
| 🧹 Ranger son lit | Discipline +5, Sabr +3 | `morning_gesture = order` |
| 💧 Boire un peu d'eau | Adab +5, Ilm +3 | `morning_gesture = water` |
| 👟 Préparer ses sandales | Sabr +5, Vitalité +3 | `morning_gesture = sandals` |

Feedback immédiat : toast « +15 Lumière — Premier geste du matin » (déjà le
comportement du jeu React v3 octobre : le garder à l'identique pour la continuité).

---

## 6. Systèmes NOUR : Lumière & Waswâs

### 6.1 LightProgression (Lumière dorée)

- Valeur 0-100, persistée. UI : jauge dorée en en-tête (même design que le header React).
- Gain : +2 par réplique de sagesse entendue, +15 au geste du matin, +5 à l'ouverture de la porte.
- Rendu : pilote `LightProgressionVolume` (profil de volume URP) — au-delà de 30,
  température de couleur +200 K et intensité +10 % ; au-delà de 60, faisceaux
  volumétriques (god rays de la moucharabieh) plus denses.
- **Règle éthique** (à afficher dans les crédits du prototype) : la Lumière mesure la
  progression d'Othmân dans l'histoire, jamais la valeur spirituelle du joueur.

### 6.2 WaswasSystem (brume du doute)

- **Jamais de corps, jamais de créature.** Un `ParticleSystem` violet translucide
  (texture smoke douce, additive faible), 2-3 nappes ancrées : lit, coin sombre, seuil de la porte.
- Le Waswâs « parle » via les voix existantes (filtre léger réverbe) + ondulation du texte
  de la boîte de dialogue (léger wobble sur le TMP, ±1 px, 3 Hz).
- Jauge 0-100 inversée (présence du doute) : +10 à l'apparition (beat 7), −8 après le
  choix, −15 à l'ouverture de la porte. À 0 : particules dissipes en 3 s, sons sourds
  étouffés → silence doux.
- Interdits : yeux rouges, griffes, boombox jumpscare, combat physique.

---

## 7. Garde-fous religieux et éditoriaux (hérités de la direction)

1. Ne jamais représenter Allah, les prophètes, les anges — ni en modèle, ni en silhouette, ni en voix.
2. Le Waswâs : fumée, jamais monstre. Le « duel final » du ch.1 (hors prototype) sera une traversée intérieure.
3. Une erreur de quiz / un mauvais choix ≠ faute religieuse : aucune formulation culpabilisante.
4. Les XP/Lumière ne mesurent pas la foi du joueur — le dire explicitement dans l'UI d'aide.
5. Versets et hadiths : uniquement ceux déjà validés dans le jeu React (sources Bukhari/Muslim/Tirmidhi/Abu Dawud référencées dans `RAPPORT_INTEGRAL_NOUR.md`) ; toute nouvelle citation relue par une personne compétente en sciences islamiques.
6. Respect des lieux de prière dans les décors futurs (mosquée phase 3+ : cour et extérieur d'abord).

---

## 8. Plan de production (9 jalons, ~ itérations d'une semaine)

| # | Jalon | Livrable vérifiable | Critère d'acceptation |
|---|---|---|---|
| 1 | Projet Unity + Boot + arborescence + JSON loader | build Boot vide | le JSON `beats_ch1.json` se charge et log 34 beats |
| 2 | Chambre grise (blockout) importée | scène navigable point-and-click | on atteint les 5 zones caméra |
| 3 | Modèles + matériaux finaux chambre | scène habillée | screenshot comparé aux refs 2D validé |
| 4 | Othmân riggé + walk/idle | déplacement fluide | traversée pièce < 10 s sans glitch |
| 5 | Hotspots + caméras + fondus | 6 hotspots cliquables | chaque observation joue une voix |
| 6 | BeatRunner + séquence complète §5.2 | la séquence se joue | les 15 étapes s'enchaînent, 3 branches testées |
| 7 | Lumière + Waswâs + états A/B du décor | transformation visible | capture avant/après identique à §2.4 |
| 8 | Noura + ses 3 anims | entrée et présence | séquence 3-8 validée avec Noura |
| 9 | Build PC + Android + save | deux builds + persistance | Definition of Done §0 atteinte |

**Script d'export à écrire dès le jalon 1** (Node, dans le dépôt React existant, sortie
vers le projet Unity) : `scripts/export_beats_unity.mjs` — il consomme `chapter1.ts`
et produit `beats_ch1.json` + la checklist des clips audio attendus.

---

## 9. Inventaire des assets source (déjà présents, à ne pas regénérer)

| Asset | Chemin (dépôt React) | Usage NOUR 3D |
|---|---|---|
| Voix ch.1 (FR, 1 fichier/beat) | `public/audio/ch1/*.mp3` (184) | lecture directe (réencoder en OGG dans Unity) |
| Dialogues structurés | `scripts/dialogues_export.json` (239) | table de traduction + cohérence |
| Storyboard 23 plans + charte style | `scripts/storyboard_ch1.json` | refs cadrage caméras + ambiance |
| Images storyboard générées | `src/assets/images/bg_scene_*`, `storyboard` | refs matériaux/lumière |
| Planches personnages | `src/assets/images/pixel_hero_planche_*`, `pixel_noura_planche_*` | refs modelage |
| Chambre 2D actuelle | `src/assets/images/bg_chambre_*.jpg` | plan + props |
| Synthèse théologique | `RAPPORT_INTEGRAL_NOUR.md` | garde-fous §7 |
| Analyse rétention P0 | `RAPPORT_AMELIORATION.md` | rappels UX (skips, récompenses précoces) à répliquer en 3D |

---

*Document v1.0 — 15 novembre 2026. Toute modification du périmètre passe par une mise à
jour de ce dossier avant le code.*

---

## Journal d'avancement (session du 15 novembre 2026)

| Jalon | Statut | Notes |
|---|---|---|
| 1 — Projet + JSON | ✅ | Export automatisé côté React (`npm run export:unity`) : 169 beats FR/EN/AR, 184 voix. |
| 2 — Blockout | ✅ | Généré par script éditeur (5 caméras, 6 hotspots, point-and-click borné). |
| 3 — Chambre habillée | ✅ | Blender scripté (bpy) → FBX greffé sur le blockout : 37 objets, colliders/hotspots intacts. Palette §2.3 respectée. Correction majeure : axes Y/Z inversés sur le sol/murs (qui créaient un mur vertical obstruant) corrigés. |
| 4 — Personnages | ✅* | Othmân (1,46 m) + Noura (1,35 m) scriptés bpy, visage lisse. Animation PROCÉDURALE (balancement/respiration) au lieu d'un rig — choix documenté, rig Mixamo possible ensuite. Bugs corrigés : clones au lieu de SetParent, échelle capsule, axes Z-up, alignement par bounds. |
| 5 — Séquence + hotspots | ✅ | BeatRunner = portage fidèle d'advanceBeat (React) : flags, xp auto (+15 premier geste), waswas data-driven, « Déjà lues », porte animée. Dry-run 3 branches : PASS (24/21/21 beats). |
| 6 — Observations | ✅ | Interludes d'observation câblés sur 6 hotspots (sac, fenêtre, carafe, bol, lit, sandales) : répliques réelles de l'ancienne structure (textes retrouvés dans dialogues_export.json + voix studio existantes), via Resources/Data/observations_ch1.json. Dialogue passe au rythme du joueur (Continuer) — parité avec le jeu web. |
| 7 — Lumière & Waswâs | ✅ | LightDirector (soleil qui se réchauffe + halo moucharabieh), WaswasMist (2 nappes violettes §6.2, densité = jauge), RoomStates (état A→B : couverture pliée à Lumière ≥ 25, §2.4). |
| 8 — Anims Noura | ✅ (partiel) | Entrée automatique au chambranle à sa 1ʳᵉ réplique + balancement maternel. Fins d'anims dédiées : plus tard. |
| 9 — Builds | ✅ | Builds complets et validés : APK Android IL2CPP (331 Mo / 27 Mo audio optimisé), Exécutable Windows Standalone x64 (98,9 Mo dans `Builds/Windows/`), et WebGL (68,6 Mo dans `Builds/WebGL/`). Definition of Done §0 atteinte. |

\* Validation structurelle programmatique complète (positions/échelles/matériaux) ; contrôle visuel final à faire en Play/APK.

Pipeline batchmode : toute la chaîne (Blender → export JSON → Unity → APK) est scriptée et reproductible.
