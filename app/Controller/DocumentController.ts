import { NextApiResponse } from "next";
import { Documents } from "../Classes/Documents";

export class DocumentController {
    public async getAllDocuments(response: NextApiResponse, name: string | string[]): Promise<any> {
        const document = await new Documents().getAllDocuments(name);
        const countDocuments = await new Documents().countDocumentsByCollection(name);
        const avgSizeDocument = await new Documents().averageSizeDocumentsByCollection(name);
        const totalSizeDocument = await new Documents().totalSizeDocumentsByCollection(name);
        if(!document ) {
            response.status(404).json('error');
        } else {
            try {
                response.status(200).json({
                    collectionName: name,
                    result: document,
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