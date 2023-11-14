"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const baseClasses =
    "border border-2 p-5 m-2 flex justify-center items-center";

  const combinedClasses = `${baseClasses}  ${props.className}`;

  return (
    <div ref={setNodeRef} className={combinedClasses}>
      {props.children}
    </div>
  );
}