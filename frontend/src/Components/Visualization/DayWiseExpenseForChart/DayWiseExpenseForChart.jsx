import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDayWiseExpenseForChart } from '../../../store/expense/ThunkFunctions/getDayWiseExpenseForChart';
import { getYearWiseExpense } from '../../../store/expense/ThunkFunctions/getYearWiseExpense';
import BarOrAreaChart from '../BarOrAreaChart/BarOrAreaChart';
import { Select, Group, LoadingOverlay, Alert, Title, Center } from '@mantine/core';
import CustomLoader from '../../CustomLoader';
import { AlertCircle } from 'tabler-icons-react';

const DayWiseExpenseForChart = ({ yearWiseExpense, chartCategories }) => {
  const dispatch = useDispatch();

  const {
    dayWiseExpenseForChart,
    gettingDayWiseExpenseForChart,
    dayWiseExpenseForChartError,
    currentMonth,
    currentYear
  } = useSelector((state) => state.expense);

  const { months } = useSelector((state) => state.utils);

  const { user } = useSelector((state) => state.user);

  const [dayWiseExpenseYear, setDayWiseExpenseYear] = useState('');
  const [dayWiseExpenseMonth, setDayWiseExpenseMonth] = useState('');
  const [dayWiseExpenseCategory, setDayWiseExpenseCategory] = useState('All');

  useEffect(() => {
    if (user)
      dispatch(getDayWiseExpenseForChart([currentYear, currentMonth, dayWiseExpenseCategory]));
  }, [user]);

  useEffect(() => {
    if (user) {
      setDayWiseExpenseMonth(months[currentMonth - 1]);
      dispatch(getYearWiseExpense());
    }
  }, [user, Object(yearWiseExpense).length]);

  const handleDayWiseExpenseYearChange = (value) => {
    setDayWiseExpenseYear(value);
    dispatch(
      getDayWiseExpenseForChart([
        value,
        months.indexOf(dayWiseExpenseMonth) === -1
          ? 'All'
          : months.indexOf(dayWiseExpenseMonth) + 1,
        dayWiseExpenseCategory
      ])
    );
  };

  const handleDayWiseExpenseMonthChange = (value) => {
    setDayWiseExpenseMonth(value);
    dispatch(
      getDayWiseExpenseForChart([
        dayWiseExpenseYear || currentYear,
        months.indexOf(value) === -1 ? 'All' : months.indexOf(value) + 1,
        dayWiseExpenseCategory
      ])
    );
  };

  const handleDayWiseExpenseCategoryChange = (value) => {
    setDayWiseExpenseCategory(value);
    dispatch(
      getDayWiseExpenseForChart([
        dayWiseExpenseYear || currentYear,
        months.indexOf(dayWiseExpenseMonth) === -1
          ? 'All'
          : months.indexOf(dayWiseExpenseMonth) + 1,
        value
      ])
    );
  };

  return (
    <>
      <Center style={{ width: '100%' }}>
        <Title mb={10} order={2}>
          Day Wise Expense
        </Title>
      </Center>
      <Group>
        <Select
          size="xs"
          data={Object.keys(yearWiseExpense)?.sort((a, b) => b - a)}
          label="Select a Year"
          value={
            !dayWiseExpenseYear
              ? currentYear !== new Date().getFullYear()
                ? currentYear
                : `${new Date().getFullYear()}`
              : dayWiseExpenseYear
          }
          onChange={handleDayWiseExpenseYearChange}
        />
        <Select
          size="xs"
          data={months}
          label="Select a Month"
          value={dayWiseExpenseMonth}
          onChange={handleDayWiseExpenseMonthChange}
        />
        <Select
          size="xs"
          data={['All', ...chartCategories]}
          label="Select a Category"
          value={dayWiseExpenseCategory}
          onChange={handleDayWiseExpenseCategoryChange}
        />
      </Group>
      {gettingDayWiseExpenseForChart ? (
        <LoadingOverlay loader={<CustomLoader />} visible blur={2} />
      ) : dayWiseExpenseForChartError ? (
        <Alert mt={50} icon={<AlertCircle size={16} />} title="Error!" color="red">
          {dayWiseExpenseForChartError}
        </Alert>
      ) : (
        <BarOrAreaChart name="day" data={dayWiseExpenseForChart} chartType="area" />
      )}
    </>
  );
};

export default memo(DayWiseExpenseForChart);
