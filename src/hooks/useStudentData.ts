import { useQuery } from 'react-query'
import { studentAPI, studentEXCELAPI } from '../utils/apis'

const getStudentData = async (course?: string, branch?: string, cgpi?: number, page?: number) => {
  const response = await studentAPI.get(
    `/?course=${course}&branch=${branch}&cgpi=${cgpi}&page=${page}`,
  )
  return response.data
}

const getStudentEXCEL = async (course?: string, branch?: string, cgpi?: number, page?: number) => {
  const response = await studentEXCELAPI.get(
    `/?course=${course}&branch=${branch}&cgpi=${cgpi}&page=${page}`,
  )
  return response.data
}

export default function useStudentData(
  course?: string,
  branch?: string,
  cgpi?: number,
  page?: number,
) {
  return useQuery([`students${course}${branch}${cgpi}${page}`], () =>
    getStudentData(course, branch, cgpi, page),
  )
}
