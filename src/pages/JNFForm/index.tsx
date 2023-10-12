import { useEffect, useState } from 'react'
import StepperComponent from '../../components/JNFcomponents/stepper/index'
import { OfferedDrive, Steps } from '../../utils/types'

function JNFForm() {
  const [currStep, setCurrStep] = useState(0)
  const [offeredDrive, setOfferedDrive] = useState<OfferedDrive>({
    offerPlacement: true,
    offerInternship: false,
  })

  const [steps, setSteps] = useState<Steps[]>([
    { label: 'Company details', id: 1, isValid: true },
    { label: 'Eligible batches', id: 2, isValid: true },
    { label: 'Placements', id: 3, isValid: offeredDrive.offerPlacement },
    { label: 'Internships', id: 4, isValid: offeredDrive.offerInternship },
    { label: 'HR details', id: 5, isValid: true },
  ])

  useEffect(() => {
    setSteps([
      { label: 'Company details', id: 1, isValid: true },
      { label: 'Eligible batches', id: 2, isValid: true },
      { label: 'Placements', id: 3, isValid: offeredDrive.offerPlacement },
      { label: 'Internships', id: 4, isValid: offeredDrive.offerInternship },
      { label: 'HR details', id: 5, isValid: true },
    ])
  }, [offeredDrive])

  return (
    <StepperComponent
      setCurrStep={setCurrStep}
      currStep={currStep}
      offeredDrive={offeredDrive}
      setOfferedDrive={setOfferedDrive}
      steps={steps}
    />
  )
}

export default JNFForm
