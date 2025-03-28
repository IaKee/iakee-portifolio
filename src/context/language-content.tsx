'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import messagesEn from '@/messages/en.json';
import messagesPt from '@/messages/ptbr.json';

const messages = { en: messagesEn, ptbr: messagesPt };

export type Language = 'en' | 'ptbr';

interface LanguageContextType {
  locale: Language;
  messages: { [key: string]: string };
  setLocale: (locale: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Language>('en');
  const [messagesData, setMessagesData] = useState<{ [key: string]: any }>(messagesEn);

  useEffect(() => {
    const savedLocale = (Cookies.get('locale') as Language) || 'en';
    setLocaleState(savedLocale);
    setMessagesData(messages[savedLocale]);
  }, []);

  const setLocale = (newLocale: Language) => {
    Cookies.set('locale', newLocale);
    setLocaleState(newLocale);
    setMessagesData(messages[newLocale]);
  };

  const t = (key: string) => {
    return key.split('.').reduce((obj: any, k) => obj?.[k], messagesData) || key
  }

  return (
    <LanguageContext.Provider value={{ locale, messages: messagesData, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) 
    throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};