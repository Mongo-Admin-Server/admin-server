'use client';
import { useState } from 'react';
import { ChangeEvent, useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericButton from '@components/ui/button/GenericButton';
import SelectInput from '@components/ui/inputs/select/SelectInput';

import { Language } from "@/domain/entities/setting-types";
import { login, selectLoadingAuth } from '@/domain/usecases/auth-slice';
import { useDispatch, useSelector } from '@/store/store';

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

  const loadingAuth = useSelector(selectLoadingAuth);

  /* Methods */
  const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    await dispatch(login(connexionUrl)).then((result) => {
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
  const [connexionUrl, setConnexionUrl] = useState<string>('');
  const isSubmitButtonDisabled = connexionUrl === '';

  return (
    <div className={styles.container}>
      <h2>{t('login.login')}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <div className={styles.formInput}>
            <SelectInput
              label={t('login.selected')}
              value={language}
              options={optionsLanguages}
              onChange={handleLanguageChange}
            />
          </div>
          <div className={styles.formInput}>
            <GenericInput
              type="text"
              label={t('login.connexionUrl')}
              value={connexionUrl}
              placeholder={t('login.connexionUrl')}
              onChange={(event) => setConnexionUrl(event.target.value)}
            />
          </div>
        </div>
        <div className={styles.formButton}>
          <GenericButton center disabled={isSubmitButtonDisabled} type="submit">
            {loadingAuth ? t('login.loading') : t('login.login')}
          </GenericButton>
        </div>
      </form>
    </div>
  );
}
