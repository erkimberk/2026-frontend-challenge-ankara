import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded'
import {
  Alert,
  Autocomplete,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import RecordDetailPanel from '../components/records/RecordDetailPanel'
import RecordListPanel from '../components/records/RecordListPanel'
import { fetchInvestigationBundle } from '../services/investigationService'

const FORM_SECENEKLERI = [
  { key: 'CHECKINS', label: 'Check-in' },
  { key: 'MESSAGES', label: 'Mesajlar' },
  { key: 'SIGHTINGS', label: 'Gözlemler' },
  { key: 'PERSONAL_NOTES', label: 'Kişisel Notlar' },
  { key: 'ANONYMOUS_TIPS', label: 'Anonim İpuçları' },
]

const kayitAramaMetni = (record) => {
  return [
    record.timestamp,
    record.location,
    record.coordinates,
    record.note,
    record.text,
    record.tip,
    record.personName,
    record.senderName,
    record.recipientName,
    record.authorName,
    record.suspectName,
    record.mentionedPeople,
    record.seenWith,
  ]
    .filter(Boolean)
    .join(' ')
    .toLocaleLowerCase('tr-TR')
}

function RecordsPage() {
  const [yukleniyor, setYukleniyor] = useState(true)
  const [hata, setHata] = useState('')
  const [seciliForm, setSeciliForm] = useState('MESSAGES')
  const [kayitlar, setKayitlar] = useState([])
  const [seciliKayitId, setSeciliKayitId] = useState('')
  const [arama, setArama] = useState('')
  const [kisiFiltresi, setKisiFiltresi] = useState('')

  useEffect(() => {
    const yukle = async () => {
      setYukleniyor(true)
      setHata('')

      try {
        const bundle = await fetchInvestigationBundle([seciliForm])
        const sirali = [...bundle.allRecords].sort((a, b) => b.sortTime - a.sortTime)
        setKayitlar(sirali)
        setSeciliKayitId(sirali[0]?.id || '')
      } catch (error) {
        setHata(error?.message || 'Kayıtlar yüklenirken bir hata oluştu.')
      } finally {
        setYukleniyor(false)
      }
    }

    yukle()
  }, [seciliForm])

  const filtreliKayitlar = useMemo(() => {
    const query = arama.trim().toLocaleLowerCase('tr-TR')
    const kisiQuery = kisiFiltresi.trim().toLocaleLowerCase('tr-TR')

    return kayitlar.filter((record) => {
      const matchesText = !query || kayitAramaMetni(record).includes(query)
      if (!matchesText) {
        return false
      }

      if (!kisiQuery) {
        return true
      }

      const peopleText = (record.people || []).join(' ').toLocaleLowerCase('tr-TR')
      return peopleText.includes(kisiQuery)
    })
  }, [kayitlar, arama, kisiFiltresi])

  const kisiSecenekleri = useMemo(() => {
    const unique = new Set(
      kayitlar
        .flatMap((record) => record.people || [])
        .map((name) => name?.toString().trim())
        .filter(Boolean),
    )

    return Array.from(unique).sort((a, b) => a.localeCompare(b, 'tr-TR'))
  }, [kayitlar])

  const seciliKayit = useMemo(
    () => filtreliKayitlar.find((item) => item.id === seciliKayitId) || filtreliKayitlar[0] || null,
    [filtreliKayitlar, seciliKayitId],
  )

  if (yukleniyor) {
    return (
      <Card>
        <CardContent sx={{ py: 6 }}>
          <Stack spacing={1.4} alignItems="center" justifyContent="center">
            <CircularProgress size={34} />
            <Typography color="text.secondary">Kayıtlar yükleniyor...</Typography>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  if (hata) {
    return <Alert severity="error">{hata}</Alert>
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack spacing={1.2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <FilterListRoundedIcon color="primary" />
              <Typography variant="h6">Kayıt Tarayıcısı</Typography>
              <Chip label={`${kayitlar.length} kayıt`} size="small" variant="outlined" />
            </Stack>
            <Typography color="text.secondary">
              Bu ekranda yalnızca seçtiğin formun kayıtları çekilir. Böylece gereksiz API isteği atılmaz.
            </Typography>

            <Autocomplete
              freeSolo
              size="small"
              options={kisiSecenekleri}
              value={kisiFiltresi}
              onInputChange={(_, newInputValue) => setKisiFiltresi(newInputValue)}
              onChange={(_, newValue) => setKisiFiltresi(newValue || '')}
              renderInput={(params) => (
                <TextField {...params} label="Kişiye göre filtrele" placeholder="Örn: Podo" />
              )}
            />

            <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
              {FORM_SECENEKLERI.map((form) => (
                <Chip
                  key={form.key}
                  label={form.label}
                  clickable
                  onClick={() => setSeciliForm(form.key)}
                  color={seciliForm === form.key ? 'primary' : 'default'}
                  variant={seciliForm === form.key ? 'filled' : 'outlined'}
                />
              ))}
            </Stack>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', lg: '420px minmax(0, 1fr)' },
        }}
      >
        <RecordListPanel
          kayitlar={filtreliKayitlar}
          seciliId={seciliKayit?.id || ''}
          onSec={setSeciliKayitId}
          arama={arama}
          onAramaDegis={setArama}
        />
        <RecordDetailPanel kayit={seciliKayit} />
      </Box>
    </Stack>
  )
}

export default RecordsPage
