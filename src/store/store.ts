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
  files: any[]; // Replace 'any' with the appropriate type for your files
  setFiles: (newFiles: any[]) => void;
}


export const useFilesStore = create<FilesState>()(
  persist(
    (set) => ({
      files: [],
      setFiles: (newFiles) => set({ files: newFiles }),
    }),
    {
      name: "user-files-storage", // Unique name for the local storage entry
    }
  )
);


