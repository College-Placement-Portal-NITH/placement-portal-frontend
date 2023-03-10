import { Button, VStack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import Lottie from 'lottie-react'
import ReactQuill from 'react-quill'
import Animation from '../../assets/animations/95580-time-table.json'
import Loading from '../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Error, Input, Select } from '../../components'
import styles from './AnnouncementForm.module.scss'

const typeData = [
  { id: 16, value: 'Meeting' },
  { id: 17, value: 'PPT' },
  { id: 18, value: 'Intern' },
  { id: 19, value: 'Placement' },
]

export default function AnnouncementForm() {
  const [value, setValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const date = new Date()

  const formik = useFormik({
    initialValues: {
      title: '',
      type: '',
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required('Title is required'),
      type: Yup.string().required('Type is required'),
    }),
    onSubmit: (e, values) => {
      setIsLoading(!isLoading)
      setTimeout(() => {
        setIsLoading((prevState) => !prevState)
        setShowAnimation((state) => !state)
      }, 3000)
    },
  })

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
                    value={formik.values.title}
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
                    {typeData.map((data) => (
                      <option key={data.id}>{data.value}</option>
                    ))}
                  </Select>
                  {formik.touched.type && formik.errors.type ? (
                    <Error errorMessage={formik.errors.type} />
                  ) : null}

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
                    isLoading={isLoading}
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
