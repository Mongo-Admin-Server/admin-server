'use client';

import { useEffect, useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Table from "@components/ui/table/Table";
import TableSkeleton from "@components/ui/skeleton/table/TableSkeleton";
import Title from "@components/title/Title";
import { useSelector, useDispatch } from '@/store/store';
import { 
  selectUsers,
  getUsers, 
  selectLoading, 
  setUserSelected,
 } from '@/domain/usecases/user-slice';
 import { selectLanguage } from '@/domain/usecases/setting-slice';
import Link from 'next/link';
import ConfirmModal from '@components/modal/confirm/ConfirmModal';

export default function UserPage() {
  /* Static Data */
  const t = useTranslations();
  const dispatch = useDispatch();
  const dataHeader = [
    t('user.name'),
    t('user.database'),
    t('user.role'),
  ];
  
  /* Local Data */
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const language = useSelector(selectLanguage);
  
  useEffect(() => {
    dispatch(getUsers());
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
    switch (action) {
      case 'add':
        console.log('Created User')
        break;
      case 'trash':
        setOpenDeleteModal(true);
        break;
      case 'edit':
        console.log('Edit');
        break;
      case 'refresh':
        dispatch(getUsers());
        break;
      default:
        break;
    }
  };

  const handleDelete = ()=> {
    setOpenDeleteModal(false);
  }

  return (
    <>
      <Title
        title={t('user.title')}
        actions={['refresh', 'add', 'edit']}
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
          actions={['trash']}
          onClick={(action, index) => handleClick(action, index)}
        />
      )}

      <ConfirmModal
        open={openDeleteModal}
        description={t('user.deleteConfirm')}
        onConfirm={handleDelete}
        onClose={() => setOpenDeleteModal(false)}
      />
    </>
  )
}
