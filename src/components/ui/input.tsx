import * as React from "react";

import { cn } from "@/lib/utils";

const inputStyles = {
  base: "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background",
  file: "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
  placeholder: "placeholder:text-muted-foreground",
  focus:
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
  disabled: "disabled:cursor-not-allowed disabled:opacity-50",
  responsive: "md:text-sm",
};
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(Object.values(inputStyles).join(" "), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
