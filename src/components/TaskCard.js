"use client";

import { Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

export default function TaskCard({ item, index }) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={provided.draggableProps.style}
          className={`group flex items-start gap-2 p-4 bg-card border rounded-xl transition-all duration-200 ${
            snapshot.isDragging 
              ? "border-primary shadow-xl shadow-primary/10 scale-105 z-50 ring-2 ring-primary/20" 
              : "border-border shadow-sm hover:shadow-md hover:border-primary/30"
          }`}
        >
          <div 
            {...provided.dragHandleProps} 
            className="mt-0.5 text-slate-400 opacity-40 hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing focus:outline-none"
            aria-label="Drag handle"
          >
            <GripVertical size={16} />
          </div>
          <div className="flex-1 text-sm font-medium leading-relaxed text-foreground select-none">
            {item.text}
          </div>
        </div>
      )}
    </Draggable>
  );
}