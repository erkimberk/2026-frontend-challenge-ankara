import { fetchInvestigationDataByForms } from './api'
import { normalizeSubmissions } from './dataService'
import { FORM_IDS } from './api'

const SOURCE_LABELS = {
  checkin: 'Check-in',
  message: 'Mesaj',
  sighting: 'Gözlem',
  personal_note: 'Kişisel Not',
  anonymous_tip: 'Anonim İpucu',
}

const DEFAULT_FORM_KEYS = [
  'CHECKINS',
  'MESSAGES',
  'SIGHTINGS',
  'PERSONAL_NOTES',
  'ANONYMOUS_TIPS',
]

const normalizeName = (value = '') => {
  return value
    .toString()
    .trim()
    .toLocaleLowerCase('tr-TR')
    .replace(/[_.,;:!?()\[\]{}]/g, ' ')
    .replace(/\s+/g, ' ')
}

const tokenizeNames = (rawValue) => {
  if (!rawValue) {
    return []
  }

  return rawValue
    .toString()
    .split(/,|\n|;|\//)
    .map((item) => item.trim())
    .filter(Boolean)
}

const parseTimestamp = (value) => {
  if (!value) {
    return null
  }

  const match = value.match(/^(\d{2})-(\d{2})-(\d{4})\s+(\d{2}):(\d{2})$/)
  if (!match) {
    return null
  }

  const [, day, month, year, hour, minute] = match
  return new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute))
}

const extractPeopleFromRecord = (record) => {
  const candidates = []

  if (record.personName) {
    candidates.push(record.personName)
  }

  if (record.senderName) {
    candidates.push(record.senderName)
  }

  if (record.recipientName) {
    candidates.push(record.recipientName)
  }

  if (record.authorName) {
    candidates.push(record.authorName)
  }

  if (record.seenWith) {
    candidates.push(record.seenWith)
  }

  if (record.suspectName) {
    candidates.push(record.suspectName)
  }

  if (record.mentionedPeople) {
    candidates.push(...tokenizeNames(record.mentionedPeople))
  }

  return candidates
}

const toUnifiedRecord = (record, formKey) => {
  const people = extractPeopleFromRecord(record)
  const parsedDate = parseTimestamp(record.timestamp)

  return {
    ...record,
    id: `${formKey}-${record.submittedAt}-${Math.random().toString(36).slice(2, 8)}`,
    source: formKey,
    sourceLabel: SOURCE_LABELS[record.type] || formKey,
    people,
    peopleNormalized: people.map((name) => normalizeName(name)).filter(Boolean),
    sortTime: parsedDate ? parsedDate.getTime() : 0,
  }
}

const isCloseAlias = (left, right) => {
  if (!left || !right) {
    return false
  }

  if (left === right) {
    return true
  }

  if (left.length >= 3 && right.includes(left)) {
    return true
  }

  if (right.length >= 3 && left.includes(right)) {
    return true
  }

  return false
}

const mergePersonGroups = (peopleMap) => {
  const groups = []

  for (const person of peopleMap.values()) {
    const existingGroup = groups.find((group) =>
      group.aliases.some((alias) => person.aliases.some((personAlias) => isCloseAlias(alias, personAlias))),
    )

    if (!existingGroup) {
      groups.push({
        id: person.id,
        displayName: person.displayName,
        aliases: [...person.aliases],
        records: [...person.records],
      })
      continue
    }

    existingGroup.aliases = Array.from(new Set([...existingGroup.aliases, ...person.aliases]))
    existingGroup.records = Array.from(new Set([...existingGroup.records, ...person.records]))

    if (person.records.length > existingGroup.records.length) {
      existingGroup.displayName = person.displayName
    }
  }

  return groups
}

export const fetchInvestigationBundle = async (formKeys = DEFAULT_FORM_KEYS) => {
  const raw = await fetchInvestigationDataByForms(formKeys)

  const allRecords = [
    ...normalizeSubmissions(raw.checkins || [], FORM_IDS.CHECKINS).map((item) =>
      toUnifiedRecord(item, 'checkins'),
    ),
    ...normalizeSubmissions(raw.messages || [], FORM_IDS.MESSAGES).map((item) =>
      toUnifiedRecord(item, 'messages'),
    ),
    ...normalizeSubmissions(raw.sightings || [], FORM_IDS.SIGHTINGS).map((item) =>
      toUnifiedRecord(item, 'sightings'),
    ),
    ...normalizeSubmissions(raw.personalNotes || [], FORM_IDS.PERSONAL_NOTES).map((item) =>
      toUnifiedRecord(item, 'personal-notes'),
    ),
    ...normalizeSubmissions(raw.anonymousTips || [], FORM_IDS.ANONYMOUS_TIPS).map((item) =>
      toUnifiedRecord(item, 'anonymous-tips'),
    ),
  ]

  const peopleMap = new Map()

  for (const record of allRecords) {
    for (let i = 0; i < record.people.length; i += 1) {
      const originalName = record.people[i]
      const normalizedName = record.peopleNormalized[i]

      if (!normalizedName) {
        continue
      }

      const existing = peopleMap.get(normalizedName)
      if (existing) {
        existing.records.push(record.id)
        if (!existing.aliases.includes(normalizedName)) {
          existing.aliases.push(normalizedName)
        }
      } else {
        peopleMap.set(normalizedName, {
          id: normalizedName,
          displayName: originalName,
          aliases: [normalizedName],
          records: [record.id],
        })
      }
    }
  }

  const mergedPeople = mergePersonGroups(peopleMap)
    .map((person) => ({
      ...person,
      records: Array.from(new Set(person.records)),
      recordCount: Array.from(new Set(person.records)).length,
    }))
    .sort((a, b) => b.recordCount - a.recordCount || a.displayName.localeCompare(b.displayName, 'tr'))

  const recordsById = Object.fromEntries(allRecords.map((record) => [record.id, record]))

  return {
    people: mergedPeople,
    recordsById,
    allRecords,
  }
}
