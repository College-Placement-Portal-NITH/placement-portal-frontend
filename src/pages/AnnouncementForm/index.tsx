import { useNavigate } from 'react-router-dom'
import { Button, VStack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react'
import Lottie from 'lottie-react'
import ReactQuill from 'react-quill'
import Animation from '../../assets/animations/95580-time-table.json'
import Loading from '../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Error, Input, Select } from '../../components'
import styles from './AnnouncementForm.module.scss'
import { dashboardAPI } from '../../utils/apis'
import useCompanies from '../../hooks/useCompanyList'
// const { data, isSuccess, isError, isLoading } = useCompanies() // hook call for company details
const typeData = [
  { id: 16, value: 'General' },
  // { id: 17, value: 'Company' },
]

export default function AnnouncementForm() {
  const [value, setValue] = useState('')
  const [showAnimation, setShowAnimation] = useState(false)
  const date = new Date()
  // const { data, isSuccess, isError, isLoading } = useCompanies() // hook call for company details
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
      // company: '',
      session:
        date.getMonth() <= 5
          ? `${(date.getFullYear() - 1).toString()}-${date.getFullYear().toString().slice(2)}`
          : `${date.getFullYear().toString()}-${(date.getFullYear() + 1).toString().slice(2)}`,
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      type: Yup.string().required('Type is required'),
      // company: Yup.string().required('Company is required'),
    }),
    onSubmit: async (values) => {
      try {
        const objToSend = {
          title: values.title,
          session: values.session,
          type: values.type.toLowerCase(),
          description: value,
          // company: values.company,
        }
        await dashboardAPI.post('/', objToSend)

        setShowAnimation((state) => !state)
        setTimeout(() => {
          navigate('/dashboard')
        }, 3000)
      } catch (err) {
        console.log(err)
      }
    },
  })

  // console.log(companyData)

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Post an Announcement</h2>
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
            <h1 className={styles.heading}>Post an Announcement</h1>
            <form onSubmit={formik.handleSubmit} className={styles.form_container}>
              <VStack align="stretch" spacing={4}>
                <>
                  <Input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="session"
                    value={formik.values.session}
                    isDisabled
                    placeholder={
                      date.getMonth() > 5
                        ? `${date.getFullYear().toString()}-${(date.getFullYear() + 1)
                            .toString()
                            .slice(2)}`
                        : `${(date.getFullYear() - 1).toString()}-${date
                            .getFullYear()
                            .toString()
                            .slice(2)}`
                    }
                  />

                  <Input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="title"
                    placeholder="Title"
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <Error errorMessage={formik.errors.title} />
                  ) : null}

                  <Select
                    value={formik.values.type}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="type"
                    placeholder="Type"
                  >
                    {typeData.map((type) => (
                      <option key={type.id}>{type.value}</option>
                    ))}
                  </Select>
                  {formik.touched.type && formik.errors.type ? (
                    <Error errorMessage={formik.errors.type} />
                  ) : null}

                  {/* <Select
                    value={formik.values.company}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="company"
                    placeholder="Company"
                  >
                    {data?.map((company: { id: Key | number; name: string; logo: string }) => (
                      <option key={company.id}>{company.name}</option>
                    ))}
                  </Select>
                  {formik.touched.company && formik.errors.company ? (
                    <Error errorMessage={formik.errors.company} />
                  ) : null} */}

                  <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(e) => setValue(e)}
                    onBlur={formik.handleBlur}
                    className={styles.description}
                  />

                  {value.length <= 11 ? (
                    <Text color="blackAlpha.800" fontSize="md">
                      *Description too short
                    </Text>
                  ) : null}

                  <Button
                    background="linear-gradient(40deg,#45cafc,#303f9f)"
                    color="white"
                    _hover={{ background: 'linear-gradient(90deg,#45cafc,#303f9f)' }}
                    isLoading={formik.isSubmitting}
                    type="submit"
                    isDisabled={!formik.isValid || value.length <= 11}
                  >
                    Post
                  </Button>
                </>
              </VStack>
            </form>{' '}
          </>
        )}
      </div>
    </div>
  )
}
