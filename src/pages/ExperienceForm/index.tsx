/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState } from 'react'
import { Button, VStack, Text } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import jwtDecode from 'jwt-decode'
import Lottie from 'lottie-react'
// import ReactQuill from 'react-quill'
import { useNavigate } from 'react-router-dom'
import MDEditor from '@uiw/react-md-editor'
import Animation from '../../assets/animations/103081-yoga-2.json'
import Loading from '../../assets/animations/81544-rolling-check-mark.json'
import 'react-quill/dist/quill.snow.css'
import { Input, Select, Error } from '../../components'
import styles from './ExperienceForm.module.scss'
import { companiesAPI, experiencesAPI, rolesAPI } from '../../utils/apis'
import { Company } from '../../utils/types'
import { getDataFromLocalStorage } from '../../utils/functions'

const typeData = [
  { id: 9, value: 'Internship' },
  { id: 10, value: 'Placement' },
]

const verdictData = [
  {
    id: 16,
    value: 'Selected',
  },
  { id: 17, value: 'Not Selected' },
]

const anonymousData = [
  { id: 14, value: 'Yes' },
  { id: 15, value: 'No' },
]

const difficultyData = [
  { id: 16, value: 'Easy' },
  { id: 17, value: 'Medium' },
  { id: 18, value: 'Hard' },
]

function decodeDifficulty(difficulty: string) {
  switch (difficulty) {
    case 'Easy':
      return 'E'
    case 'Medium':
      return 'M'
    case 'Hard':
      return 'H'
    default:
      return ''
  }
}

function decodeAnonymity(verdict: string) {
  if (verdict === 'Yes') {
    return true
  }
  return false
}

function decodeSelected(selected: string) {
  if (selected === 'Selected') {
    return true
  }
  return false
}

export default function ExperienceForm() {
  const [showAnimation, setShowAnimation] = useState(false)
  const [value, setValue] = useState('')
  const [company, setCompany] = useState([])
  const [roles, setRoles] = useState([])
  const [isClicked, setClicked] = useState(false)
  const handleEditorChange = (event: React.SetStateAction<string>) => {
    setValue(event)
  }

  const navigate = useNavigate()

  let accessDecoded: any
  if ('access_token' in localStorage) {
    const accessToken = getDataFromLocalStorage('access_token')
    if (accessToken) {
      accessDecoded = jwtDecode(accessToken)
    }
  }

  const formik = useFormik({
    initialValues: {
      company: '',
      difficulty: '',
      roles: '',
      jobtype: '',
      no_of_rounds: '',
      selected: '',
      anonymity: '',
    },
    validationSchema: Yup.object().shape({
      company: Yup.string().required('*Required'),
      difficulty: Yup.string().required('*Required'),
      roles: Yup.string().required('*Required'),
      jobtype: Yup.string().required('*Required'),
      no_of_rounds: Yup.number().required('*Required').typeError('Should be an integer'),
      selected: Yup.string().required('*Required'),
      anonymity: Yup.string().required('*Required'),
    }),
    onSubmit: async (values) => {
      try {
        const objToSent = {
          ...values,
          description: value,
          difficulty: decodeDifficulty(formik.values.difficulty),
          anonymity: decodeAnonymity(formik.values.anonymity),
          selected: decodeSelected(formik.values.selected),
          student: accessDecoded.roll,
        }
        await experiencesAPI.post('/', objToSent)

        setShowAnimation((state) => !state)
        setTimeout(() => {
          navigate('/experiences')
        }, 2000)
      } catch (err) {
        console.log(err)
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
    formik.setFieldValue('roles', e.target.value)
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

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Share Your Experience</h2>
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
            <Text className={styles.tag_line}>Thankyou for sharing your valuable experience.</Text>{' '}
          </div>
        ) : (
          <>
            <h1 className={styles.heading}>Share Your Experience</h1>
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
                          onClick={(e) => {
                            formik.setFieldValue('company', companyData.name)
                            setClicked(true)
                            setCompany([])
                          }}
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

                  <Select
                    value={formik.values.difficulty}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="difficulty"
                    placeholder="Difficulty"
                  >
                    {difficultyData.map((diffData) => (
                      <option key={diffData.id}>{diffData.value}</option>
                    ))}
                  </Select>
                  {formik.touched.difficulty && formik.errors.difficulty ? (
                    <Error errorMessage={formik.errors.difficulty} />
                  ) : null}

                  <Input
                    onBlur={formik.handleBlur}
                    onChange={(e) => handleRoleSearch(e)}
                    name="roles"
                    placeholder="Role"
                    value={formik.values.roles}
                  />
                  {formik.values.roles && (
                    <div
                      style={{ display: `${roles.length === 0 || isClicked ? 'none' : 'block'}` }}
                      className={styles.suggestions}
                    >
                      {roles.map((rolesData: any) => (
                        <p
                          onClick={(e) => {
                            formik.setFieldValue('roles', rolesData.name)
                            setClicked(true)
                            setRoles([])
                          }}
                          className={styles.item}
                          key={rolesData.id}
                        >
                          {rolesData.name}
                        </p>
                      ))}
                    </div>
                  )}
                  {formik.touched.roles && formik.errors.roles ? (
                    <Error errorMessage={formik.errors.roles} />
                  ) : null}

                  <Select
                    value={formik.values.jobtype}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="jobtype"
                    placeholder="Type"
                  >
                    {typeData.map((typeDatas) => (
                      <option key={typeDatas.id}>{typeDatas.value}</option>
                    ))}
                  </Select>
                  {formik.touched.jobtype && formik.errors.jobtype ? (
                    <Error errorMessage={formik.errors.jobtype} />
                  ) : null}
                  <Input
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="no_of_rounds"
                    placeholder="Rounds"
                    value={formik.values.no_of_rounds}
                  />
                  {formik.touched.no_of_rounds && formik.errors.no_of_rounds ? (
                    <Error errorMessage={formik.errors.no_of_rounds} />
                  ) : null}
                  <Select
                    value={formik.values.selected}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="selected"
                    placeholder="Verdict"
                  >
                    {verdictData.map((verData) => (
                      <option key={verData.id}>{verData.value}</option>
                    ))}
                  </Select>
                  {formik.touched.selected && formik.errors.selected ? (
                    <Error errorMessage={formik.errors.selected} />
                  ) : null}
                  <Select
                    value={formik.values.anonymity}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    name="anonymity"
                    placeholder="Anonymous"
                  >
                    {anonymousData.map((anonyData) => (
                      <option key={anonyData.id}>{anonyData.value}</option>
                    ))}
                  </Select>
                  {formik.touched.anonymity && formik.errors.anonymity ? (
                    <Error errorMessage={formik.errors.anonymity} />
                  ) : null}

                  <MDEditor value={value} onChange={(e) => handleEditorChange(e || ' ')} />
                  <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
                  {/* <ReactQuill
                    theme="snow"
                    value={value}
                    onChange={(e) => setValue(e)}
                    onBlur={formik.handleBlur}
                    className={styles.description}
                  /> */}

                  {value.length < 50 ? (
                    <Text color="blackAlpha.800" fontSize="md">
                      *Description should be of minimum 50 words
                    </Text>
                  ) : null}

                  <Button
                    background="linear-gradient(40deg,#45cafc,#303f9f)"
                    color="white"
                    _hover={{ background: 'linear-gradient(90deg,#45cafc,#303f9f)' }}
                    isLoading={formik.isSubmitting}
                    type="submit"
                    isDisabled={!formik.isValid || value.length < 50 || formik.isSubmitting}
                  >
                    Submit Experience
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
