import { useState } from 'react'
import jwtDecode from 'jwt-decode'
import { Button } from '@chakra-ui/react'
import styles from './Profile.module.scss'
import { FieldInfo } from '../../components'
import { studentStatData } from '../../utils/Data/profileData'
import { ClusterCard } from '../../components/Cards'
import useStudentDetails from '../../hooks/useStudentDetails'
import PageLoader from '../../components/PageLoader'
import Page500 from '../Page500'
import { clustersAPI, studentAPI } from '../../utils/apis'
import { PlacementDataProps } from '../../utils/types'
import { getDataFromLocalStorage } from '../../utils/functions'
import { BASE_API_URL } from '../../utils/constants'
import RecentExperience from '../../components/RecentExperience'

function Profile() {
  let accessDecoded: any
  if ('access_token' in localStorage) {
    const accessToken = getDataFromLocalStorage('access_token')
    if (accessToken) {
      accessDecoded = jwtDecode(accessToken)
    }
  }

  const { data, isSuccess, isError, isLoading } = useStudentDetails(accessDecoded.roll)

  const [placementData, setPlacementData] = useState<PlacementDataProps>({
    id: 0,
    student: '',
    cluster: {
      cluster_1_r: { cluster_id: 0, range: '' },
      cluster_2_r: { cluster_id: 0, range: '' },
      cluster_3_r: { cluster_id: 0, range: '' },
    },
    resume: '',
    undertaking: true,
  })
  const [isClusterDataFeteched, setIsClusterDataFetched] = useState(false)
  const [background, setBackground] = useState<number | null>(null)

  const [updateResume, setUpdateResume] = useState('')

  function getRandomCoverGradient(): string {
    let backgroundIdx = null
    if (background) {
      backgroundIdx = background
    } else {
      backgroundIdx = Math.round(Math.random() * (8 - 0) + 0)
      setBackground(backgroundIdx)
    }

    switch (backgroundIdx) {
      case 1:
        return 'linear-gradient(120deg,#f6d365 0,#fda085 100%)'
      case 2:
        return 'linear-gradient(to top,#fbc2eb 0,#a6c1ee 100%)'
      case 3:
        return 'linear-gradient(to top,#ff9a9e 0,#fecfef 99%,#fecfef 100%)'
      case 4:
        return 'linear-gradient(to right, rgb(116, 235, 213), rgb(172, 182, 229))'
      case 5:
        return 'linear-gradient(to right, rgb(102, 125, 182), rgb(0, 130, 200), rgb(0, 130, 200), rgb(102, 125, 182))'
      case 6:
        return 'linear-gradient(to right, rgb(6, 190, 182), rgb(72, 177, 191))'
      case 7:
        return 'linear-gradient(to right, rgb(0, 0, 70), rgb(28, 181, 224))'
      default:
        return 'linear-gradient(to right, rgb(58, 28, 113), rgb(215, 109, 119), rgb(255, 175, 123))'
    }
  }

  const getDetails = async (roll: string) => {
    try {
      const response = await clustersAPI.get(`/${roll}`)
      setPlacementData(response.data)
      console.log(response.data)
      return response.data
    } catch (error) {
      console.log(error)
      return null
    }
  }

  if (isError) {
    return <Page500 />
  }

  if (isLoading || !isSuccess) {
    return <PageLoader />
  }

  if (isSuccess) {
    if (
      (data.eligibility.allowed_for === 'placement' || data.eligibility.allowed_for === 'both') &&
      data.eligibility.sitting &&
      !isClusterDataFeteched
    ) {
      getDetails(data.roll)
      setIsClusterDataFetched(true)
    }
  }

  const displayYear = (year: number) => {
    switch (year) {
      case 1:
        return '1st year'
      case 2:
        return '2nd year'
      case 3:
        return '3rd year'
      default:
        return `${data.current_year}th year`
    }
  }

  const displayGender = (gender: string) => {
    switch (gender) {
      case 'm':
        return 'Male'
      case 'f':
        return 'Female'
      default:
        return 'Other'
    }
  }
  const handleResumeChange = (e: any) => {
    setUpdateResume(e.target.value)
  }
  const handleUpdateResume = async (e: any) => {
    e.preventDefault()
    // console.log(updateResume)
    try {
      const objToSend = {
        id: data.id,
        roll: accessDecoded.roll,
        course_name: data.course_name,
        branch: data.branch,
        branchFullname: data.branchFullname,
        branch_write: data.branch_write,
        city: data.city,
        city_write: data.city_write,
        isBanned: data.isBanned,
        state: data.state,
        college_email: data.college_email,
        eligiblity: data.eligibility,
        class_12_domicile: data.class_12_domicile,
        image_url: data.image_url,
        first_name: data.first_name,
        middle_name: data.middle_name,
        last_name: data.last_name,
        personal_email: data.personal_email,
        gender: data.gender,
        pnumber: data.pnumber,
        dob: data.dob,
        pincode: undefined,
        batch_year: data.batch_year,
        passing_year: data.passing_year,
        current_year: data.passing_year,
        category: data.category,
        cgpi: 8,
        gate_score: 100,
        cat_score: 100,
        class_10_year: 2018,
        class_10_school: data.class_10_school,
        class_10_board: data.class_10_board,
        class_10_perc: 98,
        class_12_year: 2020,
        class_12_school: data.class_12_school,
        class_12_board: data.class_12_board,
        class_12_perc: 98,
        active_backlog: 0,
        total_backlog: 0,
        jee_mains_rank: data.jee_mains_rank,
        linkedin: data.linkedin,
        pwd: data.pwd,
        disability_type: data.disability_type,
        gap_12_ug: data.gap_12_ug,
        gap_ug_pg: data.gap_ug_pg,
        banned_data: data.banned_data,
        over_date: data.over_date,
      }
      await studentAPI.put(`/profile/${data.roll}/`, objToSend)
    } catch (err) {
      console.log(err)
    }
  }

  let cluster1
  let cluster2
  let cluster3

  if (placementData.cluster) {
    const { cluster } = placementData
    const { cluster_1_r: cluster01, cluster_2_r: cluster02, cluster_3_r: cluster03 } = cluster
    cluster1 = cluster01
    cluster2 = cluster02
    cluster3 = cluster03
  }

  return (
    <>
      <h1 className={styles.page_name}>Profile</h1>
      <div className={styles.master_container}>
        <div className={styles.profile_header_container}>
          <div className={styles.profile_header}>
            <div className={styles.profile_content}>
              <div style={{ background: getRandomCoverGradient() }} className={styles.cover_img} />
              {data.image_url !== null ? (
                <img
                  src={`${BASE_API_URL}${data.image_url}`}
                  className={styles.profile_img}
                  alt="user profile"
                />
              ) : (
                <img
                  className={styles.profile_img}
                  src={`https://icotar.com/initials/${accessDecoded.first_name}.png?s=150&bg=03C988`}
                  alt="User Logo"
                />
              )}
            </div>
            <div className={styles.student_name_container}>
              <span className={styles.name}>
                {data.middle_name === null
                  ? `${data.first_name} ${data.last_name}`
                  : `${data.first_name} ${data.middle_name} ${data.last_name}`}
              </span>
              <span className={styles.roll}>{`${data.course_name} ${data.branch} ${displayYear(
                data.current_year,
              )}`}</span>
            </div>
          </div>
        </div>

        <div className={styles.container}>
          <div className={styles.college_container}>
            <p className={styles.college_title}>College</p>
            <div className={styles.sub_info_container}>
              <FieldInfo label="Roll No" value={data.roll} />
              <FieldInfo label="Branch" value={data.branch_fullname} />
              <FieldInfo label="Batch" value={data.batch_year} />
              <FieldInfo label="Personal Email" value={data.personal_email} />
              <FieldInfo label="Current CGPI" value={data.cgpi} />
              <FieldInfo label="College Email" value={data.college_email} />
              <FieldInfo label="Gender" value={displayGender(data.gender)} />
              <FieldInfo label="Mobile No" value={data.pnumber} />
              <FieldInfo label="Course" value={data.course_name} />
              <FieldInfo label="Date of Birth" value={data.dob} />
              <FieldInfo label="Category" value={data.category} />
              <FieldInfo label="Active Backlog(s)" value={data.active_backlog} />
              <FieldInfo label="Total Backlog(s)" value={data.total_backlog} />
            </div>
          </div>
          <RecentExperience />
          <div className={styles.education}>
            <p className={styles.education_title}>Education</p>
            <div>
              <span className={styles.label}>10th</span>
              <hr className={styles.separator} />
              <div>
                <FieldInfo label="Passing Year" value={data.class_10_year} />
                <FieldInfo label="School" value={data.class_10_school} />
                <FieldInfo label="Board" value={data.class_10_board} />
                <FieldInfo label="Percentage" value={data.class_10_perc} />
              </div>
              <div className={styles.spacer} />
            </div>

            <div>
              <span className={styles.label}>12th</span>
              <hr className={styles.separator} />
              <div>
                <FieldInfo label="Passing Year" value={data.class_12_year} />
                <FieldInfo label="School" value={data.class_12_school} />
                <FieldInfo label="Board" value={data.class_12_board} />
                <FieldInfo label="Percentage" value={data.class_12_perc} />
              </div>
              <div className={styles.spacer} />
            </div>
          </div>
          <div className={styles.sub_container}>
            <div className={styles.cluster_container}>
              <p className={styles.cluster_title}>Chosen Clusters</p>
              {(data.eligibility.allowed_for === 'placement' ||
                data.eligibility.allowed_for === 'both') &&
                data.eligibility.sitting &&
                Object.keys(placementData).length !== 0 && (
                  <div className={styles.cluster_field_container}>
                    <ClusterCard
                      title={`Cluster ${cluster1?.cluster_id}`}
                      range={cluster1?.range === undefined ? '' : cluster1.range}
                    />
                    <ClusterCard
                      title={`Cluster ${cluster2?.cluster_id}`}
                      range={cluster2?.range === undefined ? '' : cluster2.range}
                    />
                    <ClusterCard
                      title={`Cluster ${cluster3?.cluster_id}`}
                      range={cluster3?.range === undefined ? '' : cluster3.range}
                    />
                  </div>
                )}

              {(data.eligibility.allowed_for === 'placement' ||
                data.eligibility.allowed_for === 'both') &&
                data.eligibility.sitting === false && (
                  <div className={styles.cluster_field_container}>
                    <p>Not Interested in Placement</p>
                    <p>Reason : {data.eligibility.reason.toLocaleUpperCase()}</p>
                  </div>
                )}

              {(data.eligibility.allowed_for === 'NA' ||
                data.eligibility.allowed_for === 'intern') && (
                <div className={styles.cluster_field_container}>Not Applicable</div>
              )}
            </div>
            <div className={styles.stats_container}>
              <p className={styles.user_stats_title}>My Resume</p>
              {/* <div className={styles.user_stats_fields_container}>
                {studentStatData.map((info) => (
                  <FieldInfo key={info.id} label={info.label} value={info.value} />
                ))}
              </div> */}
              <div className={styles.profile}>
                <a href={data.linkedin} className={styles.profile_link}>
                  LinkedIn Profile
                </a>
              </div>
              <div>
                {data.eligibility.allowed_for !== 'NA' ? (
                  <div className={styles.profile}>
                    <a href={data.resume} className={styles.resume_link}>
                      View Resume
                    </a>
                  </div>
                ) : null}
              </div>

              <div className={styles.profile}>
                <form onSubmit={handleUpdateResume}>
                  <p className={styles.profile_link}>Update your Resume</p>
                  <input
                    id="resume"
                    name="resume"
                    color="RED"
                    style={{
                      border: '1px solid black',
                      // display: 'inline-block',
                      // position: 'relative',
                      // left: '10%',
                    }}
                    onChange={handleResumeChange}
                  />
                  <button
                    type="submit"
                    // className={styles.add_btn}
                    style={{ border: '1px solid black' }}
                  >
                    Update
                  </button>
                </form>
              </div>
            </div>
            <div className={styles.address_container}>
              <p className={styles.address_title}>Competitive Exams</p>
              <div className={styles.address_fields_container}>
                <FieldInfo
                  label="Gate Score"
                  value={data.gate_score === null ? 'Not Appeared' : data.gate_score}
                />
                <FieldInfo
                  label="CAT Percentile"
                  value={data.cat_score === null ? 'Not Appeared' : data.cat_score}
                />
                <FieldInfo label="JEE Main Rank" value={data.jee_mains_rank} />
              </div>
            </div>

            <div className={styles.address_container}>
              <p className={styles.address_title}>Address</p>
              <div className={styles.address_fields_container}>
                <FieldInfo label="City" value={data.city} />
                <FieldInfo label="State" value={data.state} />
                <FieldInfo label="Pincode" value={data.pincode} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
