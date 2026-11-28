import { Language } from './translations';
import { QuestItem, BadgeItem, EquipmentItem, PlayerRank, CharacterTraits } from '../types';
import { PersonalitySummary } from '../utils/characterTraits';

export interface ScreensTranslations {
  home: {
    subtitle: string;
    title: string;
    mapBtn: string;
    roomAlt: string;
    travelerAlt: string;
    quote: string;
    dailyQuestsTitle: string;
    doneCount: (done: number, total: number) => string;
    continueJourney: string;
  };
  inventory: {
    subtitle: string;
    title: string;
    tabEquipment: string;
    tabObjects: string;
    tabResources: string;
    tabDecoration: string;
    slotOutfit: string;
    slotBag: string;
    slotCape: string;
    slotLantern: string;
    levelShort: string;
    ownedEquipment: string;
    statsTitle: string;
    statDiscipline: string;
    statSavoir: string;
    statPatience: string;
    statBonte: string;
    statConstance: string;
  };
  quests: {
    headerSubtitle: string;
    headerTitle: string;
    headerQuote: string;
    tabMyPath: string;
    tabStory: string;
    pledgedSectionTitle: string;
    pendingCount: (count: number) => string;
    pledgedDoneBtn: (xp: number) => string;
    pledgedEmptyHint: string;
    dailyHabitsTitle: string;
    dailyHabitsDoneCount: (done: number, total: number) => string;
    questAccomplished: (xp: number) => string;
    questXpBtn: (xp: number) => string;
    chroniclesTitle: string;
    chapterNumber: (num: number) => string;
    startChapter: string;
    replayChapter: string;
    chapterDone: string;
    availableSoon: string;
    founderAccess: string;
  };
  profile: {
    tabProgression: string;
    tabBadges: string;
    tabRanks: string;
    progressionSubtitle: string;
    progressionTitle: string;
    levelLabel: string;
    nextRankAt: (xp: number) => string;
    lightLabel: string;
    currentRankBadge: (lvl: number) => string;
    viewTree: string;
    waswasPressureTitle: string;
    waswasSubtitle: string;
    currentStreakTitle: string;
    bestStreakTitle: string;
    daysCount: (days: number) => string;
    soulMirrorTitle: string;
    currentTemperament: string;
    radiantStrengths: string;
    toDeploy: string;
    sixVirtuesTitle: string;
    traitVeryAsserted: string;
    traitInJourney: string;
    recentHabitsTitle: string;
    supportTitle: string;
    supportDesc: string;
    supportBtn: string;
    nextRankGoalTitle: string;
    nextRankGoalDesc: (title: string, minXp: number, diff: number) => string;
    optionsTitle: string;
    soundEffects: string;
    soundMuted: string;
    visualAssets: string;
    openBtn: string;
    autoSaveActive: string;
    realTimeBadge: string;
    restartGameBtn: string;
    privacyPolicy: string;
    badgesSubtitle: string;
    badgesTitle: string;
    filterAll: string;
    filterProgression: string;
    filterHabits: string;
    filterStory: string;
    ranksSubtitle: string;
    ranksTitle: string;
    currentLevelOfMax: (lvl: number, max: number) => string;
    xpAcquired: (xp: number) => string;
    targetXp: (xp: number) => string;
    maxRankReached: string;
    ranksLadderTitle: string;
    acquiredBadge: string;
  };
  travelMap: {
    pathTitle: string;
    chapterLabel: string;
    chShort: string;
    stepsCount: (count: number) => string;
    youAreHere: string;
    summit: string;
    stepOf: (n: number, total: number) => string;
    validated: string;
    toCross: string;
    replayStep: string;
    continueJourney: string;
    lockedDoorTitle: string;
    founderRequiredTitle: string;
    lockedReason: (xp: number) => string;
    founderGuarantee: string;
    founderAccessPrice: string;
    unlockFounderBtn: string;
    closeBtn: string;
    yourXp: (playerXp: number, reqXp: number) => string;
    quizXpBtn: string;
    understoodBtn: string;
  };
  historyModal: {
    subtitle: string;
    title: string;
    filterAll: string;
    emptyText: string;
    closeBtn: string;
  };
  knowledgeModal: {
    title: string;
    subtitle: string;
    levelShort: string;
    filterAll: string;
    searchPlaceholder: string;
    closeBtn: string;
    termTitle: string;
    definitionLabel: string;
    referenceLabel: string;
    emptySearchResults: string;
  };
  guideModal: {
    subtitle: string;
    defaultTitle: string;
    defaultMessage: string;
    questsTipTitle: string;
    questsTipDesc: string;
    bookTipTitle: string;
    bookTipDesc: string;
    profileTipTitle: string;
    profileTipDesc: string;
    continueBtn: string;
  };
}

