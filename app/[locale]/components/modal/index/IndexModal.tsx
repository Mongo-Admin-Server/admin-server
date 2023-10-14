import { useState } from 'react';
import { useTranslations } from 'next-intl';

import GenericModal from '@components/modal/generic/GenericModal';
import SelectInput from '@components/ui/inputs/select/SelectInput';
import Checkbox from '@components/ui/inputs/checkbox/Checkbox';

import { createIndex } from '@/domain/usecases/indexes-slice';
import { useDispatch } from '@/store/store';

import eventEmitter from '@/shared/emitter/events';

interface IndexModalProps {
  open: boolean;
  collectionName: string;
  databaseName: string;
  onClose: () => void;
  onValidate: () => void;
}

const IndexModal = ({ open, collectionName, databaseName, onClose, onValidate }: IndexModalProps) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [field, setField] = useState('');
  const [unique, setUnique] = useState(false);

  const isDisabled = !field;

  const onCreateIndex = async () => {
    const { payload } = await dispatch(createIndex({ databaseName, collectionName, field, unique }));
    if (payload?.response?.data === 'Invalid filter') {
      eventEmitter.dispatch('alert', { type: 'error', message: t('document.searchError') });
      return;
    }

    onValidate();
  };

  return (
    <GenericModal
      open={open}
      title={t('modal.index.title')}
      disabledButton={isDisabled}
      onClose={onClose}
      onValidate={onCreateIndex}
    >
      <SelectInput
        label={t('modal.index.field')}
        value={field}
        options={[
          { label: 'name', value: 'name' },
          { label: 'unique', value: 'unique' },
        ]}
        onChange={(e) => setField(e.target.value)}
      />
      <Checkbox
        id='unique'
        label={t('modal.index.unique')}
        value={unique}
        onChange={(e) => setUnique(e.target.checked)}
      />
    </GenericModal>
  );
};

export default IndexModal;