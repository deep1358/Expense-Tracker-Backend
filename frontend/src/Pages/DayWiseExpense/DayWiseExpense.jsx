import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getExpenses } from '../../store/expense/ThunkFunctions/getExpenses';
import { setCurrentMonth, setCurrentYear } from '../../store/expense/index';
import DayWiseExpenseTable from '../../Components/DayWiseExpense/DayWiseExpenseTable/DayWiseExpenseTable';
import { Container, ScrollArea, Stack, Select } from '@mantine/core';
import { toggleLoadingOverlay } from '../../store/utils';
import DeleteExpenseConfirmModal from '../../Components/DayWiseExpense/DeleteExpenseConfirmModal/DeleteExpenseConfirmModal';
import ViewExpenseModal from '../../Components/DayWiseExpense/ViewExpenseModal/ViewExpenseModal';

const DayWiseExpense = () => {
  const [sortedData, setSortedData] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const [categoryExpense, setCategoryExpense] = useState('All');

  const [deleteModalOpened, setDeleteModalOpened] = useState(false);
  const [deleteExpenseID, setDeleteExpenseID] = useState('');

  const [viewModalOpened, setViewModalOpened] = useState(false);
  const [viewExpenseID, setViewExpenseID] = useState('');

  const { expenses, deletingExpense } = useSelector((state) => state.expense);
  const { user } = useSelector((state) => state.user);
  const { months } = useSelector((state) => state.utils);

  const dispatch = useDispatch();
  const { year, month } = useParams();

  useEffect(() => {
    setSortedData(expenses);
  }, [expenses]);

  useEffect(() => {
    dispatch(setCurrentMonth(months.indexOf(month) + 1));
    dispatch(setCurrentYear(year));
    user && dispatch(getExpenses([year, month]));
  }, [user]);

  useEffect(() => {
    if (deletingExpense) dispatch(toggleLoadingOverlay(true));
    else dispatch(toggleLoadingOverlay(false));
  }, [deletingExpense]);

  useEffect(() => {
    filterData();
  }, [categoryExpense]);

  const handleCategoryExpenseChange = (value) => {
    setCategoryExpense(value);
  };

  function filterData(data = expenses) {
    if (categoryExpense === 'All') return setSortedData(data);
    setSortedData(data.filter((expense) => expense.category === categoryExpense));
  }

  function sortData(data, payload) {
    const { sortBy, reversed } = payload;
    return filterData(
      data.slice().sort((a, b) => {
        if (reversed) {
          if (sortBy === 'date') {
            return new Date(b.year, b.month, b.day) - new Date(a.year, a.month, a.day);
          } else if (sortBy === 'amount') return b.amount - a.amount;
          return b[sortBy].localeCompare(a[sortBy]);
        }
        if (sortBy === 'date') {
          return new Date(a.year, a.month, a.day) - new Date(b.year, b.month, b.day);
        } else if (sortBy === 'amount') return a.amount - b.amount;
        return a[sortBy].localeCompare(b[sortBy]);
      })
    );
  }

  return (
    <>
      <DeleteExpenseConfirmModal
        deleteModalOpened={deleteModalOpened}
        setDeleteModalOpened={setDeleteModalOpened}
        deleteExpenseID={deleteExpenseID}
      />
      <ViewExpenseModal
        viewModalOpened={viewModalOpened}
        setViewModalOpened={setViewModalOpened}
        viewExpenseID={viewExpenseID}
        setViewExpenseID={setViewExpenseID}
        setDeleteModalOpened={setDeleteModalOpened}
        setDeleteExpenseID={setDeleteExpenseID}
      />
      <Container style={{ marginTop: '-2vh' }}>
        <Stack align="flex-end">
          {expenses?.length > 0 && (
            <Select
              size="xs"
              data={['All', ...user?.categories]}
              label="Filter By Category"
              value={categoryExpense}
              onChange={handleCategoryExpenseChange}
            />
          )}
          <ScrollArea sx={{ height: 'calc(75vh - 70px)', width: '100%' }}>
            <DayWiseExpenseTable
              sortedData={sortedData}
              setSortedData={setSortedData}
              sortData={sortData}
              sortBy={sortBy}
              setSortBy={setSortBy}
              reverseSortDirection={reverseSortDirection}
              setReverseSortDirection={setReverseSortDirection}
              setDeleteExpenseID={setDeleteExpenseID}
              setDeleteModalOpened={setDeleteModalOpened}
              setViewExpenseID={setViewExpenseID}
              setViewModalOpened={setViewModalOpened}
            />
          </ScrollArea>
        </Stack>
      </Container>
    </>
  );
};

export default DayWiseExpense;
