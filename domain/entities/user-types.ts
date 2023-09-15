export interface UserType {
    createUser: string,
    pwd: string,
    roles: Array<string>    //"role": "read", "db": "admin"
}

export interface GrantRole {
    grantRolesToUser: string,
    roles: Array<string>    //"role": "read", "db": "admin"
}

export interface RevokeRole {
    revokeRolesFromUser : string,
    roles: Array<string>    //"role": "read", "db": "admin"
}