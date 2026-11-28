import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  FastForward,
  Play,
  Save
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { CustomAssetsConfig } from '../utils/assets';
import { trackChapterCompleted } from '../utils/analytics';
import { useLanguage } from '../context/LanguageContext';
import { CharacterTraits } from '../types';
import { getPersonalityProfile, TRAIT_CONFIG, INITIAL_CHARACTER_TRAITS } from '../utils/characterTraits';

interface ChapterEndProps {
  xpTotal: number;
  chapterNumber?: number;
  traits?: CharacterTraits;
  isSupporter?: boolean;
  onReplay: () => void;
  onOpenKnowledge: () => void;
  onContinueAdventure?: () => void;
  onSelectChapter?: (chapter: number) => void;
  onReturnToMenu?: () => void;
  onSaveAndExit?: () => void;
  onOpenFeedback?: () => void;
  onOpenSupport?: () => void;
  customAssets?: CustomAssetsConfig;
}

export const ChapterEnd: React.FC<ChapterEndProps> = ({
  xpTotal,
  chapterNumber = 1,
  traits,
  isSupporter = false,
  onReplay,
  onContinueAdventure,
  onSelectChapter,
  onReturnToMenu,
  onSaveAndExit,
  onOpenFeedback
}) => {
  const { language, isRtl } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [saveFeedback, setSaveFeedback] = useState<string | null>(null);
  const [creditsPhase, setCreditsPhase] = useState<'rolling' | 'finished'>('rolling');
  const [creditsRunKey, setCreditsRunKey] = useState<number>(0);
  const [finaleSlideIdx, setFinaleSlideIdx] = useState<number>(0);
  const [chapterRollPhase, setChapterRollPhase] = useState<'rolling' | 'card'>('rolling');
  const [chapterRollKey, setChapterRollKey] = useState<number>(0);

  const FINALE_MONTAGE = [
    {
      type: 'video' as const,
      src: '/game-assets/scene1/08_chemin_vers_poteau.mp4',
      poster: '/game-assets/scene1/08_chemin_vers_poteau.png',
      caption: language === 'ar' ? 'الفصل ١ • الخطوة الأولى نحو الوادي' : language === 'en' ? 'Chapter 1 • The First Step Into the Valley' : 'Chapitre 1 • Le Premier Pas vers la Vallée'
    },
    {
      type: 'image' as const,
      src: '/game-assets/scene2/noura_guide_quetes.jpg',
      caption: language === 'ar' ? 'الفصل ١ • مفترق الطرق مع نورة' : language === 'en' ? 'Chapter 1 • The Crossroads with Noura' : 'Chapitre 1 • Le Carrefour avec Noura'
    },
    {
      type: 'image' as const,
      src: '/game-assets/scene3/noura_guide_savoir.jpg',
      caption: language === 'ar' ? 'الفصل ١ • كتاب العلم والحكمة' : language === 'en' ? 'Chapter 1 • The Book of Wisdom' : 'Chapitre 1 • Le Livre du Savoir'
    },
    {
      type: 'image' as const,
      src: '/game-assets/chapter5/scene41_sentier_oliviers.jpg',
      caption: language === 'ar' ? 'الفصل ٥ • الصعود بين أشجار الزيتون' : language === 'en' ? 'Chapter 5 • Climbing the Olive Trail' : 'Chapitre 5 • Le Sentier des Oliviers'
    },
    {
      type: 'image' as const,
      src: '/game-assets/chapter5/scene42_halte_gourde.jpg',
      caption: language === 'ar' ? 'الفصل ٥ • الحِلم على المنحدر' : language === 'en' ? 'Chapter 5 • Gentleness on the Slope' : 'Chapitre 5 • Le Hilm sur la Pente'
    },
    {
      type: 'image' as const,
      src: '/game-assets/chapter5/scene43_bilal_lanterne.jpg',
      caption: language === 'ar' ? 'الفصل ٥ • أخوّة بلال عند القمة' : language === 'en' ? 'Chapter 5 • Bilal’s Brotherhood Near the Summit' : 'Chapitre 5 • La Fraternité de Bilâl'
    }
  ];

  const personality = getPersonalityProfile(traits || INITIAL_CHARACTER_TRAITS);
  const isGrandFinale = chapterNumber === 5;

  useEffect(() => {
    soundManager.playChapterComplete();
    trackChapterCompleted(chapterNumber, xpTotal, chapterNumber);
  }, [xpTotal, chapterNumber]);

  const isFinalPopup = currentSlide === 1;

  // Auto-advance slide 0 (Trésors) after 7.5 seconds (Chapters 1-4 only)
  useEffect(() => {
    if (isGrandFinale || isFinalPopup) return;
    const timer = setTimeout(() => {
      setCurrentSlide(1);
    }, 7500);
    return () => clearTimeout(timer);
  }, [isFinalPopup, isGrandFinale]);

  // Cycle the left-panel montage every 5.8s during the cinematic credits roll
  useEffect(() => {
    if (!isGrandFinale || creditsPhase !== 'rolling') return;
    const interval = setInterval(() => {
      setFinaleSlideIdx((prev) => (prev + 1) % FINALE_MONTAGE.length);
    }, 5800);
    return () => clearInterval(interval);
  }, [isGrandFinale, creditsPhase, FINALE_MONTAGE.length]);

  // Auto-transition to Victory Action Card after the 32s cinematic credits roll (Ch. 5)
  useEffect(() => {
    if (!isGrandFinale || creditsPhase !== 'rolling') return;
    const timer = setTimeout(() => {
      setCreditsPhase('finished');
    }, 32500);
    return () => clearTimeout(timer);
  }, [isGrandFinale, creditsPhase, creditsRunKey]);

  // Auto-transition to Chapter Action Card after the 16s black-screen roll (Ch. 1-4)
  useEffect(() => {
    if (isGrandFinale || chapterRollPhase !== 'rolling') return;
    const timer = setTimeout(() => {
      setChapterRollPhase('card');
    }, 16500);
    return () => clearTimeout(timer);
  }, [isGrandFinale, chapterRollPhase, chapterRollKey]);

  const goToNextSlide = () => {
    soundManager.playSelect();
    setCurrentSlide(1);
  };

  const goToPrevSlide = () => {
    soundManager.playSelect();
    setCurrentSlide(0);
  };

  const endLabels =
    language === 'ar'
      ? {
          skip: 'تخطّي',
          openMap: 'افْتَحْ خَرِيطَةَ الرِّحْلَةِ',
          continueTo: (n: number) => `مُتَابَعَةٌ إِلَى الْفَصْلِ ${n}`,
          replay: 'إِعَادَةُ هٰذَا الْفَصْلِ',
          reviewTreasures: 'مُرَاجَعَةُ كُنُوزِي',
          savePause: 'حِفْظٌ وَاسْتِرَاحَةٌ',
          feedback: 'إِرْسَالُ رَأْيِي',
          savedMsg: 'تَمَّ حِفْظُ التَّقَدُّمِ! جَارِي التَّوْجِيهُ...'
        }
      : language === 'en'
      ? {
          skip: 'Skip',
          openMap: 'Open Travel Map',
          continueTo: (n: number) => `Continue to Chapter ${n}`,
          replay: 'Replay this Chapter',
          reviewTreasures: 'Review my Treasures',
          savePause: 'Save & Pause',
          feedback: 'Give Feedback',
          savedMsg: 'Progress saved! Redirecting...'
        }
      : {
          skip: 'Passer',
          openMap: 'Ouvrir la Carte du Voyage',
          continueTo: (n: number) => `Continuer vers le Chapitre ${n}`,
          replay: 'Rejouer ce Chapitre',
          reviewTreasures: 'Revoir mes Trésors',
          savePause: 'Sauvegarder & Pause',
          feedback: 'Donner mon avis',
          savedMsg: 'Progression sauvegardée ! Redirection...'
        };

  const nextChapterTitle =
    language === 'ar'
      ? chapterNumber === 1
        ? 'الْفَصْلُ ٢ : طَرِيقُ الْحِلْمِ'
        : chapterNumber === 2
        ? 'الْفَصْلُ ٣ : طَرِيقُ التَّوَكُّلِ'
        : chapterNumber === 3
        ? 'الْفَصْلُ ٤ : مَا زَالَ بَيْنَ يَدَيْكَ'
        : chapterNumber === 4
        ? 'الْفَصْلُ ٥ : قِمَّةُ الْمُثَابَرَةِ'
        : 'اكْتَمَلَ الْمَوْسِمُ الْأَوَّلُ — الْفُصُولُ الْخَمْسَةُ مُنْجَزَةٌ!'
      : language === 'en'
      ? chapterNumber === 1
        ? 'Chapter 2: The Path of Hilm'
        : chapterNumber === 2
        ? 'Chapter 3: The Path of Tawakkul'
        : chapterNumber === 3
        ? 'Chapter 4: What You Still Have'
        : chapterNumber === 4
        ? 'Chapter 5: The Summit of Perseverance'
        : 'Season 1 Complete — All 5 Chapters Accomplished!'
      : chapterNumber === 1
      ? 'Chapitre 2 : Le Chemin du Hilm'
      : chapterNumber === 2
      ? 'Chapitre 3 : Le Chemin du Tawakkul'
      : chapterNumber === 3
      ? 'Chapitre 4 : Ce que tu as encore'
      : chapterNumber === 4
      ? 'Chapitre 5 : Le Sommet de la Persévérance'
      : 'Saison 1 Complète — Les 5 Chapitres Accomplis !';

  const headerTag = isFinalPopup
    ? language === 'ar'
      ? 'خِتَامُ الْفَصْلِ • الْمُغَامَرَةُ تَتَوَاصَلُ'
      : 'CHAPITRE ACCOMPLI • EN ROUTE'
    : language === 'ar'
    ? 'ثَمَرَاتُ الرِّحْلَةِ • قِمَّةُ الْفَصْلِ'
    : 'BILAN DU CHAPITRE • TRÉSORS FORGÉS';

  // 🎬 GRAND FINAL CINÉMATOGRAPHIQUE — FIN DE LA SAISON 1 (CHAPITRE 5)
  if (isGrandFinale) {
    const finaleText =
      language === 'ar'
        ? {
            badge: 'اكتمل الموسم الأول',
            mainTitle: 'نُور — طريق الحكمة',
            victoryHeading: 'مبارك! لقد أتممت المغامرة وفزت بالتحدي',
            victorySub: 'رافقْتَ عثمان من عتبة غرفته حتى قمة الصبر والثبات.',
            skipCredits: 'تخطّي الشارة',
            replayCredits: 'إعادة عرض الشارة',
            journeyTitle: 'ملخّص رحلتك عبر الفصول الخمسة',
            chapters: [
              { num: 'الفصل ١', title: 'التغلّب على العزلة', desc: 'تجاوز التردّد، الاستعاذة بالله، والانفتاح على الآخرين بالتعارف.' },
              { num: 'الفصل ٢', title: 'طريق الحِلم', desc: 'ضبط النفس عند الغضب ومقابلة الإساءة بالعفو والرفق.' },
              { num: 'الفصل ٣', title: 'طريق التوكّل', desc: 'الأخذ بالأسباب والعلاج مع صدق الاعتماد على الله في الضعف.' },
              { num: 'الفصل ٤', title: 'ما زال بين يديك', desc: 'برّ الوالدين، الامتنان، وإدراك قيمة من يعتني بنا بصمت.' },
              { num: 'الفصل ٥', title: 'قمّة المثابرة', desc: 'الثبات خطوةً بعد خطوة، والصبر الجميل حتى بلوغ القمة.' }
            ],
            statsTitle: 'حصيلة رحلتك',
            xpLabel: 'مجموع نقاط الخبرة',
            rankLabel: 'الطبع المكتسب',
            creditsTitle: 'شارة الختام والشكر',
            creatorRole: 'الفكرة والكتابة والإخراج',
            creatorName: 'عبد الرحمان — NOUR Studio',
            castRole: 'شخصيات الرحلة',
            castNames: 'عثمان • نورة • بلال • التاجر • العطّار • الفتى ذو الجبيرة • الجدّ • الأب • الحكيم',
            sourcesRole: 'المصادر والمراجع الأصيلة',
            sourcesNames: 'القرآن الكريم • صحيح البخاري • صحيح مسلم • سنن أبي داود • جامع الترمذي',
            thanksRole: 'شكر خاص',
            thanksText: 'شكراً لك لمرافقة عثمان حتى القمة، ولكلّ أسرةٍ ولاعبٍ يدعم مشروع نُور. أجمل ما في الرحلة هو ما نطبّقه الآن في حياتنا اليومية.',
            toBeContinued: 'يُتبع... فصولٌ جديدة قيد الإعداد بإذن الله',
            alhamdulillah: 'الْحَمْدُ لِلَّهِ',
            finalCardTitle: 'لقد أتممت الموسم الأول!',
            finalCardSub: 'أحسنت! لقد أتممت الفصول الخمسة من نُور. أعِد لعب أيّ فصل لاستكشاف خيارات أخرى، ورفع نقاط الخبرة، والتقدّم في التصنيفات — وفصول جديدة قادمة قريباً!',
            openMap: 'العودة إلى خريطة الرحلة',
            replayCh5: 'إعادة الفصل الخامس',
            chooseChapter: 'إعادة فصلٍ محدّد',
            quitToMenu: 'القائمة الرئيسية / خروج'
          }
        : language === 'en'
        ? {
            badge: 'SEASON 1 COMPLETE',
            mainTitle: 'NOUR — THE PATH OF WISDOM',
            victoryHeading: 'Congratulations! You Completed the Adventure',
            victorySub: 'You guided Othman from the threshold of his room all the way to the summit of perseverance.',
            skipCredits: 'Skip Credits',
            replayCredits: 'Replay Credits',
            journeyTitle: 'Your Journey Across the 5 Chapters',
            chapters: [
              { num: 'Chapter 1', title: 'Overcoming Loneliness', desc: 'Stepping past hesitation through Istiʿādhah and reaching out to others (Taʿāruf).' },
              { num: 'Chapter 2', title: 'The Path of Hilm', desc: 'Mastering anger in the face of injustice and answering harshness with gentleness.' },
              { num: 'Chapter 3', title: 'The Path of Tawakkul', desc: 'Combining sound medical care with sincere trust in Allah during illness.' },
              { num: 'Chapter 4', title: 'What You Still Have', desc: 'Rediscovering gratitude and honoring one’s parents (Birr al-Wālidayn).' },
              { num: 'Chapter 5', title: 'The Summit of Perseverance', desc: 'Climbing step by step with Sabr and steady faithfulness to the very peak.' }
            ],
            statsTitle: 'Your Traveler Record',
            xpLabel: 'Total Experience',
            rankLabel: 'Character Forged',
            creditsTitle: 'Credits & Acknowledgements',
            creatorRole: 'Creation, Writing & Direction',
            creatorName: 'Abderrahmane — NOUR Studio',
            castRole: 'Characters of the Journey',
            castNames: 'Othman • Noura • Bilal • The Merchant • The Apothecary • The Boy with the Splint • The Grandfather • The Father • The Sage',
            sourcesRole: 'Authentic Sources & References',
            sourcesNames: 'The Noble Qur’an • Sahih al-Bukhari • Sahih Muslim • Sunan Abi Dawud • Jamiʿ at-Tirmidhi',
            thanksRole: 'Special Thanks',
            thanksText: 'Thank you for walking alongside Othman to the summit, and thank you to every family, parent, and player supporting NOUR. The finest chapter now continues in real life.',
            toBeContinued: 'To be continued… New chapters are already in the making.',
            alhamdulillah: 'الْحَمْدُ لِلَّهِ',
            finalCardTitle: 'Victory — Season 1 Completed!',
            finalCardSub: 'Well done! You completed all 5 chapters of NOUR. Replay any chapter to explore other choices, boost your XP score, and climb the rankings — new chapters are coming soon!',
            openMap: 'Return to Travel Map',
            replayCh5: 'Replay Chapter 5',
            chooseChapter: 'Replay a specific chapter',
            quitToMenu: 'Main Menu / Quit'
          }
        : {
            badge: 'SAISON 1 ACCOMPLIE',
            mainTitle: 'NOUR — LA VOIE DE LA SAGESSE',
            victoryHeading: 'Félicitations ! Tu as terminé l’aventure',
            victorySub: 'Tu as accompagné Othmân du seuil de sa chambre jusqu’au sommet de la persévérance.',
            skipCredits: 'Passer le générique',
            replayCredits: 'Revoir le générique',
            journeyTitle: 'Résumé de ton voyage à travers les 5 chapitres',
            chapters: [
              { num: 'Chapitre 1', title: 'Vaincre la Solitude', desc: 'Dépasser l’hésitation grâce à l’Istiʿādhah et aller vers les autres (Taʿāruf).' },
              { num: 'Chapitre 2', title: 'Le Chemin du Hilm', desc: 'Maîtriser sa colère face à l’injustice et répondre au mal par la douceur et le pardon.' },
              { num: 'Chapitre 3', title: 'Le Chemin du Tawakkul', desc: 'Allier les soins et la confiance sincère en Allah dans la fragilité et l’épreuve.' },
              { num: 'Chapitre 4', title: 'Ce que tu as encore', desc: 'Redécouvrir la valeur immense de ses parents et la gratitude (Birr al-Wālidayn).' },
              { num: 'Chapitre 5', title: 'Le Sommet de la Persévérance', desc: 'Gravir la montagne pas à pas par le Sabr et la constance jusqu’aux crêtes.' }
            ],
            statsTitle: 'Ton Bilan de Voyageur',
            xpLabel: 'Expérience Totale',
            rankLabel: 'Tempérament Forgé',
            creditsTitle: 'Générique & Remerciements',
            creatorRole: 'Création, Écriture & Direction',
            creatorName: 'Abderrahmane — NOUR Studio',
            castRole: 'Personnages de l’Aventure',
            castNames: 'Othmân • Noura • Bilâl • Le Marchand • L’Apothicaire • Le Compagnon à l’Attelle • Le Grand-Père • Le Père • Le Sage',
            sourcesRole: 'Sources & Repères Authentiques',
            sourcesNames: 'Le Saint Coran • Sahih al-Bukhari • Sahih Muslim • Sunan Abi Dawud • Jamiʿ at-Tirmidhi',
            thanksRole: 'Remerciements',
            thanksText: 'Merci à toi d’avoir accompagné Othmân jusqu’au sommet, et merci à toutes les familles, parents et joueurs qui soutiennent NOUR. La plus belle suite commence maintenant, dans la vraie vie.',
            toBeContinued: 'À suivre… De nouveaux chapitres sont déjà en préparation.',
            alhamdulillah: 'الْحَمْدُ لِلَّهِ',
            finalCardTitle: 'Victoire — Saison 1 Terminée !',
            finalCardSub: 'Bravo ! Tu as achevé les 5 chapitres de NOUR. Rejoue un chapitre pour explorer d’autres choix, améliorer ton score XP et grimper dans les classements — de nouveaux chapitres arrivent bientôt !',
            openMap: 'Retourner sur la Carte',
            replayCh5: 'Rejouer le Chapitre 5',
            chooseChapter: 'Rejouer un chapitre au choix',
            quitToMenu: 'Menu Principal / Quitter'
          };

    return (
      <div
        dir={isRtl ? 'rtl' : 'ltr'}
        className="absolute inset-0 z-50 bg-[#07060b] text-[#f6ecd7] overflow-hidden select-none flex flex-col animate-in fade-in duration-700"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 25%, rgba(217, 124, 39, 0.16) 0%, rgba(7, 6, 11, 0.92) 65%, #050408 100%)'
          }}
        />

        {creditsPhase === 'rolling' ? (
          <>
            <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 pt-3 pb-1.5 shrink-0">
              <span className="text-[10px] sm:text-xs font-cinzel tracking-[0.22em] uppercase text-[#e6b667]/80">
                ✦ {finaleText.badge} ✦
              </span>
              <button
                onClick={() => {
                  soundManager.playSelect();
                  setCreditsPhase('finished');
                }}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#d97c27] text-[#f6ecd7] border border-[#e6b667]/40 text-xs font-cinzel font-bold tracking-wider uppercase transition-all cursor-pointer backdrop-blur-xs"
              >
                <span>{finaleText.skipCredits}</span>
                <FastForward className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Split-Screen Cinema Layout: Left = Journey Montage (Video/Images), Right = Rolling Credits */}
            <div className="relative z-10 flex-1 overflow-hidden flex flex-col md:flex-row">
              {/* LEFT PANEL (Top on mobile): Animated Journey Video & Illustrations */}
              <div className="w-full md:w-[46%] lg:w-[48%] h-[30vh] md:h-full shrink-0 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative z-20">
                <div className="w-full max-w-lg aspect-video rounded-2xl overflow-hidden border-2 border-[#e6b667]/45 shadow-[0_0_40px_rgba(217,124,39,0.25)] relative bg-black">
                  {FINALE_MONTAGE.map((media, idx) => {
                    const isActive = idx === finaleSlideIdx;
                    return (
                      <div
                        key={media.src}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                          isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                      >
                        {media.type === 'video' ? (
                          <video
                            src={media.src}
                            poster={media.poster}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <img
                            src={media.src}
                            alt={media.caption}
                            className={`w-full h-full object-cover transition-transform duration-[6000ms] ease-out ${
                              isActive ? 'scale-105' : 'scale-100'
                            }`}
                          />
                        )}
                      </div>
                    );
                  })}
                  {/* Subtle golden bottom caption bar */}
                  <div
                    className="absolute inset-x-0 bottom-0 px-3.5 py-2 flex items-center justify-between"
                    style={{ background: 'linear-gradient(to top, rgba(7,6,11,0.92) 0%, rgba(7,6,11,0.55) 60%, transparent 100%)' }}
                  >
                    <span className="text-[11px] sm:text-xs font-cinzel font-bold text-[#f8d78e] tracking-wide truncate">
                      {FINALE_MONTAGE[finaleSlideIdx]?.caption}
                    </span>
                    <div className="flex items-center gap-1 shrink-0 ml-2">
                      {FINALE_MONTAGE.map((_, idx) => (
                        <span
                          key={idx}
                          className={`h-1.5 rounded-full transition-all duration-300 ${
                            idx === finaleSlideIdx ? 'w-4 bg-[#f8d78e]' : 'w-1.5 bg-white/30'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL (Bottom on mobile): Black Scrolling Credits */}
              <div className="relative flex-1 overflow-hidden flex justify-center px-5 sm:px-8 border-t md:border-t-0 md:border-l border-[#e6b667]/15">
                <div
                  className="absolute inset-x-0 top-0 h-16 z-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to bottom, #07060b 15%, transparent 100%)' }}
                />
                <div
                  className="absolute inset-x-0 bottom-0 h-20 z-20 pointer-events-none"
                  style={{ background: 'linear-gradient(to top, #07060b 20%, transparent 100%)' }}
                />
                <div
                  key={creditsRunKey}
                  className="nour-credits-roll w-full max-w-lg flex flex-col items-center text-center gap-10 pb-20"
                >
                <div className="flex flex-col items-center gap-3 pt-4">
                  <span className="text-xs font-cinzel font-bold tracking-[0.3em] uppercase text-[#e6b667]">
                    ✦ {finaleText.badge} ✦
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-cinzel font-black tracking-wider text-[#f8d78e] drop-shadow-[0_0_24px_rgba(245,158,11,0.45)]">
                    {finaleText.mainTitle}
                  </h1>
                  <div className="w-28 h-[2px] bg-gradient-to-r from-transparent via-[#e6b667] to-transparent my-1" />
                  <p className="text-lg sm:text-xl font-cinzel font-bold text-white">
                    {finaleText.victoryHeading}
                  </p>
                  <p className="text-sm sm:text-base text-[#e6d7bd]/90 max-w-md leading-relaxed">
                    {finaleText.victorySub}
                  </p>
                </div>

                <div className="w-full flex flex-col items-center gap-4">
                  <span className="text-xs font-cinzel font-bold tracking-[0.25em] uppercase text-[#e6b667]">
                    — {finaleText.journeyTitle} —
                  </span>
                  <div className="w-full flex flex-col gap-4">
                    {finaleText.chapters.map((ch) => (
                      <div
                        key={ch.num}
                        className="px-4 py-3 rounded-2xl bg-white/[0.04] border border-[#e6b667]/20 flex flex-col items-center gap-1"
                      >
                        <span className="text-[11px] font-cinzel font-bold uppercase tracking-widest text-[#e6b667]">
                          {ch.num} • {ch.title}
                        </span>
                        <p className="text-xs sm:text-sm text-[#e6d7bd]/85 leading-relaxed">
                          {ch.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-3">
                  <span className="text-xs font-cinzel font-bold tracking-[0.25em] uppercase text-[#e6b667]">
                    — {finaleText.statsTitle} —
                  </span>
                  <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                    <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center">
                      <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#e6b667]/85">
                        {finaleText.xpLabel}
                      </span>
                      <span className="text-2xl font-cinzel font-black text-[#f8d78e] mt-1">
                        {xpTotal} XP
                      </span>
                    </div>
                    <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center">
                      <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#e6b667]/85">
                        {finaleText.rankLabel}
                      </span>
                      <span className="text-sm sm:text-base font-cinzel font-black text-[#86efac] mt-1.5">
                        {personality.title}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex flex-col items-center gap-6 pt-2">
                  <span className="text-xs font-cinzel font-bold tracking-[0.25em] uppercase text-[#e6b667]">
                    ✦ {finaleText.creditsTitle} ✦
                  </span>

                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#e6b667]/80">
                      {finaleText.creatorRole}
                    </span>
                    <span className="text-base sm:text-lg font-cinzel font-bold text-white">
                      {finaleText.creatorName}
                    </span>
                  </div>

                  <div className="flex flex-col items-center gap-1 max-w-md">
                    <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#e6b667]/80">
                      {finaleText.castRole}
                    </span>
                    <p className="text-xs sm:text-sm text-[#e6d7bd]/90 leading-relaxed">
                      {finaleText.castNames}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1 max-w-md">
                    <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#e6b667]/80">
                      {finaleText.sourcesRole}
                    </span>
                    <p className="text-xs sm:text-sm text-[#e6d7bd]/90 leading-relaxed">
                      {finaleText.sourcesNames}
                    </p>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 max-w-md pt-2">
                    <span className="text-[10px] font-cinzel uppercase tracking-[0.2em] text-[#e6b667]/80">
                      {finaleText.thanksRole}
                    </span>
                    <p className="text-sm text-[#f6ecd7]/95 italic leading-relaxed">
                      « {finaleText.thanksText} »
                    </p>
                  </div>

                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#e6b667]/70 to-transparent my-2" />

                  <p className="text-sm sm:text-base font-cinzel font-bold text-[#f8d78e] tracking-wide">
                    {finaleText.toBeContinued}
                  </p>

                  <span className="font-amiri text-3xl sm:text-4xl text-[#f8d78e] drop-shadow-[0_0_16px_rgba(245,158,11,0.4)] pt-2">
                    {finaleText.alhamdulillah}
                  </span>
                </div>
              </div>
            </div>
            </div>
          </>
        ) : (
          <div className="relative z-20 flex-1 flex items-center justify-center p-5 animate-in fade-in zoom-in-95 duration-500">
            <div className="w-full max-w-md rounded-3xl bg-[#12101a]/95 border-2 border-[#e6b667]/50 shadow-[0_0_50px_rgba(217,124,39,0.25)] p-6 sm:p-8 flex flex-col items-center text-center gap-5">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#f8d78e] to-[#d97c27] flex items-center justify-center shadow-[0_0_24px_rgba(245,158,11,0.5)]">
                <Sparkles className="w-8 h-8 text-[#1a0f07]" />
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.28em] uppercase text-[#e6b667]">
                  ✦ {finaleText.badge} ✦
                </span>
                <h2 className="text-xl sm:text-2xl font-cinzel font-black text-white">
                  {finaleText.finalCardTitle}
                </h2>
                <p className="text-xs sm:text-sm text-[#e6d7bd]/85 leading-relaxed mt-1">
                  {finaleText.finalCardSub}
                </p>
              </div>

              <div className="w-full grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center">
                  <span className="text-[10px] font-cinzel uppercase text-[#e6b667]/85">
                    {finaleText.xpLabel}
                  </span>
                  <span className="text-lg sm:text-xl font-cinzel font-black text-[#f8d78e]">
                    {xpTotal} XP
                  </span>
                </div>
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-cinzel uppercase text-[#e6b667]/85">
                    {finaleText.rankLabel}
                  </span>
                  <span className="text-xs sm:text-sm font-cinzel font-black text-[#86efac] mt-0.5">
                    {personality.title}
                  </span>
                </div>
              </div>

              <div className="w-full flex flex-col gap-2.5 pt-1">
                {onContinueAdventure && (
                  <button
                    onClick={() => {
                      soundManager.playSelect();
                      onContinueAdventure();
                    }}
                    className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#d97c27] to-[#e69138] hover:from-[#e08935] hover:to-[#ee9f49] text-[#1a0f07] font-cinzel font-black text-sm uppercase tracking-wider shadow-[0_4px_18px_rgba(217,124,39,0.45)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
                  >
                    <span>{finaleText.openMap}</span>
                    <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
                  </button>
                )}

                {onSelectChapter && (
                  <div className="w-full flex flex-col gap-1.5 pt-1">
                    <span className="text-[10px] font-cinzel font-bold uppercase tracking-widest text-[#e6b667]/85">
                      {finaleText.chooseChapter}
                    </span>
                    <div className="grid grid-cols-5 gap-1.5">
                      {[1, 2, 3, 4, 5].map((ch) => (
                        <button
                          key={ch}
                          onClick={() => {
                            soundManager.playSelect();
                            onSelectChapter(ch);
                          }}
                          className="py-2 rounded-xl bg-white/10 hover:bg-[#d97c27] hover:text-[#1a0f07] text-[#f6ecd7] border border-[#e6b667]/35 font-cinzel font-black text-xs transition-all cursor-pointer active:scale-95"
                        >
                          {language === 'ar' ? `ف${ch}` : `Ch.${ch}`}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      soundManager.playSelect();
                      setCreditsRunKey((k) => k + 1);
                      setCreditsPhase('rolling');
                    }}
                    className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6ecd7] border border-[#e6b667]/30 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{finaleText.replayCredits}</span>
                  </button>

                  {onReturnToMenu ? (
                    <button
                      onClick={() => {
                        soundManager.playSelect();
                        onReturnToMenu();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-red-900/50 text-[#f6ecd7] border border-[#e6b667]/30 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <span>{finaleText.quitToMenu}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        soundManager.playSelect();
                        onReplay();
                      }}
                      className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6ecd7] border border-[#e6b667]/30 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{finaleText.replayCh5}</span>
                    </button>
                  )}
                </div>

                {onOpenFeedback && (
                  <button
                    onClick={() => {
                      soundManager.playSelect();
                      onOpenFeedback();
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-transparent hover:bg-white/5 text-[#e6b667] border border-[#e6b667]/30 font-cinzel font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
                  >
                    {endLabels.feedback}
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // 🎬 FIN DE CHAPITRE CINÉMATOGRAPHIQUE SUR FOND NOIR (CHAPITRES 1 À 4 — sans le montage vidéo réservé au Grand Final Ch. 5)
  const chapterSummaryMap: Record<number, { fr: { title: string; lesson: string }; en: { title: string; lesson: string }; ar: { title: string; lesson: string } }> = {
    1: {
      fr: {
        title: 'Chapitre 1 • Vaincre la Solitude',
        lesson: 'Othmân a franchi le seuil de ses doutes grâce à l’Istiʿādhah et ouvert son cœur aux autres par le Taʿāruf.'
      },
      en: {
        title: 'Chapter 1 • Overcoming Loneliness',
        lesson: 'Othman stepped past his doubts through Istiʿādhah and opened his heart to others through Taʿāruf.'
      },
      ar: {
        title: 'الفصل ١ • التغلّب على العزلة',
        lesson: 'تجاوز عثمان تردّده بالاستعاذة بالله وانفتح على الآخرين بالتعارف وحسن الخلق.'
      }
    },
    2: {
      fr: {
        title: 'Chapitre 2 • Le Chemin du Hilm',
        lesson: 'Face à l’injustice du marché, Othmân a maîtrisé sa colère et répondu au mal par la douceur et le pardon.'
      },
      en: {
        title: 'Chapter 2 • The Path of Hilm',
        lesson: 'Facing injustice at the market, Othman mastered his anger and answered harshness with gentleness and forgiveness.'
      },
      ar: {
        title: 'الفصل ٢ • طريق الحِلم',
        lesson: 'أمام الظلم في السوق، ضبط عثمان غضبه وقابل الإساءة بالرفق والعفو.'
      }
    },
    3: {
      fr: {
        title: 'Chapitre 3 • Le Chemin du Tawakkul',
        lesson: 'Dans la fragilité de la maladie, Othmân a uni les soins, la patience et la confiance sincère en Allah.'
      },
      en: {
        title: 'Chapter 3 • The Path of Tawakkul',
        lesson: 'Through the fragility of illness, Othman combined sound care, patience, and sincere trust in Allah.'
      },
      ar: {
        title: 'الفصل ٣ • طريق التوكّل',
        lesson: 'في ضعف المرض، جمع عثمان بين الأخذ بالأسباب والعلاج والاعتماد الصادق على الله.'
      }
    },
    4: {
      fr: {
        title: 'Chapitre 4 • Ce que tu as encore',
        lesson: 'Othmân a redécouvert la valeur inestimable de ses parents et réparé sa parole par le Birr al-Wālidayn.'
      },
      en: {
        title: 'Chapter 4 • What You Still Have',
        lesson: 'Othman rediscovered the priceless blessing of his parents and repaired his words through Birr al-Wālidayn.'
      },
      ar: {
        title: 'الفصل ٤ • ما زال بين يديك',
        lesson: 'أدرك عثمان قيمة والديه العظيمة وأصلح قوله وعمله ببرّ الوالدين والامتنان.'
      }
    }
  };

  const chInfo = (chapterSummaryMap[chapterNumber] || chapterSummaryMap[1])[language === 'ar' ? 'ar' : language === 'en' ? 'en' : 'fr'];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="absolute inset-0 z-50 bg-[#07060b] text-[#f6ecd7] overflow-hidden select-none flex flex-col animate-in fade-in duration-500"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 25%, rgba(217, 124, 39, 0.16) 0%, rgba(7, 6, 11, 0.94) 68%, #050408 100%)'
        }}
      />

      {chapterRollPhase === 'rolling' ? (
        <>
          {/* Top Bar with Skip button */}
          <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 pt-3 pb-1.5 shrink-0">
            <span className="text-[10px] sm:text-xs font-cinzel tracking-[0.22em] uppercase text-[#e6b667]/80">
              ✦ {language === 'ar' ? 'تَمَّ إِتْمَامُ الْفَصْلِ' : language === 'en' ? 'CHAPTER ACCOMPLISHED' : 'CHAPITRE ACCOMPLI'} ✦
            </span>
            <button
              onClick={() => {
                soundManager.playSelect();
                setChapterRollPhase('card');
              }}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-[#d97c27] text-[#f6ecd7] border border-[#e6b667]/40 text-xs font-cinzel font-bold tracking-wider uppercase transition-all cursor-pointer backdrop-blur-xs"
            >
              <span>{endLabels.skip}</span>
              <FastForward className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Top & bottom cinema fade masks */}
          <div
            className="absolute inset-x-0 top-12 h-16 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(to bottom, #07060b 15%, transparent 100%)' }}
          />
          <div
            className="absolute inset-x-0 bottom-0 h-20 z-20 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #07060b 20%, transparent 100%)' }}
          />

          {/* Pure Black-Screen Rolling Chapter Summary & Thanks */}
          <div className="relative z-10 flex-1 overflow-hidden flex justify-center px-5 sm:px-8">
            <div
              key={chapterRollKey}
              className="nour-chapter-roll w-full max-w-lg flex flex-col items-center text-center gap-8 pb-20"
            >
              <div className="flex flex-col items-center gap-2.5 pt-2">
                <span className="text-xs font-cinzel font-bold tracking-[0.28em] uppercase text-[#e6b667]">
                  ✦ {language === 'ar' ? 'تَمَّ إِتْمَامُ الْفَصْلِ' : language === 'en' ? 'CHAPTER ACCOMPLISHED' : 'CHAPITRE ACCOMPLI'} ✦
                </span>
                <h1 className="text-2xl sm:text-3xl font-cinzel font-black tracking-wide text-[#f8d78e] drop-shadow-[0_0_20px_rgba(245,158,11,0.4)]">
                  {chInfo.title}
                </h1>
                <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#e6b667] to-transparent my-1" />
                <p className="text-sm sm:text-base text-[#e6d7bd]/95 max-w-md leading-relaxed">
                  {chInfo.lesson}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#e6b667]/85">
                    {language === 'ar' ? 'نقاط الخبرة' : language === 'en' ? 'Traveler Score' : 'Score du Voyageur'}
                  </span>
                  <span className="text-2xl font-cinzel font-black text-[#f8d78e] mt-1">
                    {xpTotal} XP
                  </span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#e6b667]/85">
                    {language === 'ar' ? 'الطبع المكتسب' : language === 'en' ? 'Character Forged' : 'Tempérament'}
                  </span>
                  <span className="text-sm font-cinzel font-black text-[#86efac] mt-1">
                    {personality.title}
                  </span>
                </div>
              </div>

              <div className="flex flex-col items-center gap-2 max-w-md">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.22em] text-[#e6b667]/80">
                  {language === 'ar' ? 'شكر وتقدير' : language === 'en' ? 'Thank You' : 'Remerciements'}
                </span>
                <p className="text-sm text-[#f6ecd7]/95 italic leading-relaxed">
                  {language === 'ar'
                    ? '« أحسنت! كلّ خيارٍ صادقٍ يُنمّي قلبك. شكراً لمرافقة عثمان في هذه المرحلة من الرحلة. »'
                    : language === 'en'
                    ? '« Well done! Every sincere choice strengthens your heart. Thank you for walking alongside Othman through this chapter. »'
                    : '« Bravo ! Chaque choix sincère fait grandir ton cœur. Merci d’avoir accompagné Othmân tout au long de ce chapitre. »'}
                </p>
              </div>

              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#e6b667]/70 to-transparent" />

              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] font-cinzel uppercase tracking-[0.22em] text-[#e6b667]/80">
                  {language === 'ar' ? 'المرحلة القادمة' : language === 'en' ? 'Up Next' : 'À suivre'}
                </span>
                <p className="text-base sm:text-lg font-cinzel font-bold text-[#f8d78e]">
                  {nextChapterTitle}
                </p>
              </div>

              <span className="font-amiri text-3xl text-[#f8d78e] drop-shadow-[0_0_16px_rgba(245,158,11,0.4)]">
                الْحَمْدُ لِلَّهِ
              </span>
            </div>
          </div>
        </>
      ) : (
        <div className="relative z-10 flex-1 overflow-y-auto flex items-center justify-center p-4 sm:p-6">
          <div className="w-full max-w-md rounded-3xl bg-[#12101a]/95 border-2 border-[#e6b667]/45 shadow-[0_0_50px_rgba(217,124,39,0.22)] p-5 sm:p-7 flex flex-col items-center text-center gap-4 my-auto animate-in zoom-in-95 duration-400">
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#f8d78e] to-[#d97c27] flex items-center justify-center shadow-[0_0_22px_rgba(245,158,11,0.45)]">
          <Sparkles className="w-7 h-7 text-[#1a0f07]" />
        </div>

        <div className="flex flex-col items-center gap-1.5">
          <span className="text-[10px] sm:text-xs font-cinzel font-bold tracking-[0.26em] uppercase text-[#e6b667]">
            ✦ {language === 'ar' ? 'تَمَّ إِتْمَامُ الْفَصْلِ' : language === 'en' ? 'CHAPTER ACCOMPLISHED' : 'CHAPITRE ACCOMPLI'} ✦
          </span>
          <h1 className="text-lg sm:text-2xl font-cinzel font-black text-[#f8d78e] leading-tight">
            {chInfo.title}
          </h1>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#e6b667]/70 to-transparent my-0.5" />
          <p className="text-xs sm:text-sm text-[#e6d7bd]/90 leading-relaxed max-w-sm">
            {chInfo.lesson}
          </p>
        </div>

        {/* XP & Forged Character */}
        <div className="w-full grid grid-cols-2 gap-2.5">
          <div className="p-3 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center">
            <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#e6b667]/85">
              {language === 'ar' ? 'نقاط الخبرة' : language === 'en' ? 'Traveler Score' : 'Score du Voyageur'}
            </span>
            <span className="text-lg sm:text-xl font-cinzel font-black text-[#f8d78e] mt-0.5">
              {xpTotal} XP
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.05] border border-[#e6b667]/30 flex flex-col items-center justify-center">
            <span className="text-[10px] font-cinzel uppercase tracking-wider text-[#e6b667]/85">
              {language === 'ar' ? 'الطبع المكتسب' : language === 'en' ? 'Character Forged' : 'Tempérament'}
            </span>
            <span className="text-xs sm:text-sm font-cinzel font-black text-[#86efac] mt-0.5">
              {personality.title}
            </span>
          </div>
        </div>

        {/* Next Chapter Teaser */}
        <div className="w-full px-3.5 py-2.5 rounded-2xl bg-white/[0.04] border border-[#e6b667]/20 flex flex-col items-center gap-0.5">
          <span className="text-[10px] font-cinzel uppercase tracking-widest text-[#e6b667]/80">
            {language === 'ar' ? 'المرحلة القادمة' : language === 'en' ? 'Up Next' : 'À suivre'}
          </span>
          <span className="text-xs sm:text-sm font-cinzel font-bold text-white">
            {nextChapterTitle}
          </span>
        </div>

        {saveFeedback && (
          <div className="w-full py-1.5 px-3 rounded-xl bg-emerald-700/90 text-white text-xs font-bold font-cinzel flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>{saveFeedback}</span>
          </div>
        )}

        {/* Actions */}
        <div className="w-full flex flex-col gap-2 pt-1">
          {onContinueAdventure && (
            <button
              onClick={() => {
                soundManager.playSelect();
                onContinueAdventure();
              }}
              className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-[#d97c27] to-[#e69138] hover:from-[#e08935] hover:to-[#ee9f49] text-[#1a0f07] font-cinzel font-black text-xs sm:text-sm uppercase tracking-wider shadow-[0_4px_18px_rgba(217,124,39,0.45)] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-[#1a0f07]" />
              <span>{endLabels.continueTo(chapterNumber + 1)}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                soundManager.playSelect();
                onReplay();
              }}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6ecd7] border border-[#e6b667]/30 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{endLabels.replay}</span>
            </button>

            {onReturnToMenu ? (
              <button
                onClick={() => {
                  soundManager.playSelect();
                  onReturnToMenu();
                }}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6ecd7] border border-[#e6b667]/30 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <span>{language === 'ar' ? 'القائمة الرئيسية' : language === 'en' ? 'Main Menu' : 'Menu Principal'}</span>
              </button>
            ) : onSaveAndExit ? (
              <button
                onClick={() => {
                  soundManager.playXpHarvest();
                  setSaveFeedback(endLabels.savedMsg);
                  setTimeout(() => onSaveAndExit(), 600);
                }}
                className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 text-[#f6ecd7] border border-[#e6b667]/30 font-cinzel font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{endLabels.savePause}</span>
              </button>
            ) : null}
          </div>
        </div>
      </div>
        </div>
      )}
    </div>
  );
};
