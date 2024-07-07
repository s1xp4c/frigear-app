import { cache } from 'react';
import { fetchServerSupabaseUser } from '@/utils/supabase/server';

export const useServerSupabaseUser = cache(fetchServerSupabaseUser);
