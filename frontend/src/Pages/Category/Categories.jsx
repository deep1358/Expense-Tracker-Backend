import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextInput, Button, Container, ScrollArea, Stack } from '@mantine/core';
import { useForm } from '@mantine/form';
import { toggleLoadingOverlay } from '../../store/utils';
import { Search, Plus } from 'tabler-icons-react';
import { useStyles } from './Categories.style';
import DeleteCategoryConfirmModal from '../../Components/Category/DeleteCategoryConfirmModal/DeleteCategoryConfirmModal';
import AddOrUpdateModal from '../../Components/Category/AddOrUpdateModal/AddOrUpdateModal';
import CategoryTable from '../../Components/Category/CategoryTable/CategoryTable';
import { useMediaQuery } from '@mantine/hooks';

const Categories = () => {
  const [oldCategory, setOldCategory] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [editOrUploadModalOpened, setEditOrUploadModalOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [selectDeleteCategory, setSelectDeleteCategory] = useState('');

  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const { user, creatingCategory, deletingCategory, updatingCategory } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const categoryForm = useForm({
    initialValues: {
      newCategory: ''
    },

    validate: {
      newCategory: (values) => (values.newCategory === '' ? 'Category is required' : undefined)
    }
  });

  useEffect(() => {
    if (creatingCategory || deletingCategory || updatingCategory)
      dispatch(toggleLoadingOverlay(true));
    else dispatch(toggleLoadingOverlay(false));
  }, [creatingCategory, updatingCategory, deletingCategory]);

  useEffect(() => {
    if (!editOrUploadModalOpened) categoryForm.reset();
  }, [editOrUploadModalOpened]);

  useEffect(() => {
    setSortedData(user?.categories);
  }, [user]);

  const { classes } = useStyles();

  function filterData(data, search) {
    const query = search.toLowerCase().trim();
    return data.filter((item) => item.toLowerCase().includes(query));
  }

  function sortData(data, payload) {
    if (!payload.sortBy) {
      return filterData(data, payload.search);
    }

    return filterData(
      [...data].sort((a, b) => {
        if (payload.reversed) {
          return b.localeCompare(a);
        }

        return a.localeCompare(b);
      }),
      payload.search
    );
  }

  const handleSearchChange = (event) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(user?.categories, {
        sortBy,
        reversed: reverseSortDirection,
        search: value
      })
    );
  };

  const smallerScreen = useMediaQuery('(max-width: 530px)');

  return (
    <>
      <DeleteCategoryConfirmModal
        deleteModalOpened={deleteModalOpened}
        setDeleteModalOpened={setDeleteModalOpened}
        setSelectDeleteCategory={setSelectDeleteCategory}
        selectDeleteCategory={selectDeleteCategory}
      />

      <AddOrUpdateModal
        editOrUploadModalOpened={editOrUploadModalOpened}
        setEditOrUploadModalOpened={setEditOrUploadModalOpened}
        categoryForm={categoryForm}
        isUpdating={isUpdating}
        setIsUpdating={setIsUpdating}
        oldCategory={oldCategory}
      />

      <Container size={smallerScreen ? '100vw' : 'sm'}>
        <Stack align="flex-end">
          <Button
            size={smallerScreen ? 'xs' : 'sm'}
            leftIcon={<Plus />}
            onClick={() => setEditOrUploadModalOpened(true)}
          >
            ADD CATEGORY
          </Button>
          {user?.categories?.length > 0 && (
            <TextInput
              sx={{ width: '100%' }}
              placeholder="Search by Category Name"
              icon={<Search size={14} />}
              value={search}
              onChange={handleSearchChange}
              mb="sm"
            />
          )}
          <ScrollArea sx={{ height: 'calc(75vh - 50px)', width: '100%' }}>
            <CategoryTable
              categoryForm={categoryForm}
              setOldCategory={setOldCategory}
              setIsUpdating={setIsUpdating}
              setEditOrUploadModalOpened={setEditOrUploadModalOpened}
              setDeleteModalOpened={setDeleteModalOpened}
              setSelectDeleteCategory={setSelectDeleteCategory}
              sortedData={sortedData}
              setSortedData={setSortedData}
              sortData={sortData}
              search={search}
              sortBy={sortBy}
              setSortBy={setSortBy}
              reverseSortDirection={reverseSortDirection}
              setReverseSortDirection={setReverseSortDirection}
            />
          </ScrollArea>
        </Stack>
      </Container>
    </>
  );
};

export default Categories;