export const SCREENS_TRANSLATIONS: Record<Language, ScreensTranslations> = {
  fr: {
    home: {
      subtitle: 'Point de départ & quêtes du jour',
      title: "ÉCRAN D'ACCUEIL — TA CHAMBRE",
      mapBtn: 'Carte',
      roomAlt: 'Chambre du Voyageur',
      travelerAlt: 'Voyageur',
      quote: '« Chaque petit pas rallume la lumière intérieure. »',
      dailyQuestsTitle: 'QUÊTES DU JOUR',
      doneCount: (done, total) => `${done}/${total} FAITES`,
      continueJourney: 'CONTINUER LE VOYAGE'
    },
    inventory: {
      subtitle: 'Objets, équipements, ressources',
      title: 'SAC – INVENTAIRE',
      tabEquipment: 'Équipement',
      tabObjects: 'Objets',
      tabResources: 'Ressources',
      tabDecoration: 'Décoration',
      slotOutfit: 'Tenue',
      slotBag: 'Sac',
      slotCape: 'Cape',
      slotLantern: 'Lanterne',
      levelShort: 'NIV.',
      ownedEquipment: 'ÉQUIPEMENTS POSSÉDÉS',
      statsTitle: 'STATS',
      statDiscipline: 'Discipline',
      statSavoir: 'Savoir',
      statPatience: 'Patience',
      statBonte: 'Bonté',
      statConstance: 'Constance'
    },
    quests: {
      headerSubtitle: 'QUÊTES & ACCOMPLISSEMENT',
      headerTitle: "L'Élévation par les Actes",
      headerQuote: '« Chaque petite action dans le réel fait grandir ton personnage. »',
      tabMyPath: 'MON CHEMIN & ADAB',
      tabStory: 'HISTOIRE',
      pledgedSectionTitle: "Mes Engagements d'Adab du Jour :",
      pendingCount: (count) => `${count} en attente`,
      pledgedDoneBtn: (xp) => `C'est fait ! (+${xp} XP)`,
      pledgedEmptyHint: "🌿 Lorsque tu prends un engagement dans l'histoire, il s'inscrit ici pour que tu puisses l'accomplir et le valider dans ta journée.",
      dailyHabitsTitle: '🌙 Habitudes Quotidiennes :',
      dailyHabitsDoneCount: (done, total) => `${done}/${total} accomplies`,
      questAccomplished: (xp) => `✓ Accomplie (+${xp} XP)`,
      questXpBtn: (xp) => `+${xp} XP`,
      chroniclesTitle: "Chroniques de l'Aventure :",
      chapterNumber: (num) => `Chapitre ${num}`,
      startChapter: 'COMMENCER LE CHAPITRE',
      replayChapter: 'REJOUER CE CHAPITRE',
      chapterDone: 'CHAPITRE VALIDÉ',
      availableSoon: 'Bientôt disponible',
      founderAccess: 'Accès Fondateur'
    },
    profile: {
      tabProgression: 'Parcours',
      tabBadges: 'Badges',
      tabRanks: 'Rangs & Titres',
      progressionSubtitle: 'XP, Lumière, série, statistiques',
      progressionTitle: 'PROGRESSION – TON PARCOURS',
      levelLabel: 'NIVEAU',
      nextRankAt: (xp) => `Prochain rang à ${xp} XP`,
      lightLabel: 'LUMIÈRE',
      currentRankBadge: (lvl) => `Rang Actuel (Niv. ${lvl})`,
      viewTree: "Voir l'arbre ➔",
      waswasPressureTitle: 'EMPRISE DU WASWÂS',
      waswasSubtitle: 'Augmente lors des erreurs aux quiz, diminue avec les bonnes actions.',
      currentStreakTitle: 'SÉRIE ACTUELLE',
      bestStreakTitle: 'MEILLEURE SÉRIE',
      daysCount: (days) => `${days} ${days > 1 ? 'jours' : 'jour'}`,
      soulMirrorTitle: "L'Âme d'Othmân • Le Miroir de tes Choix",
      currentTemperament: 'Tempérament Actuel',
      radiantStrengths: 'Forces Rayonnantes',
      toDeploy: 'À continuer de déployer',
      sixVirtuesTitle: "LES 6 VERTUS CARDINALES D'OTHMÂN",
      traitVeryAsserted: 'Très affirmé',
      traitInJourney: 'En cheminement',
      recentHabitsTitle: 'DERNIÈRES HABITUDES ANCRÉES',
      supportTitle: 'Soutenir le Projet Nour',
      supportDesc: 'Finance les voix studio & débloque les chapitres.',
      supportBtn: 'Soutenir ➔',
      nextRankGoalTitle: 'PROCHAIN RANG DE SCIENCE',
      nextRankGoalDesc: (title, minXp, diff) => `${title} (${minXp} XP requis • encore ${diff} XP)`,
      optionsTitle: 'Options & Paramètres',
      soundEffects: 'Effets sonores',
      soundMuted: 'Son coupé',
      visualAssets: 'Assets Visuels',
      openBtn: 'Ouvrir ➔',
      autoSaveActive: 'Sauvegarde automatique active',
      realTimeBadge: 'Temps réel ✓',
      restartGameBtn: 'Recommencer la partie à zéro',
      privacyPolicy: 'Politique de Confidentialité ↗',
      badgesSubtitle: 'Tes accomplissements',
      badgesTitle: 'SUCCÈS – BADGES',
      filterAll: 'Tous',
      filterProgression: 'Progression',
      filterHabits: 'Habitudes',
      filterStory: 'Histoire',
      ranksSubtitle: "Élévation de l'Âme & Connaissance",
      ranksTitle: 'RANGS & TITRES DE SCIENCE',
      currentLevelOfMax: (lvl, max) => `Niveau ${lvl} / ${max}`,
      xpAcquired: (xp) => `XP ACQUIS : ${xp} XP`,
      targetXp: (xp) => `Objectif : ${xp} XP`,
      maxRankReached: 'Rang Maximal Atteint !',
      ranksLadderTitle: "L'Arbre des 5 Niveaux de Science",
      acquiredBadge: 'Acquis'
    },
    travelMap: {
      pathTitle: 'LE CHEMIN',
      chapterLabel: 'CHAPITRE',
      chShort: 'Ch.',
      stepsCount: (count) => `${count} étapes`,
      youAreHere: 'TU ES ICI',
      summit: 'SOMMET',
      stepOf: (n, total) => `Étape ${n} sur ${total}`,
      validated: '✓ Validée (+XP acquis)',
      toCross: 'À franchir',
      replayStep: 'REJOUER CETTE ÉTAPE',
      continueJourney: 'POURSUIVRE LE VOYAGE →',
      lockedDoorTitle: 'Porte Verrouillée',
      founderRequiredTitle: 'Accès Pack Fondateur',
      lockedReason: (xp) => `Cette étape demande ${xp} XP pour être franchie. Continue ton apprentissage pour la débloquer !`,
      founderGuarantee: '🛡️ 100% Sérénité : Satisfait ou Remboursé 7j',
      founderAccessPrice: '4,99 € (Offre Spéciale)',
      unlockFounderBtn: 'Débloquer (Paiement ou Code Promo)',
      closeBtn: 'Fermer',
      yourXp: (playerXp, reqXp) => `Ton XP : ${playerXp} / ${reqXp} XP`,
      quizXpBtn: 'Répondre à des Quiz (+XP)',
      understoodBtn: 'Compris'
    },
    historyModal: {
      subtitle: 'Journal du récit',
      title: 'Historique des Dialogues',
      filterAll: 'Tous',
      emptyText: 'Aucun dialogue enregistré pour le moment.',
      closeBtn: 'Fermer'
    },
    knowledgeModal: {
      title: 'Livre du Savoir',
      subtitle: 'Notions de Sagesse (ʿIlm)',
      levelShort: 'Niv.',
      filterAll: 'Tous',
      searchPlaceholder: 'Rechercher une notion...',
      closeBtn: 'Fermer',
      termTitle: 'Notion',
      definitionLabel: 'Définition & Contexte',
      referenceLabel: 'Référence',
      emptySearchResults: 'Aucune notion trouvée pour cette recherche.'
    },
    guideModal: {
      subtitle: 'Guide du Voyageur',
      defaultTitle: 'Conseils de Noura',
      defaultMessage: 'Rappelle-toi : chaque petit effort accompli avec sincérité fait grandir ta lumière intérieure !',
      questsTipTitle: 'Quêtes (en bas) :',
      questsTipDesc: 'pour rejouer les scènes et faire tes défis du jour.',
      bookTipTitle: 'Livre (en haut) :',
      bookTipDesc: 'pour consulter tes acquis et sagesses.',
      profileTipTitle: 'Profil :',
      profileTipDesc: "pour observer l'évolution de ton personnage !",
      continueBtn: 'Continuer'
    }
  },
  en: {
    home: {
      subtitle: 'Starting point & daily quests',
      title: 'HOME SCREEN — YOUR ROOM',
      mapBtn: 'Map',
      roomAlt: "Traveler's Room",
      travelerAlt: 'Traveler',
      quote: '“Every small step rekindles the inner light.”',
      dailyQuestsTitle: 'DAILY QUESTS',
      doneCount: (done, total) => `${done}/${total} DONE`,
      continueJourney: 'CONTINUE JOURNEY'
    },
    inventory: {
      subtitle: 'Items, equipment, resources',
      title: 'BAG – INVENTORY',
      tabEquipment: 'Equipment',
      tabObjects: 'Items',
      tabResources: 'Resources',
      tabDecoration: 'Decoration',
      slotOutfit: 'Outfit',
      slotBag: 'Bag',
      slotCape: 'Cloak',
      slotLantern: 'Lantern',
      levelShort: 'LVL.',
      ownedEquipment: 'OWNED EQUIPMENT',
      statsTitle: 'STATS',
      statDiscipline: 'Discipline',
      statSavoir: 'Knowledge',
      statPatience: 'Patience',
      statBonte: 'Kindness',
      statConstance: 'Steadfastness'
    },
    quests: {
      headerSubtitle: 'QUESTS & ACHIEVEMENT',
      headerTitle: 'Elevation Through Actions',
      headerQuote: '“Every small action in real life helps your soul grow.”',
      tabMyPath: 'MY PATH & ADAB',
      tabStory: 'STORY',
      pledgedSectionTitle: 'My Daily Adab Commitments:',
      pendingCount: (count) => `${count} pending`,
      pledgedDoneBtn: (xp) => `Done! (+${xp} XP)`,
      pledgedEmptyHint: '🌿 When you make a commitment in the story, it appears here so you can fulfill it in your daily life.',
      dailyHabitsTitle: '🌙 Daily Habits:',
      dailyHabitsDoneCount: (done, total) => `${done}/${total} completed`,
      questAccomplished: (xp) => `✓ Completed (+${xp} XP)`,
      questXpBtn: (xp) => `+${xp} XP`,
      chroniclesTitle: 'Adventure Chronicles:',
      chapterNumber: (num) => `Chapter ${num}`,
      startChapter: 'START CHAPTER',
      replayChapter: 'REPLAY CHAPTER',
      chapterDone: 'CHAPTER COMPLETED',
      availableSoon: 'Coming Soon',
      founderAccess: 'Founder Access'
    },
    profile: {
      tabProgression: 'Journey',
      tabBadges: 'Badges',
      tabRanks: 'Ranks & Titles',
      progressionSubtitle: 'XP, Light, streak, statistics',
      progressionTitle: 'PROGRESSION – YOUR JOURNEY',
      levelLabel: 'LEVEL',
      nextRankAt: (xp) => `Next rank at ${xp} XP`,
      lightLabel: 'LIGHT',
      currentRankBadge: (lvl) => `Current Rank (Lv. ${lvl})`,
      viewTree: 'View tree ➔',
      waswasPressureTitle: 'SHADOW INFLUENCE',
      waswasSubtitle: 'Increases with quiz mistakes, decreases with good deeds.',
      currentStreakTitle: 'CURRENT STREAK',
      bestStreakTitle: 'BEST STREAK',
      daysCount: (days) => `${days} ${days > 1 ? 'days' : 'day'}`,
      soulMirrorTitle: "Othman's Soul • Mirror of Your Choices",
      currentTemperament: 'Current Temperament',
      radiantStrengths: 'Radiant Strengths',
      toDeploy: 'To Continue Developing',
      sixVirtuesTitle: "OTHMAN'S 6 CARDINAL VIRTUES",
      traitVeryAsserted: 'Very strong',
      traitInJourney: 'In progress',
      recentHabitsTitle: 'RECENT ANCHORED HABITS',
      supportTitle: 'Support the Nour Project',
      supportDesc: 'Funds studio voices & unlocks future chapters.',
      supportBtn: 'Support ➔',
      nextRankGoalTitle: 'NEXT KNOWLEDGE RANK',
      nextRankGoalDesc: (title, minXp, diff) => `${title} (${minXp} XP required • ${diff} XP left)`,
      optionsTitle: 'Options & Settings',
      soundEffects: 'Sound effects',
      soundMuted: 'Sound muted',
      visualAssets: 'Visual Assets',
      openBtn: 'Open ➔',
      autoSaveActive: 'Autosave active',
      realTimeBadge: 'Real time ✓',
      restartGameBtn: 'Restart game from scratch',
      privacyPolicy: 'Privacy Policy ↗',
      badgesSubtitle: 'Your achievements',
      badgesTitle: 'ACHIEVEMENTS – BADGES',
      filterAll: 'All',
      filterProgression: 'Progress',
      filterHabits: 'Habits',
      filterStory: 'Story',
      ranksSubtitle: 'Elevation of Soul & Knowledge',
      ranksTitle: 'RANKS & TITLES OF KNOWLEDGE',
      currentLevelOfMax: (lvl, max) => `Level ${lvl} / ${max}`,
      xpAcquired: (xp) => `XP EARNED: ${xp} XP`,
      targetXp: (xp) => `Goal: ${xp} XP`,
      maxRankReached: 'Maximum Rank Achieved!',
      ranksLadderTitle: 'The Tree of 5 Knowledge Levels',
      acquiredBadge: 'Earned'
    },
    travelMap: {
      pathTitle: 'THE PATH',
      chapterLabel: 'CHAPTER',
      chShort: 'Ch.',
      stepsCount: (count) => `${count} steps`,
      youAreHere: 'YOU ARE HERE',
      summit: 'SUMMIT',
      stepOf: (n, total) => `Step ${n} of ${total}`,
      validated: '✓ Completed (+XP)',
      toCross: 'Next step',
      replayStep: 'REPLAY THIS STEP',
      continueJourney: 'CONTINUE JOURNEY →',
      lockedDoorTitle: 'Locked Gate',
      founderRequiredTitle: 'Founder Pack Access',
      lockedReason: (xp) => `This step requires ${xp} XP to cross. Keep learning to unlock it!`,
      founderGuarantee: '🛡️ 100% Peace of mind: 7-day money-back guarantee',
      founderAccessPrice: '€4.99 (Special Offer)',
      unlockFounderBtn: 'Unlock (Payment or Promo Code)',
      closeBtn: 'Close',
      yourXp: (playerXp, reqXp) => `Your XP: ${playerXp} / ${reqXp} XP`,
      quizXpBtn: 'Take Knowledge Quizzes (+XP)',
      understoodBtn: 'Understood'
    },
    historyModal: {
      subtitle: 'Story Journal',
      title: 'Dialogue History',
      filterAll: 'All',
      emptyText: 'No dialogues recorded yet.',
      closeBtn: 'Close'
    },
    knowledgeModal: {
      title: 'Book of Knowledge',
      subtitle: 'Notions of Wisdom (ʿIlm)',
      levelShort: 'Lv.',
      filterAll: 'All',
      searchPlaceholder: 'Search a concept...',
      closeBtn: 'Close',
      termTitle: 'Concept',
      definitionLabel: 'Definition & Context',
      referenceLabel: 'Reference',
      emptySearchResults: 'No concepts found for this search.'
    },
    guideModal: {
      subtitle: "Traveler's Guide",
      defaultTitle: "Noura's Advice",
      defaultMessage: 'Remember: every small effort made with sincerity grows your inner light!',
      questsTipTitle: 'Quests (bottom):',
      questsTipDesc: 'to replay scenes and accomplish daily challenges.',
      bookTipTitle: 'Book (top):',
      bookTipDesc: 'to review your acquired wisdom and knowledge.',
      profileTipTitle: 'Profile:',
      profileTipDesc: "to watch your character's spiritual growth!",
      continueBtn: 'Continue'
    }
  },
  ar: {
    home: {
      subtitle: 'نُقْطَةُ الِانْطِلَاقِ وَمَهَمَّاتُ الْيَوْمِ',
      title: 'الشَّاشَةُ الرَّئِيسِيَّةُ — غُرْفَتُكَ',
      mapBtn: 'الْخَرِيطَةُ',
      roomAlt: 'غُرْفَةُ الْمُسَافِرِ',
      travelerAlt: 'الْمُسَافِرُ',
      quote: '« كُلُّ خُطْوَةٍ صَغِيرَةٍ تُعِيدُ إِشْعَالَ النُّورِ فِي الْقَلْبِ. »',
      dailyQuestsTitle: 'مَهَمَّاتُ الْيَوْمِ',
      doneCount: (done, total) => `${done}/${total} مُنْجَزَة`,
      continueJourney: 'مُتَابَعَةُ الرِّحْلَةِ'
    },
    inventory: {
      subtitle: 'أَدَوَاتٌ، عَتَادٌ، مَوَارِدُ',
      title: 'الْحَقِيبَةُ – الْعَتَادُ',
      tabEquipment: 'الْعَتَادُ',
      tabObjects: 'الْأَدَوَاتُ',
      tabResources: 'الْمَوَارِدُ',
      tabDecoration: 'التَّزْيِينُ',
      slotOutfit: 'الرِّدَاءُ',
      slotBag: 'الْحَقِيبَةُ',
      slotCape: 'الْعَبَاءَةُ',
      slotLantern: 'الْفَانُوسُ',
      levelShort: 'م.',
      ownedEquipment: 'الْعَتَادُ الْمَمْلُوكُ',
      statsTitle: 'الصِّفَاتُ',
      statDiscipline: 'الِانْضِبَاطُ',
      statSavoir: 'الْعِلْمُ',
      statPatience: 'الصَّبْرُ',
      statBonte: 'الْإِحْسَانُ',
      statConstance: 'الِاسْتِقَامَةُ'
    },
    quests: {
      headerSubtitle: 'الْمَهَمَّاتُ وَالِارْتِقَاءُ',
      headerTitle: 'الِارْتِقَاءُ بِالْعَمَلِ الصَّالِحِ',
      headerQuote: '« كُلُّ عَمَلٍ صَالِحٍ فِي الْوَاقِعِ يَزِيدُ فِي نُورِ قَلْبِكَ. »',
      tabMyPath: 'طَرِيقِي وَالْأَدَبُ',
      tabStory: 'الْقِصَّةُ',
      pledgedSectionTitle: 'عُهُودِي الْيَوْمِيَّةُ فِي الْأَدَبِ:',
      pendingCount: (count) => `${count} فِي الِانْتِظَارِ`,
      pledgedDoneBtn: (xp) => `تَمَّ بِحَمْدِ اللَّهِ! (+${xp} ن)`,
      pledgedEmptyHint: '🌿 عِنْدَمَا تَقْطَعُ عَهْدًا فِي الْقِصَّةِ، يُسَجَّلُ هُنَا لِتُنْجِزَهُ فِي يَوْمِكَ.',
      dailyHabitsTitle: '🌙 الْعَادَاتُ الْيَوْمِيَّةُ:',
      dailyHabitsDoneCount: (done, total) => `${done}/${total} مُنْجَزَة`,
      questAccomplished: (xp) => `✓ أُنْجِزَتْ (+${xp} ن)`,
      questXpBtn: (xp) => `+${xp} ن`,
      chroniclesTitle: 'فُصُولُ الرِّحْلَةِ:',
      chapterNumber: (num) => `الْفَصْلُ ${num}`,
      startChapter: 'ابْدَأِ الْفَصْلَ',
      replayChapter: 'إِعَادَةُ الْفَصْلِ',
      chapterDone: 'تَمَّ إِنْجَازُ الْفَصْلِ',
      availableSoon: 'قَرِيبًا',
      founderAccess: 'بَاقَةُ الْمُؤَسِّسِ'
    },
    profile: {
      tabProgression: 'الْمَسَارُ',
      tabBadges: 'الأَوْسِمَةُ',
      tabRanks: 'الرُّتَبُ وَالأَلْقَابُ',
      progressionSubtitle: 'النِّقَاطُ، النُّورُ، الْمُتَابَعَةُ، الإِحْصَائِيَّاتُ',
      progressionTitle: 'تَقَدُّمُكَ – مَسَارُ الرِّحْلَةِ',
      levelLabel: 'الْمُسْتَوَى',
      nextRankAt: (xp) => `الرُّتْبَةُ التَّالِيَةُ عِنْدَ ${xp} ن`,
      lightLabel: 'النُّورُ',
      currentRankBadge: (lvl) => `الرُّتْبَةُ الْحَالِيَّةُ (م. ${lvl})`,
      viewTree: 'شَجَرَةُ الرُّتَبِ ➔',
      waswasPressureTitle: 'ضَغْطُ الْوَسْوَاسِ',
      waswasSubtitle: 'يَزْدَادُ بِالْأَخْطَاءِ فِي الِاخْتِبَارَاتِ وَيَنْقُصُ بِالْأَعْمَالِ الصَّالِحَةِ.',
      currentStreakTitle: 'الْمُتَابَعَةُ الْحَالِيَّةُ',
      bestStreakTitle: 'أَفْضَلُ مُتَابَعَةٍ',
      daysCount: (days) => `${days} ${days > 1 ? 'أَيَّامٍ' : 'يَوْمٍ'}`,
      soulMirrorTitle: 'نَفْسُ عُثْمَانَ • مِرْآةُ اخْتِيَارَاتِكَ',
      currentTemperament: 'الطَّبْعُ الْحَالِيُّ',
      radiantStrengths: 'فَضَائِلُ مُشْرِقَةٌ',
      toDeploy: 'لِتَزْدَادَ ارْتِقَاءً',
      sixVirtuesTitle: 'فَضَائِلُ عُثْمَانَ السِّتُّ',
      traitVeryAsserted: 'رَاسِخَةٌ جِدًّا',
      traitInJourney: 'فِي طَرِيقِ الِارْتِقَاءِ',
      recentHabitsTitle: 'آخِرُ الْعَادَاتِ الْمُنْجَزَةِ',
      supportTitle: 'دَعْمُ مَشْرُوعِ نُور',
      supportDesc: 'يَدْعَمُ التَّسْجِيلَاتِ الصَّوْتِيَّةَ وَإِتَاحَةَ الْفُصُولِ.',
      supportBtn: 'دَعْمٌ ➔',
      nextRankGoalTitle: 'رُتْبَةُ الْعِلْمِ التَّالِيَةُ',
      nextRankGoalDesc: (title, minXp, diff) => `${title} (مَطْلُوبٌ ${minXp} ن • تَبَقَّى ${diff} ن)`,
      optionsTitle: 'الْإِعْدَادَاتُ وَالْخِيَارَاتُ',
      soundEffects: 'الْمُؤَثِّرَاتُ الصَّوْتِيَّةُ',
      soundMuted: 'كَتْمُ الصَّوْتِ',
      visualAssets: 'الرُّسُومَاتُ',
      openBtn: 'فَتْحٌ ➔',
      autoSaveActive: 'الْحِفْظُ التِّلْقَائِيُّ مُفَعَّلٌ',
      realTimeBadge: 'فَوْرِيٌّ ✓',
      restartGameBtn: 'إِعَادَةُ اللُّعْبَةِ مِنَ الصِّفْرِ',
      privacyPolicy: 'سِيَاسَةُ الْخُصُوصِيَّةِ ↗',
      badgesSubtitle: 'إِنْجَازَاتُكَ الْمُبَارَكَةُ',
      badgesTitle: 'الأَوْسِمَةُ وَالْإِنْجَازَاتُ',
      filterAll: 'الْكُلُّ',
      filterProgression: 'التَّقَدُّمُ',
      filterHabits: 'الْعَادَاتُ',
      filterStory: 'الْقِصَّةُ',
      ranksSubtitle: 'ارْتِقَاءُ الرُّوحِ وَالْعِلْمُ',
      ranksTitle: 'رُتَبُ الْعِلْمِ وَدَرَجَاتُهُ',
      currentLevelOfMax: (lvl, max) => `الْمُسْتَوَى ${lvl} / ${max}`,
      xpAcquired: (xp) => `النِّقَاطُ الْمُكْتَسَبَةُ: ${xp} ن`,
      targetXp: (xp) => `الْهَدَفُ: ${xp} ن`,
      maxRankReached: 'تَمَّ بُلُوغُ أَعْلَى رُتْبَةٍ!',
      ranksLadderTitle: 'شَجَرَةُ مَرَاتِبِ الْعِلْمِ الْخَمْسِ',
      acquiredBadge: 'مُكْتَسَبٌ'
    },
    travelMap: {
      pathTitle: 'الطَّرِيقُ',
      chapterLabel: 'الْفَصْلُ',
      chShort: 'ف.',
      stepsCount: (count) => `${count} خُطُوَاتٍ`,
      youAreHere: 'أَنْتَ هُنَا',
      summit: 'الْقِمَّةُ',
      stepOf: (n, total) => `الْخُطْوَةُ ${n} مِنْ ${total}`,
      validated: '✓ مُكْتَمِلَةٌ (+XP)',
      toCross: 'التَّالِيَةُ',
      replayStep: 'إِعَادَةُ هٰذِهِ الْخُطْوَةِ',
      continueJourney: 'مُتَابَعَةُ الرِّحْلَةِ ←',
      lockedDoorTitle: 'بَابٌ مُغْلَقٌ',
      founderRequiredTitle: 'بَاقَةُ الْمُؤَسِّسِ',
      lockedReason: (xp) => `تَحْتَاجُ هٰذِهِ الْخُطْوَةُ إِلَى ${xp} ن لِفَتْحِهَا. وَاصِلْ تَعَلُّمَكَ لِفَتْحِهَا!`,
      founderGuarantee: '🛡️ طُمَأْنِينَةٌ كَامِلَةٌ : اسْتِرْجَاعٌ خِلَالَ 7 أَيَّامٍ',
      founderAccessPrice: '4,99 يورو (عَرْضٌ خَاصٌّ)',
      unlockFounderBtn: 'فَتْحٌ (دَفْعٌ أَوْ رَمْزٌ تَرْوِيجِيٌّ)',
      closeBtn: 'إِغْلَاقٌ',
      yourXp: (playerXp, reqXp) => `نِقَاطُكَ: ${playerXp} / ${reqXp} ن`,
      quizXpBtn: 'الإِجَابَةُ عَلَى اخْتِبَارَاتِ الْعِلْمِ (+XP)',
      understoodBtn: 'فَهِمْتُ'
    },
    historyModal: {
      subtitle: 'سِجِلُّ الرِّوَايَةِ',
      title: 'سِجِلُّ الْمُحَادَثَاتِ',
      filterAll: 'الْكُلُّ',
      emptyText: 'لَا تُوجَدُ حِوَارَاتٌ مُسَجَّلَةٌ حَالِيًّا.',
      closeBtn: 'إِغْلَاقٌ'
    },
    knowledgeModal: {
      title: 'كِتَابُ الْعِلْمِ',
      subtitle: 'مَفَاهِيمُ الْحِكْمَةِ (العِلْمِ)',
      levelShort: 'م.',
      filterAll: 'الْكُلُّ',
      searchPlaceholder: 'ابْحَثْ عَنْ مَفْهُومٍ...',
      closeBtn: 'إِغْلَاقٌ',
      termTitle: 'الْمَفْهُومُ',
      definitionLabel: 'التَّعْرِيفُ وَالسِّيَاقُ',
      referenceLabel: 'الْمَرْجِعُ',
      emptySearchResults: 'لَمْ يَتِمَّ الْعُثُورُ عَلَى مَفَاهِيمَ لِهٰذَا الْبَحْثِ.'
    },
    guideModal: {
      subtitle: 'دَلِيلُ الْمُسَافِرِ',
      defaultTitle: 'نَصَائِحُ نُورَةَ',
      defaultMessage: 'تَذَكَّرْ: كُلُّ جُهْدٍ صَادِقٍ يُنِيرُ قَلْبَكَ بِنُورِ الإِيمَانِ!',
      questsTipTitle: 'الْمَهَمَّاتُ (أَسْفَلُ):',
      questsTipDesc: 'لإِعَادَةِ الْمَشَاهِدِ وَإِنْجَازِ تَحَدِّيَاتِ الْيَوْمِ.',
      bookTipTitle: 'الْكِتَابُ (أَعْلَى):',
      bookTipDesc: 'لِمُرَاجَعَةِ مَا تَعَلَّمْتَهُ مِنَ الْحِكَمِ وَالْمَعَارِفِ.',
      profileTipTitle: 'الْمَلَفُّ الشَّخْصِيُّ:',
      profileTipDesc: 'لِمُشَاهَدَةِ ارْتِقَاءِ عُثْمَانَ وَإِنْجَازَاتِهِ!',
      continueBtn: 'مُتَابَعَةٌ'
    }
  }
};

