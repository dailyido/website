'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

const SCREEN_ORDER = [
  { key: 'intro', label: 'Intro' },
  { key: 'welcome', label: 'Welcome' },
  { key: 'your_name', label: 'Your Name' },
  { key: 'partner_name', label: 'Partner Name' },
  { key: 'couple_photo', label: 'Couple Photo' },
  { key: 'wedding_date', label: 'Wedding Date' },
  { key: 'wedding_location', label: 'Location' },
  { key: 'tented_question', label: 'Tented Question' },
  { key: 'notifications_permission', label: 'Notifications' },
  { key: 'preparedness', label: 'Preparedness' },
  { key: 'referral_source', label: 'Referral Source' },
  { key: 'rating_request', label: 'Rating Request' },
  { key: 'loading', label: 'Loading' },
  { key: 'plan_reveal', label: 'Plan Reveal' },
]

export default function OnboardingFunnel() {
  const [data, setData] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFunnel() {
      try {
        const { data: events, error } = await supabase
          .from('analytics_events')
          .select('screen_name, user_id')
          .eq('event_name', 'onboarding_screen_viewed')
          .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

        if (error) {
          console.error(error)
          setLoading(false)
          return
        }

        // Count events per screen (will count unique users once user_id is populated)
        const uniqueUsers: Record<string, Set<string>> = {}
        const eventCounts: Record<string, number> = {}

        events?.forEach(event => {
          if (event.screen_name) {
            // Track unique users if user_id exists
            if (!uniqueUsers[event.screen_name]) {
              uniqueUsers[event.screen_name] = new Set()
            }
            if (event.user_id) {
              uniqueUsers[event.screen_name].add(event.user_id)
            }

            // Also count total events as fallback
            eventCounts[event.screen_name] = (eventCounts[event.screen_name] || 0) + 1
          }
        })

        // Use unique user counts if available, otherwise fall back to event counts
        const result: Record<string, number> = {}
        Object.keys(eventCounts).forEach(screen => {
          const uniqueCount = uniqueUsers[screen]?.size || 0
          result[screen] = uniqueCount > 0 ? uniqueCount : eventCounts[screen]
        })

        setData(result)
      } catch (error) {
        console.error('Error fetching funnel:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFunnel()
  }, [])

  if (loading) {
    return (
      <div className="space-y-3">
        {SCREEN_ORDER.slice(0, 6).map((_, i) => (
          <div key={i} className="flex items-center gap-4 animate-pulse">
            <div className="w-24 h-4 bg-gray-200 rounded"></div>
            <div className="flex-1 h-6 bg-gray-200 rounded-full"></div>
            <div className="w-16 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  const hasData = Object.keys(data).length > 0
  // Use max count as baseline so percentages never exceed 100%
  const baselineUsers = hasData ? Math.max(...Object.values(data), 1) : 100

  if (!hasData) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No onboarding data available yet.</p>
        <p className="text-sm mt-2">Data will appear once users start using the app.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {SCREEN_ORDER.map((screen, index) => {
        const count = data[screen.key] || 0
        const rawPercentage = baselineUsers > 0 ? (count / baselineUsers * 100) : 0
        const percentage = Math.min(rawPercentage, 100) // Cap at 100% for display
        const prevCount = index > 0 ? (data[SCREEN_ORDER[index - 1].key] || 0) : count
        const dropoff = index > 0 ? prevCount - count : 0

        return (
          <div key={screen.key} className="flex items-center gap-4">
            <div className="w-28 text-sm text-gray-600 truncate">{screen.label}</div>
            <div className="flex-1 h-7 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
            <div className="w-20 text-sm text-right tabular-nums">
              {percentage.toFixed(0)}% <span className="text-gray-400">({count})</span>
            </div>
            {dropoff > 0 && (
              <div className="w-12 text-sm text-red-500 text-right tabular-nums">
                -{dropoff}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
