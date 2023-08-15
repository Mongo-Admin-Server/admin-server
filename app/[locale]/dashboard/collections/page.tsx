'use client';
import React, { useEffect, useState } from 'react';
import * as Api from '@/infrastructure';
import { useI18n } from '@/shared/locales/clients';
import Link from 'next/link';
import styles from './collections.module.scss';
import Title from '../../components/title/Title';
import Table from '../../components/ui/table/Table';

interface CollectionInfo {
  collectionName: string;
  count: number;
  avgDocumentSize: number;
  totalDocumentSize: number;
  indexes: string[];
  totalIndexSize: number;
}

const CollectionsList: React.FC = () => {

  const [collections, setCollections] = useState<CollectionInfo[]>([]);
  const [database, setDatabase] = useState<string>('marketplace');
  const t = useI18n();
  const isDataLoaded = t('collection.loading');
  const actions = ['edit'];
  const isDarkMode = false;

  useEffect(() => {
    async function fetchData() {
      try {
        const collectionDetails = await Api.collection.getCollectionsByDatabase(database);
        
        const parsedCollectionData = Object.entries(collectionDetails).map(([collectionName, collectionData]: [string, any]) =>({
          collectionName,
          ...collectionData,
          avgDocumentSize: parseInt(collectionData.avgDocumentSize),
          count: parseInt(collectionData.count),
          indexes: collectionData.indexes.map((index: any) => index.key),
          totalDocumentSize: parseInt(collectionData.totalDocumentSize),
          totalIndexSize: parseInt(collectionData.totalIndexSize)
        }));

        setCollections(parsedCollectionData);
       
      }catch (error) {
        console.error('error fetching collection data', error);
        setCollections([]);
      }
    }
    fetchData();
  }, [database]);

  const dataHeader = [
    t('collection.collectionName'),
    t('collection.count'),
    t('collection.avgDocumentSize'),
    t('collection.totalDocumentSize'),
    t('collection.indexes'),
    t('collection.totalIndexSize')
  ];

  const dataBody = collections.map((collection) => {

    const mappedData: Record<string, React.ReactNode> = {};
    
    mappedData[t('collection.collectionName')] = (
      <Link className={styles.link} href='#'>
        {collection.collectionName}
      </Link>
    );
    mappedData[t('collection.count')] = collection.count;
    mappedData[t('collection.avgDocumentSize')] = `${collection.avgDocumentSize} B`;
    mappedData[t('collection.totalDocumentSize')] = `${collection.totalDocumentSize} KB`;
    mappedData[t('collection.indexes')] = collection.indexes;
    mappedData[t('collection.totalIndexSize')] = `${collection.totalIndexSize} KB`;

    return mappedData;
  });

  return (
    <>
      <Title title={t('collection.title')} />
      {collections.length > 0 ? (
        <Table data_header={dataHeader} data_body={dataBody} actions={actions} />
      ) : (
        <p>{isDataLoaded}</p>
      )}
    </>
  );

};

export default CollectionsList;