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

type Project = {
  name: string;
  id: string;
};

type FileMetadata = {
  name: string;
  fileType: string;
  fileSize: string;
  projectId: string;
  blobUrl: string;
};

export default function InputFile() {
  const [selectedProject, setSelectedProject] = useState<string>("Default");
  const [file, setFile] = useState<File | undefined>(undefined);
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState("");
  const allProjects = api.project.getAllProjects.useQuery();

  useEffect(() => {
    if (allProjects.data) {
      setProjects(allProjects.data);
    }
  }, [allProjects.data]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Since we're allowing multiple file selections, we should expect 'file' to be an array
    if (!file) {
      setError("Please select a file before submitting.");
      return;
    }

    const fileMetadata: FileMetadata = {
      name: file.name,
      fileType: file.type || "application/pdf",
      fileSize: file.size.toString(),
      projectId: selectedProject,
      blobUrl: "",
    };

    // TODO: Insert the file metadata into the database using your TRPC mutation
    console.log(fileMetadata);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);

      if (fileList) {
        setFile(fileList[0]);
      }
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
            value={selectedProject ?? "Default"}
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
