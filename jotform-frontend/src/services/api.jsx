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
  try {
    const [checkins, messages, sightings, personalNotes, anonymousTips] = await Promise.all([
      fetchFormSubmissions(FORM_IDS.CHECKINS),
      fetchFormSubmissions(FORM_IDS.MESSAGES),
      fetchFormSubmissions(FORM_IDS.SIGHTINGS),
      fetchFormSubmissions(FORM_IDS.PERSONAL_NOTES),
      fetchFormSubmissions(FORM_IDS.ANONYMOUS_TIPS),
    ])

    return {
      checkins: checkins.submissions || [],
      messages: messages.submissions || [],
      sightings: sightings.submissions || [],
      personalNotes: personalNotes.submissions || [],
      anonymousTips: anonymousTips.submissions || [],
    }
  } catch (error) {
    console.error('Investigation verisi çekilirken hata:', error)
    throw error
  }
}

export default apiClient


