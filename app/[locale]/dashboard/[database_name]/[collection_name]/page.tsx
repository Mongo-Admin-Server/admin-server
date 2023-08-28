'use client';
import { useEffect, useState } from 'react';

import Title from '@components/title/Title';
import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
// import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useSelector, useDispatch } from '@/store/store';
import { selectDatabaseSelected } from '@/domain/usecases/database-slice';

import * as Api from '@/infrastructure';

export default function DocumentsPage({
  params,
}: {
  params: { collection_name: string };
}) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // const loading = useSelector(selectLoading);
  const databaseSelected = useSelector(selectDatabaseSelected);

  useEffect(() => {
    fetchDocuments();
  }, [databaseSelected, params.collection_name]);

  const fetchDocuments = async () => {
    setLoading(true);
    const response = await Api.document.getAllDocumentByCollection(
      databaseSelected,
      params.collection_name
    );
    setDocuments(response);
    setLoading(false);
  };

  const handleClick = (action: string, index?: number) => {
    switch (action) {
      case 'create':
        console.log('Create');
        break;
      case 'trash':
        // setOpenDeleteModal(true);
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

  return (
    <>
      <Title
        title={params.collection_name}
        actions={['refresh', 'search', 'add']}
        onClick={(action) => handleClick(action)}
      />

      {loading ? (
        <TableSkeleton />
      ) : (
        <Table
          data_header={Object.keys(documents[0])}
          data_body={documents}
          actions={['trash', 'edit']}
        />
      )}
    </>
  );
}
