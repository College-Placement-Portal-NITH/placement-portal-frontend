import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import CheckListItem from '../CheckListItem'
import Modal from '../Modal'
import { ExperienceFilterProps } from '../../utils/types'
import styles from './ExperiencesFilters.module.scss'

function ExperiencesFilters({ isMobile = false }: ExperienceFilterProps) {
  const [openCompany, setOpenCompany] = useState(false)
  const [openRole, setOpenRole] = useState(false)

  return (
    <div className={styles.filters}>
      <h2>Filters</h2>
      <div className={styles.seperator} />
      <div className={styles.company}>
        <div className={styles.filter_head}>
          <div className={styles.tag}>
            <h4>Companies</h4>
          </div>
          <div className={styles.modal}>
            <button
              className={styles.btn}
              onClick={() => {
                setOpenCompany(true)
              }}
            >
              View All
              <FontAwesomeIcon icon={faCircleRight} />
            </button>
            {openCompany && <Modal title="Company" setIsModalOpen={setOpenCompany} />}
          </div>
        </div>
        <div>
          <CheckListItem label="Amazon" year={0} isMobile={isMobile} />
          <CheckListItem label="Samsung" year={0} isMobile={isMobile} />
          <CheckListItem label="Wells Fargo" year={0} isMobile={isMobile} />
          <CheckListItem label="Natwest" year={0} isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.seperator} />
      <div>
        <div className={styles.filter_head}>
          <div className={styles.tag}>
            <h4>Roles</h4>
          </div>
          <div className={styles.modal}>
            <button
              className={styles.btn}
              onClick={() => {
                setOpenRole(true)
              }}
            >
              View All
              <FontAwesomeIcon icon={faCircleRight} />
            </button>
            {openRole && <Modal title="Role" setIsModalOpen={setOpenRole} />}
          </div>
        </div>
        <div>
          <CheckListItem label="IT" year={0} isMobile={isMobile} />
          <CheckListItem label="ECE Core" year={0} isMobile={isMobile} />
          <CheckListItem label="Civil Core" year={0} isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.seperator} />
      <div>
        <h4 className={styles.filter_category}>Selection Status</h4>
        <div>
          <CheckListItem label="Selected" year={0} isMobile={isMobile} />
          <CheckListItem label="Not Selected" year={0} isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.seperator} />
      <div>
        <h4 className={styles.filter_category}>Oppurtunity Year</h4>
        <div>
          <CheckListItem label="2019" year={0} isMobile={isMobile} />
          <CheckListItem label="2020" year={0} isMobile={isMobile} />
          <CheckListItem label="2021" year={0} isMobile={isMobile} />
          <CheckListItem label="2022" year={0} isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.seperator} />
      <div>
        <h4 className={styles.filter_category}>Type</h4>
        <div>
          <CheckListItem label="Internship" year={0} isMobile={isMobile} />
          <CheckListItem label="Full Time" year={0} isMobile={isMobile} />
        </div>
      </div>
      <div className={styles.seperator} />
      <div>
        <h4 className={styles.filter_category}>Difficulty</h4>
        <div>
          <CheckListItem label="Easy" year={0} isMobile={isMobile} />
          <CheckListItem label="Medium" year={0} isMobile={isMobile} />
          <CheckListItem label="Hard" year={0} isMobile={isMobile} />
        </div>
      </div>
    </div>
  )
}

export default ExperiencesFilters
