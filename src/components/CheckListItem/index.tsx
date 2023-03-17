import { CheckListItemProps } from '../../utils/types'
import styles from './CheckListItem.module.scss'

function CheckListItem({ label, isMobile, onClick }: CheckListItemProps) {
  return (
    <div className={styles.content}>
      <input
        name={`${label}`}
        id={`${label}${isMobile ? 'mob' : ''}`}
        className={styles.input}
        type="checkbox"
        onChange={() => onClick(label)}
      />
      <label htmlFor={`${label}${isMobile ? 'mob' : ''}`}>{label}</label>
    </div>
  )
}

export default CheckListItem
