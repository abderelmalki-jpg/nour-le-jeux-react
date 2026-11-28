import type { Language } from './translations';

// Petits libellés d'interface (écran-titre, bouton Continuer…) qui étaient codés en dur en français.
// ⚠️ La version arabe est à faire relire par un arabophone natif.
export interface UiExtras {
  play: string;
  storyMode: string;
  quizMode: string;
  continueGame: string;
  chapterSelect: string;
  newGame: string;
  about: string;
  loading: string;
  soon: string;
  voiceOn: string;
  next: string;
  levelShort: string;
  resetBadge: string;
  resetTitle: string;
  resetWarning: string;
  resetXp: string;
  resetKeep: string;
  resetConfirm: string;
  options: string;
  achievements: string;
  support: string;
  back: string;
  emptySlot: string;
  adventure: string;
  arcadeQuests: string;
  soundLabel: string;
  voiceLabel: string;
  soundEnabled: string;
  soundDisabled: string;
  voiceEnabled: string;
  voiceDisabled: string;
  selectLanguage: string;
  virtuesTitle: string;
}

export const UI_EXTRAS: Record<Language, UiExtras> = {
  fr: {
    play: 'JOUER',
    storyMode: 'Mode Histoire',
    quizMode: 'Quiz',
    continueGame: 'Continuer',
    chapterSelect: 'Sélection des Chapitres',
    newGame: 'Nouvelle Partie',
    about: 'À propos',
    loading: 'Éveil de la lumière...',
    soon: 'BIENTÔT',
    voiceOn: 'Voix Active',
    next: 'Continuer',
    levelShort: 'Niv.',
    resetBadge: '⚠️ Recommencer',
    resetTitle: 'Recommencer à zéro ?',
    resetWarning: 'Attention ! Tu vas effacer toute ton aventure et repartir du tout début.',
    resetXp: 'XP acquis',
    resetKeep: 'Garder ma partie',
    resetConfirm: 'Oui, tout recommencer',
    options: 'Options',
    achievements: 'Classements',
    support: 'Support',
    back: 'Retour',
    emptySlot: '-- VIDE --',
    adventure: 'Aventure',
    arcadeQuests: 'Quêtes & Sagesse',
    soundLabel: 'Sons & Musique',
    voiceLabel: 'Narration Vocale',
    soundEnabled: 'ACTIVÉ',
    soundDisabled: 'COUPÉ',
    voiceEnabled: 'ACTIVE',
    voiceDisabled: 'COUPÉE',
    selectLanguage: 'Langue du jeu',
    virtuesTitle: 'Vertus du Cœur'
  },
  en: {
    play: 'PLAY',
    storyMode: 'Story Mode',
    quizMode: 'Quiz',
    continueGame: 'Continue',
    chapterSelect: 'Chapter Selection',
    newGame: 'New Game',
    about: 'About',
    loading: 'Awakening the light...',
    soon: 'SOON',
    voiceOn: 'Voice On',
    next: 'Continue',
    levelShort: 'Lv.',
    resetBadge: '⚠️ Start over',
    resetTitle: 'Start from scratch?',
    resetWarning: 'Careful! You are about to erase your whole adventure and start again from the very beginning.',
    resetXp: 'XP earned',
    resetKeep: 'Keep my game',
    resetConfirm: 'Yes, start over',
    options: 'Options',
    achievements: 'Rankings',
    support: 'Support',
    back: 'Back',
    emptySlot: '-- EMPTY --',
    adventure: 'Adventure',
    arcadeQuests: 'Quests & Wisdom',
    soundLabel: 'Sound & Music',
    voiceLabel: 'Voice Narration',
    soundEnabled: 'ENABLED',
    soundDisabled: 'MUTED',
    voiceEnabled: 'ACTIVE',
    voiceDisabled: 'MUTED',
    selectLanguage: 'Game Language',
    virtuesTitle: 'Heart Virtues'
  },
  ar: {
    play: 'ابْدَأْ',
    storyMode: 'وَضْعُ الْقِصَّةِ',
    quizMode: 'الِاخْتِبَارَاتُ',
    continueGame: 'مُتَابَعَةٌ',
    chapterSelect: 'اخْتِيَارُ الْفُصُولِ',
    newGame: 'لُعْبَةٌ جَدِيدَةٌ',
    about: 'عَنِ اللُّعْبَةِ',
    loading: 'إِيقَاظُ النُّورِ...',
    soon: 'قَرِيبًا',
    voiceOn: 'الصَّوْتُ مُفَعَّلٌ',
    next: 'مُتَابَعَةٌ',
    levelShort: 'م.',
    resetBadge: '⚠️ إِعَادَةُ الْبَدْءِ',
    resetTitle: 'الْبَدْءُ مِنَ الصِّفْرِ؟',
    resetWarning: 'انْتَبِهْ! سَتَمْحُو مُغَامَرَتَكَ كُلَّهَا وَتَبْدَأُ مِنَ الْبِدَايَةِ.',
    resetXp: 'نِقَاطُ خِبْرَةٍ مُكْتَسَبَةٌ',
    resetKeep: 'الِاحْتِفَاظُ بِلُعْبَتِي',
    resetConfirm: 'نَعَمْ، أَبْدَأُ مِنْ جَدِيدٍ',
    options: 'خيارات',
    achievements: 'التصنيفات',
    support: 'الدعم',
    back: 'رجوع',
    emptySlot: '-- فارغ --',
    adventure: 'المغامرة',
    arcadeQuests: 'المهام والحكمة',
    soundLabel: 'الأصوات والموسيقى',
    voiceLabel: 'صوت الراوي',
    soundEnabled: 'مُفَعَّلٌ',
    soundDisabled: 'مَكْتُومٌ',
    voiceEnabled: 'مُفَعَّلٌ',
    voiceDisabled: 'مَكْتُومٌ',
    selectLanguage: 'لغة اللعبة',
    virtuesTitle: 'فضائل القلب'
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

// Titre de l'onglet du navigateur (le français reste celui d'index.html, pensé pour le référencement).
export const DOCUMENT_TITLES: Record<Language, string> = {
  fr: "Le jeu où votre enfant apprend l'Adab en jouant | NOUR RPG",
  en: 'The game where your child learns Adab through play | NOUR RPG',
  ar: 'لُعْبَةٌ يَتَعَلَّمُ فِيهَا طِفْلُكَ الْأَدَبَ بِالْمَرَحِ | نُور'
};

// Vignettes d'action (victoire du chapitre 1), clés = titre français.
export const VIGNETTE_TRANSLATIONS: Record<string, Partial<Record<Language, { badge: string; title: string; description: string }>>> = {
  "La Proclamation de Foi & d'Action": {
    en: { badge: 'Victorious Virtue', title: 'The Proclamation of Faith & Action', description: 'Concrete, sincere deeds done in real life defeat the illusions of doubt.' },
    ar: { badge: 'فَضِيلَةٌ مُنْتَصِرَةٌ', title: 'إِعْلَانُ الْإِيمَانِ وَالْعَمَلِ', description: 'الْأَعْمَالُ الصَّادِقَةُ الْمُحَقَّقَةُ فِي الْوَاقِعِ تَهْزِمُ أَوْهَامَ الشَّكِّ.' }
  },
  "Patience & Persévérance Inébranlables": {
    en: { badge: 'Shield of Sabr', title: 'Unshakeable Patience & Perseverance', description: 'Faith and steadiness in effort reduce the whispers of doubt to nothing.' },
    ar: { badge: 'دِرْعُ الصَّبْرِ', title: 'صَبْرٌ وَمُثَابَرَةٌ لَا تَلِينَانِ', description: 'الْإِيمَانُ وَالثَّبَاتُ فِي الْجُهْدِ يُبْطِلَانِ وَسَاوِسَ الشَّكِّ.' }
  },
  "Ancrage dans les Actes Réels": {
    en: { badge: 'Armor of Discipline', title: 'Anchored in Real Actions', description: 'Every daily gesture done in real life destroys the deceptive illusions of the Shadow.' },
    ar: { badge: 'دِرْعُ الِانْضِبَاطِ', title: 'الرُّسُوخُ فِي الْأَعْمَالِ الْحَقِيقِيَّةِ', description: 'كُلُّ فِعْلٍ يَوْمِيٍّ فِي الْوَاقِعِ يَهْدِمُ أَوْهَامَ الظِّلِّ الْمُضَلِّلَةَ.' }
  },
  "Pureté de l'Intention": {
    en: { badge: 'Light of Adab & Hilm', title: 'Purity of Intention', description: 'Sincerely seeking Allah’s pleasure scatters the darkness of the heart.' },
    ar: { badge: 'نُورُ الْأَدَبِ وَالْحِلْمِ', title: 'نَقَاءُ النِّيَّةِ', description: 'طَلَبُ رِضَا اللَّهِ بِصِدْقٍ يُبَدِّدُ ظُلُمَاتِ الْقَلْبِ.' }
  },
  "Le Courage en Mouvement": {
    en: { badge: 'Surge of Vitality', title: 'Courage in Motion', description: 'Resolute action and a step forward overcome paralysis and fear.' },
    ar: { badge: 'دَفْعَةُ الْحَيَوِيَّةِ', title: 'الشَّجَاعَةُ فِي الْحَرَكَةِ', description: 'الْفِعْلُ الْحَازِمُ وَالْخُطْوَةُ إِلَى الْأَمَامِ يَقْهَرَانِ الشَّلَلَ وَالْخَوْفَ.' }
  }
};
