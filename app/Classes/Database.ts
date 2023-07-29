import { Instance } from "./Instance";

export class Database{
    public async listDatabase() {
        const client  = new Instance().connection();
        return await client.db().admin().listDatabases();
    }
}
