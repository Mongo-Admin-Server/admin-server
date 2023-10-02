import { useTranslations } from 'next-intl';
import GenericModal from '@components/modal/generic/GenericModal';

import styles from './export.module.scss';
import Switch from '../../ui/inputs/switch/Switch';
import { useState } from 'react';

interface ExportModalProps {
  open: boolean;
  description: string;
  onValidate?: (format: 'csv' | 'json') => void; 
  onClose: () => void;
}

const ExportModal = ({
  open,
  description,
  onValidate,
  onClose,
}: ExportModalProps) => {

  const t = useTranslations();
  const [format, setFormat] = useState<'csv' | 'json'>('json'); 

  const handleSwitchChange = () => {
    setFormat((prevFormat) => (prevFormat === 'json' ? 'csv' : 'json'));
  };
  
  const handleValidate = () => {
    if (onValidate) {
      onValidate(format);
    }
  };

  return (
    <GenericModal
      open={open}
      title={t('modal.export.title')}
      onClose={onClose}
      onValidate={handleValidate} 
    >
      <div className={styles.container}>
        <p>{description}</p>
        <span className={styles.containerSwitch} >
          <Switch
            selected={format} 
            options={['json', 'csv']} 
            onChange={handleSwitchChange} 
          />
        </span>
      </div>
    </GenericModal>
  );
};

export default ExportModal;
