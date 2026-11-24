# Chapitres 4–5 et unification du style — dossier de préparation

*Préparé le 2026-11-24. C'est un plan de travail : aucun contenu de jeu n'a été écrit. Toute référence religieuse citée ici est une piste à faire valider par un savant avant intégration.*

## 1. Ce qui existe déjà

| Élément | État |
|---|---|
| Chapitre 4 « Ce que tu as encore » (Birr al-Wālidayn) | Fiche dans `gameData.ts` (synopsis, vertu, 4 points clés), statut « en scénarisation ». **Aucune scène** dans `src/data`. |
| Chapitre 5 « Le Sommet de la Persévérance » (Sabr) | Fiche seule, image `vallee.jpg`. **Aucune scène.** |
| Décors prêts pour le ch. 4 | `bg_cour_familiale_parents.jpg`, `bg_arbre_racines_anciennes.jpg`, `teaser_chapitre4.jpg` (déclarés dans `assets.ts` : `cour_parents`, `arbre_racines`). |
| Portraits prêts pour le ch. 4 | `pixel_pere_bienveillant_portrait.png`, `pixel_grand_pere_sage_portrait.png`, `pixel_enfant_village_portrait.*` (l'« ami d'enfance »). |
| Mécaniques réutilisables | Scènes à beats, quiz, « Ponts de Nour » (actions réelles), combat final (`ClimaxCombat`, duels par chapitre), cinématiques de transition. |
| Traduction EN/AR | Architecture en dictionnaire (`src/i18n/chapterNTranslations.ts`) : un chapitre = un fichier de données FR + un fichier de traduction. |

## 2. Chapitre 4 — « Ce que tu as encore » (Birr al-Wālidayn)

**Promesse pédagogique** : reconnaître ce que l'on tient pour acquis chez ses parents, et passer de l'agacement à la gratitude par des gestes concrets.

**Structure proposée (7 scènes, sur le modèle des ch. 2 et 3 : ~25 à 30 min)**

| # | Scène | Rôle narratif | Vertu / notion |
|---|---|---|---|
| 19* | Le matin agacé | Othmân s'emporte contre sa mère puis claque la porte. Choix de la réplique. | Patience, parole douce |
| 20 | Sous le grand arbre | L'ami d'enfance, l'oiseau qui nourrit son nid. Contemplation. | Tawakkul (subsistance), observation |
| 21 | La confidence | L'ami confie une perte (parent malade ou disparu — à traiter avec délicatesse pour les enfants). Retournement émotionnel. | Gratitude, empathie |
| 22 | Le retour à la maison | Othmân revoit les gestes quotidiens de ses parents. | Reconnaissance (shukr) |
| 23 | Le geste réparateur | Choix : mots, service, cadeau modeste. Pont de Nour : remercier un parent. | Birr, ihsān |
| 24 | L'Ombre de l'ingratitude (combat) | Duels : « ils n'ont fait que leur devoir », « tu as mieux à faire », indifférence. | Combat 3 rounds, ch. 4 |
| 25 | Le soir qui apaise | Épilogue, ouverture vers le ch. 5. | Synthèse |

\* Les identifiants de scène suivent la numérotation existante (ch. 3 = 17 à 25, y compris 201/202). Prévoir 30 à 36 pour éviter les collisions et mettre à jour les tests `currentScene.id >= 17 ? 3 : …` dans `App.tsx` (7 occurrences, 9 dans tout `src`) pour gérer un chapitre 4.

**Références à faire valider (pistes, non vérifiées)** : Coran 17:23-24 (bonté envers les parents), Coran 31:14, hadith « la satisfaction du Seigneur est dans la satisfaction du père » (Tirmidhi), hadith « ta mère, puis ta mère, puis ta mère, puis ton père » (Bukhari 5971 / Muslim 2548). **À contrôler : numérotation, texte arabe, traduction.**

**Points de vigilance éditoriale**
- Public enfant : la « confidence » doit rester douce (pas de deuil détaillé) ; prévoir un avis de parent-relecteur.
- Ne pas laisser entendre que les parents ont toujours raison : insister sur le ton et la gratitude, pas sur l'obéissance aveugle.
- Garder des parents « présents » à l'écran : seules 2 portraits existent (père, grand-père) ; **la mère est déjà Noura** : décider si Noura = la mère d'Othmân dans toute la saga et rester cohérent.

