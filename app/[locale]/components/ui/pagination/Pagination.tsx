'use client';
import { useMemo, useState } from 'react';

import styles from './pagination.module.scss';

import SelectInput from '@components/ui/inputs/select/SelectInput';
import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericButton from '@components/ui/button/GenericButton';
import SvgIcon from '@components/ui/icon/SvgIcon';

import { useI18n } from '@/shared/locales/clients';

interface PaginationProps {
  total: number;
  currentPage: number;
  pageSizes: number[];
  pageSize: number;
  onChange: (page: number) => void;
  onPageSizeChange: (pageSize: number) => void;
}

const Pagination = ({ total = 10, currentPage = 1, pageSizes = [10, 50, 100, 200], pageSize = 10, onChange, onPageSizeChange }: PaginationProps) => {
  const t = useI18n();
  
  const [showPrevMore, setShowPrevMore] = useState(false);
  const [showNextMore, setShowNextMore] = useState(false);
  const [quickPrevHover, setQuickPrevHover] = useState(false);
  const [quickNextHover, setQuickNextHover] = useState(false);

  const pagerCount = 7;

  const formattedPageSizes = useMemo(() => {
    return pageSizes.map((pageSize) => ({
      value: pageSize.toString(),
      label: pageSize.toString()
    }));
  }, [pageSizes]);

  const pageCount = useMemo(() => {
    return Math.ceil(total / pageSize);
  }, [total, pageSize]);

  const pagers = useMemo(() => {
    const halfPagerCount = (pagerCount - 1) / 2;
    setShowNextMore(false);
    setShowPrevMore(false);
    if (pageCount > pagerCount) {
      if (currentPage > pagerCount - halfPagerCount) {
        setShowNextMore(true);
      }
      if (currentPage < pageCount - halfPagerCount) {
        setShowNextMore(true);
      }
    }
    const array: number[] = [];
    if (showPrevMore && !showNextMore) {
      const startPage = pageCount - (pagerCount - 2);
      for (let i = startPage; i < pageCount; i++) {
        array.push(i);
      }
    } else if (!showPrevMore && showNextMore) {
      for (let i = 2; i < pagerCount; i++) {
        array.push(i);
      }
    } else if (showPrevMore && showNextMore) {
      const offset = Math.floor(pagerCount / 2) - 1;
      for (let i = currentPage - offset; i <= currentPage + offset; i++) {
        array.push(i);
      }
    } else {
      for (let i = 2; i < pageCount; i++) {
        array.push(i);
      }
    }
    console.log('pagers: ', array);
    return array;
  }, [pageCount, currentPage, showPrevMore, showNextMore]);

  const onClickQuickPrev = () => {
    const page: any = pagers ? pagers.shift() : 0;
    onChange(page - 1);
  };

  const onClickQuickNext = () => {
    const page: any = pagers ? pagers.pop() : 0;
    onChange(page + 1);
  };

  const handleUpdateCurrentPage = (page: number) => {
    if(page > pageCount) return onChange(pageCount);
    if(page < 1) return onChange(1);
    return onChange(page);
  };

  const onMouseEnter = (forward: boolean = false) => {
    forward ? setQuickPrevHover(true) : setQuickNextHover(true);
  };

  return (
    <section className={styles['pagination']}>
      <SelectInput
        options={formattedPageSizes}
        value={pageSize.toString()}
        onChange={(event) => onPageSizeChange(parseInt(event.target.value))}
      />
      <div className={styles['pagination__pages']}> 
        <GenericButton
          icon_name='chevronLeft'
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === 1}
          transparent
        />

        <ul className={styles['pagination-item']}>
          {pageCount > 0 && (
            <li
              className={`${styles['pagination-item__number']} ${currentPage === 1 && styles['active']}`}
              aria-current={currentPage === 1}
            >
              1
            </li>
          )}
          {showPrevMore && (
            <li
              className={`${styles['ellipsis']} ${styles['more']} ${styles['btn-quickprev']}`}
              onClick={onClickQuickPrev}
              onMouseLeave={() => setQuickPrevHover(false)}
              onMouseEnter={() => onMouseEnter(true)}
            >
              {quickPrevHover ? (
                <SvgIcon icon_name='chevronsLeft' />
              ) : (
                <SvgIcon icon_name='elipsis' className={styles['icon-elipsis']} />
              )}
            </li>
          )}
          {pagers.length}
          {pagers.map((page, index) => (
            <li
              key={index}
              className={`${styles['pagination-item__number']} ${currentPage === page && styles['active']}`}
              aria-current={currentPage === page}
              onClick={() => onChange(page)}
            >
              {page}
            </li>
          ))}
          {showNextMore && (
            <li
              className={`${styles['ellipsis']} ${styles['more']} ${styles['btn-quicknext']}`}
              onClick={onClickQuickNext}
              onMouseLeave={() => setQuickNextHover(false)}
              onMouseEnter={() => onMouseEnter()}
            >
              {quickNextHover ? (
                <SvgIcon icon_name='chevronsRight' />
              ) : (
                <SvgIcon icon_name='elipsis' className={styles['icon-elipsis']} />
              )}
            </li>
          )}
          {pageCount > 1 && (
            <li
              className={styles['pagination-item__number']}
              aria-current={currentPage === pageCount}
            >
              {pageCount}
            </li>
          )}
        </ul>

        <GenericButton
          icon_name='chevronRight'
          onClick={() => onChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          transparent
        />
      </div>

      <div className={styles['pagination__jump']}>
        {t('pagination.jumpTo')}
        <GenericInput
          type='number'
          value={currentPage.toString()}
          onChange={(event) => handleUpdateCurrentPage(parseInt(event.target.value))}
        />
      </div>
    </section>
  );
};

export default Pagination;
