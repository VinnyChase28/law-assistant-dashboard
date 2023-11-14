"use client";
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./droppable";
import { Draggable } from "./draggable";
import { Label } from "@/components/ui/label";

export default function FileManager() {
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <div>
      <h3 className="p6 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-2xl">
        File Management
      </h3>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="flex flex-col items-center">
          {/* New section */}
          <div className="mb-4 text-center">
            <Label>New</Label>
            <Droppable id="New" className="min-h-[300px] min-w-[1920px]">
              {parent === "New" ? draggableMarkup : null}
            </Droppable>
          </div>

          {/* Legal and Projects in two columns */}
          <div className="flex w-full justify-between">
            <div className="w-1/2 pr-2 text-center">
              <Label>Legal</Label>
              <Droppable id="Legal" className="min-h-[600px] min-w-[300px]">
                {parent === "Legal" ? draggableMarkup : null}
              </Droppable>
            </div>
            <div className="w-1/2 pl-2 text-center">
              <Label>Projects</Label>
              <Droppable id="Projects" className="min-h-[600px] min-w-[300px]">
                {parent === "Projects" ? draggableMarkup : null}
              </Droppable>
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const { over } = event;
    setParent(over ? over.id : null);
  }
}