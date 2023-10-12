import { Button, Checkbox, Thead, Table, Th, Tr, Td, Tbody } from '@chakra-ui/react'
import { useFormik } from 'formik'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { JNFFormFiveProps, HR } from '../../../utils/types'
import styles from './HRForm.module.scss'
import Input from '../../Input'
import Select from '../../Select'
import Error from '../../Error'
import { jobType } from '../../../utils/Data/statisticsData'

const hrTypes = [
  { id: 0, value: 'primary' },
  { id: 1, value: 'secondary' },
]

export default function HRForm({
  parentState,
  setParentState,
}: {
  parentState: any
  setParentState: React.Dispatch<any>
}) {
  const navigate = useNavigate()
  const formik = useFormik({
    initialValues: {
      type: '',
      name: '',
      mobileNumber: undefined,
      email: '',
    },
    validationSchema: Yup.object().shape({
      type: Yup.string().required('Type is required'),
      name: Yup.string().required('Full Name is required'),
      mobileNumber: Yup.string()
        .matches(/^(\+91)?[6-9]\d{9}$/, 'Invalid Phone Number')
        .required('Phone number is required.'),
      email: Yup.string().email('Enter a valid email').required('Personal Email is required.'),
    }),
    onSubmit: () => {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      console.log('submit hr')
    },
  })

  const handleSubmit = async () => {
    const cData = {
      name: parentState.companyName,
    }
    await fetch(`http://127.0.0.1:8000/companies/`, {
      method: 'POST',
      body: JSON.stringify(cData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        const fData = {
          company: data.name,
          courses: ['B.Tech'],
          branches: ['cse'],
          modeOfHiring: parentState.modeOfHiring,
          prePlacementTalk: parentState.prePlacementTalk,
          aptitudeTest: parentState.aptitudeTest,
          technicalTest: parentState.technicalTest,
          groupDiscussion: parentState.groupDiscussion,
          personalInterview: parentState.personalInterview,
          noOfPersonVisiting: parentState.noOfPersonVisiting,
          jobLocation: parentState.jobLocation,
          starting_date: parentState.tentativeDriveDate,
          cgpi: 7,
          allowStudents: true,
          jobProfile: parentState.jobProfile,
          drive_status: 'Pending',
          created_at: Date.now(),
          updated_at: Date.now(),
          ctc: parentState.placementPackage,
          session: '2023-24',
          job_type: 'placement',
          closed_date: null,
        }
        await fetch(`http://localhost:8000/drives/`, {
          method: 'POST',
          body: JSON.stringify(fData),
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((res) => res.json())
          .then(() => {
            navigate('/home')
          })
      })
  }

  return (
    <div className={styles.HRForm}>
      <div className={styles.container}>
        <form className={styles.form}>
          <h2 className={styles.title}>HR Details</h2>
          <div className={styles.field} />
          <div className={styles.field}>
            <input
              placeholder="Name"
              onChange={(e) => {
                setParentState({
                  ...parentState,
                  HrName: e.target.value,
                })
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className={styles.field}>
            <input
              type="number"
              placeholder="Mobile Number"
              onChange={(e) => {
                setParentState({
                  ...parentState,
                  HrMobile: e.target.value,
                })
              }}
              onBlur={formik.handleBlur}
            />
          </div>
          <div className={styles.field}>
            <input
              placeholder="Email"
              onChange={(e) => {
                setParentState({
                  ...parentState,
                  HrEmail: e.target.value,
                })
              }}
              onBlur={formik.handleBlur}
            />
          </div>
        </form>
        <div className={styles.checkbox}>
          <Checkbox name="consent" onChange={formik.handleChange}>
            I provide my consent to share my data with TPO for future oppurtunites. I also confirm
            that the information entered by me is accurate and best of my knowledge.
          </Checkbox>
        </div>

        <button type="button" className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}
