export type ColumnAlignment = "left" | "center" | "right";

export interface TableHeader {
  id: string;
  label: string;
  alignment?: "left" | "center" | "right";
}

export interface TableCell {
  alignment?: "left" | "center" | "right";
  content: React.ReactNode;
}

export interface TableRow {
  id: string;
  cells: TableCell[];
}

export interface ITable {
  id: string;
  headers: TableHeader[];
  rows: TableRow[];
  emptyMessage?: string;
}
