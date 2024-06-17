import type {SupabaseClient, User} from "@supabase/supabase-js";
import {ValidationError} from "@/lib/errors";
import {jwtDecode} from 'jwt-decode'

export default class AuthenticationService {
    constructor(
        private client: SupabaseClient,
    ) {
    }

    async signInWithMagicEmailLink(email: string, emailRedirectTo?: string) {
        const {data, error} = await this.client.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo,
                shouldCreateUser: true,
            },
        });

        if(error){
            throw error;
        }

        return data;
    }


    async signUpWithEmailAndPassword(email: string, password: string, emailRedirectTo?: string) {
        const response = await this.client.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo
            },
        });

        if (response.error) {
            throw response.error;
        }

        if (!response.data.user) {
            throw new ValidationError('Error...')
        }

        return response.data.user
    }

    async _getResponseWithEmailAndPassword(email: string, password: string, captchaToken?: string) {
        const response = await this.client.auth.signInWithPassword({
            email,
            password,
            options: {captchaToken}
        });

        if (response.error) {
            throw response.error;
        }

        if (!response.data.user) {
            throw new ValidationError('Invalid credentials.');
        }
        return response;
    }

    async loginWithEmailAndPassword(email: string, password: string, captchaToken?: string): Promise<User> {
        const reponse = await this._getResponseWithEmailAndPassword(email, password, captchaToken);
        return reponse.data.user;
    }

    async getJwtFromEmailAndPassword(email: string, password: string) {
        const re = await this._getResponseWithEmailAndPassword(email, password)
        return jwtDecode(re.data.session.access_token);
    }
}