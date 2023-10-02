'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

import Title from '@components/title/Title';
import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';
import FormCreateCollection from '@components/form/form-create-collection/FormCreateCollection';
import ExportModal from '@components/modal/export/ExportModal';

import { useDispatch, useSelector } from '@/store/store';
import {
  fetchCollectionByDatabase,
  selectCollectionByDatabase,
  selectLoadingCollection,
  setCollectionSelected,
  deleteCollectionByName,
  exportCollections
} from '@/domain/usecases/collection-slice';
import { selectLanguage } from '@/domain/usecases/setting-slice';


export default function CollectionsPage({
  params,
}: {
  params: { database_name: string, fileName: string, extension: string };
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
  const [searchValue, setSearchValue] = useState('');
  const [openExportModal, setOpenExportModal] = useState(false);

  const collections = useSelector(selectCollectionByDatabase);
  const loading = useSelector(selectLoadingCollection);
  const language = useSelector(selectLanguage);

  const dataHeader = [
    t('collection.collectionName'),
    t('collection.count'),
    t('collection.avgDocumentSize'),
    t('collection.totalDocumentSize'),
    t('collection.indexes'),
    t('collection.totalIndexSize'),
  ];

  const collectionsFiltered = useMemo(() => {
    if (!searchValue) return collections;
    return collections.filter((collection) =>
      collection.collectionName.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [collections, searchValue]);

  const dataBody = useMemo(() => {
    return collectionsFiltered.map((collection) => {
      const mappedData: Record<string, React.ReactNode> = {};

      mappedData[t('collection.collectionName')] = (
        <Link
          href={`/${language}/dashboard/${params.database_name}/${collection.collectionName}`}
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
  }, [collectionsFiltered, dispatch, language, params.database_name, t]);

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
        case 'refresh':
          dispatch(fetchCollectionByDatabase(params.database_name));
          break;
          case 'import':
          console.log('Import');
          break;
          case 'export':
          setOpenExportModal(true);
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

  const handleExport = async (format: 'csv' | 'json') => {
    dispatch(
      exportCollections({
        databaseName: params.database_name,
        fileName: params.fileName,
        extension: format,
      })
    );
    setOpenExportModal(false);
  };

  return (
    <>
      <Title
        title={t('collection.title')}
        actions={['refresh','import','export','add']}
        isViewSearch
        searchValue={searchValue}
        searchPlaceholder={t('collection.searchPlaceholder')}
        changeSearchValue={(value: string) => setSearchValue(value)}
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
      
      <ExportModal
        open={openExportModal}
        description={t('modal.export.description')}
        onClose={() => setOpenExportModal(false)}
        onValidate={handleExport}
      />
    
      <FormCreateCollection
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)} 
      />
    </>
  );
}
