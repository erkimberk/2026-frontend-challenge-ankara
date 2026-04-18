import { Card, CardContent, Stack, Typography } from '@mui/material'

function RecordsPage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={0.8}>
          <Typography variant="h6">Kayıt Tarayıcısı</Typography>
          <Typography color="text.secondary">
            Bu sayfa checkin, mesaj, gözlem, kişisel not ve anonim ipuçlarından filtrelenebilir kayıtları içerecek.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default RecordsPage
