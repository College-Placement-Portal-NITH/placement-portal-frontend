import { useEffect, useState } from 'react'
import StepperComponent from '../../components/JNFcomponents/stepper/index'

function JNFForm() {
  const [currStep, setCurrStep] = useState(0)

  return <StepperComponent setCurrStep={setCurrStep} currStep={currStep} />
}

export default JNFForm
