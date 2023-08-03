import React, { useState } from 'react';
import GenericInput from '../ui/inputs/generic/GenericInput';
import GenericButton from '../ui/button/GenericButton';
import SelectInput from '../ui/inputs/select/SelectInput';
import styles from './login-form.module.scss';

export default function LoginForm() {
  /* Static Data */
  const formLabels = {
    userName: 'Utilisateur',
    language: 'Langue',
    passWord: 'Mot de passe',
    placeholderUserName: "Nom d'utilisateur",
    placeholderPassWord: 'Mot de passe',
    button: 'Connexion',
  };
  const optionsLanguages = ['🇫🇷 Français', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 Anglais', '🇪🇸 Espagnol'];

  /* Methods */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData);
    try {
      const url = `/api/instance?language=${encodeURIComponent(
        formData.language
      )}&userName=${encodeURIComponent(
        formData.userName
      )}&passWord=${encodeURIComponent(formData.passWord)}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json();
        //TODO log test connexion success
        console.log(data);
      } else {
        //TODO log test connexion failed
        console.error('Échec de la connexion à MongoDB.');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du formulaire :', error);
    }
  };

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  /* Local Data */
  const [formData, setFormData] = useState({
    userName: '',
    passWord: '',
    language: 'Français',
  });

  return (
    <div className={styles.container}>
      <div className={styles.right}>
        <h2 className={styles.title}>Se connecter</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <div className={styles.formInput}>
              <SelectInput
                label={formLabels.language}
                value={formData.language}
                options={optionsLanguages}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formInput}>
              <GenericInput
                type="text"
                label={formLabels.userName}
                value={formData.userName}
                placeholder={formLabels.placeholderUserName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.formInput}>
              <GenericInput
                type="password"
                label={formLabels.passWord}
                value={formData.passWord}
                placeholder={formLabels.placeholderPassWord}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.formButton}>
            <GenericButton width="427px" center type="submit">
              Connexion
            </GenericButton>
          </div>
        </form>
      </div>
      <div className={styles.left}>
        <div className={styles.backgroundImage} />
      </div>
    </div>
  );
}
