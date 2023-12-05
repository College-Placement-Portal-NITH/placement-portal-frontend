import React, { useEffect } from 'react'
import '../index.scss'
import { set, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { OfferedDrive } from '../../../utils/types'

const offeredDriveData = [
  { id: 0, value: 'Placement', label: 'Placement' },
  { id: 1, value: 'Internship', label: 'Internship' },
  { id: 2, value: 'Both', label: 'Both' },
]

type OrganizationData = {
  companyName: string
  offeredDrive: string
}

const defaultData: OrganizationData = {
  companyName: '',
  offeredDrive: '',
}

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is Required'),
  offeredDrive: Yup.string().required('Job Type is Required'),
})

function App({
  parentState,
  setParentState,
}: {
  parentState: any
  setParentState: React.Dispatch<any>
}) {
  // const form = useForm<any>({
  //   defaultValues: defaultData,
  //   resolver: yupResolver(validationSchema),
  //   mode: 'onBlur',
  // })
  // const { handleSubmit, formState, watch } = form
  // const { errors } = formState
  // const onSubmit = (data: OrganizationData) => {
  //   console.log(data)
  // }

  /// ////
  const [JobType, setJobType] = React.useState('')
  // useEffect(() => {
  //   if (JobType) {
  //     console.log('JobType:', JobType)
  //     if (JobType === 'Placement') {
  //       setOfferedDrive({ offerPlacement: true, offerInternship: false })
  //     } else if (JobType === 'Internship') {
  //       setOfferedDrive({ offerPlacement: false, offerInternship: true })
  //     } else {
  //       setOfferedDrive({ offerPlacement: true, offerInternship: true })
  //     }
  //   }
  // }, [JobType, setOfferedDrive])

  const handleType = (e: any) => {
    setJobType(e.target.value)
  }

  return (
    <div className="root">
      <form noValidate className="form-group">
        <div className="title">
          <h1> Organization details </h1>
        </div>

        <label className="label" htmlFor="session">
          Session
          <input type="text" disabled className="form-control rigid" id="session" value="2023-24" />
        </label>
        <label className="label" htmlFor="companyName">
          Company Name
          <input
            type="text"
            className="form-control"
            id="companyName"
            //     {...form.register('companyName')}
            //   />
            // </label>
            // {errors.companyName && <Error errorMessage={errors.companyName.message as string} />}

            // <label className="label" htmlFor="offeredDrive">
            //   Job Type
            //   <select className="form-control" id="offeredDrive" {...form.register('offeredDrive')}>
            //     onChange={(e) => setParentState({ ...parentState, companyName: e.target.value })}
          />
        </label>

        <label className="label" htmlFor="jobProfile">
          Job Profile
          <input
            type="text"
            className="form-control"
            id="jobProfile"
            onChange={(e) => {
              setParentState({
                ...parentState,
                jobProfileIntern: e.target.value,
                jobProfilePlacement: e.target.value,
              })
            }}
          />
        </label>
        {/*  {errors.companyName && <Error errorMessage={errors.companyName.message as string} />} */}

        <label className="label" htmlFor="offeredDrive">
          Job Type
          <select className="form-control" id="offeredDrive" onChange={handleType}>
            <option value="">Select Job Type</option>
            {offeredDriveData.map((offeredDrive) => (
              <option key={offeredDrive.id} value={offeredDrive.value}>
                {offeredDrive.label}
              </option>
            ))}
          </select>
        </label>
      </form>
    </div>
  )
}

export default App
