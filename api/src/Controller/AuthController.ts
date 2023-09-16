import Auth from '../Classes/Auth';

export class AuthController {
  public async login(connection_url: string) {
    try {
      const token = await new Auth().login(connection_url);
      return token;
    } catch (error) {
      throw error;
    }
  }
}
