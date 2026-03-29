"use client";

import { Droppable } from "@hello-pangea/dnd";
import TaskCard from "./TaskCard";

export default function Column({ title, items, id }) {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={`flex flex-col w-[320px] min-w-[320px] rounded-2xl border transition-colors duration-200 ${
            snapshot.isDraggingOver 
              ? "bg-slate-50 dark:bg-slate-800/50 border-primary/40 shadow-inner" 
              : "bg-slate-50/50 dark:bg-slate-800/30 border-border/80 shadow-sm"
          }`}
        >
          {/* Column Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/40">
            <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${
                id === "todo" ? "bg-slate-400" : 
                id === "inProgress" ? "bg-blue-500" : 
                "bg-emerald-500"
              }`}></span>
              {title}
              <span className="w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 border border-border/50 text-slate-500 dark:text-slate-400 text-xs font-bold ml-1 shadow-sm">
                {items.length}
              </span>
            </h3>
          </div>

          {/* Cards Container */}
          <div className="flex-1 p-3 min-h-[150px] overflow-y-auto custom-scrollbar flex flex-col gap-3">
            {items.map((item, index) => (
              <TaskCard key={item.id} item={item} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  );
}