import { collection, getDocs, addDoc, query, orderBy, limit, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

export interface LeaderboardEntry {
  id: string;
  pseudo: string;
  score: number;
  correct: number;
  total: number;
  lang?: string;
  isCurrentUser?: boolean;
}

export interface PlayerQuizStats {
  pseudo: string;
  bestScore: number;
  bestCorrect: number;
  bestTotal: number;
  gamesPlayed: number;
}

const PSEUDO_KEY = 'nour_quiz_pseudo_v1';
const STATS_KEY = 'nour_quiz_stats_v1';
const LOCAL_BOARD_KEY = 'nour_quiz_local_board_v1';
const COLLECTION_NAME = 'quiz_leaderboard';
const FEEDBACK_COLLECTION = 'quiz_feedback';

// Quelques scores repères initiaux pour stimuler le joueur même hors-ligne dès le premier jour
const SEED_ENTRIES: LeaderboardEntry[] = [
  { id: 'seed_1', pseudo: 'Bilal', score: 9420, correct: 14, total: 15 },
  { id: 'seed_2', pseudo: 'Maryam', score: 8350, correct: 13, total: 15 },
  { id: 'seed_3', pseudo: 'Youssef', score: 7180, correct: 11, total: 13 },
  { id: 'seed_4', pseudo: 'Amina', score: 6240, correct: 10, total: 12 },
  { id: 'seed_5', pseudo: 'Hamza', score: 5120, correct: 9, total: 11 },
  { id: 'seed_6', pseudo: 'Inès', score: 4290, correct: 8, total: 10 },
  { id: 'seed_7', pseudo: 'Adam', score: 3150, correct: 6, total: 8 },
  { id: 'seed_8', pseudo: 'Safa', score: 2200, correct: 5, total: 7 },
];

export function loadSavedPseudo(): string {
  try {
    return localStorage.getItem(PSEUDO_KEY) || '';
  } catch {
    return '';
  }
}

export function savePseudo(pseudo: string): void {
  try {
    localStorage.setItem(PSEUDO_KEY, pseudo.trim().slice(0, 20));
  } catch {
    // ignore storage errors
  }
}

export function loadPlayerStats(): PlayerQuizStats {
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        pseudo: loadSavedPseudo() || parsed.pseudo || '',
        bestScore: Number(parsed.bestScore) || 0,
        bestCorrect: Number(parsed.bestCorrect) || 0,
        bestTotal: Number(parsed.bestTotal) || 0,
        gamesPlayed: Number(parsed.gamesPlayed) || 0,
      };
    }
  } catch {
    // ignore
  }
  return {
    pseudo: loadSavedPseudo(),
    bestScore: 0,
    bestCorrect: 0,
    bestTotal: 0,
    gamesPlayed: 0,
  };
}

export function recordPlayerGame(pseudo: string, score: number, correct: number, total: number): { stats: PlayerQuizStats; isNewRecord: boolean } {
  const prev = loadPlayerStats();
  const isNewRecord = score > prev.bestScore;
  const next: PlayerQuizStats = {
    pseudo: pseudo.trim().slice(0, 20),
    bestScore: isNewRecord ? score : prev.bestScore,
    bestCorrect: isNewRecord ? correct : prev.bestCorrect,
    bestTotal: isNewRecord ? total : prev.bestTotal,
    gamesPlayed: prev.gamesPlayed + 1,
  };
  savePseudo(next.pseudo);
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return { stats: next, isNewRecord };
}

function loadLocalEntries(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(LOCAL_BOARD_KEY);
    if (raw) {
      const arr = JSON.parse(raw);
      if (Array.isArray(arr)) return arr;
    }
  } catch {
    // ignore
  }
  return [];
}

function saveLocalEntry(entry: LeaderboardEntry): void {
  try {
    const existing = loadLocalEntries();
    const updated = [...existing, entry]
      .sort((a, b) => b.score - a.score)
      .slice(0, 50);
    localStorage.setItem(LOCAL_BOARD_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
}

function mergeAndRank(remote: LeaderboardEntry[], local: LeaderboardEntry[], currentPseudo: string): LeaderboardEntry[] {
  const combined = [...remote, ...local];
  const source = combined.length >= 5 ? combined : [...combined, ...SEED_ENTRIES];
  const byPseudo = new Map<string, LeaderboardEntry>();

  for (const item of source) {
    const key = item.pseudo.trim().toLowerCase();
    if (!key) continue;
    const prev = byPseudo.get(key);
    if (!prev || item.score > prev.score) {
      byPseudo.set(key, {
        ...item,
        isCurrentUser: Boolean(currentPseudo) && key === currentPseudo.trim().toLowerCase(),
      });
    }
  }

  return Array.from(byPseudo.values())
    .sort((a, b) => b.score - a.score)
    .slice(0, 500);
}

export async function fetchLeaderboard(currentPseudo = ''): Promise<{ entries: LeaderboardEntry[]; isOnline: boolean }> {
  const local = loadLocalEntries();
  try {
    const q = query(collection(db, COLLECTION_NAME), orderBy('score', 'desc'), limit(500));
    const snap = await getDocs(q);
    const remote: LeaderboardEntry[] = [];
    snap.forEach((doc) => {
      const d = doc.data();
      if (typeof d.pseudo === 'string' && typeof d.score === 'number') {
        remote.push({
          id: doc.id,
          pseudo: d.pseudo,
          score: d.score,
          correct: Number(d.correct) || 0,
          total: Number(d.total) || 0,
          lang: typeof d.lang === 'string' ? d.lang : undefined,
        });
      }
    });
    return { entries: mergeAndRank(remote, local, currentPseudo), isOnline: true };
  } catch {
    return { entries: mergeAndRank([], local, currentPseudo), isOnline: false };
  }
}

export async function submitLeaderboardScore(params: {
  pseudo: string;
  score: number;
  correct: number;
  total: number;
  lang: string;
}): Promise<void> {
  const cleanPseudo = params.pseudo.trim().slice(0, 20);
  if (!cleanPseudo || params.score <= 0) return;

  const entry: LeaderboardEntry = {
    id: `local_${Date.now()}`,
    pseudo: cleanPseudo,
    score: Math.round(params.score),
    correct: params.correct,
    total: params.total,
    lang: params.lang,
  };
  saveLocalEntry(entry);

  try {
    await addDoc(collection(db, COLLECTION_NAME), {
      pseudo: entry.pseudo,
      score: entry.score,
      correct: entry.correct,
      total: entry.total,
      lang: entry.lang,
      createdAt: serverTimestamp(),
    });
  } catch {
    // Fallback local déjà sauvegardé
  }
}

export async function submitQuizFeedback(params: {
  type: 'suggestion' | 'error';
  message: string;
  pseudo?: string;
  lang: string;
}): Promise<boolean> {
  const cleanMsg = params.message.trim();
  if (!cleanMsg) return false;
  try {
    await addDoc(collection(db, FEEDBACK_COLLECTION), {
      type: params.type,
      message: cleanMsg.slice(0, 600),
      pseudo: (params.pseudo || '').trim().slice(0, 20),
      lang: params.lang,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch {
    return false;
  }
}
