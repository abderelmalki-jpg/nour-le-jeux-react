# 🔍 Audit complet de NOUR : histoire, pédagogie, textes, design, médias, UX
*24 novembre 2026 : version 1.0.4, code du dépôt `nour-le-jeux-react`*

> **Ambition visée :** devenir le jeu islamique de référence où l'on apprend dans un monde ludique d'aventure.
> **Verdict en une phrase :** NOUR a une **âme rare** (un vrai récit, une vraie émotion, des actions concrètes à faire dans la vie réelle) et une **très belle première impression**, mais c'est aujourd'hui **un chapitre vertical de démonstration, pas encore un jeu complet**. Le contenu est court (~30 min de lecture), répétitif dans sa mécanique, incomplet dans ses traductions, et la direction artistique mélange trois styles. Tout cela se corrige, et la fondation est bonne.

---

## 0. Méthode et limites (pour savoir ce que ce rapport vaut)

**Ce que j'ai réellement fait**
- Lu **100 % du script français** (28 scènes, 305 répliques/étapes, ~5 960 mots), extrait par script depuis le code.
- Analysé par script : **tous les quiz, toutes les références religieuses citées, la couverture des traductions, la couverture des voix, 151 images + 14 vidéos + 289 fichiers audio, les fichiers inutilisés et cassés**.
- **Lancé le jeu** dans un navigateur : écran-titre, début du chapitre 1 (≈ 15 répliques, un choix, un quiz libre), les onglets Chemin / Quêtes / Inventaire / Profil, en **bureau, en vue iPhone (390 et 375 px) et en arabe (RTL)**.

**Ce que je n'ai PAS fait (à ne pas supposer)**
- Je n'ai **pas écouté les voix** : je ne juge que leur présence, pas leur qualité.
- Je n'ai **pas joué chaque scène**, ni les 3 combats finaux jusqu'au bout : leur analyse vient du code et des données.
- Je n'ai **pas testé sur un vrai iPhone** (marges d'encoche, son en mode silencieux, notifications).
- Je **ne suis pas un savant** : toute remarque religieuse ci-dessous est un signalement « à faire relire », jamais un avis de jurisprudence ni un grade de hadith.

**Légende** : 🔴 bloquant avant diffusion large · 🟠 important · 🟡 amélioration · 🟢 point fort · ✅ vérifié dans le code/les fichiers · ❓ à confirmer en jeu.

---

## 1. Tableau de bord

| Axe | Note /10 (mon appréciation) | En un mot |
|---|---|---|
| Histoire & écriture | **6,5** | Belle émotion, mais formule répétée et chapitres 2–3 minces |
| Pédagogie & fiabilité religieuse | **6** | Excellente idée « Actions réelles », quiz trop faciles, références à faire vérifier |
| Textes & traductions | **5** | Ch.1 en 3 langues, **ch.2–3 en français seulement**, interface partiellement non traduite |
| Direction artistique | **7** | Titre magnifique, mais 3 styles mélangés et personnages sans visage « inachevés » |
| Images / vidéos | **6,5** | Fonds superbes, formats incohérents, fichiers cassés ou inutiles |
| Audio | **6** | 96 % des répliques ont une voix, mais pas les 7 premières du jeu |
| UX / parcours joueur | **6** | Navigation propre, début de partie à fluidifier, trop de systèmes pour trop peu de contenu |
| Technique & conformité | **6,5** | Corrigé en grande partie cette semaine (App Store), reste le web |

### Les 12 problèmes les plus importants (détaillés plus bas)

1. 🔴 **Contenu trop court pour tenir la promesse** : ~6 000 mots, environ 30 min de lecture (≈ 1 h avec les pauses). Les chapitres 4 et 5 sont annoncés mais absents.
2. 🔴 **Les chapitres 2 et 3 n'existent qu'en français** alors que le jeu et la politique de confidentialité annoncent FR/EN/AR.
3. 🔴 **Les voix françaises jouent par-dessus le texte anglais ou arabe**, *(corrigé le 24/11 : la voix française est maintenant coupée en EN/AR)*.
4. 🔴 **Quiz trop faciles à deviner** : la bonne réponse est la plus longue dans **16 quiz sur 19**, et n'est jamais en 3ᵉ/4ᵉ position dans les chapitres 2 et 3.
5. 🔴 **Références religieuses à faire relire** par un savant (liste en annexe), dont une recommandation (ablutions contre la colère) qui s'appuie sur un hadith que plusieurs spécialistes jugent faible.
6. 🟠 **Les 7 premières répliques du jeu n'ont aucune voix** (silence, le code ne lit pas de voix de secours) : c'est la toute première minute.
7. 🟠 **Cinq médias référencés n'existent pas** (404), dont la vidéo de la page d'accueil (écran noir) et l'image préchargée à chaque ouverture.
8. 🟠 **Trois styles graphiques** (peinture, pixel art, vecteur plat) et des **personnages en double** (sprite + personnage déjà dans le décor).
9. 🟠 **Formule narrative identique dans chaque scène** (Waswas souffle → Noura enseigne → quiz → le héros répète la leçon → « et toi, dans ta vraie vie… »).
10. 🟠 **Le début de partie impose un écran de choix de chapitre** où les chapitres 2 et 3 sont déjà ouverts : un nouveau joueur peut commencer au milieu.
11. 🟠 **Trop de systèmes en parallèle** (XP, niveau, Lumière, jauge du Waswas, 2 familles de statistiques différentes, série, habitudes, quêtes, badges, rangs, équipement) pour une heure de jeu.
12. 🟠 **Web : enregistrement de session et analytics sans consentement visible**, et lien de paiement Stripe en **mode test** derrière le bouton « Soutenir ».

---

## 2. 🟢 Ce qui est déjà très bien (à protéger)

