import { Tag, Button } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faCircleXmark, faEllipsisH } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect, useRef } from 'react'
import { DrivesCardProps } from '../../../utils/types'
import styles from './DrivesCard.module.scss'

const logo = '/nithLogo.png'

function DrivesCard({
  onClick,
  companyName,
  // imgUrl,
  ctcOffered,
  // startingDate,
  modeOfHiring,
  isPpt,
  jobLocation,
  type,
  // eligibleBatches = [],
  jobProfile,
  driveStatus,
}: DrivesCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const toggleEditBar = () => {
    setIsEditOpen(!isEditOpen)
  }

  return (
    <div className={styles.card}>
      <div className={styles.container}>
        <div className={styles.main_container} onClick={onClick}>
          <img className={styles.company_image} src={logo} alt="company Logo" />
          <div className={styles.content}>
            <h2 className={styles.company_name}>{companyName}</h2>
            <div className={styles.company_details}>
              <div className={styles.company_info_1}>
                <Tag className={styles.tag}>{jobProfile}</Tag>
                <Tag className={styles.tag}>{ctcOffered} LPA</Tag>
                <Tag className={styles.tag}>Job Type: {type}</Tag>
                <Tag className={styles.tag}>Mode of Hiring: {modeOfHiring}</Tag>
              </div>
              <div className={styles.company_info_2}>
                {isPpt && <Tag className={styles.tag}>PPT</Tag>}
                <Tag className={styles.tag}>Job Location: {jobLocation}</Tag>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.link}>
          {driveStatus === 'Upcoming' ? (
            <button className={styles.upcoming}>
              <span> Approve</span>
            </button>
          ) : (
            driveStatus === 'Ongoing' && (
              <div className={styles.ongoing}>
                <span>Approved</span>
              </div>
            )
          )}
        </div>

        <div className={styles.dropdown}>
          <div className={styles.ellipsis}>
            <button type="button" className={styles.gap} onClick={toggleEditBar}>
              <FontAwesomeIcon cursor="pointer" icon={faEllipsisH} />
            </button>
            {isEditOpen ? (
              <>
                <Button background="blue.500" size="xs" className={styles.editBtn}>
                  <FontAwesomeIcon cursor="pointer" icon={faPen} />
                </Button>
                <Button background="red.500" size="xs" className={styles.editBtn}>
                  <FontAwesomeIcon cursor="pointer" icon={faCircleXmark} />
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
      {/* <div className={styles.separator} /> */}
      {/* <div className={styles.bottom_content}>
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
      </div> */}
    </div>
  )
}

export default DrivesCard