// Localized helper dictionaries for Quests, Badges, and Equipment
export const QUEST_TRANSLATIONS: Record<string, Record<Language, { title: string; description: string }>> = {
  q_priere: {
    fr: { title: 'Prière', description: 'Accomplir les prières du jour' },
    en: { title: 'Prayer', description: 'Perform the daily prayers' },
    ar: { title: 'الصَّلَاةُ', description: 'أَدَاءُ الصَّلَوَاتِ الْمَفْرُوضَةِ لِلْيَوْمِ' }
  },
  q_lecture: {
    fr: { title: 'Lecture 5 min', description: 'Lire quelque chose d’utile' },
    en: { title: 'Reading 5 min', description: 'Read something beneficial' },
    ar: { title: 'قِرَاءَةٌ 5 دَقَائِقَ', description: 'قِرَاءَةُ شَيْءٍ نَافِعٍ وَمُفِيدٍ' }
  },
  q_focus: {
    fr: { title: '15 min sans distraction', description: 'Rester concentré' },
    en: { title: '15 min focus', description: 'Stay focused without distraction' },
    ar: { title: '15 دَقِيقَةَ تَرْكِيزٍ', description: 'تَرْكِيزٌ كَامِلٌ دُونَ مُشَتِّتَاتٍ' }
  },
  q_bonus: {
    fr: { title: 'Objectifs bonus', description: 'Faire une bonne action spontanée' },
    en: { title: 'Bonus goals', description: 'Do a spontaneous good deed' },
    ar: { title: 'عَمَلٌ صَالِحٌ إِضَافِيٌّ', description: 'فِعْلُ إِحْسَانٍ طَوْعِيٍّ وَعَفْوِيٍّ' }
  },
  q_story_1: {
    fr: { title: 'Le Premier Pas', description: 'Quitter la chambre et choisir son chemin au Grand Poteau' },
    en: { title: 'The First Step', description: 'Leave the room and choose your path at the Grand Post' },
    ar: { title: 'الْخُطْوَةُ الأُولَى', description: 'الْخُرُوجُ مِنَ الْغُرْفَةِ وَاخْتِيَارُ الطَّرِيقِ عِنْدَ الْعَمُودِ الْكَبِيرِ' }
  },
  q_story_2: {
    fr: { title: 'Dissiper le Grand Waswâs', description: 'Triompher des murmures du doute au sommet et faire triompher la lumière' },
    en: { title: 'Dispel the Great Waswas', description: 'Overcome the whispers of doubt at the summit and let light triumph' },
    ar: { title: 'تَبْدِيدُ الْوَسْوَاسِ الأَكْبَرِ', description: 'قَهْرُ أَوْهَامِ الشَّكِّ فِي الْقِمَّةِ وَإِعْلَاءُ نُورِ الْيَقِينِ' }
  }
};

