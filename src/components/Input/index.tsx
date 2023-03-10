import styles from './Input.module.scss'
import { InputProps } from '../../utils/types'

export default function Input({
  name,
  placeholder,
  onChange,
  onBlur,
  value,
  type,
  isDisabled,
}: InputProps) {
  return (
    <div className={styles.container}>
      <label htmlFor={name} className={styles.label}>
        {name === 'session' ? 'Session' : placeholder}
      </label>
      <input
        disabled={isDisabled}
        type={type}
        value={value}
        id={name}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        className={styles.field}
      />
    </div>
  )
}
