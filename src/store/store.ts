import { create } from "zustand";

interface CheckedRowsState {
  checkedRows: Set<number | string>;
  toggleRow: (id: number | string) => void;
}

export const useCheckedRowsStore = create<CheckedRowsState>((set) => ({
  checkedRows: new Set(),
  toggleRow: (id) =>
    set((state) => {
      const newCheckedRows = new Set(state.checkedRows);
      if (newCheckedRows.has(id)) {
        newCheckedRows.delete(id);
      } else {
        newCheckedRows.add(id);
      }
      return { checkedRows: newCheckedRows };
    }),
}));
