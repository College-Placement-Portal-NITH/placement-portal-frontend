import { useQuery } from 'react-query'
import { drivesAPI } from '../utils/apis'

const getDrives = async (params: any) => {
  const response = await drivesAPI.get('/', {
    params,
  })
  // console.log(response.data)
  return response.data
}

export default function useDrives(
  params?: any,
  page?: number,
  company?: any,
  cluster?: string,
  type?: string,
) {
  return useQuery([`drives${page}${cluster}${company}${cluster}${type}`], () => getDrives(params))
}
