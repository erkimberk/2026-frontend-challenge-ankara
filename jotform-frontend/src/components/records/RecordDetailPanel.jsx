import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import RoomRoundedIcon from '@mui/icons-material/RoomRounded'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import { Box, Chip, Divider, Link, Paper, Stack, Typography } from '@mui/material'

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

function getDurumRengi(level) {
  const value = (level || '').toString().toLowerCase()

  if (value === 'high') {
    return 'error'
  }

  if (value === 'medium') {
    return 'warning'
  }

  if (value === 'low') {
    return 'success'
  }

  return 'default'
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

  const coordinates = parseCoordinates(kayit.coordinates)
  const mapQuery = coordinates ? `${coordinates.lat},${coordinates.lng}` : ''
  const mapEmbedUrl = coordinates
    ? `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&z=15&output=embed`
    : ''
  const mapOpenUrl = coordinates ? `https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}` : ''

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
            <Stack spacing={0.4}>
              <Typography variant="caption" color="text.secondary">
                Aciliyet
              </Typography>
              <Chip
                size="small"
                label={`Aciliyet: ${(kayit.urgency || 'Belirtilmedi').toString()}`}
                color={getDurumRengi(kayit.urgency)}
                sx={{ width: 'fit-content' }}
              />
            </Stack>
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
            <Stack spacing={0.4}>
              <Typography variant="caption" color="text.secondary">
                Güven Seviyesi
              </Typography>
              <Chip
                size="small"
                label={`Güven: ${(kayit.confidence || 'Belirtilmedi').toString()}`}
                color={getDurumRengi(kayit.confidence)}
                sx={{ width: 'fit-content' }}
              />
            </Stack>
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

        <Divider />

        <Stack spacing={1}>
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
            <Typography variant="caption" color="text.secondary">
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
                height: 260,
              }}
            >
              <Box
                component="iframe"
                title="Kayıt Konumu"
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
    </Paper>
  )
}

export default RecordDetailPanel
