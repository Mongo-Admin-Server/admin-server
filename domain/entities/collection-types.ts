export type CollectionType = {
  name: string;
  count: number;
  avgDocumentSize: number;
  totalDocumentSize: number;
  indexes: string[];
  totalIndexSize: number;
}

export type CollectionState = {
  collections: CollectionType[];
  collectionSelected: string;
  loading: boolean;
  error: string;
};