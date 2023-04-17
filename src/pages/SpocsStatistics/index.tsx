import { memo, useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useMediaQuery,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilter } from '@fortawesome/free-solid-svg-icons'
import { Paginator } from '../../components'
import { pastDrivesData, tprData } from '../../utils/Data/spocsStatisticsData'
import styles from './SpocsStatistics.module.scss'
import SpocsStatisticsFilters from '../../components/SpocsStatisticsFilters'
import SpocsStatisticsSidebar from '../../components/SpocsStatisticsSidebar'

function SpocsStatistics() {
  const [page, setPage] = useState(1)
  const [isLargerThan880] = useMediaQuery('(min-width: 880px)')
  const [openFilters, setOpenFilters] = useState(false)
  const [isPastDrivesModalOpen, SetIsPastDrivesModalOpen] = useState(false)
  const navigate = useNavigate()

  const MemoizedExperiencesSideBar = memo(SpocsStatisticsSidebar)

  const handleClosePastDrivesModal = () => {
    SetIsPastDrivesModalOpen(false)
  }

  const handleCurrentDrives = () => {
    navigate('/spocs-statistics/current-drives')
    console.log('current drives')
  }

  const handlePastDrives = () => {
    SetIsPastDrivesModalOpen(!isPastDrivesModalOpen)
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.page_name}>TPR Data</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.table_container}>
          <TableContainer className={styles.table}>
            <Table size="sm" variant="unstyled">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Roll No</Th>
                  <Th>Session</Th>
                  <Th>Course</Th>
                  <Th>Branch</Th>
                  <Th>Type</Th>
                  <Th>Current Drives</Th>
                  <Th>Past Drives</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tprData.map((datas: any) => {
                  return (
                    <Tr key={datas.id}>
                      <Td>{`${datas.first_name}${datas.last_name}`}</Td>
                      <Td>{datas.roll}</Td>
                      <Td>{datas.session}</Td>
                      <Td>{datas.course}</Td>
                      <Td>{datas.branch}</Td>
                      <Td>{datas.type}</Td>
                      <Td>
                        <Button onClick={handleCurrentDrives}>View</Button>
                      </Td>
                      <Td>
                        <Button onClick={handlePastDrives}>View</Button>
                      </Td>
                    </Tr>
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
          {tprData.length !== 0 && (
            <Paginator
              max={page}
              curr={page}
              onNext={() => setPage(page + 1)}
              onPrev={() => setPage(page - 1)}
              disableNext={page === 2}
              disablePrev={page === 1}
            />
          )}
        </div>

        <div className={styles.filter_container}>
          {isLargerThan880 && <SpocsStatisticsFilters />}
        </div>
        <div className={styles.filter_mobile_container}>
          <FontAwesomeIcon
            onClick={() => {
              setOpenFilters(true)
            }}
            icon={faFilter}
            size="2x"
          />
          {openFilters && <MemoizedExperiencesSideBar setIsSidebarOpen={setOpenFilters} />}
        </div>

        <Modal isOpen={isPastDrivesModalOpen} onClose={handleClosePastDrivesModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Past Drives</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <TableContainer>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      <Th>Drive Name</Th>
                      <Th>Starting Date</Th>
                      <Th>Completion Date</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {pastDrivesData.map((drive: any) => {
                      return (
                        <Tr key={drive.id}>
                          <Td>{drive.drive_name}</Td>
                          <Td>{drive.starting_date}</Td>
                          <Td>{drive.completion_date}</Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </>
  )
}

export default SpocsStatistics
