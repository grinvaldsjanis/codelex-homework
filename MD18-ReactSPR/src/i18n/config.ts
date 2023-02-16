import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationEn from './en/translationEn.json';
import translationLv from './lv/translationLv.json';
import translationRu from './ru/translationRu.json';

export const resources = {
  en: {
    translation: translationEn
  },
  lv: {
    translation: translationLv,
  },
  ru: {
    translation: translationRu,
  }
};

i18next.use(initReactI18next).init({
  lng: 'en', // if you're using a language detector, do not define the lng option
  debug: true,
  resources,
});