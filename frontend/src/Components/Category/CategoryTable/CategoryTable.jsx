import React, { memo } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import {
  Table,
  UnstyledButton,
  Group,
  Text,
  Center,
  Button,
  ActionIcon,
  Stack,
  Image
} from '@mantine/core';
import { Trash, Pencil, Selector, ChevronDown, ChevronUp } from 'tabler-icons-react';
import { useStyles } from './CategoryTable.style';
import { useSelector } from 'react-redux';

const CategoryTable = ({
  categoryForm,
  setOldCategory,
  setIsUpdating,
  setEditOrUploadModalOpened,
  setDeleteModalOpened,
  setSelectDeleteCategory,
  sortedData,
  setSortedData,
  sortData,
  search,
  sortBy,
  setSortBy,
  reverseSortDirection,
  setReverseSortDirection
}) => {
  const smallerScreen = useMediaQuery('(max-width: 530px)');

  const { classes } = useStyles();

  const { user } = useSelector((state) => state.user);

  function Th({ children, reversed, sorted, onSort }) {
    const { classes } = useStyles();
    const Icon = sorted ? (reversed ? ChevronUp : ChevronDown) : Selector;
    return (
      <th className={classes.th}>
        <UnstyledButton onClick={onSort} className={classes.control}>
          <Group position="center">
            <Text weight={500} size="sm">
              {children}
            </Text>
            <Center className={classes.icon}>
              <Icon size={14} />
            </Center>
          </Group>
        </UnstyledButton>
      </th>
    );
  }

  const ths = (
    <tr>
      <Th
        sorted={sortBy === 'category'}
        reversed={reverseSortDirection}
        onSort={() => setSorting('category')}
      >
        Category Name
      </Th>
      <th className={classes.th}>
        <Text weight={500} size={smallerScreen ? 18 : 'sm'}>
          Actions
        </Text>
      </th>
    </tr>
  );

  const rows = sortedData.map((category, index) => (
    <tr key={index}>
      <td className={classes.td}>{category}</td>
      <td className={classes.td}>
        {!smallerScreen ? (
          <>
            <Button
              onClick={() => DeleteCategory(category)}
              leftIcon={<Trash />}
              variant="light"
              color="red"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                categoryForm.setValues({ newCategory: category });
                setOldCategory(category);
                setIsUpdating(true);
                setEditOrUploadModalOpened(true);
              }}
              leftIcon={<Pencil />}
              variant="light"
              color="blue"
              ml="sm"
            >
              Edit
            </Button>
          </>
        ) : (
          <Group position="center">
            <ActionIcon onClick={() => DeleteCategory(category)} variant="light" color="red">
              <Trash size={16} />
            </ActionIcon>
            <ActionIcon
              onClick={() => {
                categoryForm.setValues({ newCategory: category });
                setOldCategory(category);
                setIsUpdating(true);
                setEditOrUploadModalOpened(true);
              }}
              variant="light"
              color="blue"
            >
              <Pencil size={16} />
            </ActionIcon>
          </Group>
        )}
      </td>
    </tr>
  ));

  const DeleteCategory = (category) => {
    setDeleteModalOpened(true);
    setSelectDeleteCategory(category);
  };

  const setSorting = (field) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(user?.categories, { sortBy: field, reversed, search }));
  };

  return (
    <>
      <Table highlightOnHover verticalSpacing={smallerScreen && 'xs'} fontSize="sm">
        <thead className={classes.header}>{ths}</thead>
        {user?.categories?.length > 0 && <tbody>{rows}</tbody>}
      </Table>
      {(user?.categories?.length < 1 || rows?.length < 1) && (
        <Stack mt="lg" align="center">
          <Image className={classes.noResultImage} src="/no-result.svg" alt="no-result" />
          <Text color="grey">No Category found</Text>
        </Stack>
      )}
    </>
  );
};

export default memo(CategoryTable);
