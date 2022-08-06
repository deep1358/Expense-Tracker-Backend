import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getYearWiseExpense } from '../../store/expense/ThunkFunctions/getYearWiseExpense';
import ExpenseCard from '../../Components/ExpenseCard/ExpenseCard';
import { Container, Group } from '@mantine/core';
import ExpenseCardSkeleton from '../../Components/ExpenseCard/ExpenseCardSkeleton';

const YearWiseExpense = () => {
  const dispatch = useDispatch();
  const { yearWiseExpense, gettingYearWiseExpense } = useSelector((state) => state.expense);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    user && dispatch(getYearWiseExpense());
  }, [user]);

  return (
    <Container size="xl">
      <Group mb="xs" position="center">
        {gettingYearWiseExpense
          ? [...Array(8)].map((_, index) => <ExpenseCardSkeleton key={index} />)
          : Object.entries(yearWiseExpense)
              ?.sort((a, b) => b.year - a.year)
              .reverse()
              .map(([year, amount], index) => (
                <ExpenseCard key={index} name={year} amount={amount} year={year} />
              ))}
      </Group>
    </Container>
  );
};

export default YearWiseExpense;
