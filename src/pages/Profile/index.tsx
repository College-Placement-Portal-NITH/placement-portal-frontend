import styles from './Profile.module.scss'
import UserInfo from '../../components/UserInfo'
import Button from '../../components/Button'

import profileData from '../../utils/Data/profileData'

function Profile() {
  return (
    <div className={styles.profile_container}>
      <div className={styles.top_container}>
        <div className={styles.user_profile_info}>
          <img src="https://picsum.photos/100" className={styles.img} alt="Profile DP" />
          <div className={styles.info_container}>
            <p className={styles.name}>{profileData[0].name}</p>
            <div className={styles.sub_info_container}>
              {profileData.map((user) =>
                user.fields.map((user_field) => (
                  <UserInfo key={user_field.id} label={user_field.label} value={user_field.value} />
                )),
              )}
            </div>
            <Button title="Edit Profile" />
          </div>
        </div>
        <div className={styles.upload_container}>
          <Button title="Upload Resume" />
        </div>
      </div>
    </div>
  )
}

export default Profile
