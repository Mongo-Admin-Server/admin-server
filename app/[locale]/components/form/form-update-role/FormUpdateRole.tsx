'use client';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

import GenericModal from '@components/modal/generic/GenericModal';

import { useDispatch, useSelector } from '@/store/store';
import { updateRole, setErrorUser, selectError, selectUserSelected} from '@/domain/usecases/user-slice';
import SelectInput from '../../ui/inputs/select/SelectInput';
import { RoleType } from '@/domain/entities/user-types';

interface UpdateRoleModalProps {
  userName: string,
  open: boolean;
  onClose: () => void;
}

export default function FormUpdateRole({
  userName,
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
    { value: 'clusterAdmin', label: t('role.clusterAdmn')},
    { value: 'backup', label: t('role.backup')},
    { value: 'root', label: t('role.root')}
  ];
  /* Methods */
  const handleSubmit = async () => {}
  
  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setRoles(selectedValue); 
  };
  /* Local Data */

  const [roles, setRoles] = useState<string>('');
  const [errorInput, setErrorInput] = useState<string>('');
  const errors = errorInput || errorSelector;

  useEffect(() => {
    dispatch(setErrorUser(''));
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
      <form>
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
