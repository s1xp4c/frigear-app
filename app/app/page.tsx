'use server';

import { serverContainer } from '@/constants/server-container';
import { Card, CardContent, CardTitle } from '@/components/ui/card';


export default async function AppPage() {
  const client = serverContainer.make('supabaseClient');
  const {
    data: { user },
    error
  } = await client.auth.getUser();

  if (error) {
    throw error;
  }
  if (!user) {
    return <div className="mx-auto mt-[10%]">No user</div>;
  }

  return <div className="mx-auto mt-[10%]">{user.email || 'n/a'}</div>;
}
