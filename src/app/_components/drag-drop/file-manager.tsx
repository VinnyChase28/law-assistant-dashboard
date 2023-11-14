"use client";
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./droppable";
import { Draggable } from "./draggable";
import { Label } from "@/components/ui/label";

interface FileState {
  [key: string]: File[];
}

export default function FileManager() {

  const containers = ["New", "Legal", "Projects"];

  const [parent, setParent] = useState("New");

  const draggableMarkup = (
    <Draggable id="draggable">Thisisalongfilename.pdf</Draggable>
  );

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="m-3 flex flex-wrap items-start justify-center text-center">
          {/* Map through each container */}
          {containers.map((id) => (
            <div key={id} className="mb-4 w-full px-2 md:w-1/3">
              <Label>{id === "New" ? "New" : id + " Docs"}</Label>
              <Droppable
                id={id}
                className="min-h-[300px] w-full  min-w-[300px] border border-gray-300"
              >
                {parent === id ? draggableMarkup : "Drop here"}
              </Droppable>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );

  function handleDragEnd(event) {
    const { over } = event;
    // Set the parent based on the droppable container the item was dropped into
    setParent(over ? over.id : null);
  }
}
