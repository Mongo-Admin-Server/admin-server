import { Field } from "../Classes/Field";
import { NextRequest, NextResponse } from "next/server";

export class FieldController {
    
    public async getFields(databaseName: string, collectionName: string): Promise<NextResponse> {
        try {
            const fields = await new Field().listCollectionFields(databaseName, collectionName);
            return new NextResponse(JSON.stringify(fields), {
                status: 200,
                headers: {
                'Content-Type': 'application/json',
                },
            });
        } catch (error) {
            return new NextResponse(JSON.stringify({error: 'Internal server error', details: error}), {
                status: 500,
                headers: {
                  'Content-Type': 'application/json',
                },
            });
        }
    }
}