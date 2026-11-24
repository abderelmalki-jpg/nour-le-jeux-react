# Architecture du site proposée

Domaine : `https://playnour.online` (Firebase Hosting, SPA React/Vite).

## Principe

Garder l'application de jeu telle quelle (`/jouer`), et ajouter autour d'elle des **pages statiques pré-rendues**, par langue, lisibles sans JavaScript.

```
/                         Accueil FR (pitch, bande-annonce, CTA « Jouer le chapitre 1 »)
/jouer                    Le jeu (SPA existante, noindex)
/fr/ ... (alias de /)
/en/                      Accueil EN
/ar/                      Accueil AR (dir="rtl")

/chapitres/               Les 5 chapitres (statut honnête : jouable / en écriture)
/chapitres/vaincre-la-solitude
/chapitres/le-chemin-du-hilm
/chapitres/le-chemin-du-tawakkul
/chapitres/ce-que-tu-as-encore        (quand disponible)
/chapitres/le-sommet-de-la-perseverance

/valeurs/                 Guide des valeurs pour parents
/valeurs/adab · /valeurs/hilm · /valeurs/sabr · /valeurs/tawakkul · /valeurs/birr-al-walidayn

/pour-les-parents/        Sécurité, données, âge, absence de publicité, contrôle du temps
/telecharger/             Android, iOS (TestFlight puis App Store), web
/blog/                    Articles (voir CONTENT-CALENDAR.md)
/confidentialite          Page existante (`privacy.html`)
/mentions-legales
/contact
```

Les mêmes pages existent en `/en/…` et `/ar/…` quand la traduction est relue.

## Règles techniques

| Sujet | Règle |
|---|---|
| Langues | Une URL par langue ; `<link rel="alternate" hreflang>` réciproque sur chaque page (fr, en, ar, x-default) ; retirer `?lang=` des signaux SEO. |
| Pré-rendu | Génération statique des pages marketing au build (ex. `vite-plugin-ssg` ou script de prérendu). La SPA `/jouer` reste côté client. |
| Firebase | Rewrites : pages statiques d'abord, `**` → `/index.html` ensuite ; `/jouer` en `noindex`. |
| Données structurées | `Organization`, `WebSite`, `VideoObject` (bande-annonce), `FAQPage` (FAQ visible), `MobileApplication`/`VideoGame` par page de téléchargement. **Pas d'`AggregateRating` sans avis réels.** |
| Titres/descriptions | Uniques par page, ≤ 60 / ≤ 155 caractères, mot-clé principal + bénéfice. |
| Maillage interne | Chaque page « valeur » → chapitre correspondant → « Jouer ». Chaque article → page valeur + chapitre. |
| Images | `alt` descriptifs, WebP/AVIF, dimensions explicites, `loading="lazy"` hors écran initial. |
| Sitemap | Généré au build, `lastmod` réel, `xhtml:link` par langue. |
| Qualité de page | Pas de pages « programmatiques » en masse : 1 page = 1 vraie intention. |

## Contrôles qualité avant publication d'une page

1. Texte relu (orthographe, ton enfant/parent).
2. Références religieuses validées par un savant et citées (sourate:verset, recueil + numéro).
3. Traduction relue par un natif (EN, AR).
4. Aucune affirmation non démontrable (avis, notes, classification d'âge).
