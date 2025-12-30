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
    const { account } = await createSessionClient(sessionCookie.value);
    const user = await account.get();

    // Fetch team memberships
    const memberships = await account.listMemberships();
    const isAdmin = memberships.memberships.some(
      (team) => team.teamId === ADMIN_TEAM_ID && team.status === 'active'
    );

    return {
      isAuthenticated: true,
      isAdmin,
      user: {
        id: user.$id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error) {
    return {
      isAuthenticated: false,
      isAdmin: false,
    };
  }
}

export default checkAuth;
