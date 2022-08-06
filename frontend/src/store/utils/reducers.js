export const reducers = {
  toggleLoadingOverlay: (state, action) => {
    state.loadingOverlay = action.payload;
  }
};
