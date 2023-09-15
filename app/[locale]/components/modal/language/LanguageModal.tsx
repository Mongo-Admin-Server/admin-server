import { useTransition } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';

import GenericModal from "@components/modal/generic/GenericModal";

import { Language } from "@/domain/entities/setting-types";

import styles from "./languageModal.module.scss";

import { useDispatch } from "@/store/store";
import { setLanguage } from "@/domain/usecases/setting-slice";

interface LanguageModalProps {
  open: boolean;
  onClose: () => void;
}

const LanguageModal = ({ open, onClose }: LanguageModalProps) => {
  const router = useRouter();
  const t = useTranslations();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const languages: Language[] = [
    { value: 'fr', label: t('language.fr'), },
    { value: 'en', label: t('language.en'), },
    { value: 'es', label: t('language.es'), },
  ];

  const handleLanguageChange = (language: string) => {
    startTransition(() => {
      router.replace(pathname, {locale: language});
    });
    dispatch(setLanguage(language))
    onClose();
  };
  
  return (
    <GenericModal
      open={open}
      title={t('modal.language.title')}
      withButton={false}
      onClose={onClose}
    >
      <ul className={styles["language-list"]}>
      {languages.map((language, index) => (
        <li 
          key={index} 
          className={`${styles["language-container"]} ${language.value === locale ? styles['selected'] : ''}`}
          onClick={() => handleLanguageChange(language.value)}
        >
          {language.label}
        </li>
      ))}
      </ul>
    </GenericModal>
  );
}

export default LanguageModal;
