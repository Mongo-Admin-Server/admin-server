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
          width="40px"
          height="40px"
          center
          padding="0"
          border="1px solid #E6E9ED"
        >
          <SvgIcon icon_name="search" />
        </GenericButton>
        {wordingButton && (
          <GenericButton
            onClick={() => onClick && onClick('add')}
            center
            width="auto"
          >
            {wordingButton}
          </GenericButton>
        )}
      </div>
    </section>
  );
}

export default Title;