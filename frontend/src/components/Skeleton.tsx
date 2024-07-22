import styles from './Skeleton.module.css'

export const Skeleton = () => {
    return (
        <div className={styles.loadingContainer}>
            <article >
                <div className={styles.loadingBar1}></div>

                <div className={styles.loadingTitle}></div>
                <div className={styles.loadingBarContent}></div>
                <div className={styles.loadingBarContent}></div>

                <div className={styles.loadingTime}></div>

            </article>

        </div>
    )
}

export const SkeletonDetailed = () => {
    return (
        <div className={styles.loadingContainer}>
            <article >
                <div className={styles.loadingTitle}></div>
                <div className={styles.loadingBar1}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>
                <div className={styles.detailedContent}></div>
                <div className={styles.loadingContentMini}></div>

            </article>

        </div>
    )
}