'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Table from "@components/ui/table/Table";
import TableSkeleton from "@components/ui/skeleton/table/TableSkeleton";
import Title from "@components/title/Title";
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

import { useSelector, useDispatch } from '@/store/store';
import { 
  selectUsers,
  fetchUsers, 
  selectLoading, 
  setUserSelected,
  deleteUser
 } from '@/domain/usecases/user-slice';
 import { selectLanguage } from '@/domain/usecases/setting-slice';
import FormCreateUser from '@/app/[locale]/components/form/form-create-user/FormCreateUser';
import FormUpdateRole from '@/app/[locale]/components/form/form-update-role/FormUpdateRole';

export default function UserPage({
  params,
}: {
  params: { database_name: string }
}) {
  /* Static Data */
  const t = useTranslations();
  const dispatch = useDispatch();
  const dataHeader = [
    t('user.name'),
    t('user.database'),
    t('user.role'),
  ];
  
  /* Local Data */
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [currentUser, setCurrentUser] = useState('');
  const [userNameToDelete, setUserNameToDelete] = useState('');
  const [searchValue, setSearchValue] = useState('');

  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const language = useSelector(selectLanguage);
  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const usersFiltered = useMemo(() => {
    if (!searchValue) return users;
    return users.filter((user) => user.user.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase()));
  }, [users, searchValue])

  const dataBody = useMemo(() => {
    return usersFiltered.map((user) => {
      const mappedData: Record<string, React.ReactNode> = {};

      mappedData[t('user.name')] = (
        <Link href={`/${language}/dashboard/user`}>
          {user.user}
        </Link>
      );
      mappedData[t('user.database')] = user.db;
      mappedData[t('user.role')] = user.roles.map(role => role.role);
    
      return mappedData;
    });
  }, [usersFiltered, language, t]); 
  
  /* Methods */
  const handleClick = (action: string, index?: number) => {
    let userName;
    switch (action) {
      case 'add':
        setOpenCreateModal(true);
        break;
      case 'trash':
        userName = users[index!].user
        setUserNameToDelete(userName)
        setOpenDeleteModal(true);
        break;
      case 'edit':
        userName = users[index!].user
        setCurrentUser(userName)
        setOpenUpdateModal(true);
        break;
      case 'refresh':
        dispatch(fetchUsers());
        break;
      default:
        break;
    }
  };

  const handleDelete = ()=> {
    if (!userNameToDelete) return;
    dispatch(
      deleteUser(userNameToDelete)
    );
    setUserNameToDelete('');
    setOpenDeleteModal(false);
  }

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
      {loading ? (
        <TableSkeleton />
      ) : (
        <Table
          data_header={dataHeader}
          data_body={dataBody}
          actions={['edit', 'trash']}
          onClick={(action, index) => handleClick(action, index)}
        />
      )}

      <ConfirmModal
        open={openDeleteModal}
        description={t('user.deleteConfirm')}
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteModal(false)}
      />
      <FormCreateUser
        open={openCreateModal}
        onClose={() => setOpenCreateModal(false)}
      />
      <FormUpdateRole
        userName={currentUser}
        open={openUpdateModal}
        onClose={() => setOpenUpdateModal(false)}
      />
    </>
  )
}
