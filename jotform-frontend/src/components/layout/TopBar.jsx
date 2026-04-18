import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import ShieldMoonRoundedIcon from '@mui/icons-material/ShieldMoonRounded'
import { AppBar, Box, Chip, IconButton, Toolbar, Typography } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { ROUTE_TITLES } from '../../config/routes'

function TopBar({ onOpenMobileMenu }) {
  const location = useLocation()
  const currentTitle = ROUTE_TITLES[location.pathname] || 'İnceleme Gösterge Paneli'

  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="transparent"
      sx={{
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(19, 35, 61, 0.08)',
      }}
    >
      <Toolbar sx={{ minHeight: 74 }}>
        <IconButton
          color="primary"
          onClick={onOpenMobileMenu}
          sx={{ display: { xs: 'inline-flex', md: 'none' }, mr: 1 }}
          aria-label="Gezinmeyi aç"
        >
          <MenuRoundedIcon />
        </IconButton>

        <Box>
          <Typography variant="overline" sx={{ lineHeight: 1.1, color: 'text.secondary' }}>
            Kayıp Podo Vakası
          </Typography>
          <Typography variant="h6" sx={{ lineHeight: 1.2 }}>
            {currentTitle}
          </Typography>
        </Box>

        <Box sx={{ ml: 'auto' }}>
          <Chip
            icon={<ShieldMoonRoundedIcon />}
            label="Canlı Soruşturma"
            color="secondary"
            variant="outlined"
            sx={{
              borderWidth: 1,
              fontWeight: 600,
              backgroundColor: 'rgba(217, 119, 6, 0.08)',
            }}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
