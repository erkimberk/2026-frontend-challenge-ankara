import { Paper, Stack, Typography } from '@mui/material'

function SourceBreakdownCard({ sourceRows }) {
  return (
    <Paper sx={{ p: 2 }}>
      <Stack spacing={1.2}>
        <Typography variant="h6">Kaynak Dağılımı</Typography>
        <Typography variant="body2" color="text.secondary">
          Olayların form kaynaklarına göre dağılımı
        </Typography>

        <Stack spacing={1}>
          {sourceRows.map((row) => (
            <Stack key={row.label} spacing={0.5}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="body2" fontWeight={600}>
                  {row.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {row.count}
                </Typography>
              </Stack>
              <Stack
                sx={{
                  width: '100%',
                  height: 8,
                  borderRadius: 99,
                  overflow: 'hidden',
                  bgcolor: 'rgba(19, 35, 61, 0.08)',
                }}
              >
                <Stack
                  sx={{
                    width: `${row.percent}%`,
                    height: '100%',
                    borderRadius: 99,
                    background: 'linear-gradient(90deg, #1f5d9f 0%, #3d82c2 100%)',
                  }}
                />
              </Stack>
            </Stack>
          ))}

          {sourceRows.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Dağılım için veri yok.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default SourceBreakdownCard
