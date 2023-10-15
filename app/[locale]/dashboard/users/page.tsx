'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import Table from '@components/ui/table/Table';
import TableSkeleton from '@components/ui/skeleton/table/TableSkeleton';
import Title from '@components/title/Title';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';
import FormCreateUser from '@components/form/form-create-user/FormCreateUser';
import FormUpdateRole from '@components/form/form-update-role/FormUpdateRole';

import { useSelector, useDispatch } from '@/store/store';
import {
  selectUsers,
  fetchUsers,
  selectLoading,
  deleteUser,
} from '@/domain/usecases/user-slice';
import { UserType } from '@/domain/entities/user-types';

export default function UserPage() {
  const t = useTranslations();
  const dispatch = useDispatch();

  const dataHeader = [t('user.name'), t('user.database'), t('user.role')];

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();
  const [userNameToDelete, setUserNameToDelete] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersFiltered = useMemo(() => {
    if (!searchValue) return users;
    return users.filter((user) =>
      user.user.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }, [users, searchValue]);

  const dataBody = useMemo(() => {
    return usersFiltered.map((user) => {
      const mappedData: Record<string, React.ReactNode> = {};

      mappedData[t('user.name')] = user.user;
      mappedData[t('user.database')] = user.db;
      mappedData[t('user.role')] = user.roles
        .map((role) => role.role)
        .join(' - ');

      return mappedData;
    });
  }, [usersFiltered, t]);

  const renderTable = () => {
    if (loading) return <TableSkeleton />;
    if (!users.length) return <Table no_data />;

    return (
      <Table
        data_header={dataHeader}
        data_body={dataBody}
        actions={['edit', 'trash']}
        onClick={(action, index) => handleClick(action, index)}
      />
    );
  };

  const handleClick = (action: string, index?: number) => {
    switch (action) {
      case 'add':
        setOpenCreateModal(true);
        break;
      case 'trash':
        setUserNameToDelete(users[index!].user);
        setOpenDeleteModal(true);
        break;
      case 'edit':
        setCurrentUser(users[index!]);
        setOpenUpdateModal(true);
        break;
      case 'refresh':
        dispatch(fetchUsers());
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    if (!userNameToDelete) return;
    dispatch(deleteUser(userNameToDelete));
    setUserNameToDelete('');
    setOpenDeleteModal(false);
  };

  return (
    <>
      <Title
        title={t('user.title')}
        actions={['refresh', 'add']}
        isViewSearch
        searchValue={searchValue}
        searchPlaceholder={t('user.searchPlaceholder')}
        onClick={(action) => handleClick(action)}
        changeSearchValue={(value: string) => setSearchValue(value)}
      />

      {renderTable()}

      {openDeleteModal && (
        <ConfirmModal
          open={openDeleteModal}
          description={t('user.deleteConfirm')}
          onConfirm={handleDelete}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}

      {openCreateModal && (
        <FormCreateUser
          open={openCreateModal}
          onClose={() => setOpenCreateModal(false)}
        />
      )}

      {currentUser && (
        <FormUpdateRole
          userData={currentUser}
          open={openUpdateModal}
          onClose={() => setOpenUpdateModal(false)}
        />
      )}
    </>
  );
}
