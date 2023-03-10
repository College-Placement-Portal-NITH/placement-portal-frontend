import { Button, VStack, Text, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import Lottie from 'lottie-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserMinus, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import Loading from '../../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Error, Input, Select } from '../..'
import styles from './ResultForms.module.scss'
import { allStudentData } from '../../../utils/Data/resultAnnouncementData'
import { companyList, roleList } from '../../../utils/Data/interviewExperienceData'

export default function PpoResultForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const date = new Date()

  const formik = useFormik({
    initialValues: {
      studentRollNo: '',
      company: '',
      profile: '',
      session: '',
      ctc: 0,
    },
    validationSchema: Yup.object().shape({
      studentRollNo: Yup.string().required('Student Roll Number is required').min(6),
      company: Yup.string().required('Company is required'),
      profile: Yup.string().required('Profile is required'),
      session: Yup.string().required('Session is required'),
      ctc: Yup.number().required('CTC is required').moreThan(0, 'CTC must be greater than 0'),
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
      stuName: allStudentData
        .filter((data) => data.rollNo === formik.values.studentRollNo)
        .map((data) => data.name)[0],
      stuRollNo: formik.values.studentRollNo,
      stuCompany: formik.values.company,
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
        stuName: allStudentData
          .filter((data) => data.rollNo === formik.values.studentRollNo)
          .map((data) => data.name)[0],
        stuRollNo: formik.values.studentRollNo,
        stuCompany: formik.values.company,
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
                value={formik.values.company}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="company"
                placeholder="Company"
              >
                {companyList.map((data) => (
                  <option key={data.id}>{data.name}</option>
                ))}
              </Select>
              {formik.touched.company && formik.errors.company ? (
                <Error errorMessage={formik.errors.company} />
              ) : null}

              <Select
                value={formik.values.profile}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="profile"
                placeholder="Profile"
              >
                {roleList.map((data) => (
                  <option key={data.id}>{data.name}</option>
                ))}
              </Select>
              {formik.touched.profile && formik.errors.profile ? (
                <Error errorMessage={formik.errors.profile} />
              ) : null}

              <Input
                value={formik.values.ctc}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="ctc"
                placeholder="CTC in LPA"
              />
              {formik.touched.ctc && formik.errors.ctc ? (
                <Error errorMessage={formik.errors.ctc} />
              ) : null}

              <Select
                value={formik.values.session}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="session"
                placeholder="Session"
              >
                <option>
                  {`${(date.getFullYear() - 1).toString()}-${date
                    .getFullYear()
                    .toString()
                    .slice(2)}`}
                </option>
                <option>
                  {`${date.getFullYear().toString()}-${(date.getFullYear() + 1)
                    .toString()
                    .slice(2)}`}
                </option>
                <option>
                  {`${(date.getFullYear() + 1).toString()}-${(date.getFullYear() + 2)
                    .toString()
                    .slice(2)}`}
                </option>
              </Select>
              {formik.touched.session && formik.errors.session ? (
                <Error errorMessage={formik.errors.session} />
              ) : null}

              <div className={styles.input_rollNo}>
                <Input
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  name="studentRollNo"
                  placeholder="Student Roll Number"
                  value={formik.values.studentRollNo}
                />
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

              <Table variant="simple" className={styles.table}>
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
