import { Box } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SidebarNav from '../components/layout/SidebarNav'
import TopBar from '../components/layout/TopBar'

const DRAWER_WIDTH = 264

function InvestigationLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleOpenMobileMenu = () => {
    setMobileOpen(true)
  }

  const handleCloseMobileMenu = () => {
    setMobileOpen(false)
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <SidebarNav
        drawerWidth={DRAWER_WIDTH}
        mobileOpen={mobileOpen}
        onCloseMobile={handleCloseMobileMenu}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minWidth: 0,
        }}
      >
        <TopBar onOpenMobileMenu={handleOpenMobileMenu} />

        <Box
          component="main"
          sx={{
            flex: 1,
            p: { xs: 2, sm: 2.5, md: 3 },
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  )
}

export default InvestigationLayout
