import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { soundManager } from '../utils/audio';

interface IntroPrologueProps {
  chapter?: 1 | 2 | 3 | 4 | 5;
  onComplete: () => void;
}

const CHAPTER_1_COPY = {
  fr: {
    step0: 'Certains voyages ne commencent pas sur une route…\nmais dans le silence d’une chambre.',
    step1: 'Voici l’histoire du jeune Othmân.',
    speaker: 'Noura',
    step2: '« Othmân… réveille-toi.\nL’aube se lève. »',
    chapterBadge: 'CHAPITRE I',
    chapterTitle: 'La Chambre',
    tapHint: 'Toucher pour continuer',
    skip: 'Passer ▶'
  },
  en: {
    step0: 'Some journeys do not begin on a road…\nbut in the quiet of a room.',
    step1: 'This is the story of young Othmân.',
    speaker: 'Noura',
    step2: '“Othmân… wake up.\nDawn is breaking.”',
    chapterBadge: 'CHAPTER I',
    chapterTitle: 'The Bedroom',
    tapHint: 'Tap to continue',
    skip: 'Skip ▶'
  },
  ar: {
    step0: 'بَعْضُ الرِّحْلَاتِ لَا تَبْدَأُ عَلَى طَرِيقٍ…\nبَلْ فِي صَمْتِ غُرْفَةٍ.',
    step1: 'هَذِهِ قِصَّةُ الْفَتَى عُثْمَان.',
    speaker: 'نُورَة',
    step2: '« عُثْمَان… اسْتَيْقِظْ.\nلَقَدْ بَزَغَ الْفَجْرُ. »',
    chapterBadge: 'الْفَصْلُ الْأَوَّلُ',
    chapterTitle: 'الْغُرْفَةُ',
    tapHint: 'انْقُرْ لِلْمُتَابَعَةِ',
    skip: 'تَخَطٍّ ▶'
  }
} as const;

type ChapterIntroEntry = {
  badge: string;
  title: string;
  hook: string;
};

const CHAPTER_INTROS: Record<'fr' | 'en' | 'ar', Record<2 | 3 | 4 | 5, ChapterIntroEntry>> = {
  fr: {
    2: {
      badge: 'CHAPITRE II',
      title: 'Le chemin du Hilm',
      hook: 'Le vrai courage ne se mesure pas à la force des poings…\nmais au calme que l’on garde quand le cœur s’enflamme.'
    },
    3: {
      badge: 'CHAPITRE III',
      title: 'Le chemin du Tawakkul',
      hook: 'Quand le corps faiblit et que la route s’arrête,\nla confiance en Allah devient le plus sûr des appuis.'
    },
    4: {
      badge: 'CHAPITRE IV',
      title: 'Ce que tu as encore',
      hook: 'On cherche parfois la lumière au bout du monde…\nalors qu’elle brille déjà sous notre propre toit.'
    },
    5: {
      badge: 'CHAPITRE V',
      title: 'Le Sommet de la Persévérance',
      hook: 'Chaque pas accompli dans la patience rapproche du sommet…\nmême lorsque la brume cache encore l’horizon.'
    }
  },
  en: {
    2: {
      badge: 'CHAPTER II',
      title: 'The Path of Hilm',
      hook: 'True strength is not measured by the force of one’s fists…\nbut by the calm we hold when the heart catches fire.'
    },
    3: {
      badge: 'CHAPTER III',
      title: 'The Path of Tawakkul',
      hook: 'When the body grows weak and the road comes to a halt,\ntrust in Allah becomes the surest support.'
    },
    4: {
      badge: 'CHAPTER IV',
      title: 'What You Still Have',
      hook: 'Sometimes we search for light at the ends of the earth…\nwhen it is already shining beneath our own roof.'
    },
    5: {
      badge: 'CHAPTER V',
      title: 'The Summit of Perseverance',
      hook: 'Every step taken in patience brings the summit closer…\neven while the mist still hides the horizon.'
    }
  },
  ar: {
    2: {
      badge: 'الْفَصْلُ الثَّانِي',
      title: 'طَرِيقُ الْحِلْمِ',
      hook: 'لَا تُقَاسُ الشَّجَاعَةُ الْحَقِيقِيَّةُ بِقُوَّةِ الْيَدَيْنِ…\nبَلْ بِالْهُدُوءِ الَّذِي نَحْفَظُهُ حِينَ يَشْتَعِلُ الْقَلْبُ.'
    },
    3: {
      badge: 'الْفَصْلُ الثَّالِثُ',
      title: 'طَرِيقُ التَّوَكُّلِ',
      hook: 'حِينَ يَضْعُفُ الْجَسَدُ وَيَتَوَقَّفُ الطَّرِيقُ،\nيَغْدُو التَّوَكُّلُ عَلَى اللهِ أَثْبَتَ سَنَدٍ.'
    },
    4: {
      badge: 'الْفَصْلُ الرَّابِعُ',
      title: 'مَا زَالَ بَيْنَ يَدَيْكَ',
      hook: 'نَبْحَثُ أَحْيَانًا عَنِ النُّورِ فِي أَقَاصِي الْأَرْضِ…\nوَهُوَ يُضِيءُ بِالْفِعْلِ تَحْتَ سَقْفِ بَيْتِنَا.'
    },
    5: {
      badge: 'الْفَصْلُ الْخَامِسُ',
      title: 'قِمَّةُ الْمُثَابَرَةِ',
      hook: 'كُلُّ خُطْوَةٍ بِصَبْرٍ تُقَرِّبُكَ مِنَ الْقِمَّةِ…\nحَتَّى وَإِنْ كَانَ الضَّبَابُ لَا يَزَالُ يَحْجُبُ الْأُفُقَ.'
    }
  }
};

