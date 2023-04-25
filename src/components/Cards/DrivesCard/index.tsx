import { Link } from 'react-router-dom'
import { Tag } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLink } from '@fortawesome/free-solid-svg-icons'
import { DrivesCardProps } from '../../../utils/types'
import styles from './DrivesCard.module.scss'

function DrivesCard({
  companyName,
  imgUrl,
  ctcOffered,
  startingDate,
  modeOfHiring,
  isPpt,
  isAptitudeTest,
  jobLocation,
  type,
  eligibleBatches = [],
  jobProfile,
}: DrivesCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.main_container}>
          <img className={styles.company_image} src={imgUrl} alt="company Logo" />
          <div className={styles.content}>
            <h2 className={styles.company_name}>{companyName}</h2>
            <div className={styles.company_details}>
              <div className={styles.company_info_1}>
                <Tag className={styles.tag}>{jobProfile}</Tag>
                <Tag className={styles.tag}>{ctcOffered} LPA</Tag>
                <Tag className={styles.tag}>{startingDate}</Tag>
                <Tag className={styles.tag}>Mode of Hiring: {modeOfHiring}</Tag>
              </div>
              <div className={styles.company_info_2}>
                {isPpt && <Tag className={styles.tag}>PPT</Tag>}
                {isAptitudeTest && <Tag className={styles.tag}>Aptitude Test</Tag>}
                <Tag className={styles.tag}>Job Location: {jobLocation}</Tag>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.link}>
          <Link to={`/experiences/?company=${companyName}`} className={styles.past_exp_btn}>
            Past Experience
          </Link>
          <Link to="/dashboard" className={styles.jd_link}>
            <FontAwesomeIcon icon={faLink} />
            <span> JD</span>
          </Link>
        </div>
      </div>
      <div className={styles.separator} />
      <div className={styles.bottom_content}>
        <div className={styles.eligible_batches_list}>
          {eligibleBatches.map((batch) => {
            return (
              <div className={styles.tag} key={batch.id}>
                <span>
                  {batch.course} {batch.branchName}
                </span>
              </div>
            )
          })}
          <div className={styles.tag}>
            <span>{type}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DrivesCard