## 3. Chapitre 5 — « Le Sommet de la Persévérance » (Sabr)

**Promesse** : l'ascension finale, qui convoque les vertus des chapitres 1 à 4.

**Structure proposée (6 scènes)** : ascension (fatigue), ancrage dans l'Istiʿādhah (rappel ch. 1), halte et eau/ablutions (rappel ch. 2), appui des autres (rappel ch. 3), reconnaissance des parents (rappel ch. 4), combat final (4 rounds, un par vertu), lumière sur la vallée (finale + remerciements).

**Dépendances** : le combat final doit recycler **les rounds de chaque chapitre** — d'où l'intérêt d'avoir corrigé le combat du chapitre 2 (désormais colère et pardon) avant de bâtir celui-ci.

**Décision à prendre** : fin « ouverte » (pour des chapitres 6+) ou fin de saga ? Cela change le texte de la fiche, de la FAQ et du `llms.txt`.

## 4. Charge de travail et ordre conseillé

| Étape | Contenu | Estimation |
|---|---|---|
| A | Synopsis détaillé + beats ch. 4 (FR) | 1 session |
| B | Quiz (4 à 5), 7 « Ponts de Nour », 3 rounds de combat (FR) | 1 session |
| C | Relecture religieuse + parent-relecteur | externe |
| D | Traductions EN/AR (dictionnaire) | 1 session |
| E | Branchement (App.tsx, carte, `gameData`), tests complets FR/EN/AR | 1 session |
| F | Voix FR (CAMB ou voix d'origine) puis AR | selon crédits |
| G | Ch. 5 : mêmes étapes, après le ch. 4 | ~4 sessions |

Option pour livrer plus vite : sortir le chapitre 4 seul (le « 5 » restant « bientôt »), ce qui est déjà le cas dans l'interface.

## 5. Unification du style visuel

### Constat (issu de l'audit)
- 81 fichiers dans `src/assets/images` (16 Mo), dont 35 décors et de nombreux portraits : **trois générations de rendu coexistent** — pixel-art 16-bit (portraits `pixel_*`), illustrations « photoréalistes douces » (`game-assets/*.jpg`, `ch1_shots`), vidéos IA (`*.mp4`, `waswas_tornado.mp4`).
- Plusieurs scènes des chapitres 2 et 3 **réutilisent** des décors du chapitre 1 (`village_mefiant`, `chambre_defait`, `maison_soins`…) avec des textes qui ne correspondent pas toujours (ex. la fièvre sur « chambre défaite »).
- Certains portraits existent en `.jpg` et en `.png` (doublons) : ménage à faire.

### Direction proposée
1. **Choisir un seul langage** : recommandation = pixel-art 16-bit pour les personnages (déjà le cœur de l'identité « RPG » et du nom du jeu) et décors peints dans la même palette, plutôt que des photos retouchées.
2. **Fiche de style** (1 page) : palette limitée (≈ 24 couleurs), éclairage par chapitre (aube dorée, brume violette, etc.), taille de sprite, contour, ratio d'image (16:9 et 9:16 pour mobile).
3. **Inventaire** : un tableau de tous les décors/portraits avec chapitre, usage, conformité (✔ / à refaire). Je peux le générer automatiquement.
4. **Priorité de refonte** : (1) écran-titre et captures stores (c'est la première impression), (2) décors du ch. 1 (gratuit, vu par tous), (3) décors manquants des ch. 2–3, (4) ch. 4–5.
5. **Règle de contenu islamique** (à valider par un savant) : pas de représentation des Prophètes ni des compagnons ; visages stylisés pour les personnages ; pas d'images de lieux saints reproduits de façon inexacte.

### Budget / outils
La génération d'images se fait avec des outils externes (voir les services connectés à votre compte). Chaque lot doit être validé visuellement avant intégration. **Rien n'est généré à ce stade.**

## 6. Décisions que j'attends de vous

1. Noura est-elle bien **la mère d'Othmân** dans toute la saga ?
2. Ch. 4 seul d'abord, ou ch. 4 et 5 ensemble ?
3. Style : on adopte **pixel-art 16-bit partout** ?
4. Qui relira les références religieuses et le ton pour enfants ?
