import { Avatar } from "./BlogsCard"
import styles from './AppBar.module.css'
import { Link } from "react-router-dom"

export const AppBar = () => {
    return (
        <div className={styles.appbar}>
            <Link to="/blogs" className={styles.Linktag}>
                <h2 className={styles.heading}>Medium</h2>
            </Link>
            <div className={styles.options}>
                <Link to="/publish-blog">
                    <button className={styles.uploadBtn}>Publish</button>
                </Link>
                <Avatar size="medium" authorName="Lucky V." />
            </div>
        </div>
    )
}