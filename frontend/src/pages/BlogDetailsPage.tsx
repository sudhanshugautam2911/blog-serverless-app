import { useParams } from "react-router-dom"
import { useBlog } from "../hooks";
import { BlogDetail } from "../components/BlogDetail";


export const BlogDetailsPage = () => {
  const params = useParams();
  const postId = params.id;

  const { loading, blog } = useBlog({ id: Number(postId) });

  if (loading) {
    return <div>
      loading...
    </div>
  }
  if (!blog) {
    return <div>Error loading blog or blog not found</div>;
  }

  return (
    <div>
      <BlogDetail
        title={blog.title}
        content={blog.content}
        authorName={blog.author.name || "Anonymous"} />
    </div>
  )
}
