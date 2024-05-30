import conf from "../conf/conf.js";
import {Client, Account, ID} from "appwrite";
export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client)


    }
    async createAccount({email, password, name}) {
        try{    
            const useracc = await this.account.create(ID.unique(),email, password, name);
            if(useracc) {
                //call another method
                return this.login({email, password})
            }else{
                return useracc
            }
        }catch(error) {
            throw error
        }
    }
    async login({email, password}) {
        try{
            return await this.account.createEmailSession(email, password);
        }catch(error){
            throw error
        }
    }
    async getCurrentUSer(){
        try{
            return await this.account.get();
        }catch(error) {
            throw error
        }
        return null;
    }
    async logOut(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authservice = new AuthService();
export default authservice