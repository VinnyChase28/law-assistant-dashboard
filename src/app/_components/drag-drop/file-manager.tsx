"use client";

import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import { Droppable } from "./droppable";
import { Draggable } from "./draggable";
import { Label } from "@/components/ui/label";
import { InputFile } from "../input-file";
import { truncateFileName } from "src/app/helpers/textTransformers";

type FileKey = string; // Since folder names are dynamic, we use string
type File = { name: string };
type FilesState = Record<FileKey, File[]>;
type FoldersState = Record<FileKey, File[]>;

export default function FileManager() {
  const [files, setFiles] = useState<FilesState>({
    Legal: [],
    Projects: [],
    New: [],
  });

  const [folders, setFolders] = useState<FoldersState>({
    Legal: [],
    Projects: [],
  });

  const handleFilesChange = (newFiles: FileList) => {
    setFiles({
      ...files,
      New: [
        ...(files.New ?? []),
        ...Array.from(newFiles).map((file) => ({ name: file.name })),
      ],
    });
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const sourceContainer = active.id.split("-")[0];
      const targetContainer = over.id;
      const fileIndex = parseInt(active.id.split("-")[2], 10);

      // Check if sourceContainer and targetContainer are valid keys in files
      if (sourceContainer in files && targetContainer in files) {
        const sourceFiles = files[sourceContainer];
        const targetFiles = files[targetContainer] ?? []; // Fallback to empty array if undefined

        // Ensure sourceFiles is defined before accessing it
        if (sourceFiles) {
          const file = sourceFiles[fileIndex];

          if (file) {
            setFiles({
              ...files,
              [sourceContainer]: sourceFiles.filter(
                (_, index) => index !== fileIndex,
              ),
              [targetContainer]: [...targetFiles, file],
            });
          }
        }
      }
    }
  };

  const addNewFolder = () => {
    const folderName = prompt("Enter folder name");
    if (folderName && !folders[folderName]) {
      setFolders({
        ...folders,
        [folderName]: [],
      });

      setFiles({
        ...files,
        [folderName]: [],
      });
    }
  };

  return (
    <div className="justify-center">
      <div className="flex justify-center">
        <InputFile onFilesChange={handleFilesChange} />
        <button onClick={addNewFolder}>Add Folder</button>
      </div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className="m-3 flex flex-wrap items-start justify-center text-center">
          {/* New Section */}
          <div className="mb-4 w-full px-2">
            <Droppable
              id="New"
              className="border-gray-25 min-h-[200px] w-full min-w-[900px] border"
            >
              {files.New?.map((file, index) => (
                <Draggable key={index} id={`New-file-${index}`}>
                  {truncateFileName(file.name)}
                </Draggable>
              )) ?? []}
            </Droppable>
          </div>

          {/* Dynamic Folders */}
          {Object.keys(folders).map((id) => (
            <div key={id} className="mb-4 w-full px-2 md:w-1/2">
              <Label>{id} Docs</Label>
              <Droppable id={id} className="min-h-[200px] min-w-[200px] border">
                {(files[id] || []).map((file, index) => (
                  <Draggable key={index} id={`${id}-file-${index}`}>
                    {truncateFileName(file.name)}
                  </Draggable>
                ))}
              </Droppable>
            </div>
          ))}
        </div>
      </DndContext>
    </div>
  );
}