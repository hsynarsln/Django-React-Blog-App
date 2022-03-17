import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavbarComp from '../components/NavbarComp';
import Home from '../pages/Home';
import Login from '../pages/Login';
import NewBlog from '../pages/NewBlog';
import PostDetails from '../pages/PostDetails';
import Register from '../pages/Register';
import UpdateBlog from '../pages/UpdateBlog';

const AppRouter = () => {
  return (
    <Router>
      <NavbarComp />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/detail/:id' element={<PostDetails />} />
        <Route path='/update/:id' element={<UpdateBlog />} />
        <Route path='/new' element={<NewBlog />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
