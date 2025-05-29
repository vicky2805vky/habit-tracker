import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { ReactNode } from "react";

type dialogLayoutProps = {
  trigger: ReactNode;
  triggerStyle?: string;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
};

<button className=""></button>;

const DialogLayout = ({
  trigger,
  triggerStyle,
  title,
  description,
  children,
  footer,
}: dialogLayoutProps) => {
  return (
    <Dialog>
      <DialogTrigger className={triggerStyle}>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
      </DialogContent>
      {children}
      <DialogFooter>{footer}</DialogFooter>
    </Dialog>
  );
};

export default DialogLayout;
