import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import { Chip, Divider, Paper, Stack, Typography } from '@mui/material'

const getRecordSummary = (record) => {
  if (!record) {
    return ''
  }

  return (
    record.note ||
    record.text ||
    record.tip ||
    [record.senderName, record.recipientName].filter(Boolean).join(' → ') ||
    'Detay yok'
  )
}

function LinkedRecordsPanel({ selectedPerson, relatedRecords }) {
  if (!selectedPerson) {
    return (
      <Paper sx={{ p: 2.2, height: '100%' }}>
        <Typography variant="h6" sx={{ mb: 0.8 }}>
          Bağlı Kayıtlar
        </Typography>
        <Typography color="text.secondary">Listeden bir kişi seçerek bağlı kayıtları görüntüle.</Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 2.2, height: '100%' }}>
      <Stack spacing={1.4}>
        <Stack spacing={0.4}>
          <Typography variant="h6">{selectedPerson.displayName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedPerson.recordCount} bağlı kayıt bulundu
          </Typography>
        </Stack>

        <Divider />

        <Stack spacing={1.2} sx={{ maxHeight: { xs: 'none', md: '62vh' }, overflowY: 'auto', pr: 0.4 }}>
          {relatedRecords.map((record) => (
            <Paper key={record.id} variant="outlined" sx={{ p: 1.4, borderRadius: 2 }}>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                  <Chip size="small" label={record.sourceLabel} color="primary" variant="outlined" />
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <AccessTimeRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {record.timestamp || 'Zaman yok'}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1.2} alignItems="center">
                  <PlaceRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{record.location || 'Konum yok'}</Typography>
                </Stack>

                {record.type === 'message' && (
                  <Typography variant="body2" color="text.secondary">
                    Gönderen: {record.senderName || 'Bilinmiyor'} | Alıcı: {record.recipientName || 'Bilinmiyor'}
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  {getRecordSummary(record)}
                </Typography>
              </Stack>
            </Paper>
          ))}

          {relatedRecords.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Bu kişiye bağlı kayıt bulunamadı.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default LinkedRecordsPanel
