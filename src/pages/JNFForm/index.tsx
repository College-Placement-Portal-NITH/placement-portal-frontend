import { useState } from 'react'
import { Text } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import ProgressBar from '../../components/ProgressBar'
import Animation from '../../assets/animations/136670-space.json'
import styles from './JNFForm.module.scss'
import { JNFFormOne, JNFFormTwo, JNFFormThree, JNFFormFour } from '../../components/Forms/JNFForms'
import Loading from '../../assets/animations/81544-rolling-check-mark.json'
import {
  JNFFormOneData,
  JNFFormTwoData,
  JNFFormThreeData,
  JNFFormFourData,
} from '../../utils/types'

export default function JNFForm() {
  const [value, setValue] = useState(0)
  const [step, setStep] = useState(0)
  const [jnfFormOneData, setJNFFormOneData] = useState({
    companyName: '',
    session: '',
    isPlacement: '',
    isIntern: '',
    modeOfHiring: '',
    prePlacementTalk: '',
    aptitudeTest: '',
    technicalTest: '',
    groupDiscussion: '',
    personalInterview: '',
    noOfPersonVisiting: 0,
    jobLocation: '',
    tentativeDriveDate: '',
  })

  const [jnfFormTwoData, setJNFFormTwoData] = useState({
    tentativeStartDate: '',
    jobProfile: '',
    ctc: 0,
    jobDescription: '',
    cgpi: 0,
    eligibleBatches: '',
  })

  const [jnfFormThreeData, setJNFFormThreeData] = useState({
    isPPO: '',
    tentativeStartDate: '',
    jobProfile: '',
    stipend: 0,
    duration: 0,
    ctc: 0,
    jobDescription: '',
    cgpi: 0,
    eligibleBatches: '',
  })

  const [jnfFormFourData, setJNFFormFourData] = useState({
    type: '',
    name: '',
    mobileNumber: 0,
    email: '',
  })

  const [show, setShow] = useState(false)

  const handleOneNext = (values: JNFFormOneData) => {
    setStep((prevStep) => prevStep + 1)
    setValue((prevValue) => prevValue + 25)
    setJNFFormOneData(values)
  }

  const handleTwoNext = (values: JNFFormTwoData) => {
    setStep((prevStep) => prevStep + 1)
    setValue((prevValue) => prevValue + 25)
    setJNFFormTwoData(values)
  }

  const handleThreeNext = (values: JNFFormThreeData) => {
    setStep((prevStep) => prevStep + 1)
    setValue((prevValue) => prevValue + 25)
    setJNFFormThreeData(values)
  }

  const handleFourNext = (values: JNFFormFourData) => {
    setStep((prevStep) => prevStep + 1)
    setValue((prevValue) => prevValue + 25)
    setJNFFormFourData(values)
  }

  const handleTwoBack = (values: JNFFormTwoData) => {
    setStep((prevStep) => prevStep - 1)
    setValue((prevValue) => prevValue - 25)
    setJNFFormTwoData({ ...values })
  }

  const handleThreeBack = (values: JNFFormThreeData) => {
    setStep((prevStep) => prevStep - 1)
    setValue((prevValue) => prevValue - 25)
    setJNFFormThreeData({ ...values })
  }

  const handleFourBack = (values: JNFFormFourData) => {
    setStep((prevStep) => prevStep - 1)
    setValue((prevValue) => prevValue - 25)
    setJNFFormFourData({ ...values })
  }

  const handleSubmit = () => {
    setStep((prevStep) => prevStep + 1)
    setValue((prevValue) => prevValue + 25)
    setShow(true)
  }

  const getFormContent = (currStep: number) => {
    switch (currStep) {
      case 0:
        return <JNFFormOne data={jnfFormOneData} onNext={(values) => handleOneNext(values)} />
      case 1:
        return (
          <JNFFormTwo
            data={jnfFormTwoData}
            onNext={(values) => handleTwoNext(values)}
            onBack={(values) => handleTwoBack(values)}
          />
        )
      case 2:
        return (
          <JNFFormThree
            data={jnfFormThreeData}
            onNext={(values) => handleThreeNext(values)}
            onBack={(values) => handleThreeBack(values)}
          />
        )

      // case 3:
      //   return (
      //     <JNFFormFour
      //       data={jnfFormFourData}
      //       onSubmit={() => handleSubmit()}}
      //       onBack={(values) => handleFourBack(values)}
      //     />
      //   )
      default:
        return null
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <h2 className={styles.heading}>Fill Your Details Here</h2>
        <Lottie animationData={Animation} />
        <ProgressBar step={step} completed={value} />
      </div>
      <div className={styles.content}>
        {show ? (
          <div className={styles.animation_container}>
            <Lottie
              loop={false}
              autoPlay={false}
              animationData={Loading}
              className={styles.animation}
            />
            <Text className={styles.tag_line}>You have successfully submitted your details</Text>{' '}
          </div>
        ) : (
          <>
            <h2 className={styles.heading}>Fill Your Details Here</h2>
            {getFormContent(step)}
          </>
        )}
      </div>
    </div>
  )
}
