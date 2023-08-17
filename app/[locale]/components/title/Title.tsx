import GenericButton from "@components/ui/button/GenericButton";
import SvgIcon from "@components/ui/icon/SvgIcon";

import styles from './title.module.scss';

interface TitleProps {
  title: string;
  actions?: string[]; // search, refresh, add
  onClick?: (action: string) => void;
}

const Title = ({ title, actions, onClick }: TitleProps) => {
  return (
    <section className={styles['title-container']}>
      <h1 className={styles['title-container__title']}>{title}</h1>
      <div className={styles['title-container__buttons']}>
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
}

export default Title;