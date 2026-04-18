import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded'
import GroupRoundedIcon from '@mui/icons-material/GroupRounded'
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded'

export const ROUTES = Object.freeze({
  DASHBOARD: '/',
  PEOPLE: '/people',
  RECORDS: '/records',
  EVENT_FLOW: '/event-flow',
})

export const NAV_ITEMS = [
  {
    label: 'Gösterge Paneli',
    path: ROUTES.DASHBOARD,
    icon: DashboardRoundedIcon,
  },
  {
    label: 'Kişiler',
    path: ROUTES.PEOPLE,
    icon: GroupRoundedIcon,
  },
  {
    label: 'Kayıtlar',
    path: ROUTES.RECORDS,
    icon: DescriptionRoundedIcon,
  },
  {
    label: 'Olay Akışı',
    path: ROUTES.EVENT_FLOW,
    icon: TimelineRoundedIcon,
  },
]

export const ROUTE_TITLES = Object.freeze({
  [ROUTES.DASHBOARD]: 'İnceleme Gösterge Paneli',
  [ROUTES.PEOPLE]: 'Kişi Gezgini',
  [ROUTES.RECORDS]: 'Kayıt Tarayıcısı',
  [ROUTES.EVENT_FLOW]: 'Olay Akışı',
})
