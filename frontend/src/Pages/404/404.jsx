import React from "react";
import { Container, Title, Text, Button, Group, Image } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useStyles } from "./404.style";

export default function Error404() {
  const { classes } = useStyles();

  const navigate = useNavigate();

  const { currentMonth, currentYear } = useSelector((state) => state.expense);
  const { months } = useSelector((state) => state.utils);

  return (
    <Container className={classes.root}>
      <div className={classes.inner}>
        <Image src="/404.svg" alt="404" className={classes.image} />
        <div className={classes.content}>
          <Title className={classes.title}>Nothing to see here</Title>
          <Text
            color="dimmed"
            size="lg"
            align="center"
            className={classes.description}
          >
            Page you are trying to open does not exist. You may have mistyped
            the address.
          </Text>
          <Group position="center">
            <Button
              onClick={() =>
                navigate(`/years/${currentYear}/${months[+currentMonth - 1]}`)
              }
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
