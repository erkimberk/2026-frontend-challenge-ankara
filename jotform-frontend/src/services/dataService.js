/**
 * Data Normalizer for Investigation Dashboard
 * Her form tipinden standardize veri çıkarır
 */

/**
 * Form Field Mapping
 * Her form ID için hangi answers field'i hangi bilgi içeriyor
 */
export const FORM_SCHEMA = {
  // CHECKINS - Son Konumlar
  CHECKINS: {
    formId: '261065067494966',
    fields: {
      personName: '2',
      timestamp: '3',
      location: '4',
      coordinates: '5',
      note: '6',
    },
    extract: (submission) => ({
      type: 'checkin',
      personName: submission.answers['2']?.answer,
      timestamp: submission.answers['3']?.answer,
      location: submission.answers['4']?.answer,
      coordinates: submission.answers['5']?.answer,
      note: submission.answers['6']?.answer,
      submittedAt: submission.created_at,
    }),
  },

  // MESSAGES - Mesajlar
  MESSAGES: {
    formId: '261065765723966',
    fields: {
      senderName: '2',
      recipientName: '3',
      timestamp: '4',
      location: '5',
      coordinates: '6',
      text: '7',
      urgency: '8',
    },
    extract: (submission) => ({
      type: 'message',
      senderName: submission.answers['2']?.answer,
      recipientName: submission.answers['3']?.answer,
      timestamp: submission.answers['4']?.answer,
      location: submission.answers['5']?.answer,
      coordinates: submission.answers['6']?.answer,
      text: submission.answers['7']?.answer,
      urgency: submission.answers['8']?.answer,
      submittedAt: submission.created_at,
    }),
  },

  // SIGHTINGS - Gözlemler
  SIGHTINGS: {
    formId: '261065244786967',
    fields: {
      personName: '2',
      seenWith: '3',
      timestamp: '4',
      location: '5',
      coordinates: '6',
      note: '7',
    },
    extract: (submission) => ({
      type: 'sighting',
      personName: submission.answers['2']?.answer,
      seenWith: submission.answers['3']?.answer,
      timestamp: submission.answers['4']?.answer,
      location: submission.answers['5']?.answer,
      coordinates: submission.answers['6']?.answer,
      note: submission.answers['7']?.answer,
      submittedAt: submission.created_at,
    }),
  },

  // PERSONAL_NOTES - Kişisel Notlar
  PERSONAL_NOTES: {
    formId: '261065509008958',
    fields: {
      authorName: '2',
      timestamp: '3',
      location: '4',
      coordinates: '5',
      note: '6',
      mentionedPeople: '7',
    },
    extract: (submission) => ({
      type: 'personal_note',
      authorName: submission.answers['2']?.answer,
      timestamp: submission.answers['3']?.answer,
      location: submission.answers['4']?.answer,
      coordinates: submission.answers['5']?.answer,
      note: submission.answers['6']?.answer,
      mentionedPeople: submission.answers['7']?.answer,
      submittedAt: submission.created_at,
    }),
  },

  // ANONYMOUS_TIPS - Anonim İpuçları
  ANONYMOUS_TIPS: {
    formId: '261065875889981',
    fields: {
      submissionDate: '1',
      timestamp: '2',
      location: '3',
      coordinates: '4',
      suspectName: '5',
      tip: '6',
      confidence: '7',
    },
    extract: (submission) => ({
      type: 'anonymous_tip',
      submissionDate: submission.answers['1']?.answer,
      timestamp: submission.answers['2']?.answer,
      location: submission.answers['3']?.answer,
      coordinates: submission.answers['4']?.answer,
      suspectName: submission.answers['5']?.answer,
      tip: submission.answers['6']?.answer,
      confidence: submission.answers['7']?.answer,
      submittedAt: submission.created_at,
    }),
  },
}

/**
 * Normalize single submission based on form type
 * @param {Object} submission - Jotform submission
 * @param {string} formId - Form ID
 * @returns {Object} Normalized data
 */
export const normalizeSubmission = (submission, formId) => {
  const schema = Object.values(FORM_SCHEMA).find((s) => s.formId === formId)
  if (!schema) {
    console.warn(`Unknown form ID: ${formId}`)
    return submission
  }
  return schema.extract(submission)
}

/**
 * Normalize array of submissions
 * @param {Array} submissions - Array of Jotform submissions
 * @param {string} formId - Form ID
 * @returns {Array} Normalized data array
 */
export const normalizeSubmissions = (submissions, formId) => {
  return submissions.map((submission) => normalizeSubmission(submission, formId))
}

/**
 * Extract specific fields from submission
 * @param {Object} submission - Jotform submission
 * @param {string} formId - Form ID
 * @param {Array} fieldNames - Field names to extract (e.g., ['personName', 'location'])
 * @returns {Object} Object with only requested fields
 */
export const extractFields = (submission, formId, fieldNames = []) => {
  const normalized = normalizeSubmission(submission, formId)

  if (fieldNames.length === 0) {
    return normalized
  }

  return fieldNames.reduce((acc, field) => {
    if (field in normalized) {
      acc[field] = normalized[field]
    }
    return acc
  }, {})
}

export default {
  FORM_SCHEMA,
  normalizeSubmission,
  normalizeSubmissions,
  extractFields,
}
