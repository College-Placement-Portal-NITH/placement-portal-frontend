import { useState } from 'react'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import styles from './Dashboard.module.scss'
import { DashboardPostCard } from '../../components/Cards'
import useRecentNotifications from '../../hooks/useRecentNotifications'
import Page500 from '../Page500'
import useDashboard from '../../hooks/useDashboard'
import { fromNow } from '../../utils/functions'
import PageLoader from '../../components/PageLoader'
import { ModelProps } from '../../utils/types'

function Dashboard() {
  const [type] = useState('all')
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modelData, setModalData] = useState<ModelProps>({ title: '', description: '' })
  // const {
  //   data: notificationsData,
  //   isSuccess: isNotificationSuccess,
  //   isError: isNotificationError,
  //   isLoading: isNotificationLoading,
  // } = useRecentNotifications()

  const {
    data: dashboardData,
    isSuccess: isDashboardSuccess,
    isError: isDashboardError,
    isLoading: isDashboardLoading,
  } = useDashboard({ type }, type)

  // if (isNotificationError || isDashboardError) {
  //   return <Page500 />
  // }

  // if (
  //   isNotificationLoading ||
  //   !isNotificationSuccess ||
  //   isDashboardLoading ||
  //   !isDashboardSuccess
  // ) {
  //   return <PageLoader />
  // }

  const openModal = (post: any) => {
    setIsOpenModal(true)
    setModalData(post)
  }
  const closeModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <h1 className={styles.page_name}>Dashboard</h1>
      <div className={styles.content}>
        <div className={styles.posts_container}>
          {isDashboardSuccess
            ? dashboardData.map((post: any) => {
                return (
                  <>
                    <DashboardPostCard
                      onClick={() => openModal(post)}
                      description={post.description}
                      title={post.title}
                      postedOn={fromNow(post.created_at)}
                      key={post.id}
                      id={post.id}
                      imageUrl="/nithLogo.png"
                    />

                    <Modal
                      key={post.id}
                      id={post.id}
                      scrollBehavior="inside"
                      isOpen={isOpenModal}
                      onClose={closeModal}
                      isCentered
                    >
                      <ModalOverlay backgroundColor="blackAlpha.300" />
                      <ModalContent className={styles.model_content}>
                        <ModalHeader className={styles.modal_title}>{modelData.title}</ModalHeader>
                        <ModalCloseButton className={styles.modal_close} />
                        <ModalBody className={styles.modal_desc}>{modelData.description}</ModalBody>
                      </ModalContent>
                    </Modal>
                  </>
                )
              })
            : console.log('not success')}
        </div>

        {/* <div className={styles.side_panel}>
          <div className={styles.sidepanel_card}>
            <h1>Recent Drives</h1>
            <div className={styles.list_container}>
              {isNotificationSuccess &&
                notificationsData.Recent_Drive.map((listItem: any) => {
                  return (
                    <div key={listItem.Id} className={styles.list_item}>
                      <div className={styles.pic}>
                        <img alt="drives_image" src={listItem.Image_Url} width={40} height={40} />
                      </div>
                      <div className={styles.info}>
                        <p className={styles.name}>{listItem.Company}</p>
                        <p className={styles.date}>{listItem.Starting_Date}</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          <div className={styles.sidepanel_card}>
            <h1>Recent Experiences</h1>
            <div className={styles.list_container}>
              {isNotificationSuccess &&
                notificationsData.Recent_Experience.map((listItem: any) => {
                  return (
                    <div key={listItem.Id} className={styles.list_item}>
                      <div className={styles.pic}>
                        <img alt="users_image" src={listItem.Image_Url} width={40} height={40} />
                      </div>
                      <div className={styles.info}>
                        <p className={styles.name}>{listItem.Name}</p>
                        <p className={styles.date}>{listItem.Created_Date}</p>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
              </div> */}
      </div>
    </>
  )
}

export default Dashboard
