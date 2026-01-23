'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

interface DayData {
  date: string
  activeUsers: number
  tipsViewed: number
  checklistCompletions: number
}

export default function EngagementChart() {
  const [data, setData] = useState<DayData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEngagement() {
      try {
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

        const { data: events, error } = await supabase
          .from('analytics_events')
          .select('event_name, user_id, created_at')
          .gte('created_at', thirtyDaysAgo)
          .in('event_name', ['app_opened', 'tip_viewed', 'checklist_item_completed'])

        if (error) {
          console.error(error)
          setLoading(false)
          return
        }

        // Group by date
        const dailyData: Record<string, { users: Set<string>, tips: number, checklists: number }> = {}

        events?.forEach(event => {
          const date = event.created_at.split('T')[0]
          if (!dailyData[date]) {
            dailyData[date] = { users: new Set(), tips: 0, checklists: 0 }
          }

          if (event.user_id) {
            dailyData[date].users.add(event.user_id)
          }

          if (event.event_name === 'tip_viewed') {
            dailyData[date].tips++
          } else if (event.event_name === 'checklist_item_completed') {
            dailyData[date].checklists++
          }
        })

        // Convert to array and sort by date
        const chartData = Object.entries(dailyData)
          .map(([date, values]) => ({
            date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            activeUsers: values.users.size,
            tipsViewed: values.tips,
            checklistCompletions: values.checklists,
          }))
          .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

        setData(chartData)
      } catch (error) {
        console.error('Error fetching engagement:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEngagement()
  }, [])

  if (loading) {
    return (
      <div className="h-[300px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading chart...</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-gray-500">
        <div className="text-center">
          <p>No engagement data available yet.</p>
          <p className="text-sm mt-2">Data will appear once users start using the app.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="activeUsers"
            name="Active Users"
            stroke="#c48b98"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="tipsViewed"
            name="Tips Viewed"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="checklistCompletions"
            name="Checklist Items"
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
