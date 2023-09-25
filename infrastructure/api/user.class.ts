import { GrantRole, RoleType } from "@/domain/entities/user-types";
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

  public async updateRole(databaseName: string, role: GrantRole) {
    const response = await axios.put(`/user/${databaseName}`, role);

    return response.data;
  } 

  public async deleteUser(databaseName: string, user: string) {
    const response = await axios.delete(`/user/${databaseName}?userToDelete=${user}`);
    console.log(response.data);
    return response.data;
  }
}

export const user = new User()