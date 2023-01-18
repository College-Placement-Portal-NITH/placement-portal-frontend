import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass, faChevronDown, faSliders } from '@fortawesome/free-solid-svg-icons'
import styles from './DashboardUI.module.scss'
import { DashboardCard } from '../Cards'

const arr = [
  {id:1,
    title:"title1",
    description:"kjnvjksdvjksd",
    imgUrl:"https://picsum.photos/200",
    postedOn:1
  },
  {id:2,
    title:"title2",
    description:"kjnvjksdvjksd",
    imgUrl:"https://picsum.photos/200",
    postedOn:2
  }
]

export default function DashboardUI() {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <p className={styles.title}>Dashboard</p>
        <div className={styles.filterContainer}>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon fontSize={20} icon={faMagnifyingGlass} />
          </div>
          <div className={styles.timeStampContainer}>
            <p className={styles.txt}>Date and Time</p>
            <FontAwesomeIcon fontSize={20} icon={faChevronDown} />
          </div>
          <div className={styles.searchContainer}>
            <FontAwesomeIcon fontSize={20} icon={faSliders} />
          </div>
        </div>
      </div>
      <div className={styles.cardContainer}>
        {arr.map(i => <DashboardCard 
        title={i.title} imgUrl = {i.imgUrl} description={i.description} key={i.id} postedOn={i.postedOn}
        />)}

      </div>
    </div>
  )
}
