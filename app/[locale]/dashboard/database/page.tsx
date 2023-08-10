'use client';

import Table from '@components/ui/table/Table';
import Title from '@components/title/Title';

import { useSelector } from '@/store/store';
import { selectDatabases } from '@/domain/usecases/database-slice';

import { useI18n } from '@/shared/locales/clients';

export default function ListBDD() {
  const t = useI18n();

  const databases = useSelector(selectDatabases);

  return (
    <>
      <Title
        title={t('database.title')}
        wordingButton={t('database.create')}
        onClick={(action) => console.log(action + 'Add a database')}
      />

      {!databases ? (
        <p>Loading...</p>
      ) : (
        <Table
          data_header={Object.keys(databases[0])}
          data_body={databases}
          actions={['trash']}
          onClick={(action, index) => console.log(action, index)}
        />
      )}
    </>
  );
}
