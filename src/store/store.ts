import { type File, type ChatSession } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CheckedRowsState {
  checkedRows: Record<File["id"], boolean>;
  toggleRow: (id: File["id"]) => void;
  deleteAll: () => void;
  uncheckAll: () => void;
  getCheckedComplianceSubmissions: () => File["id"][];
  getCheckedRegulatoryDocuments: () => File["id"][];
}

export const useCheckedRowsStore = create<CheckedRowsState>()(
  persist(
    (set, get) => ({
      checkedRows: {},
      toggleRow: (id: number) =>
        set((state) => {
          const newCheckedRows = { ...state.checkedRows };
          newCheckedRows[id] = !state.checkedRows[id];
          return { checkedRows: newCheckedRows };
        }),
      deleteAll: () => set({ checkedRows: {} }),
      uncheckAll: () =>
        set((state) => {
          const allUnchecked: Record<number, boolean> = {};
          Object.keys(state.checkedRows).forEach((key) => {
            allUnchecked[Number(key)] = false;
          });
          return { checkedRows: allUnchecked };
        }),
      getCheckedComplianceSubmissions: () => {
        const { files } = useFilesStore.getState();
        return Object.keys(get().checkedRows)
          .filter((id) => get().checkedRows[Number(id)])
          .map(Number)
          .filter((id) =>
            files.find(
              (file) =>
                file.id === id && file.documentType === "COMPLIANCE_SUBMISSION",
            ),
          );
      },
      getCheckedRegulatoryDocuments: () => {
        const { files } = useFilesStore.getState();
        return Object.keys(get().checkedRows)
          .filter((id) => get().checkedRows[Number(id)])
          .map(Number)
          .filter((id) =>
            files.find(
              (file) =>
                file.id === id && file.documentType === "REGULATORY_FRAMEWORK",
            ),
          );
      },
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
  removeFile: (fileId: File["id"]) => void;
  filesDeleting: { [key: number]: boolean };
  setFileDeleting: (fileId: File["id"], isDeleting: boolean) => void;
  isFileDeleting: (fileId: File["id"]) => boolean;
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
  removeReport: (reportId: File["id"]) => void;
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
  chatSessionId: ChatSession["id"] | null;
  setChatSessionId: (id: ChatSession["id"] | null) => void;
  clearChatSession: () => void;
}

export const useChatSessionStore = create<ChatSessionState>()(
  persist(
    (set) => ({
      chatSessionId: null, 
      setChatSessionId: (id: string | null) => set({ chatSessionId: id }),
      clearChatSession: () => set({ chatSessionId: null }),
    }),
    {
      name: "chat-session-storage", 
    },
  ),
);
