import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, RotateCcw, Lock, Clock, Heart, Award, Sparkles, BookOpen, Shield, HelpCircle, Film, ArrowLeft } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { speechManager } from '../utils/speech';
import { useLanguage } from '../context/LanguageContext';
import { UI_EXTRAS, CHAPTER_LABELS } from '../i18n/uiExtras';
import { SupportModal } from './SupportModal';

import bgCh2 from '../assets/images/bg_marche_fruits_renverses.jpg';
import bgCh3 from '../assets/images/bg_mosquee_marches_attelle.jpg';
import bgCh4 from '../assets/images/bg_maison_soins_apothicaire.jpg';
import bgCh5 from '../assets/images/bg_climax_apaise.jpg';

interface SplashScreenProps {
  hasSavedGame?: boolean;
  savedSummary?: {
    level: number;
    xp: number;
    sceneTitle: string;
  };
  onContinue: () => void;
  onNewGame: () => void;
  onOpenQuiz?: () => void;
  onSelectChapter?: (chapter: 1 | 2 | 3 | 4 | 5) => void;
  onOpenLanding?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  hasSavedGame = false,
  savedSummary,
  onContinue,
  onNewGame,
  onOpenQuiz,
  onSelectChapter,
  onOpenLanding
}) => {
  const { language: uiLang, setLanguage } = useLanguage();
  const ux = UI_EXTRAS[uiLang] || UI_EXTRAS.fr;

  // Navigation mode between screens inspired by Evoland
  const [screenMode, setScreenMode] = useState<
    'title' | 'story_menu' | 'continue_slots' | 'options' | 'achievements' | 'chapters'
  >('title');

  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showCinematic, setShowCinematic] = useState(false);
  const [cinematicProgress, setCinematicProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const cinematicVideoRef = useRef<HTMLVideoElement | null>(null);

  const [isFadingOut, setIsFadingOut] = useState(false);
  const [showNewGameConfirm, setShowNewGameConfirm] = useState(false);

  // Audio / Speech State
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => !soundManager.getMuted());
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(() => speechManager.isVoiceEnabled());

  const handleSkipCinematic = () => {
    try {
      sessionStorage.setItem('nour_seen_cinematic', 'true');
    } catch {
      // ignore
    }
    setShowCinematic(false);
  };

  const finalizeAction = (actionType: 'continue' | 'new') => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (actionType === 'continue') {
        onContinue();
      } else {
        onNewGame();
      }
    }, 450);
  };

  const handleAction = (actionType: 'continue' | 'new') => {
    if (isFadingOut) return;
    try {
      soundManager.playSelect();
      speechManager.unlock();
    } catch {
      // Audio fallback
    }
    finalizeAction(actionType);
  };

  const handleSelectChapter = (chapter: 1 | 2 | 3 | 4 | 5) => {
    if (isFadingOut) return;
    try {
      soundManager.playSelect();
      speechManager.unlock();
    } catch {
      // Audio fallback
    }
    setIsFadingOut(true);
    setTimeout(() => {
      if (onSelectChapter) {
        onSelectChapter(chapter);
      } else {
        onNewGame();
      }
    }, 450);
  };

  const toggleSound = () => {
    const next = !soundEnabled;
    soundManager.setMuted(!next);
    setSoundEnabled(next);
    if (next) soundManager.playSelect();
  };

  const toggleVoice = () => {
    soundManager.playSelect();
    const next = speechManager.toggleVoice();
    setVoiceEnabled(next);
  };

  const subtitleText =
    uiLang === 'ar' ? 'طَرِيقُ الحِكْمَة' : uiLang === 'en' ? 'The Path of Wisdom' : 'La Voie de la Sagesse';

  return (
    <>
      {/* ============================================================ */}
      {/* 1. CINÉMATIQUE OPTIONNELLE */}
      {/* ============================================================ */}
      {showCinematic && (
        <div
          onClick={handleSkipCinematic}
          className="fixed inset-0 z-[150] bg-black flex flex-col justify-between select-none animate-in fade-in duration-300 overflow-hidden cursor-pointer"
        >
          <video
            ref={cinematicVideoRef}
            autoPlay
            muted={isMuted}
            playsInline
            preload="auto"
            onPlay={() => setIsPlaying(true)}
            onPlaying={() => setIsPlaying(true)}
            onTimeUpdate={() => {
              if (cinematicVideoRef.current) {
                const { currentTime, duration } = cinematicVideoRef.current;
                if (duration > 0) setCinematicProgress((currentTime / duration) * 100);
              }
            }}
            onEnded={handleSkipCinematic}
            onError={handleSkipCinematic}
            className="absolute inset-0 w-full h-full object-cover z-10"
          >
            <source src="/nour_le_jeu_trailer_25s.mp4" type="video/mp4" />
            <source src="/intro_cinematic.mp4" type="video/mp4" />
          </video>
          <div className="relative z-30 flex items-center justify-between p-4 w-full max-w-4xl mx-auto">
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (cinematicVideoRef.current) {
                  const nextMuted = !isMuted;
                  cinematicVideoRef.current.muted = nextMuted;
                  setIsMuted(nextMuted);
                }
              }}
              className="pixel-tile-btn px-3 py-1 text-xs font-bold"
            >
              {isMuted ? '🔇 Son coupé' : '🔊 Son actif'}
            </button>
            <button onClick={handleSkipCinematic} className="pixel-tile-btn px-4 py-1.5 text-xs font-bold">
              Passer ▶
            </button>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* 2. ÉCRAN DE MENU PRINCIPAL INSPIRÉ D'EVOLAND II */}
      {/* ============================================================ */}
      <div
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-between p-4 sm:p-6 bg-[#bce2f5] text-[#3c2311] select-none transition-all duration-300 overflow-hidden ${
          isFadingOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        {/* Décor de jeu clair et lumineux en pixel art */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/game-assets/title_screen_bg.jpg')`,
            filter: 'brightness(1.06) saturate(1.12)',
            imageRendering: 'auto'
          }}
        />

        {/* Voile de clarté très léger pour faire ressortir les tuiles sans assombrir le paysage */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-sky-400/10 via-transparent to-amber-950/20" />

        {/* Barre Supérieure : Sélecteur de langue & Raccourcis discrets */}
        <div className="relative z-20 w-full max-w-lg flex items-center justify-between px-2 pt-1 pointer-events-auto">
          {/* Sélecteur de langue rétro tuiles */}
          <div className="flex items-center gap-1.5 bg-[#fbf7ee]/90 p-1 rounded-md border-2 border-[#3c2311] shadow-[0_3px_0_#241407]">
            {(['fr', 'ar', 'en'] as const).map((l) => (
              <button
                key={l}
                onClick={() => {
                  soundManager.playSelect();
                  setLanguage(l);
                }}
                className={`px-2 py-0.5 font-pixel text-xs font-bold rounded transition-all cursor-pointer ${
                  uiLang === l
                    ? 'bg-[#d97c27] text-white shadow-xs scale-105'
                    : 'text-[#5c3a21] hover:bg-[#ebdcc0]'
                }`}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Bouton Cinématique / Prologue */}
          <button
            onClick={() => {
              soundManager.playSelect();
              setShowCinematic(true);
            }}
            className="pixel-tile-btn px-2.5 py-1 text-xs font-bold flex items-center gap-1.5"
            title="Voir le prologue"
          >
            <Film className="w-3.5 h-3.5 text-[#d97c27]" />
            <span className="hidden xs:inline">
              {uiLang === 'ar' ? 'المشهد' : uiLang === 'en' ? 'Prologue' : 'Cinématique'}
            </span>
          </button>
        </div>

        {/* CENTRE : TITRE EN PIXEL ART & MENUS TUILES CLAIRES */}
        <div className="relative z-20 w-full max-w-sm flex-1 flex flex-col items-center justify-center my-auto py-2">
          {/* ========================================================= */}
          {/* GRAND TITRE RPG DU JEU EN PIXEL ART */}
          {/* ========================================================= */}
          <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 select-none">
            {/* NOUR Title with Golden Gradient & Deep Shadow */}
            <h1
              className="font-pixel text-5xl sm:text-6xl md:text-7xl font-black uppercase text-center tracking-widest"
              style={{
                background: 'linear-gradient(180deg, #fff3a8 0%, #ffcf40 30%, #f59e0b 60%, #b45309 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                WebkitTextStroke: '2px #3c2311',
                filter: 'drop-shadow(0 4px 0 #241407) drop-shadow(0 7px 0 #1b0f06) drop-shadow(0 10px 18px rgba(0,0,0,0.45))',
                letterSpacing: '0.14em',
                lineHeight: 1
              }}
            >
              NOUR
            </h1>

            {/* Ruban Parchemin Rétro Sous-Titre */}
            <div className="relative -mt-1 sm:-mt-2 px-5 py-1 bg-[#fbf7ee] border-2 border-[#3c2311] rounded-sm shadow-[0_3px_0_#241407] flex items-center justify-center">
              <div className="absolute -left-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#d97c27] border-l-2 border-y-2 border-[#3c2311] rotate-45" />
              <div className="absolute -right-1.5 top-1/2 -translate-y-1/2 w-2 h-2 bg-[#d97c27] border-r-2 border-y-2 border-[#3c2311] rotate-45" />
              <span className="font-pixel text-xs sm:text-sm font-bold text-[#3c2311] tracking-wider whitespace-nowrap">
                {subtitleText}
              </span>
            </div>
          </div>

          {/* ========================================================= */}
          {/* VUE 1 : MENU PRINCIPAL */}
          {/* ========================================================= */}
          {screenMode === 'title' && (
            <div className="w-full flex flex-col gap-3 items-stretch max-w-[290px] sm:max-w-[320px] animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('story_menu');
                }}
                className="pixel-tile-btn pixel-tile-btn-primary pixel-tile-menu-item py-3.5 px-8 text-center text-base sm:text-lg font-black flex items-center justify-center gap-2.5"
              >
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span>{ux.storyMode}</span>
              </button>

              {onOpenQuiz && (
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSelect();
                    speechManager.unlock();
                    onOpenQuiz();
                  }}
                  className="pixel-tile-btn pixel-tile-btn-quiz pixel-tile-menu-item py-3.5 px-8 text-center text-base sm:text-lg font-black flex items-center justify-center gap-2.5"
                >
                  <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-amber-200 shrink-0" />
                  <span>{ux.quizMode}</span>
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('options');
                }}
                className="pixel-tile-btn pixel-tile-menu-item py-3 px-8 text-center text-base sm:text-lg font-bold"
              >
                {ux.options}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('achievements');
                }}
                className="pixel-tile-btn pixel-tile-menu-item py-3 px-8 text-center text-base sm:text-lg font-bold flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-[#b45309] shrink-0" />
                <span>{ux.achievements}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  if (onOpenLanding) {
                    onOpenLanding();
                  } else {
                    setShowSupportModal(true);
                  }
                }}
                className="pixel-tile-btn pixel-tile-menu-item py-3 px-8 text-center text-base sm:text-lg font-bold flex items-center justify-center gap-2"
              >
                <Heart className="w-4 h-4 text-[#b91c1c] shrink-0" />
                <span>{ux.support}</span>
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VUE 2 : MODE HISTOIRE (Nouvelle Partie, Continuer, Chapitres) */}
          {/* ========================================================= */}
          {screenMode === 'story_menu' && (
            <div className="w-full flex flex-col gap-3 items-stretch max-w-[290px] sm:max-w-[320px] animate-in fade-in zoom-in-95 duration-200">
              <button
                type="button"
                onClick={() => {
                  if (hasSavedGame) {
                    setShowNewGameConfirm(true);
                  } else {
                    handleAction('new');
                  }
                }}
                className="pixel-tile-btn pixel-tile-btn-primary pixel-tile-menu-item py-3.5 px-8 text-center text-base sm:text-lg font-black"
              >
                {ux.newGame}
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('continue_slots');
                }}
                className="pixel-tile-btn pixel-tile-menu-item py-3 px-8 text-center text-base sm:text-lg font-bold flex items-center justify-center gap-2"
              >
                <Clock className="w-4 h-4 text-[#9a5b1a] shrink-0" />
                <span>{ux.continueGame}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('chapters');
                }}
                className="pixel-tile-btn pixel-tile-menu-item py-3 px-8 text-center text-base sm:text-lg font-bold flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#9a5b1a] shrink-0" />
                <span>{ux.chapterSelect}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('title');
                }}
                className="pixel-tile-btn py-2.5 px-6 text-center text-base font-bold text-[#8c2b2b] flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4 shrink-0" />
                <span>{ux.back}</span>
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VUE 3 : CONTINUER / SLOTS DE SAUVEGARDE (Capture 3 Evoland) */}
          {/* ========================================================= */}
          {screenMode === 'continue_slots' && (
            <div className="w-full flex flex-col gap-2.5 sm:gap-3 items-stretch max-w-[320px] sm:max-w-[360px] animate-in fade-in zoom-in-95 duration-200">
              {/* Slot 1 : Sauvegarde active ou vide */}
              {hasSavedGame ? (
                <button
                  type="button"
                  onClick={() => handleAction('continue')}
                  className="pixel-tile-btn py-2.5 px-3 flex items-center justify-between text-left text-xs sm:text-sm font-bold group"
                >
                  <div className="flex flex-col">
                    <span className="text-[#3c2311] text-sm sm:text-base font-black">
                      Othmân - {savedSummary?.sceneTitle || 'Voyageur'}
                    </span>
                    <span className="text-[11px] text-[#8c5a2b] font-mono">
                      {ux.levelShort} {savedSummary?.level || 1} • {savedSummary?.xp || 0} XP
                    </span>
                  </div>
                  <span className="text-base">🕒</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleAction('new')}
                  className="pixel-tile-btn py-3 px-4 text-center text-sm sm:text-base font-bold text-[#8c735d]"
                >
                  {ux.emptySlot}
                </button>
              )}

              {/* Slot 2 : Libre */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  handleAction('new');
                }}
                className="pixel-tile-btn py-3 px-4 text-center text-sm sm:text-base font-bold text-[#8c735d]"
              >
                {ux.emptySlot}
              </button>

              {/* Slot 3 : Libre */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  handleAction('new');
                }}
                className="pixel-tile-btn py-3 px-4 text-center text-sm sm:text-base font-bold text-[#8c735d]"
              >
                {ux.emptySlot}
              </button>

              {/* Bouton Retour */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('story_menu');
                }}
                className="pixel-tile-btn py-2.5 px-4 text-center text-base font-bold text-[#8c2b2b] mt-1"
              >
                {ux.back}
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VUE 4 : OPTIONS DU JEU */}
          {/* ========================================================= */}
          {screenMode === 'options' && (
            <div className="w-full flex flex-col gap-2.5 items-stretch max-w-[320px] animate-in fade-in zoom-in-95 duration-200">
              {/* Tuile Langue */}
              <div className="pixel-tile-frame p-3 rounded-md flex flex-col gap-1.5">
                <span className="font-pixel text-xs font-bold text-[#8c5a2b] uppercase tracking-wider">
                  {ux.selectLanguage}
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['fr', 'ar', 'en'] as const).map((l) => (
                    <button
                      key={l}
                      type="button"
                      onClick={() => {
                        soundManager.playSelect();
                        setLanguage(l);
                      }}
                      className={`py-1.5 font-pixel text-xs font-bold rounded border-2 border-[#3c2311] cursor-pointer ${
                        uiLang === l ? 'bg-[#d97c27] text-white shadow-xs' : 'bg-[#fbf7ee] text-[#3c2311]'
                      }`}
                    >
                      {l === 'fr' ? 'Français' : l === 'ar' ? 'العربية' : 'English'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tuile Sons & Musique */}
              <button
                type="button"
                onClick={toggleSound}
                className="pixel-tile-btn py-3 px-4 flex items-center justify-between text-xs sm:text-sm font-bold"
              >
                <span>{ux.soundLabel}</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-black ${soundEnabled ? 'bg-emerald-700 text-white' : 'bg-red-800 text-white'}`}>
                  {soundEnabled ? ux.soundEnabled : ux.soundDisabled}
                </span>
              </button>

              {/* Tuile Narration Vocale */}
              <button
                type="button"
                onClick={toggleVoice}
                className="pixel-tile-btn py-3 px-4 flex items-center justify-between text-xs sm:text-sm font-bold"
              >
                <span>{ux.voiceLabel}</span>
                <span className={`px-2 py-0.5 rounded text-[11px] font-black ${voiceEnabled ? 'bg-emerald-700 text-white' : 'bg-red-800 text-white'}`}>
                  {voiceEnabled ? ux.voiceEnabled : ux.voiceDisabled}
                </span>
              </button>

              {/* Bouton Retour */}
              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('title');
                }}
                className="pixel-tile-btn py-2.5 px-4 text-center text-base font-bold text-[#8c2b2b] mt-1"
              >
                {ux.back}
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VUE 5 : RÉUSSITES & VERTUS DU CŒUR */}
          {/* ========================================================= */}
          {screenMode === 'achievements' && (
            <div className="w-full flex flex-col gap-2.5 items-stretch max-w-[340px] animate-in fade-in zoom-in-95 duration-200">
              <div className="pixel-tile-frame p-3 rounded-md flex flex-col gap-2">
                <div className="text-center font-pixel text-sm font-black text-[#3c2311] border-b-2 border-[#3c2311] pb-1">
                  {ux.virtuesTitle}
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-pixel">
                  <div className="bg-[#f3ebd9] p-2 rounded border border-[#3c2311]">
                    <div className="font-bold text-[#2d6a4f] flex items-center gap-1">
                      <span>🕊️</span> <span>Hilm</span>
                    </div>
                    <div className="text-[10px] text-[#6b4728] mt-0.5">Maîtrise de soi</div>
                  </div>

                  <div className="bg-[#f3ebd9] p-2 rounded border border-[#3c2311]">
                    <div className="font-bold text-[#8b4513] flex items-center gap-1">
                      <span>🛡️</span> <span>Sabr</span>
                    </div>
                    <div className="text-[10px] text-[#6b4728] mt-0.5">Persévérance</div>
                  </div>

                  <div className="bg-[#f3ebd9] p-2 rounded border border-[#3c2311]">
                    <div className="font-bold text-[#1b4d3e] flex items-center gap-1">
                      <span>📖</span> <span>'Ilm</span>
                    </div>
                    <div className="text-[10px] text-[#6b4728] mt-0.5">Savoir & Sagesse</div>
                  </div>

                  <div className="bg-[#f3ebd9] p-2 rounded border border-[#3c2311]">
                    <div className="font-bold text-[#d97c27] flex items-center gap-1">
                      <span>🤝</span> <span>Adab</span>
                    </div>
                    <div className="text-[10px] text-[#6b4728] mt-0.5">Bienveillance</div>
                  </div>
                </div>

                {savedSummary && (
                  <div className="bg-[#ebdfc8] p-2 rounded border border-[#3c2311] text-center text-xs font-bold text-[#3c2311]">
                    Niveau {savedSummary.level} • {savedSummary.xp} XP acquis
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('title');
                }}
                className="pixel-tile-btn py-2.5 px-4 text-center text-base font-bold text-[#8c2b2b]"
              >
                {ux.back}
              </button>
            </div>
          )}

          {/* ========================================================= */}
          {/* VUE 6 : SÉLECTION DES CHAPITRES */}
          {/* ========================================================= */}
          {screenMode === 'chapters' && (
            <div className="w-full flex flex-col gap-2 max-w-md max-h-[60vh] overflow-y-auto pr-1 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between pb-1 border-b-2 border-[#3c2311] mb-1">
                <span className="font-pixel text-sm sm:text-base font-black text-[#3c2311] uppercase">
                  {ux.chapterSelect}
                </span>
                <button
                  onClick={() => setScreenMode('story_menu')}
                  className="pixel-tile-btn px-2 py-0.5 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              {[
                { id: 1, title: 'Vaincre la Solitude', subtitle: 'Le premier pas', image: '/game-assets/title_screen_bg.jpg' },
                { id: 2, title: 'Le chemin du Hilm', subtitle: 'La maîtrise de la colère', image: bgCh2 },
                { id: 3, title: 'Le chemin du Tawakkul', subtitle: 'La confiance face à l’épreuve', image: bgCh3 },
                { id: 4, title: 'Ce que tu as encore', subtitle: 'La bonté envers les parents', image: bgCh4 },
                { id: 5, title: 'Le Sommet de la Persévérance', subtitle: 'La persévérance (Sabr)', image: bgCh5 }
              ].map((ch) => (
                <div
                  key={ch.id}
                  onClick={() => {
                    if (ch.id === 1 && hasSavedGame) {
                      setShowNewGameConfirm(true);
                    } else {
                      handleSelectChapter(ch.id as 1 | 2 | 3 | 4 | 5);
                    }
                  }}
                  className="pixel-tile-btn p-2 flex items-center gap-3 text-left cursor-pointer group"
                >
                  <img
                    src={ch.image}
                    alt={ch.title}
                    className="w-16 h-12 rounded object-cover border border-[#3c2311] shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-[#8c5a2b] font-bold uppercase">
                      {(CHAPTER_LABELS[uiLang] || CHAPTER_LABELS.fr).chapter} {ch.id}
                    </div>
                    <div className="text-xs sm:text-sm font-bold text-[#3c2311] truncate">
                      {(CHAPTER_LABELS[uiLang] || CHAPTER_LABELS.fr).items[ch.id]?.title || ch.title}
                    </div>
                  </div>
                  <span className="text-sm font-bold pr-1">▶</span>
                </div>
              ))}

              <button
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setScreenMode('story_menu');
                }}
                className="pixel-tile-btn py-2 px-4 text-center text-sm font-bold text-[#8c2b2b] mt-1"
              >
                {ux.back}
              </button>
            </div>
          )}
        </div>

        {/* BAS DE PAGE : VERSION PIXEL ART (v1.1.1 (12)) */}
        <div className="relative z-20 w-full flex items-center justify-between px-2 pb-1 pointer-events-auto">
          <span className="font-pixel text-xs sm:text-sm font-bold text-[#3c2311] drop-shadow-[0_1px_0_rgba(255,255,255,0.8)]">
            v1.1.1 (12)
          </span>

          <span className="font-pixel text-[11px] text-[#5c3a21] font-semibold hidden sm:inline">
            NOUR RPG • Google Play
          </span>
        </div>

        {/* ============================================================ */}
        {/* MODAL CONFIRMATION NOUVELLE PARTIE (Style Tuile Beige Evoland) */}
        {/* ============================================================ */}
        {showNewGameConfirm && (
          <div
            className="fixed inset-0 z-[160] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none"
            onClick={() => setShowNewGameConfirm(false)}
          >
            <div
              className="w-full max-w-sm pixel-tile-frame rounded-lg p-5 flex flex-col items-center gap-3 text-center relative animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-12 rounded-md bg-[#ebdcc0] border-2 border-[#3c2311] flex items-center justify-center text-[#d97c27] text-2xl">
                ⚠️
              </div>

              <div>
                <h3 className="font-pixel text-lg font-black text-[#3c2311]">
                  {ux.resetTitle}
                </h3>
                <p className="font-pixel text-xs text-[#5c3a21] mt-1 leading-snug">
                  {ux.resetWarning}
                </p>
              </div>

              {savedSummary && (
                <div className="w-full bg-[#ebdcc0] py-1.5 px-3 rounded border border-[#3c2311] font-pixel text-xs font-bold text-[#3c2311]">
                  {ux.levelShort} {savedSummary.level} • {savedSummary.xp} {ux.resetXp}
                </div>
              )}

              <div className="flex flex-col gap-2 w-full mt-1">
                <button
                  type="button"
                  onClick={() => {
                    soundManager.playSelect();
                    setShowNewGameConfirm(false);
                  }}
                  className="pixel-tile-btn py-2.5 px-4 font-bold text-sm text-[#2d6a4f]"
                >
                  {ux.resetKeep}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setShowNewGameConfirm(false);
                    handleAction('new');
                  }}
                  className="pixel-tile-btn py-2.5 px-4 font-bold text-xs text-[#8c2b2b]"
                >
                  {ux.resetConfirm}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal Support si ouvert */}
        {showSupportModal && (
          <SupportModal onClose={() => setShowSupportModal(false)} reason="general" />
        )}
      </div>
    </>
  );
};
