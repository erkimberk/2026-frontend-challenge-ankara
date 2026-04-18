import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded'
import HubRoundedIcon from '@mui/icons-material/HubRounded'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import MetricCard from '../components/dashboard/MetricCard'

const metricItems = [
  {
    title: 'Eşleşen Profiller',
    value: '--',
    caption: 'Kaynaklar arası kimlik',
    tone: 'primary.main',
  },
  {
    title: 'Zaman Akışı Olayları',
    value: '--',
    caption: 'Zamana göre sıralı',
    tone: 'secondary.main',
  },
  {
    title: 'Açık İpuçları',
    value: '--',
    caption: 'Güven skoruna göre',
    tone: '#0f766e',
  },
]

function DashboardPage() {
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
              sx={{
                alignSelf: { xs: 'stretch', md: 'auto' },
                backgroundColor: '#fff',
                color: '#10223b',
                '&:hover': {
                  backgroundColor: '#f2f5fb',
                },
              }}
            >
              Soruşturmayı Başlat
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
          gridTemplateColumns: { xs: '1fr', xl: '1.2fr 1fr' },
        }}
      >
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 0.8 }}>
              Kişi Gezintisi
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1.8 }}>
              Sonraki committe arama yapılabilir kişi paneli ve bağlı kayıt listesi eklenecek.
            </Typography>
            <Stack direction="row" alignItems="center" spacing={1}>
              <HubRoundedIcon color="primary" fontSize="small" />
              <Typography variant="body2" color="text.secondary">
                Kimlik eşleme motoru checkin, gözlem, not ve ipuçlarındaki takma adları birleştirecek.
              </Typography>
            </Stack>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 0.8 }}>
              Olay Akışı
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1.8 }}>
              Zaman çizelgesi ve kayıt detay paneli bir sonraki iterasyonda eklenecek.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Plan: bir kişi veya kayıt seçildiğinde ilişkili tüm detaylar anında gösterilecek.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Stack>
  )
}

export default DashboardPage
