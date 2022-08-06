export const reducers = {
  MakeUnAuthenticated: (state) => {
    state.loggedin = false;
    state.user = null;
  }
};
