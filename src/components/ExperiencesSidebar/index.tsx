import { ExperiencesSidebarProps } from '../../utils/types'
import InterviewExperienceFilters from '../ExperiencesFilters'
import styles from './ExperiencesSidebar.module.scss'

function ExperiencesSidebar({ setIsSidebarOpen }: ExperiencesSidebarProps) {
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

export default ExperiencesSidebar
