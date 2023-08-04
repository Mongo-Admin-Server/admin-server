'use client';

import styles from './menu.module.scss';

import GenericButton from "@components/ui/button/GenericButton";
import SelectInput from "@components/ui/inputs/select/SelectInput";
import CollectionList from '@/app/components/ui/list/collection/CollectionList';

import { DatabaseType } from "@/domain/entities/database-types";

import { useSelector, useDispatch } from "@/store/store";
import { selectDatabaseSelected, selectDatabases, setDatabaseSelected } from "@/domain/usecases/database-slice";
import { selectCollectionSelected, selectCollectionByDatabase, setCollectionSelected } from "@/domain/usecases/collection-slice";

const SideMenu = () => {
  const dispatch = useDispatch();

  const databaseSelected = useSelector(selectDatabaseSelected);
  const databases = useSelector(selectDatabases).map((database: DatabaseType) => database.name);

  const collectionSelected = useSelector(selectCollectionSelected);
  const collections = useSelector(selectCollectionByDatabase).map((collection: any) => collection.name);

  return (
    <aside className={styles.aside}>
      <section className={styles.header}>
        {/* Logo */}

        <SelectInput
          label="Base de données"
          value={databaseSelected}
          options={databases}
          onChange={(e) => dispatch(setDatabaseSelected(e.target.value))}
        />

        {databaseSelected && (
          <section>
            <h5>Collections</h5>
            <div className={styles.collections}>
              <CollectionList 
                collections={collections}
                collectionSelected={collectionSelected}
                onClick={(collection) => dispatch(setCollectionSelected(collection))} />
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
          Langue
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
          Langue
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
          Paramètres
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
          Déconexion
        </GenericButton>
      </section>
    </aside>
  );
}

export default SideMenu;