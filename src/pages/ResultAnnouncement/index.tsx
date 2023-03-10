import Lottie from 'lottie-react'
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import Animation from '../../assets/animations/95580-time-table.json'
import styles from './ResultAnnouncement.module.scss'
import { OffCampusResultForm, OnCampusResultForm, PpoResultForm } from '../../components/Forms'

export default function ResultAnnouncement() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Announce a Result</h2>
        <Lottie animationData={Animation} />
      </div>
      <div className={styles.content}>
        <Tabs className={styles.tabs_container} colorScheme="blackAlpha">
          <TabList>
            <Tab>On Campus</Tab>
            <Tab>Off Campus</Tab>
            <Tab>PPO</Tab>
          </TabList>
          <TabPanels minHeight="230px">
            <TabPanel>
              <OnCampusResultForm />
            </TabPanel>
            <TabPanel>
              <OffCampusResultForm />
            </TabPanel>
            <TabPanel>
              <PpoResultForm />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
