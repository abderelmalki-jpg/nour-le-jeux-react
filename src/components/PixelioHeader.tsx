import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Award, SlidersHorizontal, Sun, Moon, Pause, MessageSquare, Save, Check } from 'lucide-react';
import { soundManager } from '../utils/audio';
import { PixelFlag } from './PixelFlag';
import { PIXEL_ASSETS, CustomAssetsConfig } from '../utils/assets';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { gameTranslations } from '../i18n/gameTranslations';
import { RealFlag } from './landing/Navbar';
import { Language } from '../i18n/translations';

interface PixelioHeaderProps {
  level: number;
  xp: number;
  maxXp?: number;
  lightPercent?: number;
  streakDays?: number;
  waswasXp?: number;
  onOpenMap?: () => void;
  onOpenKnowledge?: () => void;
  onOpenQuiz?: () => void;
  onOpenLanding?: () => void;
  onReturnToMenu?: () => void;
  customAssets?: CustomAssetsConfig;
  hasSpiritualGatePending?: boolean;
}

export const PixelioHeader: React.FC<PixelioHeaderProps> = ({
  level,
  xp,
  maxXp = 500,
  waswasXp = 0,
  streakDays = 1,
  onOpenMap,
  onOpenKnowledge,
  onOpenQuiz,
  onOpenLanding,
  onReturnToMenu,
  customAssets,
  hasSpiritualGatePending = false
}) => {
  const heroAvatar = customAssets?.characters?.personnage || PIXEL_ASSETS.traveler;
  const { isParchment, toggleTheme } = useTheme();

  // Animated progressive XP roll-up
  const [displayedXp, setDisplayedXp] = useState(xp);
  const [isGaining, setIsGaining] = useState(false);
  const [lastGain, setLastGain] = useState<number | null>(null);
  const prevXpRef = useRef(xp);

  // Animated Waswâs XP & pulse
  const [displayedWaswasXp, setDisplayedWaswasXp] = useState(waswasXp);
  const [isWaswasGaining, setIsWaswasGaining] = useState(false);
  const [isWaswasDecreasing, setIsWaswasDecreasing] = useState(false);
  const [lastWaswasGain, setLastWaswasGain] = useState<number | null>(null);
  const [lastWaswasDecrease, setLastWaswasDecrease] = useState<number | null>(null);
  const prevWaswasXpRef = useRef(waswasXp);

  useEffect(() => {
    const diff = xp - prevXpRef.current;
    if (diff > 0) {
      setIsGaining(true);
      setLastGain(diff);

      const startVal = prevXpRef.current;
      const endVal = xp;
      const duration = 900; // 900ms roll-up
      const startTime = performance.now();

      const animateRoll = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(1, elapsed / duration);
        // Smooth easeOutQuad
        const ease = 1 - (1 - progress) * (1 - progress);
        const currentVal = Math.round(startVal + (endVal - startVal) * ease);
        setDisplayedXp(currentVal);

        if (progress < 1) {
          requestAnimationFrame(animateRoll);
        } else {
          setDisplayedXp(endVal);
          setTimeout(() => {
            setIsGaining(false);
            setLastGain(null);
          }, 400);
        }
      };

      requestAnimationFrame(animateRoll);
    } else {
      setDisplayedXp(xp);
    }

    prevXpRef.current = xp;
  }, [xp]);

  useEffect(() => {
    const diff = waswasXp - prevWaswasXpRef.current;
    if (diff > 0) {
      setIsWaswasGaining(true);
      setIsWaswasDecreasing(false);
      setLastWaswasGain(diff);
      setDisplayedWaswasXp(waswasXp);
      const timer = setTimeout(() => {
        setIsWaswasGaining(false);
        setLastWaswasGain(null);
      }, 2500);
      return () => clearTimeout(timer);
    } else if (diff < 0) {
      setIsWaswasDecreasing(true);
      setIsWaswasGaining(false);
      setLastWaswasDecrease(Math.abs(diff));
      setDisplayedWaswasXp(waswasXp);
      const timer = setTimeout(() => {
        setIsWaswasDecreasing(false);
        setLastWaswasDecrease(null);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setDisplayedWaswasXp(waswasXp);
    }
    prevWaswasXpRef.current = waswasXp;
  }, [waswasXp]);

  const { language, isRtl, setLanguage } = useLanguage();
  const t = gameTranslations[language]?.hud || gameTranslations.fr.hud;
  // Libellés courts lisibles (au lieu de couper les mots : « NIVE. », « Pressio »)
  const shortLevel = language === 'fr' ? 'Niv.' : language === 'en' ? 'Lv.' : t.level;
  const shortWaswas = language === 'fr' ? 'Pression' : language === 'en' ? 'Shadow' : t.waswasGauge;
  const tNav = gameTranslations[language]?.nav || gameTranslations.fr.nav;

  const [showLangMenu, setShowLangMenu] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setShowLangMenu(false);
      }
    };
    if (showLangMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showLangMenu]);

  const xpPercent = Math.min(100, Math.round((displayedXp / maxXp) * 100));

  return (
    <header
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`w-full backdrop-blur-md px-1.5 sm:px-4 pt-[max(0.35rem,env(safe-area-inset-top))] pb-1 sm:py-2 flex items-center justify-between gap-1.5 shadow-lg z-40 select-none transition-all shrink-0 ${
        isParchment
          ? 'bg-[#f6ebd7]/95 border-b-2 border-[#c5a059]/70 text-[#2b2118]'
          : 'bg-black/55 border-b border-amber-500/30 text-white'
      }`}
    >
      {/* Left: Avatar & Dual Gauges (Othmân Nour & Waswâs Ombre) */}
      <div className="flex items-center gap-1 sm:gap-3 min-w-0 shrink">
        {/* Avatar badge */}
        <div className="hidden sm:block w-7 h-7 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-amber-950/70 border-2 border-amber-400/60 overflow-hidden p-0.5 relative shadow-md shrink-0">
          <img
            src={heroAvatar}
            alt="Le Voyageur"
            className="w-full h-full object-cover rounded-md sm:rounded-lg"
          />
        </div>

        {/* 1. Othmân XP Block (Gleaming Pure Gold) */}
        <div
          id="pixelio-header-xp-target"
          className={`flex flex-col justify-center relative transition-transform duration-300 ${
            isGaining ? 'scale-105 drop-shadow-[0_0_14px_#f59e0b]' : ''
          }`}
        >
          <div className="flex items-center gap-0.5 sm:gap-1.5 relative">
            <span className="text-[9px] sm:text-[10px] font-black text-amber-950 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-300 px-1 sm:px-1.5 py-0.2 rounded-md border border-yellow-200 font-mono shadow-xs uppercase whitespace-nowrap">
              {shortLevel} {level}
            </span>
            <span
              className={`text-[9px] sm:text-[10px] font-bold font-mono whitespace-nowrap transition-colors duration-200 ${
                isGaining
                  ? isParchment
                    ? 'text-amber-800 font-black scale-105'
                    : 'text-yellow-300 font-black scale-105'
                  : isParchment
                  ? 'text-[#4a2e12]'
                  : 'text-amber-100/90'
              }`}
            >
              {displayedXp}/{maxXp}
            </span>

            {/* Floating gain badge when XP increases */}
            {isGaining && lastGain && (
              <span className="absolute top-full mt-1.5 left-2 bg-gradient-to-r from-yellow-400 via-amber-300 to-yellow-200 text-amber-950 font-black text-[8px] sm:text-xs font-mono px-1.5 py-0.2 rounded-full border border-yellow-100 shadow-[0_0_12px_rgba(250,204,21,0.9)] animate-bounce z-50 whitespace-nowrap">
                +{lastGain} XP 🪙
              </span>
            )}
          </div>

          {/* Bar 1: Pure Radiant Golden XP Bar */}
          <div
            className={`w-12 xs:w-16 sm:w-28 h-2 sm:h-2.5 bg-black/60 rounded-full border overflow-hidden relative mt-0.5 sm:mt-1 shadow-inner transition-all duration-300 ${
              isGaining ? 'border-yellow-200 ring-2 ring-yellow-400/80 shadow-[0_0_14px_#fbbf24]' : 'border-amber-500/50'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(250,204,21,0.9)] ${
                isGaining
                  ? 'bg-gradient-to-r from-yellow-300 via-white to-yellow-400 animate-pulse'
                  : 'bg-gradient-to-r from-yellow-500 via-amber-300 via-yellow-200 to-amber-400'
              }`}
              style={{ width: `${xpPercent}%` }}
            />
          </div>
        </div>

        {/* 2. Waswâs XP Block (Purple) - High Visibility on Mobile */}
        <div
          title={`${t.waswasGauge} : ${displayedWaswasXp}/100`}
          className={`flex flex-col justify-center relative transition-transform duration-300 ${
            isWaswasGaining
              ? 'scale-105 drop-shadow-[0_0_12px_rgba(168,85,247,0.9)]'
              : isWaswasDecreasing
              ? 'scale-95 drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]'
              : ''
          }`}
        >
          <div className="flex items-center gap-0.5 sm:gap-1.5 relative">
            <span className="text-[9px] sm:text-[10px] font-black text-fuchsia-200 bg-purple-950/90 px-1 sm:px-1.5 py-0.2 rounded-md border border-purple-400/60 font-mono shadow-xs flex items-center gap-0.5 sm:gap-1">
              <span>🌑</span>
              <span className="tracking-wide hidden sm:inline">{shortWaswas}</span>
            </span>
            <span
              className={`text-[9px] sm:text-[10px] font-bold font-mono whitespace-nowrap transition-colors duration-200 ${
                isWaswasGaining
                  ? isParchment
                    ? 'text-purple-800 font-black scale-105'
                    : 'text-fuchsia-300 font-black scale-105'
                  : isWaswasDecreasing
                  ? isParchment
                    ? 'text-emerald-800 font-bold'
                    : 'text-emerald-300 font-bold'
                  : isParchment
                  ? 'text-purple-900'
                  : 'text-purple-300/90'
              }`}
            >
              {displayedWaswasXp}/100
            </span>

            {/* Floating Waswâs pulse badge when Waswâs increases */}
            {isWaswasGaining && (
              <span className="absolute top-full mt-1.5 right-0 bg-gradient-to-r from-purple-800 to-fuchsia-700 text-purple-100 font-black text-[8px] sm:text-[9px] font-mono px-1.5 py-0.2 rounded-full border border-purple-400 shadow-md animate-bounce z-50 whitespace-nowrap">
                +{lastWaswasGain || 15} 🌑
              </span>
            )}

            {/* Floating Waswâs purification badge when Waswâs decreases */}
            {isWaswasDecreasing && (
              <span className="absolute top-full mt-1.5 right-0 bg-gradient-to-r from-emerald-800 to-teal-700 text-emerald-100 font-black text-[8px] sm:text-[9px] font-mono px-1.5 py-0.2 rounded-full border border-emerald-400 shadow-md animate-bounce z-50 whitespace-nowrap">
                -{lastWaswasDecrease || 15} ✨
              </span>
            )}
          </div>

          {/* Bar 2: Waswâs Shadow Bar (Purple) */}
          <div
            className={`w-12 xs:w-16 sm:w-28 h-2 sm:h-2.5 bg-purple-950/90 rounded-full border overflow-hidden relative mt-0.5 sm:mt-1 shadow-inner transition-all duration-300 ${
              isWaswasGaining
                ? 'border-purple-300 ring-2 ring-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.9)]'
                : isWaswasDecreasing
                ? 'border-emerald-400 ring-1 ring-emerald-400/60 shadow-[0_0_8px_rgba(52,211,153,0.5)]'
                : 'border-purple-600/70 shadow-[0_0_6px_rgba(147,51,234,0.4)]'
            }`}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(168,85,247,0.8)] ${
                isWaswasGaining
                  ? 'bg-gradient-to-r from-purple-500 via-fuchsia-300 to-purple-400 animate-pulse'
                  : isWaswasDecreasing
                  ? 'bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600'
                  : 'bg-gradient-to-r from-purple-800 via-fuchsia-600 to-purple-500'
              }`}
              style={{ width: `${Math.max(displayedWaswasXp > 0 ? 6 : 0, Math.min(100, displayedWaswasXp))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Right: Streamlined Actions (Quiz, Savoir, unified Menu/Settings) */}
      <div className="header-actions flex items-center gap-1 sm:gap-1.5 shrink-0">
        {/* Dedicated Islamic Quiz Button */}
        {onOpenQuiz && (
          <button
            onClick={() => {
              soundManager.playSelect();
              onOpenQuiz();
            }}
            title={
              language === 'ar'
                ? 'اختبارات وتحدّيات (+XP)'
                : language === 'en'
                ? 'Quiz & Challenges (+XP)'
                : hasSpiritualGatePending
                ? 'Savoir requis pour la suite du voyage ! Réponds aux Quiz (+XP)'
                : 'Quiz & Défis (+XP)'
            }
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl border-2 transition-all cursor-pointer shadow-sm flex items-center gap-1 sm:gap-1.5 active:scale-95 font-cinzel text-[10px] sm:text-xs shrink-0 bg-[#2d6a4f] hover:bg-[#387f5e] border-[#52b788]/70 text-emerald-50 font-bold"
          >
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 shrink-0" />
            <span>{language === 'ar' ? 'اختبار' : 'Quiz'}</span>
          </button>
        )}

        {/* Knowledge Book Button */}
        {onOpenKnowledge && (
          <button
            onClick={() => {
              soundManager.playSelect();
              onOpenKnowledge();
            }}
            title={language === 'ar' ? 'كتاب العلم والحكمة' : language === 'en' ? 'Book of Wisdom' : 'Livre du Savoir'}
            className="px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-xl bg-amber-600/95 border-2 border-amber-400/70 hover:bg-amber-500 text-white font-bold transition-all cursor-pointer shadow-sm flex items-center gap-1 sm:gap-1.5 active:scale-95 font-cinzel text-[10px] sm:text-xs shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span className="hidden sm:inline">{language === 'ar' ? 'العلم' : language === 'en' ? 'Wisdom' : 'Savoir'}</span>
          </button>
        )}

        {/* Unified Settings & Pause Menu (Language, Theme, Feedback, Pause) */}
        <div className="relative" ref={langMenuRef}>
          <button
            onClick={() => {
              soundManager.playSelect();
              setShowLangMenu(!showLangMenu);
            }}
            title={language === 'ar' ? 'القائمة والإعدادات' : language === 'en' ? 'Menu & Settings' : 'Menu & Réglages'}
            aria-label={language === 'ar' ? 'القائمة والإعدادات' : language === 'en' ? 'Menu & Settings' : 'Menu & Réglages'}
            className={`px-2 py-1.5 rounded-xl border-2 transition-all cursor-pointer shadow-sm flex items-center gap-1.5 active:scale-95 text-[11px] sm:text-xs shrink-0 ${
              isParchment
                ? 'bg-[#eddcc3] hover:bg-[#e4ceb0] border-[#c5a059] text-[#3a2312] font-bold'
                : 'bg-black/45 hover:bg-black/65 border-amber-400/45 hover:border-amber-400 text-amber-100'
            }`}
          >
            <PixelFlag lang={language} className="w-4 h-3" />
            <SlidersHorizontal className="w-3.5 h-3.5 shrink-0" />
          </button>

          {showLangMenu && (
            <div
              className={`absolute top-full mt-2 ${isRtl ? 'left-0' : 'right-0'} w-56 rounded-2xl p-2 shadow-2xl flex flex-col gap-1.5 z-50 border-2 animate-in zoom-in-95 duration-150 ${
                isParchment
                  ? 'bg-[#fbf7ee] border-[#3a2312] text-[#3a2312]'
                  : 'bg-[#23150b] border-amber-400/60 text-amber-100'
              }`}
            >
              {/* Section Langue */}
              <div className={`px-2 pt-1 text-[10px] font-black uppercase tracking-wider font-cinzel ${isParchment ? 'text-[#8c5a2b]' : 'text-amber-300/80'}`}>
                {language === 'ar' ? 'اللغة' : language === 'en' ? 'Language' : 'Langue'}
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(['fr', 'ar', 'en'] as Language[]).map((langCode) => {
                  const active = language === langCode;
                  const label = langCode === 'ar' ? 'AR' : langCode === 'fr' ? 'FR' : 'US';
                  return (
                    <button
                      key={langCode}
                      onClick={() => {
                        setLanguage(langCode);
                        setShowLangMenu(false);
                        soundManager.playSelect();
                      }}
                      className={`flex items-center justify-center gap-1 px-1.5 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-amber-500 text-amber-950 font-black shadow-xs'
                          : isParchment
                          ? 'bg-[#efe4d0] hover:bg-[#e5d5b7] text-[#3a2312]'
                          : 'bg-white/5 hover:bg-amber-900/50 text-amber-100'
                      }`}
                    >
                      <PixelFlag lang={langCode} className="w-4 h-3" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              <div className={`h-px my-0.5 ${isParchment ? 'bg-[#d9c7aa]' : 'bg-amber-500/20'}`} />

              {/* Section Thème */}
              <button
                onClick={() => {
                  soundManager.playSelect();
                  toggleTheme();
                }}
                className={`flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer w-full ${
                  isParchment
                    ? 'hover:bg-[#efe4d0] text-[#3a2312]'
                    : 'hover:bg-amber-900/50 text-amber-100'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isParchment ? (
                    <Sun className="w-4 h-4 text-amber-700" />
                  ) : (
                    <Moon className="w-4 h-4 text-amber-300" />
                  )}
                  <span>
                    {language === 'ar' ? 'المظهر' : language === 'en' ? 'Theme' : 'Thème'}
                  </span>
                </span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md ${isParchment ? 'bg-[#e8d8bc] text-[#5a3b18]' : 'bg-black/40 text-amber-300'}`}>
                  {isParchment
                    ? language === 'ar'
                      ? 'فاتح'
                      : language === 'en'
                      ? 'Parchment'
                      : 'Parchemin'
                    : language === 'ar'
                    ? 'ليلي'
                    : language === 'en'
                    ? 'Night'
                    : 'Nuit'}
                </span>
              </button>

              {/* Section Avis / À propos */}
              {onOpenLanding && (
                <button
                  onClick={() => {
                    soundManager.playSelect();
                    setShowLangMenu(false);
                    onOpenLanding();
                  }}
                  className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer w-full ${
                    isParchment
                      ? 'hover:bg-[#efe4d0] text-[#3a2312]'
                      : 'hover:bg-amber-900/50 text-amber-100'
                  }`}
                >
                  <MessageSquare className={`w-4 h-4 ${isParchment ? 'text-[#8c5a2b]' : 'text-amber-300'}`} />
                  <span>
                    {language === 'ar' ? 'إرسال رأيي' : language === 'en' ? 'Send Feedback' : 'Donner mon avis'}
                  </span>
                </button>
              )}

              {/* Section Sauvegarder */}
              <div className={`h-px my-0.5 ${isParchment ? 'bg-[#d9c7aa]' : 'bg-amber-500/20'}`} />
              <button
                onClick={() => {
                  soundManager.playXpHarvest();
                  setJustSaved(true);
                  setTimeout(() => setJustSaved(false), 2000);
                }}
                className={`flex items-center justify-between gap-2 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer w-full ${
                  justSaved
                    ? 'bg-emerald-600 text-white'
                    : isParchment
                    ? 'hover:bg-[#efe4d0] text-[#2d6a4f]'
                    : 'hover:bg-emerald-900/40 text-emerald-300'
                }`}
              >
                <span className="flex items-center gap-2">
                  {justSaved ? <Check className="w-4 h-4 shrink-0" /> : <Save className="w-4 h-4 shrink-0" />}
                  <span>
                    {justSaved
                      ? language === 'ar'
                        ? 'تَمَّ الْحِفْظُ!'
                        : language === 'en'
                        ? 'Game saved!'
                        : 'Partie sauvegardée !'
                      : language === 'ar'
                      ? 'حِفْظُ التَّقَدُّمِ'
                      : language === 'en'
                      ? 'Save Progress'
                      : 'Sauvegarder la partie'}
                  </span>
                </span>
              </button>

              {/* Section Pause / Menu principal */}
              {onReturnToMenu && (
                <>
                  <button
                    onClick={() => {
                      soundManager.playSelect();
                      setShowLangMenu(false);
                      onReturnToMenu();
                    }}
                    className={`flex items-center gap-2 px-2.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer w-full ${
                      isParchment
                        ? 'hover:bg-[#efe4d0] text-[#8c2b2b]'
                        : 'hover:bg-amber-900/50 text-amber-200'
                    }`}
                  >
                    <Pause className="w-4 h-4 shrink-0" />
                    <span>
                      {language === 'ar' ? 'إيقاف مؤقت / القائمة' : language === 'en' ? 'Pause / Main Menu' : 'Pause / Menu principal'}
                    </span>
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
