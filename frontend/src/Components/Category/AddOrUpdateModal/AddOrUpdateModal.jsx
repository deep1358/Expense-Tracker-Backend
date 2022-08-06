import React, { memo } from 'react';
import { Modal, Title, TextInput, Button } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'tabler-icons-react';
import { showNotification } from '@mantine/notifications';
import { createCategory } from '../../../store/user/ThunkFunctions/createCategory';
import { updateCategory } from '../../../store/user/ThunkFunctions/updateCategory';

const AddOrUpdateModal = ({
  editOrUploadModalOpened,
  setEditOrUploadModalOpened,
  isUpdating,
  categoryForm,
  oldCategory,
  setIsUpdating
}) => {
  const dispatch = useDispatch();

  const { creatingCategory, updatingCategory } = useSelector((state) => state.user);

  // get current seconds since epoch to use as a unique id
  const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

  const AddOrUpdateCategory = (values) => {
    if (!/^[a-zA-Z]+$/.test(values.newCategory))
      return showNotification({
        id: `add-category-error-${getCurrentSeconds()}`,
        message: 'Category name must be alphabetic',
        color: 'red',
        icon: <X side={16} />
      });
    if (!isUpdating) dispatch(createCategory([values.newCategory, setEditOrUploadModalOpened]));
    else dispatch(updateCategory([oldCategory, values.newCategory, setEditOrUploadModalOpened]));
    setIsUpdating(false);
  };

  return (
    <Modal
      size="sm"
      opened={editOrUploadModalOpened}
      onClose={() => setEditOrUploadModalOpened(false)}
      title={<Title order={4}>{isUpdating ? 'Update Category' : 'Add Category'}</Title>}
    >
      <form onSubmit={categoryForm.onSubmit(AddOrUpdateCategory)}>
        <TextInput
          data-autofocus
          placeholder="Add one"
          label="Category"
          required
          {...categoryForm.getInputProps('newCategory')}
        />
        <Button fullWidth mt="xl" type="submit">
          {creatingCategory || updatingCategory ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Modal>
  );
};

export default memo(AddOrUpdateModal);