export const BADGE_TRANSLATIONS: Record<string, Record<Language, { title: string; description: string }>> = {
  b_premier_pas: {
    fr: { title: 'Premier pas', description: 'Accomplir ta première quête' },
    en: { title: 'First Step', description: 'Complete your first quest' },
    ar: { title: 'الْخُطْوَةُ الأُولَى', description: 'إِنْجَازُ أَوَّلِ مَهَمَّةٍ لَكَ' }
  },
  b_7_jours: {
    fr: { title: '7 jours', description: 'Avoir 7 jours de série' },
    en: { title: '7 Days', description: 'Maintain a 7-day streak' },
    ar: { title: '7 أَيَّامٍ', description: 'مُتَابَعَةٌ مُتَوَاصِلَةٌ لِمُدَّةِ 7 أَيَّامٍ' }
  },
  b_curieux: {
    fr: { title: 'Curieux', description: 'Lire 10 minutes 10 fois' },
    en: { title: 'Curious', description: 'Read 10 minutes 10 times' },
    ar: { title: 'طَالِبُ عِلْمٍ', description: 'الْقِرَاءَةُ لِمُدَّةِ 10 دَقَائِقَ 10 مَرَّاتٍ' }
  },
  b_discipline: {
    fr: { title: 'Discipliné', description: '15 min sans distraction 5 fois' },
    en: { title: 'Disciplined', description: '15 min without distraction 5 times' },
    ar: { title: 'مُنْضَبِطٌ', description: '15 دَقِيقَةَ تَرْكِيزٍ دُونَ تَشْتِيتٍ 5 مَرَّاتٍ' }
  },
  b_pont: {
    fr: { title: 'Pont de la rencontre', description: 'Rencontrer Noura' },
    en: { title: 'Bridge of Encounter', description: 'Meet Noura' },
    ar: { title: 'جِسْرُ اللِّقَاءِ', description: 'لِقَاءُ نُورَةَ عِنْدَ الْجِسْرِ' }
  },
  b_determine: {
    fr: { title: 'Déterminé', description: 'Reprendre après 3 jours d’arrêt' },
    en: { title: 'Determined', description: 'Resume after a 3-day pause' },
    ar: { title: 'عَازِمٌ', description: 'الْعَوْدَةُ بِعَزِيمَةٍ بَعْدَ تَوَقُّفٍ' }
  },
  b_explorateur: {
    fr: { title: 'Explorateur', description: 'Terminer le Chapitre 1' },
    en: { title: 'Explorer', description: 'Complete Chapter 1' },
    ar: { title: 'مُسْتَكْشِفٌ', description: 'إِتْمَامُ الْفَصْلِ الأَوَّلِ' }
  },
  b_voyageur: {
    fr: { title: 'Voyageur', description: 'Atteindre le niveau 10' },
    en: { title: 'Traveler', description: 'Reach Level 10' },
    ar: { title: 'مُسَافِرٌ مُجْتَهِدٌ', description: 'بُلُوغُ الْمُسْتَوَى 10' }
  },
  b_lumiere_vive: {
    fr: { title: 'Lumière vive', description: 'Atteindre 50% de lumière' },
    en: { title: 'Bright Light', description: 'Reach 50% Light' },
    ar: { title: 'نُورٌ سَاطِعٌ', description: 'بُلُوغُ 50% مِنَ النُّورِ' }
  }
};

