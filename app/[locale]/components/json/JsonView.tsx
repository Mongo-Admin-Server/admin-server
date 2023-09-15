import { JsonViewer } from '@textea/json-viewer';

import styles from './jsonView.module.scss';

import { useSelector } from '@/store/store';
import { selectTheme } from '@/domain/usecases/setting-slice';

interface JsonViewProps {
  json: JSON;
}

const JsonView = ({ json }: JsonViewProps) => {
  const theme: any = useSelector(selectTheme)

  return (
    <div className={styles['json-view-wrapper']}>
      <JsonViewer 
        value={json} 
        theme={theme}
        displayDataTypes={false}
        displaySize={false}
        style={{ padding: '20px', backgroundColor: 'transparent' }} 
      />
    </div>
  );
};

export default JsonView;