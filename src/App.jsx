import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import AllPosts from "./components/AllPosts";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Router>
        <Navbar />
                <ToastContainer />

        <Routes>
          <Route path="/" element={<AllPosts />}></Route>

          <Route path="/createpost" element={<CreatePost />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
