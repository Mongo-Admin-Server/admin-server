'use client';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import styles from './menu.module.scss';
import '@/shared/styles/main.scss';

import GenericButton from '@components/ui/button/GenericButton';
import SelectInput from '@components/ui/inputs/select/SelectInput';
import CollectionList from '@components/ui/list/collection/CollectionList';
import LanguageModal from '@components/modal/language/LanguageModal';

import { DatabaseType } from '@/domain/entities/database-types';
import { logout } from '@/domain/usecases/auth-slice';

import { useSelector, useDispatch } from '@/store/store';
import {
  selectDatabaseSelected,
  selectDatabases,
  setDatabaseSelected,
} from '@/domain/usecases/database-slice';
import {
  selectCollectionSelected,
  selectCollectionByDatabase,
  setCollectionSelected,
  selectLoadingCollection,
} from '@/domain/usecases/collection-slice';
import { setTheme, selectTheme, selectLanguage } from '@/domain/usecases/setting-slice';
import { setIsLogged } from '@/domain/usecases/auth-slice';
import { database } from '@/infrastructure';

const SideMenu = () => {
  const dispatch = useDispatch();
  const t = useTranslations();
  const router = useRouter();
  const [openLanguageModal, setOpenLanguageModal] = useState(false);

  const language = useSelector(selectLanguage);
  const databaseSelected = useSelector(selectDatabaseSelected);
  const databases = useSelector(selectDatabases).map(
    (database: DatabaseType) => {
      return { value: database.name, label: database.name };
    }
  );

  const collectionSelected = useSelector(selectCollectionSelected);
  const collections = useSelector(selectCollectionByDatabase).map(
    (collection) => collection.collectionName
  );
  const loadingCollection = useSelector(selectLoadingCollection);

  const theme = useSelector(selectTheme);

  const handleChangeTheme = () => {
    theme === 'light' ? dispatch(setTheme('dark')) : dispatch(setTheme('light'));
  };

  const handleDatabaseChange = (database: string) => {
    router.push(`/${language}/dashboard/${database}`);
    dispatch(setDatabaseSelected(database));
  };

  const handleCollectionChange = (collection: string) => {
    dispatch(setCollectionSelected(collection));
    router.push(`/${language}/dashboard/${databaseSelected}/${collection}`);
  };

  const handleShowListUsers = () => {
    router.push(`/${language}/dashboard/admin/user`)
    console.log("user");
  }
  const handleLogout = () => {
    dispatch(logout());
    dispatch(setIsLogged(false));
    router.push(`/`);
  };

  return (
    <>
      <aside className={styles.aside}>
        <section className={styles.header}>
          {/* Logo */}

          <SelectInput
            label={t('menuSideBar.database')}
            value={databaseSelected}
            options={databases}
            onChange={(e) => handleDatabaseChange(e.target.value)}
          />

          {(databaseSelected && !loadingCollection) &&  (
            <section className={styles.contents}>
              <h5>{t('menuSideBar.collection')}</h5>
              <div className={`${styles.collections} scrollable`}>
                <CollectionList
                  collections={collections}
                  collectionSelected={collectionSelected}
                  onClick={(collection) =>
                    handleCollectionChange(collection)
                  }
                />
              </div>
            </section>
          )}
        </section>

        <section className={styles.footer}>
          <hr className={styles.divider} />
          <GenericButton
            icon_name="flag"
            padding="0 20px"
            transparent
            onClick={() => setOpenLanguageModal(true)}
          >
            {t('menuSideBar.language')}
          </GenericButton>

          <GenericButton
            icon_name={theme === 'light' ? 'moon' : 'sun'}
            padding="0 20px"
            transparent
            onClick={handleChangeTheme}
          >
            {theme === 'light' ? t('theme.dark') : t('theme.light')}
          </GenericButton>

          <GenericButton
            icon_name="gear"
            padding="0 20px"
            transparent
            onClick={() => console.log('Click settings')}
          >
            {t('menuSideBar.setting')}
          </GenericButton>
          <GenericButton
            icon_name="gear"
            padding="0 20px"
            transparent
            onClick={handleShowListUsers}
          >
            {t('menuSideBar.user')}
          </GenericButton>

          <GenericButton
            icon_name="logout"
            padding="0 20px"
            transparent
            variant='danger'
            onClick={handleLogout}
          >
            {t('menuSideBar.logout')}
          </GenericButton>
        </section>
      </aside>

      <LanguageModal
        open={openLanguageModal}
        onClose={() => setOpenLanguageModal(false)}
      />
    </>
  );
};

export default SideMenu;
