import { useState } from "react";

import GenericButton from "@components/ui/button/GenericButton";
import SvgIcon from "@components/ui/icon/SvgIcon";
import Switch from "@components/ui/inputs/switch/Switch";

import styles from './title.module.scss';

interface TitleProps {
  title: string;
  actions?: string[]; // search, refresh, add
  isViewFromat?: boolean;
  viewFormat?: string;
  changeViewFormat?: (viewFormat: string) => void;
  onClick?: (action: string) => void;
}

const Title = ({ title, actions, isViewFromat = false, viewFormat = 'table', changeViewFormat, onClick }: TitleProps) => {
  return (
    <section className={styles['title-container']}>
      <div className={styles['title-container__header']}>
        <h1 className={styles['title-container__title']}>{title}</h1>
        {isViewFromat && (
          <Switch
            selected={viewFormat}
            options={['table', 'json']}
            onChange={(value: string) => changeViewFormat && changeViewFormat(value)}
          />
        )}
      </div>

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