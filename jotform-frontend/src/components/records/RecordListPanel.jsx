import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  Chip,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

function getKisaOzet(record) {
  return record.note || record.text || record.tip || 'Detay yok'
}

function getKisiSatiri(record) {
  if (record.type === 'message') {
    return `Gönderen: ${record.senderName || 'Bilinmiyor'} | Alıcı: ${record.recipientName || 'Bilinmiyor'}`
  }

  if (record.type === 'checkin') {
    return `Kişi: ${record.personName || 'Bilinmiyor'}`
  }

  if (record.type === 'sighting') {
    return `Görülen: ${record.personName || 'Bilinmiyor'} | Yanında: ${record.seenWith || 'Bilinmiyor'}`
  }

  if (record.type === 'personal_note') {
    return `Yazar: ${record.authorName || 'Bilinmiyor'} | Bahsedilen: ${record.mentionedPeople || 'Yok'}`
  }

  if (record.type === 'anonymous_tip') {
    return `Şüpheli: ${record.suspectName || 'Belirtilmedi'}`
  }

  return 'Kişi bilgisi yok'
}

function getSeviyeRozeti(record) {
  const confidence = (record.confidence || '').toString().toLowerCase()
  const urgency = (record.urgency || '').toString().toLowerCase()

  if (record.type === 'anonymous_tip' && confidence) {
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

  if (record.type === 'message' && urgency) {
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

function RecordListPanel({ kayitlar, seciliId, onSec, arama, onAramaDegis }) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Stack spacing={1.6}>
        <TextField
          fullWidth
          size="small"
          placeholder="Kayıtlarda ara..."
          value={arama}
          onChange={(event) => onAramaDegis(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ p: 0, maxHeight: { xs: 320, md: '64vh' }, overflowY: 'auto' }}>
          {kayitlar.map((record) => (
            <ListItemButton
              key={record.id}
              selected={seciliId === record.id}
              onClick={() => onSec(record.id)}
              sx={{
                mb: 0.8,
                borderRadius: 2,
                alignItems: 'flex-start',
                border: '1px solid',
                borderColor: 'rgba(19, 35, 61, 0.08)',
                '&:hover': {
                  borderColor: 'rgba(31, 93, 159, 0.35)',
                  backgroundColor: 'rgba(31, 93, 159, 0.05)',
                },
                '&.Mui-selected': {
                  borderColor: 'rgba(31, 93, 159, 0.45)',
                  backgroundColor: 'rgba(31, 93, 159, 0.1)',
                },
              }}
            >
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ flexWrap: 'wrap', rowGap: 0.7 }}>
                    <Typography variant="body2" fontWeight={600}>
                      {record.timestamp || 'Zaman yok'}
                    </Typography>
                    <Chip size="small" label={record.sourceLabel} variant="outlined" />
                    {getSeviyeRozeti(record)}
                  </Stack>
                }
                secondary={
                  <Box sx={{ mt: 0.6 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {record.location || 'Konum yok'}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.25 }}>
                      {getKisiSatiri(record)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {getKisaOzet(record)}
                    </Typography>
                  </Box>
                }
              />
            </ListItemButton>
          ))}

          {kayitlar.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 1, py: 2 }}>
              Aramaya uygun kayıt bulunamadı.
            </Typography>
          )}
        </List>
      </Stack>
    </Paper>
  )
}

export default RecordListPanel
