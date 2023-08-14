'use client';

import { useState } from 'react';
import { useI18n } from '@/shared/locales/clients';

import Table from '@components/ui/table/Table';
import Title from '@components/title/Title';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useSelector, useDispatch } from '@/store/store';
import { selectDatabases, fetchAllDatabase, selectLoading } from '@/domain/usecases/database-slice';

export default function DashboardPage() {
  const t = useI18n();
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const databases = useSelector(selectDatabases);
  const loading = useSelector(selectLoading);

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
      case 'refresh':
        dispatch(fetchAllDatabase());
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
        actions={['refresh', 'search', 'add']}
        onClick={(action) => handleClick(action)}
      />

      {loading ? (
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

