import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import { Box, Chip, Paper, Stack, Typography } from '@mui/material'

function getKisaIcerik(event) {
  return event.note || event.text || event.tip || 'Detay yok'
}

function getKisiSatiri(event) {
  if (event.type === 'message') {
    return `Gönderen: ${event.senderName || 'Bilinmiyor'} | Alıcı: ${event.recipientName || 'Bilinmiyor'}`
  }

  if (event.type === 'checkin') {
    return `Kişi: ${event.personName || 'Bilinmiyor'}`
  }

  if (event.type === 'sighting') {
    return `Görülen: ${event.personName || 'Bilinmiyor'} | Yanında: ${event.seenWith || 'Bilinmiyor'}`
  }

  if (event.type === 'personal_note') {
    return `Yazar: ${event.authorName || 'Bilinmiyor'} | Bahsedilen: ${event.mentionedPeople || 'Yok'}`
  }

  if (event.type === 'anonymous_tip') {
    return `Şüpheli: ${event.suspectName || 'Belirtilmedi'}`
  }

  return 'Kişi bilgisi yok'
}

function getDurumRozeti(event) {
  const confidence = (event.confidence || '').toString().toLowerCase()
  const urgency = (event.urgency || '').toString().toLowerCase()

  if (event.type === 'anonymous_tip' && confidence) {
    if (confidence === 'high') {
      return <Chip size="small" label="Güven: High" color="error" />
    }
    if (confidence === 'medium') {
      return <Chip size="small" label="Güven: Medium" color="warning" />
    }
    if (confidence === 'low') {
      return <Chip size="small" label="Güven: Low" color="success" />
    }
  }

  if (event.type === 'message' && urgency) {
    if (urgency === 'high') {
      return <Chip size="small" label="Aciliyet: High" color="error" />
    }
    if (urgency === 'medium') {
      return <Chip size="small" label="Aciliyet: Medium" color="warning" />
    }
    if (urgency === 'low') {
      return <Chip size="small" label="Aciliyet: Low" color="success" />
    }
  }

  return null
}

function EventTimelineList({ events, selectedId, onSelect }) {
  return (
    <Stack spacing={1.2} sx={{ maxHeight: { xs: 'none', lg: '72vh' }, overflowY: 'auto', pr: 0.5 }}>
      {events.map((event) => {
        const isSelected = selectedId === event.id

        return (
          <Paper
            key={event.id}
            onClick={() => onSelect(event.id)}
            sx={{
              p: 1.2,
              cursor: 'pointer',
              border: '1px solid',
              borderColor: isSelected ? 'primary.main' : 'rgba(19, 35, 61, 0.1)',
              backgroundColor: isSelected ? 'rgba(31, 93, 159, 0.08)' : 'background.paper',
              transition: 'all 0.2s ease',
              '&:hover': {
                borderColor: 'rgba(31, 93, 159, 0.45)',
                transform: 'translateY(-1px)',
              },
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: '14px minmax(0, 1fr)', columnGap: 0.9 }}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    mt: 0.7,
                    backgroundColor: isSelected ? 'primary.main' : 'rgba(31, 93, 159, 0.5)',
                    boxShadow: isSelected ? '0 0 0 4px rgba(31, 93, 159, 0.18)' : 'none',
                  }}
                />
              </Box>

              <Stack spacing={0.65}>
                <Stack direction="row" spacing={0.7} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                  <Chip size="small" label={event.sourceLabel} variant="outlined" color="primary" />
                  {getDurumRozeti(event)}
                </Stack>

                <Stack direction="row" spacing={0.9} alignItems="center">
                  <AccessTimeRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary">
                    {event.timestamp || 'Zaman yok'}
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={0.9} alignItems="center">
                  <PlaceRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {event.location || 'Konum yok'}
                  </Typography>
                </Stack>

                <Typography variant="caption" color="text.secondary">
                  {getKisiSatiri(event)}
                </Typography>

                <Typography variant="body2" color="text.primary" noWrap>
                  {getKisaIcerik(event)}
                </Typography>
              </Stack>
            </Box>
          </Paper>
        )
      })}

      {events.length === 0 && (
        <Paper sx={{ p: 2.2 }}>
          <Typography variant="body2" color="text.secondary">
            Seçili filtrelere uygun olay bulunamadı.
          </Typography>
        </Paper>
      )}
    </Stack>
  )
}

export default EventTimelineList
