import { NavLink, useLocation } from 'react-router-dom'
import { DashboardIcon, PortalLogo } from '../../assets/svgs'
import navItems from '../../utils/Data/sidebarData'
import { RouteProps } from '../../utils/types'
import styles from './Sidebar.module.scss'

function Sidebar() {
  const location = useLocation()

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src={PortalLogo} alt="Portal Logo" />
        <h1>NITH</h1>
      </div>
      <div className={styles.nav_items}>
        {navItems.map((navItem: RouteProps) => {
          return (
            <NavLink
              to={navItem.url}
              key={navItem.id}
              className={`${styles.nav_item} ${
                location.pathname === navItem.url ? styles.selected : ''
              }`}
            >
              <img src={DashboardIcon} alt="Dashboard" />
              <span>{navItem.name}</span>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default Sidebar
