# Inventaire des visuels (état au 2026-11-24)

*Généré par script (références = fichiers de `src/`, `index.html`, `public/` qui citent le nom ; les plans `ch1_shots` sont chargés dynamiquement par `StoryShotOverlay.tsx`. Avant toute suppression, vérifier aussi `scripts/` et `NOUR_3D/`). La colonne « Famille » ne reflète que les images **vues à l'œil** ; « à classer » = pas encore examinée. Un détecteur automatique peint/pixel s'est révélé non fiable (le format 1376×768 contient aussi bien du pixel que du peint).*

**109 fichiers listés, 36 Mo** (hors portraits `pixel_*`).

| Fichier | Dim. | Ko | Famille | Cité dans | Doublon de | Statut |
|---|---|---|---|---|---|---|
| `src/assets/images/bg_arbre_racines_anciennes.jpg` | 1376×768 | 249 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_atelier_sculpture_sac.jpg` | 1376×768 | 279 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_carrefour_poteau_1788269918837.jpg` | 1920×1080 | 447 | Peint (texte incrusté faux) | assets.ts | bg_carrefour_sac_pose.jpg | à refaire (défaut visible) |
| `src/assets/images/bg_carrefour_sac_pose.jpg` | 1920×1080 | 447 | Peint (texte incrusté faux, doublon) | assets.ts | bg_carrefour_poteau_1788269918837.jpg | à refaire (défaut visible) |
| `src/assets/images/bg_chambre_1788128574397.jpg` | 1678×937 | 294 | Peint | assets.ts |  | conforme (à garder) |
| `src/assets/images/bg_chambre_lit_defait.jpg` | 1679×937 | 299 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_chapter_end_dawn_1788280400414.jpg` | 1920×1080 | 404 | à classer | assets.ts | bg_epilogue_coucher_soleil.jpg, bg_montagne_interieure_climax.jpg | à classer |
| `src/assets/images/bg_climax_apaise.jpg` | 1376×768 | 163 | Pixel | SplashScreen.tsx, assets.ts |  | à refaire en peint |
| `src/assets/images/bg_climax_pure_mist_1788273223875.jpg` | 1376×768 | 189 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_cour_familiale_parents.jpg` | 1376×768 | 252 | Pixel (montre l'arbre, pas une cour) | assets.ts |  | à refaire en peint |
| `src/assets/images/bg_cuisine_bouillon.jpg` | 1376×768 | 222 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_epilogue_coucher_soleil.jpg` | 1920×1080 | 404 | à classer | assets.ts | bg_chapter_end_dawn_1788280400414.jpg, bg_montagne_interieure_climax.jpg | à classer |
| `src/assets/images/bg_halte_the_apaisement.jpg` | 1376×768 | 264 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_jardin_1788128585555.jpg` | 1376×768 | 311 | Peint (aquarelle) | — |  | non cité dans src/ : vérifier avant suppression |
| `src/assets/images/bg_maison_soins_apothicaire.jpg` | 1376×768 | 229 | Pixel | SplashScreen.tsx, assets.ts |  | à refaire en peint |
| `src/assets/images/bg_marche_fruits_reconcilie.jpg` | 1024×571 | 187 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_marche_fruits_renverses.jpg` | 1024×571 | 178 | à classer | SplashScreen.tsx, PricingSection.tsx, assets.ts |  | à classer |
| `src/assets/images/bg_montagne_interieure_climax.jpg` | 1920×1080 | 404 | à classer | assets.ts | bg_chapter_end_dawn_1788280400414.jpg, bg_epilogue_coucher_soleil.jpg | à classer |
| `src/assets/images/bg_mosquee_marches_attelle.jpg` | 1376×768 | 237 | à classer | SplashScreen.tsx, assets.ts |  | à classer |
| `src/assets/images/bg_mosquee_patio_vigne.jpg` | 1376×768 | 247 | Pixel | assets.ts |  | à refaire en peint |
| `src/assets/images/bg_scene_geste_oliviers_1788271406874.jpg` | 1024×571 | 216 | Peint (réaliste) | assets.ts |  | conforme (à garder) |
| `src/assets/images/bg_scene_geste_paniers_ranges.jpg` | 1024×571 | 215 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_scene_jardin_abandonne_1788271802094.jpg` | 1376×768 | 333 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_scene_jardin_encombre.jpg` | 1376×768 | 313 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_scene_refus_jeune_corde.jpg` | 1024×571 | 176 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_scene_refus_ruelle_1788270843346.jpg` | 1376×768 | 248 | Pixel | assets.ts |  | à refaire en peint |
| `src/assets/images/bg_scene_waswas_clair.jpg` | 1376×768 | 205 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_scene_waswas_pure_mist_1788273203805.jpg` | 1376×768 | 188 | Pixel | assets.ts |  | à refaire en peint |
| `src/assets/images/bg_teaser_chapitre4_arbre.jpg` | 1376×768 | 246 | Pixel | PricingSection.tsx |  | à refaire en peint |
| `src/assets/images/bg_the_artisan_soutien.jpg` | 1376×768 | 265 | à classer | PricingSection.tsx |  | à classer |
| `src/assets/images/bg_vallee_village_approach_1788270427768.jpg` | 1920×1080 | 551 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_verger_amandiers.jpg` | 1376×768 | 236 | Peint (aquarelle) | assets.ts |  | conforme (à garder) |
| `src/assets/images/bg_verger_fleur_lanterne.jpg` | 1376×768 | 197 | à classer | assets.ts |  | à classer |
| `src/assets/images/bg_village_accueillant.jpg` | 1920×1080 | 460 | Peint (visages masqués à refaire) | assets.ts |  | à refaire (défaut visible) |
| `src/assets/images/bg_village_mefiant.jpg` | 1920×1080 | 449 | à classer | assets.ts |  | à classer |
| `src/assets/images/characters_master_sheet.jpg` | 1024×682 | 131 | Pixel HD (référence personnages) | — |  | non cité dans src/ : vérifier avant suppression |
| `src/assets/images/logo_nour_officiel.jpg` | 1024×1024 | 141 | à classer | — |  | non cité dans src/ : vérifier avant suppression |
| `src/assets/images/logo_nour_transparent.png` | 1254×1254 | 400 | à classer | SplashScreen.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_1.jpg` | 1280×720 | 82 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_2.jpg` | 1280×720 | 241 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_3.jpg` | 1280×720 | 100 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_4.jpg` | 1280×720 | 296 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_5.jpg` | 1280×720 | 240 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_6.jpg` | 1280×720 | 101 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_7.jpg` | 1280×720 | 115 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_8.jpg` | 1280×720 | 120 | à classer | SceneTransitionModal.tsx |  | à classer |
| `src/assets/images/transitions/transition_scene_9.jpg` | 1280×720 | 73 | à classer | SceneTransitionModal.tsx |  | à classer |
| `public/game-assets/affiche_nour.jpg` | 1254×1254 | 773 | Mixte (doublon de hero_landing) | translations.ts | hero_landing.jpg | à refaire (défaut visible) |
| `public/game-assets/bg_epilogue_coucher_soleil.jpg` | 1376×768 | 928 | à classer | assets.ts |  | à classer |
| `public/game-assets/bg_the_artisan_soutien.jpg` | 1376×768 | 404 | à classer | PricingSection.tsx |  | à classer |
| `public/game-assets/carrefour.jpg` | 1376×768 | 670 | Pixel (texte incrusté faux) | GameplayMechanics.tsx, gameData.ts, translations.ts |  | à refaire (défaut visible) |
| `public/game-assets/chambre.jpg` | 1678×937 | 571 | Peint | GameplayMechanics.tsx, UnifiedBenefitsSection.tsx, translations.ts (+2) |  | conforme (à garder) |
| `public/game-assets/epilogue.jpg` | 1920×1080 | 487 | à classer | — |  | non cité dans src/ : vérifier avant suppression |
| `public/game-assets/hero_landing.jpg` | 1254×1254 | 773 | Mixte (texte FR incrusté, Othmân hors canon) | HeroSection.tsx | affiche_nour.jpg | à refaire (défaut visible) |
| `public/game-assets/marche.jpg` | 1024×571 | 492 | Peint (visage à retirer) | gameData.ts, translations.ts, index.html (+1) |  | à refaire (défaut visible) |
| `public/game-assets/othman_room_sunrise.jpg` | 754×1018 | 253 | à classer | — |  | non cité dans src/ : vérifier avant suppression |
| `public/game-assets/othman_room_waswas.jpg` | 754×1014 | 376 | à classer | — |  | non cité dans src/ : vérifier avant suppression |
| `public/game-assets/play_games_cover_1920x1080.jpg` | 1920×1080 | 611 | à classer | GameplayVideoSection.tsx |  | à classer |
| `public/game-assets/teaser_chapitre4.jpg` | 1376×768 | 963 | Pixel | gameData.ts, translations.ts |  | à refaire en peint |
| `public/game-assets/title_screen_bg.jpg` | 1024×571 | 449 | Peint | SplashScreen.tsx, HeroSection.tsx, index.html |  | conforme (à garder) |
| `public/game-assets/verger.jpg` | 947×947 | 426 | à classer | GameplayMechanics.tsx, translations.ts, index.html (+1) |  | à classer |
| `public/game-assets/village_accueillant.jpg` | 1920×1080 | 553 | Peint (visages masqués à refaire) | assets.ts, index.html, sitemap.xml |  | à refaire (défaut visible) |
| `public/game-assets/village_mefiant.jpg` | 1920×1080 | 543 | à classer | assets.ts |  | à classer |
| `public/game-assets/waswas_bg.jpg` | 1376×768 | 782 | à classer | GameplayMechanics.tsx, gameData.ts, translations.ts |  | à classer |
| `public/game-assets/hero_landing.png` | 1254×1254 | 2499 | à classer | GameplayVideoSection.tsx |  | à classer |
| `public/game-assets/logo_nour.png` | 1254×1254 | 408 | à classer | — |  | non cité dans src/ : vérifier avant suppression |
| `public/game-assets/narrateur.png` | 1030×1029 | 552 | à classer | — | vieux_sage.png | non cité dans src/ : vérifier avant suppression |
| `public/game-assets/noura.png` | 159×188 | 36 | à classer | CharactersSection.tsx, gameData.ts | pixel_noura_maternal_guide.png | à classer |
| `public/game-assets/othman.png` | 138×181 | 35 | à classer | CharactersSection.tsx, HeroSection.tsx, InteractiveCombatDemo.tsx (+1) | pixel_othman_child_portrait.png | à classer |
| `public/game-assets/vieux_sage.png` | 1030×1029 | 552 | à classer | CharactersSection.tsx, gameData.ts | narrateur.png | à classer |
| `public/game-assets/waswas.png` | 107×126 | 12 | à classer | CharactersSection.tsx, HeroSection.tsx, InteractiveCombatDemo.tsx (+1) | pixel_waswas_mist_vortex.png | à classer |
| `public/game-assets/ch1_shots/s1_chambre_claire.jpg` | 768×1024 | 113 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s1_confiance.jpg` | 768×1024 | 99 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s1_eau.jpg` | 768×1024 | 118 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s1_niyyah.jpg` | 768×1024 | 101 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s1_porte_waswas.jpg` | 768×1024 | 78 | Peint (cinématique) | StoryShotOverlay.tsx |  | conforme (à garder) |
| `public/game-assets/ch1_shots/s1_sac.jpg` | 768×1024 | 127 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s1_sandales.jpg` | 768×1024 | 117 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s2_panneaux.jpg` | 768×1024 | 124 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s2_sac_pose.jpg` | 768×1024 | 123 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s2_tawakkul.jpg` | 768×1024 | 118 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s3_brume.jpg` | 768×1024 | 85 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s3_eclat.jpg` | 768×1024 | 127 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s3_pas.jpg` | 768×1024 | 125 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s3_refuge.jpg` | 768×1024 | 121 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s4_balcon.jpg` | 768×1024 | 145 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s4_vigneron.jpg` | 768×1024 | 128 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s5_dispute.jpg` | 768×1024 | 149 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s5_salam.jpg` | 768×1024 | 126 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s6_atelier.jpg` | 768×1024 | 145 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s6_hamdulillah.jpg` | 768×1024 | 132 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s6_main_tendue.jpg` | 768×1024 | 133 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s7_chute.jpg` | 768×1024 | 145 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s7_ramasse.jpg` | 768×1024 | 143 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s8_decouverte.jpg` | 768×1024 | 183 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s8_ruisseau.jpg` | 768×1024 | 156 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s9_aube.jpg` | 768×1024 | 99 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s9_doute.jpg` | 768×1024 | 103 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s9_horizon.jpg` | 768×1024 | 108 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s9_releve.jpg` | 768×1024 | 108 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/ch1_shots/s9_souvenirs.jpg` | 768×1024 | 126 | à classer | StoryShotOverlay.tsx |  | à classer |
| `public/game-assets/scene1/01_chambre_othman_fenetre.png` | 754×1014 | 1078 | à classer | SceneBackground.tsx |  | à classer |
| `public/game-assets/scene1/02_noura_entree_chambre.png` | 758×1014 | 1016 | à classer | SceneBackground.tsx |  | à classer |
| `public/game-assets/scene1/03_othman_refait_lit.png` | 756×1014 | 1007 | à classer | SceneBackground.tsx |  | à classer |
| `public/game-assets/scene1/04_choix_eau_sandales.png` | 756×1014 | 911 | à classer | SceneBackground.tsx |  | à classer |
| `public/game-assets/scene1/05_waswas_chambre.png` | 754×1018 | 741 | à classer | SceneBackground.tsx |  | à classer |
| `public/game-assets/scene1/06_main_sur_porte.png` | 758×1018 | 596 | à classer | SceneBackground.tsx |  | à classer |
| `public/game-assets/scene1/07_sortie_vers_village.png` | 756×1018 | 1155 | à classer | SceneBackground.tsx |  | à classer |
| `public/game-assets/scene1/08_chemin_vers_poteau.png` | 756×1018 | 1188 | à classer | SceneBackground.tsx |  | à classer |
