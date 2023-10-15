import GenericButton from '@components/ui/button/GenericButton';
import SvgIcon from '@components/ui/icon/SvgIcon';
import Switch from '@components/ui/inputs/switch/Switch';
import GenericInput from '@components/ui/inputs/generic/GenericInput';

import styles from './title.module.scss';

interface TitleProps {
  title: string;
  actions?: string[]; // refresh, add
  isViewSearch?: boolean;
  searchValue?: string;
  searchPlaceholder?: string;
  isViewFromat?: boolean;
  viewFormat?: string;
  showPage?: boolean;
  currentPage?: string;
  listPage?: string[];
  changeSearchValue?: (searchValue: string) => void;
  changeViewFormat?: (viewFormat: string) => void;
  changePage?: (page: string) => void;
  enterSearchValue?: () => void;
  onClick?: (action: string) => void;
}

const Title = ({
  title,
  actions,
  isViewFromat = false,
  viewFormat = 'table',
  isViewSearch,
  searchValue = '',
  searchPlaceholder,
  showPage = false,
  currentPage = '',
  listPage = [],
  changeSearchValue,
  changeViewFormat,
  changePage,
  enterSearchValue,
  onClick,
}: TitleProps) => {
  return (
    <section className={styles['title-container']}>
      <div className={styles['title-container__header']}>
        <h1 className={styles['title-container__title']}>{title}</h1>
        {showPage && (
          <Switch
            selected={currentPage}
            options={listPage}
            onChange={(value: string) =>
              changePage && changePage(value)
            }
          />
        )}
      </div>

      <div className={styles['title-container__buttons']}>
      {isViewFromat && (
          <Switch
            selected={viewFormat}
            options={['table', 'json']}
            onChange={(value: string) =>
              changeViewFormat && changeViewFormat(value)
            }
          />
        )}
        {isViewSearch && (
          <GenericInput
            className={styles['search-input']}
            type="text"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) =>
              changeSearchValue && changeSearchValue(e.target.value)
            }
            onKeyDownEnter={() => enterSearchValue && enterSearchValue()}
          />
        )}
        {actions?.map((action, index) => (
          <GenericButton
            key={index}
            outline
            center
            size="small"
            onClick={() => onClick && onClick(action)}
          >
            <SvgIcon icon_name={action} />
          </GenericButton>
        ))}
      </div>
    </section>
  );
};

export default Title;
