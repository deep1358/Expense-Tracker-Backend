import React, { memo } from 'react';
import { Modal, Group, Alert, Text, Button, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { AlertCircle } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteExpense } from '../../../store/expense/ThunkFunctions/deleteExpense';
import { useStyles } from './DeleteExpenseConfirmModal.style';

const DeleteExpenseConfirmModal = ({
  deleteModalOpened,
  setDeleteModalOpened,
  deleteExpenseID
}) => {
  const { deletingExpense } = useSelector((state) => state.expense);

  const dispatch = useDispatch();

  const handleDelete = () => {
    if (deleteExpenseID) dispatch(deleteExpense([deleteExpenseID, setDeleteModalOpened]));
  };

  const smallerScreen = useMediaQuery('(max-width: 450px)');

  const { classes } = useStyles();

  return (
    <Modal
      size="md"
      opened={deleteModalOpened}
      onClose={() => setDeleteModalOpened(false)}
      title={<Title order={4}>Delete Expense</Title>}
    >
      <Group>
        <Alert style={{ width: '100%' }} icon={<AlertCircle size={16} />} color="red">
          <Text className={classes.Text}>This action cannot be undone.</Text>
        </Alert>

        <Text className={classes.Text}>Are you sure you want to delete this expense?</Text>

        <Group style={{ width: '100%' }} position="right">
          <Button size={smallerScreen ? 'xs' : 'md'} color="red" onClick={handleDelete}>
            {deletingExpense ? 'Deleting...' : `Delete`}
          </Button>
          <Button
            size={smallerScreen ? 'xs' : 'md'}
            variant="outline"
            onClick={() => setDeleteModalOpened(false)}
          >
            Cancel
          </Button>
        </Group>
      </Group>
    </Modal>
  );
};

export default memo(DeleteExpenseConfirmModal);
