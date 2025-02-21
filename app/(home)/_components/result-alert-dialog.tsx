import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formValues: Record<string, string>;
}

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  formValues,
}: ConfirmationModalProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Your Selections</AlertDialogTitle>
          <AlertDialogDescription className="space-y-2">
            <p>Please review your selections:</p>
            {Object.entries(formValues).map(([key, value]) => (
              <div key={key} className="flex flex-wrap justify-between">
                <span className="font-medium capitalize">
                  {key.replace(/_/g, " ")}:
                </span>
                <span className="underline inline-block px-2 py-1 bg-black text-white">{value || "Not selected"}</span>
              </div>
            ))}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Generate</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
