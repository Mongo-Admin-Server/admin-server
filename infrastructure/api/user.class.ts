import { axios } from "./axios.class";

class User {
  public async getUsers() {
    const response = await axios.get('/user/admin');
    return response.data;
  }

  public async postUser(databaseName: string, createUser: string, pwd: string, roles: string[]) {
    const response = await axios.post(`/user/${databaseName}`, { createUser, pwd, roles});
    return response.data;
  }
}

export const user = new User()