import { createStyles } from '@mantine/core';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    root: {
      position: 'sticky',
      zIndex: 2,
      backgroundColor: theme.colors.dark[6]
    },

    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '100%'
    },

    logo: {
      width: '150px',
      [theme.fn.smallerThan('xs')]: {
        width: '120px'
      }
    },

    links: {
      '@media (max-width: 920px)': {
        display: 'none'
      }
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      '@media (min-width: 920px)': {
        borderRadius: theme.radius.sm
      },
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black
        }
      }
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: '5px'
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25)
            : theme.colors[theme.primaryColor][0],
        color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7],
        [`& .${icon}`]: {
          color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 7]
        }
      }
    },

    Text: {
      fontSize: '1.5rem',
      [theme.fn.largerThan('xs')]: {
        fontSize: '2rem'
      },
      '@media (max-width: 350px)': {
        fontSize: '1.2rem'
      },
      fontFamily: 'Rubik Moonrocks, cursive'
    },

    menu: {
      [theme.fn.largerThan('md')]: {
        display: 'none'
      },
      cursor: 'pointer'
    },

    burger: {
      '@media (min-width: 920px)': {
        display: 'none'
      }
    },

    dropdown: {
      position: 'absolute',
      [theme.fn.smallerThan('xs')]: {
        top: 60
      },
      top: 70,
      left: 0,
      right: 0,
      zIndex: 0,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      borderTopWidth: 0,
      overflow: 'hidden',
      backgroundColor: theme.colors.dark[6],

      '@media (min-width: 920px)': {
        display: 'none'
      }
    }
  };
});

export default useStyles;
