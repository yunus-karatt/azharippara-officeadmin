import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NoFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Layout from "./pages/Layout/Layout";

import HouseHolds from "./pages/HouseHolds/HouseHolds";
import Profile from "./pages/Profile/Profile";
import ProtectedRoute from "../Routes/ProtectedRoutes";
import AddHouse from "./pages/HouseHolds/AddHouse";
import ListMembers from "./pages/HouseHolds/ListMembers";
import AddMember from "./pages/HouseHolds/AddMember";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />

              <Route path="/houses" element={<HouseHolds />} />
              <Route path="/houses/add" element={<AddHouse />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/members/:houseId" element={<ListMembers />} />
              <Route path="/member/add/:houseId" element={<AddMember />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
