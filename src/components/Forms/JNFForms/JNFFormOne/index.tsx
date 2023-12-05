import { Button, useToast } from '@chakra-ui/react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { JNFFormOneProps } from '../../../../utils/types'
import styles from './JNFFormOne.module.scss'
import { Input, Select, RadioSelect, Error } from '../../../index'

const modeOfHiringData = [
  { id: 0, value: 'virtual', label: 'Virtual' },
  { id: 1, value: 'onsite', label: 'On-Site' },
  { id: 2, value: 'hybrid', label: 'Hybrid' },
]

export default function JNFFormOne({ onNext, data }: JNFFormOneProps) {
  const toast = useToast()
  const formik = useFormik({
    initialValues: {
      ...data,
    },
    validationSchema: Yup.object().shape({
      companyName: Yup.string().required('Company Name is Required'),
      session: Yup.string().required('Session is required'),
      // isPlacement: Yup.string().required('Placement Info is required'),
      // isSummerIntern: Yup.string().required('Summer Intern Info is required'),
      // isSixMonIntern: Yup.string().required('Six Months Intern Info is required'),
      modeOfHiring: Yup.string().required('Mode of Hiring is required'),
      prePlacementTalk: Yup.string().required('Pre-Placement Talk Info is required'),
      aptitudeTest: Yup.string().required('Aptitude Test Info is required'),
      technicalTest: Yup.string().required('Technical Test Info is required'),
      groupDiscussion: Yup.string().required('Group Discussion Info is required'),
      personalInterview: Yup.string().required('Personal Interview Info is required'),
      noOfPersonVisiting: Yup.number().when('modeOfHiring', ([modeOfHiring], schema) => {
        return modeOfHiring === 'onsite' || modeOfHiring === 'hybrid'
          ? schema
              .required('Number of persons vising is required')
              .positive('Number of persons vising should be positive')
          : schema
      }),
      jobLocation: Yup.string().required('Job Location is required'),
      tentativeDriveDate: Yup.date().required('Tentative Drive Date is required'),
    }),
    onSubmit: () => {},
  })

  const handlePlacementRadioButton = (value: string) => {
    formik.setFieldValue('isPlacement', value)
  }

  const handleSummerInternRadioButton = (value: string) => {
    formik.setFieldValue('isSummerIntern', value)
  }

  const handleSixMonInternRadioButton = (value: string) => {
    formik.setFieldValue('isSixMonIntern', value)
  }

  const handlePrePlacementTalkRadioButton = (value: string) => {
    formik.setFieldValue('prePlacementTalk', value)
  }

  const handleAptitudeRadioButton = (value: string) => {
    formik.setFieldValue('aptitudeTest', value)
  }

  const handleTechnicalTestRadioButton = (value: string) => {
    formik.setFieldValue('technicalTest', value)
  }

  const handleGroupDiscussionRadioButton = (value: string) => {
    formik.setFieldValue('groupDiscussion', value)
  }

  const handlePersonalInterviewRadioButton = (value: string) => {
    formik.setFieldValue('personalInterview', value)
  }

  const handleSubmit = async (event: any) => {
    event.preventDefault()
    try {
      const res = await formik.validateForm()
      await formik.submitForm()

      if (Object.keys(res).length > 0) return

      onNext(formik.values)
    } catch (err) {
      toast({
        title: 'Something went wrong...',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>Job Notification Form</h2>
        <form className={styles.form}>
          <div className={styles.field}>
            <Input
              name="companyName"
              placeholder="Company Name"
              value={formik.values.companyName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.companyName && formik.errors.companyName ? (
              <Error errorMessage={formik.errors.companyName} />
            ) : null}
          </div>
          <div className={styles.field}>
            <Input
              name="session"
              placeholder="Session"
              value={formik.values.session}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isDisabled
            />
          </div>
          <div className={styles.field}>
            <RadioSelect
              name="isPlacement"
              placeholder="Placement"
              value={formik.values.isPlacement}
              onChange={handlePlacementRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.isPlacement && formik.errors.isPlacement ? (
              <Error errorMessage={formik.errors.isPlacement} />
            ) : null}
          </div>
          <div className={styles.field}>
            <RadioSelect
              name="isSummerIntern"
              placeholder="Summer Intern"
              value={formik.values.isSummerIntern}
              onChange={handleSummerInternRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.isSummerIntern && formik.errors.isSummerIntern ? (
              <Error errorMessage={formik.errors.isSummerIntern} />
            ) : null}
          </div>

          <div className={styles.field}>
            <RadioSelect
              name="isSixMonIntern"
              placeholder="6 Months Intern"
              value={formik.values.isSixMonIntern}
              onChange={handleSixMonInternRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.isSixMonIntern && formik.errors.isSixMonIntern ? (
              <Error errorMessage={formik.errors.isSixMonIntern} />
            ) : null}
          </div>

          <div className={styles.field}>
            <Select
              value={formik.values.modeOfHiring}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              name="modeOfHiring"
              placeholder="Mode of Hiring"
            >
              {modeOfHiringData.map((modeOfHiring) => (
                <option key={modeOfHiring.id} value={modeOfHiring.value}>
                  {modeOfHiring.label}
                </option>
              ))}
            </Select>
            {formik.touched.modeOfHiring && formik.errors.modeOfHiring ? (
              <Error errorMessage={formik.errors.modeOfHiring} />
            ) : null}
          </div>

          <div className={styles.field}>
            <RadioSelect
              name="prePlacementTalk"
              placeholder="Pre Placement Talk"
              value={formik.values.prePlacementTalk}
              onChange={handlePrePlacementTalkRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.prePlacementTalk && formik.errors.prePlacementTalk ? (
              <Error errorMessage={formik.errors.prePlacementTalk} />
            ) : null}
          </div>

          <div className={styles.field}>
            <RadioSelect
              name="aptitudeTest"
              placeholder="Aptitude Test"
              value={formik.values.aptitudeTest}
              onChange={handleAptitudeRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.aptitudeTest && formik.errors.aptitudeTest ? (
              <Error errorMessage={formik.errors.aptitudeTest} />
            ) : null}
          </div>

          <div className={styles.field}>
            <RadioSelect
              name="technicalTest"
              placeholder="Technical Test"
              value={formik.values.technicalTest}
              onChange={handleTechnicalTestRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.technicalTest && formik.errors.technicalTest ? (
              <Error errorMessage={formik.errors.technicalTest} />
            ) : null}
          </div>

          <div className={styles.field}>
            <RadioSelect
              name="groupDiscussion"
              placeholder="Group Disscusion"
              value={formik.values.groupDiscussion}
              onChange={handleGroupDiscussionRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.groupDiscussion && formik.errors.groupDiscussion ? (
              <Error errorMessage={formik.errors.groupDiscussion} />
            ) : null}
          </div>

          <div className={styles.field}>
            <RadioSelect
              name="personalInterview"
              placeholder="Personal Interview"
              value={formik.values.personalInterview}
              onChange={handlePersonalInterviewRadioButton}
              onBlur={formik.handleBlur}
            />
            {formik.touched.personalInterview && formik.errors.personalInterview ? (
              <Error errorMessage={formik.errors.personalInterview} />
            ) : null}
          </div>

          {(formik.values.modeOfHiring === 'onsite' || formik.values.modeOfHiring === 'hybrid') && (
            <div className={styles.field}>
              <Input
                name="noOfPersonVisiting"
                placeholder="Number of persons visiting"
                value={formik.values.noOfPersonVisiting || ''}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.noOfPersonVisiting && formik.errors.noOfPersonVisiting ? (
                <Error errorMessage={formik.errors.noOfPersonVisiting} />
              ) : null}
            </div>
          )}

          <div className={styles.field}>
            <Input
              name="jobLocation"
              placeholder="Job Locations For ex. Delhi,Banglore"
              value={formik.values.jobLocation}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.jobLocation && formik.errors.jobLocation ? (
              <Error errorMessage={formik.errors.jobLocation} />
            ) : null}
          </div>

          <div className={styles.field}>
            <Input
              name="tentativeDriveDate"
              type="date"
              placeholder="Tentative Drive Date"
              value={formik.values.tentativeDriveDate}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.tentativeDriveDate && formik.errors.tentativeDriveDate ? (
              <Error errorMessage={formik.errors.tentativeDriveDate} />
            ) : null}
          </div>
        </form>
      </div>
      <div className={styles.btn_container}>
        <Button variant="solid" className={styles.btn} onClick={handleSubmit}>
          Next
        </Button>
      </div>
    </>
  )
}
