import cx from "classnames";
import { IPagination, BUTTON_ACTION } from "./Pagination.type";
import usePagination from "./usePagination";
import styles from "./Pagination.module.css";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { EMPTY_PALCEHOLDER, EMPTY_STRING } from "../../utils/constants";

const Pagination: React.FC<IPagination> = ({
  page,
  totalCount,
  onPageSelect,
}) => {
  const { disablePrev, disableNext, pages } = usePagination(page, totalCount);
  const handlePageChange = (type: BUTTON_ACTION) => {
    if (type === BUTTON_ACTION.PREV && page > 1) {
      onPageSelect(page - 1);
    } else if (type === BUTTON_ACTION.NEXT && page < totalCount) {
      onPageSelect(page + 1);
    }
  };

  const getPrevButton = () => {
    return (
      <button
        className={cx(styles.Page, disablePrev && styles.Disable)}
        onClick={() => handlePageChange(BUTTON_ACTION.PREV)}
        disabled={disablePrev}
        aria-label="Go to previous page"
      >
        <FaArrowLeft size={24} />
      </button>
    );
  };

  const getNextButton = () => {
    return (
      <button
        className={cx(styles.Page, disableNext && styles.Disable)}
        onClick={() => handlePageChange(BUTTON_ACTION.NEXT)}
        disabled={disableNext}
        aria-label="Go to next page"
      >
        <FaArrowRight size={14} />
      </button>
    );
  };

  const getPageButton = (eachPage: string) => {
    if (eachPage === EMPTY_PALCEHOLDER)
      return (
        <li>
          <span
            className={cx(styles.Page, styles.Placeholder)}
            aria-hidden="true"
          >
            {eachPage}
          </span>
        </li>
      );

    const isActivePage = page === +eachPage;
    return (
      <li>
        <button
          className={cx(
            styles.Page,
            isActivePage ? styles.Active : EMPTY_STRING
          )}
          onClick={() => onPageSelect(+eachPage)}
          aria-current={isActivePage ? "page" : undefined}
          aria-label={`Go to page ${eachPage}`}
        >
          {eachPage}
        </button>
      </li>
    );
  };

  return (
    <nav className={styles.Pagination} aria-label="Pagination navigation">
      <ul className={styles.PageList}>
        <li>{getPrevButton()}</li>
        {pages.map(getPageButton)}
        <li>{getNextButton()}</li>
      </ul>
    </nav>
  );
};

export default Pagination;
