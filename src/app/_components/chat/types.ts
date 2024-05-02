export type ChatMessage = {
  role: "Me" | "Law Assistant AI";
  content: string;
  isFinal?: boolean;
};

export interface ToggleWithTextProps {
  onChange: () => void;
  isChecked: boolean;
}
