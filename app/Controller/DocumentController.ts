import { NextApiResponse } from "next";
import { Documents } from "../Classes/Documents";

export class DocumentController {
    
    public async getAllDocumentsByCollection(response: NextApiResponse, databaseName: string | string[], collectionName: string | string[]): Promise<any> {
        const documents = await new Documents().getAllDocumentsByCollection(databaseName, collectionName);
        const countDocuments = await new Documents().countDocumentsByCollection(collectionName);
        const avgSizeDocument = await new Documents().averageSizeDocumentsByCollection(collectionName);
        const totalSizeDocument = await new Documents().totalSizeDocumentsByCollection(collectionName);
        if(!documents ) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json({
                    databaseName: databaseName,
                    collectionName: collectionName,
                    result: documents,
                    count: countDocuments,
                    avgSize: avgSizeDocument,
                    totalSize: totalSizeDocument
                });
            } catch(error) {
                response.status(500).json('error');
            }
        }
    }
}