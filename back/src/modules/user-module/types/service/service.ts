import {User} from "../user/user";

export interface Service {
    login(data: Pick<User, "password" | "email">): Promise<User>;
    register(data: User): Promise<User>;
}