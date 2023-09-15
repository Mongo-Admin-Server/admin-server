'use client';
import { useState } from 'react';
import { ChangeEvent, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericButton from '@components/ui/button/GenericButton';
import SelectInput from '@components/ui/inputs/select/SelectInput';

import { Language } from "@/domain/entities/setting-types";
import { postUser } from '@/domain/usecases/auth-slice';
import { useDispatch } from '@/store/store';

import styles from './login-form.module.scss';

export default function LoginForm() {
  /* Static Data */
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const t = useTranslations();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const optionsLanguages: Language[] = [
    { value: 'fr', label: t('language.fr'), },
    { value: 'en', label: t('language.en'), },
    { value: 'es', label: t('language.es'), },
  ];

  /* Methods */
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(postUser(connexionUrl)).then((result) => {
      if (result.meta.requestStatus === 'fulfilled') {
        router.push(`/dashboard`)
      }
    });
  };
  
  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const language = event.target.value;
    startTransition(() => {
      router.replace(pathname, {locale: language});
    });
    setLanguage(language);
  };

  /* Local Data */
  const [language, setLanguage] = useState<string>(locale);
  // const [userName, setUserName] = useState<string>('');
  // const [passWord, setPassWord] = useState<string>('');
  const [connexionUrl, setConnexionUrl] = useState<string>('');
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
