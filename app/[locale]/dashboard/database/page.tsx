'use client';

import { useState } from 'react';
import { useI18n } from '@/shared/locales/clients';

import Table from '@components/ui/table/Table';
import Title from '@components/title/Title';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useSelector } from '@/store/store';
import { selectDatabases } from '@/domain/usecases/database-slice';


export default function ListBDD() {
  const t = useI18n();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const databases = useSelector(selectDatabases);

  const handleClick = (action: string, index?: number) => {
    switch (action) {
      case 'create':
        console.log('Create');
        break;
      case 'trash':
        // save index in state to delete the right database
        setOpenDeleteModal(true);
        break;
      case 'search':
        console.log('Search');
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    console.log('Delete');
  };

  return (
    <>
      <Title
        title={t('database.title')}
        wordingButton={t('database.create')}
        onClick={(action) => handleClick(action)}
      />

      {!databases ? (
        <p>Loading...</p>
      ) : (
        <Table
          data_header={Object.keys(databases[0])}
          data_body={databases}
          actions={['trash']}
          onClick={(action, index) => handleClick(action, index)}
        />
      )}

      <ConfirmModal
        open={openDeleteModal}
        description={t('database.deleteConfirm')}
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
