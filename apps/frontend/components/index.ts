/**
 * Component Library — Central Export Index
 * ─────────────────────────────────────────
 * Import from "@/components" for all UI components.
 */

// ── UI Primitives ─────────────────────────────────────────────────────────────
export { Button, buttonVariants } from "./ui/button";
export type { ButtonProps } from "./ui/button";

export { Badge, badgeVariants } from "./ui/badge";
export type { BadgeProps } from "./ui/badge";

export { Avatar, AvatarGroup, avatarVariants } from "./ui/avatar";
export type { AvatarProps } from "./ui/avatar";

export { Input, Textarea } from "./ui/input";
export type { InputProps, TextareaProps } from "./ui/input";

export { Separator, Label, ScrollArea, Tooltip, Progress } from "./ui/primitives";

export {
  Dialog, DialogTrigger, DialogPortal, DialogClose,
  DialogOverlay, DialogContent, DialogHeader, DialogFooter,
  DialogTitle, DialogDescription, ConfirmDialog,
} from "./ui/dialog";

export {
  Drawer, DrawerTrigger, DrawerClose, DrawerPortal,
  DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody,
  DrawerFooter, DrawerTitle, DrawerDescription,
} from "./ui/drawer";

export { DataTable } from "./ui/data-table";
export type { DataTableProps, ColumnDef, RowAction, DataTablePagination, SortDirection } from "./ui/data-table";

export { Pagination } from "./ui/pagination";
export type { PaginationProps } from "./ui/pagination";

// ── Cards ─────────────────────────────────────────────────────────────────────
export {
  Card, CardHeader, CardTitle, CardDescription,
  CardContent, CardFooter, cardVariants,
} from "./cards/card";
export type { CardProps } from "./cards/card";

export { MetricCard, Trend } from "./cards/metric-card";
export type { MetricCardProps } from "./cards/metric-card";

// ── Display ───────────────────────────────────────────────────────────────────
export {
  StatusChip, JobStatusChip,
  ApplicationStatusChip, InterviewStatusChip,
  chipVariants,
} from "./display/status-chip";
export type { StatusChipProps } from "./display/status-chip";

export { EmptyState } from "./display/empty-state";
export type { EmptyStateProps } from "./display/empty-state";

export { Timeline, TimelineSkeleton } from "./display/timeline";
export type { TimelineItem, TimelineItemStatus, TimelineActor, TimelineMetadata, TimelineProps } from "./display/timeline";

// ── Charts ────────────────────────────────────────────────────────────────────
export { ChartCard, ChartCardSkeleton, getChartColor, CHART_COLORS } from "./charts/chart-container";
export type { BaseChartCardProps, ChartDataPoint, ChartSeries } from "./charts/chart-container";

export { LineChartCard } from "./charts/line-chart";
export type { LineChartCardProps } from "./charts/line-chart";

export { BarChartCard } from "./charts/bar-chart";
export type { BarChartCardProps } from "./charts/bar-chart";

export { PieChartCard, DonutChartCard } from "./charts/pie-chart";
export type { PieChartCardProps, PieDataPoint } from "./charts/pie-chart";

export { AreaChartCard } from "./charts/area-chart";
export type { AreaChartCardProps } from "./charts/area-chart";

// ── Feedback ─────────────────────────────────────────────────────────────────
export { Alert, alertVariants } from "./feedback/alert";
export type { AlertProps } from "./feedback/alert";

export { toast } from "./feedback/toast";

// ── Loaders ───────────────────────────────────────────────────────────────────
export {
  Skeleton, CardSkeleton, TableSkeleton, TableRowSkeleton,
  ListItemSkeleton, ProfileSkeleton, PageSkeleton,
} from "./loaders/skeleton";

export { Spinner, SectionLoader, PageLoader, DotsLoader } from "./loaders/spinner";

// ── Search & Command ──────────────────────────────────────────────────────────
export { SearchInput } from "./ui/search-input";
export type { SearchInputProps } from "./ui/search-input";

export {
  Command, CommandDialog, CommandInput, CommandList,
  CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator
} from "./ui/command";

// ── Forms & Upload ────────────────────────────────────────────────────────────
export { FileUpload } from "./ui/file-upload";
export type { FileUploadProps, FileUploadState, FileStatus } from "./ui/file-upload";

// ── Filters ───────────────────────────────────────────────────────────────────
export { MultiSelectFilter } from "./filters/multi-select-filter";
export type { MultiSelectFilterProps, FilterOption } from "./filters/multi-select-filter";

export { StatusFilter } from "./filters/status-filter";
export type { StatusFilterProps } from "./filters/status-filter";

export { TagFilter } from "./filters/tag-filter";
export type { TagFilterProps } from "./filters/tag-filter";

export { DateFilter } from "./filters/date-filter";
export type { DateFilterProps, DateRange } from "./filters/date-filter";
