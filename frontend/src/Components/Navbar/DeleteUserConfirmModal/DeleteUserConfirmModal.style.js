import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  deleteModalGroup: {
    "& > *": {
      fontSize: ".95rem",
      [theme.fn.smallerThan("xs")]: {
        fontSize: ".75rem !important",
      },
    },
  },
}));

export default useStyles;
