'use client';
import { useState } from "react";

import styles from './menu.module.scss';

import GenericButton from "@components/ui/button/GenericButton";
import SelectInput from "@components/ui/inputs/select/SelectInput";

const SideMenu = () => {
  const [database, setDatabase] = useState('');

  return (
    <aside className={styles.aside}>
      <section className={styles.header}>
        {/* Logo */}

        <SelectInput
          label="Base de données"
          value={database}
          options={['Option 1', 'Option 2', 'Option 3']}
          onChange={(e) => setDatabase(e.target.value)}
        />

        <section className={styles.collections}>
          <h5>Collections</h5>
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