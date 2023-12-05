import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'
import { HeaderLayout } from '../components'
import {
  Dashboard,
  Profile,
  Experiences,
  StudentDetailsForm,
  Login,
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
  Home,
  JNFForm,
  StudentData,
  CreateDriveForm,
  TprDrives,
  Register,
  TPODashboard,
  CompanyWiseDetails,
  NextPlacementEligibilityPercentage,
  UpdateClusters,
} from '../pages'
import {
  clearDataFromLocalStorage,
  getDataFromLocalStorage,
  getRole,
  isAuthenticated,
  isStudentDetailsFormFilled,
  isStudentEligibleForPlacementOrIntern,
  setDataToLocalStorage,
  setTimerForTokenExpiration,
} from '../utils/functions'
import ProtectedRoute from '../Routes/ProtectedRoute'
import { refreshTokenAPI, studentLogoutAPI } from '../utils/apis'
import { Role } from '../utils/constants'
import UploadJD from '../pages/UploadJD'

function App() {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const expireTokens = async () => {
      try {
        await studentLogoutAPI.post('/', {
          refresh_token: getDataFromLocalStorage('refresh_token'),
        })
      } catch (err) {
        // console.log(err)
      }
    }
    const checkAuthState = async () => {
      // Check if access token is still valid
      const accessToken = localStorage.getItem('access_token')

      if (accessToken) {
        const decodedToken = jwtDecode<any>(accessToken)
        const currentTime = Date.now() / 1000

        // token is valid, again start timer from now
        if (decodedToken.exp > currentTime) {
          const refreshToken = getDataFromLocalStorage('refresh_token')

          try {
            const response = await refreshTokenAPI.post('/', {
              refresh: refreshToken,
            })

            // Store new access token in local storage
            setDataToLocalStorage('access_token', response.data.access)
            setTimerForTokenExpiration(navigate, expireTokens)
          } catch (err: any) {
            // console.log(err)
          }
        }
      } else {
        // Access token has expired, logout user
        clearDataFromLocalStorage()
        Navigate({ to: '/home' })
      }
    }

    checkAuthState()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/student-details-form" element={<StudentDetailsForm />} />
      <Route path="/experience-form" element={<ExperienceForm />} />
      <Route path="/announcement-form" element={<AnnouncementForm />} />
      <Route path="/result-announcement" element={<ResultAnnouncement />} />
      <Route path="/create-drive" element={<CreateDriveForm />} />
      <Route path="/jnf-form" element={<JNFForm />} />
      <Route path="/eligibility-percentage" element={<NextPlacementEligibilityPercentage />} />
      <Route path="/update-clusters" element={<UpdateClusters />} />
      <Route path="/upload_jd" element={<UploadJD />} />
      <Route
        path="/home"
        element={
          <HeaderLayout>
            <Home />
          </HeaderLayout>
        }
      />
      {getRole() === Role.STUDENT && (
        <>
          <Route
            path="/create-drive"
            element={
              <ProtectedRoute>
                <CreateDriveForm />
              </ProtectedRoute>
            }
          />

          {isStudentDetailsFormFilled() === false && (
            <Route
              path="/student-details-form"
              element={
                <ProtectedRoute>
                  <StudentDetailsForm />
                </ProtectedRoute>
              }
            />
          )}
          {isStudentEligibleForPlacementOrIntern() === true && (
            <>
              <Route
                path="/drives"
                element={
                  <ProtectedRoute>
                    <HeaderLayout>
                      <Drives />
                    </HeaderLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/experience-form"
                element={
                  <ProtectedRoute>
                    <ExperienceForm />
                  </ProtectedRoute>
                }
              />
            </>
          )}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Dashboard />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drives/tpr"
            element={
              <HeaderLayout>
                <TprDrives />
              </HeaderLayout>
            }
          />
          <Route
            path="/experiences"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Experiences />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/experiences-details/:id"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <ExperienceDetails />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Statistics />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />

          <Route
            path="/statistics-details/:company/:type/:session"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <StatisticsDetails />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Resources />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/resources-details/:branchName"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <ResourceDetails />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Profile />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />

          {isAuthenticated() ? (
            <Route path="/" element={<Navigate to="/dashboard" />} />
          ) : (
            <Route path="/" element={<Navigate to="/home" />} />
          )}
        </>
      )}
      {getRole() === Role.TPO && (
        <>
          <Route
            path="/tpo-dashboard"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <TPODashboard />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Dashboard />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/drives"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Drives />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/experiences"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <Experiences />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/student-data"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <StudentData />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/company-wise-details/:company/:type/:session"
            element={
              <ProtectedRoute>
                <HeaderLayout>
                  <CompanyWiseDetails />
                </HeaderLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/announcement-form"
            element={
              <ProtectedRoute>
                <AnnouncementForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/result-announcement"
            element={
              <ProtectedRoute>
                <ResultAnnouncement />
              </ProtectedRoute>
            }
          />
          {isAuthenticated() ? (
            <Route path="/" element={<Navigate to="/tpo-dashboard" />} />
          ) : (
            <Route path="/" element={<Navigate to="/home" />} />
          )}
        </>
      )}
      {isAuthenticated() ? (
        <Route path="*" element={<Page404 />} />
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  )
}

export default App
