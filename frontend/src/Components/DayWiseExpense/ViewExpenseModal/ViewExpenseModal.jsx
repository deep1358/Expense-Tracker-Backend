import React, { memo, useEffect } from 'react';
import { Modal, Group, Text, Button, Title, Table } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { getExpense } from '../../../store/expense/ThunkFunctions/getExpense';
import { useNavigate } from 'react-router-dom';
import { setFocusedExpense } from '../../../store/expense';
import { useMediaQuery } from '@mantine/hooks';
import { useStyles } from './ViewExpenseModal.style';
import ViewExpenseModalSkeleton from './ViewExpenseModalSkeleton';

const ViewExpenseModal = ({
  viewModalOpened,
  setViewModalOpened,
  viewExpenseID,
  setDeleteModalOpened,
  setDeleteExpenseID,
  setViewExpenseID
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { focusedExpense, gettingExpense } = useSelector((state) => state.expense);

  useEffect(() => {
    if (viewExpenseID) dispatch(getExpense(viewExpenseID));
  }, [focusedExpense.length, viewExpenseID]);

  // Clear focused expense on unmount
  useEffect(() => {
    return () => dispatch(setFocusedExpense({}));
  }, []);

  const handleUpdate = () => {
    navigate(`/updateExpense/${focusedExpense._id}`);
  };

  const handleDelete = () => {
    setViewModalOpened(false);
    setDeleteModalOpened(true);
    setDeleteExpenseID(focusedExpense._id);
  };

  const smallerScreen = useMediaQuery('(max-width: 600px)');

  const { classes } = useStyles();

  const rows = () => (
    <>
      <tr>
        <td>
          <Text className={classes.Text}>ID: </Text>
        </td>
        <td>
          <Text className={classes.Text}>{focusedExpense._id}</Text>
        </td>
      </tr>
      <tr>
        <td>
          <Text className={classes.Text}>Date: </Text>
        </td>
        <td>
          <Text className={classes.Text}>
            {` ${focusedExpense.day} / ${focusedExpense.month} / ${focusedExpense.year}`}
          </Text>
        </td>
      </tr>
      <tr>
        <td>
          <Text className={classes.Text}>Category: </Text>
        </td>
        <td>
          <Text className={classes.Text}>{focusedExpense.category}</Text>
        </td>
      </tr>
      <tr>
        <td>
          <Text className={classes.Text}>Amount: </Text>
        </td>
        <td>
          <Text className={classes.Text}>{'₹ ' + focusedExpense.amount}</Text>
        </td>
      </tr>
      {focusedExpense.note && (
        <tr>
          <td className={classes.td}>
            <Text className={classes.Text}>Note: </Text>
          </td>
          <td>
            <Text className={classes.Text}>{focusedExpense.note}</Text>
          </td>
        </tr>
      )}
    </>
  );

  return (
    <Modal
      size={600}
      overflow="inside"
      opened={viewModalOpened}
      onClose={() => {
        dispatch(setFocusedExpense({}));
        setViewExpenseID(null);
        setViewModalOpened(false);
      }}
      title={<Title order={4}>View Expense</Title>}
    >
      <Group>
        {gettingExpense ? (
          <ViewExpenseModalSkeleton />
        ) : (
          Object.keys(focusedExpense).length > 0 && (
            <>
              <Table fontSize="sm">
                <tbody>{rows()}</tbody>
              </Table>
              <Group style={{ width: '95%' }} position="right">
                <Button size={smallerScreen ? 'xs' : 'md'} variant="outline" onClick={handleUpdate}>
                  Edit
                </Button>
                <Button
                  size={smallerScreen ? 'xs' : 'md'}
                  onClick={handleDelete}
                  variant="outline"
                  color="red"
                >
                  Delete
                </Button>
              </Group>
            </>
          )
        )}
      </Group>
    </Modal>
  );
};

export default memo(ViewExpenseModal);
