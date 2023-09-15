import { useTranslations } from 'next-intl';

import GenericModal from '@components/modal/generic/GenericModal';

import styles from './confirmModal.module.scss';

interface ConfirmModalProps {
  open: boolean;
  description: string;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmModal = ({
  open,
  description,
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  const t = useTranslations();

  return (
    <GenericModal
      open={open}
      title={t('modal.confirm.title')}
      onClose={onClose}
      onValidate={onConfirm}
    >
      <div className={styles['confirm-modal']}>
        <p>{description}</p>
      </div>
    </GenericModal>
  );
};

export default ConfirmModal;
