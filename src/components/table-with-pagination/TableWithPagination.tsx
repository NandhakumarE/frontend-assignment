import Pagination from "../pagination/Pagination";
import Table from "../table/Table";
import { ITableWithPagination } from "./TableWithPagination.type";
import styles from "./TableWithPagination.module.css";

const TableWithPagination: React.FC<ITableWithPagination> = (props) => {
  const {
    id,
    headers,
    rows,
    emptyMessage,
    paginationOptions,
    getShowingMessage,
  } = props;

  return (
    <div className={styles.TableWithPagination}>
      <Table
        id={id}
        headers={headers}
        rows={rows}
        emptyMessage={emptyMessage}
      />
      <div className={styles.PaginationContainer}>
        <span className={styles.Message}>
          {getShowingMessage?.(
            paginationOptions.totalCount,
            paginationOptions.page
          )}
        </span>
        <Pagination {...paginationOptions} />
      </div>
    </div>
  );
};

export default TableWithPagination;
