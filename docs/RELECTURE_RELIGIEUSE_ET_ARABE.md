# 📖 Dossier unique de relecture religieuse et arabe — NOUR

*Généré automatiquement le 2026-11-25 depuis les données du jeu (`src/data/*`).*

> **Statut : À FAIRE RELIRE.** Aucune affirmation de « fiabilité » ou de « vérification » ne doit être publiée avant validation de ce dossier par une personne de science (savant / enseignant qualifié) et par un arabophone natif.

## Mode d'emploi pour le relecteur
1. Vérifier chaque **référence** (sourate:verset, recueil et numérotation selon une édition de référence choisie).
2. Vérifier la **justesse de la traduction française** et du **texte arabe vocalisé** (voyelles / harakāt, orthographe coranique).
3. Vérifier la **pertinence pédagogique** pour des enfants de 8 à 12 ans.
4. Cocher `[x]` si validé, ou annoter directement la ligne en cas de correction souhaitée.

---

## 1. Points d'attention prioritaires (signalés lors de l'audit)

- [ ] **Numérotation des hadiths** : choisir une édition de référence (ex. numérotation internationale / Sunnah.com) et contrôler en priorité `Muslim 2024` (étiquette de boisson), `Bukhari 1117` (verset 2:286), `Bukhari 1303` (larmes / dignité), `Bukhari 6237` (Salām).
- [ ] **Ablutions contre la colère** (`quiz_hilm_colere_remede`, ch. 2 et quiz libre) : reformulé pour s'appuyer uniquement sur Bukhari 3282 et Abu Dawud 4782 (l'eau fraîche est présentée comme geste apaisant, non comme règle de la Sunnah) — à confirmer.
- [ ] **Invocation de la scène 142 (ch. 2)** : l'arabe affiché (« اللَّهُمَّ اهْدِ قَوْمِي فَإِنَّهُمْ لَا يَعْلَمُونَ ») est présenté comme la prière du Prophète ﷺ pour son peuple avant la prière d'Othmân pour le marchand — à valider.
- [ ] **Gamification de la prière et des bonnes actions** : la quête « Prière : +50 XP » et les points XP sur des actes d'adoration méritent un avis éducatif/théologique (risque d'ostentation vs encouragement des enfants).
- [ ] **Relecture linguistique arabe (tashkīl / vocalisation)** : les traductions arabes vocalisées des **Chapitres 2 et 3** (`src/i18n/chapter2Translations.ts`, `chapter3Translations.ts`) et des **18 quiz libres** (`src/i18n/islamicQuizzesTranslations.ts`) ont été produites automatiquement et nécessitent une relecture par un arabophone natif.
- [ ] **Conventions de translittération** : harmoniser les graphies (`Hamdulillâh` / `Al-Hamdulillāh`, `Waswâs` / `Waswas`, `Woudou'` / `Wudūʾ`, `Salām`).

---

## 2. Quiz de l'histoire — Chapitre 1 (Vaincre la Solitude)

