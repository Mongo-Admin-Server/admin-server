import styles from './table.module.scss';

import SvgIcon from '@components/ui/icon/SvgIcon';

interface TableProps {
  data_header: string[];
  data_body: any[];
  actions?: string[]; // trash, edit 
  display?: string; // initial, block
  // eslint-disable-next-line no-unused-vars
  onClick?: (action: string, index: number) => void;
}

const Table = ({ data_header, data_body, actions, display = "initial", onClick }: TableProps) => {
  return (
    <table className={styles.table} style={{ display }}>
      <thead className={styles.header}>
        <tr>
          {data_header.map((title, index) => (
            <th key={index} className={styles.title}>{title}</th>
          ))}
          {actions && actions.map((_, index) => (
            <th key={index} className={styles.title}></th>
          ))}
        </tr>
      </thead>
      <tbody className={styles.body}>
        {data_body.map((row, index_column) => (
          <tr key={index_column}>
            {data_header.map((column, index_data) => (
              <td key={index_data}>{row[column]}</td>
            ))}
            {actions && actions.map((action, index_action) => (
              <td key={index_action}>
                <SvgIcon icon_name={action} onClick={() => onClick && onClick(action, index_column)} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;