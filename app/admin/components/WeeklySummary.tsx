'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function WeeklySummary() {
  const [summary, setSummary] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)

  useEffect(() => {
    async function fetchSummary() {
      try {
        const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

        const { data, error } = await supabase
          .from('analytics_summaries')
          .select('summary_text, created_at')
          .eq('period_type', 'weekly')
          .gte('period_start', weekAgo)
          .order('created_at', { ascending: false })
          .limit(1)
          .single()

        if (!error && data) {
          setSummary(data.summary_text)
        }
      } catch (error) {
        console.error('Error fetching summary:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSummary()
  }, [])

  async function generateSummary() {
    setGenerating(true)
    try {
      const response = await fetch('/admin/api/summary', {
        method: 'POST',
      })
      const data = await response.json()

      if (data.summary) {
        setSummary(data.summary)
      } else if (data.error) {
        alert(data.error)
      }
    } catch (error) {
      console.error('Error generating summary:', error)
      alert('Failed to generate summary. Please check your API configuration.')
    } finally {
      setGenerating(false)
    }
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-full"></div>
        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      </div>
    )
  }

  if (!summary) {
    return (
      <div className="text-center py-4">
        <p className="text-gray-500 text-sm mb-4">No weekly summary available.</p>
        <button
          onClick={generateSummary}
          disabled={generating}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark disabled:opacity-50 transition-colors text-sm font-medium"
        >
          {generating ? 'Generating...' : 'Generate Summary'}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="prose prose-sm max-w-none text-gray-600 whitespace-pre-wrap">
        {summary}
      </div>
      <button
        onClick={generateSummary}
        disabled={generating}
        className="text-sm text-accent hover:text-accent-dark disabled:opacity-50 transition-colors"
      >
        {generating ? 'Regenerating...' : '↻ Regenerate'}
      </button>
    </div>
  )
}
