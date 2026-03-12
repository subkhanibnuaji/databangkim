"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface SelectContextValue {
  items: Array<{ value: string; label: string }>;
  value?: string;
  onValueChange?: (value: string) => void;
}

const SelectContext = React.createContext<SelectContextValue | null>(null);

function extractText(children: React.ReactNode): string {
  let text = "";

  React.Children.forEach(children, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      text += child;
      return;
    }

    if (React.isValidElement(child)) {
      text += extractText((child.props as { children?: React.ReactNode }).children);
    }
  });

  return text.trim();
}

function collectItems(children: React.ReactNode): Array<{ value: string; label: string }> {
  const items: Array<{ value: string; label: string }> = [];

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return;

    if (child.type === SelectItem) {
      items.push({
        value: (child.props as { value: string }).value,
        label: extractText((child.props as { children?: React.ReactNode }).children),
      });
      return;
    }

    items.push(...collectItems((child.props as { children?: React.ReactNode }).children));
  });

  return items;
}

function useSelectContext() {
  const context = React.useContext(SelectContext);

  if (!context) {
    throw new Error("Select components must be used within Select.");
  }

  return context;
}

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({ value, onValueChange, children }: SelectProps) {
  const items = React.useMemo(() => collectItems(children), [children]);

  return (
    <SelectContext.Provider value={{ items, value, onValueChange }}>
      {children}
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps extends React.HTMLAttributes<HTMLDivElement> {
  id?: string;
  "aria-label"?: string;
}

function SelectTrigger({ className, children, id, "aria-label": ariaLabel }: SelectTriggerProps) {
  const { items, value, onValueChange } = useSelectContext();
  const childrenArray = React.Children.toArray(children);
  const valueChild = childrenArray.find(
    (child) => React.isValidElement(child) && child.type === SelectValue
  ) as React.ReactElement<{ placeholder?: string }> | undefined;
  const adornments = childrenArray.filter(
    (child) => !(React.isValidElement(child) && child.type === SelectValue)
  );

  return (
    <div
      className={cn(
        "relative inline-flex h-10 w-full items-center rounded-lg border border-border-color bg-input-bg text-foreground shadow-sm",
        className
      )}
    >
      {adornments.length > 0 && (
        <div className="pointer-events-none absolute left-3 flex items-center gap-1.5 text-muted-foreground">
          {adornments}
        </div>
      )}

      <select
        id={id}
        value={value}
        onChange={(event) => onValueChange?.(event.target.value)}
        aria-label={ariaLabel ?? valueChild?.props.placeholder}
        className={cn(
          "h-full w-full appearance-none bg-transparent pr-9 text-sm outline-none",
          adornments.length > 0 ? "pl-9" : "pl-3"
        )}
      >
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>

      <ChevronDown className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
    </div>
  );
}

function SelectValue(props: { placeholder?: string }) {
  void props;
  return null;
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectItem(props: { value: string; children: React.ReactNode }) {
  void props;
  return null;
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
