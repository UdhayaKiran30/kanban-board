"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DragDropContext } from "@hello-pangea/dnd";
import Column from "../components/Column";
import AddTask from "../components/AddTask";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState({
    todo: [],
    inProgress: [],
    done: []
  });

  const [user, setUser] = useState(null);

  // Check login + load tasks
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) {
      router.push("/login");
      return;
    }

    setUser(currentUser);

    const storedTasks = localStorage.getItem(`tasks_${currentUser.id}`);
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks per user
  useEffect(() => {
    if (user) {
      localStorage.setItem(`tasks_${user.id}`, JSON.stringify(tasks));
    }
  }, [tasks, user]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return;

    const sourceCol = source.droppableId;
    const destCol = destination.droppableId;

    if (sourceCol === destCol) {
      // Same-column reorder: work on a single array copy
      const colItems = [...tasks[sourceCol]];
      const [movedItem] = colItems.splice(source.index, 1);
      colItems.splice(destination.index, 0, movedItem);
      setTasks({ ...tasks, [sourceCol]: colItems });
    } else {
      // Cross-column move
      const sourceItems = [...tasks[sourceCol]];
      const destItems = [...tasks[destCol]];
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);
      setTasks({ ...tasks, [sourceCol]: sourceItems, [destCol]: destItems });
    }
  };

  const logout = () => {
    localStorage.removeItem("currentUser");
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-background text-foreground transition-colors duration-300">
      {/* Header Navbar */}
      <header className="flex-shrink-0 flex items-center justify-between px-6 py-4 bg-card/80 backdrop-blur-md border-b border-border z-10 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/30">
            K
          </div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-violet-400">
            Kanban Studio
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400 hidden sm:block">
                Welcome, <span className="text-foreground">{user.username}</span>
              </span>
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-semibold text-sm shadow-md">
                {user.username.charAt(0).toUpperCase()}
              </div>
            </div>
          )}
          <button
            onClick={logout}
            className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Board Area */}
      <main className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar">
        <div className="h-full px-6 py-8 min-w-max flex flex-col">
          <div className="mb-8">
            <AddTask setTasks={setTasks} />
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <div className="flex flex-1 gap-6 items-start pb-4">
              <Column title="To Do" items={tasks.todo} id="todo" />
              <Column title="In Progress" items={tasks.inProgress} id="inProgress" />
              <Column title="Done" items={tasks.done} id="done" />
            </div>
          </DragDropContext>
        </div>
      </main>
    </div>
  );
}