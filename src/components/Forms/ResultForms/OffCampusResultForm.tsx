/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button, VStack, Text, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
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
// import { allStudentData, typeData } from '../../../utils/Data/resultAnnouncementData'
import { typeData } from '../../../utils/Data/resultAnnouncementData'
import { companiesAPI, rolesAPI, offCampusAPI } from '../../../utils/apis'
import { Company } from '../../../utils/types'

export default function OffCampusResultForm() {
  const [showAnimation, setShowAnimation] = useState(false)
  const [company, setCompany] = useState([])
  const [roles, setRoles] = useState([])
  const [isClicked, setClicked] = useState(false)
  const [uniqueList, setUniqueList] = useState<any>([])
  const date = new Date()

  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      studentRollNo: '',
      type: '',
      company: '',
      profile: '',
      session: '',
      ctc: 0,
    },
    validationSchema: Yup.object().shape({
      studentRollNo: Yup.string().required('Student Roll Number is required').min(6),
      type: Yup.string().required('Type is required'),
      company: Yup.string().required('Company is required'),
      profile: Yup.string().required('Profile is required'),
      session: Yup.string().required('Session is required'),
      ctc: Yup.number().required('CTC is required').moreThan(0, 'CTC must be greater than 0'),
    }),
    onSubmit: async () => {
      const objToSend = {
        type: formik.values.type.toLowerCase(),
        company: formik.values.company,
        profile: formik.values.profile,
        session: formik.values.session,
        ctc: formik.values.ctc,
        selected_students: uniqueList,
      }

      try {
        // const res = await offCampusAPI.post('/', objToSend)
        setShowAnimation(!showAnimation)
        setTimeout(() => {
          navigate('/tpo-dashboard')
        }, 2000)
      } catch (err) {
        // console.log(err)
      }
    },
  })

  const handleSearch = async (e: any) => {
    setClicked(false)
    formik.setFieldValue('company', e.target.value)
    const controller = new AbortController()
    const response = await companiesAPI.get('/', {
      signal: controller.signal,
      params: {
        search: e.target.value,
      },
    })

    controller.abort()
    setCompany(response.data)
  }

  const handleRoleSearch = async (e: any) => {
    setClicked(false)
    formik.setFieldValue('profile', e.target.value)
    const controller = new AbortController()
    const response = await rolesAPI.get('/', {
      signal: controller.signal,
      params: {
        search: e.target.value,
      },
    })

    controller.abort()
    setRoles(response.data)
  }

  const getCompanySuggestions = (name: string) => {
    formik.setFieldValue('company', name)
    setClicked(true)
    setCompany([])
  }

  const getRoleSuggestions = (name: string) => {
    formik.setFieldValue('profile', name)
    setClicked(true)
    setRoles([])
  }

  const addRow = () => {
    if (uniqueList.find((student: any) => student.roll_number === formik.values.studentRollNo)) {
      return ''
    }

    const obj = {
      roll_number: formik.values.studentRollNo,
      company: formik.values.company,
      compensation: formik.values.ctc,
      profile: formik.values.profile,
      session: formik.values.session,
      type: formik.values.type.toLowerCase(),
    }

    setUniqueList([...uniqueList, obj])
    return ''
  }

  const removeRow = (index: number) => {
    const list = [...uniqueList].filter((item, idx) => idx !== index - 1)
    setUniqueList([...list])
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
          <VStack align="stretch" spacing={2}>
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

              <Input
                onBlur={formik.handleBlur}
                onChange={(e) => handleSearch(e)}
                name="company"
                placeholder="Company Name"
                value={formik.values.company}
              />
              {formik.values.company && (
                <div
                  style={{
                    display: `${company.length === 0 || isClicked ? 'none' : 'block'}`,
                  }}
                  className={styles.suggestions}
                >
                  {company.map((companyData: Company) => (
                    <p
                      onClick={() => getCompanySuggestions(companyData.name)}
                      className={styles.item}
                      key={companyData.id}
                    >
                      {companyData.name}
                    </p>
                  ))}
                </div>
              )}

              {formik.touched.company && formik.errors.company ? (
                <Error errorMessage={formik.errors.company} />
              ) : null}

              <Input
                value={formik.values.profile}
                onBlur={formik.handleBlur}
                onChange={(e) => handleRoleSearch(e)}
                name="profile"
                placeholder="Profile"
              />

              {formik.values.profile && (
                <div
                  style={{ display: `${roles.length === 0 || isClicked ? 'none' : 'block'}` }}
                  className={styles.suggestions}
                >
                  {roles.map((rolesData: any) => (
                    <p
                      onClick={() => getRoleSuggestions(rolesData.name)}
                      className={styles.item}
                      key={rolesData.id}
                    >
                      {rolesData.name}
                    </p>
                  ))}
                </div>
              )}

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
                  isDisabled={formik.values.studentRollNo.length < 6}
                >
                  <FontAwesomeIcon icon={faUserPlus} />
                </Button>
              </div>
              {uniqueList.length > 0 && (
                <div className={styles.table}>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Roll Number</Th>
                        <Th>Company</Th>
                        <Th>{formik.values.type === 'Placement' ? 'CTC' : 'Stipend'}</Th>
                        <Th>Role</Th>
                      </Tr>
                    </Thead>
                    {uniqueList.map((row: any, index: any) => (
                      <Tbody key={row.roll_number}>
                        <Tr>
                          <Td>{row.roll_number}</Td>
                          <Td>{row.company}</Td>
                          <Td>{row.compensation}</Td>
                          <Td>{row.profile}</Td>
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
              )}
              <Button
                background="linear-gradient(40deg,#45cafc,#303f9f)"
                color="white"
                _hover={{ background: 'linear-gradient(90deg,#45cafc,#303f9f)' }}
                isLoading={formik.isSubmitting}
                type="submit"
                isDisabled={!formik.isValid || uniqueList.length === 0}
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
