import { useQuery } from 'react-query'
import { companiesAPI } from '../utils/apis'

const getCompanies = async () => {
  const response = await companiesAPI.get('/')
  return response.data
}

export default function useCompanies() {
  return useQuery([`companies`], () => getCompanies())
}
