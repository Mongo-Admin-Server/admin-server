'use client';
import React, { useEffect, useState } from 'react';
import Table from '../../components/ui/table/Table';
import styles from './collections.module.scss'
import axios from "axios";
import { Console } from 'console';

interface CollectionInfo {
  collectionName: string;
  count: number;
  avgDocumentSize: number;
  totalDocumentSize: number;
 // indexes: number;
 // totalIndexSize: number;
}

async function getCollectionDetails(): Promise<CollectionInfo[]> {
  try {
    const [collectionsResponse, documentsResponse] = await Promise.all([
      axios.get('http://localhost:3000/api/collections'),
      axios.get('http://localhost:3000/api/document')
    ]);
    const collectionsData: CollectionInfo[] = [];

    for (const [collectionName, collection] of Object.entries(collectionsResponse.data.marketplace)) {
      const documentsInfo = documentsResponse.data[collectionName]
      collectionsData.push({
        collectionName: collectionName,
        count: documentsInfo ? documentsInfo.count : 0,
        avgDocumentSize: documentsInfo ? documentsInfo.avgSize || 0 : 0,
        totalDocumentSize: documentsInfo ? documentsInfo.totalSize || 0 : 0,
       // indexes: collection.indexes,
       // totalIndexSize: collection.totalIndexSize,
      });
    }
    
    return collectionsData;
  } catch (error) {
    console.error('error fetching collection details', error);
    return [];
  }
}
 

const HomePage: React.FC = () => {
  const [collections, setCollections] = useState<CollectionInfo[]>([]);

  useEffect(() => {
    async function fetchData() {
      const collectionDetails = await getCollectionDetails();
      setCollections(collectionDetails);
    }

    fetchData();
  }, []);

  interface Column {
    label: string;
    key: keyof CollectionInfo;
  }
  const dataHeader: Column[] = [
    { label: 'Name collection', key: 'collectionName' },
    { label: 'Document', key: 'count' },
    { label: 'Avg document size', key: 'avgDocumentSize' },
    { label: 'Total document size', key: 'totalDocumentSize' }
  ]; 

  const actions = ['edit'];
  console.log('collections:', collections); 
  const isDataLoaded = collections.length > 0;
  return (
    <div>
      <h1>Liste Collections</h1>
      <div>
        {isDataLoaded && (
          <div  className={styles.container}>  
            <Table
          data_header={dataHeader.map(column => column.label)}
          data_body={collections}
          actions={actions}
        />
        </div>
        
        )}</div>
        {!isDataLoaded && <p>Loading data...</p>}
      
    </div>
  );
        }

export default HomePage;