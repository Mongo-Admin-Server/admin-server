import { useState } from "react";
import { useTranslations } from "next-intl";

import eventEmitter from "@/shared/emitter/events";

import GenericModal from "@components/modal/generic/GenericModal";
import FileInput from "@components/ui/inputs/file/FileInput";

import { importCollection } from "@/domain/usecases/collection-slice";
import { useDispatch } from "@/store/store";

interface ImportModalProps {
  open: boolean;
  databaseName: string;
  collectionName: string;
  onClose: () => void;
  onValidate: () => void;
}

const ImportModal = ({ open, databaseName, collectionName, onClose, onValidate }: ImportModalProps) => {
  const t = useTranslations();
  const dispatch = useDispatch();

  const [fileName, setFileName] = useState('');

  const isDisabled = !fileName;

  const handleChangeFile = (e: any) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  const onImportCollection = async () => {
    const { payload } = await dispatch(importCollection({ databaseName, collectionName, fileName }));
    if (payload?.response?.data === 'Invalid filter') {
      eventEmitter.dispatch('alert', { type: 'error', message: t('document.searchError') });
      return;
    }
    onValidate();
  };
  
  return (
    <GenericModal
      open={open}
      title={t('modal.import.title')}
      disabledButton={isDisabled}
      onClose={onClose}
      onValidate={onImportCollection}
    >
      <FileInput
        onChange={(e) => handleChangeFile(e)}
      />
    </GenericModal>
  );
};

export default ImportModal;
