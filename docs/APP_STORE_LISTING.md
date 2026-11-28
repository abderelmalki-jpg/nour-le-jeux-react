# 🍎 Fiche App Store : Nour (prête à copier-coller)

Champs à remplir dans App Store Connect → ton app → *Informations sur l'app* et *Version 1.0.4*.
Les longueurs respectent les limites d'Apple (vérifiées).

## Identité & Pack ASO / SEO Multilingue (0 doublon entre Nom, Sous-titre et Mots-clés)

### 🇫🇷 Français (`fr-FR`)
| Champ | Valeur | Limite |
|---|---|---|
| Nom | `Nour : Jeu Islamique & Quiz` (27) | 30 |
| Sous-titre | `Aventure, Adab, Coran Enfant` (28) | 30 |
| Mots-clés | `hadith,musulman,ramadan,priere,ablution,sagesse,famille,educatif,histoire,prophete,halal,rpg,arabe` (98) | 100 |

### 🇸🇦 Arabe (`ar-SA`)
| Champ | Valeur | Limite |
|---|---|---|
| Nom | `نور : لعبة ومسابقات إسلامية` (27) | 30 |
| Sous-titre | `قصة وأدب وقرآن للأطفال والأسرة` (30) | 30 |
| Mots-clés | `حديث,وضوء,صلاة,رمضان,حكمة,تعليم,مسلم,أسئلة,ثقافة,أنبياء,سيرة,تربية,أخلاق,مغامرة,حلال,تحدي,دينية` (95) | 100 |

### 🇬🇧 Anglais (`en-US` / `en-GB`)
| Champ | Valeur | Limite |
|---|---|---|
| Nom | `Nour: Islamic Game & Quiz` (25) | 30 |
| Sous-titre | `Quran, Hadith & Adab RPG Kids` (29) | 30 |
| Mots-clés | `muslim,halal,ramadan,salah,wudu,stories,family,trivia,prophets,manners,arabic,educational,adventure` (99) | 100 |

### Paramètres communs
| Champ | Valeur |
|---|---|
| Catégorie principale | **Jeux** → sous-catégorie *Jeux de rôle* |
| Catégorie secondaire | **Éducation** |
| URL d'assistance | `https://playnour.online` |
| URL de politique de confidentialité | `https://playnour.online/privacy.html` |
| Copyright | `© 2026 Nour Studios` |

> ⚠️ `public/privacy.html` a été mise à jour (iOS, PostHog, paiements web uniquement). **Redéploie le site**
> (`firebase deploy --only hosting`) pour que l'URL affiche la nouvelle version avant la soumission.

## Texte promotionnel (modifiable sans nouvelle version, 170 max)

> Un RPG poétique et sans violence où chaque choix cultive la patience, la douceur et la sagesse. 100 % gratuit, sans publicité.

## Description (4000 max)

> **Nour : retrouve ta lumière.**
> Une aventure illustrée aux personnages en pixel-art, inspirée des contes d'Orient, où chaque dialogue est une occasion de grandir.
>
> ✨ **Une aventure en 3 chapitres**
> Du premier Salām au jardin réhabilité, de la colère maîtrisée par le Hilm jusqu'à la montagne intérieure : suis Othmân dans son village et fais grandir sa lumière à chacun de tes choix.
>
> 🌱 **Des actions dans la vraie vie**
> Ranger son lit, boire avec Adab, pardonner, rendre visite aux malades… Chaque chapitre propose de petites actions concrètes pour que le jeu transforme vraiment le quotidien.
>
> 📖 **Des savoirs sourcés**
> Quiz de sagesse, hadiths et versets avec leurs références citées, en français, anglais et arabe.
>
> 👨‍👩‍👧 **Fait pour toute la famille**
> Sans violence, sans publicité, sans achat intégré, sans création de compte. Votre progression reste sur votre appareil.
>
> 🔔 **Rappel quotidien facultatif**
> Une douce notification pour poursuivre l'aventure, désactivable à tout moment.
>
> « Ce jeu n'a de valeur que s'il transforme la vie réelle du joueur. »

## Nouveautés de la version 1.0.4

> Première version sur iPhone et iPad : aventure complète en 3 chapitres, quiz de sagesse, rappel quotidien facultatif.

## Classification d'âge (questionnaire)

- Violence, contenu sexuel, jeux d'argent, horreur, alcool/drogues, langage grossier : **Aucun**.
- Combats : les « duels » sont des dialogues symboliques contre le doute et la colère → **pas de violence représentée**.
- Accès web illimité : **Non** · Contenu généré par les utilisateurs : **Non**.
- Résultat attendu : **4+** (ou 9+ selon l'avis d'Apple).
- Ne **pas** cocher la catégorie « Enfants » : elle interdit les outils d'analytics tiers et impose des règles très strictes.

## Confidentialité de l'app (étiquettes)

- **Suivi (tracking)** : Non. Pas de boîte ATT.
- **Données collectées** : *Usage → Interactions avec le produit*, **non liées à l'identité**, finalité **Analytics**.
- Tout le reste : **Données non collectées** (pas de compte, localisation, contacts, achats, identifiant publicitaire).
- Cela correspond au fichier `ios/App/App/PrivacyInfo.xcprivacy`.

## Notes pour l'équipe de relecture Apple

> Nour est un jeu éducatif narratif gratuit. Il n'y a ni compte, ni achat intégré, ni publicité, ni contenu communautaire.
> Aucune identification n'est nécessaire : lancez l'app et touchez « Jouer ». Le seul accès demandé est l'autorisation facultative
> de notifications locales pour un rappel quotidien. Les analytics sont anonymes (pas d'enregistrement d'écran, pas de suivi).

## Captures d'écran (obligatoires)

- iPhone **6,9"** : 1320 × 2868 (ou 1290 × 2796). Minimum 3, idéal 5–6 : écran-titre, dialogue, carte du voyage, quiz, quêtes, fin de chapitre.
- iPad : **non requis** — la v1 est limitée à l'iPhone (`TARGETED_DEVICE_FAMILY = 1`). Pour ajouter l'iPad plus tard, remettre `"1,2"` dans le projet Xcode et fournir des captures 2064 × 2752.
- Les captures se prennent depuis un iPhone via TestFlight (puis recadrage), ou depuis le simulateur Xcode d'un Mac.

## À faire une fois le premier build sur TestFlight

1. Tester sur un vrai iPhone : encoche et barre d'accueil, son (mode silencieux), notifications, rotation.
2. Ajuster les marges si besoin (`contentInset` dans `capacitor.config.ts`).
3. Remplir la fiche, ajouter le build, **Soumettre pour examen**.
