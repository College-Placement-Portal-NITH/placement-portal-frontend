import axios from 'axios'
import { useQuery } from 'react-query'
import { coursesAPI, drivesAPI } from '../utils/apis'

const getSpocsStatisticsFilterOptionsList = async () => {
  const [response1, response2] = await axios.all([coursesAPI.get('/'), drivesAPI.get('/getroles')])

  return [response1.data, response2.data]
}

export default function useSpocsStatisticsFilterOptionsList() {
  return useQuery(['spocsStatisticsFiltersList'], () => getSpocsStatisticsFilterOptionsList())
}