export const EQUIPMENT_TRANSLATIONS: Record<string, Record<Language, { name: string; description: string; statBonus?: string }>> = {
  eq_tenue_voyageur: {
    fr: { name: 'Tunique de Lin', description: 'Une tenue simple et respirante pour les longues marches.', statBonus: '+2 Constance' },
    en: { name: 'Linen Tunic', description: 'A simple, breathable outfit for long walks.', statBonus: '+2 Steadfastness' },
    ar: { name: 'ثَوْبُ الْكَتَّانِ', description: 'رِدَاءٌ بَسِيطٌ وَمُرِيحٌ لِلْمَسِيرِ الطَّوِيلِ.', statBonus: '+2 اسْتِقَامَةٌ' }
  },
  eq_tenue_noble: {
    fr: { name: 'Robe du Sage', description: 'Tissée avec soin dans un fil noble.', statBonus: '+4 Savoir' },
    en: { name: 'Sage Robe', description: 'Carefully woven with noble fabric.', statBonus: '+4 Knowledge' },
    ar: { name: 'رِدَاءُ الْحَكِيمِ', description: 'مَنْسُوجٌ بِعِنَايَةٍ مِنْ خُيُوطٍ رَفِيعَةٍ.', statBonus: '+4 عِلْمٌ' }
  },
  eq_cape_marcheur: {
    fr: { name: 'Cape de Marcheur', description: 'Protège du vent et du soleil couchant.', statBonus: '+3 Patience' },
    en: { name: "Walker's Cloak", description: 'Protects against wind and the setting sun.', statBonus: '+3 Patience' },
    ar: { name: 'عَبَاءَةُ السَّالِكِ', description: 'تَقِي مِنَ الرِّيَاحِ وَحَرَارَةِ الشَّمْسِ.', statBonus: '+3 صَبْرٌ' }
  },
  eq_cape_desert: {
    fr: { name: 'Voile Émeraude', description: 'Un voile léger teinté d’or et de vert.', statBonus: '+3 Bonté' },
    en: { name: 'Emerald Veil', description: 'A lightweight veil tinted with gold and green.', statBonus: '+3 Kindness' },
    ar: { name: 'الْوِشَاحُ الزُّمُرُّدِيُّ', description: 'وِشَاحٌ خَفِيفٌ مُوَشًّى بِالذَّهَبِ وَالْخُضْرَةِ.', statBonus: '+3 إِحْسَانٌ' }
  },
  eq_sac_cuir: {
    fr: { name: 'Besace en cuir', description: 'Idéale pour transporter ses parchemins.', statBonus: '+5 Inventaire' },
    en: { name: 'Leather Satchel', description: 'Perfect for carrying sacred scrolls.', statBonus: '+5 Inventory' },
    ar: { name: 'حَقِيبَةُ الْجِلْدِ', description: 'مِثَالِيَّةٌ لِحَمْلِ الْمَخْطُوطَاتِ وَالْكُتُبِ.', statBonus: '+5 سَعَةٌ' }
  },
  eq_lanterne_espoir: {
    fr: { name: 'Lanterne d’Espoir', description: 'Une flamme perpétuelle qui dissipe le doute.', statBonus: '+10% Lumière' },
    en: { name: 'Lantern of Hope', description: 'A perpetual flame that dispels doubt.', statBonus: '+10% Light' },
    ar: { name: 'فَانُوسُ الرَّجَاءِ', description: 'شُعْلَةٌ دَائِمَةٌ تُبَدِّدُ ظُلُمَاتِ الشَّكِّ.', statBonus: '+10% نُورٌ' }
  },
  it_parchemin: {
    fr: { name: 'Parchemin du Savoir', description: 'Contient les enseignements précieux d’Isti’ādhah.' },
    en: { name: 'Scroll of Knowledge', description: 'Contains the precious teachings of Isti’adhah.' },
    ar: { name: 'مَخْطُوطَةُ الْعِلْمِ', description: 'تَحْتَوِي عَلَى تَعَالِيمِ الِاسْتِعَاذَةِ النَّفِيسَةِ.' }
  },
  it_tasbih: {
    fr: { name: 'Chapelet de Bois', description: 'Aide à ancrer la constance et le Dhikr.' },
    en: { name: 'Wooden Tasbih', description: 'Helps anchor steadfastness and Dhikr.' },
    ar: { name: 'مِسْبَحَةُ خَشَبٍ', description: 'تُعِينُ عَلَى اسْتِدَامَةِ الذِّكْرِ وَالطُّمَأْنِينَةِ.' }
  },
  res_graine: {
    fr: { name: 'Graines de Grenade', description: 'Récoltées dans l’oasis abandonnée.' },
    en: { name: 'Pomegranate Seeds', description: 'Harvested in the desert oasis.' },
    ar: { name: 'حَبَّاتُ الرُّمَّانِ', description: 'جُنِيَتْ مِنْ وَاحَةِ الصَّحْرَاءِ الْمُبَارَكَةِ.' }
  },
  dec_tapis: {
    fr: { name: 'Tapis Artisanal', description: 'Décore le sol de ta chambre avec élégance.' },
    en: { name: 'Artisan Rug', description: 'Elegantly adorns the floor of your room.' },
    ar: { name: 'سَجَّادٌ تَقْلِيدِيٌّ', description: 'يُزَيِّنُ أَرْضِيَّةَ غُرْفَتِكَ بِأَنَاقَةٍ وَجَمَالٍ.' }
  }
};

