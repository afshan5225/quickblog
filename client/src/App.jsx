import React from "react";
import { Routes, Route } from "react-router-dom";

import {Toaster} from "react-hot-toast";

import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Layout from "./pages/admin/layout";
import Dashboard from "./pages/admin/Dashboard";
import AddBlog from "./pages/admin/AddBlog";
import Listblog from "./pages/admin/listblog";
import Comments from "./pages/admin/comments";
import Login from "./components/admin/login";
import 'quill/dist/quill.snow.css'
import { useAPPContext } from "./context/Appcontext";


function App() {
  const {token} = useAPPContext()
  return (
    <div>
      <Toaster/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/admin" element={token? <Layout />:<Login />}>
        <Route  index element = {<Dashboard/>}/>
        <Route path = 'addBlog' element={<AddBlog/>}/>
        <Route path = 'listBlog' element={<Listblog/>}/>
        <Route path = 'comments' element={<Comments/>}/>
        


        </Route>
      </Routes>
    </div>
  );
}

export default App;
