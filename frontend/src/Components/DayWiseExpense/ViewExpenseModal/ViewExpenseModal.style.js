import { createStyles } from '@mantine/core';

export const useStyles = createStyles(() => ({
  Text: {
    '@media (max-width: 600px)': {
      fontSize: '10px'
    }
  },
  td: {
    minWidth: '110px',
    '@media (max-width: 600px)': {
      minWidth: '70px'
    }
  }
}));
