import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import ShowPost from "./layouts/ShowPost";
import FeedHome from "./layouts/FeedHome";
import FeedMessage from "./layouts/FeedMessage";
import FeedFriends from "./layouts/FeedFriends";
import SearchLayout from "./layouts/SearchLayout";
import FeedNotification from "./layouts/FeedNotification";
import FeedHotel from "./layouts/FeedHotel";
import FeedDayout from "./layouts/FeedDayout";
import FeedRestuarant from "./layouts/FeedRestuarant";
import FeedMarketplace from "./layouts/FeedRestuarant";

const App = () => {
  /* const location = useLocation();
  const state = useLocation.state;

  const background = location && state.background;
 */
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<FeedHome />} />
          <Route path="message" element={<FeedMessage />} />
          <Route path="friends" element={<FeedFriends />} />
          <Route path="notifications" element={<FeedNotification />} />
          <Route path="search" element={<SearchLayout />} />
          <Route path="hotels" element={<FeedHotel />} />
          <Route path="marketplace" element={<FeedMarketplace />} />
          <Route path="events" element={<SearchLayout />} />
          <Route path="dayouts" element={<FeedDayout />} />
          <Route path="restuarants" element={<FeedRestuarant />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/post/:postId" element={<ShowPost />} />
      </Routes>

      {/* {background && (
        <Routes>
          <Route path="/profile" element={<ProfileModal />} />
        </Routes>
      )} */}
    </>
  );
};

export default App;
