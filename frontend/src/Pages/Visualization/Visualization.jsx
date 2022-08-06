import React, { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import CategoryWiseExpenseForChart from '../../Components/Visualization/CategoryWiseExpenseForChart/CategoryWiseExpenseForChart';
import DayWiseExpenseForChart from '../../Components/Visualization/DayWiseExpenseForChart/DayWiseExpenseForChart';
import MonthWiseExpenseForChart from '../../Components/Visualization/MonthWiseExpenseForChart/MonthWiseExpenseForChart';
import YearWiseExpenseForChart from '../../Components/Visualization/YearWiseExpenseForChart/YearWiseExpenseForChart';
import { Container, SimpleGrid, Paper } from '@mantine/core';

const Visualization = () => {
  const { user } = useSelector((state) => state.user);
  const { yearWiseExpense } = useSelector((state) => state.expense);

  const [chartCategories, setChartCategories] = useState([]);

  useEffect(() => {
    if (user) setChartCategories(user.categories);
  }, [user]);

  return (
    <Container size={1440}>
      <SimpleGrid mb={10} breakpoints={[{ minWidth: 1000, cols: 2 }]}>
        <Paper style={{ position: 'relative' }} withBorder shadow="md" p={10} size="md" radius="md">
          <CategoryWiseExpenseForChart yearWiseExpense={yearWiseExpense} />
        </Paper>
        <Paper style={{ position: 'relative' }} withBorder shadow="md" p={10} size="md" radius="md">
          <DayWiseExpenseForChart
            chartCategories={chartCategories}
            yearWiseExpense={yearWiseExpense}
          />
        </Paper>
        <Paper style={{ position: 'relative' }} withBorder shadow="md" p={10} size="md" radius="md">
          <MonthWiseExpenseForChart
            chartCategories={chartCategories}
            yearWiseExpense={yearWiseExpense}
          />
        </Paper>
        <Paper style={{ position: 'relative' }} withBorder shadow="md" p={10} size="md" radius="md">
          <YearWiseExpenseForChart chartCategories={chartCategories} />
        </Paper>
      </SimpleGrid>
    </Container>
  );
};

export default Visualization;
