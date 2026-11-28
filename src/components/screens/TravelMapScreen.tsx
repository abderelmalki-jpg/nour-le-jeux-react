import React, { useState, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Lock,
  Play,
  Sparkles,
  Zap,
  RotateCcw,
  Compass,
  ArrowRight,
  Footprints,
  ShieldCheck
} from 'lucide-react';
import { CHAPTER_1_SCENES } from '../../data/chapter1';
import { CHAPTER_2_SCENES } from '../../data/chapter2';
import { CHAPTER_3_SCENES } from '../../data/chapter3';
import { CHAPTER_4_SCENES } from '../../data/chapter4';
import { CHAPTER_5_SCENES } from '../../data/chapter5';
import { PIXEL_ASSETS } from '../../utils/assets';
import { soundManager } from '../../utils/audio';
import { getLocalizedScene } from '../../utils/narrativeI18n';
import { useLanguage } from '../../context/LanguageContext';
import { CHAPTER_LABELS } from '../../i18n/uiExtras';
import { SCREENS_TRANSLATIONS } from '../../i18n/screensTranslations';

interface TravelMapScreenProps {
  currentSceneIndex: number;
  completedScenes: number[];
  playerXp: number;
  initialChapter?: number;
  isSupporter?: boolean;
  onOpenSupportModal?: () => void;
  onSelectScene: (sceneId: number) => void;
  onOpenKnowledgeQuiz?: () => void;
  onBack: () => void;
}

