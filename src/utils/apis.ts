import axios from 'axios'
import {
  COMPANIES_API,
  DRIVES_API,
  STUDENT_API,
  STATISTICS_API,
  RECENT_NOTIFICATIONS_API,
  DASHBOARD_API,
  ROLES_API,
  COMPANIES_ORDERWISE_API,
  CLUSTERS_API,
  RESOURCES_API,
  STATES_API,
  CITIES_API,
  COURSES_API,
  BRANCHES_API,
  STATISTICS_DETAILS_API,
  EXPERIENCES_API,
  STUDENT_LOGIN_API,
  STUDENT_REGISTER_API,
  STUDENT_OTP_API,
  STUDENT_ELIGIBILITY_API,
  STUDENT_LOGOUT_API,
  REFRESH_TOKEN_API,
  TPO_STATS_API,
  RECENT_EXPERIENCE_API,
  COMPANY_WISE_STATS_API,
} from './constants'
import { getDataFromLocalStorage } from './functions'

export const studentAPI = axios.create({
  baseURL: STUDENT_API,
})

export const drivesAPI = axios.create({
  baseURL: DRIVES_API,
})

export const experiencesAPI = axios.create({
  baseURL: EXPERIENCES_API,
})

export const companiesDetailsAPI = axios.create({
  baseURL: COMPANIES_ORDERWISE_API,
})

export const statisticsAPI = axios.create({
  baseURL: STATISTICS_API,
})

export const TPOStatsAPI = axios.create({
  baseURL: TPO_STATS_API,
})

export const recentNotificationsAPI = axios.create({
  baseURL: RECENT_NOTIFICATIONS_API,
})

export const dashboardAPI = axios.create({
  baseURL: DASHBOARD_API,
})

export const companiesAPI = axios.create({
  baseURL: COMPANIES_API,
})

export const rolesAPI = axios.create({
  baseURL: ROLES_API,
})

export const clustersAPI = axios.create({
  baseURL: CLUSTERS_API,
})

export const resourcesAPI = axios.create({
  baseURL: RESOURCES_API,
})

export const statesAPI = axios.create({
  baseURL: STATES_API,
})

export const citiesAPI = axios.create({
  baseURL: CITIES_API,
})

export const coursesAPI = axios.create({
  baseURL: COURSES_API,
})

export const branchesAPI = axios.create({
  baseURL: BRANCHES_API,
})

export const statisticsDetailsAPI = axios.create({
  baseURL: STATISTICS_DETAILS_API,
})

export const studentLoginAPI = axios.create({
  baseURL: STUDENT_LOGIN_API,
})

export const studentRegisterAPI = axios.create({
  baseURL: STUDENT_REGISTER_API,
})

export const studentOtpAPI = axios.create({
  baseURL: STUDENT_OTP_API,
})

export const studentLogoutAPI = axios.create({
  baseURL: STUDENT_LOGOUT_API,
})

export const studentEligibilityAPI = axios.create({
  baseURL: STUDENT_ELIGIBILITY_API,
})

export const refreshTokenAPI = axios.create({
  baseURL: REFRESH_TOKEN_API,
})

export const recentExperienceAPI = axios.create({
  baseURL: RECENT_EXPERIENCE_API,
})

export const companyWiseStatisticsAPI = axios.create({
  baseURL: COMPANY_WISE_STATS_API,
})

studentAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

drivesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

dashboardAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

experiencesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

recentExperienceAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

companiesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

clustersAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

companiesDetailsAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

coursesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

statesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

statisticsAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

statisticsDetailsAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

citiesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

branchesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

rolesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

resourcesAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

recentNotificationsAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

studentEligibilityAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

refreshTokenAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})

companyWiseStatisticsAPI.interceptors.request.use((config) => {
  const newConfig = { ...config }
  newConfig.headers.Authorization = `Bearer ${getDataFromLocalStorage('access_token')}`
  return newConfig
})
