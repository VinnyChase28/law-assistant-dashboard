"use client";
import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./droppable";
import { Draggable } from "./draggable";
import { Label } from "@/components/ui/label";

export default function FileManager() {
  const containers = ["New", "Legal", "Projects"];
  const [parent, setParent] = useState(null);
  const draggableMarkup = <Draggable id="draggable">Drag me</Draggable>;

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {parent === null ? draggableMarkup : null}

      {containers.map((id) => (
        //center the label and the droppable
        <div className="text-center">
          <Label>{id}</Label>
          <Droppable key={id} id={id}>
            {parent === id ? draggableMarkup : null}
          </Droppable>
        </div>
      ))}
    </DndContext>
  );

  function handleDragEnd(event) {
    const { over } = event;

    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }
}
