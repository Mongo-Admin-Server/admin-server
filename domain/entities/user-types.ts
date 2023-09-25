export interface UserInterface {
  createUser: string,
  pwd: string,
  roles: Array<string>,    //"role": "read", "db": "admin"
}

export type RoleType = {
  role: string,
  db: string
};

export type UserType = {
  userId: string,
  user: string,
  db: string,
  roles: RoleType[],
}

export type UserState = {
  users: UserType[];
  userSelected: string;
  loading: boolean;
  error: string;
}; 

export interface GrantRole {
  grantRolesToUser: string,
  roles: RoleType[]    //"role": "read", "db": "admin"
}

export interface RevokeRole {
  revokeRolesFromUser : string,
  roles: Array<string>    //"role": "read", "db": "admin"
}