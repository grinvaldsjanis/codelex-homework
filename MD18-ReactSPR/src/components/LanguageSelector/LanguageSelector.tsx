import React from 'react';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import style from "./LanguageSelector.module.scss";

const LanguageSelector = () => {

  const {t} = useTranslation();

  const changeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const language = event.target.value;
    i18next.changeLanguage(language);
  };

  return (
    <div >
      <select className={style.select} id="language" onChange={changeLanguage}>
        <option value="en">{t('english')}</option>
        <option value="lv">{t('latvian')}</option>
        <option value="ru">{t('russian')}</option>
      </select>
    </div>
  );
};

export default LanguageSelector;