import { useState, useEffect, useCallback } from 'react';

type Language = 'fr' | 'ar';
type TranslationKeys = Record<string, any>;

// Import translations
import frTranslations from '../i18n/fr.json';
import arTranslations from '../i18n/ar.json';

const translations: Record<Language, TranslationKeys> = {
  fr: frTranslations,
  ar: arTranslations,
};

const STORAGE_KEY = 'all4u-language';
const DEFAULT_LANGUAGE: Language = 'fr';

export function useI18n() {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY) as Language;
      return stored && ['fr', 'ar'].includes(stored) ? stored : DEFAULT_LANGUAGE;
    }
    return DEFAULT_LANGUAGE;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, currentLanguage);
    
    // Update document direction for Arabic
    document.documentElement.dir = currentLanguage === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const changeLanguage = useCallback((language: Language) => {
    setCurrentLanguage(language);
  }, []);

  const t = useCallback((key: string, fallback?: string): string => {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to French if key not found in current language
        if (currentLanguage !== 'fr') {
          let frValue = translations.fr;
          for (const fk of keys) {
            if (frValue && typeof frValue === 'object' && fk in frValue) {
              frValue = frValue[fk];
            } else {
              return fallback || key;
            }
          }
          return typeof frValue === 'string' ? frValue : fallback || key;
        }
        return fallback || key;
      }
    }
    
    return typeof value === 'string' ? value : fallback || key;
  }, [currentLanguage]);

  const isRTL = currentLanguage === 'ar';

  return {
    currentLanguage,
    changeLanguage,
    t,
    isRTL,
    languages: [
      { code: 'fr', name: 'Français', flag: '🇫🇷' },
      { code: 'ar', name: 'العربية', flag: '🇲🇦' },
    ] as const,
  };
}

export default useI18n;
