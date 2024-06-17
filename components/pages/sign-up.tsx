"use client";

import {Label} from "@/components/ui/label";
import {TextInput} from "@/components/ui/input/text-input";
import {useState} from "react";
import {appContainer} from "@/app/app-container";


const SignUp: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState(false);

    const authService = appContainer.make('authenticationService');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        if (!email || email.length <= 2) {
            throw new Error(`No email.`);
        }
        await authService.signInWithMagicEmailLink(email, `http://localhost:3000/auth/callback`)
    };

    return (
        <div className="mx-auto mt-[10%]">
            <form onSubmit={handleSubmit} className="mt-2 space-y-4 w-96">
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <TextInput
                        id="email"
                        name="email"
                        placeholder="your.name@example.somewhere"
                        required
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <button
                    disabled={loading}
                    className="bg-primary py-2 text-zinc-100 shadow hover:bg-zinc/90 w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                    type="submit"
                >
                    Send me a magic Frigear link
                </button>
            </form>
        </div>
    );
};

export default SignUp;
