import posthog from 'posthog-js';
import { isNativeApp } from './platform';

export const posthogApiKey: string =
  import.meta.env.VITE_POSTHOG_PROJECT_TOKEN || 'phc_si9wAvbE35sJQojXKyZy4EKcSfEdYwYN4V2rJqbfr3iu';
export const posthogHost: string = import.meta.env.VITE_POSTHOG_HOST || 'https://eu.i.posthog.com';

// App native (iOS/Android) : analytics minimaux et anonymes, sans enregistrement de session,
// sans autocapture ni profil de personne (public familial, App Store Privacy).
// Web : même base, mais PostHog n'est chargé qu'après l'accord de l'utilisateur (bandeau de consentement).
export const posthogOptions = isNativeApp
  ? {
      api_host: posthogHost,
      person_profiles: 'identified_only' as const,
      capture_pageview: false,
      capture_pageleave: false,
      autocapture: false,
      disable_session_recording: true,
    }
  : {
      api_host: posthogHost,
      person_profiles: 'identified_only' as const,
      capture_pageview: true,
      capture_pageleave: true,
      autocapture: false,
      disable_session_recording: true,
    };

/** Démarre PostHog une seule fois (appelé après accord sur le web). */
export function initPostHog() {
  try {
    if (!(posthog as unknown as { __loaded?: boolean }).__loaded) {
      posthog.init(posthogApiKey, posthogOptions);
    }
  } catch {
    // l'analytics ne doit jamais bloquer le jeu
  }
}