export const RANK_TRANSLATIONS: Record<number, Record<Language, { title: string; description: string; arabicTitle?: string }>> = {
  1: {
    fr: { title: 'Apprenti Voyageur', description: 'Premier pas hors de la chambre, découverte des sentiers de la vallée.', arabicTitle: 'طَالِبٌ مُبْتَدِئٌ' },
    en: { title: 'Apprentice Traveler', description: 'First step out of the room, discovering the valley trails.', arabicTitle: 'طَالِبٌ مُبْتَدِئٌ' },
    ar: { title: 'طَالِبٌ مُبْتَدِئٌ', description: 'الْخُطْوَةُ الأُولَى خَارِجَ الْغُرْفَةِ، وَاسْتِكْشَافُ سُبُلِ الْوَادِي.', arabicTitle: 'طَالِبٌ مُبْتَدِئٌ' }
  },
  2: {
    fr: { title: 'Compagnon Fraternel', description: 'A vaincu la solitude en tendant la main vers les autres au village.', arabicTitle: 'صَاحِبُ الإِخَاءِ' },
    en: { title: 'Brotherly Companion', description: 'Defeated loneliness by reaching out to others in the village.', arabicTitle: 'صَاحِبُ الإِخَاءِ' },
    ar: { title: 'صَاحِبُ الإِخَاءِ', description: 'تَغَلَّبَ عَلَى الْوَحْدَةِ بِمَدِّ يَدِ الإِحْسَانِ إِلَى أَهْلِ الْقَرْيَةِ.', arabicTitle: 'صَاحِبُ الإِخَاءِ' }
  },
  3: {
    fr: { title: 'Porteur de Douceur (Hilm)', description: 'Capacité à éteindre la colère par le calme et la bienveillance.', arabicTitle: 'صَاحِبُ الْحِلْمِ' },
    en: { title: 'Bearer of Gentle Wisdom (Hilm)', description: 'Ability to extinguish anger with calm and kindness.', arabicTitle: 'صَاحِبُ الْحِلْمِ' },
    ar: { title: 'صَاحِبُ الْحِلْمِ', description: 'الْقُدْرَةُ عَلَى إِطْفَاءِ الْغَضَبِ بِالرِّفْقِ وَكَظْمِ الْغَيْظِ.', arabicTitle: 'صَاحِبُ الْحِلْمِ' }
  },
  4: {
    fr: { title: 'Âme Éprouvée & Patiente (Sabr)', description: 'Persévérance et dignité face à la maladie et aux épreuves du corps.', arabicTitle: 'الصَّابِرُ الْمُحْتَسِبُ' },
    en: { title: 'Patient Soul (Sabr)', description: 'Perseverance and dignity in the face of bodily hardship and illness.', arabicTitle: 'الصَّابِرُ الْمُحْتَسِبُ' },
    ar: { title: 'الصَّابِرُ الْمُحْتَسِبُ', description: 'الثَّبَاتُ وَالرِّضَا عِنْدَ الشَّدَائِدِ وَالِابْتِلَاءِ.', arabicTitle: 'الصَّابِرُ الْمُحْتَسِبُ' }
  },
  5: {
    fr: { title: 'Étudiant en Science Accompli', description: 'Maîtrise approfondie des enseignements prophétiques et mise en pratique quotidienne.', arabicTitle: 'طَالِبُ عِلْمٍ مُجْتَهِدٌ' },
    en: { title: 'Accomplished Scholar', description: 'Deep mastery of prophetic teachings and daily righteous practice.', arabicTitle: 'طَالِبُ عِلْمٍ مُجْتَهِدٌ' },
    ar: { title: 'طَالِبُ عِلْمٍ مُجْتَهِدٌ', description: 'إِدْرَاكٌ عَمِيقٌ لِلْهَدْيِ النَّبَوِيِّ وَالْعَمَلُ بِهِ فِي كُلِّ حِينٍ.', arabicTitle: 'طَالِبُ عِلْمٍ مُجْتَهِدٌ' }
  }
};

