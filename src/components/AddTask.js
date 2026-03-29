"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

export default function AddTask({ setTasks }) {
  const [text, setText] = useState("");

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const newTask = {
      id: Date.now().toString(),
      text
    };

    setTasks(prev => ({
      ...prev,
      todo: [...prev.todo, newTask]
    }));

    setText("");
  };

  return (
    <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-3 max-w-lg">
      <div className="relative flex-1">
        <input
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full px-4 py-3 bg-card border border-border rounded-xl shadow-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all placeholder:text-slate-400"
        />
      </div>
      <button
        type="submit"
        disabled={!text.trim()}
        className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-primary/40 focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Plus size={18} strokeWidth={2.5} />
        <span>Add Task</span>
      </button>
    </form>
  );
}