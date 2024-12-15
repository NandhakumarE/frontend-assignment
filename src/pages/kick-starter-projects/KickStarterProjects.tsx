import TableLoader from "../../components/table-loader/TableLoader";
import TableWithPagination from "../../components/table-with-pagination/TableWithPagination";
import { TableHeader, TableRow } from "../../components/table/Table.type";
import { IProjectDetails } from "../../utils/types";
import useKickStarterProjects from "./useKickStarterProjects";
import styles from "./KickStarterProject.module.css";

const KickStarterProjects = () => {
  const {
    page,
    isLoading,
    totalPageCount,
    setPage,
    getPaginatedData,
    constructShowingMessage,
  } = useKickStarterProjects();

  // Defines the table headers.
  const getHeaders = (): TableHeader[] => [
    { id: "s.no", label: "S.No." },
    { id: "percentage.funded", label: "Percentage funded" },
    { id: "amt.pledged", label: "Amount pledged" },
  ];

  // Maps data to table rows.
  const getRows = (): TableRow[] => {
    const data: IProjectDetails[] = getPaginatedData();
    const rowData: TableRow[] = [];
    data.forEach((project) => {
      const eachRow: TableRow = {
        id: project.sNo.toString(),
        cells: [
          { content: project.sNo },
          { content: project.percentageFunded },
          { content: project.amtPledged },
        ],
      };
      rowData.push(eachRow);
    });
    return rowData;
  };

  if (isLoading) {
    return <TableLoader />;
  }

  return (
    <div className={styles.Container}>
      <h1 className={styles.Title}>Kick Starter Project</h1>
      <TableWithPagination
        id="kickstarter-table"
        headers={getHeaders()}
        rows={getRows()}
        getShowingMessage={constructShowingMessage}
        paginationOptions={{
          page: page,
          totalCount: totalPageCount,
          onPageSelect: setPage,
        }}
      />
    </div>
  );
};

export default KickStarterProjects;
