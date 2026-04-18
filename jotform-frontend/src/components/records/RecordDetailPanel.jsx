import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import RoomRoundedIcon from '@mui/icons-material/RoomRounded'
import { Chip, Divider, Paper, Stack, Typography } from '@mui/material'

function BilgiSatırı({ etiket, değer }) {
  return (
    <Stack spacing={0.4}>
      <Typography variant="caption" color="text.secondary">
        {etiket}
      </Typography>
      <Typography variant="body2">{değer || 'Belirtilmedi'}</Typography>
    </Stack>
  )
}

function RecordDetailPanel({ kayit }) {
  if (!kayit) {
    return (
      <Paper sx={{ p: 2.2, height: '100%' }}>
        <Typography variant="h6" sx={{ mb: 0.8 }}>
          Kayıt Detayı
        </Typography>
        <Typography color="text.secondary">Listeden bir kayıt seçerek detayları görüntüle.</Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 2.2, height: '100%' }}>
      <Stack spacing={1.6}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
          <Typography variant="h6">Kayıt Detayı</Typography>
          <Chip size="small" label={kayit.sourceLabel} color="primary" variant="outlined" />
        </Stack>

        <Divider />

        <Stack spacing={1.2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <AccessTimeRoundedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
            <Typography variant="body2">{kayit.timestamp || 'Zaman yok'}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <PlaceRoundedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
            <Typography variant="body2">{kayit.location || 'Konum yok'}</Typography>
          </Stack>

          <Stack direction="row" spacing={1} alignItems="center">
            <RoomRoundedIcon sx={{ fontSize: 17, color: 'text.secondary' }} />
            <Typography variant="body2">{kayit.coordinates || 'Koordinat yok'}</Typography>
          </Stack>
        </Stack>

        {kayit.type === 'message' && (
          <>
            <Divider />
            <BilgiSatırı etiket="Gönderen" değer={kayit.senderName} />
            <BilgiSatırı etiket="Alıcı" değer={kayit.recipientName} />
            <BilgiSatırı etiket="Aciliyet" değer={kayit.urgency} />
          </>
        )}

        {kayit.type === 'checkin' && (
          <>
            <Divider />
            <BilgiSatırı etiket="Kişi" değer={kayit.personName} />
          </>
        )}

        {kayit.type === 'sighting' && (
          <>
            <Divider />
            <BilgiSatırı etiket="Görülen Kişi" değer={kayit.personName} />
            <BilgiSatırı etiket="Yanındaki Kişi" değer={kayit.seenWith} />
          </>
        )}

        {kayit.type === 'personal_note' && (
          <>
            <Divider />
            <BilgiSatırı etiket="Yazar" değer={kayit.authorName} />
            <BilgiSatırı etiket="Bahsedilen Kişiler" değer={kayit.mentionedPeople} />
          </>
        )}

        {kayit.type === 'anonymous_tip' && (
          <>
            <Divider />
            <BilgiSatırı etiket="Şüpheli" değer={kayit.suspectName} />
            <BilgiSatırı etiket="Güven" değer={kayit.confidence} />
          </>
        )}

        <Divider />

        <Stack spacing={0.6}>
          <Typography variant="caption" color="text.secondary">
            İçerik
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {kayit.note || kayit.text || kayit.tip || 'Detay yok'}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default RecordDetailPanel
