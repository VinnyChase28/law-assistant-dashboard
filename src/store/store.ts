import { create } from "zustand";
import { persist } from "zustand/middleware";

//track table checked rows
export interface CheckedRowsState {
  checkedRows: { [key: number]: boolean };
  toggleRow: (id: number) => void;
}

export const useCheckedRowsStore = create<CheckedRowsState>()(
  persist(
    (set) => ({
      checkedRows: {},
      toggleRow: (id: number) =>
        set((state) => {
          const newCheckedRows = { ...state.checkedRows };
          if (newCheckedRows[id]) {
            delete newCheckedRows[id];
          } else {
            newCheckedRows[id] = true;
          }
          return { checkedRows: newCheckedRows };
        }),
    }),
    {
      name: "checked-rows-storage",
    },
  ),
);

//track user uploaded files
export interface FilesState {
  files: any; // Assuming UserFile is your file type
  setFiles: (newFiles: any) => void;
  removeFile: (fileId: number) => void;
  filesDeleting: { [key: number]: boolean }; // New state to track deleting status
  setFileDeleting: (fileId: number, isDeleting: boolean) => void; // Function to update deleting status
  isFileDeleting: (fileId: number) => boolean; // Function to check if a file is being deleted
}

export const useFilesStore = create<FilesState>()(
  persist(
    (set, get) => ({
      files: [],
      setFiles: (newFiles) => set({ files: newFiles }),
      removeFile: (fileId) =>
        set((state) => ({
          files: state.files.filter((file: any) => file.id !== fileId),
        })),
      filesDeleting: {}, // Initialize the deleting status object
      setFileDeleting: (fileId, isDeleting) =>
        set((state) => ({
          filesDeleting: { ...state.filesDeleting, [fileId]: isDeleting },
        })),
      isFileDeleting: (fileId) => get().filesDeleting[fileId] ?? false,
    }),
    {
      name: "user-files-storage",
    },
  ),
);
