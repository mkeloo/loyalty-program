"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const supabase = createClient();

    const handleLogin = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            return;
        }

        // Fetch user role
        const { data: roleData, error: roleError } = await supabase
            .from("user_roles")
            .select("role")
            .eq("user_id", data.user?.id)
            .single();

        if (roleError || roleData.role !== "admin") {
            setError("You do not have access to this dashboard.");
            await supabase.auth.signOut(); // Clear session if unauthorized
            return;
        }

        router.push("/dashboard");
    };

    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === "SIGNED_OUT" || !session) {
                // Redirect to login when the session expires
                router.push("/login");
            }
        });

        return () => {
            subscription?.subscription.unsubscribe(); // Safely unsubscribe on cleanup
        };
    }, [supabase, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
            <div className="p-8 bg-gray-800 shadow-md rounded-lg max-w-md w-full">
                <h1 className="text-xl font-semibold mb-6 text-gray-200">Admin Login</h1>
                {error && <p className="text-red-400 mb-4 text-sm">{error}</p>}
                <input
                    type="email"
                    placeholder="Email"
                    className="mb-4 p-3 border border-gray-700 rounded-lg w-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="mb-4 p-3 border border-gray-700 rounded-lg w-full bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-600"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    onClick={handleLogin}
                    className="bg-gray-600 text-gray-200 px-4 py-2 rounded-lg w-full hover:bg-gray-500 transition-all duration-200"
                >
                    Login
                </button>
            </div>
        </div>
    );
}