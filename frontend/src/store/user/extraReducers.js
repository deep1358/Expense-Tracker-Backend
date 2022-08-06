import { deleteCategory } from "./ThunkFunctions/deleteCategory";
import { createCategory } from "./ThunkFunctions/createCategory";
import { deleteUser } from "./ThunkFunctions/deleteUser";
import { fetchUser } from "./ThunkFunctions/fetchUser";
import { logoutUser } from "./ThunkFunctions/logoutUser";
import { updateCategory } from "./ThunkFunctions/updateCategory";

export const extraReducers = {
  [fetchUser.pending]: (state) => {
    state.fetchingUser = true;
    state.fetchingCategories = true;
  },
  [fetchUser.fulfilled]: (state, action) => {
    if (action.payload?.isError) {
      state.error = action.payload.message;
      state.loggedIn = false;
    } else if (!action.payload.user) state.loggedIn = false;
    else {
      state.user = action.payload.user;
      state.error = null;
    }
    state.fetchingUser = false;
    state.fetchingCategories = false;
  },
  [fetchUser.rejected]: (state, action) => {
    state.error = action.payload;
    state.fetchingUser = false;
    state.fetchingCategories = false;
    state.loggedIn = false;
  },

  [logoutUser.pending]: (state) => {
    state.loggingOut = true;
  },
  [logoutUser.fulfilled]: (state, action) => {
    state.user = null;
    state.loggedIn = false;
    state.loggingOut = false;
    if (action.payload?.isError) state.error = action.payload;
  },
  [logoutUser.rejected]: (state, action) => {
    state.error = action.payload;
    state.loggingOut = false;
  },

  [deleteUser.pending]: (state) => {
    state.deletingUser = true;
  },
  [deleteUser.fulfilled]: (state, action) => {
    state.user = null;
    state.loggedIn = false;
    state.deletingUser = false;
    if (action.payload?.isError) state.error = action.payload;
  },
  [deleteUser.rejected]: (state, action) => {
    state.error = action.payload;
    state.deletingUser = false;
  },

  [createCategory.pending]: (state) => {
    state.creatingCategory = true;
  },
  [createCategory.fulfilled]: (state, action) => {
    if (action.payload?.isError) state.error = action.payload;
    else {
      state.user.categories = action.payload;
      state.error = null;
    }
    state.creatingCategory = false;
  },
  [createCategory.rejected]: (state, action) => {
    state.error = action.payload;
    state.creatingCategory = false;
  },

  [deleteCategory.pending]: (state) => {
    state.deletingCategory = true;
  },
  [deleteCategory.fulfilled]: (state, action) => {
    if (action.payload?.isError) state.error = action.payload;
    else {
      state.user.categories = action.payload;
      state.error = null;
    }
    state.deletingCategory = false;
  },
  [deleteCategory.rejected]: (state, action) => {
    state.error = action.payload;
    state.deletingCategory = false;
  },

  [updateCategory.pending]: (state) => {
    state.updatingCategory = true;
  },
  [updateCategory.fulfilled]: (state, action) => {
    if (action.payload?.isError) state.error = action.payload;
    else {
      state.user.categories = action.payload;
      state.error = null;
    }
    state.updatingCategory = false;
  },
  [updateCategory.rejected]: (state, action) => {
    state.error = action.payload;
    state.updatingCategory = false;
  },
};
