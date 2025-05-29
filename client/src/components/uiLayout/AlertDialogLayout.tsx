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
import type { ReactNode } from "react";

type alertDialogLayoutProps = {
  trigger: ReactNode;
  title: string;
  description: string;
  buttons: "OK-CANCEL" | "OK" | "CANCEL";
};

const AlertDialogLayout = ({
  trigger,
  title,
  description,
  buttons,
}: alertDialogLayoutProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="w-full text-left">
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {buttons.includes("CANCEL") && (
            <AlertDialogCancel>Cancel</AlertDialogCancel>
          )}
          {buttons.includes("OK") && (
            <AlertDialogAction>Continue</AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogLayout;
