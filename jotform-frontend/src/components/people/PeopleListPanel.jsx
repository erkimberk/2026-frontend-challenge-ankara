import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  Box,
  InputAdornment,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

function PeopleListPanel({ people, selectedId, onSelect, searchQuery, onSearch }) {
  return (
    <Paper sx={{ p: 2, height: '100%' }}>
      <Stack spacing={1.6}>
        <Box>
          <Typography variant="h6">Kişi Listesi</Typography>
          <Typography variant="body2" color="text.secondary">
            Veri kaynakları arasında eşleşen kişiler
          </Typography>
        </Box>

        <TextField
          fullWidth
          size="small"
          placeholder="Kişi ara..."
          value={searchQuery}
          onChange={(event) => onSearch(event.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" />
              </InputAdornment>
            ),
          }}
        />

        <List sx={{ p: 0, maxHeight: { xs: 320, md: '56vh' }, overflowY: 'auto' }}>
          {people.map((person) => (
            <ListItemButton
              key={person.id}
              selected={selectedId === person.id}
              onClick={() => onSelect(person.id)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                alignItems: 'flex-start',
              }}
            >
              <ListItemText
                primary={person.displayName}
                secondary={`${person.recordCount} kayıt`}
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </ListItemButton>
          ))}

          {people.length === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ px: 1, py: 2 }}>
              Eşleşen kişi bulunamadı.
            </Typography>
          )}
        </List>
      </Stack>
    </Paper>
  )
}

export default PeopleListPanel
