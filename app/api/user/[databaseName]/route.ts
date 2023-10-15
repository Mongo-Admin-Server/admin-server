import { NextRequest, NextResponse } from "next/server";
import { GrantRole, RevokeRole, UserType } from "@/domain/entities/user-types";
import { UserController } from "@/api/src/Controller/UserController";

export async function POST(request: NextRequest, { params }: { params: { databaseName: string } }){
    const body = await request.json();
    const newUser = await new UserController().createUser(params.databaseName, body);
    if(!newUser)
        return new NextResponse(JSON.stringify('error'), {
            status: 500,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    else
        return new NextResponse(JSON.stringify(newUser), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
}

export async function GET(request: NextRequest, { params }: { params: { databaseName: string } }){
    const user = await new UserController().getUsers(params.databaseName);
    if(!user)
        return new NextResponse(JSON.stringify('error'), {
            status: 500,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    else
        return new NextResponse(JSON.stringify(user), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
}

export async function DELETE(request: NextRequest,{ params }: { params: { databaseName: string } }){
    const { userToDelete } = Object.fromEntries(request.nextUrl.searchParams)
    const deleted = await new UserController().deleteUser(params.databaseName, userToDelete);
    if(!deleted)
        return new NextResponse(JSON.stringify('error'), {
            status: 500,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    else
        return new NextResponse(JSON.stringify(deleted), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
}

export async function PUT(request: NextRequest,{ params }: { params: { databaseName: string } }){
    try{
        const body = await request.json();
        let updated;
        
        if(body.grantRolesToUser){
            const  role : GrantRole = body
            updated = await new UserController().grantRoles(params.databaseName, role);
        }else{
            const  role : RevokeRole = body
            updated = await new UserController().deleteRole(params.databaseName, role);
        }
        return new NextResponse(JSON.stringify(updated), {
            status: 200,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }
    catch(error){
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), {
            status: 500,
            headers: {
            'Content-Type': 'application/json',
            },
        });
    }       
}
