'use client';
import { useState } from 'react';
import { useI18n } from '@/shared/locales/clients';
import { useRouter } from 'next/navigation';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericButton from '@components/ui/button/GenericButton';

import styles from './form-create-db.module.scss';
import GenericModal from '../../modal/generic/GenericModal';
import axios from 'axios';

interface CreateDBModalProps {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export default function FormCreateDB({
  open,
  onConfirm,
  onClose,
}: CreateDBModalProps) {
  /* Static Data */
  const router = useRouter();
  const t = useI18n();
  /* Methods */
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dbCreateData = {
      databaseName: nameDB,
      collectionName: nameFirstCollection
    }

    if (dbCreateData.databaseName === '' || dbCreateData.collectionName === '') {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    setError('');

    const url = `/api/database`;
    axios
      .post(url, dbCreateData)
      .then(response =>{
        console.log(response);
        router.push(`/dashboard/${dbCreateData.databaseName}`)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
          if(error.response.status === 500){
            setError(t('formCreateDB.error500'))
          } else if(error.response.status === 409) {
            setError(t('formCreateDB.error409'))
          } else {
            console.log(error.response);
          }
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });

  };
  
  const handleNameDBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameDB(event.target.value);
  };
  const handleNameFirstCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFirstCollection(event.target.value);
  };

  /* Local Data */
  const [nameDB, setNameDB] = useState<string>('');
  const [nameFirstCollection, setNameFirstCollection] = useState<string>('');
  const [error, setError] = useState<string>('');
  const isSubmitButtonDisabled = nameDB === '' || nameFirstCollection === '';

  return (
    <div className={styles.form_create}>
      <GenericModal
        open={open}
        title={t('formCreateDB.title')}
        withButton={false}
        onClose={onClose}
        onValidate={onConfirm}
      >
        <div className={styles.formContainer}>
          <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <div className={styles.formInput}>
                  <GenericInput
                    type="text"
                    label={t('formCreateDB.nameDB')}
                    value={nameDB}
                    placeholder={t('formCreateDB.nameDB')}
                    error={error}
                    onChange={handleNameDBChange}
                  />
                </div>
                <div className={styles.formInput}>
                  <GenericInput
                    type="text"
                    label={t('formCreateDB.nameFirstCollection')}
                    value={nameFirstCollection}
                    placeholder={t('formCreateDB.nameFirstCollection')}
                    error={error}
                    onChange={handleNameFirstCollectionChange}
                    />
                </div>
              </div>
              <div className={styles.formButton}>
                <GenericButton center outline onClick={onClose}>
                  cancel
                </GenericButton>
                <GenericButton center disabled={isSubmitButtonDisabled} type="submit">
                  {t('formCreateDB.title')}
                </GenericButton>
              </div>
            </form>
          </div>
        </div>
      </GenericModal>
    </div>
  );
}
