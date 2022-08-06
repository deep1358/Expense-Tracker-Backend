import { createStyles } from '@mantine/core';

export const useStyles = createStyles((theme) => ({
  card: {
    width: 250,
    backgroundColor: theme.colors.dark[7],
    position: 'relative',
    height: 180,
    padding: '0 !important'
  },
  title: {
    position: 'absolute',
    top: '25%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: '6.2rem',
    opacity: 0.15,
    fontFamily: 'Lora, sans-serif !important'
  },
  group: {
    position: 'absolute',
    bottom: '0',
    padding: '10px',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  text: {
    fontSize: '.8rem'
  }
}));