| Statut | ID | Notion / Sujet | Référence citée | Texte arabe | Citation / Explication (FR) |
|---|---|---|---|---|---|
| [ ] | `quiz_istiadhah` | Istiʿādhah | Coran 16:98 | فَإِذَا قَرَأْتَ الْقُرْآنَ فَاسْتَعِذْ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ | « Lorsque tu lis le Coran, cherche refuge auprès d'Allah contre le diable banni. » — L’istiʿādhah est explicitement mentionnée dans le Coran : lorsqu’on cherche protection ou récitation, on demande refuge auprès d’Allah contre le Shayṭān. |
| [ ] | `quiz_doua_maison` | Duʿāʾ de sortie de la maison | Abu Dawud 5095 & At-Tirmidhi 3426 | بِسْمِ اللَّهِ ، تَوَكَّلْتُ عَلَى اللَّهِ ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ | « Au nom d'Allah, je place ma confiance en Allah, et il n'y a de force ni de puissance qu'en Allah. » — Le Prophète ﷺ a enseigné que lorsqu'un croyant sort en disant cette duʿāʾ, il lui est répondu : « Tu es guidé, préservé et protégé », et le diable s'écarte de lui. |
| [ ] | `quiz_taaruf` | Taʿāruf | Coran 49:13 | وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا ۚ إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ | « ...et Nous avons fait de vous des nations et des tribus, pour que vous vous entreconnaissiez. Le plus noble d'entre vous, auprès d'Allah, est le plus pieux. » — Coran 49:13 indique que les peuples et tribus ont été créés « pour que vous vous entreconnaissiez » (Taʿāruf). Le verset précise que le plus noble auprès d’Allah est le plus pieux, non celui du groupe le plus fort. |
| [ ] | `quiz_adab_boire` | Adab du Boire | Sahih Muslim 2024 & Sahih al-Bukhari 5631 | — | « Quand l'un de vous boit, qu'il ne respire pas dans le récipient... et le Prophète ﷺ buvait en trois gorgées en prononçant le nom d'Allah. » — Le Prophète ﷺ a enseigné de boire assis, avec la main droite, en prononçant Bismillâh, en respirant à l'extérieur du récipient par trois fois, et en concluant par Al-Hamdulillâh. |
| [ ] | `quiz_adab` | Adab | Sahih al-Bukhari 6018 | — | « Que celui qui croit en Allah et au Jour dernier dise du bien ou qu'il se taise. » — Le Prophète ﷺ a enseigné de parler en bien ou de garder le silence. Savoir se taire lorsqu’on n’a rien de constructif est une preuve de sagesse et de foi. |
| [ ] | `quiz_sabr` | Sabr | Coran 2:153 | يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ | « Ô les croyants ! Cherchez secours dans l'endurance et la prière. Car Allah est avec ceux qui sont endurants. » — Le Sabr est une endurance constructive : on accepte la réalité d’un refus ou d’une épreuve sans s’emporter, sans s’obstiner avec force, et sans se résigner au désespoir. |
| [ ] | `quiz_niyyah` | Niyyah | Sahih al-Bukhari 1 | — | « Les actions ne valent que par les intentions qui les animent, et chacun ne recevra que selon son intention. » — Le hadith célèbre de l’Imam Bukhari établit que la valeur spirituelle de chaque action dépend de la pureté de l’intention (la Niyyah). |
| [ ] | `quiz_niyyah_discretion` | Ikhlāṣ | Sahih al-Bukhari 1423 · Sahih Muslim 1031 | وَرَجُلٌ تَصَدَّقَ بِصَدَقَةٍ فَأَخْفَاهَا حَتَّى لَا تَعْلَمَ شِمَالُهُ مَا تُنْفِقُ يَمِينُهُ | « … un homme qui fait l’aumône en cachette, au point que sa main gauche ignore ce que dépense sa droite. » — Parmi les sept que l’ombre d’Allah abritera, le Prophète ﷺ cite celui qui fait l’aumône en secret, au point que sa main gauche ignore ce que dépense sa droite. La discrétion protège l’intention de l’ostentation. |
| [ ] | `quiz_shukr` | Shukr | Coran 14:7 | لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ | « Si vous êtes reconnaissants, très certainement J'augmenterai [Mes bienfaits] pour vous. » — Le Shukr est la reconnaissance sincère des dons d’Allah. Le Coran enseigne que la gratitude attire davantage de bienfaits. |
| [ ] | `quiz_ilm` | ʿIlm | Sahih Muslim 2664 & Enseignement | — | « Recherche avec ardeur ce qui t'est profitable, demande l'aide d'Allah et ne sois pas impuissant. » — Le savoir seul ne suffit pas s’il reste abstrait. Il prend vie lorsqu’il est soutenu par l’effort intérieur et concrétisé par l’action dans la réalité. |

## 3. Quiz de l'histoire — Chapitre 2 (Le chemin du Hilm)

