'use client';

import { useEffect, useCallback, useState } from 'react';

import GenericModal from '@components/modal/generic/GenericModal';

import { useDispatch, useSelector } from '@/store/store';
import { fetchOneDocument, selectLoadingDocument } from '@/domain/usecases/document-slice';
import { selectLanguage } from '@/domain/usecases/setting-slice';

import { useI18n } from '@/shared/locales/clients';

import JSONInput from 'react-json-ide';
import localEn from 'react-json-ide/locale/en';
import localeFr from 'react-json-ide/locale/fr';
import localeEs from 'react-json-ide/locale/es';

interface DocumentModalProps {
  idDocument?: string;
  open: boolean;
  onClose: () => void;
}

interface LocaleType {
  [key: string]: any;
}

const DocumentModal = ({ idDocument, open, onClose }: DocumentModalProps) => {
  const t = useI18n();
  const dispatch = useDispatch();

  const language = useSelector(selectLanguage);
  const loading = useSelector(selectLoadingDocument);

  const [document, setDocument] = useState<JSON>({} as JSON);

  const locale: LocaleType = {
    en: localEn,
    fr: localeFr,
    es: localeEs,
  };

  const fetchDocument = useCallback(async () => {
    if (!idDocument) return;
    const response = await dispatch(fetchOneDocument(idDocument));
    setDocument(response.payload);
  }, [idDocument, dispatch]);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  useEffect(() => {
    if (!open) setDocument({} as JSON);
  }, [open]);

  const handleSave = async () => {
    console.log(document);
    // try {
    //   if (idDocument)
    //     await Api.document.updateDocument(
    //       databaseSelected,
    //       collectionSelected,
    //       idDocument,
    //       document
    //     );
    //   else
    //     await Api.document.postDocument(
    //       databaseSelected,
    //       collectionSelected,
    //       document
    //     );
    //   onClose();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <GenericModal
      open={open}
      title={t('document.updateTitle')}
      onClose={onClose}
      onValidate={handleSave}
    >
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ maxWidth: '1400px', maxHeight: '100%' }}>
          <JSONInput
            placeholder={document}
            theme="light_mitsuketa_tribute"
            locale={locale[language]}
            colors={{
              string: '#DAA520',
              background: 'transparent',
            }}
            width="100%"
            height="auto"
            confirmGood={false}
            onChange={(event: any) => setDocument(event.jsObject)}
          />
        </div>
      )}
    </GenericModal>
  );
};

export default DocumentModal;
