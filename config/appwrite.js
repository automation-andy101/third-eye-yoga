import { Client, Databases, Account, Storage, Teams } from "node-appwrite";

// Admin Client
const createAdminClient = () => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)
        .setKey(process.env.APPWRITE_API_KEY);

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get storage() {
            return new Storage(client);
        },
        get teams() {
            return new Teams(client);
        },
    };
};

// const createSessionClient = async (session) => {
const createSessionClient = (session) => {
    const client = new Client()
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT)

    if (session) {
        client.setSession(session);
    }

    return {
        get account() {
            return new Account(client);
        },
        get databases() {
            return new Databases(client);
        },
        get teams() {
            return new Teams(client);
        },
    };
};


export { createAdminClient, createSessionClient };