import styles from './DashboardCard.module.scss'

interface DashboardProps {
  title: string
  description: string
  imgUrl: string
  postedOn: number
}
function DashboardCard({ title, description, imgUrl, postedOn }: DashboardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.main_container}>
        <img className={styles.img} src={imgUrl} alt="companyLogo" />
        <div className={styles.container}>
          <p className={styles.title}>{title}</p>
          <p className={styles.desc}>{description}</p>
        </div>
      </div>
      <div className={styles.separator} />
      <p className={styles.time_stamp}>{postedOn} min ago</p>
    </div>
  )
}

export default DashboardCard
