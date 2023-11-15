"use client";


import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./droppable";
import { Draggable } from "./draggable";
import { Label } from "@/components/ui/label";
import { InputFile } from "../input-file";
import { truncateFileName } from "src/app/helpers/textTransformers";
import PopOverButton from "../popover";

type FileKey = "Legal" | "Projects" | "New";
const fileKeys: FileKey[] = ["Legal", "Projects"];

export default function FileManager() {
  const containers = ["New", "Legal", "Projects"];

  const [files, setFiles] = useState<Record<FileKey, any[]>>({
    Legal: [],
    Projects: [],
    New: [],
  });

  const [folders, setFolders] = useState<Record<string, any[]>>({
    Legal: [],
    Projects: [],
  });

  const handleFilesChange = (newFiles: any) => {
    setFiles({
      ...files,
      New: [...files.New, ...Array.from(newFiles)],
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over) {
      const sourceContainer = active.id.split("-")[0] as FileKey;
      const targetContainer = over.id as FileKey;
      const fileIndex = parseInt(active.id.split("-")[2], 10);

      // Check if the source and target containers are the same
      if (sourceContainer === targetContainer) {
        // If they are the same, do nothing to avoid duplication
        return;
      }

      if (files[sourceContainer] && files[targetContainer]) {
        const file = files[sourceContainer][fileIndex];

        if (file) {
          setFiles({
            ...files,
            [sourceContainer]: files[sourceContainer].filter(
              (_, index) => index !== fileIndex,
            ),
            [targetContainer]: [...files[targetContainer], file],
          });
        }
      }
    }
  };

  const addNewFolder = (folderName: string) => {
    setFolders({
      ...folders,
      [folderName]: [],
    });

    setFiles({
      ...files,
      [folderName]: [],
    });
  };

  return (
    <div className="justify-center">
      <div className="flex justify-center">
        <InputFile onFilesChange={handleFilesChange} />
        <div>
          <PopOverButton />
        </div>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="m-3 flex flex-wrap items-start justify-center text-center">
          {/* New Section */}
          <div className="mb-4 w-full px-2">
            <Droppable
              id="New"
              className="border-gray-25 min-h-[100px] w-full min-w-[300px] border"
            >
              {files.New.map((file, index) => (
                <Draggable key={index} id={`New-file-${index}`}>
                  {truncateFileName(file.name)}
                </Draggable>
              ))}
            </Droppable>
          </div>

          {/* Legal and Projects Sections */}
          <div className="flex w-full flex-wrap">
            {fileKeys.map((id: FileKey) => (
              <div key={id} className="mb-4 w-full px-2 md:w-1/2">
                <Label>{id} Docs</Label>
                <Droppable
                  id={id}
                  className="min-h-[300px] w-full min-w-[300px] border border"
                >
                  {files[id].map((file, index) => (
                    <Draggable key={index} id={`${id}-file-${index}`}>
                      {truncateFileName(file.name)}
                    </Draggable>
                  ))}
                </Droppable>
              </div>
            ))}
          </div>
        </div>
      </DndContext>
    </div>
  );
}
