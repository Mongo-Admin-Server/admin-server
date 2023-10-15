'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import GenericModal from '@components/modal/generic/GenericModal';
import GenericInput from '@components/ui/inputs/generic/GenericInput';
import SelectInput from '@components/ui/inputs/select/SelectInput';
import style from "./form-update-role.module.scss";

import { useDispatch, useSelector } from '@/store/store';
import { updateRole, setErrorUser, selectError } from '@/domain/usecases/user-slice';
import { RoleType, UserType } from '@/domain/entities/user-types';

interface UpdateRoleModalProps {
  userData: UserType,
  open: boolean;
  onClose: () => void;
}

export default function FormUpdateRole({
  userData,
  open,
  onClose,
}: UpdateRoleModalProps) {
  /* Static Data */
  const dispatch = useDispatch();
  const t = useTranslations();
  const errorSelector = useSelector(selectError);

  const optionsRoles = [
    { value: 'read', label: t('role.read'), },
    { value: 'readWrite', label: t('role.readWrite'), },
    { value: 'dbAdmin', label: t('role.dbAdmin'), },
    { value: 'dbOwner', label: t('role.dbOwner'), },
    { value: 'userAdmin', label: t('role.userAdmin'), },
    { value: 'clusterAdmin', label: t('role.clusterAdmin')},
    { value: 'backup', label: t('role.backup')},
    { value: 'root', label: t('role.root')}
  ];
  /* Methods */
  const handleSubmit = async () => {
    setUpdateRoles([{
      role,
      db: databaseName
    }]);
    if (userData.user) {
      await dispatch(updateRole({
        username: userData.user,
        roles: updateRoles
      })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') onClose();
      }); 
    }
  }
  /* Local Data */
  const [role, setRole] = useState<string>('');
  const [databaseName, setDatabaseName] = useState<string>('');
  const [updateRoles, setUpdateRoles] = useState<RoleType[]>([]);
  const errors = errorSelector;

  useEffect(() => {
    dispatch(setErrorUser(''));
    setRole('')
    setDatabaseName('')
  }, [open, dispatch])

  return (
    <GenericModal
      open={open}
      title={t('user.update')}
      onClose={onClose}
      confirmLabelTrad={t('modal.button.update')}
      typeButton='submit'
      onValidate={handleSubmit}
    >
      <form className={style['form-update-role']}>
        <GenericInput
          type="text"
          label={t('user.database')}
          value={databaseName}
          placeholder={t('user.database')}
          error={errors}
          onChange={(event) => setDatabaseName(event.target.value)}
        />
        <SelectInput
          label={t('user.role')}
          options={optionsRoles}
          value={role} 
          onChange={(event) => setRole(event.target.value)}
        />
      </form>
    </GenericModal>
  );
}