export const TravelMapScreen: React.FC<TravelMapScreenProps> = ({
  currentSceneIndex,
  completedScenes,
  playerXp,
  initialChapter,
  isSupporter = false,
  onOpenSupportModal,
  onSelectScene,
  onOpenKnowledgeQuiz,
  onBack: _onBack
}) => {
  const { language: uiLanguage, isRtl } = useLanguage();
  const tMap = SCREENS_TRANSLATIONS[uiLanguage]?.travelMap || SCREENS_TRANSLATIONS.fr.travelMap;
  const mapLabels =
    uiLanguage === 'ar'
      ? {
          path: 'الطَّرِيقُ',
          chapter: 'الْفَصْلُ',
          chShort: 'ف.',
          steps: 'خُطُوَاتٍ',
          youAreHere: 'أَنْتَ هُنَا',
          summit: 'الْقِمَّةُ',
          stepOf: (n: number, total: number) => `الْخُطْوَةُ ${n} مِنْ ${total}`,
          validated: '✓ مُكْتَمِلَةٌ (+XP)',
          toCross: 'التَّالِيَةُ',
          replayStep: 'إِعَادَةُ هٰذِهِ الْخُطْوَةِ',
          continueJourney: 'مُتَابَعَةُ الرِّحْلَةِ ←'
        }
      : uiLanguage === 'en'
      ? {
          path: 'THE PATH',
          chapter: 'CHAPTER',
          chShort: 'Ch.',
          steps: 'steps',
          youAreHere: 'YOU ARE HERE',
          summit: 'SUMMIT',
          stepOf: (n: number, total: number) => `Step ${n} of ${total}`,
          validated: '✓ Completed (+XP)',
          toCross: 'Next step',
          replayStep: 'REPLAY THIS STEP',
          continueJourney: 'CONTINUE JOURNEY →'
        }
      : {
          path: 'LE CHEMIN',
          chapter: 'CHAPITRE',
          chShort: 'Ch.',
          steps: 'étapes',
          youAreHere: 'TU ES ICI',
          summit: 'SOMMET',
          stepOf: (n: number, total: number) => `Étape ${n} sur ${total}`,
          validated: '✓ Validée (+XP acquis)',
          toCross: 'À franchir',
          replayStep: 'REJOUER CETTE ÉTAPE',
          continueJourney: 'POURSUIVRE LE VOYAGE →'
        };
  const allScenesCombined = [...CHAPTER_1_SCENES, ...CHAPTER_2_SCENES, ...CHAPTER_3_SCENES, ...CHAPTER_4_SCENES, ...CHAPTER_5_SCENES];
  const currentActiveScene = allScenesCombined[currentSceneIndex] || CHAPTER_1_SCENES[0];
  const isChapter2Unlocked = true;
  const isChapter3Unlocked = true;
  const isChapter4Unlocked = true;
  const isChapter5Unlocked = true;

  // Auto-select smart chapter: all chapters unlocked
  const [activeChapter, setActiveChapter] = useState<1 | 2 | 3 | 4 | 5>(() => {
    if (initialChapter === 1 || initialChapter === 2 || initialChapter === 3 || initialChapter === 4 || initialChapter === 5) {
      return initialChapter;
    }
    if (currentActiveScene.id >= 40 && currentActiveScene.id <= 49) return 5;
    if (currentActiveScene.id >= 30 && currentActiveScene.id <= 39) return 4;
    if (currentActiveScene.id >= 17 && completedScenes.includes(16)) return 3;
    if (currentActiveScene.id >= 10 && completedScenes.includes(9)) return 2;
    return 1;
  });

  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  const [lockedSceneModal, setLockedSceneModal] = useState<{
    sceneTitle: string;
    requiredXp: number;
    gateReason?: string;
    isSpiritualGate?: boolean;
    isFounderRequired?: boolean;
  } | null>(null);

  // Touch Swipe Gesture State for Mobile & Tablet Slider
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diffX = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50; // pixels
      if (diffX > minSwipeDistance) {
        handleNextChapter();
      } else if (diffX < -minSwipeDistance) {
        handlePrevChapter();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Coordinates for the winding trail through the pixel landscape (bottom = beginning, top = apex)
  const roadmapPositionsCh1 = [
    { top: '82%', left: '50%', x: 50, y: 82 }, // 1. La Chambre
    { top: '73%', left: '36%', x: 36, y: 73 }, // 2. Le Poteau
    { top: '64%', left: '64%', x: 64, y: 64 }, // 3. Premier Waswas
    { top: '55%', left: '38%', x: 38, y: 55 }, // 4. « Je ne veux plus être seul »
    { top: '46%', left: '62%', x: 62, y: 46 }, // 5. Le Village
    { top: '37%', left: '36%', x: 36, y: 37 }, // 6. Le Refus
    { top: '28%', left: '64%', x: 64, y: 28 }, // 7. Le Geste
    { top: '19%', left: '42%', x: 42, y: 19 }, // 8. Jardin abandonné
    { top: '10%', left: '50%', x: 50, y: 10 }  // 9. Grand Waswas (Summit Climax)
  ];

  const roadmapPositionsCh2 = [
    { top: '80%', left: '50%', x: 50, y: 80 }, // 10. L'Aube au Grand Poteau
    { top: '70%', left: '35%', x: 35, y: 70 }, // 11. L'Éclat du Marché
    { top: '60%', left: '65%', x: 65, y: 60 }, // 12. L'Épreuve du Silence
    { top: '50%', left: '50%', x: 50, y: 50 }, // 13. La Fontaine aux Vignes
    { top: '38%', left: '32%', x: 32, y: 38 }, // 14. 14A. La Parure de Douceur
    { top: '38%', left: '68%', x: 68, y: 38 }, // 142. 14B. Le Murmure sous la Treille
    { top: '22%', left: '50%', x: 50, y: 22 }, // 15. L'Ombre de la Rancœur
    { top: '10%', left: '50%', x: 50, y: 10 }  // 16. Le Cœur Paisible
  ];

  const roadmapPositionsCh3 = [
    { top: '82%', left: '50%', x: 50, y: 82 }, // 17. Le Matin Difficile
    { top: '74%', left: '35%', x: 35, y: 74 }, // 18. Le Dispensaire
    { top: '66%', left: '65%', x: 65, y: 66 }, // 19. Celui qui prie avec une attelle
    { top: '58%', left: '50%', x: 50, y: 58 }, // 20. Les Remèdes Prophétiques
    { top: '50%', left: '32%', x: 32, y: 50 }, // 201. 20A. Cueillette
    { top: '50%', left: '68%', x: 68, y: 50 }, // 202. 20B. Manuscrit
    { top: '41%', left: '50%', x: 50, y: 41 }, // 21. Le Poids de la Halte
    { top: '33%', left: '35%', x: 35, y: 33 }, // 22. Nommer la Douleur
    { top: '25%', left: '65%', x: 65, y: 25 }, // 23. L'Amānah du Corps
    { top: '17%', left: '38%', x: 38, y: 17 }, // 24. La Graine sous Terre
    { top: '9%',  left: '50%', x: 50, y: 9 }   // 25. La Montagne Intérieure
  ];

  // Config data for each of the 3 chapters
  const CHAPTERS = [
    {
      id: 1 as const,
      number: 1,
      title: 'Le Réveil & Le Grand Poteau',
      theme: 'La lutte contre la paresse & le premier départ',
      scenes: CHAPTER_1_SCENES,
      requiredXp: 0,
      isUnlocked: true,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-400',
      accentColor: '#d97c27',
      icon: '📜',
      positions: roadmapPositionsCh1,
      isComplete: CHAPTER_1_SCENES.every((s) => completedScenes.includes(s.id))
    },
    {
      id: 2 as const,
      number: 2,
      title: 'Le Chemin du Hilm',
      theme: 'La maîtrise de la colère & la douceur prophétique',
      scenes: CHAPTER_2_SCENES,
      requiredXp: 450,
      isUnlocked: isChapter2Unlocked,
      badgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-400',
      accentColor: '#2d6a4f',
      icon: '🌿',
      positions: roadmapPositionsCh2,
      isComplete:
        [10, 11, 12, 13, 15, 16].every((id) => completedScenes.includes(id)) &&
        (completedScenes.includes(14) || completedScenes.includes(142))
    },
    {
      id: 3 as const,
      number: 3,
      title: 'La Montagne Intérieure',
      theme: "L'épreuve, la patience (Sabr) & l'élévation",
      scenes: CHAPTER_3_SCENES,
      requiredXp: 780,
      isUnlocked: isChapter3Unlocked,
      badgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-400',
      accentColor: '#0e7490',
      icon: '🏔️',
      positions: roadmapPositionsCh3,
      isComplete:
        [17, 18, 19, 20, 21, 22, 23, 24, 25].every((id) => completedScenes.includes(id)) &&
        (completedScenes.includes(201) || completedScenes.includes(202))
    },
    {
      id: 4 as const,
      number: 4,
      title: 'Ce que tu as encore',
      theme: 'La bonté envers les parents (Birr al-Wālidayn)',
      scenes: CHAPTER_4_SCENES,
      requiredXp: 0,
      isUnlocked: isChapter4Unlocked,
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-400',
      accentColor: '#9f1239',
      icon: '🌳',
      positions: [
        { top: '12%', left: '50%', x: 50, y: 12 },
        { top: '26%', left: '30%', x: 30, y: 26 },
        { top: '40%', left: '70%', x: 70, y: 40 },
        { top: '55%', left: '32%', x: 32, y: 55 },
        { top: '69%', left: '68%', x: 68, y: 69 },
        { top: '82%', left: '38%', x: 38, y: 82 },
        { top: '92%', left: '50%', x: 50, y: 92 }
      ],
      isComplete: [30, 31, 32, 33, 34, 35, 36].every((id) => completedScenes.includes(id))
    },
    {
      id: 5 as const,
      number: 5,
      title: 'Le Sommet de la Persévérance',
      theme: 'La constance (As-Sabr) & Finale Saison 1',
      scenes: CHAPTER_5_SCENES,
      requiredXp: 0,
      isUnlocked: isChapter5Unlocked,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-500',
      accentColor: '#b45309',
      icon: '⛰️',
      positions: [
        { top: '85%', left: '50%', x: 50, y: 85 },
        { top: '70%', left: '34%', x: 34, y: 70 },
        { top: '55%', left: '66%', x: 66, y: 55 },
        { top: '40%', left: '36%', x: 36, y: 40 },
        { top: '24%', left: '62%', x: 62, y: 24 },
        { top: '10%', left: '50%', x: 50, y: 10 }
      ],
      isComplete: [40, 41, 42, 43, 44, 45].every((id) => completedScenes.includes(id))
    }
  ];

  const currentChapterConfig = CHAPTERS[activeChapter - 1];
  const prevChapterConfig = activeChapter > 1 ? CHAPTERS[activeChapter - 2] : null;
  const nextChapterConfig = activeChapter < 5 ? CHAPTERS[activeChapter] : null;

  const handlePrevChapter = () => {
    if (activeChapter > 1) {
      soundManager.playSelect();
      setSlideDirection('left');
      setActiveChapter((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5);
    }
  };

  const handleNextChapter = () => {
    if (activeChapter < 5) {
      soundManager.playSelect();
      setSlideDirection('right');
      setActiveChapter((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5);
    }
  };

  const handleSelectChapterDirectly = (chapterNumber: 1 | 2 | 3 | 4 | 5) => {
    if (chapterNumber === activeChapter) return;
    soundManager.playSelect();
    setSlideDirection(chapterNumber > activeChapter ? 'right' : 'left');
    setActiveChapter(chapterNumber);
  };

  // Branch completion detection
  const isBranchCompletedCh1 = completedScenes.includes(5) || completedScenes.includes(6) || completedScenes.includes(7);
  const isBranchCompletedCh2 = completedScenes.includes(14) || completedScenes.includes(142);
  const isBranchCompletedCh3 = completedScenes.includes(201) || completedScenes.includes(202);

  // Identify next uncompleted playable scene in this chapter
  const uncompletedInChapter = currentChapterConfig.scenes.filter((s) => {
    if (completedScenes.includes(s.id)) return false;
    if ((s.id === 5 || s.id === 6 || s.id === 7) && isBranchCompletedCh1) return false;
    if (s.id === 142 && isBranchCompletedCh2) return false;
    if (s.id === 202 && isBranchCompletedCh3) return false;
    return true;
  });

  const nextPlayableScene = uncompletedInChapter.length > 0
    ? uncompletedInChapter[0]
    : currentChapterConfig.scenes[currentChapterConfig.scenes.length - 1];

  // Focused Scene state: by default the next playable scene, or whatever node the player tapped on
  const [selectedSceneId, setSelectedSceneId] = useState<number>(nextPlayableScene.id);

  // Resolve focused scene details
  const focusedScene = allScenesCombined.find((s) => s.id === selectedSceneId) || nextPlayableScene;
  const isFocusedCompleted = completedScenes.includes(focusedScene.id);
  const isFocusedCurrent = focusedScene.id === nextPlayableScene.id && !isFocusedCompleted;
  
  // Toutes les étapes et chapitres sont débloqués.
  const isFocusedLocked = false;

  const handleNodeClick = (
    sceneId: number,
    _requiredXp: number,
    _sceneTitle: string,
    _gateReason?: string,
    _isSpiritualGate?: boolean
  ) => {
    soundManager.playSelect();
    setSelectedSceneId(sceneId);
  };

  const handleLaunchScene = (sceneId: number) => {
    const target = allScenesCombined.find((s) => s.id === sceneId);
    if (!target) return;
    soundManager.playSelect();
    onSelectScene(sceneId);
  };

  const completedCount = currentChapterConfig.scenes.filter((s) => completedScenes.includes(s.id)).length;
  const totalScenes = currentChapterConfig.scenes.length;

  // Build SVG path string for winding trail connecting all nodes
  const buildSvgPath = () => {
    const pts = currentChapterConfig.positions;
    if (!pts || pts.length === 0) return '';
    let d = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1];
      const cur = pts[i];
      // Smooth curve between nodes
      const cx1 = prev.x;
      const cy1 = (prev.y + cur.y) / 2;
      const cx2 = cur.x;
      const cy2 = (prev.y + cur.y) / 2;
      d += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${cur.x} ${cur.y}`;
    }
    return d;
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="flex-1 min-h-0 flex flex-col w-full h-full max-w-6xl mx-auto px-2.5 sm:px-4 lg:px-6 pt-2 pb-20 md:py-2 select-none relative overflow-y-auto md:overflow-hidden custom-scrollbar"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ========================================================= */}
      {/* 1. HEADER ÉPURÉ : LE CHEMIN • TITRE DU CHAPITRE           */}
      {/* ========================================================= */}
      <div className="w-full flex items-center justify-between gap-2 sm:gap-4 px-3 sm:px-5 py-2 sm:py-2.5 bg-[#fbf7ee] rounded-2xl sm:rounded-3xl border-3 border-[#3a2312] shadow-[0_4px_0_#3a2312] shrink-0 mb-1.5 sm:mb-2">
        {/* Flèche Chapitre Précédent */}
        <button
          onClick={handlePrevChapter}
          disabled={activeChapter === 1}
          aria-label="Chapitre précédent"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#3a2312] bg-gradient-to-b from-[#fcd34d] via-[#f59e0b] to-[#d97706] hover:from-[#fde047] hover:to-[#f59e0b] text-[#3a2312] shadow-[0_2px_0_#3a2312] sm:shadow-[0_3px_0_#3a2312] active:translate-y-0.5 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center shrink-0 cursor-pointer transition-all"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3.5] text-[#3a2312]" />
        </button>

        {/* Centre : Titre Noble & Chapitres */}
        <div className="flex-1 min-w-0 flex flex-col items-center text-center justify-center px-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-[#8c5a2b] font-cinzel flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-[#d97c27]" />
              <span>{mapLabels.path} • {mapLabels.chapter} {currentChapterConfig.number}</span>
            </span>
            <span className="text-[10px] sm:text-xs font-black text-[#d97c27]">•</span>
            <span className="text-[10px] sm:text-xs font-bold text-[#2d6a4f] font-cinzel">
              {completedCount}/{totalScenes} {mapLabels.steps}
            </span>
          </div>

          <h2 className="text-xs sm:text-base lg:text-lg font-black text-[#3a2312] font-cinzel truncate max-w-[240px] sm:max-w-md mt-0.5">
            {(CHAPTER_LABELS[uiLanguage] || CHAPTER_LABELS.fr).items[currentChapterConfig.number]?.title || currentChapterConfig.title}
          </h2>

          <p className="hidden sm:block text-[11px] text-[#6b4724] italic font-medium truncate max-w-lg mt-0.5">
            « {(CHAPTER_LABELS[uiLanguage] || CHAPTER_LABELS.fr).items[currentChapterConfig.number]?.subtitle || currentChapterConfig.theme} »
          </p>

          {/* Onglets Ch. 1..5 */}
          <div className="flex items-center gap-1.5 mt-1 sm:mt-1.5 flex-wrap justify-center">
            {CHAPTERS.map((chap) => {
              const isActive = chap.id === activeChapter;
              return (
                <button
                  key={chap.id}
                  onClick={() => handleSelectChapterDirectly(chap.id)}
                  className={`flex items-center gap-1 px-2.5 py-0.5 rounded-lg sm:rounded-xl border font-cinzel text-[10px] sm:text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#3a2312] text-amber-200 border-[#3a2312] shadow-xs scale-105'
                      : chap.isUnlocked
                      ? 'bg-[#ebdfc8] hover:bg-[#dfceb3] text-[#3a2312] border-[#8c6b4e]'
                      : 'bg-stone-200/80 text-stone-500 border-dashed border-stone-400 opacity-70'
                  }`}
                >
                  <span>{chap.icon}</span>
                  <span>{mapLabels.chShort} {chap.number}</span>
                  {!chap.isUnlocked && <Lock className="w-2.5 h-2.5 text-stone-500" />}
                  {chap.isComplete && <span className="text-emerald-600 font-black">✓</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Flèche Chapitre Suivant */}
        <button
          onClick={handleNextChapter}
          disabled={activeChapter === 5}
          aria-label="Chapitre suivant"
          className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl border-2 sm:border-3 border-[#3a2312] bg-gradient-to-b from-[#fcd34d] via-[#f59e0b] to-[#d97706] hover:from-[#fde047] hover:to-[#f59e0b] text-[#3a2312] shadow-[0_2px_0_#3a2312] sm:shadow-[0_3px_0_#3a2312] active:translate-y-0.5 disabled:opacity-25 disabled:pointer-events-none flex items-center justify-center shrink-0 cursor-pointer transition-all"
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[3.5] text-[#3a2312]" />
        </button>
      </div>

      {/* ========================================================= */}
      {/* 2. CORPS CENTRAL : LA CARTE SENTIER + FICHE D'ÉTAPE       */}
      {/* ========================================================= */}
      <div className="flex-1 md:min-h-0 flex flex-col md:flex-row items-center justify-start md:justify-center gap-3 sm:gap-4 lg:gap-6 w-full md:h-full md:overflow-hidden">
        
        {/* ======================================================= */}
        {/* 🗺️ CANVAS DE LA CARTE : SENTIER DU VOYAGE AVEC TRACÉ   */}
        {/* ======================================================= */}
        <div
          key={`chapter-path-${activeChapter}`}
          className={`relative w-full max-w-[440px] lg:max-w-[480px] h-[440px] sm:h-[490px] md:h-full md:flex-1 md:max-h-[calc(100vh-175px)] rounded-2xl sm:rounded-3xl border-3 border-[#3a2312] overflow-hidden shadow-[0_6px_0_#3a2312] bg-[#b8956e] shrink-0 ${
            slideDirection === 'right'
              ? 'animate-in slide-in-from-right duration-300'
              : slideDirection === 'left'
              ? 'animate-in slide-in-from-left duration-300'
              : ''
          }`}
        >
          {/* Illustration de fond de la carte */}
          <img
            src={PIXEL_ASSETS.map}
            alt={`Chemin du Chapitre ${activeChapter}`}
            className="w-full h-full object-cover filter saturate-[1.1]"
          />

          {/* Vignette d'ambiance et de contraste */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

          {/* Tracé SVG du sentier (Winding Trail Line) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Ombre du sentier */}
            <path
              d={buildSvgPath()}
              fill="none"
              stroke="rgba(58, 35, 18, 0.75)"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Ligne du sentier dorée en pointillé RPG */}
            <path
              d={buildSvgPath()}
              fill="none"
              stroke="#fde047"
              strokeWidth="2.2"
              strokeDasharray="2.5 2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="opacity-90"
            />
          </svg>

          {/* Nœuds interactifs le long du chemin */}
          {currentChapterConfig.scenes.map((scene, index) => {
            const isCompleted = completedScenes.includes(scene.id);
            const isCurrent = scene.id === nextPlayableScene.id && !isCompleted;
            const isUnlocked = true;
            const isSelected = scene.id === focusedScene.id;
            const pos = currentChapterConfig.positions[index] || { top: '50%', left: '50%', x: 50, y: 50 };
            const safeLeft = `${Math.min(68, Math.max(32, pos.x ?? 50))}%`;
            const isBoss = scene.id === 9 || scene.id === 15 || scene.id === 25 || scene.id === 35 || scene.id === 44;

            return (
              <div
                key={scene.id}
                style={{ top: pos.top, left: safeLeft }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group cursor-pointer transition-all duration-200 ${
                  isCurrent || isSelected ? 'scale-105 z-30' : 'hover:scale-105'
                }`}
                onClick={() =>
                  handleNodeClick(
                    scene.id,
                    scene.requiredXp || 0,
                    scene.title,
                    scene.gateReason,
                    scene.isSpiritualGate
                  )
                }
              >
                {/* Badge TU ES ICI / ÉTAPE ACTUELLE au-dessus du nœud */}
                {isCurrent && (
                  <div className="absolute -top-5 sm:-top-6 flex items-center gap-1 bg-[#3a2312] text-amber-300 font-cinzel font-black text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full border border-amber-400 shadow-md animate-bounce whitespace-nowrap">
                    <Footprints className="w-2.5 h-2.5" />
                    <span>{mapLabels.youAreHere}</span>
                  </div>
                )}

                {/* Pastille / Nœud de l'Étape */}
                <div
                  className={`flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1.5 max-w-[165px] sm:max-w-[210px] rounded-2xl border-2 transition-all font-cinzel text-xs shadow-[0_3px_0_#3a2312] ${
                    isCurrent
                      ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-stone-950 font-black ring-2 sm:ring-4 ring-amber-400/90 shadow-[0_0_16px_rgba(245,158,11,0.7),0_3px_0_#3a2312]'
                      : isSelected
                      ? 'bg-amber-100 border-[#d97c27] text-[#3a2312] ring-2 ring-[#d97c27]'
                      : isCompleted
                      ? 'bg-[#ebf5e9] border-[#2d522f] text-[#1b4332]'
                      : isUnlocked
                      ? 'bg-[#fbf7ee] border-[#3a2312] text-[#3a2312] hover:bg-[#ebdfc8]'
                      : 'bg-[#e4d7c0]/95 border-dashed border-[#8c6b4e] text-[#6b5037] opacity-80'
                  }`}
                >
                  {/* Icône d'état */}
                  {isCurrent ? (
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#3a2312] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                      <Play className="w-2 h-2 sm:w-2.5 sm:h-2.5 fill-current ml-0.5" />
                    </span>
                  ) : isCompleted ? (
                    <span className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full bg-[#4a804d] text-white flex items-center justify-center text-[9px] sm:text-[10px] font-black shrink-0">
                      ✓
                    </span>
                  ) : !isUnlocked ? (
                    <Lock className="w-3 h-3 text-[#8c5a2b] shrink-0" />
                  ) : (
                    <span className="text-[10px] font-bold text-[#8c5a2b] shrink-0">{index + 1}.</span>
                  )}

                  {/* Nom court de l'étape */}
                  <span className="text-[9.5px] sm:text-[11px] font-bold truncate tracking-tight">
                    {getLocalizedScene(scene, uiLanguage).title}
                  </span>

                  {/* Badge Spécial Sommet */}
                  {isBoss && !isCurrent && (
                    <span className="text-[7.5px] font-black uppercase bg-[#8b0000] text-amber-200 border border-amber-500/60 px-1 py-0.2 rounded-md tracking-wider shrink-0">
                      {mapLabels.summit}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================= */}
        {/* 📜 FICHE D'ÉTAPE & ACTION : PANNEAU UNIQUE & ÉPURÉ      */}
        {/* ======================================================= */}
        <div className="w-full md:w-80 lg:w-96 bg-[#fbf7ee] rounded-2xl sm:rounded-3xl border-3 border-[#3a2312] p-3.5 sm:p-5 shadow-[0_5px_0_#3a2312] flex flex-col justify-between shrink-0">
          
          {/* En-tête de la scène sélectionnée */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between border-b border-[#ebdcc4] pb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-black uppercase tracking-wider text-[#8c5a2b] font-cinzel">
                  {mapLabels.stepOf(Math.max(1, currentChapterConfig.scenes.findIndex((s) => s.id === focusedScene.id) + 1), totalScenes)}
                </span>
                {isFocusedCompleted && (
                  <span className="text-[9px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.2 rounded-md">
                    {mapLabels.validated}
                  </span>
                )}
              </div>

              {isFocusedCurrent && (
                <span className="text-[9px] font-black uppercase bg-amber-400 text-stone-950 px-2 py-0.5 rounded-full border border-[#3a2312] font-cinzel shadow-xs">
                  {mapLabels.toCross}
                </span>
              )}
            </div>

            {/* Titre et Sous-titre */}
            <div>
              <h3 className="text-sm sm:text-base lg:text-lg font-black font-cinzel text-[#3a2312] leading-tight">
                {getLocalizedScene(focusedScene, uiLanguage).title}
              </h3>
              <p className="text-xs text-[#d97c27] font-bold mt-0.5">
                {getLocalizedScene(focusedScene, uiLanguage).subtitle}
              </p>
              <p className="text-[11px] text-[#6b4724] italic mt-1 bg-[#f3ebd9] p-2 rounded-xl border border-[#d2be9f]">
                📍 {getLocalizedScene(focusedScene, uiLanguage).location}
              </p>
            </div>
          </div>

          {/* Bouton d'action principal */}
          <div className="mt-3 pt-2 border-t border-[#ebdcc4] flex flex-col gap-2">
            {isFocusedLocked ? (
              <div className="flex flex-col gap-1.5">
                {focusedScene.id >= 10 && !isSupporter ? (
                  <div className="flex flex-col gap-1 w-full">
                    <button
                      onClick={() =>
                        setLockedSceneModal({
                          sceneTitle: getLocalizedScene(focusedScene, uiLanguage).title,
                          requiredXp: focusedScene.id >= 17 ? 780 : 450,
                          gateReason: tMap.founderAccessPrice,
                          isFounderRequired: true
                        })
                      }
                      className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-stone-950 font-black font-cinzel text-xs border-2 border-[#3a2312] shadow-xs active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Lock className="w-4 h-4 text-stone-900" />
                      <span>{tMap.founderRequiredTitle} ({tMap.founderAccessPrice})</span>
                    </button>
                    <span className="text-[10px] text-emerald-800 font-bold text-center">
                      {tMap.founderGuarantee}
                    </span>
                  </div>
                ) : (
                  <button
                    onClick={() =>
                      handleNodeClick(
                        focusedScene.id,
                        focusedScene.requiredXp || 0,
                        getLocalizedScene(focusedScene, uiLanguage).title,
                        focusedScene.gateReason,
                        focusedScene.isSpiritualGate
                      )
                    }
                    className="w-full py-2.5 px-4 rounded-xl bg-amber-200 hover:bg-amber-300 text-amber-950 font-black font-cinzel text-xs border-2 border-[#3a2312] shadow-xs active:translate-y-0.5 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Lock className="w-4 h-4 text-amber-900" />
                    <span>{tMap.lockedDoorTitle} ({focusedScene.requiredXp} XP)</span>
                  </button>
                )}
                {onOpenKnowledgeQuiz && !(focusedScene.id >= 10 && !isSupporter) && (
                  <button
                    onClick={onOpenKnowledgeQuiz}
                    className="w-full py-1.5 px-3 rounded-lg bg-[#2d6a4f] hover:bg-[#23533e] text-white font-bold font-cinzel text-[10px] shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Zap className="w-3 h-3 fill-amber-300 text-amber-300" />
                    <span>{tMap.quizXpBtn}</span>
                  </button>
                )}
              </div>
            ) : isFocusedCompleted ? (
              <button
                onClick={() => handleLaunchScene(focusedScene.id)}
                className="w-full py-2.5 px-4 rounded-xl bg-[#ebdfc8] hover:bg-[#dfceb3] text-[#3a2312] font-black font-cinzel text-xs sm:text-sm border-2 border-[#3a2312] shadow-[0_2px_0_#3a2312] active:translate-y-0.5 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-4 h-4 text-[#8c5a2b]" />
                <span>{mapLabels.replayStep}</span>
              </button>
            ) : (
              <button
                onClick={() => handleLaunchScene(focusedScene.id)}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-amber-300 hover:to-yellow-300 text-stone-950 font-black font-cinzel text-xs sm:text-sm border-2 border-[#3a2312] shadow-[0_3px_0_#3a2312] hover:-translate-y-0.5 active:translate-y-0 active:shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{mapLabels.continueJourney}</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Modal Porte Spirituelle / Scène Verrouillée */}
      {lockedSceneModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none"
          onClick={() => setLockedSceneModal(null)}
        >
          <div
            className="w-full max-w-sm bg-[#fbf7ee] border-3 border-[#3a2312] rounded-3xl p-5 shadow-[0_8px_0_#3a2312] flex flex-col items-center gap-3 text-center animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border-2 border-[#3a2312] shadow-xs flex items-center justify-center text-[#d97c27]">
              {lockedSceneModal.isFounderRequired ? <Sparkles className="w-6 h-6 fill-amber-500 text-amber-600" /> : <Lock className="w-6 h-6" />}
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-[#8c5a2b] font-cinzel">
                {lockedSceneModal.isFounderRequired ? tMap.founderRequiredTitle : tMap.lockedDoorTitle}
              </span>
              <h3 className="text-base font-black text-[#3a2312] font-cinzel mt-1">
                {lockedSceneModal.sceneTitle}
              </h3>
            </div>

            <p className="text-xs text-[#6b4724] leading-relaxed bg-[#f3ebd9] p-3 rounded-xl border border-[#d2be9f]">
              {lockedSceneModal.gateReason || tMap.lockedReason(lockedSceneModal.requiredXp)}
            </p>

            {lockedSceneModal.isFounderRequired ? (
              <div className="flex flex-col gap-2.5 w-full mt-1">
                <div className="w-full p-2.5 rounded-xl bg-emerald-50 border border-emerald-400 text-emerald-900 text-[11px] font-bold flex items-center justify-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{tMap.founderGuarantee}</span>
                </div>

                <div className="w-full flex items-center justify-between bg-[#ebdfc8] py-2 px-3 rounded-xl border border-[#3a2312] text-xs font-bold text-[#3a2312]">
                  <span>{tMap.founderRequiredTitle}</span>
                  <span className="text-amber-700 font-black font-mono">{tMap.founderAccessPrice}</span>
                </div>

                <button
                  onClick={() => {
                    setLockedSceneModal(null);
                    onOpenSupportModal?.();
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-black text-xs font-cinzel shadow-md flex items-center justify-center gap-2 cursor-pointer active:translate-y-0.5 border-2 border-[#1b4332]"
                >
                  <Sparkles className="w-4 h-4 fill-amber-300 text-amber-300" />
                  <span>{tMap.unlockFounderBtn}</span>
                </button>

                <button
                  onClick={() => setLockedSceneModal(null)}
                  className="w-full py-1.5 px-3 rounded-xl bg-[#ebdfc8] hover:bg-[#dfceb3] text-[#3a2312] font-bold text-xs font-cinzel border border-[#3a2312] cursor-pointer"
                >
                  {tMap.closeBtn}
                </button>
              </div>
            ) : (
              <>
                <div className="w-full flex items-center justify-center gap-2 bg-[#ebdfc8] py-1.5 px-3 rounded-xl border border-[#3a2312] text-xs font-bold text-[#3a2312]">
                  <span>{tMap.yourXp(playerXp, lockedSceneModal.requiredXp)}</span>
                </div>

                <div className="flex flex-col gap-2 w-full mt-1">
                  {onOpenKnowledgeQuiz && (
                    <button
                      onClick={() => {
                        setLockedSceneModal(null);
                        onOpenKnowledgeQuiz();
                      }}
                      className="w-full py-2 px-3 rounded-xl bg-[#2d6a4f] hover:bg-[#1b4332] text-white font-black text-xs font-cinzel shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Zap className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                      <span>{tMap.quizXpBtn}</span>
                    </button>
                  )}

                  <button
                    onClick={() => setLockedSceneModal(null)}
                    className="w-full py-2 px-3 rounded-xl bg-[#ebdfc8] hover:bg-[#dfceb3] text-[#3a2312] font-bold text-xs font-cinzel border border-[#3a2312] cursor-pointer"
                  >
                    {tMap.understoodBtn}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
