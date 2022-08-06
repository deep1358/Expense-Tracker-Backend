import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './Navbar.style';
import { Header, Container, Group, Burger, Paper, Transition, Image } from '@mantine/core';
import { useBooleanToggle, useMediaQuery } from '@mantine/hooks';
import {} from '@mantine/hooks';
import { Apps, CirclePlus, ChartBar, Coin } from 'tabler-icons-react';
import { toggleLoadingOverlay } from '../../store/utils';
import DeleteUserConfirmModal from './DeleteUserConfirmModal/DeleteUserConfirmModal';
import AvatarMenu from './AvatarMenu/AvatarMenu';

const Navbar = () => {
  const dispatch = useDispatch();

  const { deletingUser, loggingOut } = useSelector((state) => state.user);

  const { currentMonth, currentYear } = useSelector((state) => state.expense);

  const { months } = useSelector((state) => state.utils);

  const smallScreen = useMediaQuery('(max-width: 576px)');

  const { classes, cx } = useStyles();

  const location = useLocation();

  const [burgerOpened, burgerToggleOpened] = useBooleanToggle(false);

  const [deleteConfirmBoxOpened, deleteConfirmBoxToggleOpened] = useBooleanToggle(false);

  const [activeNavLink, setNavLinkActive] = useState('');

  const links = [
    {
      label: 'My Expenses',
      link: `/years/${currentYear}/${months[currentMonth - 1]}`,
      icon: Coin
    },
    {
      label: 'Add Expense',
      link: '/addExpense',
      icon: CirclePlus
    },
    {
      label: 'My Categories',
      link: '/categories',
      icon: Apps
    },
    {
      label: 'Visualize your data',
      link: '/visualization',
      icon: ChartBar
    }
  ];

  useEffect(() => {
    setNavLinkActive(location.pathname);
  });

  useEffect(() => {
    if (loggingOut || deletingUser) dispatch(toggleLoadingOverlay(true));
    else dispatch(toggleLoadingOverlay(false));
  }, [loggingOut, deletingUser]);

  const items = links.map((link) => (
    <Link
      key={link.label}
      to={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: link.link.includes(activeNavLink)
      })}
      onClick={() => {
        setNavLinkActive(link.link);
        burgerToggleOpened();
      }}
    >
      <link.icon className={classes.linkIcon} />
      <span>{link.label}</span>
    </Link>
  ));

  return (
    <>
      <DeleteUserConfirmModal
        deleteConfirmBoxOpened={deleteConfirmBoxOpened}
        deleteConfirmBoxToggleOpened={deleteConfirmBoxToggleOpened}
      />
      <Header height={smallScreen ? 60 : 70} mb={30} className={classes.root}>
        <Container size="xl" className={classes.header}>
          <Burger
            opened={burgerOpened}
            onClick={() => burgerToggleOpened()}
            size="sm"
            className={classes.burger}
          />
          <Transition transition="scale-y" duration={200} mounted={burgerOpened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
              </Paper>
            )}
          </Transition>
          <Image alt="logo" className={classes.logo} src="/Logo.png" />
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
          <AvatarMenu deleteConfirmBoxToggleOpened={deleteConfirmBoxToggleOpened} />
        </Container>
      </Header>
    </>
  );
};

export default Navbar;
