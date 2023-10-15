import { useCallback, useEffect, useMemo, useState } from 'react';

import Title from '@components/title/Title';
import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import IndexModal from '@components/modal/index/IndexModal';

import { useTranslations } from 'next-intl';

import { useDispatch, useSelector } from '@/store/store';
import { getAllIndexesByCollection, selectLoadingIndexes } from '@/domain/usecases/indexes-slice';

import eventEmitter from '@/shared/emitter/events';

interface IndexesViewProps {
  params: { collection_name: string, database_name: string, filename: string, extension: string};
  currentPage: string;
  listPage: string[];
  changePage: (page: string) => void;
}

const IndexesView = ({ params, currentPage, listPage, changePage }: IndexesViewProps) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [indexes, setIndexes] = useState([]);
  const [openIndexModal, setOpenIndexModal] = useState(false);

  const loading = useSelector(selectLoadingIndexes);

  const fetchAllIndexes = useCallback(async () => {
    const { payload } = await dispatch(getAllIndexesByCollection({ database: params.database_name, collection: params.collection_name}));
    if (payload?.response?.data === 'Invalid filter') {
      eventEmitter.dispatch('alert', { type: 'error', message: t('document.searchError') });
      return;
    }
    setIndexes(payload || []);
  }, [dispatch, params.collection_name, params.database_name, t]);

  useEffect(() => {
    fetchAllIndexes();
  }, [fetchAllIndexes]);

  const dataHeader = [
    t('indexes.name'),
    t('indexes.unique'),
  ];

  const dataBody = useMemo(() => {
    return indexes.map((index: any) => {
      const mappedData: Record<string, React.ReactNode> = {};

      mappedData[t('indexes.name')] = index.name;
      mappedData[t('indexes.unique')] = index.unique ? 'UNIQUE' : '';

      return mappedData;
    });
  }, [indexes, t]);

  const handleClick = (action: string) => {
    switch (action) {
      case 'refresh':
        fetchAllIndexes();
        break;
      case 'add':
        setOpenIndexModal(true);
        break;
      default:
        break;
    }
  };

  const renderTable = () => {
    if (loading) return <TableSkeleton />;
    if (!indexes.length) return <Table no_data />;
    
    return (
      <Table
      data_header={dataHeader}
      data_body={dataBody}
      />
    );
  };

  const handleValidate = async () => {
    setOpenIndexModal(false);
    fetchAllIndexes();
  };

  return (
    <>
      <Title 
        title={params.collection_name} 
        actions={['refresh', 'add']}
        showPage
        currentPage={currentPage}
        listPage={listPage}
        onClick={(action) => handleClick(action)}
        changePage={(page) => changePage(page)}
      />

      {renderTable()}

      {openIndexModal && (
        <IndexModal
          open={openIndexModal}
          collectionName={params.collection_name}
          databaseName={params.database_name}
          onClose={() => setOpenIndexModal(false)}
          onValidate={() => handleValidate()}
        />
      )}
    </>
  );
}

export default IndexesView;