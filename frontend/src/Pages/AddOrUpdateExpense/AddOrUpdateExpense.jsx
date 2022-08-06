import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addExpense } from "../../store/expense/ThunkFunctions/addExpense";
import { getExpense } from "../../store/expense/ThunkFunctions/getExpense";
import { updateExpense } from "../../store/expense/ThunkFunctions/updateExpense";
import { setFocusedExpense } from "../../store/expense/index";
import {
  Paper,
  Textarea,
  NumberInput,
  Container,
  Select,
  Group,
  Title,
  Button,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { Calendar } from "tabler-icons-react";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { toggleLoadingOverlay } from "../../store/utils";
import UpdateExpenseSkeleton from "../../Components/AddOrUpdateExpense/UpdateExpenseSkeleton";

const AddOrUpdateExpense = () => {
  const { user } = useSelector((state) => state.user);
  const { creatingExpense, focusedExpense, updatingExpense, gettingExpense } =
    useSelector((state) => state.expense);

  const { months } = useSelector((state) => state.utils);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  const matches = useMediaQuery("(min-width: 400px)");

  const form = useForm({
    initialValues: {
      category: "",
      amount: 1,
      date: new Date(),
      note: "",
    },
    validate: (values) => ({
      category: values.category === "" ? "Category is required" : undefined,
      amount:
        values.amount < 0 || isNaN(values.amount) || values.amount === null
          ? "Amount must be greater than 0"
          : undefined,
      date: values.date ? undefined : "Date is required",
    }),
  });

  useEffect(() => {
    if (user) {
      if (id !== undefined) {
        dispatch(getExpense(id));
        if (Object.keys(focusedExpense)?.length > 0) {
          form.setValues({
            category: focusedExpense.category,
            amount: +focusedExpense.amount,
            date: new Date(
              focusedExpense.year,
              focusedExpense.month - 1,
              focusedExpense.day
            ),
            note: focusedExpense.note,
          });
        }
      } else
        form.setValues({
          category: "",
          amount: 1,
          date: new Date(),
          note: "",
        });
    }
  }, [user, Object.values(focusedExpense).length]);

  // Clear focused expense on unmount
  useEffect(() => {
    return () => dispatch(setFocusedExpense({}));
  }, []);

  useEffect(() => {
    if (creatingExpense || updatingExpense)
      dispatch(toggleLoadingOverlay(true));
    else dispatch(toggleLoadingOverlay(false));
  }, [creatingExpense, updatingExpense]);

  const handleSaveOrUpdate = (values) => {
    if (id === undefined) {
      const year = form?.values?.date.getFullYear();
      const month = form?.values?.date.getMonth();
      const day = form?.values?.date.getDate();

      dispatch(
        addExpense({
          form: {
            ...values,
            date: new Date(year, month, day + 1).toISOString().substring(0, 10),
          },
          year,
          month: months[+month],
          navigate,
        })
      );
    } else
      dispatch(
        updateExpense({
          form: values,
          year: focusedExpense.year,
          month: months[focusedExpense.month - 1],
          id,
          navigate,
        })
      );
  };

  const handleAddMore = (values) => {
    const year = form.values.date.getFullYear();
    const month = form.values.date.getMonth();
    const day = form.values.date.getDate();

    dispatch(
      addExpense({
        form: {
          ...values,
          date: new Date(year, month, day).toISOString().substring(0, 10),
        },
      })
    );
    form.reset();
  };

  return (
    <>
      <Container size={420}>
        <Title align="center">
          {id === undefined ? "Add Expense" : "Update Expense"}
        </Title>
        <Paper
          withBorder
          shadow="md"
          p={30}
          mt={30}
          size="md"
          radius="md"
          mx="auto"
        >
          {id !== undefined && gettingExpense ? (
            <UpdateExpenseSkeleton />
          ) : (
            <form onSubmit={form.onSubmit(handleSaveOrUpdate)}>
              <Select
                clearable
                data={user?.categories || []}
                label="Select a category"
                placeholder="Pick one"
                {...form.getInputProps("category")}
                required
                autoFocus={id === undefined}
              />
              <NumberInput
                name="amount"
                label="Amount"
                // parser={(value) => value.replace(/\₹\s?|(,*)/g, '')}
                // formatter={(value) =>
                //   !Number.isNaN(parseFloat(value))
                //     ? `₹ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                //     : '₹ '
                // }
                min={1}
                {...form.getInputProps("amount")}
                required
                stepHoldDelay={500}
                stepHoldInterval={100}
                spellCheck={false}
                mt="md"
              />
              <DatePicker
                placeholder="Pick a date"
                label="Date"
                {...form.getInputProps("date")}
                disabled={id !== undefined}
                required
                icon={<Calendar size={16} />}
                mt="md"
              />

              <Textarea
                label="Note"
                placeholder="Leave a note"
                {...form.getInputProps("note")}
                autosize
                mt="md"
              />
              <Group position="apart" mt="lg">
                <Button
                  style={
                    id === undefined && matches
                      ? { width: "47%" }
                      : { width: "100%" }
                  }
                  type="submit"
                >
                  {creatingExpense || updatingExpense ? "Saving..." : "Save"}
                </Button>
                {id === undefined && (
                  <Button
                    style={matches ? { width: "47%" } : { width: "100%" }}
                    onClick={form.onSubmit(handleAddMore)}
                    variant="outline"
                  >
                    Add More
                  </Button>
                )}
              </Group>
            </form>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default AddOrUpdateExpense;
