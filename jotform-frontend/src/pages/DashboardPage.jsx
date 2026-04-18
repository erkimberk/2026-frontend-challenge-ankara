import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import { Alert, Box, Button, Card, CardContent, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MetricCard from '../components/dashboard/MetricCard'
import RecentEventsPanel from '../components/dashboard/RecentEventsPanel'
import SourceBreakdownCard from '../components/dashboard/SourceBreakdownCard'
import { ROUTES } from '../config/routes'
import { fetchInvestigationBundle } from '../services/investigationService'

function DashboardPage() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [allRecords, setAllRecords] = useState([])
  const [people, setPeople] = useState([])

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true)
      setError('')

      try {
        const bundle = await fetchInvestigationBundle()
        setAllRecords(bundle.allRecords)
        setPeople(bundle.people)
      } catch (fetchError) {
        setError(fetchError?.message || 'Dashboard verileri yüklenirken bir hata oluştu.')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  const metricItems = useMemo(() => {
    const openLeads = allRecords.filter(
      (record) =>
        record.type === 'anonymous_tip' &&
        ['high', 'medium'].includes((record.confidence || '').toString().toLowerCase()),
    ).length

    return [
      {
        title: 'Eşleşen Profiller',
        value: people.length,
        caption: 'Kaynaklar arası kimlik',
        tone: 'primary.main',
      },
      {
        title: 'Zaman Akışı Olayları',
        value: allRecords.length,
        caption: 'Zamana göre sıralı',
        tone: 'secondary.main',
      },
      {
        title: 'Açık İpuçları',
        value: openLeads,
        caption: 'High + Medium güven',
        tone: '#0f766e',
      },
    ]
  }, [allRecords, people])

  const recentEvents = useMemo(() => {
    return [...allRecords].sort((a, b) => b.sortTime - a.sortTime).slice(0, 6)
  }, [allRecords])

  const sourceRows = useMemo(() => {
    const total = allRecords.length
    if (!total) {
      return []
    }

    const grouped = allRecords.reduce((acc, record) => {
      const key = record.sourceLabel || 'Diğer'
      acc[key] = (acc[key] || 0) + 1
      return acc
    }, {})

    return Object.entries(grouped)
      .map(([label, count]) => ({
        label,
        count,
        percent: Math.max(6, Math.round((count / total) * 100)),
      }))
      .sort((a, b) => b.count - a.count)
  }, [allRecords])

  if (loading) {
    return (
      <Card>
        <CardContent sx={{ py: 6 }}>
          <Stack spacing={1.4} alignItems="center" justifyContent="center">
            <CircularProgress size={34} />
            <Typography color="text.secondary">Dashboard verileri hazırlanıyor...</Typography>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Stack spacing={2.2}>
      <Card
        sx={{
          background:
            'linear-gradient(125deg, rgba(31,93,159,0.92) 0%, rgba(15,63,112,0.96) 45%, rgba(217,119,6,0.9) 100%)',
          color: '#fff',
        }}
      >
        <CardContent>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={1.6}
            justifyContent="space-between"
            alignItems={{ xs: 'flex-start', md: 'center' }}
          >
            <Box>
              <Typography variant="overline" sx={{ color: 'rgba(255,255,255,0.72)' }}>
                Soruşturma Görevi
              </Typography>
              <Typography variant="h5" sx={{ mb: 0.6 }}>
                Kayıp Podo: Ankara Vaka Konsolu
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.84)' }}>
                Kişileri gez, kayıtları incele ve beş veri kaynağındaki olayları birleştir.
              </Typography>
            </Box>
            <Button
              variant="contained"
              color="secondary"
              endIcon={<ArrowOutwardRoundedIcon />}
              onClick={() => navigate(ROUTES.EVENT_FLOW)}
              sx={{
                alignSelf: { xs: 'stretch', md: 'auto' },
                backgroundColor: '#fff',
                color: '#10223b',
                '&:hover': {
                  backgroundColor: '#f2f5fb',
                },
              }}
            >
              Olay Akışına Git
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
        }}
      >
        {metricItems.map((item) => (
          <MetricCard
            key={item.title}
            title={item.title}
            value={item.value}
            caption={item.caption}
            tone={item.tone}
          />
        ))}
      </Box>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', xl: '1.15fr minmax(0, 1fr)' },
        }}
      >
        <RecentEventsPanel events={recentEvents} />
        <SourceBreakdownCard sourceRows={sourceRows} />
      </Box>
    </Stack>
  )
}

export default DashboardPage
