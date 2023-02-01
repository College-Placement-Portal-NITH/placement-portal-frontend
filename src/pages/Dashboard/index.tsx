import { Link } from 'react-router-dom'
import { faApple } from '@fortawesome/free-brands-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DashboardPostCard from '../../components/Cards/DashboardPostCard'
import { pastExperienceData, postsData, upcomingDriveData } from '../../utils/Data/dashboardData'
import { Drive, PastExperienceSummary, Post } from '../../utils/types'
import styles from './Dashboard.module.scss'

function Dashboard() {
  return (
    <>
      <h1 className={styles.page_name}>Dashboard</h1>
      <div className={styles.content}>
        <div className={styles.posts_container}>
          {postsData.map((post: Post) => {
            return <DashboardPostCard {...post} key={post.id} />
          })}
        </div>
        <div className={styles.side_panel}>
          <div className={styles.sidepanel_card}>
            <h1>Upcoming Drives</h1>
            <div className={styles.list_container}>
              {upcomingDriveData.map((listItem: Drive) => {
                return (
                  <Link key={listItem.id} className={styles.list_item} to={listItem.link}>
                    <div className={styles.pic}>
                      <FontAwesomeIcon icon={faApple} color="lightBlue" size="1x" fixedWidth />
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>{listItem.companyName}</p>
                      <p className={styles.date}>{listItem.date}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className={styles.sidepanel_card}>
            <h1>Past Experiences</h1>
            <div className={styles.list_container}>
              {pastExperienceData.map((listItem: PastExperienceSummary) => {
                return (
                  <Link key={listItem.id} className={styles.list_item} to={listItem.link}>
                    <div className={styles.pic}>
                      <FontAwesomeIcon icon={faUser} color="grey" size="1x" fixedWidth />
                    </div>
                    <div className={styles.info}>
                      <p className={styles.name}>{listItem.studentName}</p>
                      <p className={styles.date}>{listItem.date}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
