import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { getChapter1Scenes, getChapter1Quizzes, getChapter1RealActions, getDay2PoteauBeats } from './data/chapter1';
import { CHAPTER_2_SCENES, CHAPTER_2_QUIZZES, CHAPTER_2_REAL_ACTIONS } from './data/chapter2';
import { CHAPTER_3_SCENES, CHAPTER_3_QUIZZES, CHAPTER_3_REAL_ACTIONS } from './data/chapter3';
import { CHAPTER_4_SCENES, CHAPTER_4_QUIZZES, CHAPTER_4_REAL_ACTIONS } from './data/chapter4';
import { CHAPTER_5_SCENES, CHAPTER_5_QUIZZES, CHAPTER_5_REAL_ACTIONS } from './data/chapter5';
import { useLanguage } from './context/LanguageContext';
import { useTheme } from './context/ThemeContext';
import { KNOWLEDGE_ITEMS } from './data/knowledge';
import { INITIAL_STATS, INITIAL_QUESTS, INITIAL_BADGES, INITIAL_EQUIPMENT, INITIAL_APPEARANCE } from './data/rpgData';
import { INITIAL_CHARACTER_TRAITS } from './utils/characterTraits';
import { getLocalizedScene, getLocalizedHabitMessage } from './utils/narrativeI18n';
import { PlayerProgress, DialogueChoice, TravelerAppearance, Scene, CharacterTraits } from './types';
import { PixelioHeader } from './components/PixelioHeader';
import { BottomNavBar, TabType } from './components/BottomNavBar';
import { HomeScreen } from './components/screens/HomeScreen';
import { TravelMapScreen } from './components/screens/TravelMapScreen';
import { QuestsScreen } from './components/screens/QuestsScreen';
import { InventoryScreen } from './components/screens/InventoryScreen';
import { ProfileScreen } from './components/screens/ProfileScreen';
import { SceneBackground } from './components/SceneBackground';
import { StoryShotOverlay } from './components/StoryShotOverlay';
import { DialogueBox } from './components/DialogueBox';
import { QuizModal } from './components/QuizModal';
import { IslamicQuizModal } from './components/IslamicQuizModal';
import { RealActionModal } from './components/RealActionModal';
import { ClimaxCombat } from './components/ClimaxCombat';
import { KnowledgeModal } from './components/KnowledgeModal';
import { HistoryModal } from './components/HistoryModal';
import { ChapterEnd } from './components/ChapterEnd';
import { AssetManagerModal } from './components/AssetManagerModal';
import { SceneTransitionModal } from './components/SceneTransitionModal';
import { AldwinGuideModal } from './components/AldwinGuideModal';
import { ContemplationOverlay } from './components/ContemplationOverlay';
import { SplashScreen } from './components/SplashScreen';
import { IntroPrologue } from './components/IntroPrologue';
import { PauseMenuModal } from './components/PauseMenuModal';
import { XpHarvestOverlay } from './components/XpHarvestOverlay';
import { SupportModal } from './components/SupportModal';
// Chargée à la demande : les joueurs qui arrivent sur /play ne téléchargent pas la landing
const LandingPage = lazy(() => import('./components/landing/LandingPage').then((m) => ({ default: m.LandingPage })));
import { soundManager } from './utils/audio';
import { speechManager } from './utils/speech';
import { refreshDailyReminder } from './utils/notifications';
import { loadCustomAssets, CustomAssetsConfig, PIXEL_ASSETS, DEFAULT_ASSETS } from './utils/assets';
import { getSupporterStatus, setSupporterStatus, SUPPORTER_EVENT_NAME, SUPPORT_ENABLED } from './utils/stripe';
import { Sparkles, Play, Compass, Shield, ChevronLeft, ChevronRight, BookOpen, ScrollText, MessageSquareQuote, FastForward, Flame } from 'lucide-react';
import { DOCUMENT_TITLES } from './i18n/uiExtras';
import {
  submitStoryXpScore,
  loadSavedPseudo
} from './utils/quizLeaderboard';
import {
  trackScreenView,
  trackSceneView,
  trackQuizCompleted,
  trackRealActionValidated,
  trackSceneCompleted,
  trackQuestToggled,
  trackGameStarted,
  trackStreakUpdated,
  trackEvent
} from './utils/analytics';
import { Capacitor } from '@capacitor/core';
import { WEB_ONLY_FEATURES_ENABLED } from './utils/platform';

const STORAGE_KEY = 'nour_pixelio_rpg_progress_v2';

const getTodayDateString = (): string => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getDaysDifference = (date1: string, date2: string): number => {
  const d1 = new Date(date1).getTime();
  const d2 = new Date(date2).getTime();
  const diffTime = Math.abs(d2 - d1);
  return Math.round(diffTime / (1000 * 60 * 60 * 24));
};

const INITIAL_PROGRESS: PlayerProgress = {
  currentSceneIndex: 0,
  currentBeatIndex: 0,
  xp: 0,
  level: 1,
  lightPercent: 0,
  streakDays: 1,
  bestStreakDays: 1,
  stats: INITIAL_STATS,
  quests: INITIAL_QUESTS,
  badges: INITIAL_BADGES,
  equipment: INITIAL_EQUIPMENT,
  appearance: INITIAL_APPEARANCE,
  completedScenes: [],
  completedRealActions: [],
  completedQuizzes: [],
  completedIslamicQuizIds: [],
  unlockedKnowledgeIds: [],
  soundEnabled: true,
  history: [],
  
  // Life-RPG initial values
  levelIlm: 1,
  levelAkhlaq: 1,
  levelSabr: 1,
  levelShukr: 1,
  completedLifeQuests: [],
  unlockedCodexEntries: [],
  waswasXp: 0,
  dayNumber: 1,
  lastActiveDate: getTodayDateString(),
  traits: INITIAL_CHARACTER_TRAITS,
  habitLog: []
};

