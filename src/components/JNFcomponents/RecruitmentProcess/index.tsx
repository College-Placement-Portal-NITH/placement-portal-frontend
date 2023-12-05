import * as Yup from 'yup'
import react, { useState } from 'react'
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

function Placement({
  parentState,
  handleParentStateChange,
}: {
  parentState: any
  handleParentStateChange: React.Dispatch<any>
}) {
  const form = useForm<any>({
    defaultValues: defaultData,
    resolver: yupResolver(validationSchema),
    mode: 'onBlur',
  })

  const [otherProcess, setOtherProcess] = useState<boolean>(false)

  return (
    <div className="root">
      <form noValidate className="form-group">
        <div className="title">
          <h1> Recruitment/Internship Drive Form</h1>
        </div>

        {/* {errors.companyName && <Error errorMessage={errors.companyName.message as string} />} */}

        <label className="label" htmlFor="modeOfHiring">
          Mode of Hiring
          <select
            className="form-control"
            id="modeOfHiring"
            onChange={(e) =>
              handleParentStateChange({
                ...parentState,
                modeOfHiring: e.target.value,
              })
            }
          >
            <option value="">Select Mode of Hiring</option>
            {modeOfHiringData.map((modeOfHiring) => (
              <option key={modeOfHiring.id} value={modeOfHiring.value}>
                {modeOfHiring.label}
              </option>
            ))}
          </select>
        </label>
        {(parentState.modeOfHiring === 'hybrid' || parentState.modeOfHiring === 'onsite') && (
          <label className="label" htmlFor="noOfPersonVisiting">
            Number of persons visiting
            <input
              type="number"
              className="form-control"
              id="noOfPersonVisiting"
              onChange={(e) =>
                handleParentStateChange({
                  ...parentState,
                  noOfPersonVisiting: e.target.value,
                })
              }
            />
          </label>
        )}

        {/** */}
        <div id="Recruitment process">
          <h2 className="label">Recruitment Process</h2>
          <div className="disect">
            <div className="Recruitment-process">
              <div className="Recruitment-process-item">
                <label className="label flex1" htmlFor="prePlacementTalk">
                  <div className="Recruitment-process-item-heading">Pre-Placement Talk</div>
                  <div>
                    <input
                      type="checkbox"
                      value="Yes"
                      id="prePlacementTalk"
                      onChange={() => {
                        handleParentStateChange({
                          ...parentState,
                          prePlacementTalk: !parentState.prePlacementTalk,
                        })
                      }}
                    />

                    {/**/}
                  </div>
                </label>

                <label className="label flex1" htmlFor="aptitude">
                  <div className="Recruitment-process-item-heading">Aptitude test</div>
                  <div>
                    <input
                      type="checkbox"
                      value="Yes"
                      id="aptitude"
                      onChange={() => {
                        handleParentStateChange({
                          ...parentState,
                          aptitudeTest: !parentState.aptitudeTest,
                        })
                      }}
                    />

                    {/**/}
                  </div>
                </label>

                <label className="label flex1" htmlFor="technical-test">
                  <div className="Recruitment-process-item-heading">Technical test</div>
                  <div>
                    <input
                      type="checkbox"
                      value="Yes"
                      id="technical-test"
                      onChange={() => {
                        handleParentStateChange({
                          ...parentState,
                          technicalTest: !parentState.technicalTest,
                        })
                      }}
                    />

                    {/**/}
                  </div>
                </label>

                <label className="label flex1" htmlFor="groupDiscussion">
                  <div className="Recruitment-process-item-heading">Group Discussion</div>
                  <div>
                    <input
                      type="checkbox"
                      value="Yes"
                      id="groupDiscussion"
                      onChange={() => {
                        handleParentStateChange({
                          ...parentState,
                          groupDiscussion: !parentState.groupDiscussion,
                        })
                      }}
                    />

                    {/**/}
                  </div>
                </label>

                <label className="label flex1" htmlFor="personalInterview">
                  <div className="Recruitment-process-item-heading">Personal Interview</div>
                  <div>
                    <input
                      type="checkbox"
                      value="Yes"
                      id="personalInterview"
                      onChange={() => {
                        handleParentStateChange({
                          ...parentState,
                          personalInterview: true,
                        })
                      }}
                    />

                    {/**/}
                  </div>
                </label>

                <label className="label flex1" htmlFor="other">
                  <div className="Recruitment-process-item-heading">Any other</div>
                  <div id="personalInterview">
                    <input
                      type="checkbox"
                      value="Yes"
                      id="other"
                      onChange={() => {
                        handleParentStateChange({
                          ...parentState,
                          personalInterview: true,
                        })
                        setOtherProcess(!otherProcess)
                      }}
                    />

                    {/**/}
                  </div>
                </label>
              </div>
            </div>

            <div>
              <div className="label">Expected Date of Drive</div>
              <div className="date-container">
                <label className="label size-reduce" htmlFor="fromDriveDate">
                  <p className="small-text">From</p>
                  <input
                    type="date"
                    className="form-control"
                    id="fromDriveDate"
                    placeholder="from"
                    onChange={(e) => {
                      handleParentStateChange({
                        ...parentState,
                        fromDriveDate: e.target.value,
                      })
                    }}
                  />
                </label>
                <label className="label size-reduce" htmlFor="toDriveDate">
                  <p className="small-text">To</p>
                  <input
                    type="date"
                    className="form-control"
                    id="toDriveDate"
                    onChange={(e) => {
                      handleParentStateChange({
                        ...parentState,
                        toDriveDate: e.target.value,
                      })
                    }}
                  />
                </label>
              </div>
              <label className="label " htmlFor="jobLocation">
                Tentative Job Location
                <input
                  type="text"
                  className="form-control"
                  id="jobLocation"
                  onChange={(e) => {
                    handleParentStateChange({
                      ...parentState,
                      jobLocation: e.target.value,
                    })
                  }}
                />
              </label>
              {/* {errors.jobLocation && <Error errorMessage={errors.jobLocation.message as string} />} */}
            </div>
          </div>
        </div>
        {otherProcess && (
          <label className="label" htmlFor="other">
            <input
              type="text"
              className="form-control"
              id="other"
              onChange={() => null}
              placeholder="write other procedures..."
            />
          </label>
        )}
        <div className="disect">
          <label className="label flex" htmlFor="placementPackage">
            <p>
              Package/CTC Offered <span className="bracket">(in LPA)</span>
            </p>
            <input
              type="text"
              className="form-control"
              id="placementPackage"
              onChange={(e) => {
                handleParentStateChange({
                  ...parentState,
                  placementPackage: e.target.value,
                })
              }}
            />
          </label>
          <label className="label flex" htmlFor="internstipend">
            <p>
              Stipend Offered <span className="bracket">(per month)</span>
            </p>
            <input
              type="text"
              className="form-control"
              id="internstipend"
              onChange={(e) => {
                handleParentStateChange({
                  ...parentState,
                  internstipend: e.target.value,
                })
              }}
            />
          </label>
        </div>
      </form>
    </div>
  )
}

export default Placement
