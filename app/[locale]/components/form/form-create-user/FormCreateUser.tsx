'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import GenericInput from '@components/ui/inputs/generic/GenericInput';
import GenericModal from '@components/modal/generic/GenericModal';

import { useDispatch, useSelector } from '@/store/store';
import { postUser, setErrorUser, selectError } from '@/domain/usecases/user-slice';
import SelectInput from '../../ui/inputs/select/SelectInput';
import style from "./form-create-user.module.scss";

interface CreateUserModalProps {
  open: boolean;
  onClose: () => void;
}

export default function FormCreateUser({
  open,
  onClose,
}: CreateUserModalProps) {
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
    { value: 'clusterAdmin', label: t('role.clusterAdmn')},
    { value: 'backup', label: t('role.backup')},
    { value: 'root', label: t('role.root')}
  ];
  /* Methods */
  const handleSubmit = async () => {
    if (!errorInput && userName.trim() !== '') {
      dispatch(postUser({
        createUser: userName,
        pwd: password,
        roles: roles,
      })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') onClose();
      }); 
    }
  };
  
  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newUserName = event.target.value;
    setUser(newUserName);

    if (newUserName.includes(' ')) {
      setErrorInput(t('formCreateCollection.spacesNotAllowedErrorMessage'))
    } else {
      setErrorInput('')
      dispatch(setErrorUser(''));
    }
  };

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setRoles([selectedValue]); 
  };
  /* Local Data */
  const [userName, setUser] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [roles, setRoles] = useState<string[]>([]);
  const [errorInput, setErrorInput] = useState<string>('');
  const isSubmitButtonDisabled = errorInput !== '' || userName.trim() === '' || errorSelector !== '' ;
  const errors = errorInput || errorSelector;

  useEffect(() => {
    dispatch(setErrorUser(''));
    setUser('');
  }, [open, dispatch])
  
  return (
    <GenericModal
      open={open}
      title={t('user.create')}
      onClose={onClose}
      confirmLabelTrad={t('modal.button.create')}
      typeButton='submit'
      disabledButton={isSubmitButtonDisabled}
      onValidate={handleSubmit}
    >
      <form className={style['form-create-user']}>
        <GenericInput
          type="text"
          label={t('user.name')}
          value={userName}
          error={errors}
          placeholder={t('user.name')}
          onChange={handleUserNameChange}
        />
        <GenericInput
          type="password"
          label={t('user.password')}
          value={password}
          placeholder={t('user.password')}
          onChange={(event) => setPassword(event.target.value)}
        />
        <SelectInput
          label={t('user.role')}
          options={optionsRoles}
          value={roles} 
          onChange={handleRoleChange}
        />
      </form>
    </GenericModal>
  );
}
