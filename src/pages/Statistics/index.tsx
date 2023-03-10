/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-children-prop */
import {
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Table,
  Tbody,
  Thead,
  TableContainer,
  Tr,
  Th,
  Td,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Lottie from 'lottie-react'
import styles from './Statistics.module.scss'
import { chartData, jobType, sessions, statsCardStyles } from '../../utils/Data/statisticsData'
import { PieChart, StatsCard, CompanyCard, Paginator } from '../../components'
import useStatisticsDetails from '../../hooks/useStatisticsData'
import LoadingAnimation from '../../assets/animations/98770-assistagro-loading-bars.json'
import Page500 from '../Page500'
import { companiesDetailsAPI } from '../../utils/apis'
import Loader from '../../assets/animations/72411-simple-grey-spinner.json'

const ctcTableHeader = [
  { id: 1, heading: 'Company' },
  { id: 2, heading: 'Offered CTC' },
]

const offersTableHeader = [
  { id: 1, heading: 'Company' },
  { id: 2, heading: 'Number of offers' },
]

function Statistics() {
  const [job, setJob] = useState('placement')
  const [session, setSession] = useState('2022-23')

  const [currPage, setCurrPage] = useState(1)
  const [maxPages, setMaxPages] = useState(1)
  const [ctcData, setCtcData] = useState([])
  const [offersWiseData, setOffersWiseData] = useState([])
  const [disablePrev, setDisablePrev] = useState(false)
  const [disableNext, setDisableNext] = useState(false)
  const [tab, setTab] = useState('ctc')
  const [companyData, setCompanyData] = useState([])
  const [isTableLoading, setTableLoading] = useState(false)
  const [searchedCompany, setSearchedCompany] = useState('')
  const toast = useToast()

  const { data, isLoading, isSuccess, isError, error } = useStatisticsDetails(
    { type: job.toLowerCase(), session },
    job,
    session,
  )

  useEffect(() => {
    const getCompaniesData = async (params) => {
      try {
        setTableLoading(true)
        const response = await companiesDetailsAPI.get('/', {
          params,
        })
        setMaxPages(Math.ceil(response.data.count / 10))
        setTableLoading(false)
        setCompanyData(response.data.results)
      } catch (errors) {
        if (errors) {
          setTableLoading(false)
          toast({
            title: `Something went wrong....`,
            status: 'error',
            isClosable: true,
          })
        }
      }
    }
    const companyDatas = getCompaniesData({
      page: currPage,
      session,
      type: job.toLowerCase(),
      order: tab,
      company: searchedCompany,
    })
  }, [currPage, job, tab])

  const handleNext = async (nextPage: number) => {
    if (currPage === maxPages - 1) {
      setDisableNext(true)
    } else {
      setDisableNext(false)
      setDisablePrev(false)
    }
    if (currPage < maxPages) {
      setCurrPage(currPage + 1)
    }
  }

  const handlePrev = async (prevPage: number) => {
    if (currPage > 1 && currPage <= maxPages) {
      setCurrPage(currPage - 1)
    }
  }

  const debounce = (func) => {
    let timer: any
    return function (...args) {
      // const context = this
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        func.apply(this, args)
      }, 1000)
    }
  }

  const handleSearch = async (e) => {
    const controller = new AbortController()
    setSearchedCompany(e.target.value)
    setTableLoading(true)
    const response = await companiesDetailsAPI.get('/', {
      signal: controller.signal,
      params: {
        session,
        type: job.toLowerCase(),
        order: tab,
        company: e.target.value,
      },
    })

    controller.abort()

    setMaxPages(Math.ceil(response.data.count / 10))

    setCompanyData(response.data.results)
    setTableLoading(false)
  }
  const debouncedFunction = debounce(handleSearch)

  const handleJobChange = (e: any) => {
    setJob(e.target.value)
  }

  const handleSessionChange = (e: any) => {
    setSession(e.target.value)
  }

  if (isError) {
    return <Page500 />
  }

  if (isLoading || !isSuccess) {
    return (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Lottie style={{ height: '200px', width: '200px' }} animationData={LoadingAnimation} />
      </div>
    )
  }

  const { statsInfo, topCompanies, basicStats } = data
  const arr: any[] = []
  if (job !== 'PPO') {
    basicStats.map((obj) => {
      if (obj.course === 'B.Tech') {
        const newObj = { ...obj, value: obj.offers, id: obj.branch.toLowerCase() }
        arr.push(newObj)
      }
      return ''
    })
  }

  const tabs = ['ctc', 'offer']

  const handleTabChange = (e) => {
    setTab(tabs[e])
  }

  return (
    <>
      {' '}
      <div className={styles.page_container}>
        <h1 className={styles.page_name}>Statistics</h1>
        <div className={styles.filter_container}>
          <Select
            minWidth="150px"
            bgColor="white"
            w="100%"
            value={job}
            placeholder="Job Type"
            onChange={(e) => handleJobChange(e)}
          >
            {jobType.map((type) => (
              <option value={type.value} key={type.id}>
                {type.value}
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
          {statsInfo.map((info, idx) => (
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
        {job === 'PPO' ? null : (
          <div className={styles.top_companies_container}>
            <Text className={styles.top_companies_heading}>Our Top Recruiting Partners</Text>
            <div className={styles.info_container_wrapper}>
              <div className={styles.info_container}>
                {topCompanies.map((companiesData) => (
                  <CompanyCard
                    type={job}
                    link={companiesData.logo}
                    key={companiesData.logo}
                    label={companiesData.name}
                    value={
                      job.toLowerCase() === 'intern'
                        ? companiesData.max_stipend
                        : companiesData.max_ctc
                    }
                  />
                ))}
              </div>
            </div>
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
            <Tabs onChange={handleTabChange} colorScheme="blackAlpha">
              <TabList>
                <Tab>{job.toLowerCase() === 'intern' ? 'Stipend Wise' : 'CTC Wise'}</Tab>
                <Tab>Offers Wise</Tab>
              </TabList>

              {isTableLoading ? (
                <Lottie animationData={Loader} />
              ) : (
                <TabPanels>
                  <TabPanel>
                    <TableContainer>
                      <Table>
                        <Thead>
                          <Tr>
                            {ctcTableHeader.map((header, idx) => (
                              <Th key={header.id}>
                                {idx === 1 && job.toLowerCase() === 'intern'
                                  ? 'Stipend Offered'
                                  : header.heading}
                              </Th>
                            ))}
                          </Tr>
                        </Thead>
                        <Tbody>
                          {companyData.map((datas) => (
                            <Tr
                              key={
                                job.toLowerCase() === 'intern' ? datas.max_stipend : datas.max_ctc
                              }
                            >
                              <Td>{datas.name}</Td>
                              <Td>
                                {job.toLowerCase() === 'intern' ? datas.max_stipend : datas.max_ctc}
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                  <TabPanel>
                    <TableContainer>
                      <Table>
                        <Thead>
                          <Tr>
                            {offersTableHeader.map((header) => (
                              <Th key={header.id}>{header.heading}</Th>
                            ))}
                          </Tr>
                        </Thead>

                        <Tbody>
                          {companyData.map((datas) => (
                            <Tr key={datas.offfers}>
                              <Td>{datas.name}</Td>
                              <Td>{datas.offers}</Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </TabPanel>
                </TabPanels>
              )}
            </Tabs>

            <Paginator
              onPrev={() => handlePrev(currPage - 1)}
              onNext={() => handleNext(currPage + 1)}
              curr={currPage}
              max={maxPages}
              disablePrev={disablePrev}
              disableNext={disableNext}
            />
          </div>
          <div className={styles.graph_container}>
            {job === 'PPO' ? null : <PieChart data={arr} />}
          </div>
        </div>
      </div>
    </>
  )
}

export default Statistics
