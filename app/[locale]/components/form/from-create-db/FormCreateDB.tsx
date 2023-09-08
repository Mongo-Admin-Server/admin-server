'use client';
import { useEffect, useState } from 'react';
import { useI18n } from '@/shared/locales/clients';
import { useRouter } from 'next/navigation';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericButton from '@components/ui/button/GenericButton';

import styles from './form-create-db.module.scss';
import GenericModal from '../../modal/generic/GenericModal';
import { createDatabase, selectIsCreate, resetIsCreate } from '@/domain/usecases/database-slice';
import { useDispatch, useSelector } from 'react-redux';
import { ApiError } from '@/api/src/Classes/Errors/ApiError';

interface CreateDBModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  onClose: () => void;
}

export default function FormCreateDB({
  open,
  onCancel,
  onConfirm,
  onClose,
}: CreateDBModalProps) {
  /* Static Data */
  const router = useRouter();
  const t = useI18n();
  
  /* Local Data */
  const [nameDB, setNameDB] = useState<string>('');
  const [nameFirstCollection, setNameFirstCollection] = useState<string>('');
  const [error, setError] = useState<any | null>(null);
  const isSubmitButtonDisabled = nameDB === '' || nameFirstCollection === '';
  const [responseCreateBD, setResponseCreateBD] = useState<any | null>(null)
  
  const dispatch = useDispatch();
  const isCreate = useSelector(selectIsCreate);
  
  /* Methods */
  const handleNameDBChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameDB(event.target.value);
  };
  const handleNameFirstCollectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNameFirstCollection(event.target.value);
  };

  const handleCancelClick = () => {
    setNameDB('');
    setNameFirstCollection('');
    setError(null);
    onCancel();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const dbCreateData = {
      databaseName: nameDB,
      collectionName: nameFirstCollection,
    };
  
    if (dbCreateData.databaseName === '' || dbCreateData.collectionName === '') {
      setError('Veuillez remplir tous les champs.');
      return;
    }
  
    try {
      const response = await dispatch(createDatabase(dbCreateData) as any);
  
      if (response instanceof ApiError) {
        setError(`Erreur ${response.code}: ${response.message}`);
        console.error('Erreur lors de la création de la base de données : ', response);
        // dispatch(resetIsCreate());
      } else {
        setResponseCreateBD(response)
      }
    } catch (error) {
      setError('Une erreur réseau s\'est produite.');
      // dispatch(resetIsCreate());
      console.error('Erreur lors de la création de la base de données : ', error);
    }
  };

  useEffect(() => {
    console.log(isCreate); // Placez votre console.log ici
    if(isCreate === true){
      console.log('oui')
      router.push(`/dashboard/${nameDB}`);
      dispatch(resetIsCreate());
    } else {
      dispatch(resetIsCreate());

      const responseError = responseCreateBD?.payload?.response?.status;
      if(responseError === 500){
        setError(t('formCreateDB.error500'))
      } else if(responseError === 409) {
        setError(t('formCreateDB.error409'))
      } else {
        console.log(responseCreateBD);
      }
    }
  }, [isCreate, responseCreateBD]);

  return (
    <div className={styles.form_create}>
      <GenericModal
        open={open}
        title={t('formCreateDB.title')}
        withButton={false}
        onClose={handleCancelClick}
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
                <GenericButton center outline onClick={handleCancelClick}>
                  {t('formCreateDB.buttonCancel')}
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
