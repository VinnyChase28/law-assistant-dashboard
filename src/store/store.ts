import { type File } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";


//track selected files across all tables
export interface CheckedRowsState {
  checkedRows: Record<number, boolean>;
  toggleRow: (id: number) => void;
  deleteAll: () => void;
  uncheckAll: () => void;
}

export const useCheckedRowsStore = create<CheckedRowsState>()(
  persist(
    (set) => ({
      checkedRows: {} as Record<number, boolean>,
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
      deleteAll: () => set({ checkedRows: {} as Record<number, boolean> }), 
      uncheckAll: () =>
        set((state) => {
          const allUnchecked: Record<number, boolean> = Object.keys(
            state.checkedRows,
          ).reduce(
            (acc, key) => {
              const numericKey = Number(key);
              acc[numericKey] = false;
              return acc;
            },
            {} as Record<number, boolean>,
          ); 
          return { checkedRows: allUnchecked };
        }),
    }),
    {
      name: "checked-rows-storage",
    },
  ),
);

//track user uploaded files
export interface FilesState {
  files: File[];
  setFiles: (newFiles: File[]) => void;
  removeFile: (fileId: number) => void;
  filesDeleting: { [key: number]: boolean };
  setFileDeleting: (fileId: number, isDeleting: boolean) => void;
  isFileDeleting: (fileId: number) => boolean;
}

export const useFilesStore = create<FilesState>()(
  persist(
    (set, get) => ({
      files: [],
      setFiles: (newFiles) => set({ files: newFiles }),
      removeFile: (fileId) =>
        set((state) => ({
          files: state.files.filter((file) => file.id !== fileId),
        })),
      filesDeleting: {},
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

export interface ComplianceReportsState {
  reports: File[];
  addReport: (report: File) => void;
  removeReport: (reportId: number) => void;
  setReports: (newReports: File[]) => void;
}

export const useComplianceReportsStore = create<ComplianceReportsState>()(
  persist(
    (set) => ({
      reports: [], 
      addReport: (report) =>
        set((state) => ({ reports: [...state.reports, report] })),
      removeReport: (reportId) =>
        set((state) => ({
          reports: state.reports.filter((report) => report.id !== reportId),
        })),
      setReports: (newReports) => set({ reports: newReports }),
    }),
    {
      name: "compliance-reports-storage",
    },
  ),
);

// Define the interface for your store's state and actions
interface ChatWithDocsState {
  isChatWithDocsEnabled: boolean;
  toggleChatWithDocs: () => void; 
}

// Create the store using Zustand
export const useChatWithDocsStore = create<ChatWithDocsState>()(
  persist(
    (set) => ({
      isChatWithDocsEnabled: true, 
      toggleChatWithDocs: () =>
        set((state) => ({
          isChatWithDocsEnabled: !state.isChatWithDocsEnabled, 
        })),
    }),
    {
      name: "chat-with-docs-feature-storage",
    },
  ),
);

interface ChatSessionState {
  chatSessionId: string | null; // Holds the current chat session ID
  setChatSessionId: (id: string | null) => void; // Method to update the chat session ID
  clearChatSession: () => void; // Method to clear the current chat session
}

export const useChatSessionStore = create<ChatSessionState>()(
  persist(
    (set) => ({
      chatSessionId: null, // Default state is no active session
      setChatSessionId: (id: string | null) => set({ chatSessionId: id }),
      clearChatSession: () => set({ chatSessionId: null }),
    }),
    {
      name: "chat-session-storage", // Unique name for localStorage key
    },
  ),
);
