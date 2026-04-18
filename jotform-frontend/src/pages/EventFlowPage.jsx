import { Card, CardContent, Stack, Typography } from '@mui/material'

function EventFlowPage() {
  return (
    <Card>
      <CardContent>
        <Stack spacing={0.8}>
          <Typography variant="h6">Olay Akışı</Typography>
          <Typography color="text.secondary">
            Bu sayfa Podo etrafındaki kronolojik akışı ve ilişkili kayıtları görselleştirecek.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default EventFlowPage
