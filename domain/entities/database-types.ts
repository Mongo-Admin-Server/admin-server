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