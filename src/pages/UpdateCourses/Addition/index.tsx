import { Button, VStack, Text, useStatStyles } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import Loading from '../../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Error, Input, Select } from '../../../components'
import styles from './Addition.module.scss'
import { typeData } from '../../../utils/Data/resultAnnouncementData'
import { branchesAPI, coursesAPI } from '../../../utils/apis'

export default function Addition() {
  const [data, setData] = useState([])
  const [otherCourse, setOtherCourse] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [name, setName] = useState('')
  const [duration, setDuration] = useState(0)
  const [branchName, setBranchName] = useState('')
  const [branchFullName, setBranchFullName] = useState('')
  const [id, setId] = useState(null)
  const formik = useFormik({
    initialValues: {
      name: '',
      duration: '',
      branch_name: '',
      branch_fullname: '',
      other_course_name: 'Other',
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required('Course name is required').min(1),
      branch_name: Yup.string().required('Branch name is required'),
      branch_fullname: Yup.string().required('Branch full name is required'),
    }),
    onSubmit: () => {
      setIsLoading(!isLoading)
      setTimeout(() => {
        setIsLoading((prevState) => !prevState)
        setShowAnimation((state) => !state)
      }, 3000)
      const postData = async () => {
        if (otherCourse) {
          const newData = {
            course: {
              name,
              years: duration,
            },
            branches: [
              {
                branch_name: branchName,
                branch_fullname: branchFullName,
              },
            ],
          }
          await coursesAPI
            .post('/', newData)
            .then(function (response) {
              console.log(response)
            })
            .catch(function (err) {
              console.log(err)
            })
        } else {
          // console.log(id)
          await branchesAPI
            .get(`/${id}`)
            .then(function (response) {
              const newData = {
                course: {
                  name,
                  years: duration,
                  id,
                },
                branches: [
                  ...response.data.branches,
                  {
                    branch_name: branchName,
                    branch_fullname: branchFullName,
                  },
                ],
              }

              const postNewData = async () => {
                await coursesAPI
                  .put('', newData)
                  .then(function (res) {
                    console.log(res)
                  })
                  .catch(function (error) {
                    console.log(error)
                  })
              }
              postNewData()
            })
            .catch(function (err) {
              console.log(err)
            })
        }
      }
      postData()
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
  }
  const handleBranchFullname = async (e: any) => {
    setBranchFullName(e.target.value)
    formik.setFieldValue('branch_fullname', e.target.value)
  }
  const handleCourseName = async (e: any) => {
    if (e.target.value === 'Other') {
      setOtherCourse(true)
    } else {
      setOtherCourse(false)
      setName(e.target.value)
      const courseInfo = data.filter((dt) => {
        return dt.name === e.target.value
      })
      setDuration(courseInfo[0].years)
      setId(courseInfo[0].id)
    }
    formik.handleChange(e)
  }

  const handleOtherCourseName = async (e: any) => {
    setName(e.target.value)
    formik.setFieldValue('other_course_name', e.target.value)
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
          <Text className={styles.tag_line}>Added successfully</Text>{' '}
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
                <option key="other">Other</option>
              </Select>

              {otherCourse && (
                <Input
                  onBlur={formik.handleBlur}
                  onChange={(e) => handleOtherCourseName(e)}
                  name="other_course_name"
                  placeholder="Course Name"
                  value={formik.values.other_course_name}
                />
              )}

              {otherCourse &&
              formik.touched.other_course_name &&
              formik.errors.other_course_name ? (
                <Error errorMessage={formik.errors.other_course_name} />
              ) : null}

              {formik.touched.name && formik.errors.name ? (
                <Error errorMessage={formik.errors.name} />
              ) : null}

              {otherCourse ? (
                <Input
                  onBlur={formik.handleBlur}
                  type="number"
                  onChange={(e) => handleDuration(e)}
                  name="duration"
                  placeholder="Duration"
                  value={duration}
                />
              ) : (
                <Input
                  onBlur={formik.handleBlur}
                  type="number"
                  onChange={(e) => handleDuration(e)}
                  name="duration"
                  placeholder="Duration"
                  value={duration}
                  isDisabled
                />
              )}

              {formik.touched.duration && formik.errors.duration ? (
                <Error errorMessage={formik.errors.duration} />
              ) : null}

              <Input
                onBlur={formik.handleBlur}
                onChange={(e) => handleBranchName(e)}
                name="branch_name"
                placeholder="Branch Name"
                value={branchName}
              />

              {formik.touched.branch_name && formik.errors.branch_name ? (
                <Error errorMessage={formik.errors.branch_name} />
              ) : null}

              <Input
                onBlur={formik.handleBlur}
                onChange={(e) => handleBranchFullname(e)}
                name="branch_fullname"
                placeholder="Branch Full Name"
                value={formik.values.branch_fullname}
              />

              <Button
                background="linear-gradient(40deg,#45cafc,#303f9f)"
                color="white"
                _hover={{ background: 'linear-gradient(90deg,#45cafc,#303f9f)' }}
                isLoading={isLoading}
                type="submit"
                isDisabled={!formik.isValid}
              >
                Add
              </Button>
            </>
          </VStack>
        </form>
      )}
    </div>
  )
}
