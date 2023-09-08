'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/shared/locales/clients';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericModal from '@components/modal/generic/GenericModal';

import styles from './form-create-db.module.scss';

import { postDatabase, selectError, setError } from '@/domain/usecases/database-slice';
import { useDispatch, useSelector } from '@/store/store';

interface CreateDBModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FormCreateDB({ open, onClose }: CreateDBModalProps) {
  /* Static Data */
  const t = useI18n();
  const dispatch = useDispatch();

  const error = useSelector(selectError);

  useEffect(() => {
    if (open) dispatch(setError(''));

    setDatabaseName('');
    setCollectionName('');
  }, [open, dispatch]);

  /* Local Data */
  const [databaseName, setDatabaseName] = useState<string>('');
  const [collectionName, setCollectionName] = useState<string>('');

  const isSubmitButtonDisabled = databaseName === '' || collectionName === '';

  /* Methods */
  const handleSubmit = async () => {
    await dispatch(postDatabase({ databaseName, collectionName }));
    console.log(!error);
    if (!error) onClose();
  };

  return (
    <GenericModal
      open={open}
      title={t('database.createTitle')}
      confirmLabelTrad={t('modal.button.create')}
      disabledButton={isSubmitButtonDisabled}
      onClose={onClose}
      onValidate={handleSubmit}
    >
      <form className={styles['create-database-form']}>
        <GenericInput
          type="text"
          label={t('database.name')}
          value={databaseName}
          error={error}
          placeholder={t('database.name')}
          onChange={(event) => setDatabaseName(event.target.value)}
        />
        <GenericInput
          type="text"
          label={t('collection.title')}
          value={collectionName}
          placeholder={t('collection.title')}
          onChange={(event) => setCollectionName(event.target.value)}
        />
      </form>
    </GenericModal>
  );
}
