import { addExpense } from './ThunkFunctions/addExpense';
import { getExpenses } from './ThunkFunctions/getExpenses';
import { deleteExpense } from './ThunkFunctions/deleteExpense';
import { updateExpense } from './ThunkFunctions/updateExpense';
import { getExpense } from './ThunkFunctions/getExpense';
import { getYearWiseExpense } from './ThunkFunctions/getYearWiseExpense';
import { getMonthWiseExpense } from './ThunkFunctions/getMonthWiseExpense';
import { getCategoryWiseExpenseForChart } from './ThunkFunctions/getCategoryWiseExpenseForChart';
import { getDayWiseExpenseForChart } from './ThunkFunctions/getDayWiseExpenseForChart';
import { getMonthWiseExpenseForChart } from './ThunkFunctions/getMonthWiseExpenseForChart';
import { getYearWiseExpenseForChart } from './ThunkFunctions/getYearWiseExpenseForChart';

export const extraReducers = {
  [getExpenses.pending]: (state) => {
    state.gettingExpenses = true;
  },
  [getExpenses.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.gettingExpenses = false;
    state.errorMessage = errorMessage;
    state.expenses = expenses || [];
  },
  [getExpenses.rejected]: (state, action) => {
    state.gettingExpenses = false;
    state.error = action.error;
  },

  [getExpense.pending]: (state) => {
    state.gettingExpense = true;
  },
  [getExpense.fulfilled]: (state, action) => {
    const { expense, errorMessage } = action.payload;
    state.gettingExpense = false;
    state.errorMessage = errorMessage;
    state.focusedExpense = expense || {};
  },
  [getExpense.rejected]: (state, action) => {
    state.gettingExpense = false;
    state.error = action.error;
  },

  [addExpense.pending]: (state) => {
    state.creatingExpense = true;
  },
  [addExpense.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.creatingExpense = false;
    if (state.expenses && state.currentMonth === expenses?.month)
      state.expenses = [...state.expenses, expenses];
    state.error = errorMessage;
  },
  [addExpense.rejected]: (state, action) => {
    state.creatingExpense = false;
    state.error = action.error;
  },

  [deleteExpense.pending]: (state) => {
    state.deletingExpense = true;
  },
  [deleteExpense.fulfilled]: (state, action) => {
    const { errorMessage, id } = action.payload;
    state.deletingExpense = false;
    state.error = errorMessage;
    state.expenses = state.expenses.filter((expense) => expense._id !== id);
  },
  [deleteExpense.rejected]: (state, action) => {
    state.deletingExpense = false;
    state.error = action.error;
  },

  [updateExpense.pending]: (state) => {
    state.updatingExpense = true;
  },
  [updateExpense.fulfilled]: (state, action) => {
    const { errorMessage, id } = action.payload;
    state.updatingExpense = false;
    state.error = errorMessage;
    state.expenses = state.expenses?.map((expense) =>
      expense._id === id ? { ...expense, ...state.focusedExpense } : expense
    );
    state.focusedExpense = {};
  },
  [updateExpense.rejected]: (state, action) => {
    state.updatingExpense = false;
    state.error = action.error;
  },

  [getYearWiseExpense.pending]: (state) => {
    state.gettingYearWiseExpense = true;
  },
  [getYearWiseExpense.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.gettingYearWiseExpense = false;
    state.errorMessage = errorMessage;
    state.yearWiseExpense = expenses;
  },
  [getYearWiseExpense.rejected]: (state, action) => {
    state.gettingYearWiseExpense = false;
    state.error = action.error;
  },

  [getMonthWiseExpense.pending]: (state) => {
    state.gettingMonthWiseExpense = true;
  },
  [getMonthWiseExpense.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.gettingMonthWiseExpense = false;
    state.errorMessage = errorMessage;
    state.monthWiseExpense = expenses;
  },
  [getMonthWiseExpense.rejected]: (state, action) => {
    state.gettingMonthWiseExpense = false;
    state.error = action.error;
  },

  [getCategoryWiseExpenseForChart.pending]: (state) => {
    state.gettingCategoryWiseExpenseForChart = true;
  },
  [getCategoryWiseExpenseForChart.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.gettingCategoryWiseExpenseForChart = false;
    state.categoryWiseExpenseForChartError = errorMessage;
    state.categoryWiseExpenseForChart = expenses;
  },
  [getCategoryWiseExpenseForChart.rejected]: (state, action) => {
    state.gettingCategoryWiseExpenseForChart = false;
    state.error = action.error;
  },

  [getDayWiseExpenseForChart.pending]: (state) => {
    state.gettingDayWiseExpenseForChart = true;
  },
  [getDayWiseExpenseForChart.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.gettingDayWiseExpenseForChart = false;
    state.dayWiseExpenseForChartError = errorMessage;
    state.dayWiseExpenseForChart = expenses;
  },
  [getDayWiseExpenseForChart.rejected]: (state, action) => {
    state.gettingDayWiseExpenseForChart = false;
    state.error = action.error;
  },

  [getMonthWiseExpenseForChart.pending]: (state) => {
    state.gettingMonthWiseExpenseForChart = true;
  },
  [getMonthWiseExpenseForChart.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.gettingMonthWiseExpenseForChart = false;
    state.monthWiseExpenseForChartError = errorMessage;
    state.monthWiseExpenseForChart = expenses;
  },
  [getMonthWiseExpenseForChart.rejected]: (state, action) => {
    state.gettingMonthWiseExpenseForChart = false;
    state.error = action.error;
  },

  [getYearWiseExpenseForChart.pending]: (state) => {
    state.gettingYearWiseExpenseForChart = true;
  },
  [getYearWiseExpenseForChart.fulfilled]: (state, action) => {
    const { expenses, errorMessage } = action.payload;
    state.gettingYearWiseExpenseForChart = false;
    state.yearWiseExpenseForChartError = errorMessage;
    state.yearWiseExpenseForChart = expenses;
  },
  [getYearWiseExpenseForChart.rejected]: (state, action) => {
    state.gettingYearWiseExpenseForChart = false;
    state.error = action.error;
  }
};
