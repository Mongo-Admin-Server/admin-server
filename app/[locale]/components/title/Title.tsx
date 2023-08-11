import GenericButton from "@components/ui/button/GenericButton";
import SvgIcon from "@components/ui/icon/SvgIcon";

import styles from './title.module.scss';

interface TitleProps {
  title: string;
  wordingButton?: string;
  onClick?: (action: string) => void;
}

const Title = ({ title, wordingButton, onClick }: TitleProps) => {
  return (
    <section className={styles['title-container']}>
      <h1 className={styles['title-container__title']}>{title}</h1>
      <div className={styles['title-container__buttons']}>
        <GenericButton
          onClick={() => onClick && onClick('search')}
          size="small"
          center
          outline
        >
          <SvgIcon icon_name="search" />
        </GenericButton>
        {wordingButton && (
          <GenericButton
            outline
            center
            size="auto"
            onClick={() => onClick && onClick('add')}
          >
            {wordingButton}
          </GenericButton>
        )}
      </div>
    </section>
  );
}

export default Title;