'use server';

import { createSessionClient } from '@/config/appwrite';
import { cookies } from 'next/headers';

const ADMIN_TEAM_ID = 'admins';

async function checkAuth() {
  const sessionCookie = cookies().get('appwrite-session');

  if (!sessionCookie) {
    
    return {
      isAuthenticated: false,
      isAdmin: false,
    };
  }
  
  try {
    const { account, teams } = await createSessionClient(sessionCookie.value);
    const user = await account.get();
    let memberships;
    let isAdministrator;

    try {
      memberships = await teams.listMemberships(ADMIN_TEAM_ID);

      // Fetch team memberships
      isAdministrator = memberships.memberships.some(
        (team) => team.teamId === ADMIN_TEAM_ID
      );
    } catch (error) {
      isAdministrator = false;
    }

    return {
      isAuthenticated: true,
      isAdmin: isAdministrator,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
      },
    };

  } catch (error) {
    console.error("Get account error:", error);
    return {
      isAuthenticated: false,
      isAdmin: false,
    };
  }
}

export default checkAuth;
