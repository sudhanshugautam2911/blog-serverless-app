import { AppBar } from "../components/AppBar"
import { BlogsCard } from "../components/BlogsCard"
import { Sekelton } from "../components/Sekelton"
import { useBlogs } from "../hooks"
import styles from './Blogs.module.css'

export const Blogs = () => {
    const { loading, blogs } = useBlogs();
    if (loading) {
        return <div >
            <AppBar />
            <div className={styles.loadingScreen}>
                <Sekelton />
                <Sekelton />
                <Sekelton />
                <Sekelton />
                <Sekelton />
            </div>
        </div>
    }

    return (
        <div>
            <AppBar />
            <div className={styles.mainBlogs}>
                <div>
                    {
                        blogs.map(blog => (
                            <BlogsCard
                                key={blog.id}
                                id={blog.id}
                                authorName={blog.author.name || "Anonymous"}
                                title={blog.title}
                                content={blog.content}
                                publishedDate="Dec 3, 2023"
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}