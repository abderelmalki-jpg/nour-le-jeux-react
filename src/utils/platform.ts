import { Capacitor } from '@capacitor/core';

/**
 * Vrai quand l'app tourne dans l'enveloppe native (iOS / Android) et non dans un navigateur.
 * Sur iOS, l'App Store impose : pas de paiement externe (Stripe) pour du contenu numérique,
 * pas de renvoi vers la page web marketing, et des analytics minimaux.
 */
export const isNativeApp: boolean =
  typeof window !== 'undefined' &&
  (Capacitor.isNativePlatform() ||
    window.location.protocol === 'capacitor:' ||
    window.location.protocol === 'ionic:');

/** Paiements externes et pages web (landing, formulaire testeurs) : web uniquement. */
export const WEB_ONLY_FEATURES_ENABLED: boolean = !isNativeApp;
