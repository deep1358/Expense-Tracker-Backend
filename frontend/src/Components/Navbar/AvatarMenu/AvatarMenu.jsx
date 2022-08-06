import React from 'react';
import { Menu, Avatar, Divider } from '@mantine/core';
import { logoutUser } from '../../../store/user/ThunkFunctions/logoutUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './AvatarMenu.style';

const AvatarMenu = ({ deleteConfirmBoxToggleOpened }) => {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const { classes } = useStyles();

  return (
    <Menu
      className={classes.Menu}
      control={
        <Avatar
          size="md"
          referrerPolicy="no-referrer"
          src={user.userAvatar}
          alt="User Avatar"
          color="indigo"
          radius="xl"
        />
      }
    >
      <Menu.Item
        onClick={() => {
          dispatch(logoutUser(navigate));
        }}
      >
        Logout
      </Menu.Item>
      <Divider />
      <Menu.Label>Danger zone</Menu.Label>
      <Menu.Item color="red" onClick={() => deleteConfirmBoxToggleOpened()}>
        Delete account
      </Menu.Item>
    </Menu>
  );
};

export default AvatarMenu;
