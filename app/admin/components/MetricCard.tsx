'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface MetricCardProps {
  title: string
  metricKey: string
  icon: string
  suffix?: string
}

export default function MetricCard({ title, metricKey, icon, suffix = '' }: MetricCardProps) {
  const [value, setValue] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchMetric() {
      try {
        const today = new Date().toISOString().split('T')[0]
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

        switch (metricKey) {
          case 'active_users': {
            const { data, error } = await supabase
              .from('analytics_events')
              .select('user_id')
              .gte('created_at', new Date().toISOString().split('T')[0])

            if (!error && data) {
              const uniqueUsers = new Set(data.map(e => e.user_id).filter(Boolean))
              setValue(uniqueUsers.size)
            } else {
              setValue(0)
            }
            break
          }
          case 'new_users': {
            const { data, error } = await supabase
              .from('analytics_events')
              .select('user_id')
              .eq('event_name', 'onboarding_started')
              .gte('created_at', new Date().toISOString().split('T')[0])

            if (!error && data) {
              setValue(data.length)
            } else {
              setValue(0)
            }
            break
          }
          case 'onboarding_rate': {
            const { data: starts } = await supabase
              .from('analytics_events')
              .select('user_id')
              .eq('event_name', 'onboarding_started')
              .gte('created_at', thirtyDaysAgo)

            const { data: completions } = await supabase
              .from('analytics_events')
              .select('user_id')
              .eq('event_name', 'onboarding_completed')
              .gte('created_at', thirtyDaysAgo)

            if (starts && starts.length > 0) {
              const rate = ((completions?.length || 0) / starts.length) * 100
              setValue(Math.round(rate))
            } else {
              setValue(0)
            }
            break
          }
          case 'tips_viewed': {
            const { data, error } = await supabase
              .from('analytics_events')
              .select('id')
              .eq('event_name', 'tip_viewed')
              .gte('created_at', new Date().toISOString().split('T')[0])

            if (!error && data) {
              setValue(data.length)
            } else {
              setValue(0)
            }
            break
          }
          case 'avg_streak': {
            const { data, error } = await supabase
              .from('analytics_events')
              .select('event_data')
              .eq('event_name', 'streak_updated')
              .gte('created_at', thirtyDaysAgo)

            if (!error && data && data.length > 0) {
              const streaks = data
                .map(e => {
                  const eventData = typeof e.event_data === 'string'
                    ? JSON.parse(e.event_data)
                    : e.event_data
                  return eventData?.current_streak || 0
                })
                .filter(s => s > 0)

              if (streaks.length > 0) {
                setValue(Math.round(streaks.reduce((a, b) => a + b, 0) / streaks.length))
              } else {
                setValue(0)
              }
            } else {
              setValue(0)
            }
            break
          }
          default:
            setValue(0)
        }
      } catch (error) {
        console.error('Error fetching metric:', error)
        setValue(0)
      } finally {
        setLoading(false)
      }
    }

    fetchMetric()
  }, [metricKey])

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-500">{title}</span>
        <span className="text-2xl">{icon}</span>
      </div>
      {loading ? (
        <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
      ) : (
        <div className="text-3xl font-bold text-gray-900">
          {value?.toLocaleString()}{suffix}
        </div>
      )}
    </div>
  )
}
