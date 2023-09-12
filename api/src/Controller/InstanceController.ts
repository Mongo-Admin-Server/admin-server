import { NextApiResponse } from "next";
import { Instance } from "../Classes/Instance";


// export class InstanceController{
    
//     public connection(response: NextApiResponse){
//         const instance = new Instance().connection();
//         if(!instance)
//             response.status(404).json('error');
//         else
//             response.status(200).json('success');
//     }
// }