export const reducers = {
  setCurrentYear: (state, action) => {
    state.currentYear = action.payload;
  },
  setCurrentMonth: (state, action) => {
    state.currentMonth = action.payload;
  },
  setFocusedExpense: (state, action) => {
    state.focusedExpense = action.payload;
  }
};
