import { ExperiencesSidebarProps } from '../../utils/types'
import InterviewExperienceFilters from '../ExperiencesFilters'
import styles from './SpocsStatisticsSidebar.module.scss'

function SpocsStatisticsSidebar({ setIsSidebarOpen }: ExperiencesSidebarProps) {
  return (
    <div className={styles.containerbg}>
      <div className={styles.container}>
        <button onClick={() => setIsSidebarOpen(false)} className={styles.close}>
          &times;
        </button>
        <InterviewExperienceFilters isMobile />
      </div>
    </div>
  )
}

export default SpocsStatisticsSidebar
