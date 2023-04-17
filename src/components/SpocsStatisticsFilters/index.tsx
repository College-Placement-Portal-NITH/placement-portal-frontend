/* eslint-disable react/jsx-no-useless-fragment */
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleRight } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
import { Radio, RadioGroup, Select, Stack } from '@chakra-ui/react'
import Lottie from 'lottie-react'
import CheckListItem from '../CheckListItem'
import { ExperienceFilterProps } from '../../utils/types'
import styles from './SpocsStatisticsFilters.module.scss'
import useSpocsStatisticsFilterOptionsList from '../../hooks/useSpocsStatisticsFilterOptions'
import { branchesAPI } from '../../utils/apis'
import Modal from '../Modal'
import Loader from '../../assets/animations/72411-simple-grey-spinner.json'

function SpocsStatisticsFilters({ isMobile = false }: ExperienceFilterProps) {
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false)
  const [isBranchLoading, setIsBranchLoading] = useState(false)
  const [course, setCourse] = useState({ id: 2, years: 4, name: 'B.Tech' })
  const [selectedBranches, setSelectedBranches] = useState<any>([])
  const [startingYear] = useState(2023)
  const [noOfYears] = useState(10)
  const [jobType, setJobType] = useState('')
  const [selectedYears, setSelectedYears] = useState<string[]>([])
  const navigate = useNavigate()

  const { data, isLoading, isSuccess } = useSpocsStatisticsFilterOptionsList()

  if (isLoading || !isSuccess) {
    return <Lottie animationData={Loader} />
  }

  const openBranchModal = () => {
    setIsBranchModalOpen(true)
  }

  const closeBranchModal = () => {
    setIsBranchModalOpen(false)
  }

  const handleCourseChange = async (e: any) => {
    setIsBranchLoading(true)
    const parsedObj = JSON.parse(e.target.value)
    setCourse(parsedObj)

    const res = await branchesAPI.get(`/${parsedObj.id}`)
    setSelectedBranches([...res.data.branches])
    setIsBranchLoading(false)
  }

  const onBranchToggle = (branch: string) => {
    // If branch alrealy selected, then remove it from selected branches list
    if (selectedBranches.includes(branch)) {
      const branches = [...selectedBranches]
      const branchIndex = selectedBranches.findIndex((branchName: string) => branchName === branch)
      branches.splice(branchIndex, 1)
      setSelectedBranches(branches)
      return
    }

    // Else add branch to selected branches list
    setSelectedBranches([...selectedBranches, branch])
  }

  const onYearToggle = (year: string) => {
    // If year alrealy selected, then remove it from selected years list
    if (selectedYears.includes(year)) {
      const years = [...selectedYears]
      const yearIndex = selectedYears.findIndex((yearName) => yearName === year)
      years.splice(yearIndex, 1)
      setSelectedYears(years)
      return
    }

    // Else add year to selected years list
    setSelectedYears([...selectedYears, year])
  }

  const applyFilters = (event: any) => {
    event.preventDefault()
    const branchesListString = selectedBranches.join(',')

    navigate(`/students/?course=${course.name}&branches=${branchesListString}&jobtype=${jobType}`)
  }

  const clearFilters = (event: any) => {
    event.preventDefault()
    setCourse({ id: 0, years: 0, name: '' })
    setSelectedBranches([])
    setJobType('')
  }

  return (
    <div className={styles.filters}>
      <div className={styles.filter_header}>
        <h2>Filters</h2>
      </div>
      <div className={styles.seperator} />
      <div className={styles.company}>
        <div className={styles.filter_head}>
          <div className={styles.tag}>
            <h4>Course</h4>
          </div>
        </div>
        <Select placeholder="Select Course" onChange={(e) => handleCourseChange(e)} name="course">
          {data &&
            data[0].map((datas: any) => {
              return (
                <option
                  value={`{"id":${datas.id},"years":${datas.years},"name":"${datas.name}"}`}
                  key={datas.id}
                >
                  {datas.name}
                </option>
              )
            })}
        </Select>
      </div>
      <div className={styles.seperator} />
      <div>
        <div className={styles.filter_head}>
          <div className={styles.tag}>
            <h4>Branch</h4>
          </div>
          <div className={styles.modal}>
            <button className={styles.btn} onClick={openBranchModal}>
              View All
              <FontAwesomeIcon icon={faCircleRight} />
            </button>
            {isBranchModalOpen && selectedBranches && (
              <Modal
                title="Branches"
                isOpen={isBranchModalOpen}
                onCloseHandler={closeBranchModal}
                list={selectedBranches}
                onItemClick={onBranchToggle}
                selectedItems={selectedBranches}
              />
            )}
          </div>
        </div>
        <div>
          {isBranchLoading ? (
            <Lottie animationData={Loader} />
          ) : (
            selectedBranches.length !== 0 &&
            selectedBranches?.splice(0, 4).map((datas: any) => {
              return (
                <CheckListItem
                  label={datas.branch_name}
                  key={datas.id}
                  isMobile={isMobile}
                  onClick={onBranchToggle}
                  isChecked={selectedBranches.includes(datas.branch_name)}
                />
              )
            })
          )}
        </div>
      </div>
      <div className={styles.seperator} />
      <div>
        <h4 className={styles.filter_category}>Session</h4>
        <div>
          {Array(noOfYears)
            .fill(true)
            .map((_, index) => {
              return (
                <CheckListItem
                  key={(startingYear - index).toString()}
                  label={startingYear - index}
                  isMobile={isMobile}
                  onClick={onYearToggle}
                  isChecked={selectedYears.includes((startingYear - index).toString())}
                />
              )
            })}
        </div>
      </div>
      <div className={styles.seperator} />
      <div>
        <h4 className={styles.filter_category}>Type</h4>
        <div>
          <RadioGroup onChange={setJobType} value={jobType}>
            <Stack direction="column">
              <Radio value="Internship">Internship</Radio>
              <Radio value="Placement">Placement</Radio>
              <Radio value="">All</Radio>
            </Stack>
          </RadioGroup>
        </div>
      </div>
      <div className={styles.seperator} />
      <div className={styles.btn_container}>
        <button className={styles.apply} onClick={clearFilters}>
          Clear
        </button>
        <button className={styles.apply} onClick={applyFilters}>
          Apply
        </button>
      </div>
    </div>
  )
}

export default SpocsStatisticsFilters
