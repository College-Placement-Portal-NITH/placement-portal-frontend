import './index.scss'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { useState } from 'react'
import Placement from '../RecruitmentProcess/index'
import EligibleBatches from '../EligibleBatches'
import JnfHome from '../OrgansationDetails'
import { getCurrentSession } from '../../../utils/functions'
import NavbarJNF from '../Navbar_JNF'
import HRForm from '../HRForm'
import { HR, Steps, OfferedDrive } from '../../../utils/types'

export default function StepperComponent({
  setCurrStep,
  currStep,
}: {
  // activeStep: number
  setCurrStep: (number: number) => void
  currStep: number
}) {
  const steps: Steps[] = [
    { label: 'Organisation details', id: 1 },
    { label: 'Eligible Branches', id: 2 },
    { label: 'Recruitment', id: 3 },
    { label: 'HR Form', id: 5 },
  ]

  const [Ddata, setDdata] = useState<any>({
    companyName: '',
    session: getCurrentSession(),
    isPlacement: '',
    isIntern: '',
    modeOfHiring: '',
    placementPackage: 0,
    internstipend: 0,
    internProfile: '',
    prePlacementTalk: false,
    aptitudeTest: false,
    technicalTest: false,
    groupDiscussion: false,
    personalInterview: false,
    noOfPersonVisiting: 0,
    jobLocation: '',
    internJobLocation: '',
    fromDriveDate: '',
    toDriveDate: '',
    tentativeInternDate: '',
    jobProfilePlacement: '',
    jobProfileIntern: '',
    eligibe_branches: [],
    HrName: '',
    HrEmail: '',
    HrMobile: '',
  })
  console.log(Ddata)
  const getFormContent = () => {
    switch (currStep) {
      case 0:
        return <JnfHome parentState={Ddata} setParentState={setDdata} />
      case 1:
        return <EligibleBatches parentState={Ddata} handleParentStateChange={setDdata} />
      case 2:
        return <Placement parentState={Ddata} handleParentStateChange={setDdata} />
      case 3:
        return <HRForm parentState={Ddata} setParentState={setDdata} />
      default:
        return null
    }
  }

  function Next() {
    if (currStep === steps.length - 1) {
      return null
    }
    setCurrStep(currStep + 1)
  }
  function Back() {
    if (currStep === 0) {
      return null
    }
    setCurrStep(currStep - 1)
  }

  return (
    <>
      <NavbarJNF Title="Job Notification Form/Internship Form" />
      <Stepper activeStep={currStep} alternativeLabel nonLinear>
        {steps.map((step) => (
          <Step key={step.id}>
            <StepLabel>{step.label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className="">
        <div>{getFormContent()}</div>
        <div className="stepper-footer">
          <div className="button-wrap">
            <button type="button" disabled={currStep === 0} className="btn-stepper" onClick={Back}>
              Back
            </button>
            {currStep !== steps.length - 1 && (
              <button
                className="btn-stepper"
                onClick={Next}
                disabled={currStep === steps.length - 1}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
