import React, { useState, useEffect, useMemo, useRef } from 'react';
import { shuffleSeeded, SESSION_SHUFFLE_SEED } from '../utils/quizShuffle';
import { getLocalizedIslamicQuizzes, LocalizedIslamicQuizQuestion } from '../i18n/islamicQuizzesTranslations';
import {
  X,
  Home,
  BookOpen,
  Trophy,
  BarChart3,
  SlidersHorizontal,
  CheckCircle,
  ArrowRight,
  RotateCcw,
  Flame,
  Award,
  Play,
  RefreshCw,
  User,
  Volume2,
  VolumeX,
  Send
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { speechManager } from '../utils/speech';
import { useLanguage } from '../context/LanguageContext';
import { Quiz } from '../types';
import { getLocalizedQuiz } from '../utils/narrativeI18n';
import {
  fetchLeaderboard,
  submitLeaderboardScore,
  submitQuizFeedback,
  loadPlayerStats,
  recordPlayerGame,
  savePseudo,
  LeaderboardEntry,
  PlayerQuizStats
} from '../utils/quizLeaderboard';

interface IslamicQuizModalProps {
  completedQuizIds?: string[];
  onCompleteQuiz?: (quizId: string, xpReward: number) => void;
  onWaswasMistake?: (amount: number, reason: string) => void;
  onClose: () => void;
  currentXp?: number;
  initialCategory?: string;
  storyQuizzes?: Record<string, Quiz>;
  standalone?: boolean;
}

type QuizTab = 'home' | 'training' | 'competition' | 'leaderboard' | 'info';
type CompPhase = 'setup' | 'playing' | 'finished';

const COMPETITION_DURATION_SEC = 120; // 2:00 standard timed challenge
const QUESTION_SPEED_WINDOW_MS = 12000;
const MIN_CORRECT_PTS = 200;
const MAX_CORRECT_PTS = 1000;
const WRONG_PENALTY_PTS = 400;

const formatClock = (sec: number): string => {
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

// Palette de rubans harmonisée à la charte NOUR (or, émeraude, terre cuite, lapis, ambre, sauge, prune)
const RIBBON_PALETTE = [
  'from-[#d97c27] to-[#b85d19] text-[#fffaf0] border-[#6e350d]',
  'from-[#2d6a4f] to-[#1b4332] text-[#f0fdf4] border-[#0f291e]',
  'from-[#b45309] to-[#92400e] text-[#fffbeb] border-[#5c2706]',
  'from-[#0e7490] to-[#155e75] text-[#ecfeff] border-[#083344]',
  'from-[#9f1239] to-[#881337] text-[#fff1f2] border-[#4c0519]',
  'from-[#5c4028] to-[#3a2312] text-[#fef3c7] border-[#241409]',
  'from-[#4d7c0f] to-[#365314] text-[#f7fee7] border-[#1a2e05]',
  'from-[#6d28d9] to-[#5b21b6] text-[#f5f3ff] border-[#2e1065]',
];

export const IslamicQuizModal: React.FC<IslamicQuizModalProps> = ({
  completedQuizIds = [],
  onCompleteQuiz,
  onWaswasMistake,
  onClose,
  initialCategory,
  storyQuizzes,
  standalone = false
}) => {
  const { language, isRtl } = useLanguage();

  // Build full localized pool (18 standalone + story quizzes)
  const quizzes = useMemo(() => {
    const baseQuizzes = getLocalizedIslamicQuizzes(language);
    if (!storyQuizzes) return baseQuizzes;

    const existingIds = new Set(baseQuizzes.map((q) => q.id));
    const convertedStoryQuizzes: LocalizedIslamicQuizQuestion[] = (Object.values(storyQuizzes) as Quiz[])
      .filter((q) => !existingIds.has(q.id))
      .map((rawQuiz) => {
        const q = getLocalizedQuiz(rawQuiz, language);
        const correctIdx = Math.max(
          0,
          q.options.findIndex((o) => o.isCorrect || o.id === q.correctOptionId)
        );
        return {
          id: q.id,
          question: q.question,
          category: q.topic,
          difficulty: 'moyen',
          arabic: q.reference?.arabic,
          options: q.options.map((o) => o.text),
          correctIndex: correctIdx,
          explanation: q.explanation,
          hadithOrQuranRef: q.reference
            ? `${q.reference.reference}${q.reference.citationText ? ` — ${q.reference.citationText}` : ''}`
            : undefined,
          xpReward: 25
        };
      });

    return [...baseQuizzes, ...convertedStoryQuizzes];
  }, [language, storyQuizzes]);

  const ui = useMemo(() => {
    if (language === 'ar') {
      return {
        brand: 'نُور كْوِيز',
        close: 'إِغْلَاقٌ',
        tabHome: 'الرَّئِيسِيَّةُ',
        tabTrain: 'تَعَلُّمٌ',
        tabComp: 'مُنَافَسَةٌ',
        tabRank: 'أَفْضَلُ 500',
        tabInfo: 'إِعْدَادَاتٌ',
        homeTrainTitle: 'التَّعَلُّمُ وَالتَّدْرِيبُ',
        homeTrainDesc: 'تَدَرَّبْ بِحَسَبِ الْمَوْضُوعِ وَالْمُسْتَوَى مَعَ الشَّرْحِ وَالْمَصَادِرِ',
        homeCompTitle: 'وَضْعُ الْمُنَافَسَةِ',
        homeCompDesc: 'تَحَدِّي دَقِيقَتَيْنِ • نِقَاطٌ بِالسُّرْعَةِ وَتَرْتِيبٌ عَالَمِيٌّ',
        bestScoreLabel: 'أَفْضَلُ نَتِيجَةٍ لَكَ',
        seeRanking: 'عَرْضُ التَّرْتِيبِ',
        allThemes: 'كُلُّ الْأَسْئِلَةِ',
        chooseTheme: 'اخْتَرْ مَوْضُوعًا لِلتَّدْرِيبِ',
        chooseLevel: 'اخْتَرِ الْمُسْتَوَى',
        diffEasy: 'مُبْتَدِئٌ',
        diffMedium: 'مُتَوَسِّطٌ',
        diffHard: 'طَالِبُ عِلْمٍ',
        diffAll: 'جَمِيعُ الْأَسْئِلَةِ',
        exactBadge: 'صَحِيحٌ!',
        wrongBadge: 'خَطَأٌ!',
        backToThemes: '← الْمَوَاضِيعُ',
        prev: 'السَّابِقُ',
        next: 'التَّالِي',
        questionOf: (c: number, t: number) => `السُّؤَالُ ${c} / ${t}`,
        completed: '✓ مُكْتَمِلٌ',
        validate: 'تَأْكِيدُ الْإِجَابَةِ',
        correct: () => 'إِجَابَةٌ صَحِيحَةٌ!',
        wrong: 'لَيْسَ تَمَامًا… حَاوِلْ مَرَّةً أُخْرَى.',
        source: 'الْمَصْدَرُ :',
        retry: 'إِعَادَةُ الْمُحَاوَلَةِ',
        skip: 'تَخَطٍّ',
        waswasMistake: 'تَغَذَّى الشَّكُّ: الْوَسْوَاسُ يَزْدَادُ قُوَّةً!',
        compHeader: 'وَضْعُ الْمُنَافَسَةِ',
        pseudoPlaceholder: 'اخْتَرِ اسْمَكَ الْمُسْتَعَارَ...',
        startComp: 'ابْدَأِ التَّحَدِّي',
        rulesTitle: 'الْقَوَاعِدُ',
        rule1: 'أَجِبْ عَنْ أَكْبَرِ عَدَدٍ مِنَ الْأَسْئِلَةِ فِي دَقِيقَتَيْنِ (2:00).',
        rule2: 'إِجَابَةٌ صَحِيحَةٌ: بَيْنَ +200 وَ +1000 نُقْطَةٍ حَسَبَ السُّرْعَةِ.',
        rule3: 'انْتَبِهْ! الْخَطَأُ يُنْقِصُ 400 نُقْطَةٍ.',
        rule4: 'تَحَدَّ نَفْسَكَ وَادْخُلْ قَائِمَةَ أَفْضَلِ 500 لَاعِبٍ!',
        pseudoRequired: 'الْمَرْجُو إِدْخَالُ اسْمٍ مُسْتَعَارٍ (حَرْفَانِ عَلَى الْأَقَلِّ)',
        scoreLabel: 'النِّقَاطُ',
        noteLabel: 'النَّتِيجَةُ',
        comboLabel: 'سِلْسِلَةٌ',
        timeUp: 'انْتَهَى الْوَقْتُ!',
        newRecord: 'رَقْمٌ قِيَاسِيٌّ جَدِيدٌ!',
        playAgain: 'الْعَبْ مُجَدَّدًا لِتَحْطِيمِ رَقْمِكَ',
        topTitle: 'أَفْضَلُ 500 لَاعِبٍ',
        colRank: 'الرُّتْبَةُ',
        colPseudo: 'الِاسْمُ',
        colScore: 'النِّقَاطُ',
        colNote: 'النَّتِيجَةُ',
        onlineBadge: 'تَرْتِيبٌ مُبَاشِرٌ',
        localBadge: 'تَرْتِيبٌ مَحَلِّيٌّ',
        beatScoreCta: 'تَحَدَّ التَّرْتِيبَ الْآنَ',
        infoTitle: 'إِحْصَائِيَّاتُكَ وَالْقَوَاعِدُ',
        gamesPlayed: 'الْمُبَارَيَاتُ',
        learnedQuizzes: 'أَسْئِلَةٌ مُكْتَمِلَةٌ',
        yourPseudo: 'اسْمُكَ فِي التَّرْتِيبِ',
        savePseudoBtn: 'حِفْظٌ',
        proposeTitle: 'اقْتَرِحْ سُؤَالًا أَوْ بَلِّغْ عَنْ خَطَإٍ',
        proposePlaceholder: 'اكْتُبِ اقْتِرَاحَكَ أَوِ التَّصْحِيحَ هُنَا...',
        sendBtn: 'إِرْسَالٌ',
        sentThanks: 'جَزَاكَ اللَّهُ خَيْرًا! تَمَّ الْإِرْسَالُ.',
        backToGame: 'الْعَوْدَةُ إِلَى الْمُغَامَرَةِ'
      };
    }
    if (language === 'en') {
      return {
        brand: 'NOUR QUIZ',
        close: 'Close',
        tabHome: 'Home',
        tabTrain: 'Learn',
        tabComp: 'Compete',
        tabRank: 'Top 500',
        tabInfo: 'Stats',
        homeTrainTitle: 'Learning Mode',
        homeTrainDesc: 'Practice by topic & level at your own pace with cited sources',
        homeCompTitle: 'Competition Mode',
        homeCompDesc: '2:00 timed challenge • Speed points & leaderboard',
        bestScoreLabel: 'Your Best Score',
        seeRanking: 'View Leaderboard',
        allThemes: 'All Questions',
        chooseTheme: 'Choose a topic to practice',
        chooseLevel: 'Choose Difficulty',
        diffEasy: 'Beginner',
        diffMedium: 'Intermediate',
        diffHard: 'Student',
        diffAll: 'All Questions',
        exactBadge: 'EXACT!',
        wrongBadge: 'NOT QUITE!',
        backToThemes: '← Topics',
        prev: 'Prev',
        next: 'Next',
        questionOf: (c: number, t: number) => `Question ${c} / ${t}`,
        completed: '✓ Completed',
        validate: 'Submit my answer',
        correct: () => 'Correct answer!',
        wrong: 'Not quite right.',
        source: 'Source:',
        retry: 'Try again',
        skip: 'Skip',
        waswasMistake: 'Doubt fed: The Waswâs grows stronger!',
        compHeader: 'Competition Mode',
        pseudoPlaceholder: 'Choose your nickname...',
        startComp: 'Start Challenge',
        rulesTitle: 'RULES',
        rule1: 'Answer as many questions as possible in 2 minutes (2:00).',
        rule2: 'A correct answer earns between +200 and +1,000 pts based on speed.',
        rule3: 'Watch out! A wrong answer costs -400 points.',
        rule4: 'Beat your personal record and climb the TOP 500!',
        pseudoRequired: 'Please enter a nickname (at least 2 characters)',
        scoreLabel: 'Score',
        noteLabel: 'Accuracy',
        comboLabel: 'Streak',
        timeUp: "Time's Up!",
        newRecord: 'NEW PERSONAL RECORD!',
        playAgain: 'Play Again to Beat Your Score',
        topTitle: 'TOP 500',
        colRank: 'Rank',
        colPseudo: 'Player',
        colScore: 'Score',
        colNote: 'Accuracy',
        onlineBadge: 'Live Ranking',
        localBadge: 'Local Ranking',
        beatScoreCta: 'Challenge the Leaderboard',
        infoTitle: 'Your Stats & Rules',
        gamesPlayed: 'Challenges',
        learnedQuizzes: 'Quizzes Learned',
        yourPseudo: 'Your Leaderboard Nickname',
        savePseudoBtn: 'Save',
        proposeTitle: 'Suggest a Question or Report an Issue',
        proposePlaceholder: 'Write your question suggestion or feedback here...',
        sendBtn: 'Send',
        sentThanks: 'Thank you! Your message has been sent.',
        backToGame: 'Back to Adventure'
      };
    }
    return {
      brand: 'NOUR QUIZ',
      close: 'Fermer',
      tabHome: 'Accueil',
      tabTrain: 'Apprendre',
      tabComp: 'Défi',
      tabRank: 'Top 500',
      tabInfo: 'Infos',
      homeTrainTitle: 'Apprentissage',
      homeTrainDesc: 'Entraîne-toi par thème et par niveau, avec explications et sources',
      homeCompTitle: 'Compétition',
      homeCompDesc: 'Défi 2:00 • Points de rapidité & TOP 500',
      bestScoreLabel: 'Ton Meilleur Score',
      seeRanking: 'Voir le Classement',
      allThemes: 'Toutes les Questions',
      chooseTheme: 'Choisis un thème pour t’entraîner',
      chooseLevel: 'Choisis ton niveau',
      diffEasy: 'Débutant',
      diffMedium: 'Intermédiaire',
      diffHard: 'Étudiant',
      diffAll: 'Toutes les questions',
      exactBadge: 'EXACT !',
      wrongBadge: 'PAS TOUT À FAIT !',
      backToThemes: '← Thèmes',
      prev: 'Précédent',
      next: 'Suivant',
      questionOf: (c: number, t: number) => `Question ${c} / ${t}`,
      completed: '✓ Réussi',
      validate: 'Valider ma réponse',
      correct: () => 'Bonne réponse !',
      wrong: 'Ce n’est pas la bonne réponse.',
      source: 'Source :',
      retry: 'Réessayer',
      skip: 'Passer',
      waswasMistake: 'Le doute s’est nourri : le Waswâs grandit !',
      compHeader: 'Mode Compétition',
      pseudoPlaceholder: 'Choisis ton pseudo...',
      startComp: 'Lancer le défi',
      rulesTitle: 'RÈGLES',
      rule1: 'Réponds à un maximum de questions en 2 minutes (2:00).',
      rule2: 'Une bonne réponse vaut entre +200 et +1 000 pts selon ta rapidité.',
      rule3: 'Attention ! Une mauvaise réponse fait perdre -400 points.',
      rule4: 'Bats ton record et entre dans le TOP 500 !',
      pseudoRequired: 'Choisis un pseudo (2 caractères minimum)',
      scoreLabel: 'Score',
      noteLabel: 'Note',
      comboLabel: 'Série',
      timeUp: 'Temps écoulé !',
      newRecord: 'NOUVEAU RECORD !',
      playAgain: 'Rejouer pour battre mon score',
      topTitle: 'TOP 500',
      colRank: 'Rang',
      colPseudo: 'Pseudo',
      colScore: 'Score',
      colNote: 'Note',
      onlineBadge: 'Classement en direct',
      localBadge: 'Classement local',
      beatScoreCta: 'Tenter de battre le Top',
      infoTitle: 'Mes Statistiques & Règles',
      gamesPlayed: 'Défis joués',
      learnedQuizzes: 'Quiz appris',
      yourPseudo: 'Ton pseudo dans le classement',
      savePseudoBtn: 'Enregistrer',
      proposeTitle: 'Proposer une question ou signaler une erreur',
      proposePlaceholder: 'Écris ta question ou remarque ici...',
      sendBtn: 'Envoyer',
      sentThanks: 'Merci ! Ton message a bien été envoyé.',
      backToGame: 'Retour à l’aventure'
    };
  }, [language]);

  // Tab navigation (if initialCategory is passed from a chapter gate, jump right into training!)
  const [activeTab, setActiveTab] = useState<QuizTab>(() => (initialCategory ? 'training' : 'home'));

  // Player stats & pseudo
  const [stats, setStats] = useState<PlayerQuizStats>(() => loadPlayerStats());
  const [pseudoInput, setPseudoInput] = useState<string>(() => loadPlayerStats().pseudo);
  const [pseudoError, setPseudoError] = useState<string | null>(null);
  const [pseudoSavedFeedback, setPseudoSavedFeedback] = useState(false);

  // Leaderboard state
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isBoardLoading, setIsBoardLoading] = useState(false);
  const [isBoardOnline, setIsBoardOnline] = useState(true);

  const refreshLeaderboard = async (pseudoOverride?: string) => {
    setIsBoardLoading(true);
    const res = await fetchLeaderboard(pseudoOverride ?? stats.pseudo);
    setLeaderboard(res.entries);
    setIsBoardOnline(res.isOnline);
    setIsBoardLoading(false);
  };

  useEffect(() => {
    refreshLeaderboard();
  }, []);

  // --- TRAINING MODE STATE ---
  const categories = useMemo(() => {
    const map = new Map<string, LocalizedIslamicQuizQuestion[]>();
    for (const q of quizzes) {
      const list = map.get(q.category) || [];
      list.push(q);
      map.set(q.category, list);
    }
    return Array.from(map.entries()).map(([name, items]) => ({
      name,
      items,
      completedCount: items.filter((it) => completedQuizIds.includes(it.id)).length,
    }));
  }, [quizzes, completedQuizIds]);

  const [selectedTheme, setSelectedTheme] = useState<string | null>(() => {
    if (!initialCategory) return null;
    const match = quizzes.find((q) => q.category.toLowerCase().includes(initialCategory.toLowerCase()));
    return match ? match.category : '__ALL__';
  });
  const [selectedDiff, setSelectedDiff] = useState<'all' | 'facile' | 'moyen' | 'difficile' | null>(() =>
    initialCategory ? 'all' : null
  );

  const themePool = useMemo(() => {
    if (!selectedTheme || selectedTheme === '__ALL__') return quizzes;
    return quizzes.filter((q) => q.category === selectedTheme);
  }, [quizzes, selectedTheme]);

  const trainingPool = useMemo(() => {
    if (!selectedDiff || selectedDiff === 'all') return themePool;
    const filtered = themePool.filter((q) => q.difficulty === selectedDiff);
    return filtered.length > 0 ? filtered : themePool;
  }, [themePool, selectedDiff]);

  const [trainIdx, setTrainIdx] = useState(0);
  const [trainScoreCount, setTrainScoreCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [localCompletedIds, setLocalCompletedIds] = useState<string[]>(completedQuizIds);

  const currentTrainQuiz = trainingPool[trainIdx] || trainingPool[0];
  const isAlreadyCompleted = currentTrainQuiz ? localCompletedIds.includes(currentTrainQuiz.id) : false;

  const shuffledTrainOptions = useMemo(() => {
    if (!currentTrainQuiz) return [];
    const indexed = currentTrainQuiz.options.map((text, origIdx) => ({ text, origIdx }));
    return shuffleSeeded(indexed, `${currentTrainQuiz.id}_${SESSION_SHUFFLE_SEED}`);
  }, [currentTrainQuiz]);

  useEffect(() => {
    if (activeTab === 'training' && selectedTheme && selectedDiff && currentTrainQuiz) {
      speechManager.speakBeat({
        speaker: 'narration',
        text: currentTrainQuiz.question,
        lang: language
      });
    }
  }, [activeTab, selectedTheme, selectedDiff, trainIdx, language]);

  const openTheme = (themeName: string) => {
    soundManager.playSelect();
    setSelectedTheme(themeName);
    setSelectedDiff(null);
    setTrainIdx(0);
    setTrainScoreCount(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  const startTrainingLevel = (diff: 'all' | 'facile' | 'moyen' | 'difficile') => {
    soundManager.playSelect();
    setSelectedDiff(diff);
    setTrainIdx(0);
    setTrainScoreCount(0);
    setSelectedOption(null);
    setHasSubmitted(false);
    setIsCorrect(false);
  };

  // 1-tap instant validation (like QuizzIslam screenshot 8!)
  const handleTrainAnswerTap = (origIdx: number) => {
    if (hasSubmitted || !currentTrainQuiz) return;
    setSelectedOption(origIdx);
    setHasSubmitted(true);
    if (origIdx === currentTrainQuiz.correctIndex) {
      setIsCorrect(true);
      setTrainScoreCount((c) => c + 1);
      soundManager.playQuizSuccess();
      if (!isAlreadyCompleted) {
        setLocalCompletedIds((prev) => [...prev, currentTrainQuiz.id]);
      }
    } else {
      setIsCorrect(false);
      soundManager.playSelect();
    }
  };

  const handleTrainNext = () => {
    soundManager.playSelect();
    if (trainIdx < trainingPool.length - 1) {
      setTrainIdx(trainIdx + 1);
      setSelectedOption(null);
      setHasSubmitted(false);
      setIsCorrect(false);
    } else {
      setSelectedDiff(null);
      setSelectedTheme(null);
    }
  };

  // --- COMPETITION MODE STATE (90s Timed Challenge) ---
  const [compPhase, setCompPhase] = useState<CompPhase>('setup');
  const [timeLeft, setTimeLeft] = useState<number>(COMPETITION_DURATION_SEC);
  const [compScore, setCompScore] = useState<number>(0);
  const [compCorrect, setCompCorrect] = useState<number>(0);
  const [compTotal, setCompTotal] = useState<number>(0);
  const [compCombo, setCompCombo] = useState<number>(0);
  const [compDeck, setCompDeck] = useState<LocalizedIslamicQuizQuestion[]>([]);
  const [compCursor, setCompCursor] = useState<number>(0);
  const [compFeedback, setCompFeedback] = useState<{ delta: number; isRight: boolean; chosenOrigIdx: number } | null>(null);
  const [isNewRecord, setIsNewRecord] = useState<boolean>(false);
  const questionStartRef = useRef<number>(Date.now());
  const compFinishedRef = useRef<boolean>(false);

  const currentCompQuiz = compDeck[compCursor % Math.max(1, compDeck.length)];
  const shuffledCompOptions = useMemo(() => {
    if (!currentCompQuiz) return [];
    const indexed = currentCompQuiz.options.map((text, origIdx) => ({ text, origIdx }));
    return shuffleSeeded(indexed, `comp_${currentCompQuiz.id}_${compCursor}_${SESSION_SHUFFLE_SEED}`);
  }, [currentCompQuiz, compCursor]);

  const startCompetition = () => {
    const clean = pseudoInput.trim();
    if (clean.length < 2) {
      setPseudoError(ui.pseudoRequired);
      soundManager.playSelect();
      return;
    }
    setPseudoError(null);
    savePseudo(clean);
    setStats((prev) => ({ ...prev, pseudo: clean }));

    soundManager.playSelect();
    speechManager.stop();
    const deck = shuffleSeeded(quizzes, `comp_deck_${Date.now()}`);
    setCompDeck(deck);
    setCompCursor(0);
    setCompScore(0);
    setCompCorrect(0);
    setCompTotal(0);
    setCompCombo(0);
    setCompFeedback(null);
    setIsNewRecord(false);
    setTimeLeft(COMPETITION_DURATION_SEC);
    compFinishedRef.current = false;
    questionStartRef.current = Date.now();
    setCompPhase('playing');
  };

  // Countdown timer during Competition
  useEffect(() => {
    if (activeTab !== 'competition' || compPhase !== 'playing') return;
    if (timeLeft <= 0) {
      if (!compFinishedRef.current) {
        compFinishedRef.current = true;
        finishCompetition();
      }
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => Math.max(0, t - 1)), 1000);
    return () => clearTimeout(id);
  }, [activeTab, compPhase, timeLeft]);

  const finishCompetition = async () => {
    soundManager.playChapterComplete();
    setCompPhase('finished');
    const finalPseudo = pseudoInput.trim() || stats.pseudo || 'Voyageur';
    const { stats: updatedStats, isNewRecord: rec } = recordPlayerGame(finalPseudo, compScore, compCorrect, compTotal);
    setStats(updatedStats);
    setIsNewRecord(rec);
    await submitLeaderboardScore({
      pseudo: finalPseudo,
      score: compScore,
      correct: compCorrect,
      total: compTotal,
      lang: language,
    });
    refreshLeaderboard(finalPseudo);
  };

  const handleCompAnswer = (origIdx: number) => {
    if (compFeedback || !currentCompQuiz || timeLeft <= 0) return;
    const elapsed = Date.now() - questionStartRef.current;
    const isRight = origIdx === currentCompQuiz.correctIndex;
    setCompTotal((n) => n + 1);

    if (isRight) {
      soundManager.playQuizSuccess();
      const speedRatio = Math.max(0, 1 - elapsed / QUESTION_SPEED_WINDOW_MS);
      const basePts = Math.round(MIN_CORRECT_PTS + speedRatio * (MAX_CORRECT_PTS - MIN_CORRECT_PTS));
      const nextCombo = compCombo + 1;
      const comboBonus = nextCombo >= 3 ? Math.min(250, (nextCombo - 2) * 75) : 0;
      const gained = Math.min(MAX_CORRECT_PTS, basePts + comboBonus);
      setCompScore((s) => s + gained);
      setCompCorrect((c) => c + 1);
      setCompCombo(nextCombo);
      setCompFeedback({ delta: gained, isRight: true, chosenOrigIdx: origIdx });
    } else {
      soundManager.playSelect();
      setCompScore((s) => Math.max(0, s - WRONG_PENALTY_PTS));
      setCompCombo(0);
      setCompFeedback({ delta: -WRONG_PENALTY_PTS, isRight: false, chosenOrigIdx: origIdx });
    }

    setTimeout(() => {
      setCompFeedback(null);
      setCompCursor((c) => c + 1);
      questionStartRef.current = Date.now();
    }, 680);
  };

  const switchTab = (next: QuizTab) => {
    soundManager.playSelect();
    speechManager.stop();
    if (activeTab === 'competition' && compPhase === 'playing' && next !== 'competition') {
      setCompPhase('setup');
    }
    setActiveTab(next);
    if (next === 'leaderboard') {
      refreshLeaderboard();
    }
  };

  const playerRank = useMemo(() => {
    if (!stats.pseudo) return null;
    const idx = leaderboard.findIndex((e) => e.pseudo.toLowerCase() === stats.pseudo.toLowerCase());
    return idx !== -1 ? idx + 1 : null;
  }, [leaderboard, stats.pseudo]);

  const [isQuizMuted, setIsQuizMuted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const toggleQuizMute = () => {
    const next = !isQuizMuted;
    setIsQuizMuted(next);
    soundManager.setMuted(next);
    if (next) speechManager.stop();
  };

  const timerRatio = Math.max(0, Math.min(1, timeLeft / COMPETITION_DURATION_SEC));
  const circleRadius = 22;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const circleOffset = circleCircumference * (1 - timerRatio);
  const activeBgImage =
    activeTab === 'competition'
      ? '/game-assets/quiz_bg_competition_pixel.jpg'
      : '/game-assets/quiz_bg_serene_pixel.jpg';

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[200] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md select-none animate-in fade-in duration-200"
    >
      <div className="w-full max-w-xl h-[92vh] sm:h-[86vh] max-h-[780px] bg-[#1b120b] border-3 border-[#3a2312] rounded-3xl shadow-[0_14px_40px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden relative animate-in zoom-in-95 duration-200">
        {/* TOP BRAND BAR (Inspired by QuizzIslam header, adapted to NOUR Gold & Parchment) */}
        <div className="bg-gradient-to-r from-[#2b180b] via-[#3a2312] to-[#2b180b] px-4 py-2.5 border-b-2 border-[#d97c27] flex items-center justify-between shrink-0 z-20">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#fcd34d] to-[#d97c27] border border-[#fbf7ee]/40 flex items-center justify-center text-[#2b180b] shadow-sm">
              <Award className="w-4 h-4" />
            </span>
            <div className="flex flex-col">
              <span className="font-cinzel font-black text-sm sm:text-base tracking-widest text-amber-200 leading-none">
                {ui.brand}
              </span>
              {stats.bestScore > 0 && (
                <span className="text-[10px] font-mono text-amber-300/80 mt-0.5">
                  🏆 {stats.bestScore.toLocaleString()} pts {playerRank ? `• #${playerRank}` : ''}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleQuizMute}
              aria-label={isQuizMuted ? 'Activer le son' : 'Couper le son'}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 text-amber-200 flex items-center justify-center cursor-pointer transition-colors"
            >
              {isQuizMuted ? <VolumeX className="w-4 h-4 text-red-300" /> : <Volume2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                soundManager.playSelect();
                speechManager.stop();
                onClose();
              }}
              aria-label={ui.close}
              className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 border border-amber-400/40 text-amber-100 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* MAIN SCROLLABLE CONTENT AREA WITH SERENE PIXEL-ART BACKDROP */}
        <div className="flex-1 min-h-0 overflow-y-auto relative">
          {/* Pixel-Art Scenic Background */}
          <div
            className="fixed sm:absolute inset-0 bg-cover bg-center pointer-events-none transition-all duration-500"
            style={{ backgroundImage: `url('${activeBgImage}')` }}
          />
          <div className="fixed sm:absolute inset-0 bg-gradient-to-b from-[#1a1008]/55 via-[#fbf7ee]/45 to-[#1a1008]/65 pointer-events-none" />
          <div className="relative z-10 min-h-full">
          {/* ===================================================== */}
          {/* TAB 1 : HOME (Apprentissage / Compétition medallions) */}
          {/* ===================================================== */}
          {activeTab === 'home' && (
            <div className="p-5 sm:p-7 flex flex-col items-center justify-center min-h-full gap-5">
              {/* Medallion 1 : Apprentissage */}
              <button
                onClick={() => {
                  setSelectedTheme(null);
                  switchTab('training');
                }}
                className="w-full max-w-md group relative overflow-hidden rounded-3xl border-3 border-[#3a2312] bg-gradient-to-br from-[#2d6a4f] via-[#245840] to-[#1b4332] p-5 sm:p-6 text-center shadow-[0_6px_0_#1b4332] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="absolute top-2.5 left-2.5 w-3 h-3 bg-amber-300/80 rotate-45 border border-[#1b4332]" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 bg-amber-300/80 rotate-45 border border-[#1b4332]" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 bg-amber-300/80 rotate-45 border border-[#1b4332]" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 bg-amber-300/80 rotate-45 border border-[#1b4332]" />
                <div className="flex flex-col items-center gap-1.5 relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-amber-300/20 border border-amber-300/50 flex items-center justify-center text-amber-200 mb-1">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <h2 className="font-cinzel font-black text-xl sm:text-2xl text-[#fff8eb] tracking-wide">
                    {ui.homeTrainTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 font-medium max-w-xs">
                    {ui.homeTrainDesc}
                  </p>
                </div>
              </button>

              {/* Medallion 2 : Compétition */}
              <button
                onClick={() => {
                  setCompPhase('setup');
                  switchTab('competition');
                }}
                className="w-full max-w-md group relative overflow-hidden rounded-3xl border-3 border-[#3a2312] bg-gradient-to-br from-[#d97c27] via-[#c46a1c] to-[#9a4d0e] p-5 sm:p-6 text-center shadow-[0_6px_0_#5c2b06] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer"
              >
                <div className="absolute top-2.5 left-2.5 w-3 h-3 bg-[#fef3c7] rotate-45 border border-[#5c2b06]" />
                <div className="absolute top-2.5 right-2.5 w-3 h-3 bg-[#fef3c7] rotate-45 border border-[#5c2b06]" />
                <div className="absolute bottom-2.5 left-2.5 w-3 h-3 bg-[#fef3c7] rotate-45 border border-[#5c2b06]" />
                <div className="absolute bottom-2.5 right-2.5 w-3 h-3 bg-[#fef3c7] rotate-45 border border-[#5c2b06]" />
                <div className="flex flex-col items-center gap-1.5 relative z-10">
                  <div className="w-11 h-11 rounded-2xl bg-black/20 border border-amber-200/60 flex items-center justify-center text-amber-100 mb-1">
                    <Trophy className="w-5 h-5" />
                  </div>
                  <h2 className="font-cinzel font-black text-xl sm:text-2xl text-[#fffaf0] tracking-wide">
                    {ui.homeCompTitle}
                  </h2>
                  <p className="text-xs sm:text-sm text-amber-100 font-medium max-w-xs">
                    {ui.homeCompDesc}
                  </p>
                </div>
              </button>

              {/* Personal Best Card */}
              <div className="w-full max-w-md bg-[#f3ebd9] border-2 border-[#3a2312]/40 rounded-2xl px-4 py-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-100 border border-[#d97c27] flex items-center justify-center text-[#b45309]">
                    <BarChart3 className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-[#8c5a2b] font-cinzel">
                      {ui.bestScoreLabel}
                    </div>
                    <div className="text-sm sm:text-base font-black text-[#3a2312] font-mono">
                      {stats.bestScore > 0 ? `${stats.bestScore.toLocaleString()} pts` : '—'}
                      {stats.bestTotal > 0 && (
                        <span className="text-xs font-bold text-[#2d6a4f] ms-2">
                          ({stats.bestCorrect}/{stats.bestTotal})
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => switchTab('leaderboard')}
                  className="px-3 py-1.5 rounded-xl bg-[#3a2312] hover:bg-[#52321a] text-amber-200 font-cinzel font-bold text-xs cursor-pointer transition-colors shrink-0"
                >
                  {ui.seeRanking}
                </button>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* TAB 2 : TRAINING (Colored Theme Ribbons OR Questions) */}
          {/* ===================================================== */}
          {activeTab === 'training' && !selectedTheme && (
            <div className="p-4 sm:p-5 flex flex-col gap-2.5">
              <div className="text-center mb-1">
                <h2 className="inline-block px-4 py-1 rounded-full bg-[#2b180b]/85 border border-amber-400/40 font-cinzel font-black text-sm sm:text-base text-amber-100 uppercase tracking-wider shadow-sm">
                  {ui.chooseTheme}
                </h2>
              </div>

              {/* All Questions Ribbon */}
              <button
                onClick={() => openTheme('__ALL__')}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#3a2312] via-[#5c361a] to-[#3a2312] text-amber-200 border-2 border-[#d97c27] shadow-[0_4px_0_#241409] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-between"
              >
                <span className="font-cinzel font-black text-sm sm:text-base tracking-wide">
                  {ui.allThemes}
                </span>
                <span className="px-2.5 py-0.5 rounded-lg bg-black/30 text-amber-300 font-mono text-xs font-bold">
                  {localCompletedIds.length}/{quizzes.length}
                </span>
              </button>

              {/* Category Colored Ribbons */}
              {categories.map((cat, idx) => {
                const style = RIBBON_PALETTE[idx % RIBBON_PALETTE.length];
                return (
                  <button
                    key={cat.name}
                    onClick={() => openTheme(cat.name)}
                    className={`w-full py-3 px-4 rounded-2xl bg-gradient-to-r ${style} border-2 shadow-[0_3px_0_rgba(58,35,18,0.6)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-between gap-2`}
                  >
                    <span className="font-cinzel font-black text-xs sm:text-sm tracking-wide text-start truncate">
                      {cat.name}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg bg-black/25 font-mono text-[11px] font-bold shrink-0">
                      {cat.completedCount}/{cat.items.length}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* STEP 2B : DIFFICULTY PICKER (Débutant / Intermédiaire / Expert / Toutes) */}
          {activeTab === 'training' && selectedTheme && !selectedDiff && (
            <div className="p-5 sm:p-6 flex flex-col items-center justify-center min-h-full gap-4">
              <div className="w-full flex items-center justify-between">
                <button
                  onClick={() => {
                    soundManager.playSelect();
                    setSelectedTheme(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-[#ebdfc8] hover:bg-[#dfceb3] border border-[#3a2312] text-[#3a2312] text-xs font-bold font-cinzel cursor-pointer"
                >
                  {ui.backToThemes}
                </button>
                <span className="px-3.5 py-1 rounded-xl bg-[#3a2312] text-amber-200 font-cinzel font-black text-xs sm:text-sm tracking-wide">
                  {selectedTheme === '__ALL__' ? ui.allThemes : selectedTheme}
                </span>
              </div>

              <h3 className="font-cinzel font-black text-base text-[#3a2312] uppercase tracking-wider mt-1">
                {ui.chooseLevel}
              </h3>

              <div className="w-full max-w-md flex flex-col gap-3">
                {(
                  [
                    { id: 'facile', label: ui.diffEasy, count: themePool.filter((q) => q.difficulty === 'facile').length, style: 'from-[#2d6a4f] to-[#1b4332] text-white border-[#0f291e]' },
                    { id: 'moyen', label: ui.diffMedium, count: themePool.filter((q) => q.difficulty === 'moyen').length, style: 'from-[#0e7490] to-[#155e75] text-white border-[#083344]' },
                    { id: 'difficile', label: ui.diffHard, count: themePool.filter((q) => q.difficulty === 'difficile').length, style: 'from-[#9f1239] to-[#881337] text-white border-[#4c0519]' },
                    { id: 'all', label: ui.diffAll, count: themePool.length, style: 'from-[#d97c27] to-[#b45309] text-white border-[#5c2706]' },
                  ] as const
                )
                  .filter((lvl) => lvl.id === 'all' || lvl.count > 0)
                  .map((lvl) => (
                    <button
                      key={lvl.id}
                      onClick={() => startTrainingLevel(lvl.id)}
                      className={`w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r ${lvl.style} border-2 shadow-[0_4px_0_rgba(58,35,18,0.65)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-between`}
                    >
                      <span className="font-cinzel font-black text-sm sm:text-base tracking-wide">
                        {lvl.label}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-lg bg-black/25 font-mono text-xs font-bold">
                        {lvl.count}
                      </span>
                    </button>
                  ))}
              </div>
            </div>
          )}

          {/* STEP 2C : ACTIVE TRAINING QUESTION (2x2 Colored Grid + 1-Tap Instant Feedback) */}
          {activeTab === 'training' && selectedTheme && selectedDiff && currentTrainQuiz && (
            <div className="p-4 sm:p-5 flex flex-col gap-3">
              {/* Top Bar: Score circle left + Theme & Difficulty ribbons right (Inspired by shot 7 & 8) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      soundManager.playSelect();
                      setSelectedDiff(null);
                    }}
                    className="px-2.5 py-1 rounded-xl bg-[#ebdfc8] hover:bg-[#dfceb3] border border-[#3a2312] text-[#3a2312] text-[11px] font-bold font-cinzel cursor-pointer"
                  >
                    {ui.backToThemes}
                  </button>
                  <div className="w-11 h-11 rounded-full bg-[#2b180b] border-2 border-[#d97c27] text-amber-300 font-mono font-black text-xs flex items-center justify-center shadow-sm">
                    {trainScoreCount}/{trainingPool.length}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className="px-2.5 py-0.5 rounded-lg bg-gradient-to-r from-[#d97c27] to-[#b45309] text-white font-cinzel font-black text-[10px] uppercase tracking-wider shadow-xs">
                    {currentTrainQuiz.category}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-lg bg-[#3a2312] text-amber-200 font-cinzel font-bold text-[10px] uppercase tracking-wider">
                    {selectedDiff === 'facile' ? ui.diffEasy : selectedDiff === 'moyen' ? ui.diffMedium : selectedDiff === 'difficile' ? ui.diffHard : ui.diffAll}
                  </span>
                </div>
              </div>

              {/* Status pill EXACT! / PAS TOUT À FAIT! */}
              {hasSubmitted && (
                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-xl font-cinzel font-black text-xs uppercase tracking-wider shadow-xs ${
                      isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                    }`}
                  >
                    {isCorrect ? ui.exactBadge : ui.wrongBadge}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#2b180b]/90 border border-amber-400/40 text-[11px] font-black text-amber-200 font-cinzel shadow-xs">
                    {ui.questionOf(trainIdx + 1, trainingPool.length)}
                  </span>
                </div>
              )}

              {/* Question Card */}
              <div className="bg-[#f3ebd9]/95 border-2 border-[#3a2312] rounded-2xl p-4 shadow-md text-center relative">
                {!hasSubmitted && (
                  <span className="inline-block mb-1.5 px-3 py-0.5 rounded-full bg-[#3a2312] text-amber-200 font-cinzel font-black text-[10px] tracking-wider uppercase">
                    {ui.questionOf(trainIdx + 1, trainingPool.length)}
                  </span>
                )}
                <h3 className="font-cinzel font-black text-sm sm:text-base text-[#3a2312] leading-snug">
                  {currentTrainQuiz.question}
                </h3>
                {currentTrainQuiz.arabic && (
                  <p className="mt-2 text-center font-amiri text-lg sm:text-xl text-[#8c5a2b] bg-[#fbf7ee] py-1.5 px-3 rounded-xl border border-[#d2be9f]">
                    {currentTrainQuiz.arabic}
                  </p>
                )}
              </div>

              {/* 2x2 Colored Answer Grid (when unanswered) OR Clean Result Card (when answered) */}
              {!hasSubmitted ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {shuffledTrainOptions.map(({ text, origIdx }, displayIdx) => {
                    const tileColors = [
                      'bg-[#1e6091] hover:bg-[#184e77] text-white border-[#0c2d48]',
                      'bg-[#d97c27] hover:bg-[#c46a1c] text-white border-[#6e350d]',
                      'bg-[#2d6a4f] hover:bg-[#23543e] text-white border-[#0f291e]',
                      'bg-[#7c3aed] hover:bg-[#6d28d9] text-white border-[#3b0764]',
                    ];
                    const style = tileColors[displayIdx % tileColors.length];
                    return (
                      <button
                        key={origIdx}
                        onClick={() => handleTrainAnswerTap(origIdx)}
                        className={`w-full p-3.5 rounded-2xl border-2 font-bold text-xs sm:text-sm text-center shadow-[0_3px_0_rgba(0,0,0,0.35)] hover:-translate-y-0.5 active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center min-h-[58px] leading-snug ${style}`}
                      >
                        {text}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col gap-2.5 animate-in fade-in duration-150">
                  {/* Correct answer highlight bar (like screenshot 8) */}
                  <div className="w-full py-3 px-4 rounded-2xl bg-emerald-600 text-white border-2 border-emerald-800 font-bold text-xs sm:text-sm text-center shadow-sm flex items-center justify-center gap-2">
                    <CheckCircle className="w-4 h-4 shrink-0" />
                    <span>{currentTrainQuiz.options[currentTrainQuiz.correctIndex]}</span>
                  </div>

                  {/* Explanation & Cited Source */}
                  <div className="bg-[#f3ebd9] border-2 border-[#3a2312]/40 rounded-2xl p-3.5 flex flex-col gap-1.5 text-center">
                    <p className="text-xs text-[#3a2312] font-medium leading-relaxed">
                      {currentTrainQuiz.explanation}
                    </p>
                    {currentTrainQuiz.hadithOrQuranRef && (
                      <p className="text-[11px] font-black text-[#1b4332] bg-emerald-100/90 px-3 py-1 rounded-xl border border-emerald-300">
                        {currentTrainQuiz.hadithOrQuranRef}
                      </p>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={handleTrainNext}
                    className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#d97c27] to-[#b45309] hover:from-[#e68a32] hover:to-[#c4600f] text-white font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#3a2312] shadow-[0_3px_0_#3a2312] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{trainIdx < trainingPool.length - 1 ? ui.next : ui.backToThemes}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ===================================================== */}
          {/* TAB 3 : COMPETITION (Setup / Timed 90s / Results)     */}
          {/* ===================================================== */}
          {activeTab === 'competition' && compPhase === 'setup' && (
            <div className="p-5 sm:p-6 flex flex-col items-center gap-4">
              <div className="px-5 py-1.5 rounded-2xl bg-gradient-to-r from-[#d97c27] to-[#b45309] text-white font-cinzel font-black text-base sm:text-lg tracking-wider border-2 border-[#3a2312] shadow-md">
                {ui.compHeader}
              </div>

              {/* Nickname input + Launch button (Inspired by screenshot 5) */}
              <div className="w-full max-w-md flex flex-col gap-1.5">
                <div className="flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <User className="w-4 h-4 text-[#8c5a2b] absolute top-1/2 -translate-y-1/2 start-3.5 pointer-events-none" />
                    <input
                      type="text"
                      maxLength={20}
                      value={pseudoInput}
                      onChange={(e) => {
                        setPseudoInput(e.target.value);
                        if (pseudoError) setPseudoError(null);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') startCompetition();
                      }}
                      placeholder={ui.pseudoPlaceholder}
                      className="w-full ps-10 pe-3 py-3 rounded-2xl bg-white border-2 border-[#3a2312] text-[#3a2312] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 shadow-inner"
                    />
                  </div>
                  <button
                    onClick={startCompetition}
                    className="px-5 py-3 rounded-2xl bg-gradient-to-b from-[#2d6a4f] to-[#1b4332] hover:from-[#387f5e] hover:to-[#245840] text-white font-cinzel font-black text-xs sm:text-sm border-2 border-[#1b4332] shadow-[0_3px_0_#0f291e] active:translate-y-0.5 cursor-pointer flex items-center gap-1.5 shrink-0"
                  >
                    <Play className="w-4 h-4 fill-current" />
                    <span className="hidden xs:inline">{ui.startComp}</span>
                  </button>
                </div>
                {pseudoError && (
                  <p className="text-xs font-bold text-red-700 px-2">{pseudoError}</p>
                )}
              </div>

              {/* Rules Box (Inspired by screenshot 5) */}
              <div className="w-full max-w-md bg-[#f3ebd9] border-2 border-[#3a2312] rounded-3xl p-4 sm:p-5 shadow-inner flex flex-col items-center text-center gap-2.5">
                <span className="px-3.5 py-0.5 rounded-full bg-[#3a2312] text-amber-200 font-cinzel font-black text-xs tracking-widest uppercase">
                  {ui.rulesTitle}
                </span>
                <p className="text-xs sm:text-sm font-bold text-[#3a2312] leading-relaxed">
                  {ui.rule1}
                </p>
                <p className="text-xs sm:text-sm font-bold text-[#1b4332] bg-emerald-100/80 px-3 py-1.5 rounded-xl border border-emerald-300 w-full">
                  {ui.rule2}
                </p>
                <p className="text-xs sm:text-sm font-bold text-red-900 bg-red-100/80 px-3 py-1.5 rounded-xl border border-red-300 w-full">
                  {ui.rule3}
                </p>
                <p className="text-xs sm:text-sm font-black text-[#8c5a2b] font-cinzel">
                  {ui.rule4}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'competition' && compPhase === 'playing' && currentCompQuiz && (
            <div className="p-4 sm:p-5 flex flex-col gap-3">
              {/* Live HUD: Score + Flash left, Circular SVG Timer right (Inspired by reference video) */}
              <div className="flex items-center justify-between gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 bg-[#2b180b]/90 text-amber-200 px-3.5 py-1.5 rounded-2xl border-2 border-[#d97c27] shadow-md">
                    <span className="font-mono font-black text-lg text-amber-300">{compScore.toLocaleString()}</span>
                    <span className="text-[11px] font-mono text-emerald-300 bg-emerald-950/70 px-1.5 py-0.5 rounded-md">
                      {compCorrect}/{compTotal}
                    </span>
                    {compCombo >= 2 && (
                      <span className="flex items-center gap-0.5 text-xs font-black text-orange-300">
                        <Flame className="w-3.5 h-3.5 fill-orange-400" />x{compCombo}
                      </span>
                    )}
                  </div>
                  {compFeedback && (
                    <span
                      className={`inline-flex items-center self-start px-3 py-0.5 rounded-xl font-cinzel font-black text-xs shadow-md animate-in zoom-in-95 duration-150 ${
                        compFeedback.isRight ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {compFeedback.isRight ? `${ui.exactBadge} +${compFeedback.delta}` : `${ui.wrongBadge} ${compFeedback.delta}`}
                    </span>
                  )}
                </div>

                {/* Circular SVG Countdown Timer (2:00) */}
                <div className={`relative w-16 h-16 flex items-center justify-center rounded-full bg-[#2b180b]/90 shadow-lg border border-amber-400/30 ${timeLeft <= 20 ? 'animate-pulse' : ''}`}>
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 56 56">
                    <circle cx="28" cy="28" r={circleRadius} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="4.5" />
                    <circle
                      cx="28"
                      cy="28"
                      r={circleRadius}
                      fill="none"
                      stroke={timeLeft <= 20 ? '#ef4444' : timeLeft <= 45 ? '#f59e0b' : '#22c55e'}
                      strokeWidth="4.5"
                      strokeLinecap="round"
                      strokeDasharray={circleCircumference}
                      strokeDashoffset={circleOffset}
                      className="transition-all duration-1000 linear"
                    />
                  </svg>
                  <span className={`absolute font-mono font-black text-sm ${timeLeft <= 20 ? 'text-red-300' : 'text-amber-100'}`}>
                    {formatClock(timeLeft)}
                  </span>
                </div>
              </div>

              {/* Translucent Question Card over Pixel-Art Courtyard */}
              <div className="bg-[#fbf7ee]/92 backdrop-blur-sm border-2 border-[#3a2312] rounded-2xl p-4 shadow-lg text-center">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#3a2312] text-amber-200 text-[10px] font-black uppercase tracking-wider font-cinzel">
                  {currentCompQuiz.category}
                </span>
                <h3 className="font-cinzel font-black text-sm sm:text-base text-[#3a2312] leading-snug mt-1.5">
                  {currentCompQuiz.question}
                </h3>
                {currentCompQuiz.arabic && (
                  <p className="mt-2 text-center font-amiri text-lg text-[#8c5a2b] bg-[#f3ebd9]/90 py-1 px-3 rounded-xl border border-[#d2be9f]">
                    {currentCompQuiz.arabic}
                  </p>
                )}
              </div>

              {/* 2x2 Colored Quick-Tap Grid (1-tap instant!) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {shuffledCompOptions.map(({ text, origIdx }, displayIdx) => {
                  const isCorrectOpt = compFeedback && origIdx === currentCompQuiz.correctIndex;
                  const isWrongChosen = compFeedback && !compFeedback.isRight && compFeedback.chosenOrigIdx === origIdx;
                  const tileColors = [
                    'bg-[#1e6091] hover:bg-[#184e77] text-white border-[#0c2d48]',
                    'bg-[#d97c27] hover:bg-[#c46a1c] text-white border-[#6e350d]',
                    'bg-[#2d6a4f] hover:bg-[#23543e] text-white border-[#0f291e]',
                    'bg-[#7c3aed] hover:bg-[#6d28d9] text-white border-[#3b0764]',
                  ];
                  const baseStyle = tileColors[displayIdx % tileColors.length];
                  return (
                    <button
                      key={`${compCursor}_${origIdx}`}
                      disabled={Boolean(compFeedback)}
                      onClick={() => handleCompAnswer(origIdx)}
                      className={`w-full p-3.5 rounded-2xl border-2 text-center font-bold text-xs sm:text-sm transition-all flex items-center justify-center min-h-[58px] leading-snug shadow-[0_3px_0_rgba(0,0,0,0.35)] cursor-pointer active:scale-[0.98] ${
                        isCorrectOpt
                          ? 'bg-emerald-500 border-emerald-700 text-white scale-[1.02]'
                          : isWrongChosen
                          ? 'bg-red-600 border-red-800 text-white'
                          : baseStyle
                      }`}
                    >
                      {text}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'competition' && compPhase === 'finished' && (
            <div className="p-6 flex flex-col items-center justify-center min-h-full text-center gap-4">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-amber-300 to-amber-600 border-3 border-[#3a2312] flex items-center justify-center text-[#2b180b] shadow-lg">
                <Trophy className="w-8 h-8" />
              </div>

              <div>
                <h2 className="font-cinzel font-black text-2xl text-[#3a2312]">{ui.timeUp}</h2>
                {isNewRecord && (
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-emerald-600 text-white font-cinzel font-black text-xs tracking-wider animate-bounce">
                    🏆 {ui.newRecord}
                  </span>
                )}
              </div>

              <div className="w-full max-w-sm grid grid-cols-2 gap-3">
                <div className="bg-[#f3ebd9] border-2 border-[#3a2312] rounded-2xl p-3.5">
                  <div className="text-[10px] font-black uppercase text-[#8c5a2b] font-cinzel">{ui.scoreLabel}</div>
                  <div className="text-2xl font-black font-mono text-[#d97c27] mt-0.5">
                    {compScore.toLocaleString()}
                  </div>
                </div>
                <div className="bg-[#f3ebd9] border-2 border-[#3a2312] rounded-2xl p-3.5">
                  <div className="text-[10px] font-black uppercase text-[#8c5a2b] font-cinzel">{ui.noteLabel}</div>
                  <div className="text-2xl font-black font-mono text-[#2d6a4f] mt-0.5">
                    {compCorrect}/{compTotal}
                  </div>
                </div>
              </div>

              <div className="w-full max-w-sm flex flex-col gap-2.5 mt-1">
                <button
                  onClick={startCompetition}
                  className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-[#d97c27] to-[#b45309] hover:from-[#e68a32] hover:to-[#c4600f] text-white font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#3a2312] shadow-[0_4px_0_#3a2312] active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>{ui.playAgain}</span>
                </button>
                <button
                  onClick={() => switchTab('leaderboard')}
                  className="w-full py-3 rounded-2xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#1b4332] cursor-pointer flex items-center justify-center gap-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>{ui.seeRanking}</span>
                </button>
              </div>
            </div>
          )}

          {/* ===================================================== */}
          {/* TAB 4 : LEADERBOARD (TOP 100 — Inspired by shot 1)    */}
          {/* ===================================================== */}
          {activeTab === 'leaderboard' && (
            <div className="p-4 sm:p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-[#3a2312] to-[#5c361a] text-amber-200 font-cinzel font-black text-sm tracking-widest border border-[#d97c27]">
                    {ui.topTitle}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#ebdfc8] text-[#6b4724] border border-[#d2be9f]">
                    {isBoardOnline ? ui.onlineBadge : ui.localBadge}
                  </span>
                </div>
                <button
                  onClick={() => refreshLeaderboard()}
                  disabled={isBoardLoading}
                  className="p-2 rounded-xl bg-[#ebdfc8] hover:bg-[#dfceb3] border border-[#3a2312] text-[#3a2312] cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBoardLoading ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Ranking Table */}
              <div className="rounded-2xl border-2 border-[#3a2312] overflow-hidden shadow-md bg-[#fbf7ee]">
                <div className="grid grid-cols-12 bg-[#3a2312] text-amber-200 font-cinzel font-black text-[11px] uppercase tracking-wider py-2.5 px-3">
                  <div className="col-span-2 text-center">{ui.colRank}</div>
                  <div className="col-span-5">{ui.colPseudo}</div>
                  <div className="col-span-3 text-end">{ui.colScore}</div>
                  <div className="col-span-2 text-end">{ui.colNote}</div>
                </div>

                <div className="divide-y divide-[#e2d4bc]">
                  {leaderboard.map((entry, idx) => {
                    const rank = idx + 1;
                    const isTop1 = rank === 1;
                    const isTop2 = rank === 2;
                    const isTop3 = rank === 3;
                    return (
                      <div
                        key={entry.id}
                        className={`grid grid-cols-12 items-center py-2.5 px-3 text-xs sm:text-sm font-bold ${
                          entry.isCurrentUser
                            ? 'bg-amber-200/80 text-[#2b180b] font-black'
                            : idx % 2 === 0
                            ? 'bg-[#fbf7ee] text-[#3a2312]'
                            : 'bg-[#f3ebd9]/80 text-[#3a2312]'
                        }`}
                      >
                        <div className="col-span-2 text-center font-mono font-black">
                          {isTop1 ? '🥇' : isTop2 ? '🥈' : isTop3 ? '🥉' : rank}
                        </div>
                        <div className="col-span-5 truncate pe-2 flex items-center gap-1.5">
                          <span className={isTop1 ? 'text-[#b45309] font-black' : ''}>{entry.pseudo}</span>
                        </div>
                        <div className="col-span-3 text-end font-mono font-black text-[#b45309]">
                          {entry.score.toLocaleString()}
                        </div>
                        <div className="col-span-2 text-end font-mono text-[11px] text-[#2d6a4f]">
                          {entry.correct}/{entry.total}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={() => {
                  setCompPhase('setup');
                  switchTab('competition');
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#d97c27] to-[#b45309] text-white font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider border-2 border-[#3a2312] shadow-[0_3px_0_#3a2312] cursor-pointer"
              >
                {ui.beatScoreCta}
              </button>
            </div>
          )}

          {/* ===================================================== */}
          {/* TAB 5 : STATS & SETTINGS (Inspired by screenshot 4)   */}
          {/* ===================================================== */}
          {activeTab === 'info' && (
            <div className="p-5 flex flex-col gap-4">
              <h2 className="font-cinzel font-black text-center text-base sm:text-lg text-[#3a2312] uppercase tracking-wider">
                {ui.infoTitle}
              </h2>

              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="bg-[#f3ebd9] border-2 border-[#3a2312] rounded-2xl p-3">
                  <div className="text-[10px] font-black text-[#8c5a2b] font-cinzel uppercase">{ui.scoreLabel}</div>
                  <div className="text-lg font-black font-mono text-[#d97c27] mt-0.5">{stats.bestScore.toLocaleString()}</div>
                </div>
                <div className="bg-[#f3ebd9] border-2 border-[#3a2312] rounded-2xl p-3">
                  <div className="text-[10px] font-black text-[#8c5a2b] font-cinzel uppercase">{ui.gamesPlayed}</div>
                  <div className="text-lg font-black font-mono text-[#3a2312] mt-0.5">{stats.gamesPlayed}</div>
                </div>
                <div className="bg-[#f3ebd9] border-2 border-[#3a2312] rounded-2xl p-3">
                  <div className="text-[10px] font-black text-[#8c5a2b] font-cinzel uppercase">{ui.learnedQuizzes}</div>
                  <div className="text-lg font-black font-mono text-[#2d6a4f] mt-0.5">
                    {localCompletedIds.length}/{quizzes.length}
                  </div>
                </div>
              </div>

              <div className="bg-[#f3ebd9] border-2 border-[#3a2312] rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-xs font-black text-[#3a2312] font-cinzel">{ui.yourPseudo}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={20}
                    value={pseudoInput}
                    onChange={(e) => setPseudoInput(e.target.value)}
                    placeholder={ui.pseudoPlaceholder}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border-2 border-[#3a2312] text-sm font-bold text-[#3a2312]"
                  />
                  <button
                    onClick={() => {
                      const clean = pseudoInput.trim();
                      if (clean.length >= 2) {
                        savePseudo(clean);
                        setStats((s) => ({ ...s, pseudo: clean }));
                        setPseudoSavedFeedback(true);
                        soundManager.playSelect();
                        setTimeout(() => setPseudoSavedFeedback(false), 1800);
                      }
                    }}
                    className="px-4 py-2 rounded-xl bg-[#2d6a4f] text-white font-cinzel font-black text-xs cursor-pointer"
                  >
                    {pseudoSavedFeedback ? '✓' : ui.savePseudoBtn}
                  </button>
                </div>
              </div>

              <div className="bg-[#f3ebd9] border-2 border-[#3a2312]/50 rounded-2xl p-4 text-xs text-[#5c3d1e] flex flex-col gap-1.5 font-semibold">
                <div className="font-cinzel font-black text-[#3a2312] uppercase">{ui.rulesTitle}</div>
                <p>• {ui.rule1}</p>
                <p>• {ui.rule2}</p>
                <p>• {ui.rule3}</p>
              </div>

              {/* Proposer une question / Signaler une erreur (Firestore quiz_feedback) */}
              <div className="bg-[#f3ebd9]/95 border-2 border-[#3a2312] rounded-2xl p-4 flex flex-col gap-2">
                <label className="text-xs font-black text-[#3a2312] font-cinzel">{ui.proposeTitle}</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    maxLength={400}
                    value={feedbackMsg}
                    onChange={(e) => setFeedbackMsg(e.target.value)}
                    placeholder={ui.proposePlaceholder}
                    className="flex-1 px-3 py-2 rounded-xl bg-white border-2 border-[#3a2312] text-xs sm:text-sm font-medium text-[#3a2312]"
                  />
                  <button
                    onClick={async () => {
                      if (!feedbackMsg.trim()) return;
                      soundManager.playSelect();
                      await submitQuizFeedback({
                        type: 'suggestion',
                        message: feedbackMsg,
                        pseudo: stats.pseudo,
                        lang: language,
                      });
                      setFeedbackMsg('');
                      setFeedbackSent(true);
                      setTimeout(() => setFeedbackSent(false), 3000);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-[#d97c27] hover:bg-[#b45309] text-white font-cinzel font-black text-xs cursor-pointer flex items-center gap-1 shrink-0"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{ui.sendBtn}</span>
                  </button>
                </div>
                {feedbackSent && (
                  <p className="text-xs font-bold text-[#2d6a4f]">{ui.sentThanks}</p>
                )}
              </div>

              <button
                onClick={() => {
                  soundManager.playSelect();
                  speechManager.stop();
                  onClose();
                }}
                className="w-full py-3 rounded-2xl bg-[#3a2312] hover:bg-[#52321a] text-amber-200 font-cinzel font-black text-xs uppercase tracking-wider cursor-pointer"
              >
                {ui.backToGame}
              </button>
            </div>
          )}
          </div>
        </div>

        {/* BOTTOM 5-TAB QUIZ NAVIGATION BAR (Inspired by QuizzIslam bottom bar, NOUR parchment style) */}
        <div className="bg-[#f3ebd9] border-t-2 border-[#3a2312] px-2 py-1.5 grid grid-cols-5 gap-1 shrink-0">
          {(
            [
              { id: 'home', label: ui.tabHome, icon: Home },
              { id: 'training', label: ui.tabTrain, icon: BookOpen },
              { id: 'competition', label: ui.tabComp, icon: Trophy },
              { id: 'leaderboard', label: ui.tabRank, icon: BarChart3 },
              { id: 'info', label: ui.tabInfo, icon: SlidersHorizontal },
            ] as const
          ).map(({ id, label, icon: Icon }) => {
            const isActive = activeTab === id;
            return (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#3a2312] text-amber-200 shadow-xs'
                    : 'text-[#6b4724] hover:bg-[#e5d7bd]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : ''}`} />
                <span className="text-[10px] font-cinzel font-bold mt-0.5 truncate max-w-full">
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
