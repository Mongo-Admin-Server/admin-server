import { NextApiResponse } from "next";
import { Documents } from "../Classes/Documents";

export class DocumentController {
    public async getAllDocuments(response: NextApiResponse): Promise<any> {
        let document = await new Documents().getAllDocuments();
        response.status(200).json(document);
    }
}