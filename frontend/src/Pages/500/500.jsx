import React from 'react';
import { Container, Title, Text, Button, Group, Image } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './500.style';

export default function Error500() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { currentMonth, currentYear } = useSelector((state) => state.expense);
  const { months } = useSelector((state) => state.utils);

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Image src="/500.svg" alt="500" className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Internal Server Error</Title>
          <Text color="dimmed" size="lg" align="center" className={classes.description}>
            Something went wrong. Please try again later.
          </Text>
          <Group position="center">
            <Button
              onClick={() => navigate(`/years/${currentYear}/${months[+currentMonth - 1]}`)}
              size="md"
            >
              Take me back to home page
            </Button>
          </Group>
        </div>
      </div>
    </Container>
  );
}
