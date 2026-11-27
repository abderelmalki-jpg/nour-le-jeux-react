import React, { useState, useRef, useEffect, useMemo } from 'react';
import { shuffleSeeded, SESSION_SHUFFLE_SEED } from '../utils/quizShuffle';
import { Quiz } from '../types';
import { CharacterAvatar } from './CharacterAvatar';
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Volume2,
  VolumeX
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { speechManager } from '../utils/speech';
import { CustomAssetsConfig } from '../utils/assets';
import { useLanguage } from '../context/LanguageContext';
import { gameTranslations } from '../i18n/gameTranslations';
import { getLocalizedQuiz } from '../utils/narrativeI18n';

interface QuizModalProps {
  quiz: Quiz;
  onComplete: () => void;
  onHarvestXp?: (amount: number, reason: string, startX?: number, startY?: number) => void;
  onWaswasMistake?: (amount: number, reason: string) => void;
  customAssets?: CustomAssetsConfig;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  quiz,
  onComplete,
  onHarvestXp,
  onWaswasMistake,
  customAssets
}) => {
  const { language, isRtl } = useLanguage();
  const t = gameTranslations[language]?.quiz || gameTranslations.fr.quiz;
  const activeQuiz = getLocalizedQuiz(quiz, language);

  // Defensive normalization of quiz props to prevent any runtime crashes
  const rawOptions = (activeQuiz && Array.isArray(activeQuiz.options)) ? activeQuiz.options : [];
  const baseOptions: { id: 'A' | 'B' | 'C' | 'D'; text: string; isCorrect: boolean }[] = rawOptions.map((opt: any, index: number) => {
    const defaultLetter = (['A', 'B', 'C', 'D'][index] || 'A') as 'A' | 'B' | 'C' | 'D';
    if (typeof opt === 'string') {
      const isAns = (activeQuiz as any).correctAnswer !== undefined ? index === (activeQuiz as any).correctAnswer : index === 0;
      return { id: defaultLetter, text: opt, isCorrect: isAns };
    }
    return {
      id: opt.id || defaultLetter,
      text: opt.text || String(opt),
      isCorrect: opt.isCorrect ?? ((activeQuiz.correctOptionId && opt.id === activeQuiz.correctOptionId) || false)
    };
  });

  // Ordre des réponses mélangé (stable pendant l'affichage de la question) : la bonne réponse
  // ne reste plus toujours en B/C, et les lettres A–D sont réattribuées dans l'ordre affiché.
  const quizKey = activeQuiz?.id || quiz?.id || 'quiz';
  const normalizedOptions = useMemo(() => {
    const shuffled = shuffleSeeded(baseOptions, `${SESSION_SHUFFLE_SEED}:${quizKey}`);
    return shuffled.map((o, i) => ({ ...o, id: (['A', 'B', 'C', 'D'][i] || 'A') as 'A' | 'B' | 'C' | 'D' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quizKey, language]);
  const correctOptionId: 'A' | 'B' | 'C' | 'D' = normalizedOptions.find((o) => o.isCorrect)?.id || 'A';
  const reference = activeQuiz?.reference || {
    concept: activeQuiz?.topic || 'Sagesse & Enseignement',
    reference: 'Enseignement',
    citationText: activeQuiz?.explanation || '',
    sourceType: 'Coran' as const,
    arabic: ''
  };
  const promptSpeaker = activeQuiz?.promptSpeaker || 'noura';

  const [wrongOptionIds, setWrongOptionIds] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    speechManager.stop();
    return () => {
      speechManager.stop();
    };
  }, []);

  // XP dégressif selon le nombre d'erreurs : 0 faute = 40 XP, 1 = 25 XP, 2 = 15 XP, 3+ = 5 XP
  const xpReward =
    wrongOptionIds.length === 0 ? 40 : wrongOptionIds.length === 1 ? 25 : wrongOptionIds.length === 2 ? 15 : 5;

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    if (isSolved || wrongOptionIds.includes(optionId)) return;
    speechManager.stop();

    const isOptionCorrect = optionId === correctOptionId;
    if (isOptionCorrect) {
      setIsSolved(true);
      soundManager.playQuizSuccess();
      setTimeout(() => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo({
            top: scrollContainerRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    } else {
      soundManager.playSelect();
      setWrongOptionIds((prev) => [...prev, optionId]);
      if (onWaswasMistake) {
        const reason =
          language === 'ar'
            ? 'غُذِّيَ الشَّكُّ: الْوَسْوَاسُ يَزْدَادُ قُوَّةً!'
            : language === 'en'
              ? 'Doubt fed: The Waswas grows stronger!'
              : 'Doute nourri : Le Waswâs prend de la force !';
        onWaswasMistake(12, reason);
      }
    }
  };

  const hintText = language === 'ar'
    ? 'اختر الإجابة الصحيحة (من المحاولة الأولى: +40 نقطة)'
    : language === 'en'
    ? 'Choose the right answer (1st try: +40 XP)'
    : 'Choisis la bonne réponse (du 1er coup : +40 XP)';

  const wrongWarning = language === 'ar'
    ? `ليست الإجابة الصحيحة — ازداد الوسواس قوة (+12) ! حاول مرة أخرى (المكافأة الحالية: +${xpReward} XP)`
    : language === 'en'
    ? `Not the right answer — the Waswas grew stronger (+12)! Try again (current reward: +${xpReward} XP)`
    : `Ce n’est pas la bonne réponse — le Waswâs augmente (+12) ! Essaie encore (gain actuel : +${xpReward} XP)`;

  const harvestLabel = language === 'ar'
    ? `احصل على +${xpReward} نقطة إيمان`
    : language === 'en'
    ? `COLLECT MY +${xpReward} XP`
    : `RÉCOLTER MES +${xpReward} XP`;

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200 select-none"
    >
      <div className="w-full max-w-lg bg-[#fbf7ee] border-3 border-[#3a2312] rounded-3xl shadow-[0_8px_0_#3a2312] flex flex-col max-h-[85vh] relative overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Pinned Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b-2 border-[#3a2312] bg-[#f3ebd9] shrink-0 z-10">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-xl bg-[#ebdfc8] border-2 border-[#3a2312] text-[#3a2312]">
              <BookOpen className="w-4 h-4 text-[#d97c27]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-[#8c5a2b] uppercase tracking-wider font-cinzel">
                  {t.modalTitle}
                </span>
                <span className="text-[9px] font-black text-[#2d6a4f] bg-[#d8f3dc] px-1.5 py-0.2 rounded-md border border-[#74c69d]">
                  +{xpReward} XP
                </span>
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#3a2312] font-cinzel line-clamp-1">
                {activeQuiz.topic}
              </h3>
            </div>
          </div>

          <span className="text-[10px] font-bold text-[#8c5a2b] bg-[#ebdfc8] px-2 py-0.5 rounded-full border border-[#3a2312] font-mono shrink-0">
            {quiz.reference.reference}
          </span>
        </div>

        {/* Scrollable Content Body */}
        <div
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto p-3.5 sm:p-4 flex flex-col gap-3 custom-scrollbar"
        >
          {/* Prompt from Noura */}
          <div className="flex items-start gap-2.5 sm:gap-3 bg-[#ebdfc8] p-2.5 sm:p-3 rounded-2xl border-2 border-[#3a2312] shrink-0">
            <CharacterAvatar
              speaker={quiz.promptSpeaker}
              size="sm"
              customAssets={customAssets}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-xs font-bold text-[#2d6a4f] font-cinzel">
                  {language === 'ar' ? 'نورة' : 'NOURA'}
                </span>
              </div>
              <p className={`font-bold text-[#3a2312] mt-0.5 ${isRtl ? 'font-amiri text-base sm:text-lg md:text-xl leading-[1.8] text-right' : 'text-sm sm:text-base leading-snug'}`}>
                « {quiz.question} »
              </p>
            </div>
          </div>

          {/* 4 Options Grid — wrong attempts are crossed out WITHOUT revealing the right answer until found */}
          <div className="grid grid-cols-1 gap-2.5 shrink-0">
            {normalizedOptions.map((option) => {
              const isWrongTried = wrongOptionIds.includes(option.id);
              const isSolvedCorrect = isSolved && option.isCorrect;
              const resolvedStyle = isSolvedCorrect
                ? 'bg-[#ebf5e9] border-[#4a804d] text-[#2d522f] shadow-[0_2px_0_#3a2312] font-bold'
                : isWrongTried
                  ? 'bg-[#fde8e8] border-[#c53030] text-[#9b2c2c] opacity-75 line-through cursor-not-allowed'
                  : isSolved
                    ? 'bg-[#ebdfc8]/50 border-[#b89f81] text-[#8c6b4e] opacity-55 cursor-default'
                    : 'bg-[#f3ebd9] border-[#3a2312] text-[#3a2312] hover:bg-[#ebdcc4] shadow-[0_2px_0_#3a2312] cursor-pointer';

              return (
                <button
                  key={option.id}
                  disabled={isSolved || isWrongTried}
                  onClick={() => handleSelectOption(option.id)}
                  className={`flex items-center gap-3 p-3 sm:p-3.5 rounded-2xl border-2 transition-all font-bold ${
                    isRtl ? 'text-right font-amiri text-base sm:text-lg leading-[1.8]' : 'text-left text-sm sm:text-base'
                  } ${resolvedStyle}`}
                >
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-xl bg-[#ebdfc8] text-xs sm:text-sm font-black flex items-center justify-center border border-[#3a2312] shrink-0 font-mono">
                    {option.id}
                  </span>
                  <span className="flex-1 leading-snug">{option.text}</span>
                  {isSolvedCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#4a804d] shrink-0" />
                  )}
                  {isWrongTried && (
                    <XCircle className="w-5 h-5 text-[#c53030] shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Verified Source Card (ONLY revealed once the player finds the correct answer!) */}
          {isSolved && (
            <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300 pb-1">
              <div className="p-3.5 sm:p-4 rounded-2xl border-2 bg-[#ebf5e9] border-[#4a804d] text-[#2d522f]">
                <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-[#3a2312]/15">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#4a804d]" />
                    <span className="text-xs sm:text-sm font-bold text-[#2d522f] font-cinzel">
                      {t.correctAnswer}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold text-[#8c5a2b] font-cinzel">
                      {t.explanationHeader}
                    </span>
                  </div>
                </div>

                <p className={`text-[#3a2312] ${isRtl ? 'font-amiri text-base sm:text-lg leading-[1.85] text-right font-medium' : 'text-xs sm:text-sm leading-relaxed font-sans font-medium'}`}>
                  {activeQuiz.explanation}
                </p>

                {/* Reference Excerpt */}
                {reference && (
                  <div className="mt-2.5 pt-2 border-t border-[#3a2312]/15 flex flex-col gap-0.5">
                    <span className="text-xs font-bold text-[#8c5a2b]">
                      {reference.concept} — {reference.reference}
                    </span>
                    {reference.citationText && (
                      <p className="text-xs italic text-[#6b4724]">
                        « {reference.citationText} »
                      </p>
                    )}
                    {reference.arabic && (
                      <p className="text-right text-base sm:text-lg text-[#3a2312] font-amiri dir-rtl mt-0.5">
                        {reference.arabic}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Pinned Sticky Bottom Footer */}
        <div className="p-3 sm:p-4 bg-[#f3ebd9] border-t-2 border-[#3a2312] shrink-0 z-10">
          <div className="flex flex-col gap-2">
            {!isSolved && wrongOptionIds.length === 0 && (
              <div className="text-center py-1">
                <span className="text-xs text-[#8c5a2b] font-bold font-cinzel">
                  {hintText}
                </span>
              </div>
            )}

            {!isSolved && wrongOptionIds.length > 0 && (
              <div className="text-center py-1 px-2 rounded-xl bg-[#fde8e8] border border-[#c53030]/40">
                <span className="text-xs text-[#9b2c2c] font-bold">
                  {wrongWarning}
                </span>
              </div>
            )}

            {isSolved && (
              <button
                type="button"
                onClick={(e) => {
                  if (onHarvestXp) {
                    onHarvestXp(xpReward, `${activeQuiz.topic} (+${xpReward} XP)`, e.clientX, e.clientY);
                  } else {
                    soundManager.playQuizSuccess();
                  }
                  setTimeout(() => {
                    onComplete();
                  }, 500);
                }}
                style={{
                  backgroundColor: '#1b4332',
                  backgroundImage: 'linear-gradient(135deg, #1b4332 0%, #2d6a4f 100%)',
                  color: '#ffffff'
                }}
                className="w-full py-3.5 px-4 rounded-2xl text-white font-black text-sm sm:text-base flex items-center justify-center gap-2.5 border-2 border-[#0d281e] shadow-[0_4px_0_#0d281e] active:translate-y-0.5 transition-all cursor-pointer font-cinzel uppercase tracking-wider hover:brightness-110"
              >
                <span className="drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">{harvestLabel}</span>
                <ArrowRight className={`w-5 h-5 text-amber-300 ${isRtl ? 'rotate-180' : ''}`} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
