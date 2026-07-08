import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SearchInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  /** Uncontrolled value */
  defaultValue?: string;
  /** Controlled value */
  value?: string;
  /** Callback for value changes */
  onChange?: (value: string) => void;
  /** Callback for when the user hits Enter or clicks the search icon (if we make it a button) */
  onSearch?: (value: string) => void;
  /** Show a clear (X) button when there is text */
  clearable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Expandable on focus (useful for headers) */
  expandable?: boolean;
  wrapperClassName?: string;
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (
    {
      className,
      wrapperClassName,
      defaultValue,
      value,
      onChange,
      onSearch,
      clearable = true,
      loading = false,
      expandable = false,
      placeholder = "Search...",
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState(defaultValue ?? "");
    const [isFocused, setIsFocused] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Merge refs
    const setRefs = React.useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    const isControlled = value !== undefined;
    const displayValue = isControlled ? value : internalValue;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      if (!isControlled) setInternalValue(val);
      onChange?.(val);
    };

    const handleClear = () => {
      if (!isControlled) setInternalValue("");
      onChange?.("");
      inputRef.current?.focus();
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter" && onSearch) {
        e.preventDefault();
        onSearch(displayValue);
      }
      props.onKeyDown?.(e);
    };

    return (
      <div
        className={cn(
          "relative flex items-center transition-all duration-300",
          expandable && !isFocused && !displayValue ? "w-48" : "w-full",
          expandable && (isFocused || displayValue) ? "w-full sm:w-64" : "",
          wrapperClassName
        )}
      >
        <Search
          className="absolute left-3 h-4 w-4 text-[hsl(var(--muted-foreground))]"
          aria-hidden="true"
        />

        <input
          ref={setRefs}
          type="text"
          value={displayValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholder={placeholder}
          className={cn(
            "h-10 w-full rounded-md border border-[hsl(var(--input))]",
            "bg-[hsl(var(--background))] px-9 py-2 text-sm text-[hsl(var(--foreground))]",
            "placeholder:text-[hsl(var(--muted-foreground))]",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--ring))]",
            "transition-colors disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />

        {loading ? (
          <div className="absolute right-3 flex items-center justify-center">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-[hsl(var(--primary))] border-t-transparent" />
          </div>
        ) : clearable && displayValue ? (
          <button
            type="button"
            onClick={handleClear}
            className={cn(
              "absolute right-2.5 flex h-5 w-5 items-center justify-center rounded-sm",
              "text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--foreground))]",
              "focus:outline-none focus:ring-2 focus:ring-[hsl(var(--ring))]"
            )}
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        ) : null}
      </div>
    );
  }
);

SearchInput.displayName = "SearchInput";

export { SearchInput };
