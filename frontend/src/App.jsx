import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login/Login";
import BaseLayout from "./Layout/BaseLayout";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/user/ThunkFunctions/fetchUser";
import ProtectedRoute from "./Components/ProtectedRoute";
import DayWiseExpense from "./Pages/DayWiseExpense/DayWiseExpense";
import AddOrUpdateExpense from "./Pages/AddOrUpdateExpense/AddOrUpdateExpense";
import Categories from "./Pages/Category/Categories";
import YearWiseExpense from "./Pages/YearWiseExpense/YearWiseExpense";
import MonthWiseExpense from "./Pages/MonthWiseExpense.jsx/MonthWiseExpense";
import DurationLayout from "./Layout/DurationLayout";
import Error404 from "./Pages/404/404";
import Visualization from "./Pages/Visualization/Visualization";

function App() {
  const dispatch = useDispatch();

  const [currentMonth] = useState(new Date().getMonth());
  const [currentYear] = useState(new Date().getFullYear());

  const { months } = useSelector((state) => state.utils);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<BaseLayout />}>
            <Route
              path="/"
              element={
                <Navigate
                  to={`/years/${currentYear}/${months[currentMonth]}`}
                />
              }
            />
            <Route path="/addExpense" element={<AddOrUpdateExpense />} />
            <Route path="/updateExpense/:id" element={<AddOrUpdateExpense />} />
            <Route path="/visualization" element={<Visualization />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/" element={<DurationLayout />}>
              <Route
                path="/"
                element={
                  <Navigate
                    to={`/years/${currentYear}/${months[currentMonth]}`}
                  />
                }
              />
              <Route path="/years" element={<YearWiseExpense />} />
              <Route path="/years/:year" element={<MonthWiseExpense />} />
              <Route path="/years/:year/:month" element={<DayWiseExpense />} />
            </Route>
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
