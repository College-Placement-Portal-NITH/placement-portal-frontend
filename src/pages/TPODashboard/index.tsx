/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import { Select, Input, InputGroup, InputRightElement, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import styles from './TPODashboard.module.scss'
import { jobType, sessions, statsCardStyles } from '../../utils/Data/statisticsData'
import { PieChart, StatsCard, CompanyCard } from '../../components'
import Page500 from '../Page500'
import { BasicStats, StatsInfo, TopCompanies } from '../../utils/types'
import PageLoader from '../../components/PageLoader'
import CompaniesTable from '../../components/CompaniesTable'

import LineChart from '../../components/LineChart'
import useTPOStats from '../../hooks/useTPOStats'

function TPODashboard() {
  const [job, setJob] = useState('placement')
  const [session, setSession] = useState('2023-24')

  const [searchedCompany, setSearchedCompany] = useState('')

  const { data, isLoading, isSuccess, isError } = useTPOStats(
    { type: job?.toLowerCase(), session },
    job || '',
    session,
  )

  const debounce = (func: any) => {
    let timer: any
    return function (...args: any[]) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(this, args)
      }, 1000)
    }
  }

  const handleSearch = async (e: any) => {
    const controller = new AbortController()
    setSearchedCompany(e.target.value)

    controller.abort()
  }
  const debouncedFunction = debounce(handleSearch)

  const handleJobChange = (e: any) => {
    if (e.target.value === '') return
    setJob(e.target.value)
  }

  const handleSessionChange = (e: any) => {
    setSession(e.target.value)
  }

  if (isError) {
    return <Page500 />
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />
  }

  const { statsInfo, topCompanies, basicStats, monthWise } = data
  const arr: any[] = []
  const fill: any[] = []
  const lineChartData: any[] = []
  if (job !== 'ppo') {
    basicStats.map((obj: BasicStats) => {
      const newObj = { ...obj, value: obj.offers, id: obj.course.toLowerCase() }

      const fillObj = { match: { id: obj.course.toLowerCase() }, id: 'dots' }
      if (obj.offers !== 0) {
        fill.push(fillObj)
        arr.push(newObj)
      }

      return ''
    })
  }

  if (job !== 'ppo') {
    monthWise.map((obj: any) => {
      const newObj = { id: obj.name, data: obj.data }
      lineChartData.push(newObj)

      return ''
    })
  }

  return (
    <>
      {' '}
      <div className={styles.page_container}>
        <h1 className={styles.page_name}>Welcome Back!</h1>
        <div className={styles.filter_container}>
          <Select
            minWidth="150px"
            bgColor="white"
            w="100%"
            value={job || ''}
            placeholder="Job Type"
            onChange={(e) => handleJobChange(e)}
          >
            {jobType.map((type) => (
              <option value={type.value} key={type.id}>
                {type.label}
              </option>
            ))}
          </Select>

          <Select
            w="100%"
            bgColor="white"
            value={session}
            placeholder="Session"
            onChange={(e) => handleSessionChange(e)}
          >
            {sessions.map((year) => (
              <option value={year.value} key={year.id}>
                {year.value}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className={styles.master_container}>
        <div className={styles.stats_info_container}>
          {statsInfo.map((info: StatsInfo, idx: number) => (
            <StatsCard
              icon={statsCardStyles[idx].icon}
              key={info.id}
              value={info.value}
              label={info.label}
              bgColor={statsCardStyles[idx].bgColor}
              color={statsCardStyles[idx].color}
              iconColor={statsCardStyles[idx].iconColor}
            />
          ))}
        </div>
        {job === 'ppo' ? null : (
          <div className={styles.top_companies_container}>
            <Text className={styles.top_companies_heading}>Our Top Recruiting Partners</Text>
            <div className={styles.info_container_wrapper}>
              <div className={styles.info_container}>
                {topCompanies.map((companiesData: TopCompanies) => (
                  <CompanyCard
                    type={job}
                    link={companiesData.logo || 'https://picsum.photos/100'}
                    key={companiesData.logo}
                    label={companiesData.name}
                    value={
                      job?.toLowerCase() === 'intern'
                        ? companiesData.max_stipend
                        : companiesData.max_ctc
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {job === 'ppo' && monthWise.length === 0 ? null : (
          <div className={styles.line_chart_container}>
            <LineChart data={monthWise} />
          </div>
        )}

        <div className={styles.table_graph_container}>
          <div className={styles.table_container}>
            <InputGroup>
              <Input
                onChange={debouncedFunction}
                style={{ borderColor: '#ccc' }}
                placeholder="Search For Company"
              />
              <InputRightElement children={<FontAwesomeIcon color="grey" icon={faSearch} />} />
            </InputGroup>

            <CompaniesTable session={session} type={job?.toLowerCase()} company={searchedCompany} />
          </div>
          <div className={styles.graph_container}>
            {job === 'PPO' ? null : <PieChart data={arr} fill={fill} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default TPODashboard
