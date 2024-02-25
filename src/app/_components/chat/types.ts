export type ChatMessage = {
  role: "Me" | "Casy";
  content: string;
  isFinal?: boolean;
};

export interface ToggleWithTextProps {
  onChange: () => void;
  isChecked: boolean;
}
