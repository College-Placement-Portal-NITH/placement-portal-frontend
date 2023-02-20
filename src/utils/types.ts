import { MouseEventHandler, ReactNode } from 'react'

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
  varient?: 'primary' | 'secondary'
  onclick?: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
  stretch?: boolean
}

export interface ClusterCardProps {
  title: string
  range: string
  type: 'checkbox' | 'mark'
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

export interface InputProps {
  label?: string
  type: string | 'field' | 'list' | 'checkbox'
  options?: Array<OptionsType>
}

type OptionsType = {
  id: number
  value: string
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
  postedOn: string
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

export interface DrivesCardProps {
  id: number
  companyName: string
  imgUrl: string
  ctcOffered: number
  startingDate: Date
  modeOfHiring: string
  aptitudeTest: string
  ppt: string
  jobLocation: string
  type: string
  eligibleBatches: Array<string>
  jobProfile: string
  cluster: number
}

export interface ClusterType {
  id: number
  label: string
}

export interface SidebarProps {
  onLinkClickHandler?: () => void
  isMobile?: boolean
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
  branches: Array<StatisticsDetailsCourseBranchesProps>
}

export interface StatisticsDetailsRoleProps {
  id: number
  roleName: string
  ctcOffered: number
  totalroleoffers: number
  branches: Array<StatisticsDetailsBranchProps>
}

export interface StatisticsDetailsBranchProps {
  id: number
  branchName: string
  offers: number
}

export interface StatisticsDetailsCourseBranchesProps {
  id: number
  branchName?: string
  Offers: any
  offersBranchWise: number
}
