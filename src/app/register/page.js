"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, UserPlus } from "lucide-react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.username === username);
    if (exists) {
      alert("User already exists");
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      username,
      password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");
    router.push("/login");
  };

  return (
    <div className="flex-1 flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md bg-card p-8 sm:p-10 rounded-3xl shadow-xl shadow-primary/5 border border-border transition-all">
        <div className="text-center mb-10">
          <div className="w-14 h-14 mx-auto bg-gradient-to-br from-violet-400 to-fuchsia-400 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-fuchsia-400/30 mb-5 text-2xl">
            <UserPlus size={28} strokeWidth={2.5} />
          </div>
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-slate-500">Create Account</h2>
          <p className="text-sm font-medium text-slate-500 mt-3">Join Kanban Studio today</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">Username</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <User size={18} />
              </div>
              <input
                type="text"
                placeholder="Choose a username"
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
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-900/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400 text-foreground font-medium"
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full py-3.5 mt-2 bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-bold text-base rounded-xl shadow-md hover:shadow-lg hover:shadow-fuchsia-500/30 focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 transition-all active:scale-[0.98]"
          >
            Register Now
          </button>
        </form>

        <p className="mt-8 text-center text-sm font-medium text-slate-500">
          Already have an account?{" "}
          <button onClick={() => router.push("/login")} className="font-bold text-fuchsia-500 hover:text-fuchsia-400 transition-colors hover:underline">
            Sign In here
          </button>
        </p>
      </div>
    </div>
  );
}