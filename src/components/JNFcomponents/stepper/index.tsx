import './index.scss'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { useState } from 'react'
import { Internship, Placement } from '../RecruitmentProcess/index'
import EligibleBatches from '../EligibleBatches'
import JnfHome from '../OrgansationDetails'
import { getCurrentSession } from '../../../utils/functions'
import NavbarJNF from '../Navbar_JNF'
import HRForm from '../HRForm'
// import { HR } from '../../../utils/types'

// type Steps = {
//   label: string
//   id: number
// }
import { HR, Steps, OfferedDrive } from '../../../utils/types'

export default function StepperComponent({
  // activeStep,
  setCurrStep,
  currStep,
  offeredDrive,
  setOfferedDrive,
  steps,
}: {
  // activeStep: number
  setCurrStep: (number: number) => void
  currStep: number
  offeredDrive: OfferedDrive
  setOfferedDrive: (offeredDrive: OfferedDrive) => void
  steps: Steps[]
}) {
  // const steps: Steps[] = [
  //   { label: 'Company details', id: 1 },
  //   { label: 'Streams offered', id: 2 },
  //   { label: 'Placements', id: 3 },
  //   { label: 'Internships', id: 4 },
  //   { label: 'HR Form', id: 5 },
  // ]

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
    tentativeDriveDate: '',
    tentativeInternDate: '',
    jobProfile: '',
    eligibe_branches: [],
    HrName: '',
    HrEmail: '',
    HrMobile: '',
  })
  console.log(Ddata)
  const getFormContent = () => {
    // switch (activeStep) {
    switch (currStep) {
      case 0:
        return (
          <JnfHome
            setOfferedDrive={setOfferedDrive}
            parentState={Ddata}
            setParentState={setDdata}
          />
        )
      case 1:
        return <EligibleBatches parentState={Ddata} setParentState={setDdata} />
      case 2:
        return <Placement parentState={Ddata} handleParentStateChange={setDdata} />
      case 3:
        return <Internship parentState={Ddata} setParentState={setDdata} />
      case 4:
        return <HRForm parentState={Ddata} setParentState={setDdata} />
      default:
        return null
    }
  }

  function Next() {
    // if (activeStep === steps.length - 1) {
    if (currStep === steps.length - 1) {
      return null
    }
    // setCurrStep(activeStep + 1)
    // return activeStep
    if (steps[currStep + 1].isValid === false) {
      setCurrStep(currStep + 2)
    } else {
      setCurrStep(currStep + 1)
    }
  }

  function Back() {
    // if (activeStep === 0) {
    if (currStep === 0) {
      return null
    }
    // setCurrStep(activeStep - 1)
    // return activeStep
    if (steps[currStep - 1].isValid === false) {
      setCurrStep(currStep - 2)
    } else setCurrStep(currStep - 1)
  }

  return (
    <>
      <NavbarJNF />
      <Stepper activeStep={currStep} alternativeLabel>
        {steps.map(
          (step) =>
            step.isValid && (
              <Step key={step.id}>
                <StepLabel>{step.label}</StepLabel>
              </Step>
            ),
        )}
      </Stepper>
      <div className="">
        <div>{getFormContent()}</div>
        <div className="stepper-footer">
          <div className="button-wrap">
            <button type="button" disabled={currStep === 0} className="btn" onClick={() => Back()}>
              Back
            </button>
            <button className="btn" onClick={() => Next()}>
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
