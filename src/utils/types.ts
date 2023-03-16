import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { ChangeEvent, MouseEventHandler, ReactNode } from 'react'

export type RouteProps = {
  id: number
  name: string
  url: string
}

export interface SidebarLayoutProps {
  children: ReactNode
}

export type DropdownProps = {
  placeHolder: string
}

export interface FieldInfoProps {
  label: string
  value: string | number
}

export type ButtonProps = {
  onclick?: MouseEventHandler<HTMLButtonElement>
  onsubmit?: React.FormEventHandler<HTMLButtonElement> | undefined
  children: ReactNode
  stretch?: boolean
  type?: 'button' | 'reset' | 'submit'
}

export interface ClusterCardProps {
  title: string
  range: string
}

export interface ResourcesCardProps {
  id: number
  label: string
  imgUrl: string
}

export interface ExperienceCardProps {
  id: number
  title: string
  description: string
  imgUrl?: string
  jobType: string
  selStatus: string
  userName: string
  difficulty: string
  role: string
  postedOn: number
}

export type InputProps = {
  name: string
  placeholder: string
  value: string | number | undefined
  onChange: (e: ChangeEvent<any>) => void
  onBlur: (e: ChangeEvent<any>) => void
  type?: 'text' | 'password' | 'date' | 'file'
}

export interface SelectProps {
  name?: string
  placeholder?: string
  value?: string | number | undefined
  onChange?: (e: ChangeEvent<any>) => void
  onBlur?: (e: ChangeEvent<any>) => void
  children?: any
}

export interface ClusterListProps {
  clusterName: string
  clusterRange: string
}
export interface CheckListItemProps {
  label: string | number
  isMobile?: boolean
}

export interface ModalProps {
  isOpen: boolean
  title: string
  onCloseHandler: () => void
}

export interface ExperiencesSidebarProps {
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ExperienceFilterProps {
  isMobile?: boolean
}

export interface CompanyListProps {
  id: number
  name: string
}

export interface RoleListProps {
  id: number
  name: string
}

export interface Post {
  id: number
  title: string
  description: string
  imageUrl: string
  postedOn: string | undefined
}

export interface Drive {
  companyName: string
  id: number
  date: string
  link: string
}

export interface PastExperienceSummary {
  studentName: string
  id: number
  date: string
  link: string
}

interface EligibleBatchesObj {
  branch_name: string
  course: string
  id: number
}
export interface DrivesCardProps {
  id: number
  companyName: string
  imgUrl: string
  ctcOffered: number
  startingDate: string
  modeOfHiring: string
  isAptitudeTest: boolean
  isPpt: boolean
  jobLocation: string
  type: string
  eligibleBatches: Array<EligibleBatchesObj>
  jobProfile: string
  cluster: number
}

export interface ClusterType {
  id: number
  label: string
}

export interface SidebarProps {
  onLinkClickHandler: () => void
}

export interface FaqProps {
  id: number
  title: string
  description: string
}

export type FormOneData = {
  firstName: string
  middleName: string
  lastName: string
  dob: string
  state: string
  city: string
  pincode: number | undefined
  personalEmail: string
  gender: string
  category: string
  phone: string
  linkedin: string
  isPwd: boolean
  disabilityTypes: string
}

export interface FormTwoData {
  tenthYear: number | undefined
  tenthSchool: string
  tenthBoard: string
  tenthPercentage: number | undefined
  twelfthYear: number | undefined
  twelfthSchool: string
  twelfthBoard: string
  twelfthPercentage: number | undefined
  jeeRank: number | undefined
}

export interface FormThreeData {
  course: string
  branch: string
  cgpi: number | undefined
  activeBacklog: number | undefined
  totalBacklog: number | undefined
  gateScore: number | undefined
  catScore: number | undefined
  batchYear: number | undefined
  passingYear: number | undefined
  currentYear: number | undefined
  gapYear12: number | undefined
  gapYearUG: number | undefined
}

export interface FormOneProps {
  onNext: (values: FormOneData) => void
  data: FormOneData
}

export interface FormTwoProps {
  onNext: (values: FormTwoData) => void
  onBack: (values: FormTwoData) => void
  data: FormTwoData
}

export interface FormThreeProps {
  onNext: (values: FormThreeData) => void
  onBack: (values: FormThreeData) => void
  data: FormThreeData
}

export interface FormFourProps {
  onSubmit: () => void
}

export interface ProgressBarProps {
  completed: number
  step: number
}

export interface HeaderLayoutProps {
  children: ReactNode
}

export interface StatsCardProps {
  icon: IconProp
  bgColor: string
  value: number
  label: string
  color: string
  iconColor: string
}

export interface StatsNumberProps {
  n: number
}

type DataType = {
  max_stipend: any
  min_stipend: any
  avg_stipend: any
  offers: any
}

export interface PieChartProps {
  data: Array<DataType>
}

export interface PaginatorProps {
  curr: number
  max: number
  onNext: MouseEventHandler<HTMLButtonElement>
  onPrev: MouseEventHandler<HTMLButtonElement>
  disablePrev: boolean
  disableNext: boolean
}

export interface StatisticsDetailsProps {
  id: number
  company: string
  totalOffers: number
  courses: Array<StatisticsDetailsCourseProps>
}

export interface StatisticsDetailsCourseProps {
  id: number
  courseName: string
  totalCourseOffers?: number
  roles: Array<StatisticsDetailsRoleProps>
  branches: Array<StatisticsDetailsBranchesProps>
}

export interface StatisticsDetailsRoleProps {
  id: number
  roleName: string
  ctcOffered: number
  totalroleoffers: number
}

export interface StatisticsDetailsBranchesProps {
  id: number
  branchName?: string
  offersRoleWise: Array<StatisticsDetailsOffersRoleWiseProps>
  offersBranchWise: number
}

export interface StatisticsDetailsOffersRoleWiseProps {
  id: number
  noOfOffers: number
}

export interface ErrorProps {
  errorMessage: string
}

export interface TopCompanies {
  logo?: string
  name: string
  max_stipend: string
  max_ctc: string
  offers?: string
}

export interface StatsInfo {
  id: string | number
  value: number
  label: string
}

export interface Company {
  id: number | string
  name: string
}

export interface BasicStats {
  course: string
  offers: number
  branch: string
}

export interface TimeStamps {
  years: number
  months: number
  weeks: number
  days: number
  hours: number
  minutes: number
  seconds: number
}

export interface MultiSelectDropDownData {
  value: string
  label: string
}

export interface ClusterChosen {
  id: string | number
  value: string | number
}
export interface MultiSelectDropDownProps {
  placeholder: string
  clusterData: Array<MultiSelectDropDownData>
  choosenClusters: Array<ClusterChosen>
  onClick: (e: any) => void
  onDelete: (e: any) => void
}
