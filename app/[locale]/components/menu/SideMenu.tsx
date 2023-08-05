'use client';
import { useState } from 'react';
import { useI18n, useCurrentLocale } from '../../../../locales/clients';
import styles from './menu.module.scss';

import GenericButton from '@/app/[locale]/components/ui/button/GenericButton';
import SelectInput from '@/app/[locale]/components/ui/inputs/select/SelectInput';

const SideMenu = () => {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [database, setDatabase] = useState('');
  const optionsDatabase = [
    { value: 'opt1', label: 'Option 1'},
    { value: 'opt2', label: 'Option 2'},
    { value: 'opt3', label: 'Option 3'}
  ];
  return (
    <aside className={styles.aside}>
      <section className={styles.header}>
        {/* Logo */}

        <SelectInput
          label={t('menuSideBar.database')}
          value={database}
          options={optionsDatabase}
          onChange={(e) => setDatabase(e.target.value)}
        />

        <section className={styles.collections}>
          <h5>{t('menuSideBar.collection')}</h5>
          {/* Collections */}
        </section>
      </section>

      <section className={styles.footer}>
        <hr className={styles.divider} />
        <GenericButton
          icon_name="caretUpDown"
          width="100%"
          border="none"
          color="#FFFFFF"
          background="transparent"
          padding="0 20px"
          onClick={() => console.log('Click language')}
        >
          {locale === 'fr' ?  '🇫🇷 Français' : '🇫🇷 French'}
        </GenericButton>

        <GenericButton
          icon_name="sun"
          width="100%"
          border="none"
          color="#FFFFFF"
          background="transparent"
          padding="0 20px"
          onClick={() => console.log('Click theme')}
        >
          {t('menuSideBar.language')}
        </GenericButton>

        <GenericButton
          icon_name="gear"
          width="100%"
          border="none"
          color="#FFFFFF"
          background="transparent"
          padding="0 20px"
          onClick={() => console.log('Click setting')}
        >
          {t('menuSideBar.setting')}
        </GenericButton>

        <GenericButton
          icon_name="logout"
          width="100%"
          border="none"
          color="#EB5757"
          background="transparent"
          padding="0 20px"
          onClick={() => console.log('Click logout')}
        >
          {t('menuSideBar.logout')}
        </GenericButton>
      </section>
    </aside>
  );
};

export default SideMenu;
