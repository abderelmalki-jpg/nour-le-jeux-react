import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, Translations, translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  isRtl: boolean;
}

const STORAGE_KEY = 'nour_preferred_lang';

/**
 * Default language: Arabic ('ar').
 * Priority:
 * 1. Explicit URL parameter (?lang=ar|fr|en)
 * 2. Saved localStorage preference (manual user selection)
 * 3. Default to Arabic ('ar') for all new visitors
 */
function detectInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    try {
      const urlLang = new URLSearchParams(window.location.search).get('lang')?.toLowerCase();
      if (urlLang === 'fr' || urlLang === 'en' || urlLang === 'ar') {
        return urlLang;
      }
    } catch {
      // ignore URL parsing errors
    }
  }

  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'fr' || saved === 'en' || saved === 'ar') {
      return saved;
    }
  } catch {
    // localStorage might be unavailable in some private browsing modes
  }

  return 'ar';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => detectInitialLanguage());

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    try {
      localStorage.setItem(STORAGE_KEY, newLang);
    } catch {
      // ignore storage error
    }
  };

  useEffect(() => {
    const isRtl = language === 'ar';
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    if (isRtl) {
      document.documentElement.classList.add('rtl-mode');
    } else {
      document.documentElement.classList.remove('rtl-mode');
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language] || translations.fr,
    isRtl: language === 'ar'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
