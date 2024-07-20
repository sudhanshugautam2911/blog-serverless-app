import { AppBar } from './AppBar';
import styles from './BlogDetail.module.css'
import { Avatar } from './BlogsCard';

interface Blog {
    title: string;
    content: string;
    // publishedDate: string;
    authorName: string;
}
export const BlogDetail = ({ 
    title,
    content,
    authorName,
    // publishedDate,
 }: Blog) => {
    return (
        <div>
            <AppBar />
            <div className={styles.mainContainer}>
                <article className={styles.left}>
                    <header>
                        <h1 className={styles.title}>{title}</h1>
                        <p className={styles.time}>Posted on August 24, 2023</p>
                    </header>
                    <main>
                        <p className={styles.content}>{content}</p>
                    </main>
                </article>
                <div className={styles.rightFixBox}>
                    <p className={styles.author}>Author</p>
                    <div className={styles.authorContent}>
                        <Avatar size='small' authorName={authorName}/>
                        <p className={styles.authorName}>
                            {authorName ? authorName : "Anonymous"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}