| Statut | ID | Notion / Sujet | Référence citée | Texte arabe | Citation / Explication (FR) |
|---|---|---|---|---|---|
| [ ] | `quiz_hilm_force` | Le Vrai Fort (Al-Hilm) | Sahih al-Bukhari 6114 & Sahih Muslim 2609 | لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ ، إِنَّمَا الشَّدِيدُ الَّذِي يَمْلِكُ نَفْسَهُ عِنْدَ الْغَضَبِ | « L'homme fort n'est pas celui qui terrasse ses adversaires à la lutte, mais celui qui se maîtrise lorsqu'il est en colère. » — Le Prophète ﷺ a enseigné que la véritable force ne réside pas dans la puissance musculaire, mais dans la capacité du croyant à dompter son âme et à retenir sa colère lorsque le Shayṭān cherche à l'enflammer. |
| [ ] | `quiz_hilm_colere_remede` | Les Remèdes contre la Colère | Sahih al-Bukhari 3282 & Sunan Abi Dawud 4782 | إِنِّي لَأَعْلَمُ كَلِمَةً لَوْ قَالَهَا لَذَهَبَ عَنْهُ مَا يَجِدُ لَوْ قَالَ أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ | « Je connais une parole qui, s'il la disait, ferait partir ce qu'il ressent : Aʿūdhu billāhi mina sh-shayṭāni r-rajīm. » — Le Prophète ﷺ a enseigné de chercher refuge auprès d'Allah contre le Shayṭān quand la colère monte (Bukhari 3282), et de s'asseoir, puis de s'allonger si l'on est debout (Abu Dawud 4782). Se rafraîchir à l'eau aide aussi le corps à se calmer. |
| [ ] | `quiz_hilm_rifq` | La Douceur (Ar-Rifq) | Sahih Muslim 2594 | إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ ، وَلَا يُنْزَعُ مِنْ شَيْءٍ إِلَّا شَانَهُ | « La douceur n'est point dans une chose sans qu'elle ne la pare, et elle n'est point retirée d'une chose sans qu'elle ne l'enlaidisse. » — Le Messager d'Allah ﷺ a enseigné que la douceur magnifie toute parole et toute action. C'est l'ornement du caractère noble qui désamorce les conflits les plus vifs. |
| [ ] | `quiz_hilm_afw` | Le Pardon & L'Élévation (Al-ʿAfw) | Sahih Muslim 2588 | مَا نَقَصَتْ صَدَقَةٌ مِنْ مَالٍ، وَمَا زَادَ اللَّهُ عَبْدًا بِعَفْوٍ إِلَّا عِزًّا | « L'aumône ne diminue en rien une richesse, et Allah n'ajoute au serviteur par le pardon que de la puissance, et quiconque s'abaisse pour Allah, Allah l'élève. » — Le Prophète ﷺ a affirmé qu'aucun pardon n'a jamais diminué l'honneur d'un croyant : au contraire, Allah élève en dignité et en estime celui qui sait pardonner. |
| [ ] | `quiz_dua_secret` | L'Invocation en secret pour autrui | Sahih Muslim 2732 | دَعْوَةُ الْمَرْءِ الْمُسْلِمِ لِأَخِيهِ بِظَهْرِ الْغَيْبِ مُسْتَجَابَةٌ | « L'invocation du musulman pour son frère en son absence est exaucée. Auprès de sa tête se trouve un ange qui dit : "Amîn, et à toi la même chose." » — Le Prophète ﷺ a enseigné que lorsqu'un musulman invoque pour son frère en secret, un ange désigné dit : « Amîn, et pour toi une part semblable » (Sahih Muslim 2732). C'est le remède suprême pour purifier le cœur de toute rancune. |

## 4. Quiz de l'histoire — Chapitre 3 (Le chemin du Tawakkul)

