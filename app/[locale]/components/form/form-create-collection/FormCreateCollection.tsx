'use client';
import { useState } from 'react';
import { useI18n } from '@/shared/locales/clients';

import GenericInput from '@components/ui/inputs/generic/GenericInput';

import GenericModal from '@components/modal/generic/GenericModal';
import { useDispatch } from '@/store/store';
import { postCollectionByName } from '@/domain/usecases/collection-slice';

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
  /* Methods */
  const handleSubmit = async () => {
    dispatch(postCollectionByName(collectionName))
    onClose();
  };
  
  const handleCollectionNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCollectionName(event.target.value);
  };

  /* Local Data */
  const [collectionName, setCollectionName] = useState<string>('');
  const isSubmitButtonDisabled = collectionName === '';

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
          placeholder={t('formCreateCollection.collectionName')}
          onChange={handleCollectionNameChange}
        />
      </form>
    </GenericModal>
  );
}
