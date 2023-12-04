import { create, StateSelector } from "zustand";
import { persist } from "zustand/middleware";

export interface CheckedRowsState {
  checkedRows: Set<number>;
  toggleRow: (id: number) => void;
}

export const useCheckedRowsStore = create(
  persist(
    (set) => ({
      checkedRows: new Set(),
      toggleRow: (id: number) =>
        set((state: CheckedRowsState) => {
          const newCheckedRows = new Set(state.checkedRows);
          if (newCheckedRows.has(id)) {
            newCheckedRows.delete(id);
          } else {
            newCheckedRows.add(id);
          }
          return { checkedRows: newCheckedRows };
        }),
    }),
    {
      name: "checked-rows-storage", // unique name for the storage item
      // Optionally, specify a different storage. By default, 'localStorage' is used.
      // storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
