import { useState } from 'react'
import styles from './InterviewExperience.module.scss'
import { ExperienceCardProps } from '../../utils/types'
import { CheckListItem, ExperienceCard, Modal } from '../../components'
import { interviewExperienceInfoList } from '../../utils/Data/interviewExperienceData'

function InterviewExperience() {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div className={styles.display}>
        <div className={styles.middle_left}>
          <div className={styles.head} />
          <div className={styles.mlbody}>
            <h1>Interview Experiences</h1>
            {interviewExperienceInfoList.map((user: ExperienceCardProps) => (
              <div key={user.id} className={styles.card_margins}>
                <ExperienceCard {...user} />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.middle_right}>
          <div className={styles.head} />
          <div className={styles.mrbody}>
            <div className={styles.filters}>
              <h2>Filters</h2>
              <div className={styles.seperator} />
              <div className={styles.company}>
                <div className={styles.chead}>
                  <div className={styles.tag}>
                    <h4>Companies</h4>
                  </div>
                  <div className={styles.modal}>
                    <button
                      className={styles.button}
                      onClick={() => {
                        setOpen(true)
                      }}
                    >
                      View All
                    </button>
                    {open && <Modal title="Company List" setIsModalOpen={setOpen} />}
                  </div>
                </div>
                <div>
                  <CheckListItem label="Amazon" year={0} id={0} />
                  <CheckListItem label="Samsung" year={0} id={1} />
                  <CheckListItem label="Wells Fargo" year={0} id={2} />
                  <CheckListItem label="Natwest" year={0} id={3} />
                </div>
              </div>
              <div className={styles.seperator} />
              <div>
                <h4>Role</h4>
                <div>
                  <CheckListItem label="IT" year={0} id={4} />
                  <CheckListItem label="ECE Core" year={0} id={5} />
                  <CheckListItem label="Civil Core" year={0} id={6} />
                </div>
              </div>
              <div className={styles.seperator} />
              <div>
                <h4>Selection Status</h4>
                <div>
                  <CheckListItem label="Selected" year={0} id={7} />
                  <CheckListItem label="Not Selected" year={0} id={8} />
                </div>
              </div>
              <div className={styles.seperator} />
              <div>
                <h4>Oppurtunity Year</h4>
                <div>
                  <CheckListItem label="2019" year={0} id={9} />
                  <CheckListItem label="2020" year={0} id={10} />
                  <CheckListItem label="2021" year={0} id={11} />
                  <CheckListItem label="2022" year={0} id={12} />
                </div>
              </div>
              <div className={styles.seperator} />
              <div>
                <h4>Type</h4>
                <div>
                  <CheckListItem label="Internship" year={0} id={13} />
                  <CheckListItem label="Full Time" year={0} id={14} />
                </div>
              </div>
              <div className={styles.seperator} />
              <div>
                <h4>Difficulty</h4>
                <div>
                  <CheckListItem label="Easy" year={0} id={15} />
                  <CheckListItem label="Medium" year={0} id={16} />
                  <CheckListItem label="Hard" year={0} id={17} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right} />
      </div>
    </div>
  )
}

export default InterviewExperience
