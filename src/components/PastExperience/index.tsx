import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import styles from './PastExperience.module.scss'
import PastExperienceData from '../../utils/PastExperienceData'

function PastExperience() {
  return (
    <div className={styles.item_contained}>
      <ul>
        {PastExperienceData.map((val) => {
          return (
            <li key={val.id} className={styles.list_item}>
              <Link className={styles.student_url} to={val.link}>
                <div className={styles.student_data}>
                  <div className={styles.student_photo}>
                    <FontAwesomeIcon icon={faUser} color="grey" size="lg" fixedWidth />
                  </div>
                  <div>
                    <div className={styles.student_name}> {val.studentName}</div>
                    <div className={styles.student_date}>{val.date}</div>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default PastExperience
