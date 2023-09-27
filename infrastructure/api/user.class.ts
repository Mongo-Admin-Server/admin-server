import { RoleType } from "@/domain/entities/user-types";
import { axios } from "./axios.class";

class User {
  public async getUsers() {
    const response = await axios.get('/user/');
    return response.data;
  }

  public async postUser(username: string, password: string, roles: RoleType[]) {
    const response = await axios.post(`/user`, { username, password, roles});
    return response.data;
  }

  public async updateRole(username: string, roles: RoleType[]) {
    const response = await axios.put(`/user`, { username, roles });

    return response.data;
  } 

  public async deleteUser(username: string) {
    const response = await axios.delete(`/user`, { 
      data: { username }
    });
    return response.data;
  }
}

export const user = new User()