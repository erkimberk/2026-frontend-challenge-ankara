import axios from 'axios'

const API_KEY = import.meta.env.VITE_API_KEY
const BASE_API_URL = import.meta.env.VITE_BASE_API_URL

// Jotform API Client
export const apiClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 10000,
})

// Form IDs mapping
export const FORM_IDS = {
  CHECKINS: import.meta.env.VITE_FORM_ID_CHECKINS,
  MESSAGES: import.meta.env.VITE_FORM_ID_MESSAGES,
  SIGHTINGS: import.meta.env.VITE_FORM_ID_SIGHTINGS,
  PERSONAL_NOTES: import.meta.env.VITE_FORM_ID_PERSONAL_NOTES,
  ANONYMOUS_TIPS: import.meta.env.VITE_FORM_ID_ANONYMOUS_TIPS,
}

const FORM_RESULT_KEYS = {
  CHECKINS: 'checkins',
  MESSAGES: 'messages',
  SIGHTINGS: 'sightings',
  PERSONAL_NOTES: 'personalNotes',
  ANONYMOUS_TIPS: 'anonymousTips',
}

const ALL_FORM_KEYS = Object.keys(FORM_IDS)

const getFormPayload = (response) => response.content || response.submissions || []

// Jotform API'den form submissions'ları çekmek
export const fetchFormSubmissions = async (formId) => {
  try {
    const response = await apiClient.get(`/${formId}/submissions?apiKey=${API_KEY}`)
    return response.data
  } catch (error) {
    console.error(`Form ${formId} verisi çekilirken hata:`, error.message)
    throw error
  }
}

// Tüm Investigation verilerini çek
export const fetchAllInvestigationData = async () => {
  return fetchInvestigationDataByForms(ALL_FORM_KEYS)
}

// Sadece seçilen formları çek
export const fetchInvestigationDataByForms = async (formKeys = []) => {
  try {
    const targetFormKeys = (formKeys.length > 0 ? formKeys : ALL_FORM_KEYS).filter(
      (formKey) => FORM_IDS[formKey],
    )

    const entries = await Promise.all(
      targetFormKeys.map(async (formKey) => {
        const response = await fetchFormSubmissions(FORM_IDS[formKey])
        return [FORM_RESULT_KEYS[formKey], getFormPayload(response)]
      }),
    )

    return Object.fromEntries(entries)
  } catch (error) {
    console.error('Soruşturma verisi çekilirken hata:', error)
    throw error
  }
}

export default apiClient


