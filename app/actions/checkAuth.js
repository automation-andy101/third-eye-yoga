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
    const memberships = await teams.listMemberships(ADMIN_TEAM_ID);

    // Fetch team memberships
    // const memberships = await account.listMemberships();
    console.log("ANDREW BALL SACK - ");
    console.log("memberships - " + memberships);
    const isAdministrator = memberships.memberships.some(
      (team) => team.teamId === ADMIN_TEAM_ID && team.status === 'active'
    );

    console.log("ANDREW BALL SACK 2 - ");
    console.log("memberships - " + isAdministrator);

    // const isAdministrator = memberships.memberships.some(
    //   (m) => m.teamId === process.env.ADMIN_TEAM_ID && m.confirm
    // );

    console.log("ANDREW2 - " + isAdministrator);

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
    console.error("ACCOUNT.GET ERROR:", error);
    return {
      isAuthenticated: false,
      isAdmin: false,
    };
  }
}

export default checkAuth;
