import { useI18n } from '@/shared/locales/clients';

import styles from './table.module.scss';

import SvgIcon from '@/app/[locale]/components/ui/icon/SvgIcon';

interface TableProps {
  data_header?: string[];
  data_body?: any[];
  actions?: string[]; // trash, edit
  display?: string; // initial, block
  no_data?: boolean;
  maxHeight?: string;
  // eslint-disable-next-line no-unused-vars
  onClick?: (action: string, index: number) => void;
}

const Table = ({
  data_header,
  data_body,
  actions,
  display,
  no_data = false,
  maxHeight = '90%',
  onClick,
}: TableProps) => {
  const t = useI18n();

  return (
    <div className={styles['table-container']} style={{ maxHeight }}>
      {no_data ? (
        <div className={styles['no-data']}>{t('document.noDocument')}</div>
      ) : (
        <table className={styles.table} style={{ display }}>
          <thead className={styles.header}>
            <tr>
              {data_header &&
                data_header.map((title, index) => (
                  <th key={index} className={styles.title}>
                    {title}
                  </th>
                ))}
              {actions && <th className={styles.title}></th>}
            </tr>
          </thead>
          <tbody className={styles.body}>
            {data_body && data_body.map((row, index_column) => (
              <tr key={index_column}>
                {data_header &&
                  data_header.map((column, index_data) => (
                    <td key={index_data}>{row[column]}</td>
                  ))}
                <td className={styles.actions}>
                  {actions &&
                    actions.map((action, index_action) => (
                      <SvgIcon
                        key={index_action}
                        icon_name={action}
                        onClick={() => onClick && onClick(action, index_column)}
                      />
                    ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
