import HubRoundedIcon from '@mui/icons-material/HubRounded'
import { Alert, Box, Card, CardContent, Chip, CircularProgress, Stack, Typography } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import LinkedRecordsPanel from '../components/people/LinkedRecordsPanel'
import PeopleListPanel from '../components/people/PeopleListPanel'
import { fetchInvestigationBundle } from '../services/investigationService'

function PeoplePage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [people, setPeople] = useState([])
  const [recordsById, setRecordsById] = useState({})
  const [selectedPersonId, setSelectedPersonId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      setError('')

      try {
        const bundle = await fetchInvestigationBundle([
          'CHECKINS',
          'MESSAGES',
          'SIGHTINGS',
          'PERSONAL_NOTES',
          'ANONYMOUS_TIPS',
        ])
        setPeople(bundle.people)
        setRecordsById(bundle.recordsById)

        if (bundle.people.length > 0) {
          setSelectedPersonId(bundle.people[0].id)
        }
      } catch (fetchError) {
        setError(fetchError?.message || 'Kişi verileri yüklenirken bir hata oluştu.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  const filteredPeople = useMemo(() => {
    const query = searchQuery.trim().toLocaleLowerCase('tr-TR')
    if (!query) {
      return people
    }

    return people.filter((person) => {
      const display = person.displayName.toLocaleLowerCase('tr-TR')
      const aliasesJoined = person.aliases.join(' ')
      return display.includes(query) || aliasesJoined.includes(query)
    })
  }, [people, searchQuery])

  const selectedPerson = useMemo(
    () => people.find((person) => person.id === selectedPersonId) || null,
    [people, selectedPersonId],
  )

  const relatedRecords = useMemo(() => {
    if (!selectedPerson) {
      return []
    }

    return selectedPerson.records
      .map((recordId) => recordsById[recordId])
      .filter(Boolean)
      .sort((a, b) => b.sortTime - a.sortTime)
  }, [selectedPerson, recordsById])

  if (loading) {
    return (
      <Card>
        <CardContent sx={{ py: 6 }}>
          <Stack spacing={1.4} alignItems="center" justifyContent="center">
            <CircularProgress size={34} />
            <Typography color="text.secondary">Kişi bağlantıları hazırlanıyor...</Typography>
          </Stack>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>
  }

  return (
    <Stack spacing={2}>
      <Card>
        <CardContent>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <HubRoundedIcon color="primary" />
              <Typography variant="h6">Kişi Gezgini</Typography>
              <Chip label={`${people.length} eşleşen profil`} size="small" variant="outlined" />
            </Stack>
            <Typography color="text.secondary">
              Bir kişi seçildiğinde check-in, mesaj, gözlem, not ve anonim ipucu kaynaklarındaki bağlı kayıtları birlikte görüntüleyebilirsin.
            </Typography>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: { xs: '1fr', lg: '340px minmax(0, 1fr)' },
        }}
      >
        <PeopleListPanel
          people={filteredPeople}
          selectedId={selectedPersonId}
          onSelect={setSelectedPersonId}
          searchQuery={searchQuery}
          onSearch={setSearchQuery}
        />
        <LinkedRecordsPanel selectedPerson={selectedPerson} relatedRecords={relatedRecords} />
      </Box>
    </Stack>
  )
}

export default PeoplePage
