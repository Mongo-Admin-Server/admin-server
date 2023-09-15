import { JsonViewer } from '@textea/json-viewer';
import React, { useEffect, useState } from 'react';

import styles from './documentJson.module.scss';

const DocumentJson = (data: any) => {

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
    <div className={`${styles.container}`}>
      <JsonViewer value={data} theme={themeFront}/>
    </div>
  );
};

export default DocumentJson;