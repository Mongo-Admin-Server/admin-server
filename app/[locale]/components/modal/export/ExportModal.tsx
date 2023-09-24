import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useTranslations } from 'next-intl';

import SvgIcon from '@components/ui/icon/SvgIcon';
import GenericButton from '@components/ui/button/GenericButton';

import styles from './export.module.scss';

interface ExportModalProps {
  open: boolean;
  title: string;
  typeButton?: 'submit' | 'button';
  cancelLabelTrad?: string;
  withButton?: boolean;
  description: string;
  disabledButton?: boolean;
  onClose: () => void;
  confirmLabelCsv?: string;
  confirmLabelJson? : string;
  onExport: (format: 'csv' | 'json') => void;
}

const ExportModal = ({ open, title, description, onExport, cancelLabelTrad, confirmLabelCsv, confirmLabelJson, typeButton = 'button', disabledButton = false, withButton = true, onClose }: ExportModalProps) => {
  const t = useTranslations();
  const modalRef = useRef(null);

  const confirmCsvText = useMemo(() => {
    if (confirmLabelCsv) return confirmLabelCsv
    return t('modal.export.csv');
  
  }, [confirmLabelCsv, t])

  const confirmJsonText = useMemo(() => {
    if (confirmLabelJson) return confirmLabelJson
    return t('modal.export.json');
  
  }, [confirmLabelJson, t])

  const cancelText = useMemo(() => {
    if (cancelLabelTrad) return cancelLabelTrad
    return t('modal.button.cancel');
  
  }, [cancelLabelTrad, t])

  const dialogClasses = useMemo(() => {
    const _arr = [styles["modal"]];
    if (!open) _arr.push(styles["modal--closing"]);

    return _arr.join(" ");
  }, [open]);

  const onCancel = useCallback(
    (event: any) => {
      event.preventDefault();
      onClose();
    },
    [onClose]
  );

  const onClick = useCallback(
    ({ target }: any) => {
      const { current: el } = modalRef;
      if (target === el) onClose();
    },
    [onClose]
  );

  const onAnimEnd = useCallback(() => {
    const { current: el }: any = modalRef;
    if (!open) el.close();
  }, [open]);

  useEffect(() => {
    const { current: el }: any = modalRef;
    if (open) el.showModal();
  }, [open]);

const handleExport = (format: 'csv' | 'json') => {
    onExport(format);
    onClose();
  }

  return (
    <dialog
      ref={modalRef}
      className={dialogClasses}
      onClose={onClose}
      onCancel={onCancel}
      onClick={onClick}
      onAnimationEnd={onAnimEnd}
    >
      <section className={styles["modal__header"]}>
        <div className={styles["modal__header--icon"]}>
          <SvgIcon icon_name="close" onClick={onClose} />
        </div>
        <h2>{title}</h2>
      </section>
      <section className={styles["modal__container"]}>
      <center><p>{description}</p></center>
      </section>
      {withButton && (
        <section className={styles["modal__footer"]}>
          <GenericButton
            center
            outline
            onClick={onClose}
          >
            {cancelText}
          </GenericButton>
          <GenericButton
            type={typeButton}
            disabled={disabledButton}
            center
            onClick={() => handleExport('csv')} >
              {confirmCsvText}
          </GenericButton>
          <GenericButton
            type={typeButton}
            disabled={disabledButton}
            center
            onClick={() => handleExport('json')} > 
              {confirmJsonText}
          </GenericButton>
        </section>
      )}
    </dialog>
  );
}

export default ExportModal;