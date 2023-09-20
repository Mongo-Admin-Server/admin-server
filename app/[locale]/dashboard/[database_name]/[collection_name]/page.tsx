'use client';
import { useCallback, useEffect, useState } from 'react';

import styles from './document.module.scss';

import Title from '@components/title/Title';
import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';
import DocumentModal from '@components/modal/document/DocumentModal';
import Pagination from '@components/ui/pagination/Pagination';
import JsonView from '@components/json/JsonView';

import eventEmitter from '@/shared/emitter/events';

import { useDispatch, useSelector } from '@/store/store';
import {
  fetchAllDocumentByCollection,
  deleteDocument,
  selectLoadingDocument,
  exportDocuments,
} from '@/domain/usecases/document-slice';

import { useTranslations } from 'next-intl';

export default function DocumentsPage({
  params,
}: {
  params: { collection_name: string, database_name: string, filename: string, extension: string};
}) {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [documents, setDocuments] = useState([]);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openDocumentModal, setOpenDocumentModal] = useState(false);
  const [openExportModal, setOpenExportModal] = useState(false);
  const [viewFormat, setViewFormat] = useState<'table' | 'json'>('table');
  const [currentDocument, setCurrentDocument] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [isFetching, setIsFetching] = useState(true);

  const [pageSize, setPageSize] = useState(10);

  const loading = useSelector(selectLoadingDocument);

  const fetchDocuments = useCallback(
    async (page: number = 1) => {
      if (!isFetching) return;
      setCurrentPage(page - 1);
      const { payload } = await dispatch(
        fetchAllDocumentByCollection({
          currentPage: page - 1,
          perPage: pageSize,
          filter: searchValue,
        })
      );
      if (payload?.response?.data === 'Invalid filter') {
        eventEmitter.dispatch('alert', { type: 'error', message: t('document.searchError') });
        setIsFetching(false);
        return;
      }
      setDocuments(payload.documents || []);
      setTotalDocuments(payload?.total || 0);
      setIsFetching(false);
    },
    [dispatch, pageSize, searchValue ,isFetching, t]
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
      case 'refresh':
        fetchDocuments();
        break;
      case 'edit':
        setCurrentDocument((documents[index!] as any)._id);
        setOpenDocumentModal(true);
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

  const handleDelete = async () => {
    await dispatch(deleteDocument(currentDocument));
    fetchDocuments();
    setOpenDeleteModal(false);
  };

  const handleExport = () => {
    const { database_name, collection_name, filename, extension } = params;
    dispatch(
      exportDocuments({
        databaseName: database_name,
        fileName: filename,
        extension: extension,
        collectionName: collection_name
      })
    );
    setOpenExportModal(false);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setIsFetching(true);
    fetchDocuments();
  };

  const handleSearch = () => {
    setIsFetching(true);
    fetchDocuments();
  };

  const handleValidate = () => {
    setIsFetching(true);
    fetchDocuments();
  };

  const renderTable = () => {
    if (loading) return <TableSkeleton />;
    if (!documents.length) return <Table no_data />;

    return (
      <>
        {viewFormat === 'json' && (
          <div className={`${styles['container-json']} scrollable`}>
            {documents.map((doc, index) => (
              <JsonView key={index} json={doc} />
            ))}
          </div>
        )}

        {viewFormat === 'table' && (
          <Table
            data_header={Object.keys(documents[0])}
            data_body={documents}
            actions={['trash', 'edit']}
            onClick={(action, index) => handleClick(action, index)}
          />
        )}

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
        actions={['refresh', 'import', 'export', 'add']}
        onClick={(action) => handleClick(action)}
        isViewFromat
        viewFormat={viewFormat}
        isViewSearch
        searchValue={searchValue}
        searchPlaceholder='{ "field": "value" }'
        changeSearchValue={(value) => setSearchValue(value)}
        changeViewFormat={(format: any) => setViewFormat(format)}
        enterSearchValue={handleSearch}
      />

      {renderTable()}

      <ConfirmModal
        open={openDeleteModal}
        description={t('document.deleteConfirm')}
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteModal(false)}
      />

      <ConfirmModal
        open={openExportModal}
        description={t('document.exportConfirm')}
        onConfirm={handleExport}
        onClose={() => setOpenExportModal(false)}
      />

      <DocumentModal
        open={openDocumentModal}
        idDocument={currentDocument}
        onClose={() => setOpenDocumentModal(false)}
        onValidate={() => handleValidate()}
      />
    </>
  );
}
