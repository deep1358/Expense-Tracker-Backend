import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../../src/axios";
import { error } from "./commonError";
import { Check, X } from "tabler-icons-react";
import { showNotification } from "@mantine/notifications";

// get current seconds since epoch to use as a unique id
const getCurrentSeconds = () => Math.floor(Date.now() / 1000);

export const deleteCategory = createAsyncThunk(
  "user/deleteCategory",
  async ([categoryName, setDeleteModalOpened]) => {
    try {
      const res = await axios.delete("/category/" + categoryName);
      setDeleteModalOpened(false);
      showNotification({
        id: `deleteCategory-${getCurrentSeconds()}`,
        message: "Category deleted successfully",
        color: "teal",
        icon: <Check />,
      });
      return res.data.categories;
    } catch (err) {
      showNotification({
        id: `deleteCategory-${getCurrentSeconds()}`,
        message: err.response.data.message || "Error deleting category",
        color: "red",
        icon: <X side={16} />,
      });
      return error(err);
    }
  }
);
