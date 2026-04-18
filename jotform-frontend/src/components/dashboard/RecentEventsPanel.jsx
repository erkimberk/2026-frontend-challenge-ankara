import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import { Chip, Paper, Stack, Typography } from '@mui/material'

function getEventText(event) {
  return event.note || event.text || event.tip || 'Detay yok'
}

function RecentEventsPanel({ events }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1.2}>
        <Typography variant="h6">Son Olaylar</Typography>
        <Typography variant="body2" color="text.secondary">
          Zaman akışındaki en güncel kayıtlar
        </Typography>

        <Stack spacing={1}>
          {events.map((event) => (
            <Paper key={event.id} variant="outlined" sx={{ p: 1.2, borderRadius: 2 }}>
              <Stack spacing={0.6}>
                <Stack direction="row" spacing={0.8} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                  <Chip size="small" label={event.sourceLabel} variant="outlined" color="primary" />
                  <Stack direction="row" spacing={0.7} alignItems="center">
                    <AccessTimeRoundedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {event.timestamp || 'Zaman yok'}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={0.7} alignItems="center">
                  <PlaceRoundedIcon sx={{ fontSize: 15, color: 'text.secondary' }} />
                  <Typography variant="caption" color="text.secondary" noWrap>
                    {event.location || 'Konum yok'}
                  </Typography>
                </Stack>

                <Typography variant="body2" noWrap>
                  {getEventText(event)}
                </Typography>
              </Stack>
            </Paper>
          ))}

          {events.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Henüz olay kaydı yok.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default RecentEventsPanel
