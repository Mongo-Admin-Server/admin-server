'use client';
import { useEffect, useState } from "react";

import styles from './menu.module.scss';

import GenericButton from "@components/ui/button/GenericButton";
import SelectInput from "@components/ui/inputs/select/SelectInput";

import getDatabase from "@/infrastructure/databaseGateway";
import { DatabaseType } from "@/domain/entities/database-types";

const SideMenu = () => {
  const [databaseSelected, setDatabaseSelected] = useState('');
  const [listDatabase, setListDatabase] = useState<string[]>([]);

  useEffect(() => {
    fetchAllDatabase();
  }, []);

  const fetchAllDatabase = async () => {
    const database = await getDatabase();
    setListDatabase(database.map((db: DatabaseType) => db.name));
  }

  return (
    <aside className={styles.aside}>
      <section className={styles.header}>
        {/* Logo */}

        <SelectInput
          label="Base de données"
          value={databaseSelected}
          options={listDatabase}
          onChange={(e) => setDatabaseSelected(e.target.value)}
        />

        {databaseSelected && (
          <section className={styles.collections}>
            <h5>Collections</h5>
            {/* Collections */}
          </section>
        )}
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
          Français
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