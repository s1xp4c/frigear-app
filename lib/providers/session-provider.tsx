'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { createSupabaseBrowserClient } from '@/utils/supabase/client';
import type { Session, User } from '@supabase/supabase-js';
import { jwtDecode } from 'jwt-decode';
import type { DatabaseUserProfile } from '@/lib/database/types';

export const SessionContext = createContext<Session | undefined>(undefined);
export const UserContext = createContext<User | undefined>(undefined);

export const UserProfileContext = createContext<
  DatabaseUserProfile | undefined
>(undefined);

const fetchSession = async () => {
  const { data } = await createSupabaseBrowserClient().auth.getSession();
  return data.session;
};

export const SessionProvider = ({
  children,
  mockedSession,
}: {
  children: ReactNode;
  mockedSession?: Session | null;
}) => {
  const [sessionState, setSessionState] = useState<Session | undefined>(
    undefined,
  );
  const [userState, setUserState] = useState<User | undefined>(undefined);
  const [userProfile, setUserProfile] = useState<
    DatabaseUserProfile | undefined
  >(undefined);
  const setSession = (session: Session | null) => {
    setSessionState(session || undefined);
    setUserState(session?.user);

    if (session && session.access_token) {
      const token = jwtDecode(session.access_token) as {
        profile?: DatabaseUserProfile;
      };
      setUserProfile(token?.profile || undefined);
    }
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeSession = async () => {
      if (mockedSession) {
        setSession(mockedSession);
        setLoading(false);
      } else {
        const session = await fetchSession();
        setSession(session);
        setLoading(false);

        const {
          data: { subscription },
        } = createSupabaseBrowserClient().auth.onAuthStateChange(
          (_event, session) => {
            setSession(session);
            setLoading(false);
          },
        );

        return () => subscription.unsubscribe();
      }
    };

    initializeSession();
  }, [mockedSession]);

  return (
    <SessionContext.Provider value={sessionState}>
      <UserContext.Provider value={userState}>
        <UserProfileContext.Provider value={userProfile}>
          {!loading && children}
        </UserProfileContext.Provider>
      </UserContext.Provider>
    </SessionContext.Provider>
  );
};
