import React, { useState } from 'react';
import { Modal, Title, Group, Alert, Text, Input, Button } from '@mantine/core';
import { AlertCircle } from 'tabler-icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser } from '../../../store/user/ThunkFunctions/deleteUser';
import useStyles from './DeleteUserConfirmModal.style';

const DeleteUserConfirmModal = ({ deleteConfirmBoxOpened, deleteConfirmBoxToggleOpened }) => {
  const { classes } = useStyles();

  const [deleteText, setDeleteText] = useState('');

  const { deletingUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Modal
      opened={deleteConfirmBoxOpened}
      onClose={() => deleteConfirmBoxToggleOpened(false)}
      title={<Title order={4}>Are you sure you want to delete your account?</Title>}
    >
      <Group className={classes.deleteModalGroup}>
        <Alert style={{ width: '100%' }} icon={<AlertCircle size={16} />} color="red">
          This action cannot be undone.
        </Alert>

        <Text>Once you delete your account, all your data will be lost.</Text>

        <Text>
          Please type <strong className="noSelect">delete my account</strong> to confirm:
        </Text>

        <Input
          style={{ width: '100%' }}
          value={deleteText}
          onChange={(e) => setDeleteText(e.target.value)}
          variant="default"
        />

        <Button
          fullWidth
          disabled={deleteText !== 'delete my account'}
          color="red"
          onClick={() => {
            dispatch(deleteUser());
          }}
        >
          {deletingUser ? 'Deleting...' : 'Delete My Account'}
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteUserConfirmModal;
