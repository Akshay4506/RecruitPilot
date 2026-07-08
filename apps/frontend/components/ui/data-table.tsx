"use client";

import * as React from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Skeleton } from "@/components/loaders/skeleton";
import { EmptyState } from "@/components/display/empty-state";



// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export type SortDirection = "asc" | "desc" | null;

export interface ColumnDef<T> {
  /** Unique key for this column */
  id: string;
  /** Column header label */
  header: string | React.ReactNode;
  /** Key in row data, or function returning a ReactNode */
  accessor?: keyof T;
  /** Custom cell renderer — receives the full row */
  cell?: (row: T, index: number) => React.ReactNode;
  /** Allow sorting by this column */
  sortable?: boolean;
  /** Additional className for <td> */
  className?: string;
  /** Header cell className */
  headerClassName?: string;
  /** Hide on small screens */
  hideOnMobile?: boolean;
}

export interface RowAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (row: T) => void;
  disabled?: (row: T) => boolean;
  destructive?: boolean;
}

export interface DataTablePagination {
  /** Current 1-based page */
  page: number;
  /** Rows per page */
  pageSize: number;
  /** Total rows (from server or derived client-side) */
  total: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
}

export interface DataTableProps<T extends object> {
  /** Row data */
  data: T[];
  /** Column definitions */
  columns: ColumnDef<T>[];
  /** Field used as unique row identifier */
  keyField: keyof T;
  /** Show skeleton rows while loading */
  loading?: boolean;
  /** Number of skeleton rows shown when loading */
  loadingRows?: number;
  /** Enable row checkboxes */
  selectable?: boolean;
  /** Called whenever selection changes */
  onSelectionChange?: (selected: T[]) => void;
  /** Per-row action menu items */
  rowActions?: RowAction<T>[];
  /** Override the entire empty state */
  emptyState?: React.ReactNode;
  /** Controlled pagination (omit for client-side auto-pagination) */
  pagination?: DataTablePagination;
  /** Client-side page size when not using controlled pagination */
  defaultPageSize?: number;
  /** Called on column header click for server-side sort */
  onSort?: (columnId: string, direction: SortDirection) => void;
  /** Additional table className */
  className?: string;
  /** Caption for accessibility */
  caption?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Sort Icon
// ─────────────────────────────────────────────────────────────────────────────
function SortIcon({ direction }: { direction: SortDirection }) {
  if (direction === "asc")
    return <ChevronUp className="h-3.5 w-3.5 text-[hsl(var(--primary))]" aria-hidden />;
  if (direction === "desc")
    return <ChevronDown className="h-3.5 w-3.5 text-[hsl(var(--primary))]" aria-hidden />;
  return (
    <ChevronsUpDown className="h-3.5 w-3.5 text-[hsl(var(--muted-foreground))] opacity-40 group-hover:opacity-80" aria-hidden />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Row Action Menu
// ─────────────────────────────────────────────────────────────────────────────
function RowActionMenu<T>({ row, actions }: { row: T; actions: RowAction<T>[] }) {
  const [open, setOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handler(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="ghost"
        size="icon-sm"
        onClick={() => setOpen((v) => !v)}
        aria-label="Row actions"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>

      {open && (
        <div
          role="menu"
          className={cn(
            "absolute right-0 z-30 mt-1 min-w-[160px] rounded-lg border",
            "border-[hsl(var(--border))] bg-[hsl(var(--popover))]",
            "shadow-[0_10px_30px_0_rgb(0_0_0/0.15)] py-1",
            "animate-[fade-in-up_150ms_ease-out]"
          )}
        >
          {actions.map((action) => {
            const isDisabled = action.disabled?.(row) ?? false;
            return (
              <button
                key={action.label}
                role="menuitem"
                disabled={isDisabled}
                onClick={() => {
                  setOpen(false);
                  action.onClick(row);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 px-3 py-2 text-sm",
                  "transition-colors duration-100",
                  "disabled:pointer-events-none disabled:opacity-40",
                  action.destructive
                    ? "text-[hsl(var(--destructive))] hover:bg-[hsl(var(--destructive)/0.08)]"
                    : "text-[hsl(var(--foreground))] hover:bg-[hsl(var(--accent))]"
                )}
              >
                {action.icon && (
                  <span className="shrink-0 h-4 w-4 flex items-center">{action.icon}</span>
                )}
                {action.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DataTable
// ─────────────────────────────────────────────────────────────────────────────
function DataTable<T extends object>({
  data,
  columns,
  keyField,
  loading = false,
  loadingRows = 6,
  selectable = false,
  onSelectionChange,
  rowActions,
  emptyState,
  pagination,
  defaultPageSize = 10,
  onSort,
  className,
  caption,
}: DataTableProps<T>) {
  // ── Sort state ──────────────────────────────────────────────────────────
  const [sortColumn, setSortColumn] = React.useState<string | null>(null);
  const [sortDir, setSortDir] = React.useState<SortDirection>(null);

  // ── Selection state ─────────────────────────────────────────────────────
  const [selected, setSelected] = React.useState<Set<string>>(new Set());

  // ── Client-side pagination state ────────────────────────────────────────
  const [clientPage, setClientPage] = React.useState(1);
  const [clientPageSize] = React.useState(defaultPageSize);

  // ── Controlled vs client pagination ────────────────────────────────────
  const isControlled = !!pagination;

  // ── Sort logic (client-side only) ──────────────────────────────────────
  const handleSort = (colId: string, sortable?: boolean) => {
    if (!sortable) return;
    let newDir: SortDirection = "asc";
    if (sortColumn === colId) {
      newDir = sortDir === "asc" ? "desc" : sortDir === "desc" ? null : "asc";
    }
    setSortColumn(newDir ? colId : null);
    setSortDir(newDir);
    onSort?.(colId, newDir);
  };

  const sortedData = React.useMemo(() => {
    if (!sortColumn || sortDir === null || isControlled) return data;
    const col = columns.find((c) => c.id === sortColumn);
    if (!col?.accessor) return data;
    return [...data].sort((a, b) => {
      const aVal = a[col.accessor as keyof T];
      const bVal = b[col.accessor as keyof T];
      const aStr = String(aVal ?? "");
      const bStr = String(bVal ?? "");
      return sortDir === "asc" ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
  }, [data, sortColumn, sortDir, columns, isControlled]);

  // ── Client pagination slice ─────────────────────────────────────────────
  const { displayData, totalPages } = React.useMemo(() => {
    if (isControlled) return { displayData: sortedData, totalPages: 1 };
    const total = Math.ceil(sortedData.length / clientPageSize);
    const start = (clientPage - 1) * clientPageSize;
    return { displayData: sortedData.slice(start, start + clientPageSize), totalPages: total };
  }, [sortedData, clientPage, clientPageSize, isControlled]);

  // ── Selection helpers ───────────────────────────────────────────────────
  const getKey = (row: T) => String(row[keyField]);

  const toggleRow = (row: T) => {
    const key = getKey(row);
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      const selectedRows = data.filter((r) => next.has(getKey(r)));
      onSelectionChange?.(selectedRows);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === displayData.length) {
      setSelected(new Set());
      onSelectionChange?.([]);
    } else {
      const all = new Set(displayData.map(getKey));
      setSelected(all);
      onSelectionChange?.(displayData);
    }
  };

  const allChecked = displayData.length > 0 && selected.size === displayData.length;
  const someChecked = selected.size > 0 && selected.size < displayData.length;

  const hasActions = rowActions && rowActions.length > 0;

  // ── Render ──────────────────────────────────────────────────────────────
  return (
    <div className={cn("flex flex-col gap-0", className)}>
      {/* Scrollable table container */}
      <div className="relative w-full overflow-x-auto rounded-xl border border-[hsl(var(--border))]">
        <table
          className="w-full caption-bottom text-sm"
          aria-label={caption}
          aria-busy={loading}
        >
          {caption && (
            <caption className="sr-only">{caption}</caption>
          )}

          {/* ── Head ─────────────────────────────────────────────────── */}
          <thead className="border-b border-[hsl(var(--border))] bg-[hsl(var(--muted)/0.5)]">
            <tr>
              {selectable && (
                <th scope="col" className="w-10 px-3 py-3">
                  <input
                    type="checkbox"
                    checked={allChecked}
                    ref={(el) => { if (el) el.indeterminate = someChecked; }}
                    onChange={toggleAll}
                    aria-label="Select all rows"
                    className="h-4 w-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
                  />
                </th>
              )}

              {columns.map((col) => (
                <th
                  key={col.id}
                  scope="col"
                  className={cn(
                    "px-4 py-3 text-left text-xs font-semibold",
                    "text-[hsl(var(--muted-foreground))] uppercase tracking-wide",
                    "whitespace-nowrap select-none",
                    col.sortable && "cursor-pointer group",
                    col.hideOnMobile && "hidden sm:table-cell",
                    col.headerClassName
                  )}
                  onClick={() => handleSort(col.id, col.sortable)}
                  aria-sort={
                    sortColumn === col.id
                      ? sortDir === "asc" ? "ascending" : "descending"
                      : "none"
                  }
                >
                  <div className="inline-flex items-center gap-1">
                    {col.header}
                    {col.sortable && (
                      <SortIcon direction={sortColumn === col.id ? sortDir : null} />
                    )}
                  </div>
                </th>
              ))}

              {hasActions && (
                <th scope="col" className="w-10 px-3 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              )}
            </tr>
          </thead>

          {/* ── Body ─────────────────────────────────────────────────── */}
          <tbody className="divide-y divide-[hsl(var(--border))] bg-[hsl(var(--card))]">
            {loading ? (
              Array.from({ length: loadingRows }).map((_, i) => (
                <tr key={`skeleton-${i}`} aria-hidden="true">
                  {selectable && (
                    <td className="px-3 py-3.5">
                      <Skeleton className="h-4 w-4" rounded="sm" />
                    </td>
                  )}
                  {columns.map((col) => (
                    <td
                      key={col.id}
                      className={cn("px-4 py-3.5", col.hideOnMobile && "hidden sm:table-cell")}
                    >
                      <Skeleton className="h-4" style={{ width: `${55 + (i * 13 + col.id.length * 7) % 40}%` }} />
                    </td>
                  ))}
                  {hasActions && (
                    <td className="px-3 py-3.5">
                      <Skeleton className="h-7 w-7" rounded="md" />
                    </td>
                  )}
                </tr>
              ))
            ) : displayData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (hasActions ? 1 : 0)}
                  className="py-0"
                >
                  {emptyState ?? (
                    <EmptyState
                      type="default"
                      title="No results found"
                      description="There are no records to display."
                      size="sm"
                    />
                  )}
                </td>
              </tr>
            ) : (
              displayData.map((row, rowIndex) => {
                const key = getKey(row);
                const isSelected = selected.has(key);

                return (
                  <tr
                    key={key}
                    className={cn(
                      "transition-colors duration-100",
                      "hover:bg-[hsl(var(--muted)/0.4)]",
                      isSelected && "bg-[hsl(var(--primary)/0.05)] hover:bg-[hsl(var(--primary)/0.08)]"
                    )}
                    aria-selected={selectable ? isSelected : undefined}
                  >
                    {selectable && (
                      <td className="px-3 py-3.5">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleRow(row)}
                          aria-label={`Select row ${rowIndex + 1}`}
                          className="h-4 w-4 rounded border-[hsl(var(--border))] accent-[hsl(var(--primary))]"
                        />
                      </td>
                    )}

                    {columns.map((col) => (
                      <td
                        key={col.id}
                        className={cn(
                          "px-4 py-3.5 text-sm text-[hsl(var(--foreground))]",
                          col.hideOnMobile && "hidden sm:table-cell",
                          col.className
                        )}
                      >
                        {col.cell
                          ? col.cell(row, rowIndex)
                          : col.accessor
                          ? String(row[col.accessor] ?? "—")
                          : null}
                      </td>
                    ))}

                    {hasActions && (
                      <td className="px-3 py-3.5 text-right">
                        <RowActionMenu row={row} actions={rowActions!} />
                      </td>
                    )}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Client-side pagination footer ──────────────────────────────── */}
      {!isControlled && totalPages > 1 && (
        <div className="flex items-center justify-between px-2 pt-3 text-sm text-[hsl(var(--muted-foreground))]">
          <span>
            {Math.min((clientPage - 1) * clientPageSize + 1, sortedData.length)}–
            {Math.min(clientPage * clientPageSize, sortedData.length)} of {sortedData.length}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="xs"
              disabled={clientPage <= 1}
              onClick={() => setClientPage((p) => p - 1)}
            >
              Previous
            </Button>
            <span className="px-3 text-xs">
              {clientPage} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="xs"
              disabled={clientPage >= totalPages}
              onClick={() => setClientPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export { DataTable };
