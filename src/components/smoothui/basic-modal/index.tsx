"use client";

import { X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "usehooks-ts";

export type BasicModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

const modalSizes = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  full: "max-w-4xl",
};

export default function BasicModal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
}: BasicModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  useOnClickOutside(modalRef, (e) => {
    // Don't close if clicking on a Radix UI portal (like Select dropdown)
    const target = e.target as HTMLElement;
    
    // Check if any Radix Select is currently open
    const openSelect = document.querySelector('[data-radix-select-content][data-state="open"]');
    if (openSelect) {
      return;
    }
    
    // Check for Radix UI portals and select content
    if (
      target.closest('[data-radix-portal]') ||
      target.closest('[data-slot="select-content"]') ||
      target.closest('[data-radix-select-content]') ||
      target.closest('[data-radix-popper-content-wrapper]') ||
      target.hasAttribute('data-radix-select-item') ||
      target.closest('[role="listbox"]') ||
      target.closest('[data-slot="select-item"]') ||
      target.closest('[data-slot="select-content"]')
    ) {
      return;
    }
    onClose();
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Note: Body scroll locking is handled by the overlay and modal positioning
  // No need to manually set body overflow as it can conflict with other components

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] bg-sidebar/70 backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === overlayRef.current) {
                onClose();
              }
            }}
            ref={overlayRef}
            transition={{ duration: 0.2 }}
          />

          {/* Modal */}
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[90] flex items-center justify-center overflow-y-auto px-4 py-6 sm:p-0"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <motion.div
              animate={{ scale: 1, y: 0, opacity: 1 }}
              className={`${modalSizes[size]} relative mx-auto w-full rounded-xl  bg-sidebar p-4 shadow-xl sm:p-6`}
              exit={{
                scale: 0.95,
                y: 10,
                opacity: 0,
                transition: { duration: 0.15 },
              }}
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              ref={modalRef}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              {/* Header */}
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-medium text-xl leading-6">
                  New Project Allocation
                </h3>

                <motion.button
                  className="ml-auto rounded-full p-1.5 transition-colors hover:bg-background"
                  onClick={onClose}
                  transition={{ duration: 0.2 }}
                  whileHover={{ rotate: 90 }}
                >
                  <X className="h-5 w-5" />
                  <span className="sr-only">Close</span>
                </motion.button>
              </div>

              {/* Content */}
              <div className="relative">{children}</div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  if (!mounted) {
    return null;
  }

  return createPortal(modalContent, document.body);
}
