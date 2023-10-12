import Lottie from 'lottie-react'
import { Tabs, Tab, TabList, TabPanels, TabPanel, Text } from '@chakra-ui/react'
import { StudentLoginForm, TPOLoginForm, TPRLoginForm } from '../../components/Forms'
import Animation from '../../assets/animations/119048-login-verification.json'
import styles from './Login.module.scss'

export default function Login() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Hi There,</h2>
        <h2 className={styles.heading}>Welcome back</h2>
        <Lottie animationData={Animation} />
      </div>
      <div className={styles.content}>
        <Text className={styles.heading}>Hi There,</Text>
        <Text className={styles.sub_heading}>Welcome back</Text>
        <Tabs className={styles.tabs_container} colorScheme="blackAlpha">
          <TabList>
            <Tab>Student</Tab>
            <Tab>TPO</Tab>
          </TabList>
          <TabPanels minHeight="230px">
            <TabPanel>
              <StudentLoginForm />
            </TabPanel>
            <TabPanel>
              <TPOLoginForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
