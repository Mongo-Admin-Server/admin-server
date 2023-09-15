import GenericButton from "@components/ui/button/GenericButton";
import SvgIcon from "@components/ui/icon/SvgIcon";

import styles from './title.module.scss';
import Checkbox from "../ui/inputs/checkbox/Checkbox";
import { useEffect, useState } from "react";

interface TitleProps {
  title: string;
  actions?: string[]; // search, refresh, add
  onClick?: (action: string) => void;
  withJsonSwitch?: boolean;
  showJson?: boolean;
  setShowJson?: (value: boolean) => void;
}

const Title = ({ title, actions, onClick, showJson, setShowJson, withJsonSwitch }: TitleProps) => {

  const handleJsonToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowJson && setShowJson(e.target.checked);
  };

  const [themeFront, setThemeFront] = useState<any>('');


  useEffect(() => {

    const handleThemeChange = () => {
      const htmlElement = document.querySelector('html');

      if (htmlElement) {
        const themeAttributeHTML = htmlElement.getAttribute('data-theme');
        
        if(themeAttributeHTML === 'dark'){
          setThemeFront('dark');
        } else if(themeAttributeHTML === 'light'){
          setThemeFront('light');
        } else {
          setThemeFront('auto');
        }
      }
    }

    const observer = new MutationObserver(handleThemeChange)
    const htmlElement = document.querySelector('html');



    if (htmlElement) {
      observer.observe(htmlElement, { attributes: true });

      handleThemeChange();

      return () => {
        observer.disconnect();
      };
    }
  }, [])

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
        {withJsonSwitch &&
          <Checkbox
            label="Afficher JSON"
            value={showJson ? showJson : false}
            onChange={handleJsonToggle}
            color={themeFront}
          />
        }
      </div>
    </section>
  );
}

export default Title;