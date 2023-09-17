/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import { Button, VStack, Text, Checkbox, Table, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import Lottie from 'lottie-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTrash } from '@fortawesome/free-solid-svg-icons'
import Animation from '../../assets/animations/95580-time-table.json'
import Loading from '../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Error, Input, Select } from '../../components'
import styles from './AddDriveForm.module.scss'
import { branchesAPI, companiesAPI, rolesAPI } from '../../utils/apis'
import { Company } from '../../utils/types'
import useCourses from '../../hooks/useCourses'
import Page500 from '../Page500'
import PageLoader from '../../components/PageLoader'

export default function DrivesForm() {
  const { data, isSuccess, isError, isLoading: courseLoading } = useCourses()
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [company, setCompany] = useState([])
  const [roles, setRoles] = useState([])
  const [isClicked, setClicked] = useState(false)
  const [branch, setBranch] = useState<any>([])
  const [course, setCourse] = useState<any>({})
  const [branchDetails, setBranchDetails] = useState<any>({})
  const [eligibleBatches, setEligibleBatches] = useState([
    {
      branch_id: branchDetails.id,
      branchName: branchDetails.name,
      course_id: course.id,
      course_name: course.name,
    },
  ])
  const [jobRoles, setJobRoles] = useState<any>([])

  const formik = useFormik({
    initialValues: {
      company: '',
      profile: '',
      jobDescription: '',
      modeOfHiring: '',
      ppt: true,
      aptitudeTest: true,
      technicalTest: true,
      groupDiscussion: true,
      noOfPersonsVisiting: 0,
      jobLocation: '',
      startingDate: '',
      jobType: '',
      ctc: 0,
      cgpi: 0,
      cluster: '',
      course: '',
      branch: '',
    },
    validationSchema: Yup.object().shape({
      company: Yup.string().required('Company is required'),
      profile: Yup.string().required('Profile is required'),
      jobDescription: Yup.string().required('JD Link is required'),
      modeOfHiring: Yup.string().required('Mode of Hiring is required'),
      ppt: Yup.boolean(),
      aptitudeTest: Yup.boolean(),
      technicalTest: Yup.boolean(),
      groupDiscussion: Yup.boolean(),
      noOfPersonsVisiting: Yup.number().min(0),
      jobLocation: Yup.string().required('Job Location is required'),
      startingDate: Yup.date().required('Drive Starting Date is required'),
      jobType: Yup.string().required('Job Type is required'),
      ctc: Yup.number().required('CTC is required').moreThan(0, 'CTC must be greater than 0'),
      cgpi: Yup.number().required('CTC is required').moreThan(0, 'CGPI must be greater than 0'),
      cluster: Yup.string().required('Cluster is required'),
      course: Yup.string().required('Course is required'),
      branch: Yup.string().required('Branch is required'),
    }),
    onSubmit: () => {
      setIsLoading(!isLoading)
      setTimeout(() => {
        setIsLoading((prevState) => !prevState)
        setShowAnimation((state) => !state)
      }, 3000)
    },
  })

  if (isError) {
    return <Page500 />
  }
  if (courseLoading || !isSuccess) {
    return <PageLoader />
  }

  const handleCourseChange = async (e: any) => {
    const parsedObj = JSON.parse(e.target.value)
    setCourse(parsedObj)

    formik.setFieldValue('course', e.target.value)

    const res = await branchesAPI.get(`/${parsedObj.id}`)
    setBranch(res.data)
  }

  const handleBranchChange = (e: any) => {
    const parsedObj = JSON.parse(e.target.value)
    setBranchDetails(parsedObj)
    formik.setFieldValue('branch', e.target.value)
  }

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

  const uniqueList = eligibleBatches.filter(
    (item, index, self) =>
      index ===
      self.findIndex((t) => t.branch_id === item.branch_id && t.course_id === item.course_id),
  )
  const addBranch = () => {
    setEligibleBatches([
      ...uniqueList,
      {
        branch_id: branchDetails.id,
        branchName: branchDetails.name,
        course_id: course.id,
        course_name: course.name,
      },
    ])
    formik.setFieldValue('branch', '1')
  }

  const removeBranch = (index: number) => {
    const list = [...uniqueList]
    list.splice(index, 1)
    setEligibleBatches(list)
  }

  const addRoles = () => {
    const obj = {
      jobProfile: formik.values.profile,
      jobCtc: formik.values.ctc,
      jobCluster: formik.values.cluster,
      jobEligibleBatches: uniqueList,
    }
    setJobRoles([...jobRoles, obj])
    setEligibleBatches([
      {
        branch_id: 0,
        branchName: '',
        course_id: 0,
        course_name: '',
      },
    ])
  }

  const closeRoles = () => {
    formik.setFieldValue('profile', '')
    formik.setFieldValue('jobType', '1')
    formik.setFieldValue('course', '1')
    formik.setFieldValue('branch', '1')
    formik.setFieldValue('cluster', '1')
    formik.setFieldValue('ctc', 0)
    setEligibleBatches([
      {
        branch_id: 0,
        branchName: '',
        course_id: 0,
        course_name: '',
      },
    ])
  }

  const removeRow = (index: number) => {
    const list = [...jobRoles]
    list.splice(index, 1)
    setJobRoles(list)
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Add a Drive</h2>
        <Lottie animationData={Animation} />
      </div>
      <div className={styles.content}>
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
          <>
            <h1 className={styles.heading}>Create A Drive</h1>
            <form onSubmit={formik.handleSubmit} className={styles.form_container}>
              <VStack align="stretch" spacing={4}>
                <>
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
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="jobDescription"
                    placeholder="JOB Description (JD) LINK"
                    value={formik.values.jobDescription}
                  />
                  {formik.touched.jobDescription && formik.errors.jobDescription ? (
                    <Error errorMessage={formik.errors.jobDescription} />
                  ) : null}

                  <Select
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="modeOfHiring"
                    placeholder="Mode Of Hiring"
                    value={formik.values.modeOfHiring}
                  >
                    <option>Virtual (Online)</option>
                    <option value="Onsite">Onsite (Campus Visit)</option>
                  </Select>
                  {formik.touched.modeOfHiring && formik.errors.modeOfHiring ? (
                    <Error errorMessage={formik.errors.modeOfHiring} />
                  ) : null}

                  {formik.values.modeOfHiring === 'Onsite' && (
                    <Input
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      name="noOfPersonsVisiting"
                      placeholder="No of Persons Visiting"
                      value={formik.values.noOfPersonsVisiting}
                    />
                  )}
                  {formik.touched.noOfPersonsVisiting && formik.errors.noOfPersonsVisiting ? (
                    <Error errorMessage={formik.errors.noOfPersonsVisiting} />
                  ) : null}

                  <div className={styles.checkboxes}>
                    <Checkbox
                      name="ppt"
                      onChange={formik.handleChange}
                      isChecked={formik.values.ppt}
                      value={formik.values.ppt ? 'true' : 'false'}
                      onBlur={formik.handleBlur}
                    >
                      Pre PLacement Talk?
                    </Checkbox>

                    <Checkbox
                      name="aptitudeTest"
                      onChange={formik.handleChange}
                      isChecked={formik.values.aptitudeTest}
                      value={formik.values.aptitudeTest ? 'true' : 'false'}
                      onBlur={formik.handleBlur}
                    >
                      Aptitude test?
                    </Checkbox>

                    <Checkbox
                      name="technicalTest"
                      onChange={formik.handleChange}
                      isChecked={formik.values.technicalTest}
                      value={formik.values.technicalTest ? 'true' : 'false'}
                      onBlur={formik.handleBlur}
                    >
                      Technical test?
                    </Checkbox>

                    <Checkbox
                      name="groupDiscussion"
                      onChange={formik.handleChange}
                      isChecked={formik.values.groupDiscussion}
                      value={formik.values.groupDiscussion ? 'true' : 'false'}
                      onBlur={formik.handleBlur}
                    >
                      Group Discussion?
                    </Checkbox>
                  </div>

                  <Input
                    value={formik.values.jobLocation}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="jobLocation"
                    placeholder="Job Locations (Eg:- Mumbai,Delhi)"
                  />
                  {formik.touched.jobLocation && formik.errors.jobLocation ? (
                    <Error errorMessage={formik.errors.jobLocation} />
                  ) : null}

                  <Input
                    value={formik.values.startingDate}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="startingDate"
                    type="date"
                    placeholder="Drive Starting Date"
                  />
                  {formik.touched.startingDate && formik.errors.startingDate ? (
                    <Error errorMessage={formik.errors.startingDate} />
                  ) : null}

                  <Select
                    value={formik.values.jobType}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="jobType"
                    placeholder="Job Type"
                  >
                    <option>Internship</option>
                    <option>Internship + PPO</option>
                    <option>Placement</option>
                  </Select>
                  {formik.touched.jobType && formik.errors.jobType ? (
                    <Error errorMessage={formik.errors.jobType} />
                  ) : null}

                  <div className={styles.seperator} />

                  <Input
                    value={formik.values.profile}
                    onBlur={formik.handleBlur}
                    onChange={(e) => handleRoleSearch(e)}
                    name="profile"
                    placeholder="Profile"
                  />
                  {formik.values.profile && (
                    <div
                      style={{
                        display: `${roles.length === 0 || isClicked ? 'none' : 'block'}`,
                      }}
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
                    value={formik.values.cluster}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="cluster"
                    placeholder="Select Cluster"
                  >
                    <option value={1}>Cluster 1</option>
                    <option value={2}>Cluster 2</option>
                    <option value={3}>Cluster 3</option>
                    <option value={4}>Cluster 4</option>
                    <option value={5}>Cluster 5</option>
                    <option value={6}>Cluster 6</option>
                  </Select>
                  {formik.touched.cluster && formik.errors.cluster ? (
                    <Error errorMessage={formik.errors.cluster} />
                  ) : null}

                  <Input
                    value={formik.values.cgpi}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="cgpi"
                    placeholder="Minimun CGPI Required"
                  />
                  {formik.touched.cgpi && formik.errors.cgpi ? (
                    <Error errorMessage={formik.errors.cgpi} />
                  ) : null}

                  {isSuccess && (
                    <Select
                      value={formik.values.course}
                      onChange={(e) => handleCourseChange(e)}
                      onBlur={formik.handleBlur}
                      name="course"
                      placeholder="Course"
                    >
                      {data.map((datas: any) => (
                        <option
                          value={`{"id":${datas.id},"years":${datas.years},"name":"${datas.name}"}`}
                          key={datas.id}
                        >
                          {datas.name}
                        </option>
                      ))}
                    </Select>
                  )}
                  {formik.touched.course && formik.errors.course ? (
                    <Error errorMessage={formik.errors.course} />
                  ) : null}

                  <Select
                    value={formik.values.branch}
                    onChange={(e) => handleBranchChange(e)}
                    onBlur={formik.handleBlur}
                    name="branch"
                    placeholder="Branch"
                  >
                    {branch.length !== 0 &&
                      branch.branches.map((datas: any) => (
                        <option
                          value={`{"id":${datas.id},"name":"${datas.branchName}"}`}
                          key={datas.id}
                        >
                          {datas.branchName}
                        </option>
                      ))}
                  </Select>
                  {formik.touched.branch && formik.errors.branch ? (
                    <Error errorMessage={formik.errors.branch} />
                  ) : null}

                  <div className={styles.add_branches}>
                    <Button
                      onClick={addBranch}
                      isDisabled={formik.values.branch === '' || formik.values.course === ''}
                    >
                      Add Branch
                    </Button>

                    <div className={styles.selected_branches_row}>
                      {uniqueList.slice(1).map((batches, idx: number) => (
                        <div
                          className={styles.selected_branches}
                          key={`${batches.branch_id}${batches.course_id}`}
                        >
                          <span style={{ padding: '5px' }}>
                            {batches.course_name} {batches.branchName}
                          </span>
                          <Button size="xs" onClick={() => removeBranch(idx + 1)}>
                            X
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.confirm_btn}>
                    <Button onClick={addRoles} isDisabled={uniqueList.length === 1}>
                      <FontAwesomeIcon icon={faCheck} color="#54B435" />
                    </Button>
                    <Button onClick={closeRoles}>
                      <FontAwesomeIcon icon={faTrash} color="#E64848" />
                    </Button>
                  </div>

                  {jobRoles.length !== 0 && (
                    <div className={styles.table}>
                      <Table variant="simple">
                        <Thead>
                          <Tr>
                            <Th>Job Role</Th>
                            <Th>Type</Th>
                            <Th>Eligible Branches</Th>
                            <Th>CTC(LPA)</Th>
                            <Th>Cluster</Th>
                            <Th> </Th>
                          </Tr>
                        </Thead>
                        {jobRoles.map((row: any, index: number) => (
                          <Tbody key={row.index}>
                            <Tr>
                              <Td>{row.jobProfile}</Td>
                              <Td>{formik.values.jobType}</Td>
                              <Td>
                                {row.jobEligibleBatches.slice(1).map((batches: any) => (
                                  <li key={batches.branch_id}>
                                    {batches.course_name} {batches.branchName}
                                  </li>
                                ))}
                              </Td>
                              <Td>{row.jobCtc}</Td>
                              <Td>{row.jobCluster}</Td>
                              <Td>
                                <Button size="sm" onClick={() => removeRow(index)}>
                                  <FontAwesomeIcon icon={faTrash} />
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
                    isLoading={isLoading}
                    type="submit"
                    isDisabled={!formik.isValid || jobRoles.length === 0}
                  >
                    Post
                  </Button>
                </>
              </VStack>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
