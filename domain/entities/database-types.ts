export type DatabaseType = {
  name: string;
  sizeOnDisk: number;
  empty: boolean;
};

export type DatabaseState = {
  databases: DatabaseType[];
  databaseSelected: string;
  loading: boolean;
  error: string;
};