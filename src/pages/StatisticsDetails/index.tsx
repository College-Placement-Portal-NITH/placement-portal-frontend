import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, Select } from '@chakra-ui/react'
import styles from './StatisticsDetails.module.scss'
import { statisticsdetailsData as data } from '../../utils/Data/statisticsDetailsData'

function StatisticsDetails() {
  return (
    <>
      <div className={styles.header_container}>
        <div>
          <h1 className={styles.page_name}>{data.company}</h1>
          <h3>{`(${data.totalOffers} offers)`}</h3>
        </div>
        <div className={styles.year_filter}>
          <Select placeholder="Select Session" />
        </div>
      </div>
      <div className={styles.body_container}>
        {data.courses.map((course) => {
          return (
            <div key={course.id} className={styles.course_container}>
              <h2 className={styles.course_title}>{course.courseName}</h2>
              <TableContainer className={styles.table_container}>
                <Table size="sm">
                  <Thead>
                    <Tr>
                      {course.branches[0].branchName !== undefined ? <Th /> : null}
                      {course.roles.map((role) => (
                        <Th
                          textAlign="center"
                          key={role.id}
                        >{`${role.roleName}(${role.ctcOffered} LPA)`}</Th>
                      ))}
                      <Th textAlign="center">Total Offers</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {course.branches.map((branch) => {
                      return (
                        <Tr key={branch.id}>
                          {branch?.branchName && <Td>{branch.branchName}</Td>}
                          {branch.offersRoleWise.map((offer) => {
                            return (
                              <Td key={offer.id} textAlign="center">
                                {offer.noOfOffers}
                              </Td>
                            )
                          })}
                          <Td textAlign="center">{branch.offersBranchWise}</Td>
                        </Tr>
                      )
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default StatisticsDetails