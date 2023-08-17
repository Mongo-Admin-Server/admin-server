import styles from './tableSkeleton.module.scss';

const TableSkeleton = () => {
  const colnm = 4;
  const rownm = 6;

  return (
    <table className={styles['table-skeleton']}>
      <thead>
        <tr>
          {Array.from(Array(colnm).keys()).map((_, index) => (
            <th key={index}>
              <div></div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={styles['table-skeleton--tbody']}>
        {Array.from(Array(rownm).keys()).map((_, i) => (
          <tr key={i} className={styles['table-skeleton--tbody--tr']}>
            {Array.from(Array(colnm).keys()).map((_, j) => (
              <td key={j} className={styles['table-skeleton--tbody--tr--td']}>
                <div
                  className={styles['table-skeleton--tbody--tr--td--div']}
                ></div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSkeleton;
