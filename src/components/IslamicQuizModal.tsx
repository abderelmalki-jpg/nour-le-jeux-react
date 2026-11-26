import React, { useState, useEffect, useMemo } from 'react';
import { shuffleSeeded, SESSION_SHUFFLE_SEED } from '../utils/quizShuffle';
import { getLocalizedIslamicQuizzes, LocalizedIslamicQuizQuestion } from '../i18n/islamicQuizzesTranslations';
import {
  X,
  Zap,
  Sparkles,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { speechManager } from '../utils/speech';
import { useLanguage } from '../context/LanguageContext';
import { Quiz } from '../types';
import { getLocalizedQuiz } from '../utils/narrativeI18n';

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
        title: standalone ? 'الِاخْتِبَارَاتُ الْإِسْلَامِيَّةُ' : 'الِاخْتِبَارَاتُ وَالتَّحَدِّيَاتُ',
        xpToWin: (xp: number) => `+${xp} XP لِلرِّبْحِ`,
        close: 'إِغْلَاقٌ',
        prev: 'السَّابِقُ',
        prevTitle: 'السُّؤَالُ السَّابِقُ',
        next: 'التَّالِي',
        nextTitle: 'السُّؤَالُ التَّالِي',
        questionOf: (cur: number, tot: number) => `السُّؤَالُ ${cur} / ${tot}`,
        completed: '✓ مُكْتَمِلٌ',
        validate: 'تَأْكِيدُ الْإِجَابَةِ',
        correct: (xp: number) => `إِجَابَةٌ صَحِيحَةٌ! (+${xp} XP)`,
        wrong: 'لَيْسَ تَمَامًا… حَاوِلْ مَرَّةً أُخْرَى.',
        source: 'الْمَصْدَرُ :',
        retry: 'إِعَادَةُ الْمُحَاوَلَةِ',
        skip: 'تَخَطٍّ',
        collectXp: (xp: number) => `احْصُدْ +${xp} XP!`,
        waswasMistake: 'تَغَذَّى الشَّكُّ: الْوَسْوَاسُ يَزْدَادُ قُوَّةً!'
      };
    }
    if (language === 'en') {
      return {
        title: standalone ? 'Islamic Quizzes' : 'Quizzes & Challenges',
        xpToWin: (xp: number) => `+${xp} XP to earn`,
        close: 'Close',
        prev: 'Prev',
        prevTitle: 'Previous question',
        next: 'Next',
        nextTitle: 'Next question',
        questionOf: (cur: number, tot: number) => `Question ${cur} / ${tot}`,
        completed: '✓ Completed',
        validate: 'Submit my answer',
        correct: (xp: number) => `Correct answer! (+${xp} XP)`,
        wrong: 'Not quite right.',
        source: 'Source:',
        retry: 'Try again',
        skip: 'Skip',
        collectXp: (xp: number) => `COLLECT MY +${xp} XP!`,
        waswasMistake: 'Doubt fed: The Waswâs grows stronger!'
      };
    }
    return {
      title: standalone ? 'Quiz Islamiques' : 'Quiz & Défis',
      xpToWin: (xp: number) => `+${xp} XP à gagner`,
      close: 'Fermer',
      prev: 'Préc.',
      prevTitle: 'Question précédente',
      next: 'Suiv.',
      nextTitle: 'Question suivante',
      questionOf: (cur: number, tot: number) => `Question ${cur} / ${tot}`,
      completed: '✓ Réussi',
      validate: 'Valider ma réponse',
      correct: (xp: number) => `Bonne réponse ! (+${xp} XP)`,
      wrong: "Ce n'est pas tout à fait cela.",
      source: 'Source :',
      retry: 'Réessayer',
      skip: 'Passer',
      collectXp: (xp: number) => `RÉCOLTER MES +${xp} XP !`,
      waswasMistake: 'Doute nourri : Le Waswâs prend de la force !'
    };
  }, [language]);

  // Find first uncompleted quiz matching initialCategory if provided, or first uncompleted
  const initialIndex = Math.max(
    0,
    quizzes.findIndex((q) => {
      if (initialCategory && q.category.toLowerCase().includes('hilm')) {
        return !completedQuizIds.includes(q.id);
      }
      return !completedQuizIds.includes(q.id);
    })
  );

  const [currentIndex, setCurrentIndex] = useState<number>(
    initialIndex === -1 ? 0 : initialIndex
  );
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [localCompleted, setLocalCompleted] = useState<string[]>(completedQuizIds);

  const activeQuiz: LocalizedIslamicQuizQuestion = quizzes[currentIndex];
  // Ordre des réponses mélangé (la bonne réponse était en 2ᵉ position 11 fois sur 18)
  const shuffledQuiz = useMemo(() => {
    const order = shuffleSeeded(activeQuiz.options.map((_, i) => i), `${SESSION_SHUFFLE_SEED}:${activeQuiz.id}`);
    return {
      options: order.map((i) => activeQuiz.options[i]),
      correctIndex: order.indexOf(activeQuiz.correctIndex)
    };
  }, [activeQuiz]);
  const isAlreadyCompleted = localCompleted.includes(activeQuiz.id);
  const totalCount = quizzes.length;
  const completedCount = localCompleted.length;

  useEffect(() => {
    speechManager.stop();
    return () => {
      speechManager.stop();
    };
  }, []);

  const handleSelectOption = (idx: number) => {
    if (isSubmitted && isCorrect) return;
    speechManager.stop();
    soundManager.playSelect();
    setSelectedOptionIndex(idx);
  };

  const handleValidate = () => {
    if (selectedOptionIndex === null) return;
    speechManager.stop();

    setIsSubmitted(true);
    const correct = selectedOptionIndex === shuffledQuiz.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      soundManager.playQuizSuccess();
      if (!localCompleted.includes(activeQuiz.id)) {
        const nextCompleted = [...localCompleted, activeQuiz.id];
        setLocalCompleted(nextCompleted);
        if (onCompleteQuiz) {
          onCompleteQuiz(activeQuiz.id, activeQuiz.xpReward);
        }
      }
    } else {
      soundManager.playSelect();
      if (onWaswasMistake) {
        onWaswasMistake(15, ui.waswasMistake);
      }
    }
  };

  const handleNext = () => {
    speechManager.stop();
    soundManager.playSelect();
    const nextIdx = (currentIndex + 1) % totalCount;
    setCurrentIndex(nextIdx);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const handlePrev = () => {
    speechManager.stop();
    soundManager.playSelect();
    const prevIdx = (currentIndex - 1 + totalCount) % totalCount;
    setCurrentIndex(prevIdx);
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const handleRetry = () => {
    speechManager.stop();
    soundManager.playSelect();
    setSelectedOptionIndex(null);
    setIsSubmitted(false);
    setIsCorrect(false);
  };

  const optionLetters = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-5 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200 select-none">
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="bg-[#fbf7ee] border-3 border-[#3a2312] rounded-3xl w-full max-w-lg shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden max-h-[94vh] sm:max-h-[90vh]"
      >
        {/* Minimal Header: Just 'Quiz & Défis' + XP info + Close */}
        <div className="flex items-center justify-between px-3.5 py-2.5 sm:px-5 sm:py-3 bg-[#f3ebd9] border-b-2 border-[#3a2312] shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-[#2d6a4f] text-amber-300 border border-[#1b4332] shadow-xs">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-bold text-[#3a2312] font-cinzel leading-tight">
                  {ui.title}
                </h2>
                {activeQuiz.category && (
                  <span className="text-[9px] font-bold text-[#2d6a4f] bg-[#d8f3dc] px-1.5 py-0.2 rounded border border-[#74c69d]">
                    {activeQuiz.category}
                  </span>
                )}
              </div>
              <span className="text-[10px] text-[#2d6a4f] font-bold font-mono">
                {ui.xpToWin(activeQuiz.xpReward)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-[#ebdfc8] border border-[#b89f81] text-[#3a2312] text-xs font-mono font-bold shadow-inner">
              <span className="text-[#2d6a4f]">{completedCount}</span>
              <span className="text-[#8c6b4e]">/</span>
              <span>{totalCount}</span>
            </div>

            <button
              onClick={() => {
                soundManager.playSelect();
                onClose();
              }}
              title={ui.close}
              className="p-1.5 rounded-xl bg-[#ebdfc8] hover:bg-[#d9c7ab] text-[#3a2312] transition-colors cursor-pointer border border-[#3a2312] active:translate-y-0.5 shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Stepper Navigation: Question counter with Prev/Next arrows */}
        <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#ebdfc8] border-b border-[#d2be9f] text-xs font-mono shrink-0">
          <button
            onClick={handlePrev}
            className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-[#fbf7ee] hover:bg-[#f3ebd9] text-[#3a2312] border border-[#b89f81] font-bold cursor-pointer transition-all active:translate-y-0.5"
            title={ui.prevTitle}
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="text-[10px] sm:text-xs">{ui.prev}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="font-bold text-[#3a2312] font-cinzel text-xs">
              {ui.questionOf(currentIndex + 1, totalCount)}
            </span>
            {isAlreadyCompleted && (
              <span className="flex items-center gap-0.5 text-[10px] font-bold text-[#1b4332] bg-[#d8f3dc] px-1.5 py-0.2 rounded-md border border-[#74c69d]">
                {ui.completed}
              </span>
            )}
          </div>

          <button
            onClick={handleNext}
            className="flex items-center gap-0.5 px-2 py-0.5 rounded-lg bg-[#fbf7ee] hover:bg-[#f3ebd9] text-[#3a2312] border border-[#b89f81] font-bold cursor-pointer transition-all active:translate-y-0.5"
            title={ui.nextTitle}
          >
            <span className="text-[10px] sm:text-xs">{ui.next}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Question Body & Choices (Single Unified View, No Split Layout!) */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3.5 sm:p-5 flex flex-col gap-3">
          {/* Question Text */}
          <div className="bg-[#f3ebd9] p-3.5 sm:p-4 rounded-2xl border-2 border-[#3a2312] shadow-xs relative">
            <h3 className="text-sm sm:text-base font-black text-[#3a2312] font-cinzel leading-relaxed">
              {activeQuiz.question}
            </h3>

            {/* Optional Calligraphic Arabic text */}
            {activeQuiz.arabic && (
              <div className="mt-2 pt-2 border-t border-[#d2be9f]/60 text-center">
                <span className="text-lg sm:text-xl font-amiri text-[#6b4724] font-arabic">
                  {activeQuiz.arabic}
                </span>
              </div>
            )}
          </div>

          {/* Direct Choices List: 100% visible, ergonomic for mobile fingers */}
          <div className="flex flex-col gap-2.5">
            {shuffledQuiz.options.map((option, idx) => {
              const isSelected = selectedOptionIndex === idx;
              const isOptionCorrect = idx === shuffledQuiz.correctIndex;

              let cardStyle =
                'bg-[#fbf7ee] border-[#d2be9f] text-[#3a2312] hover:bg-[#f3ebd9] active:scale-[0.99]';

              if (isSubmitted) {
                if (isOptionCorrect) {
                  cardStyle =
                    'bg-[#d8f3dc] border-[#2d6a4f] text-[#1b4332] shadow-sm font-bold ring-2 ring-[#52b788]/50';
                } else if (isSelected && !isOptionCorrect) {
                  cardStyle =
                    'bg-[#fee2e2] border-[#b91c1c] text-[#991b1b] shadow-sm font-bold';
                } else {
                  cardStyle = 'bg-[#ebdfc8]/60 border-[#d2be9f] text-[#5c4028]';
                }
              } else if (isSelected) {
                cardStyle =
                  'bg-[#f0a04b] border-[#d97c27] text-[#1a1209] font-bold shadow-md ring-2 ring-[#d97c27]/40';
              }

              // Strip redundant 'A. ' if already present in option string
              const cleanOptionText = option.replace(/^[A-D]\.\s*/, '');

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={isSubmitted && isCorrect}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border-2 text-sm sm:text-base font-bold ${isRtl ? 'text-right' : 'text-left'} transition-all flex items-center justify-between gap-3 cursor-pointer ${cardStyle}`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span
                      className={`w-7 h-7 rounded-xl font-mono font-black text-xs sm:text-sm flex items-center justify-center shrink-0 border ${
                        isSelected && !isSubmitted
                          ? 'bg-[#1a1209] text-white border-[#1a1209]'
                          : isSubmitted && isOptionCorrect
                          ? 'bg-[#2d6a4f] text-white border-[#2d6a4f]'
                          : isSubmitted && isSelected && !isOptionCorrect
                          ? 'bg-[#b91c1c] text-white border-[#b91c1c]'
                          : 'bg-[#ebdfc8] text-[#5c4028] border-[#b89f81]'
                      }`}
                    >
                      {optionLetters[idx]}
                    </span>
                    <span className="leading-snug">{cleanOptionText}</span>
                  </div>

                  {isSubmitted && isOptionCorrect && (
                    <CheckCircle className="w-5 h-5 text-[#2d6a4f] shrink-0" />
                  )}
                  {isSubmitted && isSelected && !isOptionCorrect && (
                    <AlertCircle className="w-5 h-5 text-[#b91c1c] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Validation Button (Visible before submit) */}
          {!isSubmitted && (
            <button
              type="button"
              onClick={handleValidate}
              disabled={selectedOptionIndex === null}
              className={`w-full py-3.5 px-4 rounded-2xl font-black text-sm sm:text-base font-cinzel transition-all border-2 flex items-center justify-center gap-2 shadow-[0_3px_0_#3a2312] active:translate-y-0.5 cursor-pointer mt-1 ${
                selectedOptionIndex !== null
                  ? 'bg-[#d97c27] hover:bg-[#c26a1b] text-white border-[#3a2312]'
                  : 'bg-[#ebdfc8]/60 text-[#8c6b4e]/50 border-[#3a2312]/30 cursor-not-allowed opacity-60 shadow-none'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{ui.validate}</span>
            </button>
          )}

          {/* Results & Educational Source Feedback (Minimal, direct!) */}
          {isSubmitted && (
            <div className="flex flex-col gap-2.5 mt-1 animate-in fade-in duration-200">
              <div
                className={`p-3.5 sm:p-4 rounded-2xl border-2 ${
                  isCorrect
                    ? 'bg-[#ebf5e9] border-[#2d6a4f] text-[#1b4332]'
                    : 'bg-[#fde2e4] border-[#b91c1c] text-[#7f1d1d]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base font-cinzel">
                    {isCorrect ? (
                      <>
                        <Sparkles className="w-5 h-5 text-[#2d6a4f] shrink-0" />
                        <span>{ui.correct(activeQuiz.xpReward)}</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-5 h-5 text-[#b91c1c] shrink-0" />
                        <span>{ui.wrong}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Clear explanation */}
                <p className="text-xs sm:text-sm leading-relaxed text-[#3a2312]">
                  {activeQuiz.explanation}
                </p>

                {/* Source prominently displayed as requested */}
                {activeQuiz.hadithOrQuranRef && (
                  <div className="mt-2.5 pt-2 border-t border-[#3a2312]/15 flex items-start gap-1.5 text-xs sm:text-sm font-bold text-[#2d6a4f]">
                    <BookOpen className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{ui.source} {activeQuiz.hadithOrQuranRef}</span>
                  </div>
                )}
              </div>

              {/* Action Buttons: Next Question or Retry */}
              <div className="flex items-center gap-2 w-full">
                {!isCorrect ? (
                  <>
                    <button
                      type="button"
                      onClick={handleRetry}
                      style={{
                        backgroundColor: '#ebdfc8',
                        color: '#3a2312'
                      }}
                      className="flex-1 py-3 px-3 rounded-2xl text-[#3a2312] font-bold text-xs sm:text-sm font-cinzel border-2 border-[#3a2312] shadow-[0_2px_0_#3a2312] active:translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#e0cfb4]"
                    >
                      <RotateCcw className="w-4 h-4 text-[#3a2312]" />
                      <span>{ui.retry}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      style={{
                        backgroundColor: '#f3ebd9',
                        color: '#6b4724'
                      }}
                      className="flex-1 py-3 px-3 rounded-2xl text-[#6b4724] font-bold text-xs sm:text-sm font-cinzel border-2 border-[#b89f81] shadow-xs active:translate-y-0.5 flex items-center justify-center gap-1.5 cursor-pointer hover:bg-[#ebdfc8]"
                    >
                      <span>{ui.skip}</span>
                      <ArrowRight className="w-4 h-4 text-[#6b4724]" />
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleNext}
                    style={{
                      backgroundColor: '#1b4332',
                      backgroundImage: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
                      color: '#ffffff'
                    }}
                    className="w-full py-4 px-4 rounded-2xl text-white font-black text-sm sm:text-base font-cinzel border-2 border-[#0d281e] shadow-[0_4px_0_#0d281e] active:translate-y-0.5 flex items-center justify-center gap-2.5 cursor-pointer hover:brightness-110 uppercase tracking-wide"
                  >
                    <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                    <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{ui.collectXp(activeQuiz.xpReward)}</span>
                    <ArrowRight className="w-5 h-5 text-amber-300" />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
