// file to talk to appWrite
import config from "@/conf/config";
import { Client, Account, ID } from "appwrite";

type CreateUserAccount = {
    email: string;
    password: string;
    name: string
}

type LoginUserAccount = {
    email: string;
    password: string;
}

const appWriteClient = new Client();

appWriteClient.setEndpoint(config.appWriteUrl).setProject(config.appWriteProjectId);

export const account = new Account(appWriteClient);


// export a class to handle all the things that deal with AppWrite
export class AppwriteService {
    // create a new record inside appWrite
    async createUserAccount({ email, password, name }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({ email, password });
            }
            return userAccount;

        } catch (error) {
            throw error;
        }
    };

    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async isLoginIn(): Promise<boolean> {
        try {
            const data = await this.getCurrentUser();
            return Boolean(data);
        } catch (error) {
        }
        return false;
    }

    async getCurrentUser() {
        try {
            return account.get();
        } catch (error) {
            console.log('getCurrentUser error', error);
        }
        return null;
    }

    async logout() {
        try {
            return await account.deleteSession("current");
        } catch (error) {
            console.log('logout error', error);
        }
    }
}

const appwriteService = new AppwriteService();
export default appwriteService;