import React, { useState } from 'react'
import styles from './JNFForm.module.scss'

interface UtilProps {
  branchName: string
  shortName: string
}

function Util({ branchName, shortName }: UtilProps) {
  const [isChecked, setIsChecked] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleCheckboxChange = () => {
    const updatedIsChecked = !isChecked
    setIsChecked(updatedIsChecked)

    if (updatedIsChecked) {
      setInputValue(shortName)
    }
  }

  return (
    <div className={`${styles.row}`}>
      <div className={`${styles.col_3_1}`}>{branchName}</div>
      <div className={`${styles.col_3_2}`}>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
      </div>
    </div>
  )
}

export default Util
