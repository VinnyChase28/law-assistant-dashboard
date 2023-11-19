"use client";

import { useState, useEffect } from "react";
import { api } from "src/trpc/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { formatBytes } from "src/helpers/textTransformers";

type Project = {
  name: string;
  id: string;
};

export default function InputFile() {
  const [selectedProject, setSelectedProject] =
    useState<string>("Default Project");
  const [file, setFile] = useState<File[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const allProjects = api.project.getAllProjects.useQuery();

  useEffect(() => {
    if (allProjects.data) {
      setProjects(allProjects.data);
    }
  }, [allProjects.data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (file.length === 0) {
      setError("Please select at least one file before submitting.");
      return;
    }

    const fileMetadataArray = []; // Array to store metadata for each file

    for (let i = 0; i < file.length; i++) {
      if (file[i]) {
        const formData = new FormData();
        formData.append("file", file[i]);

        try {
          // Upload the file
          const uploadResponse = await fetch(
            `/api/upload?filename=${encodeURIComponent(file[i].name)}`,
            { method: "POST", body: formData },
          );

          if (!uploadResponse.ok) {
            throw new Error(`Upload failed for file: ${file[i].name}`);
          }

          const uploadedFileData = await uploadResponse.json();
          const blobUrl = uploadedFileData.url; // Assuming this is the blob URL

          // Store file metadata
          fileMetadataArray.push({
            name: file[i].name,
            fileType: file[i].type || "application/pdf",
            fileSize: formatBytes(file[i].size),
            projectId: selectedProject,
            blobUrl: blobUrl,
          });
        } catch (error) {
          console.error(`Error processing file: ${file[i].name}`, error);
          setError(`Error processing file: ${file[i].name}`);
          return; // Stop processing further files
        }
      } else {
        console.error(`File at index ${i} is undefined.`);
        setError(`File at index ${i} is undefined.`);
        return;
      }
    }

    // Insert file metadata into PostgreSQL
    try {
      const insertResponse = await Promise.all(
        fileMetadataArray.map((metadata) =>
          api.file.insertFileMetadata.mutate(metadata),
        ),
      );
      console.log("All files uploaded and metadata inserted:", insertResponse);
    } catch (error) {
      console.error("Error inserting file metadata:", error);
      setError("Error inserting file metadata");
    }
  };````z 

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log("Selected Files:", files);
    if (files) {
      setFile(Array.from(files)); // Store all selected files
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <div className="mb-4">
        <Label htmlFor="file">File</Label>
        <Input
          accept=".pdf"
          id="file"
          type="file"
          onChange={handleFileChange}
          multiple
        />
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}
          >
            Select Project
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Choose Project</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={selectedProject}
            onValueChange={setSelectedProject}
          >
            {projects.map((project) => (
              <DropdownMenuRadioItem key={project.id} value={project.name}>
                {project.name}
              </DropdownMenuRadioItem>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {error && <p className="text-red-500">{error}</p>}
      <Button
        variant="default"
        type="submit"
        style={{
          padding: "0.5rem 1rem",
          fontSize: "0.875rem",
          marginTop: "1rem",
        }}
      >
        Submit
      </Button>
    </form>
  );
}
