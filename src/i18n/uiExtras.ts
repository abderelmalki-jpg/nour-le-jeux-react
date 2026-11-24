import type { Language } from './translations';

// Petits libellés d'interface (écran-titre, bouton Continuer…) qui étaient codés en dur en français.
// ⚠️ La version arabe est à faire relire par un arabophone natif.
export interface UiExtras {
  play: string;
  continueGame: string;
  chapterSelect: string;
  newGame: string;
  about: string;
  loading: string;
  soon: string;
  voiceOn: string;
  next: string;
  levelShort: string;
}

export const UI_EXTRAS: Record<Language, UiExtras> = {
  fr: {
    play: 'JOUER',
    continueGame: 'CONTINUER',
    chapterSelect: 'Sélection des Chapitres',
    newGame: 'Nouvelle partie',
    about: 'À propos du jeu',
    loading: 'Éveil de la lumière...',
    soon: 'BIENTÔT',
    voiceOn: 'Voix Active',
    next: 'Continuer',
    levelShort: 'Niv.'
  },
  en: {
    play: 'PLAY',
    continueGame: 'CONTINUE',
    chapterSelect: 'Chapter Selection',
    newGame: 'New Game',
    about: 'About the Game',
    loading: 'Awakening the light...',
    soon: 'SOON',
    voiceOn: 'Voice On',
    next: 'Continue',
    levelShort: 'Lv.'
  },
  ar: {
    play: 'ابْدَأْ',
    continueGame: 'مُتَابَعَةٌ',
    chapterSelect: 'اخْتِيَارُ الْفُصُولِ',
    newGame: 'لُعْبَةٌ جَدِيدَةٌ',
    about: 'عَنِ اللُّعْبَةِ',
    loading: 'إِيقَاظُ النُّورِ...',
    soon: 'قَرِيبًا',
    voiceOn: 'الصَّوْتُ مُفَعَّلٌ',
    next: 'مُتَابَعَةٌ',
    levelShort: 'م.'
  }
};

// Titres des chapitres (écran de sélection). ⚠️ Arabe à faire relire.
export const CHAPTER_LABELS: Record<Language, { chapter: string; items: Record<number, { title: string; subtitle: string }> }> = {
  fr: {
    chapter: 'Chapitre',
    items: {
      1: { title: 'Vaincre la Solitude', subtitle: 'Le premier pas' },
      2: { title: 'Le chemin du Hilm', subtitle: 'La maîtrise de la colère' },
      3: { title: 'Le chemin du Tawakkul', subtitle: "La confiance face à l'épreuve" },
      4: { title: 'Ce que tu as encore', subtitle: 'La bonté envers les parents' },
      5: { title: 'Le Sommet de la Persévérance', subtitle: 'La persévérance (Sabr)' }
    }
  },
  en: {
    chapter: 'Chapter',
    items: {
      1: { title: 'Overcoming Loneliness', subtitle: 'The first step' },
      2: { title: 'The Path of Hilm', subtitle: 'Mastering anger' },
      3: { title: 'The Path of Tawakkul', subtitle: 'Trust in the face of hardship' },
      4: { title: 'What You Still Have', subtitle: 'Kindness toward parents' },
      5: { title: 'The Summit of Perseverance', subtitle: 'Perseverance (Sabr)' }
    }
  },
  ar: {
    chapter: 'الْفَصْلُ',
    items: {
      1: { title: 'التَّغَلُّبُ عَلَى الْوَحْدَةِ', subtitle: 'الْخُطْوَةُ الْأُولَى' },
      2: { title: 'طَرِيقُ الْحِلْمِ', subtitle: 'كَظْمُ الْغَيْظِ' },
      3: { title: 'طَرِيقُ التَّوَكُّلِ', subtitle: 'الثِّقَةُ فِي مُوَاجَهَةِ الِابْتِلَاءِ' },
      4: { title: 'مَا زَالَ بَيْنَ يَدَيْكَ', subtitle: 'الْإِحْسَانُ إِلَى الْوَالِدَيْنِ' },
      5: { title: 'قِمَّةُ الْمُثَابَرَةِ', subtitle: 'الصَّبْرُ' }
    }
  }
};
