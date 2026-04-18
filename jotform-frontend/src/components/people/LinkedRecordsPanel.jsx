import { useEffect, useState } from 'react'
import OpenInNewRoundedIcon from '@mui/icons-material/OpenInNewRounded'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import { Box, Chip, Collapse, Divider, Link, Paper, Stack, Typography } from '@mui/material'

const getRecordSummary = (record) => {
  if (!record) {
    return ''
  }

  return (
    record.note ||
    record.text ||
    record.tip ||
    [record.senderName, record.recipientName].filter(Boolean).join(' → ') ||
    'Detay yok'
  )
}

const getStatusChip = (record) => {
  const confidence = (record.confidence || '').toString().toLowerCase()
  const urgency = (record.urgency || '').toString().toLowerCase()

  if (record.type === 'anonymous_tip' && confidence) {
    if (confidence === 'high') {
      return <Chip size="small" label="Güven: High" color="error" />
    }
    if (confidence === 'medium') {
      return <Chip size="small" label="Güven: Medium" color="warning" />
    }
    if (confidence === 'low') {
      return <Chip size="small" label="Güven: Low" color="success" />
    }
  }

  if (record.type === 'message' && urgency) {
    if (urgency === 'high') {
      return <Chip size="small" label="Aciliyet: High" color="error" />
    }
    if (urgency === 'medium') {
      return <Chip size="small" label="Aciliyet: Medium" color="warning" />
    }
    if (urgency === 'low') {
      return <Chip size="small" label="Aciliyet: Low" color="success" />
    }
  }

  return null
}

const getLevelColor = (value) => {
  const level = (value || '').toString().toLowerCase()
  if (level === 'high') {
    return 'error'
  }
  if (level === 'medium') {
    return 'warning'
  }
  if (level === 'low') {
    return 'success'
  }
  return 'default'
}

const parseCoordinates = (rawValue) => {
  if (!rawValue) {
    return null
  }

  const parts = rawValue
    .toString()
    .split(',')
    .map((item) => item.trim())

  if (parts.length !== 2) {
    return null
  }

  const lat = Number(parts[0])
  const lng = Number(parts[1])

  if (Number.isNaN(lat) || Number.isNaN(lng)) {
    return null
  }

  return { lat, lng }
}

const getRecordDetails = (record) => {
  const details = [
    { label: 'Kaynak', value: record.sourceLabel },
    { label: 'Zaman', value: record.timestamp || 'Zaman yok' },
    { label: 'Konum', value: record.location || 'Konum yok' },
    { label: 'Koordinat', value: record.coordinates || 'Koordinat yok' },
    { label: 'Kayıt Zamanı', value: record.submittedAt || 'Belirtilmedi' },
  ]

  if (record.type === 'message') {
    details.push(
      { label: 'Gönderen', value: record.senderName || 'Belirtilmedi' },
      { label: 'Alıcı', value: record.recipientName || 'Belirtilmedi' },
      { label: 'Aciliyet', value: record.urgency || 'Belirtilmedi' },
      { label: 'Mesaj', value: record.text || 'Detay yok' },
    )
  }

  if (record.type === 'checkin') {
    details.push(
      { label: 'Kişi', value: record.personName || 'Belirtilmedi' },
      { label: 'Not', value: record.note || 'Detay yok' },
    )
  }

  if (record.type === 'sighting') {
    details.push(
      { label: 'Görülen Kişi', value: record.personName || 'Belirtilmedi' },
      { label: 'Yanındaki Kişi', value: record.seenWith || 'Belirtilmedi' },
      { label: 'Not', value: record.note || 'Detay yok' },
    )
  }

  if (record.type === 'personal_note') {
    details.push(
      { label: 'Yazar', value: record.authorName || 'Belirtilmedi' },
      { label: 'Bahsedilen Kişiler', value: record.mentionedPeople || 'Belirtilmedi' },
      { label: 'Not', value: record.note || 'Detay yok' },
    )
  }

  if (record.type === 'anonymous_tip') {
    details.push(
      { label: 'Şüpheli', value: record.suspectName || 'Belirtilmedi' },
      { label: 'Güven', value: record.confidence || 'Belirtilmedi' },
      { label: 'İpucu', value: record.tip || 'Detay yok' },
      { label: 'Rapor Tarihi', value: record.submissionDate || 'Belirtilmedi' },
    )
  }

  if (Array.isArray(record.people) && record.people.length > 0) {
    details.push({ label: 'İlgili Kişiler', value: record.people.join(', ') })
  }

  return details
}