- **Un vrai héros avec une vraie fragilité** : Othmân, enfant timide qui parle à son sac. L'ouverture (« Tu parles à ton sac maintenant ? ») crée de l'attachement en dix secondes.
- **Le Waswas comme voix intérieure** : un « méchant » qui n'est pas un monstre mais le doute de l'enfant (« Tu n'y arriveras jamais »). C'est psychologiquement juste et pédagogiquement fort.
- **Les « Actions réelles »** (21 au total) : ce qui distingue NOUR d'un simple quiz. Chaque leçon se prolonge dans la vraie vie (saluer, ranger, pardonner, remercier). **C'est votre meilleur atout produit.**
- **Un ton positif et sans violence**, des leçons d'Adab concrètes (boire de la main droite, le sourire est une aumône, pardonner).
- **Continuité entre chapitres** : le marchand du chapitre 2 revient au chapitre 3 avec une soupe, le jeune à l'attelle aussi. Très bien.
- **Écran-titre superbe** (logo, lumière, lanterne) et décors peints chaleureux ; la **chambre à moucharabieh** est une vraie réussite.
- **Choix de ne pas montrer de visages** (adultes) : cohérent avec la sensibilité de votre public (voir §6 pour la finition).
- **Arabe vocalisé et mise en page RTL** correctement gérés en jeu.
- **Rejouabilité par traits** : 6 traits de caractère (discipline, sabr, hilm, adab, vitalité, ʿilm) qui adaptent certains textes (« variantes adaptatives »).
- **Technique** : polices et son désormais embarqués, fonctionnement hors ligne, interface mobile corrigée.

---

## 3. Histoire et écriture

### 3.1 Les chiffres (✅)

| | Ch. 1 | Ch. 2 | Ch. 3 | Total |
|---|---|---|---|---|
| Scènes | 9 | 8 | 11 | **28** |
| Répliques / étapes | 169 | 57 | 79 | **305** |
| Mots | 3 004 | 1 121 | 1 832 | **5 957** |
| Quiz dans l'histoire | 9 | 5 | 5 | **19** |
| Actions réelles | 8 | 5 | 8 | **21** |
| Moments de choix | 7 | 4 | 4 | **15** |
| Choix proposés (menus de chapitres inclus) | 23 | 11 | 11 | 45 |

**Lecture :** le chapitre 1 est riche (169 étapes) ; le chapitre 2 est **trois fois plus léger** (57) ; le chapitre 3 est intermédiaire. L'énergie de production baisse nettement après le chapitre 1.

### 3.2 Problèmes d'histoire et de structure

**🔴 S1. Durée insuffisante.** ~6 000 mots ≈ 30 min de lecture. Pour « le premier jeu islamique où l'on apprend en s'amusant », il faut viser **2 à 3 heures** (6 à 8 chapitres complets) pour installer l'habitude, ou bien assumer clairement « Saison 1 : 3 chapitres » dans la communication.

**🔴 S2. Promesses non tenues.** Le carrefour propose les chapitres 4 (« La Bonté envers les Parents ») et 5 (« La Montagne Intérieure ») en grisé ; l'écran de sélection affiche « Chapitre 4 : Le Respect aux Parents, Bientôt ». Les décors existent déjà (cour familiale, arbre aux racines) mais **aucune scène**. Les personnages `pere`, `grand_pere`, `savant` ont des portraits mais **ne parlent jamais** (✅ aucun dialogue).

**🟠 S3. Numérotation et titres des chapitres incohérents** (✅). Le chapitre 3 s'appelle :
- « **Face à la Maladie** » (carrefour du chapitre 1),
- « **L'Enfant à l'Attelle : La Patience (Sabr)** » (menu et écran de sélection),
- « **La Prise de Décision & la Confiance en Dieu** » (fin du chapitre 2).
Le chapitre 1 est « Combattre le Waswâs » *ou* « Vaincre la Solitude » *ou* « L'Aventure Intérieure ». Et « **La Montagne Intérieure** » est à la fois le titre du *chapitre 5* annoncé et celui de la *dernière scène du chapitre 3*. → **Un seul titre par chapitre, partout.**

**🟠 S4. La scène 10 (« L'Aube au Grand Poteau ») n'est qu'un menu** : 1 étape, 8 mots, aucune narration. Elle compte comme une scène du chapitre 2.

**🟠 S5. Formule répétée à l'identique** (chapitres 1 à 3) :
1. Le Waswas souffle un doute → 2. Noura (la mère) « enseigne » → 3. Quiz → 4. **Le héros reformule la bonne réponse** (« Le verset 49:13… donc la différence est une invitation ! ») → 5. Noura : « Et toi, dans ta vraie vie… » → 6. Action réelle → 7. Le héros : « Je me sens déjà plus calme ».
Après trois scènes, le joueur devine tout. **Le quiz est redondant** puisque le héros énonce la réponse juste après, et le joueur apprend « par cœur » plutôt qu'en vivant une situation.

**🟠 S6. Un adulte parle, l'enfant écoute.** Noura prononce ~75 répliques, souvent des leçons (« Tu vois, Othmân… »). Le héros « se sent plus calme » après chaque conseil : on **raconte** le changement au lieu de le **montrer**. Il n'y a ni obstacle matériel, ni mystère, ni humour, ni compagnon, ni objectif concret qui avance d'une scène à l'autre : hors du Waswas, **il n'y a pas d'intrigue**, seulement une série de leçons.

**🟠 S7. Les choix comptent peu** (✅ tous les vrais choix donnent des points de traits, ❓ mais la plupart convergent vers la même suite ; les 8 entrées « sans effet » comptées par mon script sont des menus de chapitres). Exemple : à la scène 4, le joueur choisit **un** de trois lieux (place, ruelle, verger), qui mènent tous à la scène 8. ❓ **Il ne vit donc qu'une des trois leçons**, alors que la scène finale (« fragments de mémoire ») évoque les six souvenirs, dont les trois. À confirmer en jeu : si c'est le cas, c'est une incohérence de continuité.

**🟡 S8. Doublon de contenu.** Le même quiz (`quiz_niyyah`, mêmes mots, même explication) apparaît **deux fois** dans le chapitre 1 (scène 1 et scène 7). De même, le héros répond « Peut-être. Mais… j'avance / je vais essayer quand même ! » au Waswas aux scènes 3 et 9 (effet de refrain voulu ? à décider).

**🟡 S9. Le héros est masculin et unique.** « Othmân… mon fils » : un enfant ou une famille avec une fille se projette moins. Option : choix Othmân / une héroïne, ou un duo (frère/sœur).

**🟡 S10. Indications de mise en scène dans le texte** : « (Silence) », « (Othmân s'assoit et boit paisiblement… en trois gorgées) » sont dites par le personnage. À sortir du dialogue, vers la narration ou l'animation.

**🟡 S11. Le narrateur est mal placé** : « Le Sage » (vieil homme) lit les phrases de narration **debout dans la chambre**, comme s'il était présent dans la scène.

**🟡 S12. Une scène non attribuée** : dans la scène 202, une réplique de l'apothicaire est écrite comme de la *narration* (guillemets dans un bloc narrateur).

### 3.3 Comment faire d'une série de leçons une vraie aventure

1. **Une quête fil rouge** sur tout le jeu (retrouver la lanterne perdue du grand-père, rendre sa lumière au village, rejoindre quelqu'un). Chaque chapitre rapproche d'un objectif **visible**.
2. **Un hub qui change visiblement : « le Jardin » ou « le Village »**. Chaque action réelle validée fait pousser une plante, rouvre un volet, allume une lanterne. La progression devient **belle** et **mémorisable** au lieu d'être un chiffre.
3. **Varier la structure des scènes** : une enquête, une énigme à résoudre, une scène sans leçon, un choix moral difficile, une scène humoristique, un moment de contemplation.
4. **Faire reculer Noura** peu à peu (elle guide, puis conseille, puis laisse faire) : le héros gagne de l'autonomie et le joueur de la responsabilité.
5. **Faire échouer le héros pour de bon** et en tirer une conséquence qui revient plus tard (le garçon qui a dit non, au chapitre 1, doit revenir).
6. **Donner des amis**, un compagnon (animal, enfant du village) et un **vrai rival bienveillant**, pour de l'humour et de la chaleur.
7. **Chapitres suivants à forte valeur familiale** (les décors existent) : parents, grand-père (« les racines »), voisin, école, argent/aumône, mensonge/honnêteté, rapport à l'écran, amitié, jalousie, pardon entre frères et sœurs, réconfort d'un deuil.
8. **Un rythme de 8 à 12 minutes par chapitre** et une vraie « fin de saison » mémorable.

---

## 4. Pédagogie et fiabilité du contenu religieux

> Rappel : ce sont des **signalements pour relecture par un savant** (ou un comité), pas des verdicts.

### 4.1 Les quiz (✅ analysés par script)

| Ensemble | Nb | Position de la bonne réponse | Bonne réponse = la plus longue |
|---|---|---|---|
| Chapitre 1 | 9 | B ×4, C ×5 (jamais A ni D) | **6 / 9** |
| Chapitre 2 | 5 | A ×1, B ×4 (jamais C ni D) | **5 / 5** |
| Chapitre 3 | 5 | A ×2, B ×3 (jamais C ni D) | **5 / 5** |
| Quiz libres | 18 | 1ʳᵉ ×6, **2ᵉ ×11**, 3ᵉ ×1, jamais la 4ᵉ | n/d |

- 🔴 **Un enfant malin gagne sans rien savoir** : toujours choisir la plus longue, ou la 2ᵉ. 84 % des quiz de l'histoire sont devinables par la longueur.
- 🟠 **Mauvaises réponses caricaturales** (« Des incantations secrètes écrites sur des bouts de papier », « Répondre par deux insultes pour chaque affront »). Aucune n'est *plausible*, donc aucun apprentissage.
- 🟠 **Quiz de rappel pur** : peu mesurent la *compréhension* ou la *mise en situation*.
- 🟡 **Pas de répétition espacée** : une notion est vue une fois et disparaît.

**À faire :** mélanger l'ordre des réponses automatiquement, équilibrer les longueurs, écrire des distracteurs plausibles (une idée fausse courante), ajouter des questions de situation (« Que fais-tu si… ? »), faire revenir les notions plus tard (révisions), et mélanger A/B/C/D.

### 4.2 Références à faire relire (annexe B : tableau complet)

- 🔴 **Ablutions contre la colère** (chapitre 2, scène 13) : le jeu présente comme remède *de la Sunnah* « dire *Aʿūdhu*, s'asseoir ou s'allonger, **et faire ses ablutions** ». Les deux premiers éléments ont des références solides (Bukhari 3282, Abu Dawud 4782). Le troisième (l'eau éteint le feu) est transmis dans un hadith dont **plusieurs spécialistes contestent le degré d'authenticité**. Ne pas supprimer l'idée (elle est bonne psychologiquement), mais **la formuler honnêtement** (« il est aussi rapporté que… ») ou la confirmer.
- 🟠 **Numérotation des hadiths** : elle varie selon les éditions. Plusieurs numéros sont à **recontrôler un par un** (liste en annexe), notamment Muslim 2024 (étiquette de boisson), Bukhari 1117 (verset 2:286) et Bukhari 1303 (larmes).
- 🟠 **Invocation arabe mal assortie** (scène 142) : Othmân prie pour *le marchand* mais l'arabe affiché est « Ô Allah, guide mon peuple car ils ne savent pas », paroles du Prophète ﷺ pour *son peuple*. À réaligner.
- 🟠 **Le marketing promet « hadiths sûrs »** (page d'accueil) : c'est une **promesse forte**. Sans comité de relecture publié, elle engage votre crédibilité.
- 🟡 **Graphies variables** : Hamdulillâh / Hamdoulillâh / Al-Hamdulillâh, Waswas / Waswâs, Woudhou' / Wudu, Nigelle / Habba sawdā'. Choisir **une convention** (idéalement avec glossaire).

### 4.3 Questions de fond « halal » à trancher consciemment

- 🟠 **Gamifier la prière** : la quête « Prière : +50 XP » (écran Quêtes) récompense l'accomplissement des prières par un score. Beaucoup de familles et de savants s'en méfient (risque d'ostentation, de transformer l'adoration en performance). **À faire valider**, ou remplacer par un simple rappel sans points.
- 🟠 **XP, rangs, séries** pour des actes de bien : l'intention (la Niyyah, que le jeu enseigne lui-même !) peut entrer en contradiction avec la récompense. Une piste cohérente : récompenser la **régularité et la réflexion** (« j'ai essayé, voici ce que j'ai ressenti »), pas l'acte pieux lui-même.
- 🟠 **Musique** : le jeu n'a pas de musique, seulement des sons synthétisés et des voix. Si vous en ajoutez, prévoir une **option « sans instruments »** (voix, nature, ambiance), car c'est une sensibilité courante dans votre public.
- 🟠 **Représentation de personnages** : vous avez fait un choix prudent (visages effacés). C'est à **assumer et expliquer** dans l'application (« page À propos »), car la fiche de store et la page d'accueil parlent de « 100 % sûr ».
- 🟡 **Le Coran récité par synthèse vocale** est à éviter : utiliser des **récitations enregistrées** (récitateur et licence identifiés) pour tout verset, pas de TTS.
- 🟡 **Âge cible** non indiqué dans le jeu : lexique (chanvre, établi, ʿilm, hilm) pour 9–12 ans ; prévoir un **glossaire cliquable** et un mode « petits » (texte plus court).

### 4.4 Ce que l'« action réelle » peut devenir (votre force)

- Mode **Famille** : un parent reçoit le résumé de la semaine (« Othmân a pratiqué le pardon 2 fois »), sans espionner l'enfant.
- Un **carnet de réflexion** (une phrase, un dessin) plutôt qu'un bouton « J'ai fait ».
- Des **défis à deux** (frère/sœur, parent/enfant) et un **rappel quotidien** doux (déjà en place via notifications locales, à rendre plus personnel).

---

## 5. Textes et traductions

### 5.1 Couverture des langues (✅)

| Contenu | FR | EN | AR |
|---|---|---|---|
| Chapitre 1 (153 répliques de dialogue) | ✅ | ✅ 144 traduites, 15 identiques au français, **10 manquantes** | ✅ 146 traduites, 15 identiques, **8 manquantes** |
| **Chapitre 2** | ✅ | ❌ | ❌ |
| **Chapitre 3** | ✅ | ❌ | ❌ |
| Carte du voyage (titres du chapitre 1) | ✅ | ❓ lit le chapitre 1 *français* | ❓ idem |
| Écran-titre (« Continuer », « Sélection des chapitres », « Nouvelle partie », « À propos du jeu ») | ✅ | ❌ | ❌ **vu en jeu : tout reste en français en mode arabe** |
| Logo (« Retrouve ta lumière. » dans l'image) | ✅ | ❌ | ❌ |
| Boutons du jeu (« Voix Active », « Continuer », « Passer », « Quiz ») | ✅ | ❌ codés en dur | ❌ **vu en jeu : restent en français/anglais en mode arabe** |

→ 🔴 **Passer en anglais ou en arabe après le chapitre 1 ramène tout en français**, sans prévenir. La politique de confidentialité et la page d'accueil annoncent trois langues. **Deux options honnêtes** : traduire les chapitres 2 et 3, ou n'annoncer que « Français + chapitre 1 en EN/AR » pour l'instant.

### 5.2 Défauts de texte et d'interface (✅ vus en jeu)

- 🟠 **Libellés tronqués** dans l'en-tête : « **Pressio** » au lieu de « Pression », « **NIVE. 1** » au lieu de « Niveau 1 » (coupés à 7 et 4 lettres par le code).
- 🟡 « Série actuelle : **1 jours** » (accord du pluriel).
- 🟡 **Mélange des jargons** dans l'interface : « Lumière », « Emprise du Waswâs », « Pression », « Doute », « Vertus », « Constance » désignent des choses voisines sans cohérence visible. Un enfant ne sait pas ce qui monte et pourquoi.
- 🟡 **Titre de scène en arabe vocalisé** dans l'onglet du navigateur : très beau, mais incohérent avec le reste du menu resté en français.
- 🟡 **Registre** : le héros cite parfois « Hadith de Muslim 2664 : … » à voix haute : on perd l'illusion d'un enfant. Citer la source dans une **fiche « Savoir »** plutôt que dans sa bouche.
- 🟡 **Répliques longues du Waswas** : plusieurs dépassent trois phrases enchaînées sans respiration. Visuellement, privilégier 1–2 phrases à l'écran, puis la suite.

---

## 6. Direction artistique et design

### 6.1 Constats (✅ vus à l'écran et mesurés)

- 🟢 **Titre et décors principaux : très réussis** (peinture chaude, lumière dorée).
- 🟠 **Trois styles qui coexistent** :
  1. **Peinture illustrée** (écran-titre, décors, scènes) ;
  2. **Pixel art** (carte du voyage, certains portraits, la promesse « RPG pixel art » de la page d'accueil) ;
  3. **Vecteur plat** (portraits des personnages devant le dialogue, icônes d'objets).
  La promesse « pixel art » sur le site ne correspond plus à ce que l'on voit.
- 🟠 **Personnages en double** : en jeu, Othmân et Noura apparaissent **dans le décor** (peints) *et* en **sprite plat** en bas de l'écran, à une autre échelle et dans un autre style (✅ vu aux scènes 1, 2). Le sprite est **coupé à la poitrine** par la boîte de dialogue.
- 🟠 **Visages effacés qui paraissent inachevés** : un ovale beige uni sur Noura, le Sage, le jeune artisan. L'intention est bonne, le rendu fait penser à un fichier non terminé. Il vaut mieux une **signature visuelle assumée** (visage dans l'ombre, voile qui encadre, tracé minimal de lumière, vue de dos ou de trois-quarts) appliquée à *tous* les personnages.
- 🟠 **Formats d'images incohérents** (✅ mesurés) : décors en 1376×768 (22), 1920×1080 (8), 1024×571 (5), ~1678×937 (2) ; portraits en **1024×1024** pour 12 d'entre eux et **de 66×108 à 160×190 px** pour beaucoup d'autres (flous une fois agrandis). 19 portraits sur 42 ont un fond transparent, les autres non.
- 🟠 **Décors horizontaux pour un jeu vertical** : sur téléphone, un décor 16:9 est recadré. Résultat vu à l'écran : **une bande sombre d'environ 140 px au-dessus de la scène** et des sujets coupés. Il faut produire des décors **9:16 (1080×1920)**.
- 🟡 **Bureau** : le jeu occupe une colonne de ~375 px au centre d'un grand écran, avec deux grandes zones floues vides. Utiliser la largeur (décor plein écran, boîte de dialogue plus large) ou assumer un cadre « téléphone ».

### 6.2 Défauts d'interface vus en jeu

- 🟠 **Deux bandeaux qui se chevauchent** : le « +15 XP / Premier geste du matin » **recouvre** le bandeau « Habitude » (le texte « HA… » est coupé).
- 🟠 **Carte du voyage** : la pastille flottante de Noura **recouvre la fin du bouton « Poursuivre le voyage »** ; la pastille « TU ES ICI » **recouvre le nom de l'étape 2** (« Le Poteau… »).
- 🟠 **Inventaire** : les objets sont des **émoticônes roses** (sac, écharpe, lanterne), **tout est déjà équipé** dès le niveau 1, et on ne voit ni effet ni histoire des objets : aucune sensation de gain.
- 🟠 **Statistiques déjà remplies au niveau 1** (Discipline 12, Savoir 8, Patience 9, Bonté 7, Constance 11) alors que le joueur n'a rien fait. Et **un second système** (6 traits : discipline, sabr, hilm, adab, vitalité, ʿilm) vit à côté. Deux « profils » du même enfant.
- 🟡 **Boîte de dialogue** : bon contraste, mais le bouton « Continuer » est petit et discret ; la barre de texte machine à écrire est lente (mode « Passer » peu visible).
- 🟡 **Icônes** : mélange d'émojis (🧹 💧 👟 ✨ 🌿) et d'icônes dessinées. Un seul jeu d'icônes cohérent donnera un aspect nettement plus « pro ».

### 6.3 Recommandations de direction artistique

1. **Choisir un seul style** (je recommande la **peinture illustrée** actuelle, qui est votre atout) et écrire une **bible de style d'une page** : palette, lumière, proportions, traitement du visage, épaisseur de trait, ombre portée.
2. **Intégrer les personnages dans la composition** : un seul rendu par scène (personnage peint dans le décor) ; supprimer les sprites flottants ou les remplacer par un portrait *dans la boîte de dialogue* uniquement.
3. **Unifier la résolution** : décors 1080×1920 (9:16), portraits 1024×1024 transparents, icônes SVG.
4. **Remplacer les émojis** par une famille d'icônes dessinées aux couleurs du jeu.
5. **Cohérence de l'écran-titre** : version arabe et anglaise du logo, sans texte français gravé dans l'image.
6. **Page « Direction artistique » dans l'app** expliquant le choix des visages (voir §4.3).

---

## 7. Images, vidéos et audio

### 7.1 Inventaire (✅)

| | Quantité | Poids |
|---|---|---|
| Images (JPG/PNG) dans `src/assets/images` + `public/game-assets` | 151 | ~66 Mo avec les vidéos |
| Vidéos (MP4) | 18 dans `public/` | ~35 Mo |
| Audio (voix MP3) | 289 | 24 Mo |
| Application compilée (`dist`) | | **98 Mo** |

Vidéos : ~13 boucles de **8 s en 1280×720** (paysage) pour les décors animés, 4 vidéos **verticales 720×1280 ou 1080×1920** (cinématique, bande-annonce, intro), 1 de 2,7 s. Mélange paysage/portrait, pas d'image de couverture (poster).

### 7.2 Problèmes

- 🟠 **Cinq médias référencés n'existent pas** (404, ✅ vérifié) :
  - `/game-assets/tiktok_promo.mp4` : c'est **la vidéo du téléphone de la page d'accueil, qui reste noire** ;
  - `/game-assets/video-gameplay.mp4` (section « gameplay » de la page d'accueil) ;
  - `/game-assets/vallee.jpg` : **préchargé à chaque ouverture** du site dans `index.html` (une requête inutile en erreur) ;
  - `/game-assets/family_bond.jpg` et `/game-assets/creator-photo.jpg` (sections « famille » et « créateur »).
- 🟠 **Le chapitre 1 a 30 « plans illustrés »** (dossier `ch1_shots`) qui soulignent les moments clés. **Les chapitres 2 et 3 n'en ont aucun** : la richesse visuelle chute après la première heure.
- 🟡 **~28 images inutilisées** dans le code (dont d'anciennes planches, plusieurs avec un horodatage dans le nom comme `…1788272711420.jpg`) + 7 gros fichiers inutilisés dans `public/game-assets` (ex. `hero_landing.png` 2,6 Mo + son JPG, `narrateur.png`, `epilogue.jpg`). À archiver ou supprimer.
- 🟡 **Poids** : `hero_landing.png` (2,6 Mo) et plusieurs boucles de 2 Mo ; passer les images en **WebP/AVIF** et les vidéos en **portrait 9:16, H.264 allégé ou WebM** diviserait le poids sans perte visible.
- 🟡 **Vidéos sans image de couverture** : écran noir avant le premier affichage.

### 7.3 Audio (✅ couverture mesurée par script, qualité non écoutée)

| | Répliques de dialogue | Avec voix MP3 | Sans |
|---|---|---|---|
| Chapitre 1 | 137 | 130 | 7 |
| Chapitre 2 | 42 | 41 | 1 |
| Chapitre 3 | 60 | 58 | 2 |
| **Total** | **239** | **229 (96 %)** | **10** |

- 🟠 **Les répliques sans voix** : `s1_noura_intro`, `s1_othman_reply1`, `s1_noura_reply1`, `s1_othman_reply2`, `s1_noura_reply2`, `s1_waswas_comfort`, `s1_door_waswas`, `s12_villageoise_step`, `s18_b4_noura`, `s22_b1_artisan`. **Sept sont dans la toute première conversation du jeu** : Noura et Othmân parlent **sans voix** alors que la narration d'ouverture et la suite sont doublées (ou silencieuses selon l'orateur). La première impression est donc incohérente. (Correction de mon premier constat : le code ne lit **aucune** voix robotique de secours, il reste silencieux.)
- 🔴 **La voix n'était pas liée à la langue** (✅ lu dans le code) : en anglais ou en arabe, le MP3 français jouait sous un texte anglais/arabe. **Corrigé le 24/11** : la voix studio ne joue plus qu'en français (silence en EN/AR). Il reste à enregistrer des voix EN/AR, et à masquer le bouton « Voix Active » quand il n'y a rien à entendre.
- 🟠 **59 fichiers audio orphelins** (anciens `s1_b1.mp3`, `s1_b2.mp3`…, plus un `.old.mp3`) : poids mort et risque de confusion lors de la prochaine régénération.
- 🟠 **Aucune musique** : seulement des bruits de clic synthétisés (le code contient un générateur d'ambiance dont je n'ai pas constaté l'effet en jeu). L'ambiance sonore (vent, oiseaux, pas, eau de la fontaine) ferait énormément pour l'immersion, y compris en version « sans instruments » (voir §4.3).
- 🟡 **Voix sans réglage** visible (vitesse, volume voix/effets) : prévoir un écran Réglages.
- 🟡 **Qualité** : à écouter par vos soins, en particulier le **narrateur « Le Sage »** et la voix de **Waswas** (effet de voix dédoublée ou grave pour renforcer l'ombre).

---

## 8. UX et parcours du joueur

### 8.1 Premières minutes (vécu en jeu)

1. 🟢 Écran-titre superbe, boutons lisibles.
2. 🟠 **« JOUER » ouvre d'abord la liste des chapitres** (au lieu de lancer le chapitre 1). Un nouveau joueur voit **les chapitres 2 et 3 déjà ouverts** et peut débuter au milieu. → *Un bouton « Commencer » qui lance directement le chapitre 1 ; la liste des chapitres reste sous « Chapitres ».*
3. 🟠 **Écran blanc au démarrage** pendant quelques secondes (version de développement ; en production c'est plus rapide mais **aucun écran de chargement** n'existe : fond sombre + logo suffiraient).
4. 🟠 **Aucun didacticiel** : rien n'explique le Waswas, la lumière, les quêtes, le bouton Quiz ou le livre de Savoir. Les actions de l'en-tête (soleil, langue, carte, quiz, savoir) sont des icônes sans libellé sur mobile.
5. 🟡 Le **choix de langue** est un petit drapeau en haut à droite : à proposer au tout premier lancement.

### 8.2 Boucle de jeu

- 🟠 **Trop de systèmes pour trop peu de contenu** : XP, niveau, Lumière (%), jauge du Waswas (« Emprise »/« Pression »), 5 statistiques + 6 traits, série, meilleure série, habitudes quotidiennes, quêtes d'histoire, badges, rangs, équipement. Pour environ une heure de jeu, c'est **beaucoup de chiffres** que l'enfant ne relie pas à ses choix. → *Réduire à trois repères* : **Lumière** (progression), **Vertus** (6 traits), **Jardin** (récompense visuelle).
- 🟠 **Les récompenses ne se voient pas** : +15 XP flottant, puis rien. Chaque action réelle devrait faire **changer le monde** (voir §3.3).
- 🟠 **Les « Actions réelles » reposent sur la bonne foi** : trois boutons (« Fait », « Je m'engage », « Passer »). C'est cohérent éthiquement, mais **il n'y a ni rappel, ni suivi, ni partage** : l'effet retombe vite. Un carnet de réflexion et un rappel contextuel (déjà possible via les notifications locales) renforceraient l'ancrage.
- 🟡 **Les quiz de l'histoire interrompent** le récit au même endroit à chaque scène : rythme prévisible (voir §3.2 S5).
- 🟡 **Combats finaux** (« Climax ») : une suite de 6 étapes (choisir la bonne parade). Pédagogiquement pertinent, mais **le même schéma 3 fois** ; prévoir une variété (course contre la montre calme, puzzle de respiration, choix cachés).

### 8.3 Accessibilité et confort

- 🟢 Texte bien contrasté sur la boîte de dialogue ; tailles de police relevées cette semaine (min. 10 px sur téléphone) ; zones tactiles élargies à 44 pt.
- 🟠 **Aucun réglage d'accessibilité** : taille du texte, vitesse du texte machine à écrire, contraste élevé, police pour dyslexiques, réduction des animations (les bandeaux et fondus sont nombreux).
- 🟠 **Le texte arrive lettre par lettre** et le joueur doit toucher pour passer : peu adapté aux enfants qui lisent lentement ou vite. Offrir « Texte instantané ».
- 🟡 **Pas d'historique des dialogues** visible en jeu (un composant `HistoryModal` existe : à exposer clairement).
- 🟡 **Contenus riches du « Livre du Savoir »** : bonne idée, mais le bouton est une icône de livre sans libellé sur mobile.

### 8.4 Vitesse et poids (✅ mesurés)

- Le code principal de l'application fait **660 Ko**, plus **Firebase 524 Ko** et **PostHog 312 Ko** : **les outils d'analyse pèsent plus que React lui-même** (192 Ko). Firebase n'est utilisé que pour des statistiques (désactivées dans l'app iOS/Android) et un formulaire testeur.
- L'application complète fait **98 Mo** : lourd pour un jeu texte + images (téléchargement initial, mises à jour).

---

## 9. Technique et conformité (état actuel)

**Déjà corrigé cette semaine :** app iPhone seule ; paiements Stripe et pages web retirés de l'app native ; analytics anonymes (sans enregistrement de session) en natif ; manifeste de confidentialité iOS ; politique de confidentialité à jour ; polices embarquées ; interface mobile corrigée.

**Reste à traiter (web) :**
- 🔴 **Enregistrement de session PostHog actif sur le site**, avec `person_profiles: always`, **sans bandeau de consentement observé**, pour un public familial et des enfants. À changer avant toute promotion payante (RGPD « mineurs »).
- 🟠 **Lien de paiement Stripe en mode test** : les deux liens du bouton « Soutenir le Projet Nour » (carte du Profil) contiennent `buy.stripe.com/test_…`. Sur le site, un clic mène à un paiement de test.
- 🟠 **Code de paiement mort** : `getSupporterStatus()` renvoie toujours `true`, donc tout est gratuit, mais le code du mur de paiement, les codes promo (`ADMIN`, `TEST`, `DEV`, `FREE`…) et les modales Stripe restent compilés. À supprimer ou à finir proprement.
- 🟡 **Adresses de contact différentes** dans le code et la politique (`contact@playnour.online` vs `elmalkidigital@gmail.com`).
- 🟡 **Modifications non commitées par un autre outil** sur le poste (`HUD.tsx`, `SplashScreen.tsx`, `SceneTransitionModal.tsx`, `TravelMapScreen.tsx`, `App.tsx`, `build.gradle`) : à relire et commiter, ou annuler.

---

## 10. Pour mériter le titre « premier jeu islamique halal où l'on apprend en jouant »

> Attention : je n'ai **pas vérifié** s'il existe d'autres jeux comparables. Avant d'écrire « le premier », **faites un vrai état des lieux** ; sinon préférez « un jeu d'aventure islamique pour les familles » ou « le jeu d'Adab ».

**Ce que cela suppose, en six piliers :**

1. **Fiabilité** : un **comité de relecture** nommé (1–3 personnes qualifiées), une **page publique « Sources et méthode »**, des **références vérifiées** (livre, numéro, édition) et la mention du degré d'authenticité quand c'est utile.
2. **Contenu** : 2–3 h minimum en saison 1 (6–8 chapitres), puis une saison par trimestre. Une vraie histoire, pas une série de leçons.
3. **Respect des sensibilités** : réglage « sans musique / sans instruments », visages et personnages assumés, politique claire sur les récompenses (pas de points pour la prière).
4. **Plaisir de jeu** : exploration, énigmes, mini-jeux (séquence des ablutions, mémorisation de courtes sourates par puzzle, tri « bon geste / mauvais geste »), compagnon, humour.
5. **Famille** : mode parent, résumé hebdomadaire, défis à deux, âge indiqué, aucun contact avec des inconnus, aucune publicité.
6. **Langues et accessibilité** : FR/EN/AR complets (texte **et** voix), police et vitesse réglables, glossaire.

---

## 11. Plan d'action priorisé

### 🔴 P0 : à faire avant toute diffusion large (≈ 1 à 2 semaines)

| # | Action | Effort |
|---|---|---|
| 1 | **Relecture religieuse** des 19 quiz + 42 références + des phrases « de la Sunnah » (annexe B) ; corriger/annoter | M (externe) |
| 2 | **Quiz** : mélanger l'ordre des réponses, équilibrer les longueurs, réécrire les mauvaises réponses plausibles | M |
| 3 | **Voix liée à la langue** : ne jouer le MP3 français qu'en français ; sinon texte seul (ou TTS correct) ; ne jamais utiliser `fr-FR` pour l'arabe/anglais | S |
| 4 | **Traductions** : traduire les chapitres 2–3 *ou* annoncer honnêtement « FR, ch.1 en EN/AR » partout | L (ou S si on annonce) |
| 5 | **Générer les 10 voix manquantes** (surtout les 7 de la scène 1) | S |
| 6 | **Écran-titre, boutons du jeu, libellés** : tout traduire ; corriger « Pressio », « NIVE. », « 1 jours » | S |
| 7 | **Web** : supprimer l'enregistrement de session et le profilage par défaut, ajouter le consentement ; supprimer le lien Stripe de test | S |
| 8 | **Médias cassés** : 5 références (404) à créer ou retirer ; retirer le préchargement de `vallee.jpg` | S |
| 9 | **Un seul titre par chapitre** (tableau de références) et supprimer la scène-menu 10 | S |
| 10 | **« Commencer » lance le chapitre 1** ; chapitres 2–3 verrouillés tant que le précédent n'est pas fini (ou « mode libre » assumé) | S |

### 🟠 P1 : le mois suivant

| # | Action | Effort |
|---|---|---|
| 11 | **Direction artistique unifiée** : bible de style, une seule technique de personnages, suppression des sprites en double, portraits 1024 transparents | L |
| 12 | **Décors verticaux 9:16** pour téléphone + poster pour chaque vidéo | L |
| 13 | **Chapitre 2 et 3 enrichis** (plans illustrés comme au chapitre 1, scènes plus longues, climax plus travaillés) | L |
| 14 | **Réduire les systèmes à trois repères** (Lumière, Vertus, Jardin) et créer le **Jardin/Village vivant** | L |
| 15 | **Didacticiel** de 3 écrans + choix de langue au premier lancement | M |
| 16 | **Écran Réglages** (voix, musique, effets, taille du texte, texte instantané, réduction d'animations) | M |
| 17 | **Ambiances sonores** (vent, eau, oiseaux) et option « sans instruments » | M |
| 18 | Nettoyage : 59 audios orphelins, 28 images inutiles, fichiers horodatés | S |
| 19 | **Boîte de dialogue + toasts + carte** : corriger chevauchements (bandeaux XP/habitude, pastille sur le bouton, « TU ES ICI ») | S |
| 20 | **Alléger l'app** : WebP/AVIF, vidéos verticales compressées, retrait de Firebase si inutile | M |

### 🟡 P2 : saison 2 (1 à 3 mois)

| # | Action | Effort |
|---|---|---|
| 21 | **Chapitres 4–8** (parents, grand-père/racines, honnêteté, argent/aumône, rapport aux écrans, pardon entre frères et sœurs…) | XL |
| 22 | **Mode Famille** (résumé parent, défis à deux, carnet de réflexion) | L |
| 23 | **Mini-jeux** (ablutions, mémorisation, tri des gestes), **énigmes**, **héroïne au choix** | L |
| 24 | **Récitations enregistrées** pour les versets (récitateur et licence identifiés) | M |
| 25 | **Voix EN et AR complètes** | L |
| 26 | **Page « Sources et méthode »** + comité de relecture publié | M |

*Effort : S = ≤ 1 jour · M = 2–5 jours · L = 1–3 semaines · XL = plusieurs mois.*

---

## 12. Annexes

### A. Scènes : durée et densité (✅)

| Chap. | Scène | Titre | Étapes | Mots |
|---|---|---|---|---|
| 1 | 1 | La Chambre | 35 | 500 |
| 1 | 2 | Le Poteau aux Chemins | 8 | 139 |
| 1 | 3 | Le Premier Waswas | 20 | 328 |
| 1 | 4 | « Je ne veux plus être seul » | 13 | 282 |
| 1 | 5 | Le Village | 17 | 341 |
| 1 | 6 | Le Refus | 16 | 333 |
| 1 | 7 | Le Geste | 16 | 260 |
| 1 | 8 | Le Jardin Abandonné | 14 | 262 |
| 1 | 9 | Le Grand Waswas | 30 | 559 |
| 2 | 10 | L'Aube au Grand Poteau | **1** | **8** |
| 2 | 11 | L'Éclat du Marché | 9 | 198 |
| 2 | 12 | L'Épreuve du Silence | 10 | 191 |
| 2 | 13 | La Fontaine aux Vignes | 8 | 140 |
| 2 | 14 | La Parure de Douceur | 9 | 155 |
| 2 | 142 | Le Murmure sous la Treille | 8 | 186 |
| 2 | 15 | L'Ombre de la Rancœur | 6 | 135 |
| 2 | 16 | Le Cœur Paisible | 6 | 108 |
| 3 | 17 | Le Matin Difficile | 9 | 192 |
| 3 | 18 | Le Dispensaire de l'Apothicaire | 8 | 178 |
| 3 | 19 | Celui qui prie avec une attelle | 9 | 199 |
| 3 | 20 | Les Remèdes Prophétiques | 6 | 125 |
| 3 | 201 | La Cueillette sous les Amandiers | 5 | 172 |
| 3 | 202 | Le Manuscrit des Épreuves | 5 | 160 |
| 3 | 21 | Le Poids de la Halte | 7 | 171 |
| 3 | 22 | Nommer la Douleur sans Honte | 8 | 185 |
| 3 | 23 | L'Amānah du Corps & le Bouillon | 7 | 114 |
| 3 | 24 | La Graine sous Terre | 6 | 146 |
| 3 | 25 | La Montagne Intérieure | 9 | 190 |

Les scènes 142, 201, 202 sont des **embranchements** numérotés à part (identifiants hors suite) : pratique pour le code, à documenter pour l'équipe.

### B. Références religieuses du jeu à faire relire (✅ extraites du code)

| Quiz | Type | Référence citée dans le jeu | Remarque |
|---|---|---|---|
| quiz_istiadhah | Coran | 16:98 | |
| quiz_doua_maison | Hadith | Abu Dawud 5095 & Tirmidhi 3426 | |
| quiz_taaruf | Coran | 49:13 | |
| quiz_adab_boire | Hadith | Muslim **2024** & Bukhari 5631 | ⚠ recontrôler le numéro de Muslim |
| quiz_adab | Hadith | Bukhari 6018 | |
| quiz_sabr | Coran | 2:153 | |
| quiz_niyyah | Hadith | Bukhari 1 | **utilisé 2 fois** |
| quiz_shukr | Coran | 14:7 | |
| quiz_ilm | Hadith | Muslim 2664 | |
| quiz_hilm_force | Hadith | Bukhari 6114 & Muslim 2609 | |
| quiz_hilm_colere_remede | Hadith | Bukhari 3282 & Abu Dawud 4782 | ⚠ la partie « ablutions » est portée par un autre hadith à vérifier |
| quiz_hilm_rifq | Hadith | Muslim 2594 | |
| quiz_hilm_afw | Hadith | Muslim 2588 | |
| quiz_dua_secret | Hadith | Muslim 2732 | ⚠ l'arabe affiché dans la scène ne correspond pas |
| quiz_tawakkul_soins | Hadith | Abu Dawud 3855 & Bukhari 5678 | |
| quiz_capacite_ame | Coran | 2:286 & Bukhari **1117** | ⚠ recontrôler |
| quiz_remedes_prophetiques | Hadith | Bukhari 5417 & Muslim 2216 | |
| quiz_dignite_souffrance | Hadith | Bukhari **1303** | ⚠ recontrôler |
| quiz_shukr_dependance | Hadith | Tirmidhi 1954 | |

Hors quiz : Bukhari 6011 (corps unique), Bukhari 5641 (maladie et péchés), Bukhari 5688 (nigelle), Coran 21:83 (Ayyoub), 16:69 (miel). **La numérotation exacte dépend de l'édition** : choisissez une édition de référence et indiquez-la.

### C. Fichiers à corriger en priorité (liens de travail)

- Voix manquantes : `s1_noura_intro`, `s1_othman_reply1`, `s1_noura_reply1`, `s1_othman_reply2`, `s1_noura_reply2`, `s1_waswas_comfort`, `s1_door_waswas`, `s12_villageoise_step`, `s18_b4_noura`, `s22_b1_artisan`.
- Médias 404 : `/game-assets/tiktok_promo.mp4`, `/game-assets/video-gameplay.mp4`, `/game-assets/vallee.jpg`, `/game-assets/family_bond.jpg`, `/game-assets/creator-photo.jpg`.
- Lecture de la voix sans notion de langue : `src/utils/speech.ts` (lignes ~330-352) et `DialogueBox.tsx` (appel `speakBeat`).
- Libellés tronqués : `PixelioHeader.tsx` (`t.waswasGauge.slice(0, 7)` et `t.level.slice(0, 4)`).
- Écran « JOUER » → liste des chapitres : écran-titre (`SplashScreen.tsx`).
- Quiz : `src/data/chapter1.ts`, `chapter2.ts`, `chapter3.ts`, `islamicQuizzes.ts`.

---

### Conclusion

NOUR n'est **pas** un projet à refaire : c'est un projet à **approfondir**. L'idée centrale (un enfant fragile, un doute qui parle, une action concrète à faire dans la vraie vie) est **juste, rare et touchante**. Pour en faire une référence :
1. **Verrouiller la fiabilité** (relecture, sources).
2. **Rendre l'expérience cohérente** (langues, voix, un style visuel, un titre par chapitre).
3. **Donner de la matière** (une vraie quête, un monde qui change, 2–3 h de jeu).

Si vous ne deviez faire que trois choses cette semaine : **relecture religieuse**, **quiz équilibrés**, **voix et langues cohérentes**.

---

## 13. Corrections déjà appliquées (24 novembre 2026)

Ces points du plan P0 sont **faits dans le code** (build et vérification de types OK) :

| Point | Ce qui a été fait |
|---|---|
| Quiz devinables (position) | Les réponses sont **mélangées** à chaque partie, dans les quiz de l'histoire et les quiz libres (`src/utils/quizShuffle.ts`). *Reste à faire : équilibrer la longueur des réponses et écrire des mauvaises réponses plausibles (contenu).* |
| Voix sous texte EN/AR | La voix studio française ne joue plus que lorsque la langue est le français. |
| Libellés tronqués | « NIVE. 1 » → « Niv. 1 », « Pressio » → « Pression » (versions EN/AR adaptées) ; « 1 jours » → « 1 jour ». |
| Médias cassés (5) | `tiktok_promo.mp4` et `video-gameplay.mp4` remplacés par la bande-annonce existante (`nour_le_jeu_trailer_25s.mp4`, avec image de couverture) ; `vallee.jpg` remplacé par `title_screen_bg.jpg` (et son préchargement) ; `family_bond.jpg` par `chambre.jpg`. `creator-photo.jpg` garde son repli (la lettre « ن »). |
| Titres de chapitres | Ch.1 « Vaincre la Solitude », Ch.2 « Le chemin du Hilm », Ch.3 « Le chemin du Tawakkul », Ch.4 « Ce que tu as encore », Ch.5 « La Montagne Intérieure » : alignés entre l'écran-titre, les menus de l'histoire, la fin du chapitre 2 et la page d'accueil. *Restent à décider : le doublon « La Montagne Intérieure » (titre du ch.5 et de la dernière scène du ch.3), et la traduction EN/AR des titres.* |
| Page d'accueil désynchronisée | Les chapitres 2 et 3 sont indiqués « Jouable dès maintenant » (ils annonçaient « Finalisation en cours » / « En développement » et « débloquable via le Pack Fondateur »). La foire aux questions est corrigée. *Le synopsis du chapitre 3 sur la page d'accueil décrit encore une autre histoire que celle du jeu : à réécrire.* |
| « JOUER » | Un nouveau joueur lance **directement le chapitre 1** ; la liste des chapitres reste sous « Sélection des Chapitres ». *Les chapitres 2 et 3 restent ouverts dès le départ : c'est un choix de verrouillage supprimé volontairement dans le code actuel, à confirmer.* |
| Web : consentement | Nouveau **bandeau « Statistiques anonymes » (Accepter / Refuser)**, en FR/EN/AR. **Avant l'accord : aucune requête vers PostHog ni Google** (vérifié : 0 requête externe). Après l'accord : mesure anonyme. **PostHog n'enregistre plus l'écran, ne crée plus de profil et n'autocapture plus les clics**, même avec accord. |
| Lien Stripe de test | Les liens `test_` sont détectés : tant qu'ils ne sont pas remplacés par de vrais liens, **le bouton « Soutenir » n'est plus affiché** (`SUPPORT_ENABLED` dans `stripe.ts`). |

**Non traité (nécessite une décision, des fichiers ou un tiers) :** relecture religieuse, mauvaises réponses plausibles des quiz, doublon du quiz « Niyyah », traduction des chapitres 2–3 et de l'écran-titre, voix manquantes (10), voix EN/AR, scène-menu 10, direction artistique.

