import { useState } from 'react'
import { nanoid } from 'nanoid'
import { Text, Modal, ModalBody, ModalContent, ModalOverlay } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import styles from '../AllSlots/AllSlots.module.scss'
import NotFound from '../../assets/animations/94729-not-found.json'
import SlotCard from './SlotDetailsCard'
import SlotDetails from '../../components/SlotDetails'

function ViewSlotsBookedByStudent() {
  const [slots, setSlots] = useState([
    {
      id: nanoid(),
      title: 'Computer Networks',
      description: '2 hours session for doubts clearance of Computer Networks.',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      date: '2022-12-12',
      created_at: '2022-12-12',
      createdBy: 'Rajat',
      contact_email: 'rajat@dummygmail.com',
      contact_number: '1234567890',
    },
    {
      id: nanoid(),
      title: 'Internship Guidance',
      description: 'Internship guidance for computer science students by Amit.',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      date: '2022-12-12',
      created_at: '2022-12-12',
      createdBy: 'Amit',
      contact_email: 'amit@dummy.com',
      contact_number: '1234567890',
    },
    {
      id: nanoid(),
      title: 'Data Structures and Algorithms - 5',
      description: 'Class 5 on Data Structure and Algorithms series.',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      date: '2022-12-12',
      created_at: '2022-12-12',
      createdBy: 'Srishti',
      contact_email: 'srishti@dummyemail.com',
      contact_number: '1234567890',
    },
    {
      id: nanoid(),
      title: 'Cyber Security',
      description: 'Crash Course on Cyber Security',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      date: '2022-12-12',
      created_at: '2022-12-12',
      createdBy: 'Abhinav',
      contact_email: 'abhinav@dummyemail.com',
      contact_number: '1234567890',
    },
    {
      id: nanoid(),
      title: 'Public Speaking',
      description: 'Learn all about public speaking in 2 hours.',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      date: '2022-12-12',
      created_at: '2022-12-12',
      createdBy: 'Aditi',
      contact_email: 'aditi@dummyemail.com',
      contact_number: '1234567890',
    },
    {
      id: nanoid(),
      title: 'System Design',
      description: 'System Desifgn Crash Course',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      date: '2022-12-12',
      created_at: '2022-12-12',
      createdBy: 'Ajay',
      contact_email: 'ajay@dummyemail.com',
      contact_number: '1234567890',
    },
  ])
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modelData, setModalData] = useState<any>(null)
  const handleBookSlot = () => {
    // Implement logic to book the selected slot
    // console.log('Slot booked:', selectedSlot)
  }
  const openModal = (slotData: any) => {
    setIsOpenModal(true)
    setModalData(slotData)
  }
  const closeModal = () => {
    setIsOpenModal(false)
  }
  return (
    <div className={styles.container}>
      <h1 className={styles.page_name}>Slots Booked By You</h1>
      <div className={styles.slot_booking_page}>
        <div className={styles.content}>
          {slots.length === 0 ? (
            <div className={styles.lottie_container}>
              <Text className={styles.heading}>Oops....</Text>
              <div className={styles.animation_container}>
                <Lottie animationData={NotFound} />
              </div>
            </div>
          ) : (
            <div className={styles.slot_list}>
              {slots.map((slot) => (
                <>
                  <SlotCard
                    key={slot.id}
                    slot={slot}
                    onBookSlot={handleBookSlot}
                    onClick={() => openModal(slot)}
                  />

                  <Modal
                    key={nanoid()}
                    id={nanoid()}
                    scrollBehavior="inside"
                    isOpen={isOpenModal}
                    onClose={closeModal}
                  >
                    <ModalOverlay backgroundColor="blackAlpha.300" />
                    <ModalContent className={styles.model_content} maxWidth={700}>
                      <ModalBody className={styles.modal_desc}>
                        <SlotDetails {...slot} />
                      </ModalBody>
                    </ModalContent>
                  </Modal>
                </>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default ViewSlotsBookedByStudent
