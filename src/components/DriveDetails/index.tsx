/* eslint-disable react/no-unused-prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState } from 'react'
import './JobDetails.css'
import {
  faFileArrowDown,
  faCircleChevronDown,
  faCircleChevronUp,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface DriveDetailsProps {
  allowStudentsWithBacklogs: boolean
  aptitudeTest: boolean
  branches: number[]
  cgpi: number
  closed_date: string
  company: string
  courses: number[]
  created_at: string
  ctc: number
  drive_status: string
  groupDiscussion: boolean
  id: number
  image_url: string
  jobLocation: string
  jobProfile: string
  job_desc_pdf: string | undefined
  job_roles: any[] | null
  job_type: string
  modeOfHiring: string
  noOfPersonsVisiting: number
  personalInterview: boolean
  prePlacementTalk: boolean
  session: string
  starting_date: string
  technicalTest: boolean
  updated_at: string
}

function DriveDetails(props: DriveDetailsProps) {
  console.log('props', props)
  const {
    allowStudentsWithBacklogs,
    aptitudeTest,
    branches,
    cgpi,
    company,
    courses,
    ctc,
    drive_status,
    groupDiscussion,
    image_url,
    jobLocation,
    jobProfile,
    job_desc_pdf,
    job_roles,
    job_type,
    modeOfHiring,
    noOfPersonsVisiting,
    personalInterview,
    prePlacementTalk,
    session,
    technicalTest,
  } = props

  const [isOpenHR, setIsOpenHR] = useState(false)
  const [isOpenAnnouncement, setIsOpenAnnouncement] = useState(false)

  const toggleDropdownHR = () => {
    setIsOpenHR(!isOpenHR)
  }
  const toggleDropdownAnnouncement = () => {
    setIsOpenAnnouncement(!isOpenAnnouncement)
  }

  return (
    <div className="job-details">
      <div className="header">
        <h2 className="title">Job Details</h2>
        {job_desc_pdf ? (
          <a href={job_desc_pdf} download>
            <button className="button" title="Download Job description">
              <FontAwesomeIcon cursor="pointer" icon={faFileArrowDown} color="black" />
            </button>
          </a>
        ) : null}
      </div>
      <table className="job-table">
        <tbody>
          <tr>
            <td className="property">Company Name:</td>
            <td className="value">{company}</td>
          </tr>
          <tr>
            <td className="property">Job Profile:</td>
            <td className="value">{jobProfile}</td>
          </tr>
          <tr>
            <td className="property">CTC:</td>
            <td className="value">{ctc} LPA</td>
          </tr>
          <tr>
            <td className="property">Job Type:</td>
            <td className="value">{job_type}</td>
          </tr>
          <tr>
            <td className="property">Mode of Hiring:</td>
            <td className="value">{modeOfHiring}</td>
          </tr>
          <tr>
            <td className="property">Job Location:</td>
            <td className="value">{jobLocation}</td>
          </tr>
          {modeOfHiring !== 'virtual' && (
            <tr>
              <td className="property">No of Persons Visiting:</td>
              <td className="value">{noOfPersonsVisiting}</td>
            </tr>
          )}

          <tr>
            <td className="property">Allow Students With Backlogs:</td>
            <td className="value">{allowStudentsWithBacklogs ? 'Yes' : 'No'}</td>
          </tr>
          <tr>
            <td className="property">Recruitment Process:</td>
            <td className="value">
              {prePlacementTalk && <span>PPT , </span>}
              {aptitudeTest && <span>Aptitude Test , </span>}
              {technicalTest && <span>Technical Test , </span>}
              {groupDiscussion && <span>Group Discussion , </span>}
              {personalInterview && <span>Personal Interview </span>}
            </td>
          </tr>

          <tr>
            <td className="property">Drive Status:</td>
            <td className="value">{drive_status}</td>
          </tr>
        </tbody>
      </table>
      <div className="header">
        <h2 className="title">HR Details</h2>
        <button
          className="button"
          title={isOpenHR ? 'Hide HR Details' : 'Show HR Details'}
          onClick={() => setIsOpenHR(!isOpenHR)}
        >
          <FontAwesomeIcon
            cursor="pointer"
            icon={isOpenHR ? faCircleChevronUp : faCircleChevronDown}
            color="black"
          />
        </button>
      </div>
      {isOpenHR ? (
        <table className="hr-table">
          <tbody>
            <tr>
              <td className="property">Name:</td>
              <td className="value">Patrick Jane</td>
            </tr>
            <tr>
              <td className="property">Email</td>
              <td className="value">example@gmail.com</td>
            </tr>
            <tr>
              <td className="property">Phone</td>
              <td className="value">xxx-xxx-xxxx</td>
            </tr>
          </tbody>
        </table>
      ) : null}

      <div className="header">
        <h2 className="title">Announcemens</h2>
        <button
          className="button"
          title={isOpenAnnouncement ? 'Hide Announcements' : 'Show Announcements'}
          onClick={() => setIsOpenAnnouncement(!isOpenAnnouncement)}
        >
          <FontAwesomeIcon
            cursor="pointer"
            icon={isOpenAnnouncement ? faCircleChevronUp : faCircleChevronDown}
            color="black"
          />
        </button>
      </div>
      {isOpenAnnouncement ? null : null}
    </div>
  )
}

export default DriveDetails
