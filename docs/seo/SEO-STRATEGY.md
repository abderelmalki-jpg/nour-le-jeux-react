# Stratégie SEO — NOUR : La Voie de la Sagesse

*Établie le 2026-11-24 à partir de l'inspection du dépôt (`index.html`, `public/*`, composants `landing`) et de recherches web limitées. **Aucune donnée Search Console, GA4 ni volume de mots-clés n'était disponible** : les chiffres ci-dessous sont des hypothèses de travail, pas des mesures.*

## 1. Découverte

| Sujet | Constat |
|---|---|
| Produit | RPG narratif éducatif, gratuit : web (`playnour.online`), Android (APK / Play), iOS (TestFlight en préparation). |
| Cible principale | Parents musulmans francophones (France, Belgique, Suisse, Maghreb) d'enfants de 6–12 ans ; secondaire : arabophones, anglophones. |
| Achat | Pas de publicité ni de compte ; le web propose un soutien (Stripe, encore en liens de test) ; natif sans paiement externe. |
| Objectifs | 1) Faire jouer le chapitre 1 en un clic ; 2) installations Android/iOS ; 3) inscription à la liste d'e-mails ; 4) crédibilité auprès des parents. |
| Contrainte | Contenu religieux : toute promesse de fiabilité doit rester conforme à la réalité (relecture savant en attente). |

## 2. État actuel du site (audit technique rapide)

**Points solides**
- Canonical, Open Graph, Twitter Card, `robots.txt` ouvert (dont crawlers IA), `llms.txt`, sitemap avec images/vidéo.
- Données structurées : `FAQPage`, `VideoObject`, `Organization`, `WebSite`, `BreadcrumbList`.
- Polices embarquées, aucun script tiers avant consentement (PostHog conditionné), page de confidentialité.

**Problèmes à traiter (par gravité)**

| # | Problème | Risque | Action |
|---|---|---|---|
| 1 | `AggregateRating` 4,9 / 148 avis dans le JSON-LD de `index.html` : **rien dans le dépôt ne le justifie**. | Action manuelle Google (données structurées trompeuses) et atteinte à la confiance. | **Le retirer** tant qu'il n'existe pas de vrais avis vérifiables (Play Store/App Store). À valider par vous. |
| 2 | Promesses de contenu non alignées sur la réalité : « hadiths sûrs / scrupuleusement sourcés » (relecture savant pas faite), « PEGI 3+ » (aucune classification officielle obtenue), « doublage intégral studio / voix cinéma » (voix partielle, mélange de sources). | Réclamations, rejet store, perte de confiance. | Reformuler (« références citées, relecture en cours ») ; remplacer PEGI par « adapté dès 6–8 ans » ; ajuster `index.html`, `llms.txt`, FAQ, fiches stores. |
| 3 | **Une seule URL** (SPA) ; langues par `?lang=ar|en` ; `index.html` ne déclare pas `hreflang=en` alors que le sitemap oui. | Les versions EN/AR ne sont pas réellement indexables ; signaux contradictoires. | Passer à des URL par langue (`/`, `/en/`, `/ar/`) pré-rendues (voir `SITE-STRUCTURE.md`). |
| 4 | Aucune page de contenu (chapitres, valeurs, guide parents, blog). | Aucune porte d'entrée vers les requêtes réelles des parents. | Créer ~12 pages statiques (voir calendrier). |
| 5 | Sitemap : 4 URL, `lastmod` 2026-09-20. | Faible fraîcheur. | Régénérer à chaque déploiement. |
| 6 | Poids : bundle JS avec avertissement > 500 Ko ; bande-annonce de 4,9 Mo. | LCP/INP sur mobile 4G. | Découpage de code, vidéo en `preload="none"`, poster léger. |
| 7 | `Cache-Control: no-cache, no-store` sur toutes les pages HTML. | Correct pour le HTML d'une SPA, mais à vérifier pour `/game-assets/*` (images lourdes). | Mettre un cache long sur les images/vidéos versionnées. |
| 8 | `llms.txt` obsolète (langues, plateformes, voix, iOS). | Réponses IA inexactes. | Mettre à jour après la correction du point 2. |

## 3. Positionnement et mots-clés (hypothèses à valider avec un outil de volumes)

| Langue | Intention | Requêtes candidates |
|---|---|---|
| FR | Parent cherche un jeu sûr | « jeu islamique enfant », « jeu éducatif musulman », « application islamique pour enfants », « jeu halal gratuit » |
| FR | Parent cherche à transmettre une valeur | « apprendre l'adab à un enfant », « enseigner la patience (sabr) à un enfant », « hadith sur la colère enfant », « douas du quotidien enfant » |
| AR | | « لعبة إسلامية للأطفال », « تطبيق تعليمي إسلامي للأطفال » |
| EN | | « Islamic game for kids », « Muslim kids educational game », « teach kids adab » |

**Différenciation** (à utiliser dans les titres) : *aventure narrative sans violence où la sagesse remplace le combat* ; Ponts de Nour (gestes réels) ; gratuit et sans publicité (à vérifier à chaque version).

## 4. Pistes prioritaires

1. **Corriger la confiance** (points 1 et 2 du tableau) : c'est le prérequis de tout le reste.
2. **URL par langue + pré-rendu** : rend l'arabe et l'anglais indexables.
3. **Pages « valeurs » pour parents** : une page par vertu (Adab, Hilm, Tawakkul, Birr al-Wālidayn, Sabr) avec extrait de jeu, sources citées (relues), activité à faire en famille.
4. **ASO** (App Store / Google Play) : même vocabulaire que les pages web, captures d'écran qui montrent l'histoire, pas l'interface.
5. **Preuves sociales réelles** : avis stores, témoignages signés avec accord.

## 5. KPI (à mesurer dès la connexion de Search Console)

| Indicateur | Référence actuelle | 3 mois | 6 mois | 12 mois |
|---|---|---|---|---|
| Pages indexées | 1 (à vérifier) | 15 | 30 | 50+ |
| Impressions / mois (Search Console) | à relever | à fixer après relevé | | |
| Parties du chapitre 1 démarrées depuis le web | à relever (PostHog, avec consentement) | +50 % vs référence | | |
| Installations Android/iOS depuis le site | à relever | | | |
| Core Web Vitals (mobile, p75) | à mesurer (CrUX / PSI) | LCP < 2,5 s, INP < 200 ms | | |

## 6. Risques et dépendances

- **Relecture religieuse** : bloque la publication de pages « valeurs » avec hadiths et versets.
- **Traduction arabe** : à faire relire par un arabophone avant d'indexer `/ar/`.
- **Pré-rendu** : demande un changement de build (Vite + génération statique) et des règles Firebase Hosting ; à tester avant déploiement.
- **Stripe** en liens `test_` : ne pas mettre en avant le soutien tant qu'il n'est pas en production.
