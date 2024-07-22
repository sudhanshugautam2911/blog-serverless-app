import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { BlogDetailsPage } from "./pages/BlogDetailsPage";
import { Blogs } from "./pages/Blogs";
import { PublishBlog } from "./pages/PublishBlog";
import { HomePage } from "./pages/HomePage";
import { ProtectedPage } from "./pages/ProtectedPage";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/blogs/:id" element={
          <ProtectedPage>
            <BlogDetailsPage />
          </ProtectedPage>
        } />
        <Route path="/blogs" element={
          <ProtectedPage>
            <Blogs />
          </ProtectedPage>
        } />
        <Route path="/publish-blog" element={
          <ProtectedPage>
            <PublishBlog />
          </ProtectedPage>
        } />

        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
