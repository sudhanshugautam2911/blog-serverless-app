import { useParams } from "react-router-dom"
import { useBlog } from "../hooks";
import { BlogDetail } from "../components/BlogDetail";
import { AppBar } from "../components/AppBar";
import styles from './BlogDetailsPage.module.css'
import { Skeleton, SkeletonDetailed } from "../components/Skeleton";

export const BlogDetailsPage = () => {
  const params = useParams();
  const postId = params.id;

  const { loading, blog } = useBlog({ id: Number(postId) });

  if (loading) {
    return (
      <div>
        <AppBar />
        <div className={styles.loadingScreen}>
          <div className={styles.left}>
            <SkeletonDetailed/>
          </div>
          <div className={styles.right}>
          <Skeleton/>
            
          </div>
        </div>
      </div>
    )
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
