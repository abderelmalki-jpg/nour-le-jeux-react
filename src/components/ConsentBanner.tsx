import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { getConsent, setConsent, isConsentRequired } from '../utils/consent';
import { initPostHog } from '../utils/posthogConfig';
import { getPostHog } from '../utils/analytics';
import { enableFirebaseAnalytics } from '../firebase';

const TEXTS = {
  fr: {
    title: 'Statistiques anonymes',
    body: "Pour améliorer le jeu, nous mesurons son usage de façon anonyme (sans enregistrement d'écran). Vous choisissez.",
    accept: 'Accepter',
    refuse: 'Refuser',
    more: 'En savoir plus'
  },
  en: {
    title: 'Anonymous statistics',
    body: 'To improve the game we measure its usage anonymously (no screen recording). It is your choice.',
    accept: 'Accept',
    refuse: 'Decline',
    more: 'Learn more'
  },
  ar: {
    title: 'إحصاءات مجهولة',
    body: 'لتحسين اللعبة نقيس استخدامها بشكل مجهول (دون تسجيل الشاشة). القرار لك.',
    accept: 'أوافق',
    refuse: 'أرفض',
    more: 'المزيد'
  }
} as const;

/** Bandeau de consentement (web uniquement). Rien n'est envoyé tant que l'utilisateur n'a pas accepté. */
export const ConsentBanner: React.FC = () => {
  const { language, isRtl } = useLanguage();
  const [visible, setVisible] = useState<boolean>(() => isConsentRequired && getConsent() === 'unset');

  if (!visible) return null;

  const t = TEXTS[language as keyof typeof TEXTS] || TEXTS.fr;

  const choose = (value: 'granted' | 'denied') => {
    setConsent(value);
    try {
      const ph = getPostHog();
      if (value === 'granted') {
        initPostHog();
        ph.opt_in_capturing?.();
        enableFirebaseAnalytics();
      }
    } catch {
      // l'analytics ne doit jamais bloquer le jeu
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label={t.title}
      dir={isRtl ? 'rtl' : 'ltr'}
      className="fixed inset-x-0 bottom-0 z-[300] p-3 sm:p-4 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-w-xl rounded-2xl border-2 border-[#3a2312] bg-[#fbf7ee] p-3.5 shadow-[0_6px_0_#3a2312] text-[#3a2312]">
        <p className="text-sm font-black font-cinzel leading-tight">{t.title}</p>
        <p className="mt-1 text-xs leading-snug">
          {t.body}{' '}
          <a href="/privacy.html" className="underline font-bold" target="_blank" rel="noopener noreferrer">
            {t.more}
          </a>
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => choose('granted')}
            className="flex-1 min-h-[44px] rounded-xl bg-[#d97c27] border-2 border-[#3a2312] text-white text-sm font-black font-cinzel active:translate-y-0.5 cursor-pointer"
          >
            {t.accept}
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            className="flex-1 min-h-[44px] rounded-xl bg-[#ebdfc8] border-2 border-[#3a2312] text-sm font-black font-cinzel active:translate-y-0.5 cursor-pointer"
          >
            {t.refuse}
          </button>
        </div>
      </div>
    </div>
  );
};
