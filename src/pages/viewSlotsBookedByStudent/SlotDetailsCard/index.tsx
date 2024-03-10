import React from 'react'
import { Slot } from '../../../utils/types'
import styles from './SlotDetailsCard.module.scss'

function SlotCard({
  slot,
  onBookSlot,
  onClick,
}: {
  slot: Slot
  onBookSlot: (slot: Slot) => void
  onClick: () => void
}) {
  return (
    <div className={styles['slot-card']}>
      <div onClick={onClick}>
        <div className={styles['slot-details']}>
          <div className={styles['title-div']}>
            <h3 className={styles.title}>{slot.title}</h3>
          </div>
          <p> {slot.description}</p>
          <p>Start Time: {slot.startTime}</p>
          <p>End Time: {slot.endTime}</p>
        </div>
      </div>
    </div>
  )
}

export default SlotCard
