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
              }}
            >
              <ListItemText
                primary={
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" fontWeight={600}>
                      {record.timestamp || 'Zaman yok'}
                    </Typography>
                    <Chip size="small" label={record.sourceLabel} variant="outlined" />
                  </Stack>
                }
                secondary={
                  <Box sx={{ mt: 0.6 }}>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                      {record.location || 'Konum yok'}
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
