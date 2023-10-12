/* eslint-disable react/no-danger */
import { Post } from '../../../utils/types'
import styles from './DashboardPostCard.module.scss'

function DashboardPostCard({ title, description, imageUrl, postedOn, onClick }: Post) {
  return (
    <div onClick={onClick} className={styles.card}>
      <div className={styles.main_container}>
        <img className={styles.post_image} src={imageUrl} alt="companyLogo" />
        <div className={styles.content}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.description} dangerouslySetInnerHTML={{ __html: description }} />
        </div>
      </div>
      {/* <div className={styles.separator} /> */}
      <span className={styles.time_stamp}>{postedOn}</span>
    </div>
  )
}

export default DashboardPostCard
