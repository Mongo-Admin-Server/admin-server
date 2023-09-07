'use client';
import { useCallback, useEffect, useState } from 'react';

import Title from '@components/title/Title';
import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useSelector } from '@/store/store';
import { selectDatabaseSelected } from '@/domain/usecases/database-slice';

import * as Api from '@/infrastructure';

import { useI18n } from '@/shared/locales/clients';
import eventEmitter from '@/shared/emitter/events';

export default function DocumentsPage({
  params,
}: {
  params: { collection_name: string };
}) {
  const t = useI18n();

  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState('');

  const databaseSelected = useSelector(selectDatabaseSelected);


  const fetchDocuments = useCallback(async () => {
    setLoading(true);
    const response = await Api.document.getAllDocumentByCollection(
      databaseSelected,
      params.collection_name
    );
    setDocuments(response);
    setLoading(false);
  }, [databaseSelected, params.collection_name]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleClick = (action: string, index?: number) => {
    switch (action) {
      case 'create':
        console.log('Create');
        break;
      case 'trash':
        setDocumentToDelete((documents[index!] as any)._id);
        setOpenDeleteModal(true);
        break;
      case 'search':
        console.log('Search');
        break;
      case 'refresh':
        fetchDocuments();
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    try {
      await Api.document.deleteDocument(
        databaseSelected,
        params.collection_name,
        documentToDelete
      ); 
      eventEmitter.dispatch('alert', {
        type: 'success',
        message: t('document.deleteSuccess'),
      });
      fetchDocuments();
    } catch (error) {
      eventEmitter.dispatch('alert', {
        type: 'error',
        message: t('document.deleteError'),
      });
    } finally {
      setOpenDeleteModal(false);
    }
  };

  const renderTable = () => {
    if (loading) return <TableSkeleton />;
    if (!documents.length) return <Table no_data />;

    return (
      <Table
        data_header={Object.keys(documents[0])}
        data_body={documents}
        actions={['trash', 'edit']}
        onClick={(action, index) => handleClick(action, index)}
      />
    );
  };

  return (
    <>
      <Title
        title={params.collection_name}
        actions={['refresh', 'search', 'add']}
        onClick={(action) => handleClick(action)}
      />

      {renderTable()}

      <ConfirmModal
        open={openDeleteModal}
        description={t('document.deleteConfirm')}
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  );
}
