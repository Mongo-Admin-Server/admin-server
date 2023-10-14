import { Instance } from "@/api/src/Classes/Instance";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest){
    try{
        // eslint-disable-next-line no-useless-escape
        const urlRegex = /mongodb\+srv:\/\/(?:(?:[^:]+):(?:[^@]+)?@)?(?:(?:(?:[^\/]+)|(?:\/.+.sock?),?)+)(?:\/([^\/\.\ "*<>:\|\?]*))?(?:\?(?:(.+=.+)&?)+)*/;
        // eslint-disable-next-line no-useless-escape
        const localhostRegex = /mongodb:\/\/(0.0.0.0):[0-9]+/
        if(!(Instance.Url == '' || urlRegex.test(Instance.Url) || localhostRegex.test(Instance.Url)))
            return new NextResponse(JSON.stringify({error: 'Wrong or no url'}), {
                status: 403,
                headers: {
                'Content-Type': 'application/json',
                },
            });
        const client = Instance.Connection; 
        if(client)
            return new NextResponse(JSON.stringify(true), {
                status: 200,
                headers: {
                  'Content-Type': 'application/json',
                },
            });  
    }catch(error){
        return new NextResponse(JSON.stringify({error: 'Internal server error'}), {
            status: 500,
            headers: {
              'Content-Type': 'application/json',
            },
        });  
    }
}