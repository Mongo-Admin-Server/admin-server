'use client';

import { useState } from 'react';
import { useI18n } from '@/shared/locales/clients';
import Link from 'next/link';

import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import Title from '@components/title/Title';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useSelector, useDispatch } from '@/store/store';
import { selectDatabases, fetchAllDatabase, selectLoading, setDatabaseSelected } from '@/domain/usecases/database-slice';

export default function DashboardPage() {
  const t = useI18n();
  const dispatch = useDispatch();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const databases = useSelector(selectDatabases);
  const loading = useSelector(selectLoading);

  const dataHeader = [
    t('database.name'),
    t('database.storage'),
    t('database.collection'),
    t('database.indexes'),
  ];

  const dataBody = databases.map((database) => {
    const mappedData: Record<string, React.ReactNode> = {};

    mappedData[t('database.name')] = (
      <Link href={`/dashboard/${database.name}`} onClick={() => dispatch(setDatabaseSelected(database.name))}>
        {database.name}
      </Link>
    );
    mappedData[t('database.storage')] = database.sizeOnDisk;
    mappedData[t('database.collection')] = database.collections;
    mappedData[t('database.indexes')] = database.empty;

    return mappedData;
  });

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
        <TableSkeleton />
      ) : (
        <Table
          data_header={dataHeader}
          data_body={dataBody}
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

