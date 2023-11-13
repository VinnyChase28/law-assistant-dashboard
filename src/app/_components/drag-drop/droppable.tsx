"use client";

import React from "react";
import { useDroppable } from "@dnd-kit/core";

export function Droppable(props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  });

  const style = {
    color: isOver ? "green" : "black", // Change text color when an item is over
    border: "2px dotted black", // Dotted border
    padding: "20px", // Inner space
    margin: "10px", // Space around each droppable
    minHeight: "100px", // Minimum height
    minWidth: "200px", // Minimum width
    display: "flex", // To center content
    justifyContent: "center", // Center horizontally
    alignItems: "center", // Center vertically
    backgroundColor: isOver ? "#f0f0f0" : "white", // Change background when an item is over
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}
