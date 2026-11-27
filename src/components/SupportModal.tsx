import React, { useState } from 'react';
import {
  X,
  Heart,
  HelpCircle,
  ChevronDown,
  Mail,
  ShieldCheck,
  ExternalLink,
  MessageCircleHeart
} from 'lucide-react';
import { soundManager } from '../utils/audio';
import { useLanguage } from '../context/LanguageContext';

interface SupportModalProps {
  onClose: () => void;
  onUnlocked?: () => void;
  reason?: 'chapter_end' | 'general' | 'profile';
}

type AboutTab = 'dev' | 'faq' | 'support';

export const SupportModal: React.FC<SupportModalProps> = ({ onClose }) => {
  const { language, isRtl, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<AboutTab>('dev');
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(0);

  const labels =
    language === 'ar'
      ? {
          title: 'حَوْلَ نُور',
          tabDev: 'كَلِمَةُ الْمُطَوِّرِ',
          tabFaq: 'الْأَسْئِلَةُ',
          tabSupport: 'الدَّعْمُ',
          contactTitle: 'التَّوَاصُلُ وَالْخُصُوصِيَّةُ',
          contactDesc: 'لِأَيِّ سُؤَالٍ أَوِ اقْتِرَاحٍ أَوْ مُلَاحَظَةٍ، يُمْكِنُكَ التَّوَاصُلُ مَعَ الْمُطَوِّرِ مُبَاشَرَةً عَبْرَ الْبَرِيدِ الْإِلِكْتْرُونِيِّ.',
          emailLabel: 'إِرْسَالُ رِسَالَةٍ إِلَى الْمُطَوِّرِ',
          privacyLabel: 'سِيَاسَةُ الْخُصُوصِيَّةِ',
          close: 'إِغْلَاقٌ',
        }
      : language === 'en'
        ? {
            title: 'About NOUR',
            tabDev: 'Developer',
            tabFaq: 'FAQ',
            tabSupport: 'Support',
            contactTitle: 'Contact & Privacy',
            contactDesc: 'Have a question, suggestion, or feedback? You can reach the developer directly by email.',
            emailLabel: 'Email the Developer',
            privacyLabel: 'Privacy Policy',
            close: 'Close',
          }
        : {
            title: 'À propos de NOUR',
            tabDev: 'Développeur',
            tabFaq: 'FAQ',
            tabSupport: 'Support',
            contactTitle: 'Contact & Confidentialité',
            contactDesc: 'Pour toute question, suggestion ou remarque sur le jeu, tu peux écrire directement au développeur par email.',
            emailLabel: 'Écrire au développeur',
            privacyLabel: 'Politique de confidentialité',
            close: 'Fermer',
          };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-0 z-[200] flex items-center justify-center p-2.5 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 select-none"
    >
      <div className="bg-[#fbf7ee] border-3 border-[#3a2312] rounded-3xl w-full max-w-xl shadow-[0_14px_40px_rgba(0,0,0,0.85)] flex flex-col overflow-hidden max-h-[88vh] relative">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#f3ebd9] border-b-2 border-[#3a2312] shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gradient-to-br from-[#d97c27] to-[#b45309] text-white border border-[#3a2312] shadow-xs">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <h2 className="text-sm sm:text-base font-black text-[#3a2312] font-cinzel leading-tight">
              {labels.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => {
              soundManager.playSelect();
              onClose();
            }}
            aria-label={labels.close}
            className="p-1.5 rounded-xl bg-[#ebdfc8] hover:bg-[#d9c7ab] text-[#3a2312] transition-colors cursor-pointer border border-[#3a2312]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* 3-Tab Switcher Bar: Mot du développeur | FAQ | Support */}
        <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#ebdfc8] border-b-2 border-[#3a2312]/30 shrink-0">
          {(
            [
              { id: 'dev' as const, label: labels.tabDev, icon: MessageCircleHeart },
              { id: 'faq' as const, label: labels.tabFaq, icon: HelpCircle },
              { id: 'support' as const, label: labels.tabSupport, icon: Mail },
            ]
          ).map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  soundManager.playSelect();
                  setActiveTab(tab.id);
                }}
                className={`py-2 px-2 rounded-xl font-cinzel font-black text-[11px] sm:text-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all ${
                  active
                    ? 'bg-[#3a2312] text-amber-200 shadow-sm'
                    : 'bg-[#fbf7ee]/80 hover:bg-[#fbf7ee] text-[#5c3a21] border border-[#3a2312]/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Tab Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-5">
          {/* TAB 1 : MOT DU DÉVELOPPEUR */}
          {activeTab === 'dev' && (
            <section className="rounded-2xl bg-[#f3ebd9] border-2 border-[#d4a24c] p-4 flex flex-col gap-3 shadow-xs animate-in fade-in duration-150">
              <div className={`space-y-2.5 text-xs sm:text-sm text-[#3a2312] leading-relaxed ${isRtl ? 'font-amiri text-base leading-loose' : 'font-serif'}`}>
                <p className="font-bold text-[#8c5a2b]">
                  {t.creatorLetter.greeting} — {t.creatorLetter.dearParents}
                </p>
                <p>{t.creatorLetter.p1}</p>
                <p>{t.creatorLetter.p2}</p>

                <div className="p-3 rounded-xl bg-[#fbf7ee] border-s-4 border-[#d97c27] text-[#3a2312] italic text-xs sm:text-sm">
                  « {t.creatorLetter.calloutQuote} »
                </div>

                <p>{t.creatorLetter.p3}</p>
                <p>{t.creatorLetter.p4}</p>
                <p>{t.creatorLetter.p5}</p>
                <p>{t.creatorLetter.p6}</p>
              </div>
            </section>
          )}

          {/* TAB 2 : FAQ INTERACTIVE */}
          {activeTab === 'faq' && (
            <section className="flex flex-col gap-2 animate-in fade-in duration-150">
              {t.faq.items.map((faq, idx) => {
                const isOpen = openFaqIdx === idx;
                return (
                  <div
                    key={idx}
                    className="rounded-2xl bg-[#f3ebd9] border-2 border-[#3a2312]/30 overflow-hidden"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        soundManager.playSelect();
                        setOpenFaqIdx(isOpen ? null : idx);
                      }}
                      className="w-full px-3.5 py-3 flex items-center justify-between gap-3 text-start cursor-pointer hover:bg-[#ebdfc8]/70 transition-colors"
                      aria-expanded={isOpen}
                    >
                      <span className={`font-bold text-xs sm:text-sm text-[#3a2312] leading-snug ${isRtl ? 'font-amiri text-base' : 'font-cinzel'}`}>
                        {faq.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-[#b45309] shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className={`px-3.5 pb-3.5 pt-1 text-xs sm:text-sm text-[#4a3525] leading-relaxed border-t border-[#3a2312]/10 bg-[#fbf7ee]/80 ${isRtl ? 'font-amiri text-base leading-loose' : ''}`}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </section>
          )}

          {/* TAB 3 : SUPPORT (EMAIL + CONFIDENTIALITÉ) */}
          {activeTab === 'support' && (
            <section className="flex flex-col gap-4 animate-in fade-in duration-150">
              <div className="rounded-2xl bg-[#f3ebd9] border-2 border-[#d4a24c] p-4 sm:p-5 text-center flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#3a2312] text-amber-300 flex items-center justify-center shadow-sm">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-black text-base text-[#3a2312]">
                  {labels.contactTitle}
                </h3>
                <p className={`text-xs sm:text-sm text-[#5c3a21] leading-relaxed max-w-sm ${isRtl ? 'font-amiri text-base leading-loose' : ''}`}>
                  {labels.contactDesc}
                </p>

                <a
                  href="mailto:elmalkidigital@gmail.com"
                  className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-[#d97c27] to-[#b45309] hover:brightness-110 text-white font-cinzel font-black text-xs sm:text-sm border-2 border-[#3a2312] shadow-[0_3px_0_#3a2312] flex items-center justify-center gap-2 transition-all"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>elmalkidigital@gmail.com</span>
                </a>

                <a
                  href="https://playnour.online/privacy.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-2xl bg-[#2d6a4f] hover:bg-[#23543e] text-white font-cinzel font-bold text-xs sm:text-sm border-2 border-[#1b4332] shadow-[0_3px_0_#1b4332] flex items-center justify-center gap-2 transition-all"
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>{labels.privacyLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80 shrink-0" />
                </a>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
