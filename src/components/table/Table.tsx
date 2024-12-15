import { ITable, TableHeader, TableRow, ColumnAlignment } from "./Table.type";
import { EMPTY_STRING, EMPTY_MESSAGE } from "../../utils/constants";
import styles from "./Table.module.css";

const DEFUALT_ALIGNMENT: ColumnAlignment = "left";

const Table: React.FC<ITable> = (props) => {
  const {
    id = EMPTY_STRING,
    headers = [],
    rows = [],
    emptyMessage = EMPTY_STRING,
  } = props;

  const getHeaders = (headers: TableHeader[] = []): React.ReactNode => {
    if (!Array.isArray(headers))
      return (
        <thead>
          <tr>
            <th scope="col">{EMPTY_STRING}</th>
          </tr>
        </thead>
      );

    const allHeaderTags = headers.map((eachHeader: TableHeader) => (
      <th
        key={eachHeader.id}
        align={eachHeader.alignment || DEFUALT_ALIGNMENT}
        scope="col"
        className={styles.TableHead}
      >
        {eachHeader.label}
      </th>
    ));

    return (
      <thead>
        <tr>{allHeaderTags}</tr>
      </thead>
    );
  };

  const getBody = (rows: TableRow[] = []): React.ReactNode => {
    if (!Array.isArray(rows)) {
      const message: string = emptyMessage || EMPTY_MESSAGE;
      return (
        <tbody>
          <tr>
            <td
              scope="row"
              align="center"
              colSpan={10}
              className={styles.TableData}
            >
              {message}
            </td>
          </tr>
        </tbody>
      );
    }

    const getEachRow = (row: TableRow) => {
      return (
        <tr key={row.id}>
          {row.cells.map((eachCell, index) => {
            return (
              <td
                key={`${row.id}-${index}`}
                scope="row"
                align={eachCell.alignment || DEFUALT_ALIGNMENT}
                className={styles.TableData}
              >
                {eachCell.content}
              </td>
            );
          })}
        </tr>
      );
    };

    return <tbody>{rows.map(getEachRow)}</tbody>;
  };

  return (
    <table id={id} className={styles.Table}>
      {getHeaders(headers)}
      {getBody(rows)}
    </table>
  );
};

export default Table;
