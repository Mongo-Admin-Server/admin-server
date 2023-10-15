'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import Title from '@components/title/Title';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useSelector, useDispatch } from '@/store/store';
import {
  selectDatabases,
  fetchAllDatabase,
  selectLoading,
  setDatabaseSelected,
  deleteDatabase,
} from '@/domain/usecases/database-slice';

import {
  setCollectionSelected,
  setCollections,
} from '@/domain/usecases/collection-slice';
import FormCreateDB from '@components/form/from-create-db/FormCreateDB';

export default function DashboardPage() {
  const t = useTranslations();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDatabaseSelected(''));
    dispatch(setCollectionSelected(''));
    dispatch(setCollections([]));
  }, [dispatch]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [databaseNameToDelete, setDatabaseNameToDelete] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const databases = useSelector(selectDatabases);
  const loading = useSelector(selectLoading);

  const dataHeader = [
    t('database.name'),
    t('database.storage'),
    t('database.collection'),
  ];

  const databasesFiltered = useMemo(() => {
    if (!searchValue) return databases;
    return databases.filter((database) =>
      database.name
        .toLocaleLowerCase()
        .includes(searchValue.toLocaleLowerCase())
    );
  }, [databases, searchValue]);

  const dataBody = useMemo(() => {
    return databasesFiltered.map((database) => {
      const mappedData: Record<string, React.ReactNode> = {};

      mappedData[t('database.name')] = (
        <Link
          href={`dashboard/database/${database.name}`}
          replace
          onClick={() => dispatch(setDatabaseSelected(database.name))}
        >
          {database.name}
        </Link>
      );
      mappedData[t('database.storage')] = database.sizeOnDisk;
      mappedData[t('database.collection')] = database.collections;

      return mappedData;
    });
  }, [databasesFiltered, dispatch, t]);

  const handleClick = (action: string, index?: number) => {
    switch (action) {
      case 'add':
        setOpenCreateModal(true);
        break;
      case 'trash':
        setDatabaseNameToDelete(databases[index!].name);
        setOpenDeleteModal(true);
        break;
      case 'refresh':
        dispatch(fetchAllDatabase());
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    if (!databaseNameToDelete) return;
    dispatch(deleteDatabase(databaseNameToDelete));
    setDatabaseNameToDelete('');
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Title
        title={t('database.title')}
        actions={['refresh', 'add']}
        isViewSearch
        searchValue={searchValue}
        searchPlaceholder={t('database.searchPlaceholder')}
        onClick={(action) => handleClick(action)}
        changeSearchValue={(value: string) => setSearchValue(value)}
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

      {openDeleteModal && (
        <ConfirmModal
          open={openDeleteModal}
          description={t('database.deleteConfirm')}
          onConfirm={handleDelete}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}

      {openCreateModal && (
        <FormCreateDB
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )}
    </>
  );
}
