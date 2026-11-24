# Lot A — prompts prêts pour Google Flow

*Fiche de style : `docs/ART_DIRECTION.md`. 7 images à produire. Déposer les fichiers dans `art_incoming/lot_a/` (dossier local, non versionné) ; je m'occupe ensuite de la compression, du renommage, du branchement et des tests.*

## Réglages communs

- **Images de référence à joindre à chaque génération** (les « ingrédients » de Flow) :
  1. `public/game-assets/title_screen_bg.jpg` : lumière et peinture
  2. `public/game-assets/chambre.jpg` : matières, intérieur
  3. `src/assets/images/characters_master_sheet.jpg` : canon des personnages (pour les images avec figures)
- **Format** : 16:9 sauf mention contraire. Si Flow ne propose pas le format voulu, générez en 16:9 : je recadre.
- **Qualité** : la plus haute disponible. Générez **3 variantes** par image, gardez la meilleure.
- **Blocs de texte** à coller **en début** de chaque prompt :

**STYLE**
> Painted storybook illustration in the same style as the reference images: golden-hour light, soft painterly textures, rich depth, warm ochre stone, terracotta roofs, arches and zellige tiles, brass lanterns. Wide cinematic scenery.

**RÈGLES** (à coller en fin de chaque prompt)
> Absolutely no text, no letters, no writing, no logo anywhere in the image. Any human figure is seen from behind or from far away, with a smooth blank face: no eyes, no mouth, no facial features. No real-world landmarks, no photograph, no 3D render, no pixel art.

**Personnages canon** (à ajouter quand une figure apparaît)
> Othmân: a boy with messy chestnut-brown hair, a teal hooded cloak with thin gold trim over a cream shirt, a brown leather satchel across the chest. Noura: a woman in a large cream veil over a teal inner cap, teal tunic, small golden brooch.

---

## A1 — Carrefour, version sans sac
*Remplace `bg_carrefour_poteau_*.jpg` (texte incrusté faux). Les noms de chapitres seront ajoutés par l'interface sur les planches.*

> [STYLE] A wooden crossroads signpost at golden-hour sunset, five blank wooden arrow-shaped boards pointing in different directions, painted green, rust-brown, blue, purple and ochre-gold, **completely empty boards: smooth wood, no symbols, no writing**. A glowing brass lantern on a wooden post on the left, a cobblestone path splitting into several paths, wildflowers. In the distance on the left a village of ochre houses with ONE mosque with a single dome and a single slim minaret; on the right a rocky cliff with a waterfall and a river. No backpack, no people. [RÈGLES]

## A2 — Carrefour, version avec sac
*À produire **à partir de A1** (fonction « modifier / éditer » de Flow) pour garder exactement le même plan.*

> Same image, unchanged, but add a brown leather backpack and a metal water flask resting at the foot of the signpost. Nothing else changes. [RÈGLES]

## A3 — Affiche / héros (sans texte)
*Remplace `hero_landing.jpg` / `affiche_nour.jpg` (même fichier, texte français incrusté, héros hors canon). Format **1:1** (et, si possible, une version **9:16**).*

> [STYLE] Key art. Othmân seen from behind, sitting on a rock at the edge of a cliff, looking over a luminous valley at sunrise: a winding river, terraced fields, a small village with ONE domed mosque. A brass lantern glows on the rock beside him. [Personnage canon: Othmân]. Leave a calm area of sky in the top third, empty, for a title added later. No decorative frame, no banner, no scroll. [RÈGLES]

## A4 — Fin de chapitre (aube)
*Écran de fin de chapitre (`fin`) : aujourd'hui il partage son image avec l'épilogue et le climax.*

> [STYLE] Dawn over a mountain valley, soft pink and gold sky, thin mist in the valleys, a path winding from the foreground cliff toward the horizon where a new village appears. Othmân and Noura seen from behind on the cliff edge, side by side, Noura holding a glowing brass lantern. [Personnages canon: Othmân, Noura]. Mood: hope, a journey continuing. [RÈGLES]

## A5 — Montagne du climax (Hilm)
*Fond du combat contre le Waswâs de la colère (thème `climax_hilm` / `montagne_climax`). Doit être **différente** des écrans de fin.*

