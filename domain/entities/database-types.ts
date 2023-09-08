export type DatabaseType = {
  name: string;
  sizeOnDisk?: number;
  empty?: boolean;
  collections?: any;
};

export type DatabaseState = {
  databases: DatabaseType[];
  databaseSelected: string;
  loading: boolean;
  error: string;
};

export type CreateDatabaseType = {
  databaseName: string;
  collectionName: string;
}

export type CreateDatabaseState = {
  dataCreateDB: CreateDatabaseType[];
  isCreate: boolean;
  loading: boolean;
  error: any;
}