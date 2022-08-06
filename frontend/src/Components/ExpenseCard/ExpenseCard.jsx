import React from 'react';
import { Card, Text, Group, Stack, Title, ActionIcon } from '@mantine/core';
import { ArrowRight } from 'tabler-icons-react';
import { Link } from 'react-router-dom';
import { useStyles } from './ExpenseCard.style';

const ExpenseCard = ({ amount, name, year, month }) => {
  const { classes } = useStyles();

  return (
    <Card className={classes.card} shadow="sm" p="lg" radius="md" withBorder>
      <Text align="center" className={classes.title}>
        {name}
      </Text>
      <Group className={classes.group}>
        <Stack spacing={0}>
          <Text className={classes.text} color="grey">
            Total
          </Text>
          <Title order={3}>{`₹ ${amount}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</Title>
        </Stack>
        <Link to={month ? `/years/${year}/${month}` : `/years/${year}`}>
          <ActionIcon variant="light">
            <ArrowRight size={16} />
          </ActionIcon>
        </Link>
      </Group>
    </Card>
  );
};

export default ExpenseCard;
