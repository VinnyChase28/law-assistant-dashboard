import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CheckedRowsState {
  checkedRows: { [key: number]: boolean };
  toggleRow: (id: number) => void;
}

export const useCheckedRowsStore = create(
  persist(
    (set) => ({
      checkedRows: {},
      toggleRow: (id: number) =>
        set((state: CheckedRowsState) => {
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
      // Optionally, specify a different storage. By default, 'localStorage' is used.
      // storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
