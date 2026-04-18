import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import {
  Alert,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  InputAdornment,
  Link,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { useEffect, useMemo, useState } from 'react'
import EventTimelineList from '../components/timeline/EventTimelineList'
import { fetchInvestigationBundle } from '../services/investigationService'

const FORM_SECENEKLERI = [
  { key: 'ALL', label: 'Tümü' },
  { key: 'CHECKINS', label: 'Check-in' },
  { key: 'MESSAGES', label: 'Mesajlar' },
  { key: 'SIGHTINGS', label: 'Gözlemler' },
  { key: 'PERSONAL_NOTES', label: 'Kişisel Notlar' },
  { key: 'ANONYMOUS_TIPS', label: 'Anonim İpuçları' },
]

function getDetayIcerik(event) {
  return event?.note || event?.text || event?.tip || 'Detay yok'
}

function getEventAramaMetni(event) {
  return [
    event.timestamp,
    event.location,
    event.note,
    event.text,
    event.tip,
    event.personName,
    event.senderName,
    event.recipientName,
    event.authorName,
    event.suspectName,
    event.mentionedPeople,
    event.seenWith,
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('tr-TR')
}

function parseCoordinates(rawValue) {
  if (!rawValue) {
    return null
  }

  const parts = rawValue
    .toString()
    .split(',')
    .map((item) => item.trim())

  if (parts.length !== 2) {
    return null
  }

  const lat = Number(parts[0])
  const lng = Number(parts[1])

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return null
  }

  return { lat, lng }
}

function EventFlowPage() {
  const [yukleniyor, setYukleniyor] = useState(true)
  const [hata, setHata] = useState('')
  const [events, setEvents] = useState([])
  const [seciliForm, setSeciliForm] = useState('ALL')
  const [arama, setArama] = useState('')
  const [seciliEventId, setSeciliEventId] = useState('')

  useEffect(() => {
    const yukle = async () => {
      setYukleniyor(true)
      setHata('')

      try {
        const keys = seciliForm === 'ALL' ? undefined : [seciliForm]
        const bundle = await fetchInvestigationBundle(keys)
        const sirali = [...bundle.allRecords].sort((a, b) => a.sortTime - b.sortTime)
        setEvents(sirali)
        setSeciliEventId(sirali[sirali.length - 1]?.id || '')
      } catch (error) {
        setHata(error?.message || 'Olay akışı yüklenirken bir hata oluştu.')
      } finally {
        setYukleniyor(false)
      }
    }

    yukle()
  }, [seciliForm])

  const filtreliEvents = useMemo(() => {
    const query = arama.trim().toLocaleLowerCase('tr-TR')
    if (!query) {
      return events
    }

    return events.filter((event) => getEventAramaMetni(event).includes(query))
  }, [events, arama])

  const seciliEvent = useMemo(
    () => filtreliEvents.find((item) => item.id === seciliEventId) || filtreliEvents[filtreliEvents.length - 1] || null,
    [filtreliEvents, seciliEventId],
  )

  const coordinates = parseCoordinates(seciliEvent?.coordinates)
  const mapQuery = coordinates ? `${coordinates.lat},${coordinates.lng}` : ''
  const mapEmbedUrl = coordinates
    ? `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`
    : ''
  const mapOpenUrl = coordinates ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}` : ''

  if (yukleniyor) {
    return (
      <Card>
        <CardContent sx={{ py: 6 }}>
          <Stack spacing={1.4} alignItems="center" justifyContent="center">
            <CircularProgress size={34} />
            <Typography color="text.secondary">Olay akışı hazırlanıyor...</Typography>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  if (hata) {
    return <Alert severity="error">{hata}</Alert>
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack spacing={1.2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TimelineRoundedIcon color="primary" />
              <Typography variant="h6">Olay Akışı</Typography>
              <Chip label={`${events.length} olay`} size="small" variant="outlined" />
            </Stack>
            <Typography color="text.secondary">
              Olayları zaman sırasıyla incele, kişi ve kayıt ilişkilerini takip et, kritik geçiş anlarını hızlıca yakala.
            </Typography>

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {FORM_SECENEKLERI.map((form) => (
                <Chip
                  key={form.key}
                  label={form.label}
                  clickable
                  onClick={() => setSeciliForm(form.key)}
                  color={seciliForm === form.key ? 'primary' : 'default'}
                  variant={seciliForm === form.key ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>

            <TextField
              fullWidth
              size="small"
              placeholder="Kişi, metin veya konum ara..."
              value={arama}
              onChange={(event) => setArama(event.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', xl: '1.2fr minmax(0, 1fr)' },
        }}
      >
        <EventTimelineList events={filtreliEvents} selectedId={seciliEvent?.id || ''} onSelect={setSeciliEventId} />

        <Card>
          <CardContent>
            {seciliEvent ? (
              <Stack spacing={1.1}>
                <Typography variant="h6">Seçili Olay</Typography>
                <Chip label={seciliEvent.sourceLabel} color="primary" variant="outlined" sx={{ width: 'fit-content' }} />

                <Divider />

                <Typography variant="body2" color="text.secondary">
                  Zaman
                </Typography>
                <Typography variant="body2">{seciliEvent.timestamp || 'Zaman yok'}</Typography>

                <Typography variant="body2" color="text.secondary">
                  Konum
                </Typography>
                <Typography variant="body2">{seciliEvent.location || 'Konum yok'}</Typography>

                <Typography variant="body2" color="text.secondary">
                  Koordinat
                </Typography>
                <Typography variant="body2">{seciliEvent.coordinates || 'Koordinat yok'}</Typography>

                {seciliEvent.type === 'message' && (
                  <>
                    <Typography variant="body2" color="text.secondary">
                      Mesaj Akışı
                    </Typography>
                    <Typography variant="body2">
                      {seciliEvent.senderName || 'Bilinmiyor'} → {seciliEvent.recipientName || 'Bilinmiyor'}
                    </Typography>
                  </>
                )}

                <Typography variant="body2" color="text.secondary">
                  İçerik
                </Typography>
                <Typography variant="body2">{getDetayIcerik(seciliEvent)}</Typography>

                <Divider />

                <Stack spacing={1}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                    <Typography variant="body2" color="text.secondary">
                      Harita
                    </Typography>

                    {coordinates && (
                      <Link
                        href={mapOpenUrl}
                        target="_blank"
                        rel="noreferrer"
                        underline="hover"
                        sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 }}
                      >
                        Google Maps'te aç
                        <OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
                      </Link>
                    )}
                  </Stack>

                  {coordinates ? (
                    <Box
                      sx={{
                        borderRadius: 2,
                        overflow: 'hidden',
                        border: '1px solid',
                        borderColor: 'divider',
                        height: 250,
                      }}
                    >
                      <Box
                        component="iframe"
                        title="Seçili Olay Konumu"
                        src={mapEmbedUrl}
                        width="100%"
                        height="100%"
                        sx={{ border: 0, display: 'block' }}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </Box>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Harita gösterimi için geçerli koordinat bulunamadı.
                    </Typography>
                  )}
                </Stack>
              </Stack>
            ) : (
              <Typography color="text.secondary">Detay için soldan bir olay seç.</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default EventFlowPage
