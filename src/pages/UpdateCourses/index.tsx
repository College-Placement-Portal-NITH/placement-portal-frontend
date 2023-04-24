import Lottie from 'lottie-react'
import { Tabs, Tab, TabList, TabPanels, TabPanel } from '@chakra-ui/react'
import Animation from '../../assets/animations/95580-time-table.json'
import styles from './UpdateCourses.module.scss'
import Addition from './Addition'
import Deletion from './Deletion'

export default function UpdateCourses() {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Course/ Branch addition or deletion</h2>
        <Lottie animationData={Animation} />
      </div>
      <div className={styles.content}>
        <Tabs className={styles.tabs_container} colorScheme="blackAlpha">
          <TabList>
            <Tab>Add Branch/ Course</Tab>
            {/* <Tab>Delete Branch/ Course</Tab> */}
          </TabList>
          <TabPanels minHeight="230px">
            <TabPanel>
              <Addition />
            </TabPanel>
            {/* <TabPanel>
              <Deletion/>
            </TabPanel> */}
          </TabPanels>
        </Tabs>
      </div>
    </div>
  )
}
