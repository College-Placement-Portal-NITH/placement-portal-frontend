import { Button, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import styles from './SpocsCurrentDrives.module.scss'
import { currentDrivesData } from '../../utils/Data/spocsStatisticsData'

function SpocsCurrentDrives() {
  const navigate = useNavigate()
  const handleBack = () => {
    navigate('/spocs-statistics')
  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.page_name}>TPR Name</h1>
        <Button onClick={handleBack}>Back</Button>
      </div>
      <div className={styles.content}>
        <TableContainer className={styles.table_container}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Drive Name</Th>
                <Th>Starting Date</Th>
                <Th>Expected Completion Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentDrivesData.map((drive: any) => {
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
      </div>
    </>
  )
}

export default SpocsCurrentDrives
