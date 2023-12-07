import { create } from "zustand";
import { persist } from "zustand/middleware";
import { UserFile } from "src/app/files/page";

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
  files: UserFile[]; // Assuming UserFile is your file type
  setFiles: (newFiles: UserFile[]) => void;
  removeFile: (fileId: number) => void; // Add this line
}

export const useFilesStore = create<FilesState>()(
  persist(
    (set) => ({
      files: [],
      setFiles: (newFiles) => set({ files: newFiles }),
      removeFile: (fileId) =>
        set((state) => ({
          files: state.files.filter((file) => file.id !== fileId),
        })),
    }),
    {
      name: "user-files-storage",
    },
  ),
);