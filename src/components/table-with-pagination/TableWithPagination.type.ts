import { IPagination } from "../pagination/Pagination.type";
import { ITable } from "../table/Table.type";

export interface ITableWithPagination extends ITable {
  paginationOptions: IPagination;
  getShowingMessage?: (currentPage: number) => string;
}
