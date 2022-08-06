import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryWiseExpenseForChart } from '../../../store/expense/ThunkFunctions/getCategoryWiseExpenseForChart';
import BarOrAreaChart from '../BarOrAreaChart/BarOrAreaChart';
import DonutChart from '../DonutChart/DonutChart';
import { Select, Group, LoadingOverlay, Alert, Center, Title } from '@mantine/core';
import CustomLoader from '../../CustomLoader';
import { AlertCircle } from 'tabler-icons-react';

const CategoryWiseExpenseForChart = ({ yearWiseExpense }) => {
  const dispatch = useDispatch();

  const {
    categoryWiseExpenseForChart,
    gettingCategoryWiseExpenseForChart,
    categoryWiseExpenseForChartError
  } = useSelector((state) => state.expense);

  const { months, fixedDays, _30DaysMonths, _31DaysMonths } = useSelector((state) => state.utils);

  const { user } = useSelector((state) => state.user);

  const [categoryWiseDays, setCategoryWiseDays] = useState([]);
  const [categoryWiseMonths, setCategoryWiseMonths] = useState(months);
  const [categoryWiseYears, setCategoryWiseYears] = useState([]);

  const [categoryWiseExpenseYear, setCategoryWiseExpenseYear] = useState('All');
  const [categoryWiseExpenseMonth, setCategoryWiseExpenseMonth] = useState('All');
  const [categoryWiseExpenseDay, setCategoryWiseExpenseDay] = useState('All');

  const [chartType, setChartType] = useState('bar');

  useEffect(() => {
    if (user) {
      dispatch(
        getCategoryWiseExpenseForChart([
          categoryWiseExpenseYear,
          categoryWiseExpenseMonth,
          categoryWiseExpenseDay
        ])
      );
    }
  }, [user]);

  useEffect(() => {
    if (categoryWiseExpenseYear === 'All' && categoryWiseExpenseMonth === 'All') {
      setCategoryWiseDays(fixedDays);
    } else if (categoryWiseExpenseMonth !== 'All') {
      const tempYear = categoryWiseExpenseYear === 'All' ? 2020 : +categoryWiseExpenseYear;
      const daysCount = new Date(
        tempYear,
        months.indexOf(categoryWiseExpenseMonth) + 1,
        0
      ).getDate();
      setCategoryWiseDays(
        Array.from(Array(daysCount).keys())
          .map((i) => i + 1)
          .map((i) => i.toString())
          .map((i) => (i.length === 1 ? `0${i}` : i))
      );
    }
  }, [categoryWiseExpenseMonth, categoryWiseExpenseYear]);

  useEffect(() => {
    if (+categoryWiseExpenseDay === 31) {
      setCategoryWiseMonths(_31DaysMonths);
    } else if (+categoryWiseExpenseDay === 30) {
      setCategoryWiseMonths(_30DaysMonths);
    } else if (+categoryWiseExpenseDay === 29) {
      const tempYear = isNaN(+categoryWiseExpenseYear) ? 2020 : +categoryWiseExpenseYear;
      if (leapYear(tempYear)) setCategoryWiseMonths(months);
      else setCategoryWiseMonths(_30DaysMonths);
    } else {
      setCategoryWiseMonths(months);
    }
  }, [categoryWiseExpenseDay, categoryWiseExpenseYear]);

  useEffect(() => {
    setCategoryWiseYears(Object.keys(yearWiseExpense).sort((a, b) => b - a));
    if (categoryWiseExpenseDay === '29' && categoryWiseExpenseMonth === 'February')
      setCategoryWiseYears(categoryWiseYears.filter((year) => leapYear(+year)));
  }, [Object.keys(yearWiseExpense).length, categoryWiseExpenseMonth, categoryWiseExpenseDay]);

  function leapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  const handleCategoryWiseExpenseYearChange = (value) => {
    setCategoryWiseExpenseYear(value);
    dispatch(
      getCategoryWiseExpenseForChart([
        value,
        months.indexOf(categoryWiseExpenseMonth) === -1
          ? 'All'
          : months.indexOf(categoryWiseExpenseMonth) + 1,
        categoryWiseExpenseDay
      ])
    );
  };

  const handleCategoryWiseExpenseMonthChange = (value) => {
    setCategoryWiseExpenseMonth(value);
    dispatch(
      getCategoryWiseExpenseForChart([
        categoryWiseExpenseYear,
        months.indexOf(value) === -1 ? 'All' : months.indexOf(value) + 1,
        categoryWiseExpenseDay
      ])
    );
  };

  const handleCategoryWiseExpenseDayChange = (value) => {
    setCategoryWiseExpenseDay(value);
    dispatch(
      getCategoryWiseExpenseForChart([
        categoryWiseExpenseYear,
        months.indexOf(categoryWiseExpenseMonth) === -1
          ? 'All'
          : months.indexOf(categoryWiseExpenseMonth) + 1,
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
          Category Wise Expense
        </Title>
      </Center>
      <Group>
        <Select
          size="xs"
          data={['All', ...categoryWiseYears]}
          label="Select a Year"
          value={categoryWiseExpenseYear}
          onChange={handleCategoryWiseExpenseYearChange}
        />
        <Select
          size="xs"
          data={['All', ...categoryWiseMonths]}
          label="Select a Month"
          value={categoryWiseExpenseMonth}
          onChange={handleCategoryWiseExpenseMonthChange}
        />
        <Select
          size="xs"
          data={['All', ...categoryWiseDays]}
          label="Select a Day"
          value={categoryWiseExpenseDay}
          onChange={handleCategoryWiseExpenseDayChange}
        />
        <Select
          size="xs"
          data={['bar', 'donut']}
          label="Select a Chart Type"
          value={chartType}
          onChange={handleChartTypeChange}
        />
      </Group>
      {gettingCategoryWiseExpenseForChart ? (
        <LoadingOverlay loader={<CustomLoader />} visible blur={2} />
      ) : categoryWiseExpenseForChartError ? (
        <Alert mt={50} icon={<AlertCircle size={16} />} title="Error!" color="red">
          {categoryWiseExpenseForChartError}
        </Alert>
      ) : (
        categoryWiseExpenseForChart &&
        (chartType === 'donut' ? (
          <DonutChart data={categoryWiseExpenseForChart} name="category" />
        ) : (
          <BarOrAreaChart data={categoryWiseExpenseForChart} name="category" />
        ))
      )}
    </>
  );
};

export default memo(CategoryWiseExpenseForChart);
