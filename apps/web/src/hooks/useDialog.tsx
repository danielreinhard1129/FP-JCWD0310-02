'use client';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ReactNode, useState } from 'react';

export const useDialog = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<String>('');
  const [content, setContent] = useState<ReactNode>(undefined);
  const [footer, setFooter] = useState<ReactNode>(undefined);

  const DialogBox = () => {
    return (
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent className="font-rubik">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {content}
          <DialogFooter>{footer}</DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    setOpen,
    DialogBox,
    setTitle,
    setContent,
    setFooter,
  };
};
