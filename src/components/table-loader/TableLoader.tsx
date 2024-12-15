import React from "react";
import cx from "classnames";
import styles from "./TableLoader.module.css";
import { ITableLoader } from "./TableLoader.type";

const TableLoader: React.FC<ITableLoader> = ({ rows = 5, columns = 3 }) => {
  return (
    <div className={styles.TableLoader}>
      <table>
        <thead>
          <tr>
            {Array.from({ length: columns }).map((_, index) => (
              <th key={index}>
                <div className={cx(styles.Skeleton, styles.SkeletonHeader)} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {Array.from({ length: columns }).map((_, colIndex) => (
                <td key={colIndex}>
                  <div className={cx(styles.Skeleton, styles.SkeletonCell)} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLoader;