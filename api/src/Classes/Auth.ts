import { SignJWT } from "jose";
import { Instance } from "./Instance";

export default class Auth {
  public async login(connection_url: string) {
    try {
      
      // const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY);
      // const expired = process.env.JWT_EXPIRES_IN || '2h';
      // const alg = 'HS256';
      // const client = Instance.Connection;
      // const users = await client.db('marketplace').command({
      //   usersInfo:1
      // })
      // console.log(users);
      // return {
      //   token: await new SignJWT({
      //     connection_url: connection_url,
      //   })
      //     .setProtectedHeader({ alg })
      //     .setIssuedAt()
      //     .setIssuer('urn:example:issuer')
      //     .setAudience('urn:example:audience')
      //     // .setExpirationTime(expired)
      //     .sign(secret),
      // };
      return 'success'
    } catch (error) {
      throw error;
    }
  }
}
