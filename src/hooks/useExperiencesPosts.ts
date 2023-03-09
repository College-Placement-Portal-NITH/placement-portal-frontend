import { useQuery } from 'react-query'
import { experienceAPI } from '../utils/apis'

const getExperiences = async () => {
  const response = await experienceAPI.get('/')
  return response.data
}

export default function useExperiencesPosts() {
  return useQuery('experiences', getExperiences)
}