| Statut | ID | Notion / Sujet | Référence citée | Texte arabe | Citation / Explication (FR) |
|---|---|---|---|---|---|
| [ ] | `quiz_tawakkul_soins` | Le Tawakkul Actif & la Médecine | Sunan Abi Dawud 3855 & Sahih al-Bukhari 5678 | تَدَاوَوْا فَإِنَّ اللَّهَ لَمْ يَضَعْ دَاءً إِلَّا وَضَعَ لَهُ دَوَاءً | « Soignez-vous, serviteurs d'Allah ! Car Allah n'a pas fait descendre une maladie sans avoir fait descendre son remède. » — Le Prophète ﷺ a formellement ordonné de se soigner en affirmant qu'Allah n'a créé aucune maladie sans lui créer son remède. Consulter et prendre les remèdes est l'essence même du Tawakkul prophétique. |
| [ ] | `quiz_capacite_ame` | L'Épreuve selon la Capacité | Coran 2:286 & Sahih al-Bukhari 1117 | لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا | « Allah n'impose à aucune âme une charge supérieure à sa capacité. » — Le verset 2:286 garantit qu'Allah mesure chaque épreuve à la force de l'âme. Le Prophète ﷺ a enseigné de prier debout selon ses forces, assis si l'on ne peut pas, ou même sur le côté, car la miséricorde divine allège la pratique. |
| [ ] | `quiz_remedes_prophetiques` | La Sagesse des Remèdes Prophétiques | Sahih al-Bukhari 5417 & Sahih Muslim 2216 | التَّلْبِينَةُ مُجِمَّةٌ لِفُؤَادِ الْمَرِيضِ ، تَذْهَبُ بِبَعْضِ الْحُزْنِ | « La Talbîna réconforte le cœur du malade et dissipe une partie de sa peine. » — La Sunnah met en valeur des causes alimentaires douces : le miel (Coran 16:69), la Talbîna qui apaise le cœur du malade et dissipe sa tristesse (Bukhari 5417), et la nigelle (Bukhari 5688), toujours en harmonie avec la science. |
| [ ] | `quiz_dignite_souffrance` | Dignité & Accueil des Émotions | Sahih al-Bukhari 1303 | إِنَّ الْعَيْنَ تَدْمَعُ ، وَالْقَلْبَ يَحْزَنُ ، وَلَا نَقُولُ إِلَّا مَا يَرْضَى رَبُّنَا | « L'œil verse des larmes et le cœur s'attriste, mais nous ne disons que ce qui satisfait notre Seigneur. » — Le Prophète ﷺ lui-même a versé des larmes lors des épreuves et a dit : « L'œil pleure, le cœur est triste, mais nous ne disons que ce qui plaît à notre Seigneur » (Bukhari 1303). Les larmes sincères ne contredisent jamais le Sabr. |
| [ ] | `quiz_shukr_dependance` | L'Humilité de Recevoir l'Aide | Jami` at-Tirmidhi 1954 | مَنْ لَا يَشْكُرُ النَّاسَ لَا يَشْكُرُ اللَّهَ | « Celui qui ne remercie pas les gens ne remercie pas Allah. » — Le Prophète ﷺ a enseigné que celui qui ne remercie pas les gens ne remercie pas Allah (Tirmidhi 1954). Permettre à son frère ou à sa sœur de porter secours est une bénédiction partagée qui tisse la véritable fraternité. |

## 4 bis. Quiz de l'histoire — Chapitre 4 (Ce que tu as encore — Birr al-Wālidayn)

| Statut | ID | Notion / Sujet | Référence citée | Texte arabe | Citation / Explication (FR) |
|---|---|---|---|---|---|
| [ ] | `quiz_birr_parole` | La Parole Noble envers les Parents | Coran 17:23 (à faire relire) | فَلَا تَقُل لَّهُمَا أُفٍّ وَلَا تَنْهَرْهُمَا وَقُل لَّهُمَا قَوْلًا كَرِيمًا | « Ne leur dis point : "Fi !" et ne les brusque pas, mais adresse-leur des paroles respectueuses. » |
| [ ] | `quiz_birr_mere` | La Place de la Mère et du Père | Sahih al-Bukhari 5971 & Sahih Muslim 2548 (à faire relire) | أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أُمُّكَ، ثُمَّ أَبُوكَ | « Ta mère. — Et ensuite ? — Ta mère. — Et ensuite ? — Ta mère. — Et ensuite ? — Ton père. » |
| [ ] | `quiz_birr_shukr` | La Gratitude (Shukr) envers Allah et les Parents | Coran 31:14 (à faire relire) | أَنِ اشْكُرْ لِي وَلِوَالِدَيْكَ إِلَيَّ الْمَصِيرُ | « Sois reconnaissant envers Moi ainsi qu'envers tes parents. Vers Moi est la destination. » |
| [ ] | `quiz_birr_invocation` | L'Invocation pour ses Parents | Coran 17:24 (à faire relire) | رَّبِّ ارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا | « Ô mon Seigneur, fais-leur à tous deux miséricorde comme ils m'ont élevé tout petit. » |

## 4 ter. Quiz de l'histoire — Chapitre 5 (Le Sommet de la Persévérance — As-Sabr & La Constance)

| Statut | ID | Notion / Sujet | Référence citée | Texte arabe | Citation / Explication (FR) |
|---|---|---|---|---|---|
| [ ] | `quiz_sabr_constance` | La Constance dans le Bien (Al-Mudāwamah) | Sahih al-Bukhari 6464 & Sahih Muslim 782 (à faire relire) | أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ | « Les œuvres les plus aimées d'Allah sont les plus constantes, même si elles sont peu nombreuses. » |
| [ ] | `quiz_sabr_facilite` | Avec la Difficulté vient la Facilité | Coran 94:5-6 (à faire relire) | فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا | « À côté de la difficulté est, certes, une facilité ! À côté de la difficulté est, certes, une facilité ! » |

## 5. Quiz libres (« Quiz & Défis » — 18 questions, FR / EN / AR)

| Statut | ID | Catégorie | Référence citée | Arabe affiché | Explication (FR) |
|---|---|---|---|---|---|
| [ ] | `quiz_ablutions_ordre` | Prières & Adoration | Sourate Al-Ma'idah (5:6) et Hadith de 'Uthman ibn 'Affan (Rapporté par Al-Bukhari & Muslim) | وُضُوءٌ عَلَى هَدْيِ النَّبِيِّ ﷺ | L'ordre de la Sunnah commence par le lavage des mains (3x), puis le rinçage de la bouche et du nez (3x), le visage (3x), les avant-bras jusqu'aux coudes (3x), le passage des mains mouillées sur la tête et les oreilles (1x), et enfin le lavage des pieds jusqu'aux chevilles (3x). |
| [ ] | `quiz_piliers_islam` | Piliers & Foi | Hadith rapporté par Al-Bukhari (n°8) et Muslim (n°16) | أَرْكَانُ الإِسْلَام | Le Prophète ﷺ a dit : « L'Islam est bâti sur cinq piliers : l'attestation de foi (Shahada), l'accomplissement de la prière (Salat), l'acquittement de l'aumône (Zakat), le jeûne de Ramadan, et le pèlerinage (Hajj) pour celui qui en a les moyens. » |
| [ ] | `quiz_piliers_foi` | Piliers & Foi | Hadith de Jibril (Rapporté par Muslim, n°8) | أَرْكَانُ الإِيمَان | Les six piliers de la foi sont : croire en Allah, en Ses anges, en Ses livres révélés, en Ses messagers, au Jour dernier, et au Destin qu'il soit bon ou mauvais. |
| [ ] | `quiz_nombre_prieres` | Prières & Adoration | Hadith d'Al-Isra wal-Mi'raj (Sahih Al-Bukhari) | الصَّلَوَاتُ الخَمْس | Les 5 prières obligatoires prescrites lors du voyage nocturne (Al-Isra wal-Mi'raj) sont le Fajr (l'aube), le Dhuhr (midi), le 'Asr (après-midi), le Maghrib (coucher du soleil) et l'Isha (la nuit). |
| [ ] | `quiz_sourate_fatiha` | Coran & Sourates | Hadith rapporté par Al-Bukhari (n°756) et Muslim (n°394) | سُورَةُ الفَاتِحَة | Le Prophète ﷺ a dit : « N'a point de prière valide celui qui ne récite pas l'Ouverture du Livre (Al-Fatiha). » |
| [ ] | `quiz_nombre_sourates` | Coran & Sourates | Le Moushaf ‘Uthmani unanime | القُرْآنُ الكَرِيم | Le Saint Coran est composé de 114 sourates, commençant par la sourate Al-Fatiha et se terminant par la sourate An-Nas. |
| [ ] | `quiz_sourate_longue` | Coran & Sourates | Sourate Al-Baqarah (2:255) | سُورَةُ البَقَرَة | La sourate Al-Baqarah est la plus longue du Coran avec 286 versets. Elle contient également le plus grand verset : Ayat Al-Kursi (Le Verset du Trône). |
| [ ] | `quiz_rakats_fajr` | Prières & Adoration | Hadith : « Les deux rak'ats de l'aube sont meilleures que ce bas-monde et ce qu'il contient. » (Muslim) | صَلَاةُ الفَجْر | La prière obligatoire du Fajr comporte 2 rak'ats récitées à voix haute, précédées idéalement de 2 rak'ats surérogatoires (Sunnah du Fajr) qui ont un mérite immense. |
| [ ] | `quiz_mois_hegire` | Prophètes & Histoire | Sourate At-Tawbah (9:36) | التَّقْوِيمُ الهِجْرِيّ | L'année hégirienne commence par le mois sacré de Mouharram (qui contient le jour d'Achoura) et se termine par Dhou al-Hijja (le mois du Hajj). |
| [ ] | `quiz_prophete_arche` | Prophètes & Histoire | Sourate Houd (11:37) & Sourate Nouh (71) | سَفِينَةُ نُوحٍ عَلَيْهِ السَّلَام | Le Prophète Nouh (Noé عليه السلام) a appelé son peuple avec patience pendant 950 ans, puis a construit l'arche sous l'ordre d'Allah pour préserver les croyants. |
| [ ] | `quiz_laylat_qadr` | Coran & Sourates | Sourate Al-Qadr (97:3) | لَيْلَةُ القَدْر | Allah dit dans le Coran : « La nuit d'Al-Qadr est meilleure que mille mois. » (plus de 83 années d'adoration !). On la recherche parmi les dix dernières nuits impaires de Ramadan. |
| [ ] | `quiz_calife_othman` | Prophètes & Histoire | Récit authentique rapporté par Al-Bukhari (n°4987) | عُثْمَانُ بْنُ عَفَّانَ رَضِيَ اللهُ عَنْهُ | Le troisième calife bien guidé, Othmân ibn 'Affân (رضي الله عنه), a fait copier le texte coranique en plusieurs exemplaires officiels pour unifier la récitation dans tout le monde musulman. |
| [ ] | `quiz_adab_verite` | Comportement & Sagesse | Hadith rapporté par Al-Bukhari et Muslim | الصِّدْقُ وَالأَمَانَة | Le Prophète ﷺ a dit : « Attachez-vous à la véracité, car la véracité mène à la piété, et la piété mène au Paradis. » |
| [ ] | `quiz_zakat` | Piliers & Foi | Sourate At-Tawbah (9:60) | الزَّكَاة | La Zakat est une part obligatoire (généralement 2,5% de l'épargne annuelle ayant atteint le Nissab) prélevée pour être redistribuée aux nécessiteux et ayant-droits mentionnés dans le Coran. |
| [ ] | `quiz_ange_jibril` | Piliers & Foi | Sourate Ash-Shu'ara (26:192-194) | جِبْرِيلُ عَلَيْهِ السَّلَام | L'ange Jibril (Gabriel عليه السلام) est l'Esprit Saint (Ar-Rouh Al-Amin) chargé par Allah de faire descendre le Coran et les révélations divines sur le cœur des Prophètes. |
| [ ] | `quiz_hilm_force` | Hilm & Maîtrise de Soi | Sahih Al-Bukhari (n°6114) et Sahih Muslim (n°2609) | لَيْسَ الشَّدِيدُ بِالصُّرَعَةِ | Le Prophète ﷺ a enseigné que la véritable force ne réside pas dans les muscles, mais dans la capacité du croyant à dompter son âme et à retenir sa colère lorsque le Shayṭān cherche à l'enflammer. |
| [ ] | `quiz_hilm_rifq` | Hilm & Maîtrise de Soi | Sahih Muslim (n°2594) | إِنَّ الرِّفْقَ لَا يَكُونُ فِي شَيْءٍ إِلَّا زَانَهُ | La douceur (*Rifq*) et l'indulgence désamorcent les insufflations de division et apportent la barakah dans toute situation difficile. |
| [ ] | `quiz_hilm_colere_remede` | Hilm & Maîtrise de Soi | Sahih Al-Bukhari (n°3282) et Sunan Abi Dawud (n°4782) | أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ | Face à l'énervement insufflé par le Waswâs, la Sunnah enseigne de chercher refuge auprès d'Allah (Istiʿādhah) et de changer de posture (s'asseoir ou s'allonger) ; se rafraîchir avec de l'eau aide aussi à apaiser la colère. |

## 6. Livre du Savoir (`src/data/knowledge.ts`)

| Statut | ID | Notion | Arabe | Référence | Contexte détaillé (FR) |
|---|---|---|---|---|---|
| [ ] | `istiadhah` |  | الاستعاذة | Coran 16:98 | « Lorsque tu lis le Coran, cherche refuge auprès d’Allah contre le diable banni. » (Sourate An-Nahl, 16:98). L’istiʿādhah recentre le cœur sur le Créateur face aux suggestions trompeuses. |
| [ ] | `taaruf` |  | التعارف | Coran 49:13 | « Ô hommes ! Nous vous avons créés d’un mâle et d’une femelle, et Nous avons fait de vous des peuples et des tribus, pour que vous vous entreconnaissiez. Le plus noble d’entre vous, auprès d’Allah, est le plus pieux. » (Sourate Al-Hujurat, 49:13). |
| [ ] | `adab` |  | الأدب وحفظ اللسان | Sahih al-Bukhari 6018 | Le Messager d’Allah ﷺ a dit : « Que celui qui croit en Allah et au Jour dernier dise du bien ou qu’il garde le silence. » (Rapporté par Al-Bukhari, n° 6018, et Muslim). |
| [ ] | `sabr` |  | الصبر | Coran 2:153 | « Ô les croyants ! Cherchez secours dans l’endurance (le Sabr) et la prière. Car Allah est avec ceux qui sont endurants. » (Sourate Al-Baqarah, 2:153). Le sabr ne consiste ni à s’obstiner avec colère ni à renoncer à agir. |
| [ ] | `niyyah` |  | النية | Sahih al-Bukhari 1 | Le Messager d’Allah ﷺ a dit : « Les actions ne valent que par les intentions qui les animent, et chacun ne recevra que selon son intention. » (Rapporté par Al-Bukhari, n° 1, et Muslim). |
| [ ] | `shukr` |  | الشكر | Coran 14:7 | « Et lorsque votre Seigneur proclama : "Si vous êtes reconnaissants, très certainement J’augmenterai [Mes bienfaits] pour vous." » (Sourate Ibrahim, 14:7). |
| [ ] | `salam` |  | السلام | Sahih al-Bukhari 6237 | Le Prophète ﷺ a enseigné que lorsqu’il y a rupture ou hésitation entre deux personnes, « le meilleur des deux est celui qui commence par le salām. » (Sahih al-Bukhari 6237). |
| [ ] | `effort` |  | بذل الأسباب والتوكل | Sahih Muslim 2664 | Le Prophète ﷺ a dit : « Recherche avec ardeur ce qui t’est profitable, demande l’aide d’Allah et ne sois pas impuissant. » (Sahih Muslim 2664). |
| [ ] | `ilm` |  | العلم النافع | Notion maîtresse Chapitre 1 | Le savoir authentique n’est ni un pouvoir magique ni une simple accumulation théorique : c’est ce qui nourrit la niyyah, soutient le sabr et transforme chaque pas en cause bénéfique. |

## 7. Invocations et citations arabes dans les dialogues (Chapitres 1 à 3)

| Statut | Chapitre | Scène | Beat ID | Orateur | Arabe | Texte FR |
|---|---|---|---|---|---|---|
| [ ] | Ch. 1 | S3 (Le Premier Waswas) | `s3_b9` | personnage | — | أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ Aʿūdhu billāhi mina sh-shayṭāni r-rajīm ! |
| [ ] | Ch. 1 | S4 (« Je ne veux plus être seul ») | `s4_b9` | personnage | — | Le verset 49:13... Des nations et des tribus « pour que vous vous entreconnaissiez » (Taʿāruf). Donc la différence entre les gens n'est pas un obstacle... C'est une invitation voulue par Dieu ! |
| [ ] | Ch. 1 | S6 (Le Refus) | `s6_b16` | personnage | — | Le verset 2:153... Chercher secours dans l'endurance et la prière. Le Sabr, ce n'est ni bouder, ni forcer la porte. C'est accueillir ce qui arrive avec calme, dignité et respect. |
| [ ] | Ch. 1 | S8 (Le Jardin Abandonné) | `s8_b10` | personnage | — | Le verset 14:7... « Si vous êtes reconnaissants, très certainement J'augmenterai Mes bienfaits pour vous ». La gratitude (Shukr), ce n'est pas faire semblant que tout est parfait... |
| [ ] | Ch. 1 | S9 (Le Grand Waswas) | `s9_b14` | personnage | — | Hadith de Muslim 2664 : « Recherche avec ardeur ce qui t'est profitable, demande l'aide d'Allah et ne sois pas impuissant ». Le savoir ne suffit pas : il faut unir la foi, l'effort et l'action ! |
| [ ] | Ch. 3 | S201 (La Cueillette sous les Amandiers) | `s201_b4` | noura | — | « L'exemple des croyants dans leur amour, leur miséricorde et leur compassion mutuels est comme le corps : si un membre souffre, tout le reste du corps répond par l'insomnie et la fièvre » (Bukhari 6011). Vous donnez vie à cette noble parole, mes enfants. |
| [ ] | Ch. 3 | S202 (Le Manuscrit des Épreuves) | `s202_b2` | narration | — | « Lis ceci, jeune voyageur. C'est le récit de la longue maladie du noble Prophète Ayyûb (Job عليه السلام). Malgré des années de douleur physique, jamais un mot de rancœur ou de reproche n'a franchi ses lèvres. » |
| [ ] | Ch. 3 | S202 (Le Manuscrit des Épreuves) | `s202_b3` | personnage | — | « Rabbi annī massaniyaḍ-ḍurru wa anta arḥamur-rāḥimīn » (Coran 21:83)... « Le mal m'a touché, et Tu es le plus Miséricordieux des miséricordieux ». Une prière si humble, sans exigence ni amertume. |
| [ ] | Ch. 3 | S202 (Le Manuscrit des Épreuves) | `s202_b4` | noura | — | Le Prophète ﷺ a enseigné : « Jamais une fatigue, une maladie, un souci ou même une épine ne touche le croyant sans qu'Allah n'efface par cela de ses péchés » (Bukhari 5641). Rien de ce que tu endures n'est vain, Othmân. |

---

## 8. Validation finale

- **Nom / qualité du relecteur religieux :** *(à compléter)*
- **Édition de référence retenue pour les hadiths :** *(à compléter)*
- **Nom du relecteur arabophone (tashkīl) :** *(à compléter)*
- **Date de validation :** *(à compléter)*