function LinkedRecordsPanel({ selectedPerson, relatedRecords }) {
  const [expandedId, setExpandedId] = useState('')

  useEffect(() => {
    setExpandedId('')
  }, [selectedPerson?.id])

  const toggleExpand = (recordId) => {
    setExpandedId((prev) => (prev === recordId ? '' : recordId))
  }

  if (!selectedPerson) {
    return (
      <Paper sx={{ p: 2.2, height: '100%' }}>
        <Typography variant="h6" sx={{ mb: 0.8 }}>
          Bağlı Kayıtlar
        </Typography>
        <Typography color="text.secondary">Listeden bir kişi seçerek bağlı kayıtları görüntüle.</Typography>
      </Paper>
    )
  }

  return (
    <Paper sx={{ p: 2.2, height: '100%' }}>
      <Stack spacing={1.4}>
        <Stack spacing={0.4}>
          <Typography variant="h6">{selectedPerson.displayName}</Typography>
          <Typography variant="body2" color="text.secondary">
            {selectedPerson.recordCount} bağlı kayıt bulundu
          </Typography>
        </Stack>

        <Divider />

        <Stack spacing={1.2} sx={{ maxHeight: { xs: 'none', md: '62vh' }, overflowY: 'auto', pr: 0.4 }}>
          {relatedRecords.map((record) => {
            const isExpanded = expandedId === record.id
            const details = getRecordDetails(record)
            const coordinates = parseCoordinates(record.coordinates)
            const mapQuery = coordinates ? `${coordinates.lat},${coordinates.lng}` : ''
            const mapEmbedUrl = coordinates
              ? `https://www.google.com/maps?q=loc:${encodeURIComponent(mapQuery)}&z=15&output=embed`
              : ''
            const mapOpenUrl = coordinates ? `https://www.google.com/maps?q=loc:${encodeURIComponent(mapQuery)}` : ''

            return (
              <Paper
                key={record.id}
                variant="outlined"
                onClick={() => toggleExpand(record.id)}
                sx={{
                  p: 1.4,
                  borderRadius: 2,
                  cursor: 'pointer',
                  borderColor: isExpanded ? 'primary.main' : 'divider',
                  backgroundColor: isExpanded ? 'rgba(31, 93, 159, 0.06)' : 'background.paper',
                }}
              >
                <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                  <Stack direction="row" spacing={0.8} alignItems="center" sx={{ flexWrap: 'wrap' }}>
                    <Chip size="small" label={record.sourceLabel} color="primary" variant="outlined" />
                    {getStatusChip(record)}
                  </Stack>
                  <Stack direction="row" spacing={1.2} alignItems="center">
                    <AccessTimeRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {record.timestamp || 'Zaman yok'}
                    </Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1.2} alignItems="center">
                  <PlaceRoundedIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                  <Typography variant="body2">{record.location || 'Konum yok'}</Typography>
                </Stack>

                {record.type === 'message' && (
                  <Typography variant="body2" color="text.secondary">
                    Gönderen: {record.senderName || 'Bilinmiyor'} | Alıcı: {record.recipientName || 'Bilinmiyor'}
                  </Typography>
                )}

                <Typography variant="body2" color="text.secondary">
                  {getRecordSummary(record)}
                </Typography>

                  <Typography variant="caption" color="text.secondary">
                    {isExpanded ? 'Detayları gizle' : 'Detayları görmek için tıkla'}
                  </Typography>

                  <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                    <Divider sx={{ my: 1 }} />
                    <Stack spacing={1}>
                      {details.map((detail) => (
                        <Stack key={`${record.id}-${detail.label}`} spacing={0.25}>
                          <Typography variant="caption" color="text.secondary">
                            {detail.label}
                          </Typography>
                          {detail.label === 'Aciliyet' || detail.label === 'Güven' ? (
                            <Chip
                              size="small"
                              label={detail.value}
                              color={getLevelColor(detail.value)}
                              sx={{ width: 'fit-content' }}
                            />
                          ) : (
                            <Typography variant="body2">{detail.value}</Typography>
                          )}
                        </Stack>
                      ))}

                      <Divider />

                      <Stack spacing={0.8} onClick={(event) => event.stopPropagation()}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            Harita
                          </Typography>
                          {coordinates && (
                            <Link
                              href={mapOpenUrl}
                              target="_blank"
                              rel="noreferrer"
                              underline="hover"
                              sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.6 }}
                            >
                              Google Maps'te aç
                              <OpenInNewRoundedIcon sx={{ fontSize: 16 }} />
                            </Link>
                          )}
                        </Stack>

                        {coordinates ? (
                          <Box
                            sx={{
                              borderRadius: 2,
                              overflow: 'hidden',
                              border: '1px solid',
                              borderColor: 'divider',
                              height: 220,
                            }}
                          >
                            <Box
                              component="iframe"
                              title={`Kayıt Konumu ${record.id}`}
                              src={mapEmbedUrl}
                              width="100%"
                              height="100%"
                              sx={{ border: 0, display: 'block' }}
                              loading="lazy"
                              referrerPolicy="no-referrer-when-downgrade"
                            />
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            Harita için geçerli koordinat bulunamadı.
                          </Typography>
                        )}
                      </Stack>
                    </Stack>
                  </Collapse>
              </Stack>
              </Paper>
            )
          })}

          {relatedRecords.length === 0 && (
            <Typography variant="body2" color="text.secondary">
              Bu kişiye bağlı kayıt bulunamadı.
            </Typography>
          )}
        </Stack>
      </Stack>
    </Paper>
  )
}

export default LinkedRecordsPanel
