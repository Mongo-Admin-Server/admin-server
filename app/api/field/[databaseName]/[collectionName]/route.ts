import { NextRequest, NextResponse } from "next/server";
import { FieldController } from "@/api/src/Controller/FieldController";

export async function GET(request: NextRequest, {params }: { params: { databaseName: string, collectionName: string }}) {
    return new FieldController().getFields(params.databaseName, params.collectionName);
}