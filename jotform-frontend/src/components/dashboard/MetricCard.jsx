import { Card, CardContent, Stack, Typography } from '@mui/material'

function MetricCard({ title, value, caption, tone = 'primary.main' }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {title}
        </Typography>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-end" spacing={1}>
          <Typography variant="h4" sx={{ color: tone }}>
            {value}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {caption}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MetricCard
