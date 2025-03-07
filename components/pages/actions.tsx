'use server';

import { baseUrl } from '@/utils/helpers';
import { redirect } from 'next/navigation';
import { serverContainer } from '@/constants/server-container';

type OnSignUpActionProps = {
  email: string;
  onSignUpRedirectUrl?: string;
};

export async function handleSignUp({ email, onSignUpRedirectUrl }: OnSignUpActionProps) {
  if (!email || email.length <= 2) {
    throw new Error(`No email.`);
  }

  const auth = serverContainer.make('authenticationService');
  await auth.signInWithMagicEmailLink(email, baseUrl('/auth/callback'));

  return redirect(baseUrl(onSignUpRedirectUrl || '/auth/signup/check-your-email'));
}
