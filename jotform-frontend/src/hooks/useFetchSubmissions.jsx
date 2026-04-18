import React, { useEffect, useState } from 'react'
import { fetchFormSubmissions } from '../services/api'

function useFetchSubmissions(formId = '') {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!formId) {
      setData([])
      setError('Form ID gerekli')
      return
    }

    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchFormSubmissions(formId)
        setData(response.content || response.submissions || [])
      } catch (err) {
        console.error('Hata:', err)
        setError(err.message || 'Veri çekilirken hata oluştu')
        setData([])
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [formId])

  return {
    data,
    loading,
    error,
  }
}

export default useFetchSubmissions