> [STYLE] A rocky mountain pass at dusk. A swirling vortex of ash-grey and ember-red mist with dark violet edges fills the pass, the Shadow of anger, with no face, no eyes, no creature shape inside it. A stone path climbs through the pass; far behind, a tiny warm light of a village. Sky heavy with purple and orange clouds. No people. Mood: tense, but beautiful. [RÈGLES]

## A6 — Épilogue (coucher de soleil)
*L'image actuelle (`bg_epilogue_coucher_soleil.jpg`, deux personnages sur un rocher face à la vallée) est **très réussie** : on la **garde** pour l'épilogue. Seul défaut : les couleurs des personnages ne suivent pas le canon (tunique verte, voile orange).*
*Option (facultative) : la fournir à Flow en mode « modifier » :*

> Same image, unchanged. Only change the clothing colors: the boy's cloak and tunic become a teal hooded cloak with thin gold trim over a cream shirt; the woman's veil becomes cream over a teal cap and her dress becomes teal. Keep faces smooth and blank, seen from behind. [RÈGLES]

## A7 — Ruelle du refus
*Remplace `bg_scene_refus_ruelle_*.jpg` (pixel-art) par une version peinte, **sans personnage** (la scène place les personnages au-dessus).*

> [STYLE] A narrow cobblestone alley in an ochre stone village, late-morning light, a large stone arch overhead framing a bit of blue sky, a wooden lattice balcony, blue wooden shutters, terracotta pots with herbs and flowers, a laundry line, an artisan's wooden workbench on the left with coils of rope, a hammer and a lantern. Empty street, no people. [RÈGLES]

---

## Contrôle d'une image avant de me l'envoyer

- [ ] Aucun texte, lettre, chiffre, symbole écrit (planches, enseignes, tapis compris).
- [ ] Aucun visage détaillé (yeux, bouche) ; figures de dos ou lointaines.
- [ ] Lumière et palette proches de `title_screen_bg.jpg`.
- [ ] Une seule mosquée, un dôme, un minaret fin, jamais un lieu saint réel.
- [ ] Violet uniquement dans le Waswâs (A5).
- [ ] Résolution ≥ 1920×1080 si possible.

## Nommage des fichiers à déposer

`A1_carrefour_sans_sac`, `A2_carrefour_sac`, `A3_hero_1x1`, `A3_hero_9x16` (si disponible), `A4_fin_chapitre`, `A5_climax_hilm`, `A6_epilogue_canon` (facultatif), `A7_ruelle_refus` — n'importe quel format (png, jpg, webp).

---

## Résultat (2026-11-24)

Générées avec Nano Banana 2.1 (2752×1536, ou 2048×2048 pour l'affiche), converties en JPEG 80 % en 2K (2560×1440, ou 2048×2048 pour l’affiche) et installées :

| Image | Installée à la place de | Statut |
|---|---|---|
| A1 carrefour sans texte | `public/game-assets/carrefour.jpg`, `bg_carrefour_poteau_*`, `bg_carrefour_sac_pose` | fait |
| A3 affiche sans texte (1:1) | `hero_landing.jpg`, `affiche_nour.jpg` | fait |
| A4 fin de chapitre | `bg_chapter_end_dawn_*` | fait (1re version refusée par le filtre de sécurité, reformulée) |
| A5 climax du Hilm | `bg_montagne_interieure_climax` | fait |
| A7 ruelle du refus | `bg_scene_refus_ruelle_*` | fait |
| A2 carrefour avec sac | — | **non fait** (crédits épuisés) : `bg_carrefour_sac_pose` reprend A1 |
| A6 épilogue recoloré | — | non fait : l'image actuelle est conservée |

Originaux des fichiers remplacés : récupérables via git. Fichiers sources : `art_incoming/lot_a/` (local, non versionné).

**Vérifié en jeu (scène 10)** : la scène du carrefour lisait une **vidéo** (`public/game-assets/carrefour_poteau.mp4`) avec l'ancien panneau incrusté (« CH.3 • LE SABR »). `SceneBackground.tsx` affiche désormais l'image fixe sans texte ; la vidéo n'est plus utilisée (fichier conservé).

**Points à traiter** : l'image OG `affiche_nour_whatsapp.jpg` (partage réseaux) contient du texte et n'a pas été touchée.
