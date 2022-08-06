import React, { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthWiseExpenseForChart } from '../../../store/expense/ThunkFunctions/getMonthWiseExpenseForChart';
import BarOrAreaChart from '../BarOrAreaChart/BarOrAreaChart';
import DonutChart from '../DonutChart/DonutChart';
import { Select, Group, LoadingOverlay, Alert, Center, Title } from '@mantine/core';
import CustomLoader from '../../CustomLoader';
import { AlertCircle } from 'tabler-icons-react';

const MonthWiseExpenseForChart = ({ chartCategories, yearWiseExpense }) => {
  const dispatch = useDispatch();

  const {
    monthWiseExpenseForChart,
    gettingMonthWiseExpenseForChart,
    monthWiseExpenseForChartError
  } = useSelector((state) => state.expense);

  const { fixedDays } = useSelector((state) => state.utils);

  const { user } = useSelector((state) => state.user);

  const [monthWiseExpenseYear, setMonthWiseExpenseYear] = useState('All');
  const [monthWiseExpenseDay, setMonthWiseExpenseDay] = useState('All');
  const [monthWiseExpenseCategory, setMonthWiseExpenseCategory] = useState('All');

  const [chartType, setChartType] = useState('bar');

  const handleMonthWiseExpenseYearChange = (value) => {
    setMonthWiseExpenseYear(value);
    dispatch(getMonthWiseExpenseForChart([value, monthWiseExpenseDay, monthWiseExpenseCategory]));
  };

  const handleMonthWiseExpenseDayChange = (value) => {
    setMonthWiseExpenseDay(value);
    dispatch(getMonthWiseExpenseForChart([monthWiseExpenseYear, value, monthWiseExpenseCategory]));
  };

  useEffect(() => {
    if (user)
      dispatch(
        getMonthWiseExpenseForChart([
          monthWiseExpenseYear,
          monthWiseExpenseDay,
          monthWiseExpenseCategory
        ])
      );
  }, [user]);

  const handleMonthWiseExpenseCategoryChange = (value) => {
    setMonthWiseExpenseCategory(value);
    dispatch(getMonthWiseExpenseForChart([monthWiseExpenseYear, monthWiseExpenseDay, value]));
  };

  const handleChartTypeChange = (value) => {
    setChartType(value);
  };

  return (
    <>
      <Center style={{ width: '100%' }}>
        <Title mb={10} order={2}>
          Month Wise Expense
        </Title>
      </Center>
      <Group>
        <Select
          size="xs"
          data={['All', ...Object.keys(yearWiseExpense)?.sort((a, b) => b - a)]}
          label="Select a Year"
          value={monthWiseExpenseYear}
          onChange={handleMonthWiseExpenseYearChange}
        />
        <Select
          size="xs"
          data={['All', ...fixedDays]}
          label="Select a Day"
          value={monthWiseExpenseDay}
          onChange={handleMonthWiseExpenseDayChange}
        />
        <Select
          size="xs"
          data={['All', ...chartCategories]}
          label="Select a Category"
          value={monthWiseExpenseCategory}
          onChange={handleMonthWiseExpenseCategoryChange}
        />
        <Select
          size="xs"
          data={['bar', 'donut']}
          label="Select a Chart Type"
          value={chartType}
          onChange={handleChartTypeChange}
        />
      </Group>
      {gettingMonthWiseExpenseForChart ? (
        <LoadingOverlay loader={<CustomLoader />} visible blur={2} />
      ) : monthWiseExpenseForChartError ? (
        <Alert mt={50} icon={<AlertCircle size={16} />} title="Error!" color="red">
          {monthWiseExpenseForChartError}
        </Alert>
      ) : (
        monthWiseExpenseForChart &&
        (chartType === 'donut' ? (
          <DonutChart data={monthWiseExpenseForChart} name="month" />
        ) : (
          <BarOrAreaChart data={monthWiseExpenseForChart} name="month" />
        ))
      )}
    </>
  );
};

export default memo(MonthWiseExpenseForChart);
