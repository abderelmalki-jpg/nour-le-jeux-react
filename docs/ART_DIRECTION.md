# Direction artistique de NOUR — fiche de style (v1, 2026-11-24)

> **Principe : un monde peint à l'heure dorée, habité par des figures en pixel-art.**
> Style « HD-2D » : décors illustrés, personnages et objets en pixel-art HD.
> Décisions validées : décors peints + personnages pixel ; aucun visage détaillé ; production par lots validés.

## 1. Pourquoi cette direction

Constat (voir `docs/ART_INVENTORY.md`) : les décors se répartissent aujourd'hui en plusieurs rendus (illustration dorée cinématographique, aquarelle, réalisme peint, pixel-art), les personnages sont en pixel-art HD cohérent. La famille « peinture dorée » est la plus aboutie, c'est celle de l'écran-titre, de la chambre, du marché, du village et des cinématiques ; elle sert donc de référence. Les personnages pixel existent déjà en planche (`src/assets/images/characters_master_sheet.jpg`) et fonctionnent par-dessus des décors peints dans le jeu actuel.

## 2. Règles par famille d'éléments

| Élément | Rendu | Format |
|---|---|---|
| Décors de scène | Illustration peinte, éclairage rasant chaud, matières douces, grande profondeur | 16:9, 1920×1080, WebP |
| Variante mobile (couvertures, stores) | Même peinture, cadrage vertical | 9:16, 1080×1920 |
| Écran-titre, affiches, captures stores | Illustration peinte **sans aucun texte** ; le titre est ajouté par l'interface | idem |
| Cinématiques / plans d'histoire | Peinture, plans verticaux 3:4 existants (`ch1_shots`) | 768×1024 → WebP |
| Personnages en jeu (portraits de dialogue, sprites, PNJ) | Pixel-art HD, contours nets sombres, palette réduite, **sans visage détaillé**, fond transparent | PNG |
| Personnages **dans** une illustration (écran-titre, affiche, cinématique, fin de chapitre) | Peints, de dos ou de loin, sans visage ; mêmes couleurs que le canon (§6) | inclus dans l'image |
| Objets, icônes, quêtes | Pixel-art HD, mêmes contours que les personnages | PNG |
| Waswâs (l'Ombre) | Volutes violettes en pixel-art ; jamais de silhouette humaine ni de créature | PNG / vidéo |
| Interface | Parchemin, bois, laiton ; polices Cinzel (titres), Cairo/Amiri (arabe) déjà embarquées | CSS |

## 3. Palette

| Usage | Couleurs de référence |
|---|---|
| Pierre et terre | ocre `#C98A4B`, terre cuite `#A8532F`, crème `#F4E6C8` |
| Végétation | vert olive `#6B7F3A`, vert tendre `#9DBE5B` |
| Lumière | or `#F2B84B`, ambre `#E88B2D`, rose d'aube `#E8A5A0` |
| Héros | sarcelle `#1F5F73` (cape d'Othmân), crème `#F2E8CF` (voile de Noura) |
| **L'Ombre (réservé)** | violet `#3B1F6B` → `#8A5CC7` : **uniquement** pour le Waswâs et les menaces |

Les codes sont des repères à ajuster sur les images de référence, pas des valeurs mesurées.

## 4. Lumière par chapitre

| Chapitre | Moment | Ambiance |
|---|---|---|
| 1 — Vaincre la Solitude | Aube | Or doux, brume légère, ombres longues |
| 2 — Le chemin du Hilm | Plein midi | Ambre chaud, contrastes francs (tension puis apaisement) |
| 3 — Le chemin du Tawakkul | Fin d'après-midi | Lumière basse, lampes allumées, tons miel |
| 4 — Ce que tu as encore | Matin | Vert tendre, lumière filtrée par le feuillage |
| 5 — Le Sommet de la Persévérance | Crêtes | Rose et bleu froid, neige, souffle large |

## 5. Architecture du monde

Une vallée fictive « méditerranéo-andalouse » : pierre ocre, arcs en plein cintre, zellige, treilles de vigne, fontaines, toits de tuiles.
- **Ne jamais reproduire un lieu saint réel** (Kaaba, Masjid an-Nabawi, Al-Aqsa…).
- Mosquée du village : une seule, toujours dessinée de la même façon (dôme et un minaret). Pas de minarets multiples « ottomans » au hasard.
- Intérieurs : moucharabieh, tapis tissés, lanternes en laiton (comme `chambre.jpg`).

## 6. Personnages (canon)

- **Othmân** : cheveux châtains en épis, cape à capuche sarcelle à liseré or, chemise crème, bandoulière et besace marron. Visage lisse.
- **Noura** : grand voile crème sur coiffe sarcelle, broche dorée, tunique sarcelle.
- Autres : voir la planche (villageois, villageoise, savant/père, enfant, voyageur, marchand turban rouge).
- **Visages** : lisses, sans yeux ni bouche, pour tous les humains, y compris la foule des décors.
- Aucune représentation des Prophètes ni des compagnons.
- Une même figure garde les mêmes couleurs dans tous les chapitres.

## 7. Interdits (à appliquer à toute nouvelle image)

1. Texte dans l'image (titres, panneaux, légendes) : l'interface s'en charge, pour rester traduisible.
2. Visages détaillés ; foules masquées ou à moitié visage.
3. Reproduction d'un monument religieux réel.
4. Mélange pixel / peint **dans un même objet** ; les figures pixel se posent sur un décor peint, jamais l'inverse.
5. Violet hors du Waswâs.
6. Doublons de fichier (un fichier = un écran).

## 8. Fichiers et performance

- WebP qualité 80 (≈ 150–250 Ko par décor) ; PNG uniquement pour la transparence.
- Nommage : `bg_<chapitre>_<lieu>_<variante>.webp`, `char_<nom>_<pose>.png`, `shot_<scene>_<id>.webp`.
- Objectif de poids : 64 Mo → ≈ 30 Mo pour `public/game-assets` + `src/assets`.

## 9. Gabarit de prompt (décor)

> *Painted storybook illustration, golden-hour light, soft painterly textures, rich depth, warm ochre stone, terracotta roofs, arches and zellige, lanterns. Scene: **[lieu + action]**. Time of day: **[selon chapitre]**. Same style as the reference image. 16:9, no text, no lettering, no signs with writing. Any human figure is seen from a distance or from behind, faceless smooth face, no facial features. No real-world landmarks.*

**Négatifs** : texte, lettres, logo, visage détaillé, yeux, bouche, photo réaliste, 3D, pixel-art dans le décor, minarets multiples, Kaaba.

Images de référence à joindre à chaque génération : `public/game-assets/title_screen_bg.jpg` (lumière, peinture), `public/game-assets/chambre.jpg` (matières, intérieur), `src/assets/images/characters_master_sheet.jpg` (figures).

## 10. Pixel sur peinture : rendu des personnages

- `image-rendering: pixelated`, mise à l'échelle par entiers.
- Ombre au sol douce sous chaque figure pour l'ancrer dans le décor.
- Léger étalonnage chaud commun (`filter` CSS) pour harmoniser la lumière.
- À valider sur 3 scènes (chambre, village, patio) avant de généraliser.

## 11. Corrections prioritaires identifiées

1. Carrefour : le panneau incrusté affiche « CH.3 • LE SABR », « CH.4 • BIRR AL-WALIDAYN », « CH.5 • LA MONTAGNE » (faux) → régénérer sans texte ; les étiquettes viennent de `CHAPTER_LABELS` (`src/i18n/uiExtras.ts`).
2. Affiche / hero : texte français incrusté, Othmân hors canon (calot) → illustration sans texte.
3. `marche.jpg` (visage peint) et `village_accueillant.jpg` (visages masqués) → figures sans visage.
4. Trois écrans de fin partageant une même image (`bg_chapter_end_dawn`, `bg_epilogue_coucher_soleil`, `bg_montagne_interieure_climax`) → trois images distinctes.
5. `bg_carrefour_sac_pose` identique à `bg_carrefour_poteau` → variante réelle ou suppression.
6. `bg_cour_familiale_parents` montre l'arbre et non une cour → à refaire pour le chapitre 4.
