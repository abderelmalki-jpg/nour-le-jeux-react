// Rappels quotidiens locaux (notifications Capacitor) — Rétention P0-C
// Sur web : inertes (aucune notification). Sur Android (APK) : rappel quotidien
// programmé à l'heure de la dernière session du joueur.

import { Capacitor } from '@capacitor/core';
import { LocalNotifications } from '@capacitor/local-notifications';

const LAST_SESSION_HOUR_KEY = 'nour_last_session_hour';

const REMINDER_ID = 1001;

const REMINDER_TITLES = [
  'Ta quête du jour t\u2019attend 🌙',
  'Nour a besoin de toi ✨',
  'Le village t\u2019attend, Othmân 🌾'
];
const REMINDER_BODIES = [
  'Quelques minutes suffisent : une réplique, une action réelle, et ta lumière grandit.',
  'Ta série de jours est précieuse — continue l\u2019aventure aujourd\u2019hui.',
  'Une micro-action dans la vraie vie t\u2019attend. Prêt·e pour aujourd\u2019hui ?'
];

export const isNotificationsSupported = (): boolean =>
  Capacitor.isNativePlatform() && typeof LocalNotifications !== 'undefined';

/**
 * Programme (ou reprogramme) le rappel quotidien à l'heure donnée.
 * Ne fait rien sur web. Silencieux si la permission est refusée.
 */
export async function scheduleDailyReminder(hour: number): Promise<void> {
  if (!isNotificationsSupported()) return;

  try {
    let perm = (await LocalNotifications.checkPermissions()).display;
    if (perm === 'prompt') {
      perm = (await LocalNotifications.requestPermissions()).display;
    }
    if (perm !== 'granted') return;

    // Annule l'ancien rappel avant d'en programmer un nouveau
    const pending = await LocalNotifications.getPending();
    if (pending.notifications.some((n) => n.id === REMINDER_ID)) {
      await LocalNotifications.cancel({ notifications: [{ id: REMINDER_ID }] });
    }

    const idx = Math.floor(Math.random() * REMINDER_TITLES.length);
    await LocalNotifications.schedule({
      notifications: [
        {
          id: REMINDER_ID,
          title: REMINDER_TITLES[idx],
          body: REMINDER_BODIES[idx],
          schedule: {
            on: { hour: Math.min(23, Math.max(0, hour)), minute: 0 },
            repeats: true,
            allowWhileIdle: true
          }
        }
      ]
    });
  } catch (e) {
    // Les notifications ne doivent jamais bloquer le jeu
    console.warn('Local notifications unavailable:', e);
  }
}

/**
 * Mémorise l'heure de la session en cours puis (re)programme le rappel.
 * À appeler au démarrage de l'application.
 */
export async function refreshDailyReminder(): Promise<void> {
  if (!isNotificationsSupported()) return;

  const hour = new Date().getHours();
  try {
    localStorage.setItem(LAST_SESSION_HOUR_KEY, String(hour));
  } catch {
    // storage peut être indisponible (mode privé) — on continue avec l'heure courante
  }
  await scheduleDailyReminder(hour);
}
