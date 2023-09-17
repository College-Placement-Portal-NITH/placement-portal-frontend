/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-children-prop */
import { useState } from 'react'
import Lottie from 'lottie-react'
import {
  Input,
  InputGroup,
  Text,
  Button,
  Select,
  TagLabel,
  Tag,
  TagCloseButton,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { clusterOptions } from '../../utils/Data/formUIData'
import NotFound from '../../assets/animations/94729-not-found.json'
import { DrivesCard } from '../../components/Cards'
import styles from './Drives.module.scss'
import useDrives from '../../hooks/useDrives'
import Page500 from '../Page500'
import { Paginator } from '../../components'
import { ClusterChosen } from '../../utils/types'
import PageLoader from '../../components/PageLoader'

function Drives() {
  const [page, setPage] = useState(1)
  const [company, setCompany] = useState('')
  const [clusters, setClusters] = useState<Array<ClusterChosen>>([])
  const [selectedCluster, setSelectedCluster] = useState('')
  const [search, setSearch] = useState('')
  const [clusterStr, setClusterStr] = useState('')
  const { data, isSuccess, isError, isLoading } = useDrives(
    { page, company, cluster: clusterStr },
    page,
    company,
    clusterStr,
  )

  function extractCluster(clustersArr: Array<ClusterChosen>) {
    const str = clustersArr.map((cluster) => cluster.value).join(',')
    setClusterStr(str)
  }

  const onSearch = () => {
    setPage(1)
    setCompany(search)
    extractCluster(clusters)
  }

  const handleSearch = (e: any) => {
    setSearch(e.target.value)
  }

  const handleClusterChange = (e: any) => {
    setSelectedCluster(e.target.value)
  }

  const handleMultiDelete = (idx: number) => {
    const items = clusters.filter((item, index) => index !== idx)
    setClusters(items)
    extractCluster(items)
  }

  const addCluster = (e: any) => {
    e.preventDefault()
    if (e === '' || clusters.find((cluster) => cluster.id === selectedCluster)) {
      return
    }
    const arr = [...clusters, { id: e, value: selectedCluster }]
    setClusters(arr)
    extractCluster(arr)
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />
  }
  if (isError) {
    return <Page500 />
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.page_name}>Drives</h1>
        <div className={styles.filter_container}>
          <div className={styles.dropdown}>
            <Select
              name="cluster"
              placeholder="Choose Clusters"
              onChange={handleClusterChange}
              value={selectedCluster}
              backgroundColor="white"
            >
              {clusterOptions.map((clust) => (
                <option key={clust.value} value={clust.value}>
                  {clust.label}
                </option>
              ))}
            </Select>
            <div className={styles.selected_clusters}>
              {clusters.map((cluster: ClusterChosen, idx: number) => (
                <Tag
                  size="sm"
                  key={cluster.value}
                  borderRadius="full"
                  variant="solid"
                  justifySelf="center"
                  colorScheme="gray"
                >
                  <TagLabel>Cluster {cluster.value}</TagLabel>
                  <TagCloseButton onClick={() => handleMultiDelete(idx)} />
                </Tag>
              ))}
            </div>

            <Button onClick={addCluster}>
              <FontAwesomeIcon cursor="pointer" icon={faPlus} />
            </Button>
          </div>
          <div className={styles.search_box}>
            <InputGroup>
              <Input value={search} onChange={handleSearch} placeholder="Company" type="input" />
            </InputGroup>
          </div>
          <Button onClick={onSearch}>
            <FontAwesomeIcon cursor="pointer" icon={faSearch} />
          </Button>
        </div>
      </div>
      <div className={styles.content}>
        {data.results.length === 0 ? (
          <div className={styles.lottie_container}>
            <Text className={styles.heading}>Oops....</Text>
            <Text className={styles.para}>Cannot find anything for &#34;{company}&#34;</Text>
            <div className={styles.animation_container}>
              <Lottie animationData={NotFound} />
            </div>
          </div>
        ) : (
          data.results.map((drive: any) => (
            <DrivesCard
              key={drive.id}
              companyName={drive.company}
              id={drive.id}
              imgUrl={drive.image_url}
              ctcOffered={drive.ctc}
              startingDate={drive.starting_date}
              modeOfHiring={drive.modeOfHiring}
              isPpt={drive.pre_placement_talk}
              jobLocation={drive.jobLocation}
              type={drive.job_type}
              eligibleBatches={drive.branches}
              jobProfile={drive.jobProfile}
              cluster={drive.cluster}
              driveStatus={drive.drive_status}
            />
          ))
        )}

        {data.results.length !== 0 && (
          <Paginator
            max={data.pages}
            curr={page}
            onNext={() => setPage(page + 1)}
            onPrev={() => setPage(page - 1)}
            disableNext={page === data.pages}
            disablePrev={page === 1}
          />
        )}
      </div>
    </>
  )
}

export default Drives
