'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useI18n, useChangeLocale, useCurrentLocale } from '@/shared/locales/clients';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericButton from '@components/ui/button/GenericButton';
import SelectInput from '@components/ui/inputs/select/SelectInput';

import { LanguageType, Language } from "@/domain/entities/setting-types";
import { postUser } from '@/domain/usecases/auth-slice';
import { useDispatch } from '@/store/store';

import styles from './login-form.module.scss';

export default function LoginForm() {
  /* Static Data */
  const router = useRouter();
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const t = useI18n();
  const optionsLanguages: Language[] = [
    { value: 'fr', label: t('language.fr'), },
    { value: 'en', label: t('language.en'), },
    { value: 'es', label: t('language.es'), },
  ];
  const dispatch = useDispatch();

  /* Methods */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (connexionUrl === '') {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
    await dispatch(postUser(connexionUrl)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        router.push(`/dashboard`)
      }
    });
  };
  
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value
    if (value === "fr" || value === "en" || value === "es") {
      setLanguage(value);
      changeLocale(value);
    } else {
      console.error("Invalid language value");
    }
  };

  /* Local Data */
  const [language, setLanguage] = useState<LanguageType>(locale);
  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [connexionUrl, setConnexionUrl] = useState<string>('');
  const [error, setError] = useState<string>('');
  const isSubmitButtonDisabled = connexionUrl === '';

  return (
    <div className={styles.container}>
      <h2>{t('loginForm.login')}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.formInput}>
            <SelectInput
              label={t('loginForm.selected')}
              value={language}
              options={optionsLanguages}
              onChange={handleLanguageChange}
            />
          </div>
          {/* <div className={styles.formInput}>
            <GenericInput
              type="text"
              label={t('loginForm.userName')}
              value={userName}
              placeholder={t('loginForm.userName')}
              error={error}
              onChange={(event) => setUserName(event.target.value)}
            />
          </div> */}
          <div className={styles.formInput}>
            <GenericInput
              type="text"
              label={t('loginForm.connexionUrl')}
              value={connexionUrl}
              placeholder={t('loginForm.connexionUrl')}
              error={error}
              onChange={(event) => setConnexionUrl(event.target.value)}
            />
          </div>
          {/* <div className={styles.formInput}>
            <GenericInput
              type="password"
              label={t('loginForm.passWord')}
              value={passWord}
              placeholder={t('loginForm.passWord')}
              error={error}
              onChange={(event) => setPassWord(event.target.value)}
            />
          </div> */}
        </div>
        <div className={styles.formButton}>
          <GenericButton center disabled={isSubmitButtonDisabled} type="submit">
            {t('loginForm.login')}
          </GenericButton>
        </div>
      </form>
    </div>
  );
}
