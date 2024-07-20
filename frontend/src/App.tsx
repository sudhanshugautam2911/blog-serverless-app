import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BlogDetailsPage } from "./pages/BlogDetailsPage";
import { Blogs } from "./pages/Blogs";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/blogs/:id" element={<BlogDetailsPage/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
