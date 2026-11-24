// Mélange reproductible des réponses d'un quiz : l'ordre change à chaque partie, mais reste stable
// pendant l'affichage d'une même question (pas de saut lors d'un nouveau rendu).
// Corrige un défaut de contenu : la bonne réponse n'était jamais en 3ᵉ/4ᵉ position.

function hashString(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Mélange de Fisher-Yates avec une graine texte. Ne modifie pas le tableau d'origine. */
export function shuffleSeeded<T>(items: readonly T[], seed: string): T[] {
  const result = [...items];
  const rand = mulberry32(hashString(seed));
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/** Graine unique pour une session de jeu (change à chaque rechargement). */
export const SESSION_SHUFFLE_SEED: string = Math.random().toString(36).slice(2);
