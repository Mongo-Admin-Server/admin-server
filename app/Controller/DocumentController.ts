import { NextApiResponse } from "next";
import { Documents } from "../Classes/Documents";

export class DocumentController {
    
    public async getAllDocumentsByCollection(response: NextApiResponse, name: string | string[]): Promise<any> {
        const documents = await new Documents().getAllDocumentsByCollection(name);
        const countDocuments = await new Documents().countDocumentsByCollection(name);
        const avgSizeDocument = await new Documents().averageSizeDocumentsByCollection(name);
        const totalSizeDocument = await new Documents().totalSizeDocumentsByCollection(name);
        if(!documents ) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json({
                    collectionName: name,
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

    public async getAllDocuments(response: NextApiResponse): Promise<any> {
        const documents = await new Documents().getAllDocuments();
        if(!documents) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json(documents);
            } catch(error) {
                response.status(500).json('error');
            }
        }
    }
}