export const TRAIT_LABELS: Record<string, Record<Language, { label: string; description: string }>> = {
  discipline: {
    fr: { label: 'Discipline', description: 'Ordre, régularité, respect des engagements et clarté d’esprit' },
    en: { label: 'Discipline', description: 'Order, regularity, keeping promises, and mental clarity' },
    ar: { label: 'الانْضِبَاطُ', description: 'النِّظَامُ، الْمُوَاظَبَةُ، الْوَفَاءُ بِالْعُهُودِ وَصَفَاءُ الذِّهْنِ' }
  },
  sabr: {
    fr: { label: 'Sabr (Patience)', description: 'Patience face à l’épreuve et persévérance dans l’effort' },
    en: { label: 'Sabr (Patience)', description: 'Patience through trials and perseverance in effort' },
    ar: { label: 'الصَّبْرُ', description: 'الصَّبْرُ عَلَى الِابْتِلَاءِ وَالثَّبَاتُ فِي بَذْلِ الْجُهْدِ' }
  },
  hilm: {
    fr: { label: 'Hilm (Douceur)', description: 'Maîtrise de soi, retenue face à la colère et douceur du cœur' },
    en: { label: 'Hilm (Gentleness)', description: 'Self-control, restraint from anger, and kindness of heart' },
    ar: { label: 'الْحِلْمُ', description: 'كَظْمُ الْغَيْظِ، ضَبْطُ النَّفْسِ وَلِينُ الْقَلْبِ' }
  },
  adab: {
    fr: { label: 'Adab (Bienséance)', description: 'Respect, gratitude, écoute et noblesse du comportement' },
    en: { label: 'Adab (Good Manners)', description: 'Respect, gratitude, attentive listening, and noble conduct' },
    ar: { label: 'الأَدَبُ', description: 'حُسْنُ الْخُلُقِ، الاحْتِرَامُ، الشُّكْرُ وَطِيبُ الْمُعَامَلَةِ' }
  },
  vitalite: {
    fr: { label: 'Vitalité', description: 'Énergie corporelle, dynamisme, courage et pas vif' },
    en: { label: 'Vitality', description: 'Bodily health, dynamism, courage, and energetic action' },
    ar: { label: 'الْحَيَوِيَّةُ', description: 'النَّشَاطُ الْبَدَنِيُّ، الْهِمَّةُ الْعَالِيَةُ وَالإِقْدَامُ' }
  },
  ilm: {
    fr: { label: 'ʿIlm (Savoir)', description: 'Connaissance, réflexion approfondie et curiosité féconde' },
    en: { label: 'ʿIlm (Knowledge)', description: 'Knowledge, deep reflection, and fruitful curiosity' },
    ar: { label: 'الْعِلْمُ', description: 'الْبَصِيرَةُ، التَّفَكُّرُ الْعَمِيقُ وَطَلَبُ الْمَعْرِفَةِ' }
  }
};

