'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
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
  deleteCollectionByName
} from '@/domain/usecases/collection-slice';
import FormCreateCollection from '@components/form/form-create-collection/FormCreateCollection';

export default function CollectionsPage({
  params,
}: {
  params: { database_name: string };
}) {
  const t = useTranslations();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setCollectionSelected(''));
    dispatch(fetchCollectionByDatabase(params.database_name));
  }, [params.database_name, dispatch]);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [collectionNameToDelete, setCollectionNameToDelete] = useState('');
  const [openCreateModal, setOpenCreateModal] = useState(false);

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
    let collectionToDelete;
      switch (action) {
        case 'add':
          setOpenCreateModal(true);
          break;
        case 'trash':
          collectionToDelete = collections[index!];
          setCollectionNameToDelete(collectionToDelete.collectionName)
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
  
  const handleDelete = ()=> {
    if (!collectionNameToDelete) return;
    dispatch(
      deleteCollectionByName({
        databaseName: params.database_name,
        collectionName: collectionNameToDelete,
      })
    );
    setCollectionNameToDelete('');
    setOpenDeleteModal(false);
  }

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
      <FormCreateCollection
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)} 
      />
    </>
  );
}
