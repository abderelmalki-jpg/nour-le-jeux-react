import { doc, setDoc, increment, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { isBotOrCrawler } from './analytics';

const STATS_COLLECTION = 'site_stats';
const SESSION_VISIT_KEY = 'nour_stats_visit_counted';
const SESSION_GAME_KEY = 'nour_stats_game_counted';
const LOCAL_UNIQUE_KEY = 'nour_stats_unique_user_v1';

function getTodayKey(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Compteur anonyme sans cookies dans Firestore (site_stats/global + site_stats/day_YYYY-MM-DD).
 * - Filtre les bots/crawlers.
 * - Compte 1 visite par session et 1 utilisateur unique par navigateur.
 */
export async function recordSiteVisit(): Promise<void> {
  if (typeof window === 'undefined' || isBotOrCrawler()) return;

  let alreadyCountedSession = false;
  let isNewUniqueUser = false;

  try {
    alreadyCountedSession = sessionStorage.getItem(SESSION_VISIT_KEY) === '1';
    if (!alreadyCountedSession) {
      sessionStorage.setItem(SESSION_VISIT_KEY, '1');
    }
    if (!localStorage.getItem(LOCAL_UNIQUE_KEY)) {
      localStorage.setItem(LOCAL_UNIQUE_KEY, '1');
      isNewUniqueUser = true;
    }
  } catch {
    // Fallback if storage is restricted
  }

  if (alreadyCountedSession && !isNewUniqueUser) return;

  const today = getTodayKey();
  const payload: Record<string, unknown> = {
    lastVisitAt: serverTimestamp(),
  };
  if (!alreadyCountedSession) payload.totalVisits = increment(1);
  if (isNewUniqueUser) payload.uniqueUsers = increment(1);

  const dailyPayload: Record<string, unknown> = {
    date: today,
    updatedAt: serverTimestamp(),
  };
  if (!alreadyCountedSession) dailyPayload.visits = increment(1);
  if (isNewUniqueUser) dailyPayload.uniqueUsers = increment(1);

  try {
    await Promise.all([
      setDoc(doc(db, STATS_COLLECTION, 'global'), payload, { merge: true }),
      setDoc(doc(db, STATS_COLLECTION, `day_${today}`), dailyPayload, { merge: true }),
    ]);
  } catch {
    // Silent fail if offline or Firestore unavailable
  }
}

/**
 * Incrémente le compteur de lancements du jeu (1 fois par session).
 */
export async function recordGameStart(): Promise<void> {
  if (typeof window === 'undefined' || isBotOrCrawler()) return;

  try {
    if (sessionStorage.getItem(SESSION_GAME_KEY) === '1') return;
    sessionStorage.setItem(SESSION_GAME_KEY, '1');
  } catch {
    // ignore
  }

  const today = getTodayKey();
  try {
    await Promise.all([
      setDoc(
        doc(db, STATS_COLLECTION, 'global'),
        { gameStarts: increment(1), lastGameStartAt: serverTimestamp() },
        { merge: true }
      ),
      setDoc(
        doc(db, STATS_COLLECTION, `day_${today}`),
        { date: today, gameStarts: increment(1), updatedAt: serverTimestamp() },
        { merge: true }
      ),
    ]);
  } catch {
    // Silent fail if offline or Firestore unavailable
  }
}
