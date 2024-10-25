import {AbstractRepository} from "../../../common/abstractions/repository/repository";
import type {User} from "../types/user/user";
import type {Client} from "pg";
import {Database} from "../../database-module/database/database";

class UserRepository extends AbstractRepository<User> {
    private db: Client

    constructor(db: Database) {
        super();
        this.db = db.client
    }

    public async create(data: User, query: string): Promise<User> {
        return (await this.db.query(query, [...Object.values(data)])).rows[0];
    }

    public async search(param: string | number, query: string): Promise<User> {
        return (await this.db.query(query, [param])).rows[0];
    }
}

export { UserRepository };