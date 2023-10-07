import * as Yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Error } from '../../index'
import '../index.scss'
// import {R} from react;

const modeOfHiringData = [
  { id: 0, value: 'virtual', label: 'Virtual' },
  { id: 1, value: 'onsite', label: 'On-Site' },
  { id: 2, value: 'hybrid', label: 'Hybrid' },
]

// const Joboffer = [
//   { id: 0, value: 'Placement', label: 'Placement' },
//   { id: 1, value: 'Internship', label: 'Internship' },
//   { id: 2, value: 'Both', label: 'Both' },
// ]

type RecruitmentData = {
  companyName: string
  session: string
  isPlacement: boolean
  isIntern: boolean
  // isSixMonIntern: string
  JobDescription: string
  modeOfHiring: string
  prePlacementTalk: string
  aptitudeTest: string
  technicalTest: string
  groupDiscussion: string
  personalInterview: string
  noOfPersonVisiting: number | undefined
  jobLocation: string
  tentativeDriveDate: Date | undefined
  Package_Offer: string
  Cuttoff: number
}

const defaultData: RecruitmentData = {
  companyName: '',
  session: '2024-25',
  isPlacement: true,
  isIntern: false,
  JobDescription: '',
  modeOfHiring: '',
  prePlacementTalk: '',
  aptitudeTest: '',
  technicalTest: '',
  groupDiscussion: '',
  personalInterview: '',
  noOfPersonVisiting: undefined,
  jobLocation: '',
  tentativeDriveDate: undefined,
  Package_Offer: '',
  Cuttoff: 0.0,
}

const validationSchema = Yup.object().shape({
  companyName: Yup.string().required('Company Name is Required'),
  session: Yup.string().required('Session is required'),
  isPlacement: Yup.boolean(),
  isIntern: Yup.boolean(),
  JobDescription: Yup.string().required('Job Description is required'),
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
  tentativeDriveDate: Yup.date()
    .typeError('Tentative Drive Date is required')
    .required('Tentative Drive Date is required')
    .min(new Date(), 'Tentative Drive Date should be later than today'),
  Package_Offer: Yup.string().required('Package_Offer is required'),
  Cuttoff: Yup.number()
    .required('Cuttoff is required')
    .min(0.0, 'Cuttoff should be greater than 0.0')
    .max(10.0, 'Cuttoff should be less than 10.0'),
})

function Placement() {
  const form = useForm<any>({
    defaultValues: defaultData,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  })

  const { handleSubmit, formState, watch } = form
  const mode = watch('modeOfHiring', '')

  // const isIntern = form.watch('isIntern')
  const { errors } = formState

  const onSubmit = (data: RecruitmentData) => {
    console.log(data)
  }

  return (
    <div className="root">
      <form onSubmit={handleSubmit((d) => onSubmit(d))} noValidate className="form-group">
        <div className="title">
          <h1> Placement Detail Form</h1>
        </div>

        <label className="label" htmlFor="companyName">
          Company Name
          <input
            type="text"
            className="form-control"
            id="companyName"
            {...form.register('companyName')}
          />
        </label>
        {errors.companyName && <Error errorMessage={errors.companyName.message as string} />}

        <label className="label rigid" htmlFor="session">
          Session
          <input
            type="text"
            className="form-control rigid"
            id="session"
            {...form.register('session', { disabled: true })}
          />
        </label>

        <label className="label" htmlFor="modeOfHiring">
          Mode of Hiring
          <select className="form-control" id="modeOfHiring" {...form.register('modeOfHiring')}>
            <option value="">Select Mode of Hiring</option>
            {modeOfHiringData.map((modeOfHiring) => (
              <option key={modeOfHiring.id} value={modeOfHiring.value}>
                {modeOfHiring.label}
              </option>
            ))}
          </select>
        </label>
        {(mode === 'hybrid' || mode === 'onsite') && (
          <label className="label" htmlFor="noOfPersonVisiting">
            Number of persons visiting
            <input
              type="number"
              className="form-control"
              id="noOfPersonVisiting"
              {...form.register('noOfPersonVisiting', {
                valueAsNumber: true,
              })}
            />
          </label>
        )}

        {/** */}

        <div id="Recruitment process">
          <h2 className="label">Recruitment Process</h2>
          <div className="Recruitment-process">
            <div className="Recruitment-process-item">
              <label className="label flex" htmlFor="prePlacementTalk">
                <div className="Recruitment-process-item-heading">Pre-Placement Talk</div>
                <div id="prePlacementTalk">
                  <label htmlFor="ppt-1">
                    <input
                      type="checkbox"
                      value="Yes"
                      id="ppt-1"
                      {...form.register('prePlacementTalk')}
                    />
                  </label>

                  {/**/}
                </div>
              </label>

              <label className="label flex" htmlFor="aptitude">
                <div className="Recruitment-process-item-heading">Aptitude test</div>
                <div id="aptitude">
                  <label htmlFor="ap1">
                    <input
                      type="checkbox"
                      value="Yes"
                      id="ap1"
                      {...form.register('aptitudeTest')}
                    />
                  </label>

                  {/**/}
                </div>
              </label>

              <label className="label flex" htmlFor="technical-test">
                <div className="Recruitment-process-item-heading">Technical test</div>

                <div id="technical-test">
                  <label htmlFor="tt1">
                    <input
                      type="checkbox"
                      value="Yes"
                      id="tt1"
                      {...form.register('technicalTest')}
                    />
                  </label>

                  {/**/}
                </div>
              </label>

              <label className="label flex" htmlFor="groupDiscussion">
                <div className="Recruitment-process-item-heading">Group Discussion</div>
                <div id="groupDiscussion">
                  <label htmlFor="gd1">
                    <input
                      type="checkbox"
                      value="Yes"
                      id="gd1"
                      {...form.register('groupDiscussion')}
                    />
                  </label>

                  {/**/}
                </div>
              </label>

              <label className="label flex" htmlFor="personalInterview">
                <div className="Recruitment-process-item-heading">Personal Interview</div>
                <div id="personalInterview">
                  <label htmlFor="pi1">
                    <input
                      type="checkbox"
                      value="Yes"
                      id="pi1"
                      {...form.register('personalInterview')}
                    />
                  </label>

                  {/**/}
                </div>
              </label>
            </div>
          </div>
        </div>
        <label className="label" htmlFor="Package_Offer">
          Package Offered
          <input
            type="text"
            className="form-control"
            id="Package_Offer"
            {...form.register('Package_Offer')}
          />
        </label>
        {errors.Package_Offer && <Error errorMessage={errors.Package_Offer.message as string} />}

        {errors.noOfPersonVisiting && (
          <Error errorMessage={errors.noOfPersonVisiting.message as string} />
        )}

        <label className="label" htmlFor="jobLocation">
          Job Location
          <input
            type="text"
            className="form-control"
            id="jobLocation"
            {...form.register('jobLocation')}
          />
        </label>
        {errors.jobLocation && <Error errorMessage={errors.jobLocation.message as string} />}

        <label className="label" htmlFor="tentativeDriveDate">
          Tentative Drive Date
          <input
            type="date"
            className="form-control"
            id="tentativeDriveDate"
            {...form.register('tentativeDriveDate', {
              valueAsDate: true,
            })}
          />
        </label>
        {errors.tentativeDriveDate && (
          <Error errorMessage={errors.tentativeDriveDate.message as string} />
        )}
      </form>
    </div>
  )
}

export default Placement
