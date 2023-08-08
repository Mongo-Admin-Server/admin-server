export interface ICollectionInfo {
    [key: string]: {
        count: number;
        avgDocumentSize: number;
        indexes: any[];
        totalDocumentSize: number;
        totalIndexSize: number;
        storageSize: number;
    };
}