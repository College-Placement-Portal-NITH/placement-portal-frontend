import { MouseEventHandler, ReactNode } from 'react'

export type RouteProps = {
  id: number
  name: string
  url: string
}

export interface FieldInfoProps {
  label: string
  value: string | number
}

export type ButtonProps = {
  varient: 'primary' | 'secondary'
  onclick: MouseEventHandler<HTMLButtonElement>
  children: ReactNode
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
  imgUrl: string
  jobType: string
  selStatus: string
  userName: string
  difficulty: string
  role: string
  postedOn: number
}

export type InputProps = {
  label: string
  type: 'field' | 'list' | 'checkbox'
  options: Array<OptionsType>
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
  year: number
  id: number
}

export interface ModalProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: string
}

export interface CompanyListProps {
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
