import { Button, VStack, Text, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import Lottie from 'lottie-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Error, Select } from '../..'
import styles from './ResultForms.module.scss'
import { drivesData, studentData, typeData } from '../../../utils/Data/resultAnnouncementData'

export default function OnCampusResultForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)

  const formik = useFormik({
    initialValues: {
      studentRollNo: '',
      type: '',
      drive: '',
      jobRole: '',
    },
    validationSchema: Yup.object().shape({
      studentRollNo: Yup.string().required('Student Roll Number is required').min(6),
      type: Yup.string().required('Type is required'),
      drive: Yup.string().required('Drive is required'),
      jobRole: Yup.string().required('Job Role is required'),
    }),
    onSubmit: (e, values) => {
      setIsLoading(!isLoading)
      setTimeout(() => {
        setIsLoading((prevState) => !prevState)
        setShowAnimation((state) => !state)
      }, 3000)
    },
  })

  const [rowData, setRowData] = useState([
    {
      stuName: studentData
        .filter((data) => data.rollNo === formik.values.studentRollNo)
        .map((data) => data.name)[0],
      stuRollNo: formik.values.studentRollNo,
      stuCompany: formik.values.drive.slice(0, formik.values.drive.length - 8),
    },
  ])

  const uniqueList = rowData.filter(
    (item, index, self) =>
      index ===
      self.findIndex(
        (t) =>
          t.stuRollNo === item.stuRollNo &&
          t.stuCompany === item.stuCompany &&
          t.stuName === item.stuName,
      ),
  )

  const addRow = () => {
    setRowData([
      ...uniqueList,
      {
        stuName: studentData
          .filter((data) => data.rollNo === formik.values.studentRollNo)
          .map((data) => data.name)[0],
        stuRollNo: formik.values.studentRollNo,
        stuCompany: formik.values.drive.slice(0, formik.values.drive.length - 8),
      },
    ])
  }

  const removeRow = (index: number) => {
    const list = [...uniqueList]
    list.splice(index, 1)
    setRowData(list)
  }

  return (
    <div className={styles.container}>
      {showAnimation ? (
        <div className={styles.animation_container}>
          <Lottie
            loop={false}
            autoPlay={false}
            animationData={Loading}
            className={styles.animation}
          />
          <Text className={styles.tag_line}>Announcement Created Successfully</Text>{' '}
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.form_container}>
          <VStack align="stretch" spacing={4}>
            <>
              <Select
                value={formik.values.type}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="type"
                placeholder="Type"
              >
                {typeData.map((data) => (
                  <option key={data.id}>{data.value}</option>
                ))}
              </Select>

              {formik.touched.type && formik.errors.type ? (
                <Error errorMessage={formik.errors.type} />
              ) : null}

              <Select
                value={formik.values.drive}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="drive"
                placeholder="Drive"
              >
                {drivesData
                  .filter((data) => data.jobType === formik.values.type)
                  .map((data) => (
                    <option key={data.id}>{data.driveName}</option>
                  ))}
              </Select>

              {formik.touched.drive && formik.errors.drive ? (
                <Error errorMessage={formik.errors.drive} />
              ) : null}

              <Select
                value={formik.values.jobRole}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="jobRole"
                placeholder="Job Role"
              >
                {drivesData
                  .filter((data) => data.driveName === formik.values.drive)
                  .map((data) =>
                    data.jobRole.map((jobData) => <option key={jobData.id}>{jobData.role}</option>),
                  )}
              </Select>

              {formik.touched.jobRole && formik.errors.jobRole ? (
                <Error errorMessage={formik.errors.jobRole} />
              ) : null}

              <div className={styles.input_rollNo}>
                <Select
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="studentRollNo"
                  placeholder="Student Roll Number"
                  value={formik.values.studentRollNo}
                >
                  {studentData.map((data) => (
                    <option key={data.rollNo}>{data.rollNo}</option>
                  ))}
                </Select>

                {formik.touched.studentRollNo && formik.errors.studentRollNo ? (
                  <Error errorMessage={formik.errors.studentRollNo} />
                ) : null}

                <Button
                  onClick={() => {
                    addRow()
                  }}
                  className={styles.add_btn}
                  isDisabled={formik.values.studentRollNo.length < 6 || !formik.isValid}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </Button>
              </div>

              <div className={styles.table}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Roll Number</Th>
                      <Th>Student</Th>
                      <Th>Company</Th>
                      <Th> </Th>
                    </Tr>
                  </Thead>
                  {uniqueList.slice(1).map((row, index) => (
                    <Tbody key={row.stuRollNo}>
                      <Tr>
                        <Td>{row.stuRollNo}</Td>
                        <Td>{row.stuName}</Td>
                        <Td>{row.stuCompany}</Td>
                        <Td>
                          <Button size="sm" onClick={() => removeRow(index + 1)}>
                            <FontAwesomeIcon icon={faUserMinus} />
                          </Button>
                        </Td>
                      </Tr>
                    </Tbody>
                  ))}
                </Table>
              </div>

              <Button
                background="linear-gradient(40deg,#45cafc,#303f9f)"
                color="white"
                _hover={{ background: 'linear-gradient(90deg,#45cafc,#303f9f)' }}
                isLoading={isLoading}
                type="submit"
                isDisabled={!formik.isValid || uniqueList.length < 2}
              >
                Post
              </Button>
            </>
          </VStack>
        </form>
      )}
    </div>
  )
}
