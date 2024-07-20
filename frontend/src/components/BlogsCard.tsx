import { Link } from 'react-router-dom';
import styles from './BlogsCard.module.css'

interface blogCardProps {
    id: number,
    authorName: string;
    title: string;
    content: string;
    publishedDate: string
}

export const BlogsCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: blogCardProps) => {
    return (
        <Link to={`/blogs/${id}`} className={styles.Linktag}>
            <article className={styles.blogsCard}>
                <header className={styles.heading}>
                    <Avatar authorName={authorName} />
                    <span className={styles.authorName}>{authorName}</span>  •
                    <span className={styles.publishedDate}>{publishedDate}</span>
                </header>
                <main className={styles.article}>
                    <div className={styles.title}>
                        {title}
                    </div>
                    <div className={styles.content}>
                        {content.slice(0, 100) + "..."}
                    </div>
                </main>
                <footer>
                    <span className={styles.readingTime}>
                        {Math.ceil(content.length / 100)} min read
                    </span>
                </footer>
                <div className={styles.divider}></div>
            </article>
        </Link>
    )
}

export function Avatar({ authorName, size="small" }: { authorName: string, size?: string }) {
    const sizeClass = size === 'small' ? styles.small :
        size === 'large' ? styles.large :
            styles.medium;
    return (
        <span className={`${styles.avatar} ${sizeClass}`}>
            {authorName[0]}
        </span>
    )
}