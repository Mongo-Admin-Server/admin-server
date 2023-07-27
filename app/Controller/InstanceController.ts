import { NextApiResponse } from "next";
import { Instance } from "../Classes/Instance";


export class InstanceController{
    
    public async connection(response: NextApiResponse){
        const instance = await new Instance().connection();
        if(!instance)
            response.status(404).json('error');
        else
            response.status(200).json('success');
    }
}