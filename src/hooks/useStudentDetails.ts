import { useQuery } from 'react-query'
import { studentAPI } from '../utils/apis'

const getStudentDetails = async (roll: string) => {
  const response = await studentAPI.get(`/profile/${roll}/`)
  console.log(response.data)
  return response.data
}

export default function useStudentDetails(roll: string) {
  return useQuery(['students'], () => getStudentDetails(roll))
}
