import { useQuery } from 'react-query'
import { experienceAPI } from '../utils/apis'

const getExperiencesData = async () => {
  const response = await experienceAPI.get('/')
  return response.data
}

export default function useExperiences() {
  return useQuery('experiences', getExperiencesData)
}
