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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  background,
} from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSearch } from '@fortawesome/free-solid-svg-icons'
import { nanoid } from 'nanoid'
import { clusterOptions } from '../../utils/Data/formUIData'
import NotFound from '../../assets/animations/94729-not-found.json'
import { DrivesCard } from '../../components/Cards'
import styles from './Drives.module.scss'
import useDrives from '../../hooks/useDrives'
import Page500 from '../Page500'
import { Paginator } from '../../components'
import { ClusterChosen, ModelProps } from '../../utils/types'
import PageLoader from '../../components/PageLoader'
import DriveDetails from '../../components/DriveDetails'
// const logo = '/nithLogo.png'

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

  // const handleClusterChange = (e: any) => {
  //   setSelectedCluster(e.target.value)
  // }

  // const handleMultiDelete = (idx: number) => {
  //   const items = clusters.filter((item, index) => index !== idx)
  //   setClusters(items)
  //   extractCluster(items)
  // }

  // const addCluster = (e: any) => {
  //   e.preventDefault()
  //   if (e === '' || clusters.find((cluster) => cluster.id === selectedCluster)) {
  //     return
  //   }
  //   const arr = [...clusters, { id: e, value: selectedCluster }]
  //   setClusters(arr)
  //   extractCluster(arr)
  // }
  console.log(data)

  const [isOpenModal, setIsOpenModal] = useState(false)
  const [modelData, setModalData] = useState<any>(null)

  if (isLoading || !isSuccess) {
    return <PageLoader />
  }
  if (isError) {
    return <Page500 />
  }

  const openModal = (drive: any) => {
    setIsOpenModal(true)
    setModalData(drive)
  }
  const closeModal = () => {
    setIsOpenModal(false)
  }

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.page_name}>Drives</h1>
        <div className={styles.filter_container}>
          <div className={styles.dropdown} />
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
          data?.results?.map((drive: any) => (
            <>
              <DrivesCard
                onClick={() => openModal(drive)}
                key={drive.id}
                companyName={drive.company}
                id={drive.id}
                // imgUrl={drive.image_url}
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
              <Modal
                key={nanoid()}
                id={nanoid()}
                scrollBehavior="inside"
                isOpen={isOpenModal}
                onClose={closeModal}
                isCentered
              >
                <ModalOverlay backgroundColor="blackAlpha.300" />
                <ModalContent className={styles.model_content} maxWidth={700}>
                  <ModalBody className={styles.modal_desc}>
                    <DriveDetails {...modelData} />
                  </ModalBody>
                </ModalContent>
              </Modal>
            </>
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

// <div className={styles.company_info_1}>
// <Tag className={styles.tag}>starting Date : {drive.starting_date}</Tag>
// <Tag className={styles.tag}>{drive.jobProfile}</Tag>
// <Tag className={styles.tag}>{drive.ctc} LPA</Tag>
// <Tag className={styles.tag}>Job Type: {drive.job_type}</Tag>
// <Tag className={styles.tag}>Mode of Hiring: {drive.modeOfHiring}</Tag>
// </div>
// <div className={styles.company_info_2}>
// <Tag className={styles.tag}>Job Location: {drive.jobLocation}</Tag>
// </div>
// <div className={styles.company_info_2}>
// {drive.pre_placement_talk && <Tag className={styles.tag}>PPT</Tag>}
// {drive.aptitudeTest && <Tag className={styles.tag}>Aptitude Test</Tag>}
// {drive.technicalTest && <Tag className={styles.tag}>Technical Test</Tag>}
// {drive.groupDiscussion && (
//   <Tag className={styles.tag}>Group Discussion</Tag>
// )}
// {drive.PersonalInterview && (
//   <Tag className={styles.tag}>personal Interview</Tag>
// )}
// </div>
// <Tag className={styles.tag}>Drive status: {drive.drive_status}</Tag>
// <div className={styles.company_info_2}>
// <Tag className={styles.heading}>Eligible Branches:</Tag>
// <span className={styles.branches}>
//   {drive.branches.map((branch: string) => (
//     <Tag className={styles.tag} key={branch}>
//       {branch}
//     </Tag>
//   ))}
// </span>
// </div>