export function getLocalizedQuest(quest: QuestItem, lang: Language): { title: string; description: string } {
  const trans = QUEST_TRANSLATIONS[quest.id]?.[lang];
  return {
    title: trans?.title || quest.title,
    description: trans?.description || quest.description
  };
}

export function getLocalizedBadge(badge: BadgeItem, lang: Language): { title: string; description: string } {
  const trans = BADGE_TRANSLATIONS[badge.id]?.[lang];
  return {
    title: trans?.title || badge.title,
    description: trans?.description || badge.description
  };
}

export function getLocalizedEquipment(item: EquipmentItem, lang: Language): { name: string; description: string; statBonus?: string } {
  const trans = EQUIPMENT_TRANSLATIONS[item.id]?.[lang];
  return {
    name: trans?.name || item.name,
    description: trans?.description || item.description,
    statBonus: trans?.statBonus || item.statBonus
  };
}

export function getLocalizedRank(rank: PlayerRank, lang: Language): { level: number; title: string; description: string; arabicTitle?: string; icon: string } {
  const trans = RANK_TRANSLATIONS[rank.level]?.[lang];
  return {
    level: rank.level,
    title: trans?.title || rank.title,
    description: trans?.description || rank.description,
    arabicTitle: trans?.arabicTitle || rank.arabicTitle,
    icon: rank.icon
  };
}
