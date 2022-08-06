import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getYearWiseExpenseForChart } from '../../../store/expense/ThunkFunctions/getYearWiseExpenseForChart';
import BarOrAreaChart from '../BarOrAreaChart/BarOrAreaChart';
import DonutChart from '../DonutChart/DonutChart';
import { Select, Group, LoadingOverlay, Alert, Center, Title } from '@mantine/core';
import CustomLoader from '../../CustomLoader';
import { AlertCircle } from 'tabler-icons-react';

const YearWiseExpenseForChart = ({ chartCategories }) => {
  const dispatch = useDispatch();

  const { yearWiseExpenseForChart, gettingYearWiseExpenseForChart, yearWiseExpenseForChartError } =
    useSelector((state) => state.expense);

  const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector((state) => state.utils);

  const { user } = useSelector((state) => state.user);

  const [yearWiseDays, setYearWiseDays] = useState([]);
  const [yearWiseMonths, setYearWiseMonths] = useState(months);

  const [yearWiseExpenseMonth, setYearWiseExpenseMonth] = useState('All');
  const [yearWiseExpenseDay, setYearWiseExpenseDay] = useState('All');
  const [yearWiseExpenseCategory, setYearWiseExpenseCategory] = useState('All');

  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    if (user)
      dispatch(
        getYearWiseExpenseForChart([
          yearWiseExpenseMonth,
          yearWiseExpenseDay,
          yearWiseExpenseCategory
        ])
      );
  }, [user]);

  useEffect(() => {
    if (+yearWiseExpenseDay === 31) {
      setYearWiseMonths(_31DaysMonths);
    } else if (+yearWiseExpenseDay === 30) {
      setYearWiseMonths(_30DaysMonths);
    } else {
      setYearWiseMonths(months);
    }
  }, [yearWiseExpenseDay, months.length]);

  useEffect(() => {
    if (yearWiseExpenseMonth === 'All') {
      setYearWiseDays(fixedDays);
    } else {
      const daysCount = new Date(2020, months.indexOf(yearWiseExpenseMonth) + 1, 0).getDate();
      setYearWiseDays(
        Array.from(Array(daysCount).keys())
          .map((i) => i + 1)
          .map((i) => i.toString())
          .map((i) => (i.length === 1 ? `0${i}` : i))
      );
    }
  }, [yearWiseExpenseMonth]);

  const handleYearWiseExpenseMonthChange = (value) => {
    setYearWiseExpenseMonth(value);
    dispatch(
      getYearWiseExpenseForChart([
        months.indexOf(value) === -1 ? 'All' : months.indexOf(value) + 1,
        yearWiseExpenseDay,
        yearWiseExpenseCategory
      ])
    );
  };

  const handleYearWiseExpenseDayChange = (value) => {
    setYearWiseExpenseDay(value);
    dispatch(
      getYearWiseExpenseForChart([
        months.indexOf(yearWiseExpenseMonth) === -1
          ? 'All'
          : months.indexOf(yearWiseExpenseMonth) + 1,
        value,
        yearWiseExpenseCategory
      ])
    );
  };

  const handleYearWiseExpenseCategoryChange = (value) => {
    setYearWiseExpenseCategory(value);
    dispatch(
      getYearWiseExpenseForChart([
        months.indexOf(yearWiseExpenseMonth) === -1
          ? 'All'
          : months.indexOf(yearWiseExpenseMonth) + 1,
        yearWiseExpenseDay,
        value
      ])
    );
  };

  const handleChartTypeChange = (value) => {
    setChartType(value);
  };

  return (
    <>
      <Center style={{ width: '100%' }}>
        <Title mb={10} order={2}>
          Year Wise Expense
        </Title>
      </Center>
      <Group>
        <Select
          size="xs"
          data={['All', ...yearWiseMonths]}
          label="Select a Month"
          value={yearWiseExpenseMonth}
          onChange={handleYearWiseExpenseMonthChange}
        />
        <Select
          size="xs"
          data={['All', ...yearWiseDays]}
          label="Select a Day"
          value={yearWiseExpenseDay}
          onChange={handleYearWiseExpenseDayChange}
        />
        <Select
          size="xs"
          data={['All', ...chartCategories]}
          label="Select a Category"
          value={yearWiseExpenseCategory}
          onChange={handleYearWiseExpenseCategoryChange}
        />
        <Select
          size="xs"
          data={['bar', 'donut']}
          label="Select a Chart Type"
          value={chartType}
          onChange={handleChartTypeChange}
        />
      </Group>
      {gettingYearWiseExpenseForChart ? (
        <LoadingOverlay loader={<CustomLoader />} visible blur={2} />
      ) : yearWiseExpenseForChartError ? (
        <Alert mt={50} icon={<AlertCircle size={16} />} title="Error!" color="red">
          {yearWiseExpenseForChartError}
        </Alert>
      ) : (
        yearWiseExpenseForChart &&
        (chartType === 'donut' ? (
          <DonutChart data={yearWiseExpenseForChart} name="year" />
        ) : (
          <BarOrAreaChart data={yearWiseExpenseForChart} name="year" />
        ))
      )}
    </>
  );
};

export default memo(YearWiseExpenseForChart);
