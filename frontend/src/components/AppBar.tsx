import { Avatar } from "./BlogsCard"
import styles from './AppBar.module.css'

export const AppBar = () => {
    return (
        <div className={styles.appbar}>
            <h2 className={styles.heading}>Medium</h2>
            <Avatar size="medium" authorName="Lucky V." />
        </div>
    )
}