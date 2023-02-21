import styles from './DashboardCard.module.scss'

function DashboardCard() {
  return (
    <div className={styles.card}>
      <div className={styles.main_container}>
        <div className={styles.post_image} />
        <div className={styles.content}>
          <div className={styles.title} />
          <div className={styles.description}>
            <div className={styles.para_line} />
            <div className={styles.para_line} />
            <div className={styles.para_line} />
          </div>
        </div>
      </div>
      <div className={styles.separator} />
      <div className={styles.time_stamp}>
        <div className={styles.stamp} />
      </div>
    </div>
  )
}

export default DashboardCard
