import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../../config/routes'

function SidebarContent({ onNavigate }) {
  return (
    <Box sx={{ width: 264, height: '100%', p: 2.2 }}>
      <Stack direction="row" spacing={1.4} alignItems="center" sx={{ mb: 3, px: 1 }}>
        <Box
          sx={{
            width: 34,
            height: 34,
            borderRadius: 2,
            display: 'grid',
            placeItems: 'center',
            background: 'linear-gradient(145deg, #1f5d9f 0%, #0f3f70 100%)',
            color: '#fff',
          }}
        >
          <SearchRoundedIcon fontSize="small" />
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ lineHeight: 1.1 }}>
            Vaka Gezgini
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Kişileri ve kanıtları izle
          </Typography>
        </Box>
      </Stack>

      <List sx={{ p: 0 }}>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          return (
            <ListItemButton
              key={item.path}
              component={NavLink}
              to={item.path}
              onClick={onNavigate}
              sx={{
                mb: 0.8,
                borderRadius: 2.5,
                '&.active': {
                  backgroundColor: 'rgba(31, 93, 159, 0.12)',
                  border: '1px solid rgba(31, 93, 159, 0.25)',
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 38 }}>
                <Icon color="primary" fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: '0.92rem',
                  fontWeight: 600,
                }}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}

function SidebarNav({ drawerWidth, mobileOpen, onCloseMobile }) {
  return (
    <>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={onCloseMobile}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <SidebarContent onNavigate={onCloseMobile} />
        </Drawer>

        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              borderRight: '1px solid rgba(19, 35, 61, 0.1)',
              background: 'linear-gradient(180deg, #f7f9fe 0%, #f1f5fb 100%)',
            },
          }}
        >
          <SidebarContent />
        </Drawer>
      </Box>
    </>
  )
}

export default SidebarNav
