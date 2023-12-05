// import { Button, Checkbox, Thead, Table, Th, Tr, Td, Tbody } from '@chakra-ui/react'
import { useFormik } from 'formik'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import * as Yup from 'yup'
import { useState } from 'react'
// import { JNFFormFiveProps, HR } from '../../../utils/types'
import { background } from '@chakra-ui/react'
import styles from './HRForm.module.scss'
import Input from '../../Input'
import ContactPage from '../Contact'
// import Select from '../../Select'
// import Error from '../../Error'
// import { jobType } from '../../../utils/Data/statisticsData'

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
  // const [hrList, setHRList] = useState<Array<HR>>({})

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
      // addHR()
    },
  })

  const handleSubmit = async () => {
    const cData = {
      name: parentState.companyName,
    }
    await fetch(`http://localhost:8000/companies/`, {
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
          drive_status: 'Upcoming',
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
          .then()
      })
  }

  const [checked, setChecked] = useState(false)

  const handleCheckboxChange = () => {
    setChecked(!checked)
  }

  return (
    <div className={styles.grid_1_2}>
      <ContactPage />
      <div className={styles.HRForm}>
        <div className={styles.container}>
          <form className={styles.form}>
            <h2 className={styles.title}>HR Details</h2>
            <div className={styles.field} />
            <div className={styles.field}>
              <Input
                type="text"
                name="name"
                placeholder="Name"
                isDisabled={false}
                onChange={(e) => {
                  setParentState({
                    ...parentState,
                    HrName: e.target.value,
                  })
                }}
                value={parentState.HrName}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className={styles.field}>
              <Input
                type="number"
                name="mobileNumber"
                isDisabled={false}
                value={parentState.HrMobile}
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
              <Input
                placeholder="Email"
                type="email"
                name="email"
                isDisabled={false}
                value={parentState.HrEmail}
                onChange={(e) => {
                  setParentState({
                    ...parentState,
                    HrEmail: e.target.value,
                  })
                }}
                onBlur={formik.handleBlur}
              />
            </div>
            <div className={styles.consent_container}>
              <label className={styles.consent_label} htmlFor="consent-checkbox">
                <input
                  type="checkbox"
                  id="consent-checkbox"
                  className={styles.consent_checkbox}
                  checked={checked}
                  onChange={handleCheckboxChange}
                />
                I agree to share my data to training and Placement Office NIT Hamirpur.I also agree
                that information shared by me is accurate and best of my Knowledge
              </label>

              <button type="button" className={styles.btn} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
