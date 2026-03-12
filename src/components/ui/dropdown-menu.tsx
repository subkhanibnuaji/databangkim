"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface DropdownMenuContextValue {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropdownMenuContext = React.createContext<DropdownMenuContextValue | null>(null);

function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);

  if (!context) {
    throw new Error("Dropdown menu components must be used within DropdownMenu.");
  }

  return context;
}

function DropdownMenu({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <DropdownMenuContext.Provider value={{ open, setOpen }}>
      <div ref={containerRef} className="relative inline-flex">
        {children}
      </div>
    </DropdownMenuContext.Provider>
  );
}

interface DropdownMenuTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}

function DropdownMenuTrigger({ asChild = false, children }: DropdownMenuTriggerProps) {
  const { setOpen } = useDropdownMenuContext();
  const childElement = React.isValidElement(children)
    ? (children as React.ReactElement<{ onClick?: (event: React.MouseEvent) => void }>)
    : null;

  const handleClick = (event: React.MouseEvent) => {
    setOpen((prev) => !prev);
    if (childElement && typeof childElement.props.onClick === "function") {
      childElement.props.onClick(event);
    }
  };

  if (asChild && childElement) {
    return React.cloneElement(childElement, {
      onClick: handleClick,
    });
  }

  return (
    <button type="button" onClick={handleClick}>
      {children}
    </button>
  );
}

function DropdownMenuContent({
  children,
  className,
  align = "start",
}: {
  children: React.ReactNode;
  className?: string;
  align?: "start" | "end";
}) {
  const { open } = useDropdownMenuContext();

  if (!open) return null;

  return (
    <div
      className={cn(
        "absolute top-full z-50 mt-2 min-w-40 rounded-xl border border-border-color bg-card-bg p-1 shadow-lg",
        align === "end" ? "right-0" : "left-0",
        className
      )}
    >
      {children}
    </div>
  );
}

function DropdownMenuLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("px-3 py-2 text-sm", className)}>{children}</div>;
}

function DropdownMenuSeparator({ className }: { className?: string }) {
  return <div className={cn("my-1 h-px bg-border-color", className)} />;
}

function DropdownMenuItem({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const { setOpen } = useDropdownMenuContext();

  return (
    <button
      type="button"
      onClick={() => {
        onClick?.();
        setOpen(false);
      }}
      className={cn(
        "flex w-full items-center rounded-lg px-3 py-2 text-sm text-foreground transition-colors hover:bg-card-hover",
        className
      )}
    >
      {children}
    </button>
  );
}

export {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
};
