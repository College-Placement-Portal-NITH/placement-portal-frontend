import { useFormik, ErrorMessage } from 'formik'
import axios, { AxiosRequestConfig } from 'axios'
import fs from 'fs'
import * as Yup from 'yup'
import { useState, useEffect } from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Input,
  Select,
  TagLabel,
  Tag,
  TagCloseButton,
} from '@chakra-ui/react'
import { nanoid } from 'nanoid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { Error, Paginator } from '../../components/index'
import styles from './StudentData.module.scss'
import { CourseData, CourseChosen, BranchChosen, BranchData } from '../../utils/types'

import Page500 from '../Page500'
import PageLoader from '../../components/PageLoader'
import useStudentData from '../../hooks/useStudentData'
import { branchesAPI } from '../../utils/apis'
import useCourses from '../../hooks/useCourses'
import useBranches from '../../hooks/useBranches'

function StudentData() {
  const btechData = useBranches(1).data
  const [branchData, setbranchData] = useState<Array<any>>([
    { id: 1, branchName: 'cse', branchFullname: 'computer science and engineering' },
    { id: 4, branchName: 'ce', branchFullname: 'Civil Engineering' },
    { id: 5, branchName: 'che', branchFullname: 'Chemical Engineering' },
    { id: 6, branchName: 'Mnc', branchFullname: 'Mathematics & Computing' },
    { id: 7, branchName: 'ee', branchFullname: 'Electrical Engineering' },
    { id: 8, branchName: 'ece', branchFullname: 'Electronics & Communication Engineering' },
    { id: 9, branchName: 'ep', branchFullname: 'Engineering Physics' },
    { id: 10, branchName: 'material', branchFullname: 'Mathematics & Computing' },
    { id: 11, branchName: 'mechanical', branchFullname: 'Mechanical Engineering' },
  ])
  const [page, setPage] = useState(1)
  const { data: courseData, isSuccess: courseIsSuccess } = useCourses()
  const [selectedCourse, setSelectedCourse] = useState('')
  const mtechData = useBranches(2).data
  const DualData = useBranches(3).data
  const barchData = useBranches(4).data
  const marchData = useBranches(5).data
  const MBAData = useBranches(6).data
  const mscData = useBranches(7).data

  const [courses, setCourses] = useState<Array<CourseChosen>>([])
  const [branches, setBranches] = useState<Array<BranchChosen>>([])

  const [branchDetails, setBranchDetails] = useState({ id: 0, name: '' })
  const [filterCourse, setFilterCourse] = useState('')
  const [filterBranch, setFilterBranch] = useState('')
  const [filterCgpi, setFilterCgpi] = useState<number | undefined>()
  const [filter10percentage, setfilter10percentage] = useState<number | undefined>()
  const [filter12percentage, setfilter12percentage] = useState<number | undefined>()
  const [filterJEEscore, setfilterJEEscore] = useState<number | undefined>()
  const [courseStr, setCourseStr] = useState('')
  const [selectedBranch, setSelectedBranch] = useState('')
  const [branchStr, setBranchStr] = useState('')
  const [gender, setGender] = useState('')

  // const [selectedSortingFactors, setSelectedSortingFactors] = useState<string[]>([])
  // const SortingFactorsData = ['CGPI', '10th Results', '12th results', 'JEE Result']
  // useEffect(() => {
  //   if (courseIsSuccess) {
  //     setCourses(courseData)
  //   }
  // }, [courseIsSuccess, courseData])

  /// //////////////

  useEffect(() => {
    if (branchData) {
      setBranchDetails({ id: Number(branchData[0].id), name: branchData[0].branchName })
    }
  }, [branchData])

  function extractCourse(clustersArr: Array<CourseChosen>) {
    const str = clustersArr.map((cluster) => cluster.value).join(',')
    setCourseStr(str)
  }

  const onSearch = () => {
    setPage(1)
    extractCourse(courses)
  }

  const handleMultiDelete = (idx: number) => {
    const items = courses.filter((item, index) => index !== idx)
    setCourses(items)
    extractCourse(items)
  }

  const addCourse = (e: any) => {
    e.preventDefault()
    if (e === '' || courses.find((C) => C.value === selectedCourse)) {
      return
    }
    if (selectedCourse === '') {
      return
    }
    const arr = [...courses, { id: e, value: selectedCourse }]
    setCourses(arr)
    extractCourse(arr)
    setSelectedCourse('')
  }
  const HandleCourseChange = (e: any) => {
    if (e.target.value === '') {
      return
    }
    setSelectedCourse(e.target.value)
    const id = e.target.selectedOptions[0].getAttribute('value')
    switch (id) {
      case 'B.Tech':
        setbranchData(btechData)
        break
      case 'M.Tech':
        setbranchData(mtechData)
        break
      case 'Dual Degree':
        setbranchData(DualData)
        break
      case 'B.Arch':
        setbranchData(barchData)
        break
      case 'M.Arch':
        setbranchData(marchData)
        break
      case 'MBA':
        setbranchData(MBAData)
        break
      case 'M.Sc':
        setbranchData(mscData)
        break
      default:
        setbranchData(btechData)
    }
  }

  /// /////////////////
  function extractBranch(clustersArr: Array<BranchChosen>) {
    const str = clustersArr.map((cluster) => cluster.value).join(',')
    setBranchStr(str)
  }

  const handleMultiDeleteBranch = (idx: number) => {
    const items = branches.filter((item, index) => index !== idx)
    setBranches(items)
    extractBranch(items)
  }

  const addBranch = (e: any) => {
    e.preventDefault()
    if (e === '' || branches.find((C) => C.value === selectedBranch)) {
      return
    }
    if (e.target.value === selectedBranch) {
      return
    }
    if (selectedBranch === '') {
      return
    }
    const arr = [...branches, { id: e, value: selectedBranch }]
    setBranches(arr)
    extractBranch(arr)
    setSelectedBranch('')
  }
  const handleBranchChange = (e: any) => {
    setSelectedBranch(e.target.value)
  }

  const [courseOptions, setCourseOptions] = useState<Array<any>>([])
  // course chosen
  const [coursesChose, setCoursesChose] = useState<Array<any>>([])

  const handleCourseClick = (e: any) => {
    if (e === '' || coursesChose.find((C) => C.id === e)) {
      return
    }
    setCoursesChose([
      ...coursesChose,
      { id: e, value: courseOptions.find((C) => C.value === e)?.label },
    ])
  }

  const handleCourseDelete = (idx: number) => {
    const items = coursesChose.filter((item, index) => index !== idx)
    setCoursesChose(items)
  }

  const downloadXLSFile = async () => {
    // Its important to set the 'Content-Type': 'blob' and responseType:'arraybuffer'.
    const headers = { 'Content-Type': 'blob' }
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: 'http://127.0.0.1:8000/student/excel',
      responseType: 'arraybuffer',
      headers,
    }
    try {
      const response = await axios(config)
      const outputFilename = `${Date.now()}.xlsx`
      // If you want to download file automatically using link attribute.
      const url = URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', outputFilename)
      document.body.appendChild(link)
      link.click()
      // OR you can save/write file locally.
      fs.writeFileSync(outputFilename, response.data)
    } catch (err: any) {
      console.log(err)
    }
  }

  const {
    data,
    isError,
    isSuccess,
    isLoading: studentIsLoading,
  } = useStudentData(filterCourse, filterBranch, filterCgpi, page, gender)

  const formik = useFormik({
    initialValues: {
      course: '',
      branch: '',
      Gender: '',
      cgpi: undefined,
      JeeRank: undefined,
      tenth: undefined,
      twelth: undefined,
    },
    validationSchema: Yup.object().shape({
      course: Yup.string(),
      branch: Yup.string(),
      Gender: Yup.string(),
      cgpi: Yup.number()
        .typeError('CGPI must be a number')
        .positive()
        .min(0, 'CGPI should be positive')
        .max(10, 'CGPI should be 10 or less'),

      JeeRank: Yup.number()
        .typeError('Jee rank must be a number')
        .positive()
        .min(0, 'JEE Rank should be positive'),
      tenth: Yup.number()
        .typeError('percentage must be a number')
        .positive()
        .min(0, ' percentage must be positive')
        .max(100, ' percentage should be between 0 and 100'),
      twelth: Yup.number()
        .typeError('percentage must be a number')
        .positive()
        .min(0, ' percentage must be positive')
        .max(100, ' percentage should be between 0 and 100'),
    }),
    validateOnChange: true,
    onSubmit: () => {
      setFilterBranch(branchDetails.name)
      setFilterCgpi(formik.values.cgpi)
      setFilterCourse(courses[0].value)
      setfilter10percentage(formik.values.tenth)
      setfilter12percentage(formik.values.twelth)
      setfilterJEEscore(formik.values.JeeRank)
    },
  })

  /// /////////////////////////////

  // Sorting execution

  const getGender = (x: string) => {
    switch (x) {
      case 'm':
        return 'Male'
      case 'f':
        return 'Female'
      default:
        return 'Other'
    }
  }
  const handleGenderChange = (e: any) => {
    setGender(e.target.value)
  }
  if (isError) {
    return <Page500 />
  }

  if (studentIsLoading || !isSuccess) {
    return <PageLoader />
  }

  const studentData = data
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.page_name}>Student Data</h1>
      </div>
      <div className={styles.content}>
        <form onSubmit={formik.handleSubmit} className={styles.form_container}>
          <h2 className={styles.title}>Filters</h2>
          {/* course component started */}
          <div className={styles.filters}>
            <Select
              name="Course"
              placeholder="Choose Courses"
              onChange={HandleCourseChange}
              value={selectedCourse}
              backgroundColor="white"
            >
              {courseIsSuccess &&
                courseData.map((clust: CourseData) => (
                  <option key={clust.id} value={clust.name}>
                    {clust.name}
                  </option>
                ))}
            </Select>

            <Button onClick={addCourse} title="Select and Add multiple Courses">
              <FontAwesomeIcon cursor="pointer" icon={faPlus} />
            </Button>

            {/* course component ended */}
            {/* branch component started */}
            <Select
              name="Branch"
              placeholder="Choose Branch"
              onChange={handleBranchChange}
              value={selectedBranch}
              backgroundColor="white"
            >
              {branchData.map((clust: any) => (
                <option key={clust.id} value={clust.branchName}>
                  {clust.branchName}
                </option>
              ))}
            </Select>

            <Button onClick={addBranch} title="Select and Add multiple Branches">
              <FontAwesomeIcon cursor="pointer" icon={faPlus} />
            </Button>
            {/* branch component ended */}
            {/* select gender */}

            <Select
              name="Gender"
              placeholder="Choose Gender"
              onChange={handleGenderChange}
              value={getGender(gender)}
              backgroundColor="white"
            >
              <option value="m">Male</option>
              <option value="f">Female</option>
              <option value="o">Other</option>
            </Select>
          </div>

          {/* sort data ?  view */}
          <div className={styles.filters}>
            <span className={styles.sortElement}>
              <Input
                value={formik.values.cgpi}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="cgpi"
                placeholder="CGPI"
                background="white"
              />
              {formik.touched.cgpi && formik.errors.cgpi ? (
                <Error errorMessage={formik.errors.cgpi} />
              ) : null}
            </span>
            <span className={styles.sortElement}>
              <Input
                value={formik.values.JeeRank}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="JeeRank"
                placeholder="JEE Rank"
                background="white"
              />
              {formik.touched.JeeRank && formik.errors.JeeRank ? (
                <Error errorMessage={formik.errors.JeeRank} />
              ) : null}
            </span>
            <span className={styles.sortElement}>
              <Input
                value={formik.values.tenth}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="tenth"
                placeholder="10th Percentage"
                background="white"
              />

              {formik.touched.tenth && formik.errors.tenth ? (
                <Error errorMessage={formik.errors.tenth} />
              ) : null}
            </span>
            <span className={styles.sortElement}>
              <Input
                value={formik.values.twelth}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                name="twelth"
                placeholder="12th Percentage"
                background="white"
              />
              {formik.touched.twelth && formik.errors.twelth ? (
                <Error errorMessage={formik.errors.twelth} />
              ) : null}
            </span>
          </div>

          {/* filter data or sort data  ?  show Tags */}
          {courses.length !== 0 || branches.length !== 0 ? (
            <div className={styles.filterArea}>
              <div className={styles.selected_clusters}>
                {courses.map((cource: CourseChosen, idx: number) => (
                  <Tag
                    size="sm"
                    key={nanoid()}
                    borderRadius="full"
                    variant="solid"
                    justifySelf="center"
                    colorScheme="blackAlpha"
                    className={styles.tag}
                  >
                    <TagLabel className={styles.tl}>{cource.value}</TagLabel>
                    <TagCloseButton onClick={() => handleMultiDelete(idx)} />
                  </Tag>
                ))}
              </div>

              <div className={styles.selected_clusters}>
                {branches.map((branch: BranchChosen, idx: number) => (
                  <Tag
                    size="sm"
                    key={nanoid()}
                    borderRadius="full"
                    variant="solid"
                    justifySelf="center"
                    colorScheme="blackAlpha"
                    className={styles.tag}
                  >
                    <TagLabel className={styles.tl}>{branch.value}</TagLabel>
                    <TagCloseButton onClick={() => handleMultiDeleteBranch(idx)} />
                  </Tag>
                ))}
              </div>
            </div>
          ) : null}

          {/* button Area view */}
          <div className={styles.buttonArea}>
            <Button
              className={styles.apply_btn}
              type="submit"
              background="linear-gradient(40deg,#45cafc,#303f9f)"
              // blue bgGradient
              color="white"
              _hover={{ background: 'linear-gradient(to bottom, #4682B4, #5F9EA0)' }} // grey gradient
            >
              Apply filters
            </Button>

            <Button
              className={styles.apply_btn}
              type="button"
              onClick={() => {
                downloadXLSFile()
              }}
              background="#808080"
              color="white"
              _hover={{ background: 'linear-gradient(90deg, #ffffff, #333333)' }}
            >
              <span className={styles.icons8MicrosoftExcel} />
              <span>Download as Excel</span>
            </Button>
          </div>
        </form>

        <TableContainer className={styles.table_container}>
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Roll No</Th>
                <Th>Course</Th>
                <Th>Branch</Th>
                <Th>CGPI</Th>
                <Th>Gender</Th>
                {/* <Th>Gender</Th> */}
                <Th>Address</Th>
                <Th>Pin Code</Th>
              </Tr>
            </Thead>
            <Tbody>
              {studentData.results.map((datas: any) => {
                return (
                  <Tr key={datas.roll}>
                    <Td>{`${datas.first_name} ${datas.last_name}`}</Td>
                    <Td>{datas.roll}</Td>
                    <Td>{datas.course_name}</Td>
                    <Td>{datas.branch}</Td>
                    <Td>{datas.cgpi}</Td>
                    <Td>{getGender(datas.gender)}</Td>
                    <Td>{`${datas.city}, ${datas.state}`}</Td>
                    <Td>{datas.pincode}</Td>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </TableContainer>

        {studentData.results.length !== 0 && (
          <Paginator
            max={studentData.pages}
            curr={page}
            onNext={() => setPage(page + 1)}
            onPrev={() => setPage(page - 1)}
            disableNext={page === studentData.pages}
            disablePrev={page === 1}
          />
        )}
      </div>
    </>
  )
}

export default StudentData
