'use client';
import { useEffect } from 'react';
import { useI18n, useCurrentLocale } from '../../../../shared/locales/clients';

import styles from './menu.module.scss';

import GenericButton from '@components/ui/button/GenericButton';
import SelectInput from '@components/ui/inputs/select/SelectInput';
import CollectionList from '@components/ui/list/collection/CollectionList';

import { DatabaseType } from '@/domain/entities/database-types';

import { useSelector, useDispatch } from '@/store/store';
import {
  selectDatabaseSelected,
  selectDatabases,
  setDatabaseSelected,
  fetchAllDatabase,
} from '@/domain/usecases/database-slice';
import {
  selectCollectionSelected,
  selectCollectionByDatabase,
  setCollectionSelected,
} from '@/domain/usecases/collection-slice';
// import { setTheme, selectTheme } from '@/domain/usecases/setting-slice';

const SideMenu = () => {
  const dispatch = useDispatch();
  const t = useI18n();
  const locale = useCurrentLocale();

  useEffect(() => {
    dispatch(fetchAllDatabase());
  }, [dispatch]);

  const databaseSelected = useSelector(selectDatabaseSelected);
  const databases = useSelector(selectDatabases).map(
    (database: DatabaseType) => {
      return { value: database.name, label: database.name };
    }
  );

  const collectionSelected = useSelector(selectCollectionSelected);
  const collections = useSelector(selectCollectionByDatabase).map(
    (collection: any) => collection.name
  );

  // const theme = useSelector(selectTheme);

  // useEffect(() => {
  //   localStorage.setItem('theme', theme);
  //   document.documentElement.setAttribute('data-theme', theme);
  // }, [theme]);

  // const handleChangeTheme = () => {
  //   const theme = document.documentElement.getAttribute('data-theme');
  //   if (theme === 'dark') {
  //     dispatch(setTheme('light'));
  //   } else {
  //     dispatch(setTheme('dark'));
  //   }
  // };

  return (
    <aside className={styles.aside}>
      <section className={styles.header}>
        {/* Logo */}

        <SelectInput
          label={t('menuSideBar.database')}
          value={databaseSelected}
          options={databases}
          onChange={(e) => dispatch(setDatabaseSelected(e.target.value))}
        />

        {databaseSelected && (
          <section>
            <h5>{t('menuSideBar.collection')}</h5>
            <div className={styles.collections}>
              <CollectionList
                collections={collections}
                collectionSelected={collectionSelected}
                onClick={(collection) =>
                  dispatch(setCollectionSelected(collection))
                }
              />
            </div>
          </section>
        )}
      </section>

      <section className={styles.footer}>
        <hr className={styles.divider} />
        <GenericButton
          icon_name="gear"
          width="100%"
          border="none"
          color="#FFFFFF"
          background="transparent"
          padding="0 20px"
          onClick={() => console.log('Click language')}
        >
          {t('menuSideBar.language')}
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
          {t('menuSideBar.theme')}
        </GenericButton>

        <GenericButton
          icon_name="gear"
          width="100%"
          border="none"
          color="#FFFFFF"
          background="transparent"
          padding="0 20px"
          onClick={() => console.log('Click settings')}
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
