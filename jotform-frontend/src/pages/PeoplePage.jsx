import { Card, CardContent, Stack, Typography } from '@mui/material'

function PeoplePage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={0.8}>
          <Typography variant="h6">Kişi Gezgini</Typography>
          <Typography color="text.secondary">
            Bu sayfa kişi odaklı gezinme ve kaynaklar arası kimlik eşlemesini barındıracak.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PeoplePage
