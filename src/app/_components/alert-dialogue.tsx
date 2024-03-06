import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AlertDialogComponentProps {
  onConfirm: () => void; // Renamed for clarity
  onCancel?: () => void; // Optional callback for when the user cancels the operation
  triggerLabel: string; // Button label to trigger the dialog
  title: string; // Dialog title
  description: string; // Dialog description
  confirmLabel: string; // Confirm button label
}

export function AlertDialogComponent({
  onConfirm,
  onCancel,
  triggerLabel,
  title,
  description,
  confirmLabel,
}: AlertDialogComponentProps) {

  const buttonPicker =
    triggerLabel === "Cancel Subscription" ? "destructive" : "default";
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default">{triggerLabel}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="default" onClick={onCancel}>
              Cancel
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button variant={buttonPicker} onClick={onConfirm}>
              {confirmLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
