import { isNativeApp } from './platform';

// Consentement aux statistiques sur le SITE WEB uniquement.
// Dans l'app native (iOS/Android), seules des statistiques anonymes minimales sont envoyées
// (voir main.tsx et PrivacyInfo.xcprivacy), sans cookie ni profil, donc pas de bandeau.

export type ConsentState = 'granted' | 'denied' | 'unset';

export const CONSENT_STORAGE_KEY = 'nour_analytics_consent_v1';

export function getConsent(): ConsentState {
  try {
    const v = localStorage.getItem(CONSENT_STORAGE_KEY);
    return v === 'granted' || v === 'denied' ? v : 'unset';
  } catch {
    return 'unset';
  }
}

export function setConsent(value: 'granted' | 'denied') {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    // stockage indisponible : le choix vaut pour la session en cours seulement
  }
}

/** Le bandeau n'existe que sur le web. */
export const isConsentRequired: boolean = !isNativeApp;

/** Statistiques autorisées : natif (anonyme minimal) ou web avec accord explicite. */
export function analyticsAllowed(): boolean {
  return !isConsentRequired || getConsent() === 'granted';
}
