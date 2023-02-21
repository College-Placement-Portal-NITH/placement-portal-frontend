import styles from './Dashboard.module.scss'
import DashboardCard from '../../../components/Wireframes/DashboardCard'

function Dashboard() {
  return (
    <div className={styles.container}>
      <div className={styles.page_name} />
      <div className={styles.content}>
        <div className={styles.posts_container}>
          <DashboardCard />
          <DashboardCard />
          <DashboardCard />
        </div>
        <div className={styles.side_panel}>
          <div className={styles.sidepanel_card}>
            <div className={styles.card_heading} />
            <div className={styles.list_container}>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
            </div>
          </div>

          <div className={styles.sidepanel_card}>
            <div className={styles.card_heading} />
            <div className={styles.list_container}>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
              <div className={styles.list_item}>
                <div className={styles.pic} />
                <div className={styles.info}>
                  <div className={styles.name} />
                  <div className={styles.date} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
