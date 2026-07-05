"use client";

import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/shared/Button";

type ModalProps = {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ open, title, children, onClose }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 p-4 sm:items-center">
      <div className="w-full max-w-lg rounded-lg bg-white shadow-soft">
        <div className="flex items-center justify-between border-b border-brand-border px-5 py-4">
          <h2 className="text-lg font-bold text-brand-text">{title}</h2>
          <Button
            aria-label="Close modal"
            title="Close"
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