/**
 * Prologue cinématique d'ouverture :
 * - Chapitre 1 : Combo Court complet (conte → Othmân → appel de Noura → clignement des paupières sur la chambre)
 * - Chapitres 2 à 5 : Phrase d'accroche sur fond noir + lueur dorée → fondu doux + carton de titre du chapitre
 */
export const IntroPrologue: React.FC<IntroPrologueProps> = ({ chapter = 1, onComplete }) => {
  const { language, isRtl } = useLanguage();
  const langKey = (language === 'ar' || language === 'en' ? language : 'fr') as 'fr' | 'en' | 'ar';
  const copy = CHAPTER_1_COPY[langKey];
  const isChapter1 = chapter === 1;
  const maxStep = isChapter1 ? 3 : 1;

  const [step, setStep] = useState<number>(0);
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
    setStep(0);
  }, [chapter]);

  const finish = useCallback(() => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete();
  }, [onComplete]);

  useEffect(() => {
    const duration = isChapter1
      ? ({ 0: 3800, 1: 3000, 2: 3200, 3: 2600 } as Record<number, number>)[step] ?? 2600
      : step === 0
      ? 4000
      : 2500;

    const timer = setTimeout(() => {
      if (step < maxStep) {
        setStep((prev) => prev + 1);
      } else {
        finish();
      }
    }, duration);

    return () => clearTimeout(timer);
  }, [step, maxStep, isChapter1, finish]);

  const handleAdvance = () => {
    if (step < maxStep) {
      try {
        soundManager.playSelect();
      } catch {
        // ignore audio errors
      }
      setStep((prev) => prev + 1);
    } else {
      finish();
    }
  };

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      soundManager.playSelect();
    } catch {
      // ignore audio errors
    }
    finish();
  };

  const chapterIntro = !isChapter1 ? CHAPTER_INTROS[langKey][chapter as 2 | 3 | 4 | 5] : null;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      onClick={handleAdvance}
      className="fixed inset-0 z-[140] select-none overflow-hidden cursor-pointer"
    >
      <style>{`
        @keyframes nourPulseGlow {
          0%, 100% { transform: scale(0.95); opacity: 0.42; }
          50% { transform: scale(1.1); opacity: 0.72; }
        }
        @keyframes prologueTextIn {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes eyelidTopOpen {
          0%   { transform: translateY(0%); }
          26%  { transform: translateY(-28%); }
          44%  { transform: translateY(-8%); }
          66%  { transform: translateY(-58%); }
          100% { transform: translateY(-108%); }
        }
        @keyframes eyelidBottomOpen {
          0%   { transform: translateY(0%); }
          26%  { transform: translateY(28%); }
          44%  { transform: translateY(8%); }
          66%  { transform: translateY(58%); }
          100% { transform: translateY(108%); }
        }
        @keyframes wakeBlurClear {
          0%   { backdrop-filter: blur(10px); background-color: rgba(10, 8, 16, 0.55); }
          45%  { backdrop-filter: blur(5px); background-color: rgba(10, 8, 16, 0.25); }
          100% { backdrop-filter: blur(0px); background-color: rgba(10, 8, 16, 0); }
        }
        @keyframes chapterVeilReveal {
          0%   { background-color: rgba(7, 6, 11, 0.92); backdrop-filter: blur(6px); }
          55%  { background-color: rgba(7, 6, 11, 0.35); backdrop-filter: blur(2px); }
          100% { background-color: rgba(7, 6, 11, 0); backdrop-filter: blur(0px); }
        }
        @keyframes chapterCardFade {
          0%   { opacity: 0; transform: translateY(8px); }
          25%  { opacity: 1; transform: translateY(0); }
          75%  { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-4px); }
        }
      `}</style>

      {/* ============================================================ */}
      {/* CHAPITRE 1 : ÉCRAN NOIR POÉTIQUE + ÉVEIL PAUPIÈRES           */}
      {/* ============================================================ */}
      {isChapter1 && step < 3 && (
        <div className="absolute inset-0 bg-[#07060b] flex flex-col items-center justify-center px-6 text-center">
          <div
            className="pointer-events-none absolute rounded-full blur-3xl transition-all duration-1000"
            style={{
              width: step === 2 ? '26rem' : '18rem',
              height: step === 2 ? '26rem' : '18rem',
              background:
                step === 2
                  ? 'radial-gradient(circle, rgba(251, 191, 36, 0.42) 0%, rgba(217, 119, 6, 0.16) 45%, rgba(0, 0, 0, 0) 75%)'
                  : 'radial-gradient(circle, rgba(245, 158, 11, 0.26) 0%, rgba(180, 83, 9, 0.08) 50%, rgba(0, 0, 0, 0) 75%)',
              animation: 'nourPulseGlow 3.6s ease-in-out infinite'
            }}
          />

          <div
            key={step}
            className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4"
            style={{ animation: 'prologueTextIn 700ms ease-out forwards' }}
          >
            {step === 0 && (
              <p className="font-cinzel text-lg sm:text-2xl text-[#f7ecd7] leading-relaxed tracking-wide whitespace-pre-line drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)]">
                {copy.step0}
              </p>
            )}

            {step === 1 && (
              <p className="font-cinzel text-xl sm:text-3xl font-bold text-[#fde68a] leading-relaxed tracking-wider whitespace-pre-line drop-shadow-[0_2px_18px_rgba(245,158,11,0.45)]">
                {copy.step1}
              </p>
            )}

            {step === 2 && (
              <>
                <span className="text-xs sm:text-sm uppercase tracking-[0.28em] text-amber-300/80 font-bold">
                  {copy.speaker}
                </span>
                <p className="font-cinzel text-xl sm:text-3xl italic text-[#fff7e6] leading-relaxed tracking-wide whitespace-pre-line drop-shadow-[0_0_24px_rgba(251,191,36,0.5)]">
                  {copy.step2}
                </p>
              </>
            )}
          </div>

          <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-3 pointer-events-none">
            <div className="flex items-center gap-2">
              {[0, 1, 2].map((dot) => (
                <span
                  key={dot}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    dot === step ? 'w-6 bg-amber-300' : dot < step ? 'w-2 bg-amber-500/60' : 'w-2 bg-white/20'
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] sm:text-xs text-amber-100/50 tracking-widest uppercase">
              {copy.tapHint}
            </span>
          </div>
        </div>
      )}

      {isChapter1 && step === 3 && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ animation: 'wakeBlurClear 2.2s ease-out forwards' }}
          />
          <div
            className="absolute top-0 inset-x-0 h-[56%] bg-gradient-to-b from-black via-black to-black/90"
            style={{
              boxShadow: '0 24px 48px 18px rgba(0, 0, 0, 0.92)',
              animation: 'eyelidTopOpen 2.1s cubic-bezier(0.32, 0.08, 0.24, 1) forwards'
            }}
          />
          <div
            className="absolute bottom-0 inset-x-0 h-[56%] bg-gradient-to-t from-black via-black to-black/90"
            style={{
              boxShadow: '0 -24px 48px 18px rgba(0, 0, 0, 0.92)',
              animation: 'eyelidBottomOpen 2.1s cubic-bezier(0.32, 0.08, 0.24, 1) forwards'
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div
              className="px-6 py-3 rounded-2xl bg-black/45 border border-amber-300/35 backdrop-blur-xs shadow-2xl"
              style={{ animation: 'chapterCardFade 2.5s ease-in-out forwards' }}
            >
              <div className="text-[10px] sm:text-xs font-bold tracking-[0.3em] text-amber-300 uppercase">
                {copy.chapterBadge}
              </div>
              <div className="font-cinzel text-xl sm:text-2xl font-black text-[#fff7e6] mt-0.5 tracking-wider">
                {copy.chapterTitle}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* CHAPITRES 2 À 5 : PHRASE D'ACCROCHE + FONDU SUR LE DÉCOR     */}
      {/* ============================================================ */}
      {!isChapter1 && chapterIntro && step === 0 && (
        <div className="absolute inset-0 bg-[#07060b] flex flex-col items-center justify-center px-6 text-center">
          <div
            className="pointer-events-none absolute rounded-full blur-3xl"
            style={{
              width: '22rem',
              height: '22rem',
              background:
                'radial-gradient(circle, rgba(251, 191, 36, 0.32) 0%, rgba(180, 83, 9, 0.1) 50%, rgba(0, 0, 0, 0) 75%)',
              animation: 'nourPulseGlow 3.6s ease-in-out infinite'
            }}
          />

          <div
            className="relative z-10 max-w-xl mx-auto flex flex-col items-center gap-4"
            style={{ animation: 'prologueTextIn 700ms ease-out forwards' }}
          >
            <span className="text-xs sm:text-sm uppercase tracking-[0.32em] text-amber-300/85 font-bold">
              {chapterIntro.badge}
            </span>
            <p className="font-cinzel text-lg sm:text-2xl text-[#f7ecd7] leading-relaxed tracking-wide whitespace-pre-line drop-shadow-[0_2px_14px_rgba(245,158,11,0.3)]">
              {chapterIntro.hook}
            </p>
          </div>

          <div className="absolute bottom-8 inset-x-0 flex flex-col items-center gap-2 pointer-events-none">
            <span className="text-[11px] sm:text-xs text-amber-100/50 tracking-widest uppercase">
              {copy.tapHint}
            </span>
          </div>
        </div>
      )}

      {!isChapter1 && chapterIntro && step === 1 && (
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute inset-0"
            style={{ animation: 'chapterVeilReveal 2.3s ease-out forwards' }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <div
              className="px-6 py-3.5 rounded-2xl bg-black/50 border border-amber-300/40 backdrop-blur-xs shadow-2xl"
              style={{ animation: 'chapterCardFade 2.4s ease-in-out forwards' }}
            >
              <div className="text-[10px] sm:text-xs font-bold tracking-[0.32em] text-amber-300 uppercase">
                {chapterIntro.badge}
              </div>
              <div className="font-cinzel text-xl sm:text-2xl font-black text-[#fff7e6] mt-0.5 tracking-wider">
                {chapterIntro.title}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bouton Passer discret */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-4 right-4 z-20 px-3 py-1.5 rounded-lg bg-black/55 hover:bg-black/75 text-amber-100/80 hover:text-amber-200 border border-amber-200/25 text-xs font-bold tracking-wide transition-colors cursor-pointer"
      >
        {copy.skip}
      </button>
    </div>
  );
};
