export interface CellRendererParams {
  data: any;
  field: string;
}

export interface ColumnDef {
  key: string;
  label: string;
  cellRenderer?: (props: CellRendererParams) => JSX.Element;
}

export interface BasicRowModel {
  id: string | number;
  [field: string]: any;
}

export interface SingTableProps<T extends BasicRowModel> {
  data: T[];
  columnDefs: ColumnDef[];
  selectionMode?: "single" | "multi";
  onSelectionChanged?: (selectedRowData: T[]) => void;
  darkMode?: boolean;
}

export type SortBy = "asc" | "desc";
export type SortByColumn = null | {
  field: string;
  sortBy: SortBy;
};
