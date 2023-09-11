import { NextApiResponse, NextApiRequest } from "next";
import User from "../Classes/User";


export class UserController{
    
    public login(request: NextApiRequest, response: NextApiResponse){
        
        const { connection_url } = request.body
        const { save } = request.body

        const client = new User().login(connection_url);
        if(!client)
            response.status(404).json('error');
        else
            response.status(200).json(true);
    }
}