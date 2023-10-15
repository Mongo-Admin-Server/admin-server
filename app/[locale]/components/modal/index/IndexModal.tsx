import { useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import styles from "./indexModal.module.scss";

import GenericModal from '@components/modal/generic/GenericModal';
import SelectInput from '@components/ui/inputs/select/SelectInput';
import Checkbox from '@components/ui/inputs/checkbox/Checkbox';

import { createIndex } from '@/domain/usecases/indexes-slice';
import { getAllFieldsFromCollection } from '@/domain/usecases/collection-slice';
import { useDispatch } from '@/store/store';

import eventEmitter from '@/shared/emitter/events';

interface IndexModalProps {
  open: boolean;
  collectionName: string;
  databaseName: string;
  onClose: () => void;
  onValidate: () => void;
}

const IndexModal = ({
  open,
  collectionName,
  databaseName,
  onClose,
  onValidate,
}: IndexModalProps) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [field, setField] = useState('');
  const [listField, setListField] = useState([]);
  const [unique, setUnique] = useState(false);

  const isDisabled = !field;

  const fetchAllFields = useCallback(async () => {
    const { payload } = await dispatch(
      getAllFieldsFromCollection({ databaseName, collectionName })
    );
    if (payload?.response?.data.status === 500) {
      eventEmitter.dispatch('alert', {
        type: 'error',
        message: t('document.searchError'),
      });
      return;
    }

    const formattedList = payload.map((value: string) => {
      return {
        value: value,
        label: value,
      };
    });
    setListField(formattedList);
  }, [collectionName, databaseName, dispatch, t]);

  const onCreateIndex = async () => {
    const { payload } = await dispatch(
      createIndex({ databaseName, collectionName, field, unique })
    );
    if (payload?.response?.data === 'Invalid filter') {
      eventEmitter.dispatch('alert', {
        type: 'error',
        message: t('document.searchError'),
      });
      return;
    }

    onValidate();
  };

  useEffect(() => {
    fetchAllFields();
  }, [fetchAllFields]);

  return (
    <GenericModal
      open={open}
      title={t('modal.index.title')}
      disabledButton={isDisabled}
      onClose={onClose}
      onValidate={onCreateIndex}
    >
      <section className={styles['index-modal']}>
        <SelectInput
          label={t('modal.index.field')}
          value={field}
          options={listField}
          onChange={(e) => setField(e.target.value)}
        />
        <Checkbox
          id="unique"
          label={t('modal.index.unique')}
          value={unique}
          onChange={(e) => setUnique(e.target.checked)}
        />
      </section>
    </GenericModal>
  );
};

export default IndexModal;
