import React from 'react'
import styles from './Navbar_JNF.module.scss'
import logo from '../../../assets/img/clg_logo.jpg'

export default function NavbarJNF({ Title }: { Title: string }) {
  return (
    <div className={styles.navbar}>
      <div className={styles.center}>
        <img src={logo} alt="college logo" className={styles.logo} />

        <div className={styles.header}>
          <div className={`${styles.heading1} ${styles.center}`}>
            राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर
          </div>
          <div className={`${styles.heading2} ${styles.center}`}>
            हमीरपुर (हिमाचल प्रदेश) - 177 005 (भारत)
          </div>

          <div className={`${styles.heading3} ${styles.center}`}>
            NATIONAL INSTITUTE OF TECHNOLOGY HAMIRPUR
          </div>
          <div className={`${styles.heading2} ${styles.center}`}>
            HAMIRPUR (H.P.) - 177005 (INDIA)
          </div>
          <div className={`${styles.heading4} ${styles.center}`}>
            (An Institute of National Importance under Ministry of HRD)
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <div className={`${styles.heading5} ${styles.center}`}>OFFICE OF TRAINING & PLACEMENT</div>
        <div className={`${styles.dash} ${styles.center}`}>
          -----------------------------------------------------------------------------------------------------------------------
        </div>
        <div className={`${styles.heading} ${styles.center}`}>{Title} (Session: 2023-24)</div>
      </div>
    </div>
  )
}
