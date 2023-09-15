'use client';
import { useEffect, useState } from 'react';
import { useI18n } from '@/shared/locales/clients';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericModal from '@components/modal/generic/GenericModal';

import { useDispatch, useSelector } from '@/store/store';
import { postCollectionByName, selectErrorCollection, setErrorCollection } from '@/domain/usecases/collection-slice';

interface CreateCollectionModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FormCreateCollection({
  open,
  onClose,
}: CreateCollectionModalProps) {
  /* Static Data */
  const dispatch = useDispatch();
  const t = useI18n();
  const errorSelector = useSelector(selectErrorCollection);

  /* Methods */
  const handleSubmit = async () => {
    if (!errorInput && collectionName.trim() !== '') {
      dispatch(postCollectionByName(collectionName)).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') onClose();
      }); 
    }
  };
  
  const handleCollectionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newCollectionName = event.target.value;
    setCollectionName(newCollectionName);

    if (newCollectionName.includes(' ')) {
      setErrorInput(t('formCreateCollection.spacesNotAllowedErrorMessage'))
    } else {
      setErrorInput('')
      dispatch(setErrorCollection(''));
    }
  };

  /* Local Data */
  const [collectionName, setCollectionName] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');
  const isSubmitButtonDisabled = errorInput !== '' || collectionName.trim() === '' || errorSelector !== '' ;
  const errors = errorInput || errorSelector;

  useEffect(() => {
    dispatch(setErrorCollection(''));
    setCollectionName('');
  }, [open, dispatch])

  return (
    <GenericModal
      open={open}
      title={t('formCreateCollection.title')}
      onClose={onClose}
      confirmLabelTrad={t('collection.create')}
      typeButton='submit'
      disabledButton={isSubmitButtonDisabled}
      onValidate={handleSubmit}
    >
      <form>
        <GenericInput
          type="text"
          label={t('formCreateCollection.collectionName')}
          value={collectionName}
          error={errors}
          placeholder={t('formCreateCollection.collectionName')}
          onChange={handleCollectionNameChange}
        />
      </form>
    </GenericModal>
  );
}
