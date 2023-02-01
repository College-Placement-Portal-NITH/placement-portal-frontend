import { ExperienceCardProps } from '../../../utils/types'
import styles from './ExperienceCard.module.scss'

function ExperienceCard({
  title,
  description,
  imgUrl,
  role,
  jobType,
  selStatus,
  userName,
  difficulty,
  postedOn,
}: ExperienceCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.main_container}>
        <img src={imgUrl} className={styles.img} alt="profileDp" />
        <div className={styles.info_container}>
          <p className={styles.title}>{title}</p>
          <p className={styles.role}>{role}</p>
          <p className={styles.truncate}>{description}</p>
        </div>
      </div>
      <div className={styles.separator} />
      <div className={styles.tags_container}>
        <div className={styles.tag}>
          <span>{selStatus}</span>
        </div>
        <div className={styles.tag}>
          <span>{userName}</span>
        </div>
        <div className={styles.tag}>
          <span>{jobType}</span>
        </div>
        <div className={styles.tag}>
          <span>{difficulty}</span>
        </div>
        <div className={styles.tag}>
          <span>{postedOn}</span>
        </div>
      </div>
    </div>
  )
}

export default ExperienceCard