export default function App() {
  const { isParchment } = useTheme();
  const [streakCelebration, setStreakCelebration] = useState<number | null>(null);
  const [habitToast, setHabitToast] = useState<string | null>(null);

  const [progress, setProgress] = useState<PlayerProgress>(() => {
    const today = getTodayDateString();
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          let currentStreak = parsed.streakDays || 1;
          let bestStreak = parsed.bestStreakDays || currentStreak;
          let dayNum = parsed.dayNumber || 1;
          let sceneIdx = parsed.currentSceneIndex ?? 0;
          let beatIdx = parsed.currentBeatIndex ?? 0;
          let quests = parsed.quests || INITIAL_PROGRESS.quests;

          if (parsed.lastActiveDate && parsed.lastActiveDate !== today) {
            const daysDiff = getDaysDifference(parsed.lastActiveDate, today);

            if (daysDiff === 1) {
              currentStreak += 1;
              if (currentStreak > bestStreak) {
                bestStreak = currentStreak;
              }
            } else if (daysDiff > 1) {
              currentStreak = 1;
            }
          }

          // Strictly clamp non-supporters to Chapter 1 scenes and chapter selection
          const userIsSupporter = getSupporterStatus();
          // We will not reset the sceneIdx aggressively here because it can cause data loss for offline players.
          // Instead, gameplay gates will naturally block them from progressing.

          return {
            ...INITIAL_PROGRESS,
            ...parsed,
            currentSceneIndex: sceneIdx,
            currentBeatIndex: beatIdx,
            selectedChapter: userIsSupporter ? (parsed.selectedChapter || 1) : 1,
            streakDays: currentStreak,
            bestStreakDays: bestStreak,
            quests,
            stats: { ...INITIAL_STATS, ...(parsed.stats || {}) },
            traits: { ...INITIAL_CHARACTER_TRAITS, ...(parsed.traits || {}) },
            habitLog: parsed.habitLog || [],
            appearance: { ...INITIAL_APPEARANCE, ...(parsed.appearance || {}) },
            dayNumber: dayNum,
            lastActiveDate: today
          };
        } catch (e) {
          console.error('Failed to parse saved progress', e);
        }
      }
    }
    return INITIAL_PROGRESS;
  });

  const getInitialViewMode = (): 'landing' | 'game' => {
    if (typeof window === 'undefined') return 'landing';

    // 1. Native Android APK (Capacitor) -> ALWAYS boot directly into the Game
    if (Capacitor.isNativePlatform() || window.location.protocol === 'capacitor:' || window.location.protocol === 'ionic:') {
      return 'game';
    }

    const path = window.location.pathname.toLowerCase();
    const search = window.location.search.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    // Direct game routes (/play, /jouer, /game, ?play=1, ?game=1, #play, #game)
    if (
      path.startsWith('/play') ||
      path.startsWith('/jouer') ||
      path.startsWith('/game') ||
      search.includes('play') ||
      search.includes('game') ||
      hash === '#play' ||
      hash === '#game'
    ) {
      return 'game';
    }

    // Default to Landing Page for '/' and marketing paths
    return 'landing';
  };

  const [viewMode, setViewMode] = useState<'landing' | 'game'>(getInitialViewMode);
  const [showDoorRetreatModal, setShowDoorRetreatModal] = useState(false);
  const [choiceResetKey, setChoiceResetKey] = useState(0);
  const [bossReadyModal, setBossReadyModal] = useState<{ chapter: number; bossIdx: number } | null>(null);
  const [showWaswasGameOver, setShowWaswasGameOver] = useState(false);
  const promptedBossChaptersRef = useRef<Set<number>>(new Set());

  // Sync with browser navigation (Back / Forward buttons)
  useEffect(() => {
    const handlePopState = () => {
      setViewMode(getInitialViewMode());
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLaunchGame = () => {
    // Transition from Landing Page to Title Screen (SplashScreen)
    setShowSplash(true);
    setViewMode('game');

    if (typeof window !== 'undefined' && !Capacitor.isNativePlatform()) {
      if (!window.location.pathname.startsWith('/play')) {
        window.history.pushState({ view: 'game' }, '', '/play');
      }
    }
  };

  const handleOpenLanding = (scrollToFeedback = false) => {
    setViewMode('landing');

    if (typeof window !== 'undefined' && !Capacitor.isNativePlatform()) {
      if (window.location.pathname !== '/') {
        window.history.pushState({ view: 'landing' }, '', '/');
      }
    }

    if (scrollToFeedback) {
      setTimeout(() => {
        const el = document.getElementById('tester-questionnaire');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const { language, isRtl } = useLanguage();

  useEffect(() => {
    document.title = DOCUMENT_TITLES[language] ?? DOCUMENT_TITLES.fr;
  }, [language]);

  const currentCh1Scenes = getChapter1Scenes(language);
  const currentCh1Quizzes = getChapter1Quizzes(language);
  const currentCh1Actions = getChapter1RealActions(language);
  const currentDay2Beats = getDay2PoteauBeats(language);

  const ALL_SCENES = [...currentCh1Scenes, ...CHAPTER_2_SCENES, ...CHAPTER_3_SCENES, ...CHAPTER_4_SCENES, ...CHAPTER_5_SCENES];
  const ALL_QUIZZES = { ...currentCh1Quizzes, ...CHAPTER_2_QUIZZES, ...CHAPTER_3_QUIZZES, ...CHAPTER_4_QUIZZES, ...CHAPTER_5_QUIZZES };
  const ALL_ACTIONS = { ...currentCh1Actions, ...CHAPTER_2_REAL_ACTIONS, ...CHAPTER_3_REAL_ACTIONS, ...CHAPTER_4_REAL_ACTIONS, ...CHAPTER_5_REAL_ACTIONS };

  const getChapterForSceneId = (id: number): 1 | 2 | 3 | 4 | 5 => {
    if (id >= 40 && id <= 49) return 5;
    if (id >= 30 && id <= 39) return 4;
    if (id === 201 || id === 202 || (id >= 17 && id <= 25)) return 3;
    if (id === 142 || (id >= 10 && id <= 16)) return 2;
    return 1;
  };

  const [showSplash, setShowSplash] = useState(true); // Always show Title Screen when entering game mode
  const [showPauseMenu, setShowPauseMenu] = useState(false); // In-game Pause / Menu overlay
  const [introPrologueChapter, setIntroPrologueChapter] = useState<1 | 2 | 3 | 4 | 5 | null>(null); // Chapter opening cinematic
  const [activeTab, setActiveTab] = useState<TabType>('adventure');
  const [customAssets, setCustomAssets] = useState<CustomAssetsConfig>(() => loadCustomAssets());

  const [showKnowledge, setShowKnowledge] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizCategoryPreference, setQuizCategoryPreference] = useState<string | undefined>(undefined);
  const [showHistory, setShowHistory] = useState(false);
  const [showAssetManager, setShowAssetManager] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [supportModalReason, setSupportModalReason] = useState<'chapter_end' | 'general' | 'profile'>('general');
  const [isSupporter, setIsSupporter] = useState<boolean>(() => getSupporterStatus());

  // Synchronisation réactive de l'état supporter (déblocage via Stripe ou Code Promo)
  useEffect(() => {
    // Check URL parameters for Stripe success return (e.g. ?payment=success, ?supporter=true, ?session_id)
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get('payment') === 'success' ||
        urlParams.get('supporter') === 'true' ||
        urlParams.get('unlocked') === 'true' ||
        urlParams.has('session_id')
      ) {
        setSupporterStatus(true);
        setIsSupporter(true);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    }

    const handleSupporterChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ isSupporter: boolean }>;
      setIsSupporter(customEvent.detail?.isSupporter ?? getSupporterStatus());
    };
    const handleStorageChange = () => {
      setIsSupporter(getSupporterStatus());
    };
    window.addEventListener(SUPPORTER_EVENT_NAME, handleSupporterChange);
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener(SUPPORTER_EVENT_NAME, handleSupporterChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const [aldwinModal, setAldwinModal] = useState<'intro' | 'celebration' | 'scene_unlocked' | null>(null);

  const [sceneTransition, setSceneTransition] = useState<{
    completedScene: Scene;
    nextScene?: Scene;
  } | null>(null);
  const [contemplationState, setContemplationState] = useState<{
    scene: Scene;
    nextScene?: Scene;
    onFinish: () => void;
  } | null>(null);
  const [xpToast, setXpToast] = useState<{ amount: number; reason: string } | null>(null);
  const [waswasToast, setWaswasToast] = useState<{ amount: number; reason?: string; isNegative?: boolean } | null>(null);
  const waswasToastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [harvestOverlay, setHarvestOverlay] = useState<{
    amount: number;
    reason: string;
    startX?: number;
    startY?: number;
  } | null>(null);
  const [climaxStep, setClimaxStep] = useState(0);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    soundManager.setMuted(!progress.soundEnabled);
  }, [progress]);

  // Close any lingering guide modal when entering adventure mode
  useEffect(() => {
    if (activeTab === 'adventure' && aldwinModal) {
      setAldwinModal(null);
    }
  }, [activeTab, aldwinModal]);

  const currentScene = ALL_SCENES[progress.currentSceneIndex] || ALL_SCENES[0];
  const isDay2AtPoteau =
    (progress.dayNumber === 2 || progress.completedScenes.includes(9)) && progress.currentSceneIndex === 1;
  const activeBeats = isDay2AtPoteau ? currentDay2Beats : currentScene.beats;
  const currentBeat = activeBeats[progress.currentBeatIndex] || activeBeats[0];

  // Auto-clamp beat index if scene beat count was reduced
  useEffect(() => {
    if (progress.currentBeatIndex >= activeBeats.length) {
      setProgress((prev) => ({ ...prev, currentBeatIndex: 0 }));
    }
  }, [progress.currentBeatIndex, activeBeats.length]);

  // Track read dialogue beats so returning players can skip them
  useEffect(() => {
    if (!currentBeat) return;
    if (currentBeat.type !== 'dialogue' && currentBeat.type !== 'memory_fragments') return;
    const seen = progress.seenBeats || [];
    if (seen.includes(currentBeat.id)) return;
    setProgress((prev) => ({
      ...prev,
      seenBeats: [...(prev.seenBeats || []), currentBeat.id].slice(-800)
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentBeat?.id]);

  // "Skip already-read replies": index of the first upcoming beat NOT already read
  // (dialogue beats already seen are jumped over, up to the next interactive beat)
  const skipSeenTargetIndex = (() => {
    const flags = progress.narrativeFlags || {};
    const seen = progress.seenBeats || [];
    let idx = progress.currentBeatIndex + 1;
    let skipped = 0;
    while (idx < activeBeats.length) {
      const b = activeBeats[idx];
      // Transparent beats (same rules as advanceBeat)
      if (b.type === 'xp') { idx++; continue; }
      if (b.requiredNarrativeFlag) {
        const { flag, value } = b.requiredNarrativeFlag;
        const cur = flags[flag];
        const matches = value !== undefined ? cur === value : Boolean(cur);
        if (!matches) { idx++; continue; }
      }
      const isDialogue = b.type === 'dialogue' || b.type === 'memory_fragments';
      if (isDialogue && seen.includes(b.id)) { skipped++; idx++; continue; }
      break;
    }
    return skipped > 0 ? idx : null;
  })();

  const canSkipSeen =
    (currentBeat.type === 'dialogue' || currentBeat.type === 'memory_fragments') &&
    (progress.seenBeats || []).includes(currentBeat.id) &&
    skipSeenTargetIndex !== null;

  const handleSkipSeen = () => {
    speechManager.stop();
    if (skipSeenTargetIndex !== null && skipSeenTargetIndex < activeBeats.length) {
      setProgress((prev) => ({ ...prev, currentBeatIndex: skipSeenTargetIndex }));
    } else {
      advanceBeat();
    }
  };

  // Track Streak & Log on mount
  useEffect(() => {
    // Rappel quotidien local (Android uniquement, silencieux sur web)
    refreshDailyReminder();

    trackStreakUpdated(progress.streakDays);
    if (progress.streakDays > 1) {
      setStreakCelebration(progress.streakDays);
      const timer = setTimeout(() => setStreakCelebration(null), 5000);

      // Streak gifts: small XP bonus at day 3 and day 7 (awarded once)
      const STREAK_GIFTS: Record<number, { xp: number; reason: string }> = {
        3: { xp: 30, reason: 'Cadeau — 3 jours de série !' },
        7: { xp: 70, reason: 'Cadeau — 7 jours de série !' }
      };
      const gift = STREAK_GIFTS[progress.streakDays];
      const alreadyGiven = (progress.streakGiftDays || []).includes(progress.streakDays);
      if (gift && !alreadyGiven) {
        triggerXpGain(gift.xp, gift.reason);
        setProgress((prev) => ({
          ...prev,
          streakGiftDays: [...(prev.streakGiftDays || []), prev.streakDays]
        }));
      }

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Track screens in Firebase Analytics
  useEffect(() => {
    if (viewMode === 'landing') {
      trackScreenView('Page de Présentation', 'LandingPage');
      return;
    }

    if (activeTab === 'home') {
      trackScreenView("Chambre d'Othmân (Accueil)", 'HomeScreen');
    } else if (activeTab === 'travel') {
      trackScreenView('Carte du Voyage', 'TravelMapScreen');
    } else if (activeTab === 'quests') {
      trackScreenView('Quêtes & Sagesse', 'QuestsScreen');
    } else if (activeTab === 'inventory') {
      trackScreenView('Inventaire du Voyageur', 'InventoryScreen');
    } else if (activeTab === 'profile') {
      trackScreenView('Profil & Vertus', 'ProfileScreen');
    } else if (activeTab === 'adventure') {
      // Nom d'écran stable entre langues ; titre localisé et langue en paramètres séparés
      trackScreenView(`Scene ${currentScene.id}`, 'AdventureScene', {
        scene_id: currentScene.id,
        displayTitle: `Scène ${currentScene.id} : ${currentScene.title}`
      });
      trackSceneView(currentScene.id, currentScene.title);
    }
  }, [viewMode, activeTab, currentScene?.id, currentScene?.title]);

  useEffect(() => {
    if (showQuiz) {
      trackScreenView('Quiz Islamique (+XP)', 'IslamicQuizModal');
    }
  }, [showQuiz]);

  useEffect(() => {
    if (showKnowledge) {
      trackScreenView('Bibliothèque du Savoir', 'KnowledgeModal');
    }
  }, [showKnowledge]);

  useEffect(() => {
    if (aldwinModal) {
      trackScreenView('Conseils de Noura', 'AldwinGuideModal');
    }
  }, [aldwinModal]);

  const triggerWaswasChange = (amount: number, reason?: string) => {
    if (!amount) return;
    if (amount > 0) {
      soundManager.playWaswasGain();
    } else {
      soundManager.playWaswasDissolve();
    }

    setProgress((prev) => ({
      ...prev,
      waswasXp: Math.min(100, Math.max(0, (prev.waswasXp || 0) + amount))
    }));

    if (waswasToastTimerRef.current) clearTimeout(waswasToastTimerRef.current);
    setWaswasToast({
      amount: Math.abs(amount),
      reason: reason || (amount > 0 ? "Le Waswâs gagne en emprise..." : "L'Ombre se dissipe"),
      isNegative: amount < 0
    });
    waswasToastTimerRef.current = setTimeout(() => {
      setWaswasToast(null);
    }, 4500);
  };

  const lastHandledWaswasBeatRef = useRef<string | null>(null);
  const isInitialBeatMountRef = useRef<boolean>(true);

  // Trigger Waswâs XP change automatically when a dialogue beat carries waswasXpAmount
  useEffect(() => {
    if (!currentBeat || !currentBeat.id) return;
    const beatKey = `${currentScene.id}_${currentBeat.id}_${progress.currentBeatIndex}`;

    // Manage subtle contemplative ambience for peaceful scenes
    if (activeTab === 'home') {
      if (currentScene.backgroundTheme === 'halte_the' || currentScene.backgroundTheme === 'mosquee_ablutions') {
        soundManager.startFountainAmbience();
      } else if (currentScene.backgroundTheme === 'patio_remedes' || currentScene.backgroundTheme === 'verger_amandiers' || currentScene.backgroundTheme === 'epilogue') {
        soundManager.startContemplationAmbience();
      } else {
        soundManager.stopAmbient();
      }
    } else {
      soundManager.stopAmbient();
    }

    // On initial mount, register current beat key without firing so reloading does not penalize
    if (isInitialBeatMountRef.current) {
      isInitialBeatMountRef.current = false;
      lastHandledWaswasBeatRef.current = beatKey;
      return;
    }

    if (lastHandledWaswasBeatRef.current === beatKey) return;
    lastHandledWaswasBeatRef.current = beatKey;

    if (typeof currentBeat.waswasXpAmount === 'number' && currentBeat.waswasXpAmount !== 0) {
      triggerWaswasChange(currentBeat.waswasXpAmount, currentBeat.waswasReason);
    }
  }, [currentScene.id, currentBeat?.id, progress.currentBeatIndex, currentBeat?.waswasXpAmount, currentBeat?.waswasReason]);



  // Ensure currentBeat matches requiredNarrativeFlag; if not, step forward
  useEffect(() => {
    if (currentBeat?.requiredNarrativeFlag) {
      const { flag, value } = currentBeat.requiredNarrativeFlag;
      const currentVal = progress.narrativeFlags?.[flag];
      const matches = value !== undefined ? currentVal === value : Boolean(currentVal);
      if (!matches) {
        advanceBeat();
      }
    }
  }, [currentScene.id, currentBeat?.id, progress.currentBeatIndex, progress.narrativeFlags]);

  const triggerXpGain = (amount: number, reason: string) => {
    setProgress((prev) => {
      const newXp = prev.xp + amount;
      let newLevel = 1;
      if (newXp >= 1180) newLevel = 5;
      else if (newXp >= 780) newLevel = 4;
      else if (newXp >= 450) newLevel = 3;
      else if (newXp >= 180) newLevel = 2;
      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        lightPercent: Math.min(100, prev.lightPercent + Math.round(amount / 20))
      };
    });
    setXpToast({ amount, reason });
    setTimeout(() => {
      setXpToast(null);
    }, 2800);
  };

  const handleHarvestXp = (amount: number, reason: string, startX?: number, startY?: number) => {
    setHarvestOverlay({ amount, reason, startX, startY });
    // Trigger progressive count-up right as particles approach the header target (approx 450ms)
    setTimeout(() => {
      triggerXpGain(amount, reason);
    }, 450);
  };

  const handleToggleQuest = (questId: string, e?: React.MouseEvent) => {
    soundManager.playSelect();
    const targetQuest = progress.quests.find((q) => q.id === questId);
    if (!targetQuest) return;

    const wasCompleted = targetQuest.completed;
    trackQuestToggled(questId, targetQuest.title, !wasCompleted);

    if (!wasCompleted) {
      handleHarvestXp(targetQuest.xpReward, `Quête : ${targetQuest.title}`, e?.clientX, e?.clientY);

      // Increment stats slightly
      const updatedStats = { ...progress.stats };
      if (targetQuest.iconType === 'prayer') updatedStats.constance += 1;
      if (targetQuest.iconType === 'book') updatedStats.savoir += 1;
      if (targetQuest.iconType === 'focus') updatedStats.discipline += 1;
      if (targetQuest.iconType === 'bonus') updatedStats.bonte += 1;

      triggerWaswasChange(-10, "Quête accomplie : L'Ombre recule");
      setProgress((prev) => ({
        ...prev,
        quests: prev.quests.map((q) => (q.id === questId ? { ...q, completed: true } : q)),
        stats: updatedStats
      }));
    } else {
      setProgress((prev) => ({
        ...prev,
        quests: prev.quests.map((q) => (q.id === questId ? { ...q, completed: false } : q))
      }));
    }
  };

  const handleEquipItem = (itemId: string) => {
    setProgress((prev) => {
      const target = prev.equipment.find((e) => e.id === itemId);
      if (!target || !['tenue', 'cape', 'sac', 'lanterne'].includes(target.category)) return prev;

      const updatedEquipment = prev.equipment.map((e) => {
        if (e.category === target.category) {
          return { ...e, equipped: e.id === itemId };
        }
        return e;
      });

      return {
        ...prev,
        equipment: updatedEquipment
      };
    });
  };

  const handleUpdateAppearance = (newAppearance: TravelerAppearance) => {
    setProgress((prev) => ({
      ...prev,
      appearance: newAppearance
    }));
  };

  const advanceBeat = (overrideFlags?: Record<string, any>) => {
    if ((currentBeat.type === 'dialogue' || currentBeat.type === 'memory_fragments') && currentBeat.text) {
      const speakerLabel =
        currentBeat.speaker === 'narration'
          ? 'LE VIEUX SAGE'
          : currentBeat.speaker === 'personnage'
          ? 'OTHMÂN'
          : currentBeat.speaker
          ? currentBeat.speaker.toUpperCase()
          : 'LE VIEUX SAGE';
      setProgress((prev) => ({
        ...prev,
        history: [
          ...prev.history,
          {
            speaker: speakerLabel,
            text: currentBeat.text || '',
            sceneId: currentScene.id
          }
        ]
      }));
    }

    if (isDay2AtPoteau) {
      if (progress.currentBeatIndex + 1 < activeBeats.length) {
        setProgress((prev) => ({
          ...prev,
          currentBeatIndex: prev.currentBeatIndex + 1
        }));
        return;
      }
      soundManager.playQuizSuccess();
      setActiveTab('travel');
      return;
    }

    const effectiveFlags = overrideFlags || progress.narrativeFlags || {};

    if (progress.currentBeatIndex + 1 < currentScene.beats.length) {
      let targetIndex = progress.currentBeatIndex + 1;

      // Automatically award and skip intermediate 'xp' beats and beats that don't match requiredNarrativeFlag
      while (targetIndex < currentScene.beats.length) {
        const nextBeat = currentScene.beats[targetIndex];
        if (nextBeat.type === 'xp') {
          if (nextBeat.xpAmount) {
            triggerXpGain(nextBeat.xpAmount, nextBeat.xpReason || 'Progression');
          }
          targetIndex++;
          continue;
        }
        if (nextBeat.requiredNarrativeFlag) {
          const { flag, value } = nextBeat.requiredNarrativeFlag;
          const currentVal = effectiveFlags[flag];
          const matches = value !== undefined ? currentVal === value : Boolean(currentVal);
          if (!matches) {
            targetIndex++;
            continue;
          }
        }
        break;
      }

      if (targetIndex < currentScene.beats.length) {
        setProgress((prev) => ({
          ...prev,
          currentBeatIndex: targetIndex
        }));
        return;
      }
    }

    // Scene completed: stop any audio dialogue and initiate peaceful contemplation moment (3-4s) before next scene
    speechManager.stop();
    let nextSceneIndex = progress.currentSceneIndex + 1;
    if (currentScene.nextSceneId !== undefined) {
      const customNextIndex = ALL_SCENES.findIndex((s) => s.id === currentScene.nextSceneId);
      if (customNextIndex !== -1) {
        nextSceneIndex = customNextIndex;
      }
    } else if (currentScene.id === 14 || currentScene.id === 142) {
      const s15Index = ALL_SCENES.findIndex((s) => s.id === 15);
      if (s15Index !== -1) {
        nextSceneIndex = s15Index;
      }
    } else if (currentScene.id === 201 || currentScene.id === 202) {
      const s21Index = ALL_SCENES.findIndex((s) => s.id === 21);
      if (s21Index !== -1) {
        nextSceneIndex = s21Index;
      }
    }
    if (nextSceneIndex < ALL_SCENES.length) {
      const nextScene = ALL_SCENES[nextSceneIndex];
      setContemplationState({
        scene: currentScene,
        nextScene: nextScene,
        onFinish: () => {
          soundManager.playQuizSuccess();
          setSceneTransition({
            completedScene: currentScene,
            nextScene: nextScene
          });
        }
      });
    } else {
      setContemplationState({
        scene: currentScene,
        onFinish: () => {
          setProgress((prev) => ({
            ...prev,
            completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id]))
          }));
        }
      });
    }
  };

  // Safety: If currentBeat is 'xp', auto-advance immediately so the user never sees a blank screen
  useEffect(() => {
    if (currentBeat?.type === 'xp') {
      advanceBeat();
    }
  }, [currentBeat?.type, progress.currentBeatIndex]);

  const handleProceedToNextScene = () => {
    if (sceneTransition) {
      if (sceneTransition.nextScene) {
        trackSceneCompleted(sceneTransition.completedScene.id, sceneTransition.completedScene.title);

        // Check if next scene is in chapter 2 or 3 and user is not supporter
        if (sceneTransition.nextScene.id >= 10 && !isSupporter) {
          setProgress((prev) => ({
            ...prev,
            completedScenes: Array.from(
              new Set([...prev.completedScenes, sceneTransition.completedScene.id])
            )
          }));
          setSceneTransition(null);
          setSupportModalReason('chapter_end');
          setShowSupportModal(true);
          return;
        }

        const targetIdx = ALL_SCENES.findIndex((s) => s.id === sceneTransition.nextScene!.id);
        if (targetIdx !== -1) {
          soundManager.playSceneTransition();
          setProgress((prev) => ({
            ...prev,
            currentSceneIndex: targetIdx,
            currentBeatIndex: 0,
            completedScenes: Array.from(
              new Set([...prev.completedScenes, sceneTransition.completedScene.id])
            )
          }));
          setClimaxStep(0);
        }
        setSceneTransition(null);
        setActiveTab('adventure');
      } else {
        trackSceneCompleted(sceneTransition.completedScene.id, sceneTransition.completedScene.title);
        setProgress((prev) => ({
          ...prev,
          completedScenes: Array.from(
            new Set([...prev.completedScenes, sceneTransition.completedScene.id])
          )
        }));
        setClimaxStep(0);
        setSceneTransition(null);
        setActiveTab('travel');
      }
    }
  };

  const handleJumpScene = (direction: 'next' | 'prev') => {
    soundManager.playSelect();
    const newIdx = direction === 'next' ? progress.currentSceneIndex + 1 : progress.currentSceneIndex - 1;
    if (newIdx >= 0 && newIdx < ALL_SCENES.length) {
      const targetScene = ALL_SCENES[newIdx];
      if (targetScene.id >= 10 && !isSupporter) {
        setSupportModalReason('chapter_end');
        setShowSupportModal(true);
        return;
      }
      soundManager.playSceneTransition();
      setProgress((prev) => ({
        ...prev,
        currentSceneIndex: newIdx,
        currentBeatIndex: 0
      }));
      setClimaxStep(0);
      setActiveTab('adventure');
    }
  };

  const handleReplayScene = () => {
    setProgress((prev) => ({
      ...prev,
      currentBeatIndex: 0
    }));
    setClimaxStep(0);
    setSceneTransition(null);
  };

  const handleSelectSceneFromMap = (sceneId: number) => {
    const targetIdx = ALL_SCENES.findIndex((s) => s.id === sceneId);
    if (targetIdx !== -1) {
      const targetScene = ALL_SCENES[targetIdx];
      if (targetScene.id >= 10 && !isSupporter) {
        setSupportModalReason('chapter_end');
        setShowSupportModal(true);
        return;
      }
      const targetChap = getChapterForSceneId(targetScene.id);
      soundManager.playSceneTransition();
      setProgress((prev) => ({
        ...prev,
        selectedChapter: targetChap,
        currentSceneIndex: targetIdx,
        currentBeatIndex: 0
      }));
      setClimaxStep(0);
      if (sceneId === 10 || sceneId === 17 || sceneId === 30 || sceneId === 40) {
        setIntroPrologueChapter(targetChap);
      }
      setActiveTab('adventure');
    }
  };

  const toggleSound = () => {
    setProgress((prev) => {
      const nextSound = !prev.soundEnabled;
      soundManager.setMuted(!nextSound);
      return { ...prev, soundEnabled: nextSound };
    });
  };

  const handleWaswasMistake = (amount: number = 15, reason?: string) => {
    triggerWaswasChange(amount, reason || 'Erreur au Quiz : Le Waswâs prend de la force !');
  };

  const handleQuizComplete = () => {
    if (currentBeat.quizId) {
      trackQuizCompleted(currentBeat.quizId, true, 'Aventure');
      setProgress((prev) => {
        const safeCompletedQuizzes = prev.completedQuizzes || [];
        const isAlreadyCompleted = safeCompletedQuizzes.includes(currentBeat.quizId!);
        const updatedStats = { ...prev.stats };
        if (!isAlreadyCompleted) {
          updatedStats.savoir = Math.min(100, updatedStats.savoir + 5);
        }

        return {
          ...prev,
          stats: updatedStats,
          completedQuizzes: Array.from(new Set([...safeCompletedQuizzes, currentBeat.quizId!])),
          unlockedKnowledgeIds: currentBeat.unlockedConceptId
            ? Array.from(new Set([...(prev.unlockedKnowledgeIds || []), currentBeat.unlockedConceptId]))
            : (prev.unlockedKnowledgeIds || [])
        };
      });
      triggerWaswasChange(-15, "Bonne réponse : Le Waswâs s'affaiblit !");
    }
    advanceBeat();
  };

  const handleRealActionValidate = (mode: 'done' | 'pledge' | 'skip' = 'done') => {
    if (currentBeat.realActionId) {
      const action = ALL_ACTIONS[currentBeat.realActionId];
      if (action) {
        if (mode === 'done') {
          trackRealActionValidated(action.id, action.title, action.xpReward);
          triggerXpGain(action.xpReward, `Action réelle accomplie : ${action.title}`);
          setProgress((prev) => ({
            ...prev,
            completedRealActions: Array.from(new Set([...prev.completedRealActions, action.id])),
            pledgedRealActions: (prev.pledgedRealActions || []).filter((id) => id !== action.id)
          }));
          triggerWaswasChange(-15, "Action réelle validée : L'Ombre recule !");
        } else if (mode === 'pledge') {
          const pledgeXp = Math.max(10, Math.round(action.xpReward / 2));
          trackRealActionValidated(action.id, action.title + ' (Engagement)', pledgeXp);
          triggerXpGain(pledgeXp, `Engagement d'Adab : ${action.title}`);
          setProgress((prev) => ({
            ...prev,
            pledgedRealActions: Array.from(new Set([...(prev.pledgedRealActions || []), action.id]))
          }));
          triggerWaswasChange(-8, "Engagement pris : La détermination affaiblit le Waswâs !");
        } else {
          trackEvent('real_action_skipped', { action_id: action.id, action_title: action.title });
        }
      }
    }
    advanceBeat();
  };

  const handleValidatePledgedAction = (actionId: string, e?: React.MouseEvent) => {
    soundManager.playSelect();
    const action = ALL_ACTIONS[actionId];
    if (!action) return;

    const remainingXp = Math.max(10, action.xpReward - Math.max(10, Math.round(action.xpReward / 2)));
    handleHarvestXp(remainingXp, `Action d'Adab accomplie : ${action.title}`, e?.clientX, e?.clientY);

    trackRealActionValidated(action.id, action.title + ' (Confirmé)', remainingXp);
    triggerWaswasChange(-15, "Engagement accompli : L'Ombre recule !");

    setProgress((prev) => ({
      ...prev,
      completedRealActions: Array.from(new Set([...prev.completedRealActions, actionId])),
      pledgedRealActions: (prev.pledgedRealActions || []).filter((id) => id !== actionId)
    }));
  };

  const handleClimaxComplete = () => {
    advanceBeat();
  };

  const handleSelectChoice = (choice: DialogueChoice) => {
    // Soft gentle "Game Over" when Othman retreats before opening the door in Scene 1
    if (choice.id === 'c_door_retreat') {
      speechManager.stop();
      soundManager.playSelect();
      setShowDoorRetreatModal(true);
      return;
    }

    // 0. Character Traits & Habits progression
    if (choice.traitGains) {
      setProgress((prev) => {
        const currentTraits = prev.traits || INITIAL_CHARACTER_TRAITS;
        const newTraits: CharacterTraits = {
          discipline: (currentTraits.discipline || 0) + (choice.traitGains?.discipline || 0),
          sabr: (currentTraits.sabr || 0) + (choice.traitGains?.sabr || 0),
          hilm: (currentTraits.hilm || 0) + (choice.traitGains?.hilm || 0),
          adab: (currentTraits.adab || 0) + (choice.traitGains?.adab || 0),
          vitalite: (currentTraits.vitalite || 0) + (choice.traitGains?.vitalite || 0),
          ilm: (currentTraits.ilm || 0) + (choice.traitGains?.ilm || 0),
        };
        const localizedHabit = getLocalizedHabitMessage(choice, language);
        const newLog = localizedHabit
          ? Array.from(new Set([...(prev.habitLog || []), localizedHabit]))
          : prev.habitLog || [];
        return {
          ...prev,
          traits: newTraits,
          habitLog: newLog
        };
      });

      if (choice.habitMessage) {
        setHabitToast(getLocalizedHabitMessage(choice, language) || choice.habitMessage);
        setTimeout(() => {
          setHabitToast(null);
        }, 4000);
      }
      soundManager.playQuizSuccess();
    }

    // 0.1 Narrative memory flags (world memory & NPC callbacks)
    let updatedFlags = progress.narrativeFlags || {};
    if (choice.setNarrativeFlags) {
      updatedFlags = {
        ...updatedFlags,
        ...choice.setNarrativeFlags
      };
      setProgress((prev) => ({
        ...prev,
        narrativeFlags: updatedFlags
      }));
    }

    // 1. Moral stat bonus
    if (choice.statBonus) {
      const { stat, amount } = choice.statBonus;
      setProgress((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [stat]: Math.min(100, (prev.stats[stat] || 0) + amount)
        }
      }));
      soundManager.playQuizSuccess();
    }

    // 2. Track moral choice key
    if (choice.moralKey) {
      setProgress((prev) => ({
        ...prev,
        moralChoices: {
          ...(prev.moralChoices || {}),
          [choice.id]: choice.moralKey!
        }
      }));
    }

    // 3. Branching path (Livre dont vous êtes le héros)
    if (choice.targetSceneId) {
      soundManager.playSelect();
      const targetScene = ALL_SCENES.find((s) => s.id === choice.targetSceneId);
      if (targetScene) {
        if (targetScene.id >= 10 && !isSupporter) {
          setSupportModalReason('chapter_end');
          setShowSupportModal(true);
          return;
        }
        speechManager.stop();
        setContemplationState({
          scene: currentScene,
          nextScene: targetScene,
          onFinish: () => {
            soundManager.playQuizSuccess();
            setSceneTransition({
              completedScene: currentScene,
              nextScene: targetScene
            });
          }
        });
        return;
      }
    }

    if (choice.id === 'c1_replay') {
      soundManager.playSelect();
      setProgress((prev) => ({
        ...prev,
        dayNumber: 1,
        currentSceneIndex: 0,
        currentBeatIndex: 0,
        selectedChapter: 1
      }));
      setActiveTab('adventure');
      return;
    }
    if (choice.id === 'c2' || choice.id === 'c2_chap2') {
      soundManager.playSelect();
      const targetSceneId = currentScene.id === 10 ? 11 : 10;
      const ch2Idx = ALL_SCENES.findIndex((s) => s.id === targetSceneId);
      if (ch2Idx !== -1) {
        setProgress((prev) => ({
          ...prev,
          dayNumber: 2,
          currentSceneIndex: ch2Idx,
          currentBeatIndex: 0,
          selectedChapter: 2,
          completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id]))
        }));
        setIntroPrologueChapter(2);
        setActiveTab('adventure');
        return;
      }
    }
    if (choice.id === 'c3' || choice.id === 'c3_chap3') {
      soundManager.playSelect();
      const ch3Idx = ALL_SCENES.findIndex((s) => s.id === 17);
      if (ch3Idx !== -1) {
        setProgress((prev) => ({
          ...prev,
          dayNumber: 3,
          currentSceneIndex: ch3Idx,
          currentBeatIndex: 0,
          selectedChapter: 3,
          completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id]))
        }));
        setIntroPrologueChapter(3);
        setActiveTab('adventure');
        return;
      }
    }
    if (choice.id === 'c4' || choice.id === 'c4_chap4') {
      soundManager.playSelect();
      const ch4Idx = ALL_SCENES.findIndex((s) => s.id === 30);
      if (ch4Idx !== -1) {
        setProgress((prev) => ({
          ...prev,
          dayNumber: 4,
          currentSceneIndex: ch4Idx,
          currentBeatIndex: 0,
          selectedChapter: 4,
          completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id]))
        }));
        setActiveTab('adventure');
        return;
      }
    }
    if (choice.id === 'c5' || choice.id === 'c5_chap5') {
      soundManager.playSelect();
      const ch5Idx = ALL_SCENES.findIndex((s) => s.id === 40);
      if (ch5Idx !== -1) {
        setProgress((prev) => ({
          ...prev,
          dayNumber: 5,
          currentSceneIndex: ch5Idx,
          currentBeatIndex: 0,
          selectedChapter: 5,
          completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id]))
        }));
        setActiveTab('adventure');
        return;
      }
    }
    advanceBeat(updatedFlags);
  };

  const handleCompleteIslamicQuiz = (quizId: string, xpReward: number) => {
    trackQuizCompleted(quizId, true, quizCategoryPreference || 'Savoir');
    handleHarvestXp(xpReward, `Quiz Islamique (+${xpReward} XP)`);
    setProgress((prev) => {
      const updatedStats = { ...prev.stats, savoir: Math.min(100, prev.stats.savoir + 2) };
      return {
        ...prev,
        stats: updatedStats,
        completedIslamicQuizIds: Array.from(
          new Set([...(prev.completedIslamicQuizIds || []), quizId])
        )
      };
    });
    triggerWaswasChange(-15, "Défi de Savoir validé : Le Waswâs recule !");
  };

  const handleResetGame = () => {
    soundManager.playSelect();
    localStorage.removeItem(STORAGE_KEY);
    setProgress(INITIAL_PROGRESS);
    setActiveTab('adventure');
  };

  const unreadQuests = progress.quests.filter((q) => !q.completed).length;
  const nextSceneToUnlock = ALL_SCENES[progress.currentSceneIndex + 1];
  const hasSpiritualGatePending = Boolean(
    nextSceneToUnlock && progress.xp < (nextSceneToUnlock.requiredXp || 0)
  );

  // Sync player's highest XP to the Story XP Leaderboard when completing milestones
  const lastSubmittedXpRef = useRef<number>(0);
  useEffect(() => {
    if (progress.xp >= 100 && progress.xp - lastSubmittedXpRef.current >= 50) {
      lastSubmittedXpRef.current = progress.xp;
      const savedPseudo = loadSavedPseudo();
      if (savedPseudo) {
        submitStoryXpScore({
          pseudo: savedPseudo,
          xp: progress.xp,
          level: progress.level,
        });
      }
    }
  }, [progress.xp, progress.level]);

  // Auto-trigger celebratory transition overlay the first time Othman reaches enough XP to challenge the chapter's Great Waswas Boss
  useEffect(() => {
    if (showSplash || viewMode === 'landing' || activeTab !== 'adventure' || !currentScene) return;
    const ch = getChapterForSceneId(currentScene.id);
    if (promptedBossChaptersRef.current.has(ch)) return;
    const bossMap: Record<number, { sceneId: number; xpNeeded: number }> = {
      1: { sceneId: 9, xpNeeded: 220 },
      2: { sceneId: 16, xpNeeded: 550 },
      3: { sceneId: 25, xpNeeded: 900 },
      4: { sceneId: 34, xpNeeded: 1250 },
      5: { sceneId: 44, xpNeeded: 1600 },
    };
    const cfg = bossMap[ch];
    if (!cfg || currentScene.id === cfg.sceneId || progress.xp < cfg.xpNeeded) return;
    if (currentBeat?.type === 'quiz' || currentBeat?.type === 'climax_combat') return;
    const bossIdx = ALL_SCENES.findIndex((s) => s.id === cfg.sceneId);
    if (bossIdx !== -1) {
      promptedBossChaptersRef.current.add(ch);
      soundManager.playChapterComplete();
      setBossReadyModal({ chapter: ch, bossIdx });
    }
  }, [progress.xp, currentScene?.id, currentBeat?.type, activeTab, showSplash, viewMode]);

  // Trigger gentle Waswas Game Over if Waswas pressure reaches 100/100
  useEffect(() => {
    if (showSplash || viewMode === 'landing' || activeTab !== 'adventure') return;
    if ((progress.waswasXp || 0) >= 100 && !showWaswasGameOver) {
      speechManager.stop();
      soundManager.playSelect();
      setShowWaswasGameOver(true);
    }
  }, [progress.waswasXp, showSplash, viewMode, activeTab, showWaswasGameOver]);

  if (viewMode === 'landing') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[#f6ebd7]" />}>
        <LandingPage onLaunchGame={handleLaunchGame} />
      </Suspense>
    );
  }

  return (
    <main className={`w-screen w-full h-screen h-[100dvh] max-h-[100dvh] flex flex-col justify-between overflow-hidden select-none font-sans relative transition-colors duration-300 ${
      isParchment ? 'bg-[#f6ebd7] text-[#2b2118]' : 'bg-[#0f131d] text-[#dfe2f1]'
    }`}>
      {/* Top Header Bar (Unique, Transparent & Unified) */}
      <PixelioHeader
        level={progress.level}
        xp={progress.xp}
        maxXp={1350}
        waswasXp={progress.waswasXp || 0}
        lightPercent={progress.lightPercent}
        streakDays={progress.streakDays}
        onOpenMap={() => setActiveTab('travel')}
        onOpenKnowledge={() => setShowKnowledge(true)}
        onOpenQuiz={() => setShowQuiz(true)}
        onOpenLanding={WEB_ONLY_FEATURES_ENABLED ? () => handleOpenLanding(true) : undefined}
        onReturnToMenu={() => {
          speechManager.stop();
          setShowPauseMenu(true);
        }}
        customAssets={customAssets}
        hasSpiritualGatePending={hasSpiritualGatePending}
      />

      {/* Centered Floating Status Toasts (XP, Waswâs, Streak) - Perfectly Centered, Sleek & Compact */}
      {(xpToast || (waswasToast && activeTab !== 'adventure') || streakCelebration) && (
        <div className="fixed inset-x-0 top-14 sm:top-16 z-[80] flex flex-col items-center justify-center gap-1.5 pointer-events-none px-4 select-none">
          {/* Streak Celebration Toast */}
          {streakCelebration && (
            <div className="max-w-[360px] w-auto px-3.5 py-1.5 bg-gradient-to-r from-amber-600 via-orange-500 to-amber-600 text-white font-black rounded-xl shadow-[0_4px_16px_rgba(234,88,12,0.5)] flex items-center justify-center gap-2 border border-amber-300 backdrop-blur-md animate-in slide-in-from-top-2 duration-300">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-black font-cinzel tracking-wide text-amber-100">
                Série de {streakCelebration} jours !
              </span>
              <span className="text-[10px] font-sans text-white/90 truncate max-w-[180px]">
                Quêtes quotidiennes renouvelées
              </span>
            </div>
          )}

          {/* 1. XP Gain Toast */}
          {xpToast && (
            <div className="max-w-[360px] w-auto px-3.5 py-1.5 bg-gradient-to-r from-yellow-500 via-amber-300 to-yellow-400 text-amber-950 font-black rounded-xl shadow-[0_4px_16px_rgba(250,204,21,0.5),0_2px_0_#92400e] flex items-center justify-center gap-2 border border-yellow-100 backdrop-blur-md transition-all duration-200">
              <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-200 border border-yellow-100 flex items-center justify-center shadow-inner shrink-0 text-amber-950">
                <Sparkles className="w-3 h-3 fill-yellow-100" />
              </div>
              <span className="text-xs sm:text-sm font-black font-cinzel tracking-wider shrink-0">+{xpToast.amount} XP</span>
              <span className="text-[11px] font-bold font-sans bg-amber-900/15 px-2 py-0.5 rounded-md border border-amber-800/20 truncate max-w-[200px]">
                {xpToast.reason}
              </span>
            </div>
          )}

          {/* 2. Waswâs Purge / Increase Toast */}
          {waswasToast && activeTab !== 'adventure' && (
            <div
              className={`max-w-[360px] w-auto px-3.5 py-1.5 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.6)] flex items-center gap-2 border backdrop-blur-xl transition-all duration-200 ${
                waswasToast.isNegative
                  ? 'bg-[#032a1f]/95 text-white border-emerald-400/80 shadow-[0_0_16px_rgba(52,211,153,0.35)]'
                  : 'bg-[#240638]/95 text-white border-fuchsia-400/80 shadow-[0_0_16px_rgba(217,70,239,0.35)]'
              }`}
            >
              {/* Badge Icon & Amount */}
              <div
                className={`px-2 py-0.5 rounded-lg border font-black text-xs font-mono tracking-wide flex items-center gap-1 shrink-0 ${
                  waswasToast.isNegative
                    ? 'bg-emerald-950/90 border-emerald-300 text-emerald-200 shadow-xs'
                    : 'bg-fuchsia-950/90 border-fuchsia-300 text-fuchsia-200 shadow-xs'
                }`}
              >
                <span>{waswasToast.isNegative ? '✨' : '🌑'}</span>
                <span>{waswasToast.isNegative ? `-${waswasToast.amount}` : `+${waswasToast.amount}`} Doute</span>
              </div>

              {/* Message text & contextual subtitle */}
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-[9px] font-black uppercase tracking-widest font-cinzel text-zinc-300/80 leading-none">
                  {waswasToast.isNegative ? 'LUMIÈRE RETROUVÉE' : 'EMPRISE OBSCURE'}
                </span>
                <span className="text-[11px] sm:text-xs font-semibold leading-tight text-white/95 truncate">
                  {waswasToast.reason}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Main Content Area based on activeTab */}
      <div className="flex-1 min-h-0 flex flex-col overflow-hidden relative">
        {activeTab === 'home' && (
          <HomeScreen
            progress={progress}
            onToggleQuest={handleToggleQuest}
            onStartAdventure={() => {
              if (currentScene.id >= 10 && !isSupporter) {
                setSupportModalReason('chapter_end');
                setShowSupportModal(true);
                return;
              }
              setActiveTab('adventure');
            }}
            onGoToMap={() => setActiveTab('travel')}
            customAssets={customAssets}
          />
        )}

        {activeTab === 'travel' && (
          <TravelMapScreen
            currentSceneIndex={progress.currentSceneIndex}
            completedScenes={progress.completedScenes}
            playerXp={progress.xp}
            initialChapter={progress.selectedChapter || (progress.completedScenes.includes(16) ? 3 : progress.completedScenes.includes(9) ? 2 : 1)}
            isSupporter={isSupporter}
            onOpenSupportModal={() => {
              setSupportModalReason('chapter_end');
              setShowSupportModal(true);
            }}
            onSelectScene={handleSelectSceneFromMap}
            onOpenKnowledgeQuiz={() => setShowQuiz(true)}
            onBack={() => setActiveTab('home')}
          />
        )}

        {activeTab === 'quests' && (
          <QuestsScreen
            progress={progress}
            allActions={ALL_ACTIONS}
            onToggleQuest={handleToggleQuest}
            onValidatePledgedAction={handleValidatePledgedAction}
            isSupporter={isSupporter}
            onOpenSupportModal={() => {
              setSupportModalReason('chapter_end');
              setShowSupportModal(true);
            }}
            onStartStoryQuest={(sceneId) => {
              if (typeof sceneId === 'number') {
                handleSelectSceneFromMap(sceneId);
              } else {
                setActiveTab('travel');
              }
            }}
          />
        )}

        {activeTab === 'inventory' && (
          <InventoryScreen
            progress={progress}
            onEquipItem={handleEquipItem}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileScreen
            progress={progress}
            soundEnabled={progress.soundEnabled}
            onToggleSound={toggleSound}
            onOpenAssetManager={() => setShowAssetManager(true)}
            onOpenSupport={SUPPORT_ENABLED ? () => {
              setSupportModalReason('profile');
              setShowSupportModal(true);
            } : undefined}
            onUpdateAppearance={handleUpdateAppearance}
            onResetProgress={handleResetGame}
            onHarvestXp={handleHarvestXp}
          />
        )}

        {/* Narrative Adventure Mode (Dialogue, Quiz, Combat, Real Actions) */}
        {activeTab === 'adventure' && !showSplash && (
          <div
            onClick={() => {
              // Tap anywhere on screen to advance dialogue if active
              if (
                !introPrologueChapter &&
                !contemplationState &&
                !sceneTransition &&
                (currentBeat.type === 'dialogue' || currentBeat.type === 'memory_fragments')
              ) {
                advanceBeat();
              }
            }}
            className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-[#181422] cursor-pointer"
          >
            {/* Visual Environment Canvas */}
            <SceneBackground
              scene={currentScene}
              currentBeat={currentBeat}
              onSelectChoice={handleSelectChoice}
              climaxStepIndex={climaxStep}
              waswasDissolved={progress.currentSceneIndex === 8 && progress.currentBeatIndex > 20}
              customAssets={customAssets}
              isContemplating={!!contemplationState}
              completedRealActions={progress.completedRealActions}
            />
            <StoryShotOverlay scene={currentScene} currentBeat={currentBeat} isContemplating={!!contemplationState} />

            {/* Contemplation Overlay: 3-4s pause before advancing to next scene for deep immersion */}
            {contemplationState && (
              <ContemplationOverlay
                scene={contemplationState.scene}
                nextScene={contemplationState.nextScene}
                durationMs={3500}
                onComplete={() => {
                  const finishAction = contemplationState.onFinish;
                  setContemplationState(null);
                  finishAction();
                }}
                onSkip={() => {
                  const finishAction = contemplationState.onFinish;
                  setContemplationState(null);
                  finishAction();
                }}
              />
            )}



            {/* Fast-track Boss Challenge Button when player earns enough XP in current chapter */}
            {(() => {
              const ch = getChapterForSceneId(currentScene.id);
              const bossMap: Record<number, { sceneId: number; xpNeeded: number }> = {
                1: { sceneId: 9, xpNeeded: 220 },
                2: { sceneId: 16, xpNeeded: 550 },
                3: { sceneId: 25, xpNeeded: 900 },
                4: { sceneId: 34, xpNeeded: 1250 },
                5: { sceneId: 44, xpNeeded: 1600 },
              };
              const cfg = bossMap[ch];
              if (
                !cfg ||
                currentScene.id === cfg.sceneId ||
                progress.xp < cfg.xpNeeded ||
                introPrologueChapter ||
                contemplationState ||
                sceneTransition ||
                currentBeat.type === 'quiz' ||
                currentBeat.type === 'climax_combat'
              ) {
                return null;
              }
              const bossIdx = ALL_SCENES.findIndex((s) => s.id === cfg.sceneId);
              if (bossIdx === -1) return null;
              return (
                <div className="relative z-30 flex justify-center pt-2 px-3 pointer-events-auto">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playQuizSuccess();
                      speechManager.stop();
                      setProgress((prev) => ({
                        ...prev,
                        currentSceneIndex: bossIdx,
                        currentBeatIndex: 0
                      }));
                    }}
                    className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#5b21b6] via-[#7c3aed] to-[#b45309] hover:brightness-110 text-amber-100 font-cinzel font-black text-[11px] sm:text-xs tracking-wide border-2 border-amber-300/80 shadow-[0_3px_12px_rgba(124,58,237,0.5)] cursor-pointer flex items-center gap-2 animate-in fade-in slide-in-from-top-2 duration-300"
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                    <span>
                      {language === 'ar'
                        ? 'نِقَاطُكَ كَافِيَةٌ! وَاجِهِ الْوَسْوَاسَ الْأَكْبَرَ مُبَاشَرَةً'
                        : language === 'en'
                          ? 'Enough XP! Challenge the Great Waswas Directly'
                          : 'XP suffisant ! Affronter le Grand Waswâs directement'}
                    </span>
                  </button>
                </div>
              );
            })()}

            {/* Central / Interactive Beat Controller (flex-1 min-h-0: fits comfortably without pushing the bottom bar) */}
            <div className="relative z-30 w-full flex-1 min-h-0 flex flex-col items-center justify-end pb-1 sm:pb-2 overflow-y-auto sm:overflow-visible">
              {!introPrologueChapter && !contemplationState && !sceneTransition &&
                (currentBeat.type === 'dialogue' ||
                  currentBeat.type === 'choice' ||
                  currentBeat.type === 'memory_fragments') && (
                <DialogueBox
                  key={`${currentBeat.id}_${choiceResetKey}`}
                  beat={currentBeat}
                  onNext={advanceBeat}
                  onSelectChoice={handleSelectChoice}
                  customAssets={customAssets}
                  waswasToast={waswasToast}
                  traits={progress.traits}
                  narrativeFlags={progress.narrativeFlags}
                  showSkipSeen={canSkipSeen}
                  onSkipSeen={handleSkipSeen}
                  onOpenSupport={SUPPORT_ENABLED ? () => {
                    setSupportModalReason('chapter_end');
                    setShowSupportModal(true);
                  } : undefined}
                />
              )}

              {!contemplationState && !sceneTransition && currentBeat.type === 'quiz' && currentBeat.quizId && (
                <QuizModal
                  key={currentBeat.quizId}
                  quiz={ALL_QUIZZES[currentBeat.quizId] || ALL_QUIZZES.quiz_istiadhah}
                  onComplete={handleQuizComplete}
                  onHarvestXp={handleHarvestXp}
                  onWaswasMistake={handleWaswasMistake}
                  customAssets={customAssets}
                />
              )}

              {!contemplationState && !sceneTransition && currentBeat.type === 'real_action' && currentBeat.realActionId && (
                <RealActionModal
                  action={ALL_ACTIONS[currentBeat.realActionId] || ALL_ACTIONS.action_lit}
                  onValidate={handleRealActionValidate}
                  onHarvestXp={handleHarvestXp}
                />
              )}

              {!contemplationState && !sceneTransition && currentBeat.type === 'climax_combat' && (
                <ClimaxCombat
                  waswasXp={progress.waswasXp || 0}
                  traits={progress.traits}
                  onComplete={handleClimaxComplete}
                  onStepChange={(stepIdx) => setClimaxStep(stepIdx)}
                  onOpenHilmQuiz={() => {
                    const ch = getChapterForSceneId(currentScene.id);
                    setQuizCategoryPreference(ch === 4 ? 'Comportement & Sagesse' : ch === 3 ? 'Tawakkul & Patience' : 'Hilm & Maîtrise de Soi');
                    setShowQuiz(true);
                  }}
                  customAssets={customAssets}
                  chapterNumber={getChapterForSceneId(currentScene.id)}
                />
              )}

              {!contemplationState && !sceneTransition && currentBeat.type === 'chapter_end' && (
                <ChapterEnd
                  chapterNumber={getChapterForSceneId(currentScene.id)}
                  xpTotal={progress.xp}
                  traits={progress.traits}
                  isSupporter={isSupporter}
                  onReplay={() => {
                    const ch = getChapterForSceneId(currentScene.id);
                    if (ch === 5) {
                      const ch5Idx = ALL_SCENES.findIndex((s) => s.id === 40);
                      setProgress((prev) => ({
                        ...prev,
                        currentSceneIndex: ch5Idx !== -1 ? ch5Idx : 0,
                        currentBeatIndex: 0
                      }));
                    } else if (ch === 4) {
                      const ch4Idx = ALL_SCENES.findIndex((s) => s.id === 30);
                      setProgress((prev) => ({
                        ...prev,
                        currentSceneIndex: ch4Idx !== -1 ? ch4Idx : 0,
                        currentBeatIndex: 0
                      }));
                    } else if (ch === 3) {
                      const ch3Idx = ALL_SCENES.findIndex((s) => s.id === 17);
                      setProgress((prev) => ({
                        ...prev,
                        currentSceneIndex: ch3Idx !== -1 ? ch3Idx : 0,
                        currentBeatIndex: 0
                      }));
                    } else if (ch === 2) {
                      const ch2Idx = ALL_SCENES.findIndex((s) => s.id === 10);
                      setProgress((prev) => ({
                        ...prev,
                        currentSceneIndex: ch2Idx !== -1 ? ch2Idx : 0,
                        currentBeatIndex: 0
                      }));
                    } else {
                      setProgress(INITIAL_PROGRESS);
                    }
                    setActiveTab('adventure');
                  }}
                  onContinueAdventure={() => {
                    const ch = getChapterForSceneId(currentScene.id);
                    if (ch === 5) {
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        selectedChapter: 5
                      }));
                      setActiveTab('travel');
                    } else if (ch === 4) {
                      const ch5Idx = ALL_SCENES.findIndex((s) => s.id === 40);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: 5,
                        currentSceneIndex: ch5Idx !== -1 ? ch5Idx : prev.currentSceneIndex,
                        currentBeatIndex: 0,
                        selectedChapter: 5
                      }));
                      setActiveTab('adventure');
                    } else if (ch === 3) {
                      const ch4Idx = ALL_SCENES.findIndex((s) => s.id === 30);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: 4,
                        currentSceneIndex: ch4Idx !== -1 ? ch4Idx : prev.currentSceneIndex,
                        currentBeatIndex: 0,
                        selectedChapter: 4
                      }));
                      setActiveTab('adventure');
                    } else if (ch === 2) {
                      if (!isSupporter) {
                        setSupportModalReason('chapter_end');
                        setShowSupportModal(true);
                        return;
                      }
                      const ch3Idx = ALL_SCENES.findIndex((s) => s.id === 17);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: 3,
                        currentSceneIndex: ch3Idx !== -1 ? ch3Idx : prev.currentSceneIndex,
                        currentBeatIndex: 0,
                        selectedChapter: 3
                      }));
                      setActiveTab('adventure');
                    } else {
                      if (!isSupporter) {
                        setSupportModalReason('chapter_end');
                        setShowSupportModal(true);
                        return;
                      }
                      const ch2Idx = ALL_SCENES.findIndex((s) => s.id === 10);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: 2,
                        currentSceneIndex: ch2Idx !== -1 ? ch2Idx : 0,
                        currentBeatIndex: 0,
                        selectedChapter: 2
                      }));
                      setActiveTab('adventure');
                    }
                  }}
                  onSaveAndExit={() => {
                    soundManager.playXpHarvest();
                    const ch = getChapterForSceneId(currentScene.id);
                    if (ch === 5) {
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        selectedChapter: 5
                      }));
                    } else if (ch === 4) {
                      const ch5Idx = ALL_SCENES.findIndex((s) => s.id === 40);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: 5,
                        currentSceneIndex: ch5Idx !== -1 ? ch5Idx : prev.currentSceneIndex,
                        currentBeatIndex: 0,
                        selectedChapter: 5
                      }));
                    } else if (ch === 3) {
                      const ch4Idx = ALL_SCENES.findIndex((s) => s.id === 30);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: 4,
                        currentSceneIndex: ch4Idx !== -1 ? ch4Idx : prev.currentSceneIndex,
                        currentBeatIndex: 0,
                        selectedChapter: 4
                      }));
                    } else if (ch === 2) {
                      const ch3Idx = ALL_SCENES.findIndex((s) => s.id === 17);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: isSupporter ? 3 : 2,
                        currentSceneIndex: isSupporter && ch3Idx !== -1 ? ch3Idx : prev.currentSceneIndex,
                        currentBeatIndex: 0,
                        selectedChapter: isSupporter ? 3 : 2
                      }));
                    } else {
                      const ch2Idx = ALL_SCENES.findIndex((s) => s.id === 10);
                      setProgress((prev) => ({
                        ...prev,
                        completedScenes: Array.from(new Set([...prev.completedScenes, currentScene.id])),
                        dayNumber: isSupporter ? 2 : 1,
                        currentSceneIndex: isSupporter && ch2Idx !== -1 ? ch2Idx : prev.currentSceneIndex,
                        currentBeatIndex: 0,
                        selectedChapter: isSupporter ? 2 : 1
                      }));
                    }
                    setActiveTab('travel');
                  }}
                  onOpenKnowledge={() => setShowKnowledge(true)}
                  onOpenFeedback={WEB_ONLY_FEATURES_ENABLED ? () => handleOpenLanding(true) : undefined}
                  onOpenSupport={SUPPORT_ENABLED ? () => {
                    setSupportModalReason('chapter_end');
                    setShowSupportModal(true);
                  } : undefined}
                  customAssets={customAssets}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* Floating Noura Guide Button (when in travel) */}
      {activeTab === 'travel' && (
        <button
          onClick={() => {
            soundManager.playSelect();
            setAldwinModal('intro');
          }}
          className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] right-3 sm:right-4 w-12 h-12 rounded-2xl bg-[#fbf7ee] border-2 border-[#3a2312] shadow-[0_4px_0_#3a2312] flex items-center justify-center p-1 cursor-pointer hover:scale-105 active:translate-y-1 transition-all z-40"
          title="Guide Noura"
        >
          <img
            src={customAssets?.characters?.noura || DEFAULT_ASSETS.characters.noura}
            alt="Noura Guide"
            className="w-full h-full object-cover object-top rounded-xl"
          />
        </button>
      )}

      {/* Bottom Navigation Bar: Always visible everywhere, on mobile & desktop */}
      <BottomNavBar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        unreadQuestsCount={unreadQuests}
      />

      {/* Noura Guide Modal (Manual on-demand advice from travel map only) */}
      {aldwinModal && activeTab !== 'adventure' && (
        <AldwinGuideModal
          mode={aldwinModal}
          customAssets={customAssets}
          onClose={() => setAldwinModal(null)}
          onContinue={() => setAldwinModal(null)}
        />
      )}

      {/* Dedicated Islamic Quiz (+XP) Modal */}
      {showQuiz && (
        <IslamicQuizModal
          completedQuizIds={progress.completedIslamicQuizIds || []}
          onCompleteQuiz={handleCompleteIslamicQuiz}
          onWaswasMistake={showSplash ? undefined : handleWaswasMistake}
          initialCategory={quizCategoryPreference}
          storyQuizzes={ALL_QUIZZES}
          standalone={showSplash}
          onClose={() => {
            setShowQuiz(false);
            setQuizCategoryPreference(undefined);
          }}
          currentXp={progress.xp}
        />
      )}

      {/* Knowledge Codex (Livre du Savoir) Modal */}
      {showKnowledge && (
        <KnowledgeModal
          unlockedIds={progress.unlockedKnowledgeIds}
          onClose={() => setShowKnowledge(false)}
          currentXp={progress.xp}
          currentLevel={progress.level}
        />
      )}

      {/* History Modal */}
      {showHistory && (
        <HistoryModal
          history={progress.history}
          onClose={() => setShowHistory(false)}
        />
      )}

      {/* Asset Manager Modal */}
      {showAssetManager && (
        <AssetManagerModal
          customAssets={customAssets}
          onUpdateAssets={(updated) => setCustomAssets(updated)}
          onClose={() => setShowAssetManager(false)}
        />
      )}

      {/* Explicit Scene Validation Screen */}
      {sceneTransition && (
        <SceneTransitionModal
          completedScene={sceneTransition.completedScene}
          nextScene={sceneTransition.nextScene}
          playerXp={progress.xp}
          onOpenQuiz={() => setShowQuiz(true)}
          customAssets={customAssets}
          onProceedToNextScene={handleProceedToNextScene}
          onReplayScene={handleReplayScene}
        />
      )}

      {/* In-Game Pause Menu Overlay (Resume, Audio, Return to Main Menu) */}
      {showPauseMenu && !showSplash && (
        <PauseMenuModal
          sceneTitle={getLocalizedScene(currentScene, language).title}
          onResume={() => setShowPauseMenu(false)}
          onReturnToMenu={() => {
            speechManager.stop();
            soundManager.stopAmbient();
            setShowPauseMenu(false);
            setIntroPrologueChapter(null);
            setContemplationState(null);
            setSceneTransition(null);
            setShowSplash(true);
          }}
        />
      )}

      {/* Intro Prologue (Ch. 1 : éveil paupières ; Ch. 2-5 : phrase d'accroche + carton de chapitre) */}
      {viewMode === 'game' && activeTab === 'adventure' && !showSplash && introPrologueChapter && (
        <IntroPrologue
          chapter={introPrologueChapter}
          onComplete={() => setIntroPrologueChapter(null)}
        />
      )}

      {/* Splash Screen Intro with Story Mode & Standalone Quiz */}
      {showSplash && (
        <SplashScreen
          hasSavedGame={progress.xp > 0 || progress.completedScenes.length > 0}
          savedSummary={{
            level: progress.level,
            xp: progress.xp,
            sceneTitle: getLocalizedScene(currentScene, language).title
          }}
          onContinue={() => {
            trackGameStarted(false, progress.level, progress.xp);
            setIntroPrologueChapter(null);
            setShowSplash(false);
            setActiveTab('adventure');
          }}
          onNewGame={() => {
            localStorage.removeItem(STORAGE_KEY);
            trackGameStarted(true, 1, 0);
            setProgress(INITIAL_PROGRESS);
            setIntroPrologueChapter(1);
            setShowSplash(false);
            setActiveTab('adventure');
          }}
          onOpenQuiz={() => setShowQuiz(true)}
          onSelectChapter={(chapter) => {
            const targetSceneId = chapter === 5 ? 40 : chapter === 4 ? 30 : chapter === 3 ? 17 : chapter === 2 ? 10 : 1;
            const targetIdx = ALL_SCENES.findIndex((s) => s.id === targetSceneId);
            trackGameStarted(false, progress.level, progress.xp);
            setProgress((prev) => ({
              ...prev,
              dayNumber: chapter,
              selectedChapter: chapter,
              currentSceneIndex: targetIdx !== -1 ? targetIdx : 0,
              currentBeatIndex: 0
            }));
            setClimaxStep(0);
            setIntroPrologueChapter(chapter);
            setShowSplash(false);
            setActiveTab('adventure');
          }}
          onOpenLanding={WEB_ONLY_FEATURES_ENABLED ? () => handleOpenLanding(true) : undefined}
        />
      )}

      {/* Visual XP Harvest Flying Orbs & Sound Animation */}
      {harvestOverlay && (
        <XpHarvestOverlay
          amount={harvestOverlay.amount}
          reason={harvestOverlay.reason}
          startX={harvestOverlay.startX}
          startY={harvestOverlay.startY}
          onComplete={() => setHarvestOverlay(null)}
        />
      )}

      {/* Support & Mécénat / Founder Unlock Modal (Stripe Web) */}
      {showSupportModal && SUPPORT_ENABLED && (
        <SupportModal
          reason={supportModalReason}
          onClose={() => setShowSupportModal(false)}
          onUnlocked={() => {
            setIsSupporter(true);
            setShowSupportModal(false);
            if (currentScene.id === 9) {
              const ch2Idx = ALL_SCENES.findIndex((s) => s.id === 10);
              setProgress((prev) => ({
                ...prev,
                completedScenes: Array.from(new Set([...prev.completedScenes, 9])),
                dayNumber: 2,
                currentSceneIndex: ch2Idx !== -1 ? ch2Idx : 0,
                currentBeatIndex: 0,
                selectedChapter: 2
              }));
              setActiveTab('adventure');
            }
          }}
        />
      )}

      {/* Cinematic Black Screen — Waswas 100/100 Soft Game Over (matches IntroPrologue aesthetic) */}
      {showWaswasGameOver && (
        <div
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[190] bg-[#07060b] flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-500 select-none"
        >
          <div
            className="pointer-events-none absolute rounded-full blur-3xl"
            style={{
              width: '22rem',
              height: '22rem',
              background:
                'radial-gradient(circle, rgba(139, 92, 246, 0.28) 0%, rgba(88, 28, 135, 0.12) 50%, rgba(0, 0, 0, 0) 75%)',
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-purple-300/85 font-cinzel font-bold">
              {language === 'ar'
                ? 'ضَغْطُ الْوَسْوَاسِ ١٠٠ / ١٠٠'
                : language === 'en'
                  ? 'WASWAS PRESSURE 100 / 100'
                  : 'PRESSION DU WASWÂS 100 / 100'}
            </span>

            <h2
              className={`text-2xl sm:text-4xl font-bold text-[#fde68a] leading-snug drop-shadow-[0_2px_18px_rgba(245,158,11,0.35)] ${
                language === 'ar' ? 'font-amiri text-3xl sm:text-5xl' : 'font-cinzel tracking-wider'
              }`}
            >
              {language === 'ar'
                ? 'تَغَلَّبَ الْوَسْوَاسُ هَذِهِ الْمَرَّةَ…'
                : language === 'en'
                  ? 'The Waswas prevailed this time…'
                  : 'Le Waswâs a pris le dessus cette fois…'}
            </h2>

            <p
              className={`text-[#f7ecd7]/90 leading-relaxed whitespace-pre-line ${
                language === 'ar'
                  ? 'font-amiri text-lg sm:text-2xl leading-loose'
                  : 'font-cinzel text-sm sm:text-lg tracking-wide'
              }`}
            >
              {language === 'ar'
                ? 'كَثُرَتِ الشُّكُوكُ حَتَّى أَثْقَلَتْ قَلْبَ عُثْمَانَ.\nلَا تَيْأَسْ… اِسْتَعِذْ بِاللَّهِ وَابْدَأِ الْفَصْلَ مِنْ جَدِيدٍ بِقَلْبٍ صَافٍ.'
                : language === 'en'
                  ? 'The whispers grew too heavy for Othman’s heart.\nDo not despair… seek refuge in Allah and begin this chapter anew with a clearer heart.'
                  : 'Les murmures du doute sont devenus trop lourds pour le cœur d’Othmân.\nNe te décourage pas… cherche refuge auprès d’Allah et reprends ce chapitre depuis le début.'}
            </p>

            <button
              type="button"
              onClick={() => {
                soundManager.playSelect();
                const ch = getChapterForSceneId(currentScene.id);
                const chapterStartSceneId = ch === 5 ? 40 : ch === 4 ? 30 : ch === 3 ? 17 : ch === 2 ? 10 : 1;
                const startIdx = ALL_SCENES.findIndex((s) => s.id === chapterStartSceneId);
                setShowWaswasGameOver(false);
                setProgress((prev) => ({
                  ...prev,
                  waswasXp: 10,
                  currentSceneIndex: startIdx !== -1 ? startIdx : 0,
                  currentBeatIndex: 0
                }));
                setChoiceResetKey((k) => k + 1);
              }}
              className="mt-3 px-7 py-3 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-300/70 text-[#fde68a] font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.18em] cursor-pointer transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              {language === 'ar'
                ? 'إِعَادَةُ الْفَصْلِ مِنَ الْبِدَايَةِ ↺'
                : language === 'en'
                  ? 'Restart Chapter ↺'
                  : 'Recommencer le chapitre ↺'}
            </button>
          </div>
        </div>
      )}

      {/* Cinematic Black Screen — Othman gained enough XP to challenge the Great Waswas Boss directly! */}
      {bossReadyModal && (
        <div
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[185] bg-[#07060b] flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-500 select-none"
        >
          <div
            className="pointer-events-none absolute rounded-full blur-3xl"
            style={{
              width: '26rem',
              height: '26rem',
              background:
                'radial-gradient(circle, rgba(251, 191, 36, 0.36) 0%, rgba(217, 119, 6, 0.14) 45%, rgba(0, 0, 0, 0) 75%)',
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-amber-300/85 font-cinzel font-bold">
              {language === 'ar'
                ? `الْفَصْلُ ${bossReadyModal.chapter} • اكْتِمَالُ الْيَقِينِ`
                : language === 'en'
                  ? `CHAPTER ${bossReadyModal.chapter} • WISDOM AWAKENED`
                  : `CHAPITRE ${bossReadyModal.chapter} • GRANDE EXPÉRIENCE ACQUISE`}
            </span>

            <h2
              className={`text-2xl sm:text-4xl font-bold text-[#fde68a] leading-snug drop-shadow-[0_2px_20px_rgba(245,158,11,0.45)] ${
                language === 'ar' ? 'font-amiri text-3xl sm:text-5xl' : 'font-cinzel tracking-wider'
              }`}
            >
              {language === 'ar'
                ? 'اكْتَسَبَ عُثْمَانُ خِبْرَةً عَظِيمَةً…'
                : language === 'en'
                  ? 'Othman has gained great experience…'
                  : 'Othmân a acquis une grande expérience…'}
            </h2>

            <p
              className={`text-[#fff7e6]/90 leading-relaxed whitespace-pre-line ${
                language === 'ar'
                  ? 'font-amiri text-lg sm:text-2xl leading-loose'
                  : 'font-cinzel text-sm sm:text-lg tracking-wide'
              }`}
            >
              {language === 'ar'
                ? 'بِفَضْلِ إِجَابَاتِكَ الصَّحِيحَةِ، امْتَلَأَ قَلْبُ عُثْمَانَ نُورًا.\nيُمْكِنُهُ الْآنَ مُوَاجَهَةُ الْوَسْوَاسِ الْأَكْبَرِ مُبَاشَرَةً!'
                : language === 'en'
                  ? 'Through your accurate answers, Othman’s heart has filled with light.\nHe is now ready to confront the Great Waswas directly.'
                  : 'Grâce à tes bonnes réponses, le cœur d’Othmân s’est rempli de lumière.\nIl est désormais prêt à affronter directement le Grand Waswâs.'}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-3 w-full">
              <button
                type="button"
                onClick={() => {
                  soundManager.playQuizSuccess();
                  speechManager.stop();
                  const targetIdx = bossReadyModal.bossIdx;
                  setBossReadyModal(null);
                  setProgress((prev) => ({
                    ...prev,
                    currentSceneIndex: targetIdx,
                    currentBeatIndex: 0
                  }));
                }}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-amber-500/20 hover:bg-amber-500/30 border border-amber-300/80 text-[#fde68a] font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.16em] cursor-pointer transition-all shadow-[0_0_24px_rgba(251,191,36,0.28)]"
              >
                {language === 'ar'
                  ? 'مُوَاجَهَةُ الْوَسْوَاسِ الْأَكْبَرِ الْآنَ'
                  : language === 'en'
                    ? 'Confront the Great Waswas'
                    : 'Affronter le Grand Waswâs'}
              </button>
              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setBossReadyModal(null);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/25 text-[#f7ecd7]/85 font-cinzel font-bold text-xs uppercase tracking-[0.14em] cursor-pointer transition-colors"
              >
                {language === 'ar'
                  ? 'مُتَابَعَةُ الْقِصَّةِ أَوَّلًا'
                  : language === 'en'
                    ? 'Continue story first'
                    : 'Continuer l’histoire d’abord'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cinematic Black Screen — Scene 1 Door Retreat Soft Game Over (matches IntroPrologue aesthetic) */}
      {showDoorRetreatModal && (
        <div
          dir={language === 'ar' ? 'rtl' : 'ltr'}
          className="fixed inset-0 z-[180] bg-[#07060b] flex flex-col items-center justify-center px-6 text-center animate-in fade-in duration-500 select-none"
        >
          <div
            className="pointer-events-none absolute rounded-full blur-3xl"
            style={{
              width: '20rem',
              height: '20rem',
              background:
                'radial-gradient(circle, rgba(245, 158, 11, 0.24) 0%, rgba(180, 83, 9, 0.08) 50%, rgba(0, 0, 0, 0) 75%)',
            }}
          />

          <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-3 duration-500">
            <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-amber-300/80 font-cinzel font-bold">
              {language === 'ar'
                ? 'صَبَاحٌ جَدِيدٌ يَنْتَظِرُكَ'
                : language === 'en'
                  ? 'A NEW MORNING AWAITS'
                  : 'UN NOUVEAU MATIN T’ATTEND'}
            </span>

            <h2
              className={`text-2xl sm:text-4xl font-bold text-[#fde68a] leading-snug drop-shadow-[0_2px_18px_rgba(245,158,11,0.4)] ${
                language === 'ar' ? 'font-amiri text-3xl sm:text-5xl' : 'font-cinzel tracking-wider'
              }`}
            >
              {language === 'ar'
                ? 'غَلَبَ التَّرَدُّدُ هَذِهِ الْمَرَّةَ…'
                : language === 'en'
                  ? 'Doubt won this time…'
                  : 'Le doute a gagné cette fois…'}
            </h2>

            <p
              className={`text-[#f7ecd7]/90 leading-relaxed whitespace-pre-line ${
                language === 'ar'
                  ? 'font-amiri text-lg sm:text-2xl leading-loose'
                  : 'font-cinzel text-sm sm:text-lg tracking-wide'
              }`}
            >
              {language === 'ar'
                ? 'لَمْ يَسْتَطِعْ عُثْمَانُ تَجَاوُزَ الْوَسْوَاسِ الْيَوْمَ، فَعَادَ إِلَى فِرَاشِهِ.\nلَكِنَّ كُلَّ صَبَاحٍ جَدِيدٍ هُوَ فُرْصَةٌ يَمْنَحُهَا اللَّهُ… سَيُحَاوِلُ غَدًا.'
                : language === 'en'
                  ? 'Othman could not overcome the whisper of doubt today and returned to his bed.\nYet every new dawn is a fresh chance from Allah… he will try again tomorrow.'
                  : 'Othmân n’a pas réussi à vaincre son Waswâs aujourd’hui et est retourné s’asseoir sur son lit.\nMais chaque nouveau matin est une chance offerte par Allah… il réessaiera demain.'}
            </p>

            <button
              type="button"
              onClick={() => {
                soundManager.playSelect();
                setShowDoorRetreatModal(false);
                setChoiceResetKey((k) => k + 1);
              }}
              className="mt-3 px-7 py-3 rounded-full bg-amber-500/15 hover:bg-amber-500/25 border border-amber-300/70 text-[#fde68a] font-cinzel font-bold text-xs sm:text-sm uppercase tracking-[0.18em] cursor-pointer transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)]"
            >
              {language === 'ar'
                ? 'الْمُحَاوَلَةُ فِي الْغَدِ ↺'
                : language === 'en'
                  ? 'Try again tomorrow ↺'
                  : 'Réessayer le lendemain ↺'}
            </button>
          </div>
        </div>
      )}

      {/* Subtle Habit & Moral Trait Notification Banner */}
      {habitToast && (
        <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-2xl bg-[#fbf7ee]/95 border-2 border-[#8c5a2b] shadow-[0_4px_12px_rgba(0,0,0,0.25)] flex items-center gap-2.5 max-w-[90vw] sm:max-w-md animate-in fade-in slide-in-from-top-3 duration-300 pointer-events-none backdrop-blur-xs">
          <span className="text-lg shrink-0">🌱</span>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-black uppercase text-[#8c5a2b] font-cinzel tracking-wider leading-none">
              {language === 'ar' ? 'الْعَادَةُ وَالْخُلُقُ' : language === 'en' ? 'Habit & Character' : 'Habitude & Caractère'}
            </span>
            <span className="text-xs font-bold text-[#3a2312] leading-tight mt-0.5 font-cinzel">
              {habitToast}
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
