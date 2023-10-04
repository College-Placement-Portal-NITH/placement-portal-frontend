import './index.scss'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import { useState } from 'react'
import { Internship, Placement } from '../RecruitmentProcess/index'
import JnfHome from '../First'
import EligibleBatches from '../EligibleBatches'
import NavbarJNF from '../Navbar_JNF'
import HRForm from '../HRForm'
import { HR } from '../../../utils/types'

type Steps = {
  label: string
  id: number
}

export default function StepperComponent({
  activeStep,
  setCurrStep,
}: {
  activeStep: number
  setCurrStep: (number: number) => void
}) {
  const steps: Steps[] = [
    { label: 'Company details', id: 1 },
    { label: 'Streams offered', id: 2 },
    { label: 'Placements', id: 3 },
    { label: 'Internships', id: 4 },
    { label: 'HR Form', id: 5 },
  ]
  const [hrList, setHrList] = useState<Array<HR>>([])
  const handleSubmit = () => {}
  const handleFiveBack = () => {}
  const getFormContent = () => {
    switch (activeStep) {
      case 0:
        return <JnfHome />
      case 1:
        return <EligibleBatches />
      case 2:
        return <Placement />
      case 3:
        return <Internship />
      case 4:
        return <HRForm data={hrList} onSubmit={handleSubmit} onBack={handleFiveBack} />
      default:
        return null
    }
  }

  function Next() {
    if (activeStep === steps.length - 1) {
      return null
    }
    setCurrStep(activeStep + 1)
    return activeStep
  }
  function Back() {
    if (activeStep === 0) {
      return null
    }
    setCurrStep(activeStep - 1)
    return activeStep
  }

  return (
    <>
      <NavbarJNF />
      <Stepper activeStep={activeStep} alternativeLabel>
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
            <button
              type="button"
              disabled={activeStep === 0}
              className="btn"
              onClick={() => Back()}
            >
              Back
            </button>
            <button className="btn" onClick={() => Next()}>
              {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
