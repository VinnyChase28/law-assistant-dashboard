import { create } from "zustand";
import { persist } from "zustand/middleware";


export interface CheckedRowsState {
  checkedRows: { [key: number]: boolean };
  toggleRow: (id: number) => void;
  deleteAll: () => void;
  uncheckAll: () => void; 
}

export const useCheckedRowsStore = create<CheckedRowsState>()(
  persist(
    (set) => ({
      checkedRows: {},
      toggleRow: (id: number) =>
        set((state: any) => {
          const newCheckedRows = { ...state.checkedRows };
          if (newCheckedRows[id]) {
            delete newCheckedRows[id];
          } else {
            newCheckedRows[id] = true;
          }
          return { checkedRows: newCheckedRows };
        }),
      deleteAll: () => set({ checkedRows: {} }),
      uncheckAll: () =>
        set((state: any) => {
          const allUnchecked: Record<number, boolean> = Object.keys(
            state.checkedRows,
          ).reduce((acc: Record<number, boolean>, key) => {
            const numericKey = Number(key); // Convert the key to a number since your keys are numerical
            acc[numericKey] = false; // Set each row's value to false
            return acc;
          }, {});
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

export interface ComplianceReportsState {
  reports: any[]; // It's better to define a more specific type if possible
  addReport: (report: any) => void; // Adjust the type as necessary
  removeReport: (reportId: number) => void;
  setReports: (newReports: any[]) => void; // Function to set the entire reports array
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
      setReports: (newReports) => set(() => ({ reports: newReports })), // Set the entire reports array
    }),
    {
      name: "compliance-reports-storage",
    },
  ),
);

// Define the interface for your store's state and actions
interface ChatWithDocsState {
  isChatWithDocsEnabled: boolean; // Tracks whether the Chat with Docs feature is enabled
  toggleChatWithDocs: () => void; // Method to toggle the state
}

// Create the store using Zustand
export const useChatWithDocsStore = create<ChatWithDocsState>()(
  persist(
    (set) => ({
      isChatWithDocsEnabled: true, // Default state
      toggleChatWithDocs: () =>
        set((state) => ({
          isChatWithDocsEnabled: !state.isChatWithDocsEnabled, // Toggle the state
        })),
    }),
    {
      name: "chat-with-docs-feature-storage", // Unique name for localStorage key
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

