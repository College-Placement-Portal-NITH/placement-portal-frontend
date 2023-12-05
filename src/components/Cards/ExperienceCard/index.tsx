import { Link } from 'react-router-dom'
import { faPen, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useRef } from 'react'
import { interviewExperienceInfoList } from '../../../utils/Data/interviewExperienceData'
import { getDifficulty } from '../../../utils/functions'
import { ExperienceCardProps } from '../../../utils/types'

import styles from './ExperienceCard.module.scss'

function ExperienceCard({
  id,
  company,
  description_read,
  roles,
  jobtype,
  selected,
  name,
  difficulty,
  created_at,
  company_image_url,
  anonymity,
}: ExperienceCardProps) {
  // removing dangerouslySetInnerHTML with DOM manipulation 30/09/2023
  const descriptionRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const descriptionElement = descriptionRef.current

    if (descriptionElement) {
      descriptionElement.textContent = description_read
    }
  }, [description_read])

  return (
    <Link
      to={`/experiences-details/${id}`}
      state={interviewExperienceInfoList[id]}
      className={styles.link}
    >
      <div className={styles.card}>
        <div className={styles.main_container}>
          <img className={styles.anonymous_img} src={company_image_url} alt="Company" />

          <div className={styles.info_header}>
            <div className={styles.info_container}>
              <p className={styles.title}>{company}</p>
              <p className={styles.role}>{roles}</p>
            </div>
            <div className={styles.buttonArea}>
              <Button>
                <FontAwesomeIcon cursor="pointer" icon={faPen} />
              </Button>
              <Button>
                <FontAwesomeIcon cursor="pointer" icon={faCircleXmark} />
              </Button>
            </div>
          </div>
        </div>
        {/* <div className={styles.truncate} dangerouslySetInnerHTML={{ __html: description_read }} /> */}
        <div className={styles.truncate} ref={descriptionRef} />
        <div className={styles.separator} />
        <div className={styles.tags_container}>
          {selected && (
            <div className={styles.tag}>
              <span>Selected</span>
            </div>
          )}
          {anonymity ? (
            <div className={styles.tag}>
              <span>Anonymous</span>
            </div>
          ) : (
            <div className={styles.tag}>
              <span>{name}</span>
            </div>
          )}
          <div className={styles.tag}>
            <span>{jobtype}</span>
          </div>
          <div className={styles.tag}>
            <span>{getDifficulty(difficulty)}</span>
          </div>
          <div className={styles.tag}>
            <span>{new Date(created_at).toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ExperienceCard
