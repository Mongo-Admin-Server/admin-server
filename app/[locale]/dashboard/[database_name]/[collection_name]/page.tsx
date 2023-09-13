'use client';
import { useCallback, useEffect, useState } from 'react';

import Title from '@components/title/Title';
import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';
import DocumentModal from '@components/modal/document/DocumentModal';
import Pagination from '@components/ui/pagination/Pagination';

import { useDispatch, useSelector } from '@/store/store';
import {
  fetchAllDocumentByCollection,
  deleteDocument,
  selectLoadingDocument,
} from '@/domain/usecases/document-slice';

import { useI18n } from '@/shared/locales/clients';

export default function DocumentsPage({
  params,
}: {
  params: { collection_name: string };
}) {
  const t = useI18n();
  const dispatch = useDispatch();

  const [documents, setDocuments] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [currentDocument, setCurrentDocument] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const [pageSize, setPageSize] = useState(10);

  const loading = useSelector(selectLoadingDocument);

  const fetchDocuments = useCallback(
    async (page: number = 1) => {
      setCurrentPage(page - 1);
      const { payload } = await dispatch(
        fetchAllDocumentByCollection({
          currentPage: page - 1,
          perPage: pageSize,
        })
      );
      setDocuments(payload.documents);
      setTotalDocuments(payload.total);
    },
    [dispatch, pageSize]
  );

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const handleClick = (action: string, index?: number) => {
    switch (action) {
      case 'add':
        setCurrentDocument('');
        setOpenDocumentModal(true);
        break;
      case 'trash':
        setCurrentDocument((documents[index!] as any)._id);
        setOpenDeleteModal(true);
        break;
      case 'search':
        console.log('Search');
        break;
      case 'refresh':
        fetchDocuments();
        break;
      case 'edit':
        setCurrentDocument((documents[index!] as any)._id);
        setOpenDocumentModal(true);
        break;
      default:
        break;
    }
  };

  const handleDelete = async () => {
    await dispatch(deleteDocument(currentDocument));
    fetchDocuments();
    setOpenDeleteModal(false);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    fetchDocuments();
  };

  const renderTable = () => {
    if (loading) return <TableSkeleton />;
    if (!documents.length) return <Table no_data />;

    return (
      <>
        <Table
          data_header={Object.keys(documents[0])}
          data_body={documents}
          actions={['trash', 'edit']}
          onClick={(action, index) => handleClick(action, index)}
        />

        <Pagination
          total={totalDocuments}
          currentPage={currentPage + 1}
          pageSizes={[10, 50, 100, 200]}
          pageSize={pageSize}
          onChange={(page) => fetchDocuments(page)}
          onPageSizeChange={(size) => handlePageSizeChange(size)}
        />
      </>
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

      <DocumentModal
        open={openDocumentModal}
        idDocument={currentDocument}
        onClose={() => setOpenDocumentModal(false)}
        onValidate={() => fetchDocuments()}
      />
    </>
  );
}
