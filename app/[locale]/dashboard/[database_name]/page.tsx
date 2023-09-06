'use client';

import { useEffect, useState } from 'react';
import { useI18n } from '@/shared/locales/clients';
import Link from 'next/link';

import Title from '@components/title/Title';
import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useDispatch, useSelector } from '@/store/store';
import {
  fetchCollectionByDatabase,
  selectCollectionByDatabase,
  selectLoadingCollection,
  setCollectionSelected,
} from '@/domain/usecases/collection-slice';

export default function CollectionsPage({
  params,
}: {
  params: { database_name: string };
}) {
  const t = useI18n();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCollectionByDatabase(params.database_name));
  }, [params.database_name, dispatch]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const collections = useSelector(selectCollectionByDatabase);
  const loading = useSelector(selectLoadingCollection);

  const dataHeader = [
    t('collection.collectionName'),
    t('collection.count'),
    t('collection.avgDocumentSize'),
    t('collection.totalDocumentSize'),
    t('collection.indexes'),
    t('collection.totalIndexSize'),
  ];

  const dataBody = collections.map((collection) => {
    const mappedData: Record<string, React.ReactNode> = {};

    mappedData[t('collection.collectionName')] = (
      <Link
        href={`/dashboard/${params.database_name}/${collection.collectionName}`}
        onClick={() =>
          dispatch(setCollectionSelected(collection.collectionName))
        }
      >
        {collection.collectionName}
      </Link>
    );
    mappedData[t('collection.count')] = collection.count;
    mappedData[t('collection.avgDocumentSize')] = collection.avgDocumentSize;
    mappedData[t('collection.totalDocumentSize')] =
      collection.totalDocumentSize;
    mappedData[t('collection.indexes')] = collection.indexes[0].key;
    mappedData[t('collection.totalIndexSize')] = collection.totalIndexSize;

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
        dispatch(fetchCollectionByDatabase(params.database_name));
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
        title={t('collection.title')}
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
        description={t('collection.deleteConfirm')}
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
