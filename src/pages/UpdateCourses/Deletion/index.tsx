import { Button, VStack, Text, useStatStyles } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import Loading from '../../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Error, Input, Select } from '../../../components'
import styles from './Deletion.module.scss'
import { typeData } from '../../../utils/Data/resultAnnouncementData'
import { branchesAPI, coursesAPI } from '../../../utils/apis'

export default function Deletion() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(0)
  const [branchName, setBranchName] = useState('')
  const [branchFullName, setBranchFullName] = useState('')
  const [courseSelected, setCourseSelected] = useState(false)
  const [branches, setBranches] = useState([])
  const [id, setId] = useState(null)
  const formik = useFormik({
    initialValues: {
      name: '',
      duration: '',
      branch_name: '',
      branch_fullname: '',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Course name is required').min(1),
      branch_name: Yup.string().required('Branch name is required'),
    }),
    onSubmit: () => {
      setIsLoading(!isLoading)
      setTimeout(() => {
        setIsLoading((prevState) => !prevState)
        setShowAnimation((state) => !state)
      }, 3000)
      const deleteData = async () => {
        if (branchName === 'Delete all branches') {
          await coursesAPI
            .delete(`/${id}`)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          const toBeDeleted = branches.filter((branch) => {
            return branch.branch_name === branchName
          })
          await branchesAPI
            .delete(`/${toBeDeleted[0].id}`)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      }
      deleteData()
    },
  })

  const handleDuration = async (e: any) => {
    setDuration(e.target.value)
    formik.setFieldValue('duration', e.target.value)
    return ''
  }
  const handleBranchName = async (e: any) => {
    setBranchName(e.target.value)
    formik.setFieldValue('branch_name', e.target.value)
    if (e.target.value === 'Delete all branches') {
      formik.setFieldValue('branch_fullname', 'DELETE ALL BRANCHES')
    } else {
      const branchFullN = branches.filter((branch) => {
        return branch.branch_name === e.target.value
      })
      formik.setFieldValue('branch_fullname', branchFullN[0].branch_fullname)
    }
  }
  const handleBranchFullname = async (e: any) => {
    setBranchFullName(e.target.value)
    formik.setFieldValue('branch_fullname', e.target.value)
  }
  const handleCourseName = async (e: any) => {
    formik.handleChange(e)
    setName(e.target.value)
    setCourseSelected(true)
    const courseInfo = data.filter((dt) => {
      return dt.name === e.target.value
    })
    setDuration(courseInfo[0].years)
    setId(courseInfo[0].id)
    const branchData = await coursesAPI.get(`/branches/${courseInfo[0].id}`)
    setBranches(branchData.data.branches)
    console.log(branches)
    formik.handleChange(e)
  }

  const getData = async () => {
    const response = await coursesAPI.get('/')
    setData(response.data)
  }
  useEffect(() => {
    getData()
  }, [])

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
          <Text className={styles.tag_line}>Deleted successfully</Text>{' '}
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={styles.form_container}>
          <VStack align="stretch" spacing={4}>
            <>
              <Select
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={(e) => handleCourseName(e)}
                name="name"
                placeholder="Course Name"
              >
                {data.map((dt) => (
                  <option key={dt.id}>{dt.name}</option>
                ))}
              </Select>

              {formik.touched.name && formik.errors.name ? (
                <Error errorMessage={formik.errors.name} />
              ) : null}

              <Input
                onBlur={formik.handleBlur}
                type="number"
                onChange={(e) => handleDuration(e)}
                name="duration"
                placeholder="Duration"
                value={duration}
                isDisabled
              />

              {formik.touched.duration && formik.errors.duration ? (
                <Error errorMessage={formik.errors.duration} />
              ) : null}

              <Select
                onBlur={formik.handleBlur}
                onChange={(e) => handleBranchName(e)}
                name="branch_name"
                placeholder="Branch Name"
                value={branchName}
              >
                {courseSelected && <option key="all">Delete all branches</option>}
                {courseSelected &&
                  branches.map((dt) => <option key={dt.id}>{dt.branch_name}</option>)}
              </Select>

              {formik.touched.branch_name && formik.errors.branch_name ? (
                <Error errorMessage={formik.errors.branch_name} />
              ) : null}

              <Input
                onBlur={formik.handleBlur}
                onChange={(e) => handleBranchFullname(e)}
                name="branch_fullname"
                placeholder="Branch Full Name"
                value={formik.values.branch_fullname}
                isDisabled
              />

              <Button
                background="linear-gradient(40deg,#45cafc,#303f9f)"
                color="white"
                _hover={{ background: 'linear-gradient(90deg,#45cafc,#303f9f)' }}
                isLoading={isLoading}
                type="submit"
                isDisabled={!formik.isValid}
              >
                Delete
              </Button>
            </>
          </VStack>
        </form>
      )}
    </div>
  )
}
