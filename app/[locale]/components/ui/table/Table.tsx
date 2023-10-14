import { useTranslations } from 'next-intl';

import styles from './table.module.scss';
import '@/shared/styles/main.scss';

import SvgIcon from '@/app/[locale]/components/ui/icon/SvgIcon';
import { useEffect, useRef, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

interface TableProps {
  data_header?: string[];
  data_body?: any[];
  actions?: string[]; // trash, edit
  display?: string; // initial, block
  no_data?: boolean;
  check_data?: boolean;
  // eslint-disable-next-line no-unused-vars
  onClick?: (action: string, index: number) => void;
}

const Table = ({
  data_header,
  data_body,
  actions,
  display,
  no_data = false,
  check_data = false,
  onClick,
}: TableProps) => {
  const t = useTranslations();

  const [scrollYActive, setScrollYActive] = useState(false);
  const [scrollXActive, setScrollXActive] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const tableRef = useRef<HTMLTableElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      
      if (divRef.current) {
        if(tableRef.current){
          const maxWidth = divRef.current.offsetWidth;
          const maxHeight = divRef.current.offsetHeight
          if(tableRef.current.offsetWidth > maxWidth) {
            setScrollYActive(true);
          } else {
            setScrollYActive(false);
          }
          if (tableRef.current.offsetHeight > maxHeight) {
            setScrollXActive(true);
          } else {
            setScrollXActive(false);
          }
        }
      }
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (divRef.current) {
      resizeObserver.observe(divRef.current);
    }

    handleResize();

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  const renderData = (data: any) => {
    if (!check_data) return data
    
    if (typeof data === 'object') return `{} ${Object.values(data).length} documents`;
    if (Array.isArray(data)) return `[] ${data.length} documents`;
    return data;
  };

  return (
    <div ref={divRef} className={`${styles.tableContainer} scrollable ${scrollYActive ? styles.scroll_y_active : ''} ${scrollXActive ? styles.scroll_x_active : ''}`}>
      {no_data ? (
        <div className={styles['no-data']}>{t('document.noDocument')}</div>
      ) : (
        <table ref={tableRef} className={styles.table} style={{ display }}>
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
                    <td key={index_data}>{renderData(row[column])}</td>
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
