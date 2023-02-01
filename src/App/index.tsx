import { Routes, Route } from 'react-router-dom'
import { Header } from '../components'
import SidebarLayout from '../components/SidebarLayout'
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
} from '../pages'
import InterviewHistory from '../pages/InterviewHistory'
import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.app}>
      <Header />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student-details-form" element={<StudentDetailsForm />} />
      </Routes>

      <Routes>
        <Route
          path="/"
          element={
            <SidebarLayout>
              <Dashboard />
            </SidebarLayout>
          }
        />
        <Route
          path="/drives"
          element={
            <SidebarLayout>
              <Drives />
            </SidebarLayout>
          }
        />
        <Route
          path="/experiences"
          element={
            <SidebarLayout>
              <Experiences />
            </SidebarLayout>
          }
        />
        <Route
          path="/interview-history"
          element={
            <SidebarLayout>
              <InterviewHistory />
            </SidebarLayout>
          }
        />
        <Route
          path="/statistics"
          element={
            <SidebarLayout>
              <Statistics />
            </SidebarLayout>
          }
        />
        <Route
          path="/resources"
          element={
            <SidebarLayout>
              <Resources />
            </SidebarLayout>
          }
        />
        <Route
          path="/profile"
          element={
            <SidebarLayout>
              <Profile />
            </SidebarLayout>
          }
        />
      </Routes>
    </div>
  )
}

export default App
