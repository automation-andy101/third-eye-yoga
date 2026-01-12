// config/appwriteSession.js
import { cookies } from "next/headers";
import { createSessionClient } from "./appwrite";

export const createSessionClientFromCookies = () => {
    const session = cookies().get("a_session")?.value;
    
    return createSessionClient(session);
};
