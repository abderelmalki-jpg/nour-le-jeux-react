# Lot E (Visuels restants & corrections prioritaires) — prompts prêts pour Google Flow

*Fiche de style : `docs/ART_DIRECTION.md`. 8 images à produire (4 derniers décors pixel-art + 4 corrections prioritaires). Déposer les fichiers téléchargés dans `art_incoming/lot_e/` (dossier local, ignoré par git) ; je m'occupe ensuite de la compression (2K / 1920×1080 ou WebP), du renommage, du branchement et des tests.*

## Réglages communs

- **Modèle :** Nano Banana 2.1 dans Google Flow (2K si possible, 2–3 variantes par prompt).
- **Images de référence (« ingrédients ») à joindre :**
  1. `public/game-assets/title_screen_bg.jpg` : lumière et peinture dorée
  2. `public/game-assets/chambre.jpg` : matières, architecture intérieure
  3. `src/assets/images/characters_master_sheet.jpg` : canon des personnages (uniquement pour E8)
- **Format :** 16:9 pour E1 à E7 ; **1:1** pour E8.
- **Blocs de texte** à coller au début (**[STYLE]**) et à la fin (**[RÈGLES]**) de chaque prompt :

**STYLE**
> Painted storybook illustration in the same style as the reference images: golden-hour light, soft painterly textures, rich depth, warm ochre stone, terracotta roofs, arches and zellige tiles, brass lanterns. Wide cinematic scenery.

**RÈGLES**
> Absolutely no text, no letters, no writing, no logo anywhere in the image. Any human figure is seen from behind or from far away, with a smooth blank face: no eyes, no mouth, no facial features. No real-world landmarks, no photograph, no 3D render, no pixel art.

---

## Partie 1 — Les 4 derniers décors pixel-art à repeindre

### E1 — Arbre aux racines anciennes (Chapitre 4)
*Remplace `src/assets/images/bg_arbre_racines_anciennes.jpg`.*

> [STYLE] Morning sunlight filtering through the leaves of a magnificent ancient olive and oak tree on a grassy hillside overlooking a peaceful ochre stone valley. Massive gnarled roots hugging mossy stones, soft green foliage, wildflowers, a small wooden bench beside the trunk, a winding dirt path below. Warm tender green and soft morning gold palette, calm contemplative atmosphere. Empty scene, no people. [RÈGLES]

### E2 — Halte du thé & apaisement (Chapitres 2–3)
*Remplace `src/assets/images/bg_halte_the_apaisement.jpg`.*

> [STYLE] A quiet shaded stone terrace under a wooden vine pergola in late afternoon honey light. A low carved wooden table with a traditional brass teapot, two small glass tea cups with fresh mint leaves, a woven rug on warm terracotta tiles, a glowing brass lantern hanging from an arch, terracotta pots with herbs, warm ochre village rooftops and hills in the background. Peaceful, restorative mood. Empty scene, no people. [RÈGLES]

### E3 — Verger à la fleur et à la lanterne (Chapitres 1–3)
*Remplace `src/assets/images/bg_verger_fleur_lanterne.jpg`.*

> [STYLE] A blooming almond and olive orchard at golden-hour sunset. Soft white and pale-pink blossoms on twisted branches, a cobblestone garden path, a glowing brass lantern resting on a low ochre stone wall next to a small wildflower bush, dappled warm golden light streaming through the trees, a gentle stream sparkling in the background. Poetic, serene mood. Empty scene, no people. [RÈGLES]

### E4 — Fond Waswâs — brume violette (Landing & démo)
*Remplace `public/game-assets/waswas_bg.jpg`.*

> [STYLE] A quiet ancient stone courtyard and archway at twilight, partially enveloped by a swirling mist of deep violet and indigo smoke (#3B1F6B to #8A5CC7) drifting across the cobblestones, with a warm golden brass lantern still glowing steadily in the foreground, pushing back the purple mist. No creature, no eyes, no face, no human silhouette inside the mist. Atmospheric, dramatic yet safe for children. [RÈGLES]

---

## Partie 2 — Les 4 corrections prioritaires

### E5 — Carrefour avec sac (variante A2)
*Remplace `src/assets/images/bg_carrefour_sac_pose.jpg`. À produire en mode **« Modifier / Éditer »** dans Flow à partir de l'image `A1` (`public/game-assets/carrefour.jpg`) pour garder exactement le même plan.*

> Same image, unchanged, except add a worn brown leather traveler's backpack and a small brass-and-leather water flask resting gently on the grass at the foot of the wooden signpost. Keep all five wooden signpost boards completely blank with no symbols and no writing. Nothing else changes. [RÈGLES]

### E6 — Village accueillant (sans foules masquées)
*Remplace `src/assets/images/bg_village_accueillant.jpg` et `public/game-assets/village_accueillant.jpg`.*

> [STYLE] A sunlit welcoming village square in a Mediterranean-Andalusian ochre stone valley at golden hour. A central tiled stone fountain with sparkling water, arched doorways, blue wooden shutters, terracotta flower pots, woven carpets airing on balconies, ONE small village mosque with a single dome and a single slim minaret in the distance. A few distant silhouettes of villagers seen strictly from behind walking peacefully far away, smooth blank faces, no masks, no facial features. Warm, joyful community mood. [RÈGLES]

### E7 — Marché des grenades (sans visage détaillé)
*Remplace `public/game-assets/marche.jpg` (et vérifie l'harmonie avec `bg_marche_fruits_renverses.jpg` / `bg_marche_fruits_reconcilie.jpg`).*

> [STYLE] A vibrant traditional sunlit village market alley at midday in warm amber and ochre tones. Wooden market stalls under striped cream and terracotta cloth awnings, woven baskets overflowing with ripe red pomegranates, oranges, figs, spices and dates, stone arches and hanging brass lanterns overhead. Empty market alley with no people or only distant silhouettes seen strictly from behind, no faces at all. [RÈGLES]

### E8 — Affiche partage réseaux / OG sans texte (Format 1:1)
*Remplace `public/affiche_nour_whatsapp.jpg` (qui contient aujourd'hui du texte incrusté).*

> [STYLE] Square 1:1 key art illustration. A young traveler seen strictly from behind (messy chestnut-brown hair, teal hooded cloak with thin gold trim over a cream shirt, brown leather satchel across the chest) standing on a sunlit hilltop path with a glowing brass lantern beside him, looking out over a luminous golden valley with olive groves, a winding river, and a small ochre village with ONE single-domed mosque and one slim minaret. Calm golden sunrise sky in the upper third, completely empty. No frame, no border, no banner. [RÈGLES]

---

## Nommage des fichiers à déposer dans `art_incoming/lot_e/`

`E1_arbre_racines`, `E2_halte_the`, `E3_verger_lanterne`, `E4_waswas_bg`, `E5_carrefour_sac`, `E6_village_accueillant`, `E7_marche_grenades`, `E8_affiche_og` (format PNG, JPG ou WebP — je les optimiserai et les installerai sous leurs noms cibles).
