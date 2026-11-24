# Feuille de route SEO — 4 phases

## Phase 1 — Fondations (semaines 1–4)

| Tâche | Détail | Statut |
|---|---|---|
| Retirer `AggregateRating` | Supprimer le bloc dans `index.html` (aucun avis réel). **Décision à confirmer.** | à faire |
| Aligner les promesses | `index.html`, `llms.txt`, FAQ, fiches stores : « références citées, relecture en cours », « adapté dès 6–8 ans », voix selon la réalité. | à faire |
| Search Console + Bing Webmaster | Vérifier le domaine, soumettre le sitemap, relever les impressions et clics de référence. | à faire (accès requis) |
| Mesures | PostHog (avec consentement) : événements « partie démarrée », « chapitre 1 terminé », « clic Télécharger ». | partiellement en place |
| Performance | Découpage du bundle, vidéo `preload="none"`, cache long des médias. Mesurer PSI/CrUX avant/après. | à faire |
| Pages cœur | Accueil réécrit, Pour les parents, Télécharger, chapitre 1. | à faire |

## Phase 2 — Expansion (semaines 5–12)

- URL par langue et pré-rendu (`/`, `/en/`, `/ar/`), hreflang réciproque, nouveau sitemap généré au build.
- Pages valeurs (Adab, Hilm, Tawakkul) et articles du calendrier, après relecture.
- Fiches stores (ASO) alignées sur les mêmes mots-clés ; captures d'écran narratives.
- Maillage interne et fil d'Ariane (`BreadcrumbList`).

## Phase 3 — Montée en charge (semaines 13–24)

- Pages valeurs Birr al-Wālidayn et Sabr (selon la sortie des chapitres 4–5).
- Version anglaise et arabe complètes (relues).
- Partenariats : écoles coraniques, associations, blogs parentaux — **uniquement des liens sollicités honnêtement**, pas d'achat de liens.
- Optimisation pour les moteurs de réponse : sections FAQ visibles, définitions courtes, `llms.txt` à jour.
- Vérifier les Core Web Vitals sur données de terrain.

## Phase 4 — Autorité (mois 7–12)

- Étude ou contenu de référence (ex. « guide des valeurs par âge ») avec relecteur nommé.
- Relations presse communautaire (sites et radios musulmans).
- Avis réels sur les stores, témoignages signés.
- Révision trimestrielle du contenu et des mots-clés.

## Dépendances et risques

| Dépendance | Conséquence si absente |
|---|---|
| Relecture religieuse | Pas de pages valeurs/hadith |
| Relecture arabe/anglais | `/ar/` et `/en/` non publiés |
| Accès Search Console | Pas de baseline ni de suivi |
| Compte App Store Connect (Issuer ID, app `com.lavoie.sagesse`) | Pas de page « Télécharger » iOS |
| Chapitre 4 écrit | Pas de page chapitre 4 |

## Décisions attendues

1. Je retire l'`AggregateRating` et j'aligne les promesses ? (recommandé)
2. Pré-rendu : on le fait (changement de build) ou on commence par des pages statiques écrites à la main ?
3. Qui sera le relecteur nommé sur le site ?
