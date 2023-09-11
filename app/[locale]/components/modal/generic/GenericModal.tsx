import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useI18n } from '@/shared/locales/clients';

import SvgIcon from '@components/ui/icon/SvgIcon';
import GenericButton from '@components/ui/button/GenericButton';

import styles from './modal.module.scss';

interface GenericModalProps {
  open: boolean;
  title: string;
  confirmLabelTrad?: string;
  typeButton?: 'submit' | 'button';
  cancelLabelTrad?: string;
  withButton?: boolean;
  disabledButton?: boolean;
  children: React.ReactNode;
  onClose: () => void;
  onValidate?: () => void;
}

const GenericModal = ({ open, title, confirmLabelTrad, cancelLabelTrad, typeButton = 'button', disabledButton = false, withButton = true, children, onClose, onValidate }: GenericModalProps) => {
  const t = useI18n();
  const modalRef = useRef(null);

  const confirmText = useMemo(() => {
    if (confirmLabelTrad) return confirmLabelTrad
    return t('modal.button.confirm');
  
  }, [confirmLabelTrad, t])

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
        {children}
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
            onClick={onValidate}
          >
            {confirmText}
          </GenericButton>
        </section>
      )}
    </dialog>
  );
}

export default GenericModal;

