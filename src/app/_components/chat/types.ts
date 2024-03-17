export type ChatMessage = {
  role: "Me" | "CodeX";
  content: string;
  isFinal?: boolean;
};

export interface ToggleWithTextProps {
  onChange: () => void;
  isChecked: boolean;
}
