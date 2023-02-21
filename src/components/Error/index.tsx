import { ErrorProps } from '../../utils/types'
import styles from './Error.module.scss'

function Error({ errorMessage }: ErrorProps) {
  return (
    <div className={styles.error}>
      <img src={alert} alt="" />
      <p>{errorMessage}</p>
    </div>
  )
}

export default Error
