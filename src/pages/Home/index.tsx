import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import recruitData from '../../utils/Data/recruitData'
import { RecruitCard } from '../../components/Cards'
import { Footer } from '../../components'
import landingPageData from '../../utils/Data/landingPageData'
import LandingCompanyCard from '../../components/Cards/LandingCompanyCard'
import styles from './Home.module.scss'

function Home() {
  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Training and Placement Office</h1>
          <div className={styles.content}>
            <p>
              The Training and Placement portal at NIT Hamirpur serves two main purposes. Firstly,
              it serves as a platform for students to access job opportunities, company information,
              and the application process. Secondly, it functions as a placement automation tool for
              the Training and Placement Office (TPO). This means that the TPO team can use the
              portal to streamline the entire placement process, from job postings to candidate
              shortlisting and interview scheduling. Overall, the portal is a valuable resource that
              benefits both students and the TPO team in their efforts to achieve successful
              placements.
            </p>
            {/* <div className={styles.button}>
              <Button variant="solid" rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                <Link to="/jnf-form">JNF FORM</Link>
              </Button>
              <Link to="/upload_jd">
                <Button variant="outline" rightIcon={<FontAwesomeIcon icon={faArrowRight} />}>
                  UPLOAD JD
                </Button>
              </Link>
            </div> */}
          </div>
        </div>
        <img className={styles.campus_picture} src="/nitHamirpur.webp" alt="campus_picture" />
      </div>
      <div className={styles.recruit_container}>
        <h1 className={styles.recruit_heading}>Why Recruit from NIT Hamirpur?</h1>
        <div className={styles.info_container_wrapper}>
          <div className={styles.info_container}>
            {recruitData.map((data) => (
              <RecruitCard icon={data.icon} key={data.id} label={data.label} info={data.info} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.message_container}>
        <img
          src="https://media.licdn.com/dms/image/C4D03AQF74llJoSLOww/profile-displayphoto-shrink_800_800/0/1517545204606?e=1684368000&v=beta&t=Oi4N5DD54GeklY8k6T5ZdKIa8MOtnYtJWuy2EdwqLCI"
          alt="campus_picture"
        />
        <div className={styles.container}>
          <h1 className={styles.heading}>Director&apos;s Message</h1>
          <div className={styles.content}>
            <p>
              The National Institute of Technology Hamirpur is a prestigious engineering institute
              in India that has been granted the status of &quot;An Institute of National
              Importance&quot;. The institute offers top-notch education to its students in
              graduate, postgraduate, and PhD programs. The institute has state-of-the-art
              facilities that have contributed to the success of its students in their respective
              fields. The institute&apos;s students have made a significant impact in the
              organizations they have been associated with, and they possess a perfect combination
              of technical intellect and social awareness. The institute focuses on fostering
              national integration, industry interaction, and basic and applied research.
            </p>
            <div>
              <Link to="https://nith.ac.in/training-placement">
                <Button colorScheme="messenger">READ MORE</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.message_container}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Faculty Incharge&apos;s Message</h1>
          <div className={styles.content}>
            <p>
              Dear Recruiters, We would like to take this opportunity to cordially invite your
              esteemed organization for being empaneled for the Campus Recruitment Drive for Batch
              of 2023. National Institute of Technology Hamirpur is the Technological Hub of Green
              and Clean Himachal Pradesh and it offers a peaceful and serene environment for
              academic growth. NIT Hamirpur has been consistently ranked among the top Engineering
              and Architecture institutions in the country. NIT Hamirpur accords pivotal status to
              research and development in pursuit of excellence. The institute plays a vital role in
              diverse facets of research and development addressing the needs of the nation and
              contributing to global development. Its initiatives toward research and development
              are reflected in its impressive catalogue of research projects funded by National and
              International Organizations and Industries.
            </p>
            <div>
              <Link to="https://nith.ac.in/uploads/topics/tpo-placement-brochure202316641646754035.pdf">
                <Button colorScheme="messenger">READ MORE</Button>
              </Link>
            </div>
          </div>
        </div>
        <img
          src="https://scholar.googleusercontent.com/citations?view_op=view_photo&user=eekO6rIAAAAJ&citpid=3"
          alt="campus_picture"
        />
      </div>
      <div className={styles.top_companies_container}>
        <h1 className={styles.top_companies_heading}>Past Recruiters</h1>
        <div className={styles.info_container_wrapper}>
          <div className={styles.info_container}>
            {landingPageData.map((companiesData: any) => (
              <LandingCompanyCard
                link={companiesData.logo}
                key={companiesData.logo}
                label={companiesData.name}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </>
  )
}

export default Home
