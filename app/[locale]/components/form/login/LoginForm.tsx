'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation'
import { useI18n, useChangeLocale, useCurrentLocale } from '../../../../../locales/clients';
import GenericInput from '../../ui/inputs/generic/GenericInput';
import GenericButton from '../../ui/button/GenericButton';
import SelectInput from '../../ui/inputs/select/SelectInput';
import styles from './login-form.module.scss';

type TLanguage = "fr" | "en";

export default function LoginForm() {
  /* Static Data */
  const router = useRouter();
  const locale = useCurrentLocale();
  const changeLocale = useChangeLocale();
  const t = useI18n();
  const optionsLanguages = [
    { value: 'fr', label: locale === 'fr' ? '🇫🇷 Français' : '🇫🇷 French', },
    { value: 'en', label: locale === 'fr' ? '🇬🇧 Anglais' : '🇬🇧 English', },
  ];
  /* Methods */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (userName === '' || passWord === '') {
      setError('Veuillez remplir tous les champs.');
      return;
    }
    setError('');
  
    try {
      const url = `/api/instance?userName=${encodeURIComponent(userName)}&passWord=${encodeURIComponent(passWord)}`;
      const response = await fetch(url);
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        router.push(`/dashboard`)
      } else {
        console.error('Échec de la connexion à MongoDB.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };
  
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value
    if (value === "fr" || value === "en") {
      setLanguage(value);
      changeLocale(value);
    } else {
      console.error("Invalid language value");
    }
  };
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };
  const handlePassWordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassWord(event.target.value);
  };

  /* Local Data */
  const [language, setLanguage] = useState<TLanguage>(locale);
  const [userName, setUserName] = useState<string>('');
  const [passWord, setPassWord] = useState<string>('');
  const [error, setError] = useState<string>('');
  const isSubmitButtonDisabled = userName === '' || passWord === '';

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
          <div className={styles.formInput}>
            <GenericInput
              type="text"
              label={t('loginForm.userName')}
              value={userName}
              placeholder={t('loginForm.userName')}
              error={error}
              onChange={handleUserNameChange}
            />
          </div>
          <div className={styles.formInput}>
            <GenericInput
              type="password"
              label={t('loginForm.passWord')}
              value={passWord}
              placeholder={t('loginForm.passWord')}
              error={error}
              onChange={handlePassWordChange}
            />
          </div>
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
