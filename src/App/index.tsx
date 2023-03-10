import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { HeaderLayout } from '../components'
import {
  Dashboard,
  Profile,
  Experiences,
  StudentDetailsForm,
  Login,
  Signup,
  Resources,
  Drives,
  Statistics,
  Page404,
  ExperienceDetails,
  ExperienceForm,
  ResourceDetails,
  AnnouncementForm,
  StatisticsDetails,
  ResultAnnouncement,
} from '../pages'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    const scrollToTop = () => {
      window.document.documentElement.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    }

    scrollToTop()
  }, [pathname])

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student-details-form" element={<StudentDetailsForm />} />
      <Route path="/experience-form" element={<ExperienceForm />} />
      <Route path="/announcement-form" element={<AnnouncementForm />} />
      <Route path="/result-announcement" element={<ResultAnnouncement />} />
      <Route
        path="/dashboard"
        element={
          <HeaderLayout>
            <Dashboard />
          </HeaderLayout>
        }
      />
      <Route
        path="/drives"
        element={
          <HeaderLayout>
            <Drives />
          </HeaderLayout>
        }
      />
      <Route
        path="/experiences"
        element={
          <HeaderLayout>
            <Experiences />
          </HeaderLayout>
        }
      />
      <Route
        path="/experiences-details/:id"
        element={
          <HeaderLayout>
            <ExperienceDetails />
          </HeaderLayout>
        }
      />
      <Route
        path="/statistics"
        element={
          <HeaderLayout>
            <Statistics />
          </HeaderLayout>
        }
      />
      <Route
        path="/statistics-details"
        element={
          <HeaderLayout>
            <StatisticsDetails />
          </HeaderLayout>
        }
      />
      <Route
        path="/resources"
        element={
          <HeaderLayout>
            <Resources />
          </HeaderLayout>
        }
      />
      <Route
        path="/resources-details/:branchName"
        element={
          <HeaderLayout>
            <ResourceDetails />
          </HeaderLayout>
        }
      />
      <Route
        path="/profile"
        element={
          <HeaderLayout>
            <Profile />
          </HeaderLayout>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  )
}

export default App
