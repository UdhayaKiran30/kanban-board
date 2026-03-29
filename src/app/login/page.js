"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            u => u.username === username && u.password === password
        );

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            router.push("/");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center p-6 bg-background">
            <div className="w-full max-w-md bg-card p-8 sm:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border transition-all">
                <div className="text-center mb-10">
                    <div className="w-14 h-14 mx-auto bg-gradient-to-br from-primary to-violet-400 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30 mb-5 text-2xl">
                        KB
                    </div>
                    <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-slate-500">Welcome Back</h2>
                    <p className="text-sm font-medium text-slate-500 mt-3">Sign in to your Kanban Studio account</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Username</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <User size={18} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400 text-foreground font-medium"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Password</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                <Lock size={18} />
                            </div>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400 text-foreground font-medium"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3.5 mt-2 bg-primary text-primary-foreground font-bold text-base rounded-xl shadow-md hover:bg-primary/90 hover:shadow-primary/40 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all active:scale-[0.98]"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-8 text-center text-sm font-medium text-slate-500">
                    Don't have an account?{" "}
                    <button onClick={() => router.push("/register")} className="font-bold text-primary hover:text-primary/80 transition-colors hover:underline">
                        Register for free
                    </button>
                </p>
            </div>
        </div>
    );
}