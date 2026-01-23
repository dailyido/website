'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts'

interface StreakData {
  name: string
  value: number
}

export default function StreakDistribution() {
  const [data, setData] = useState<StreakData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStreaks() {
      try {
        const { data: events, error } = await supabase
          .from('analytics_events')
          .select('user_id, event_data')
          .eq('event_name', 'streak_updated')
          .order('created_at', { ascending: false })

        if (error) {
          console.error(error)
          setLoading(false)
          return
        }

        // Get latest streak for each user
        const userStreaks: Record<string, number> = {}
        events?.forEach(event => {
          if (event.user_id && !userStreaks[event.user_id]) {
            const eventData = typeof event.event_data === 'string'
              ? JSON.parse(event.event_data)
              : event.event_data
            userStreaks[event.user_id] = eventData?.current_streak || 0
          }
        })

        // Categorize streaks
        const categories = {
          '0 days': 0,
          '1-3 days': 0,
          '4-7 days': 0,
          '8-14 days': 0,
          '15+ days': 0,
        }

        Object.values(userStreaks).forEach(streak => {
          if (streak === 0) categories['0 days']++
          else if (streak <= 3) categories['1-3 days']++
          else if (streak <= 7) categories['4-7 days']++
          else if (streak <= 14) categories['8-14 days']++
          else categories['15+ days']++
        })

        setData(Object.entries(categories).map(([name, value]) => ({ name, value })))
      } catch (error) {
        console.error('Error fetching streaks:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStreaks()
  }, [])

  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  const hasData = data.some(d => d.value > 0)

  if (!hasData) {
    return (
      <div className="h-[200px] flex items-center justify-center text-gray-500 text-center">
        <div>
          <p>No streak data yet.</p>
          <p className="text-sm mt-2">Data will appear once users start building streaks.</p>
        </div>
      </div>
    )
  }

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#14b8a6']

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [`${value} users`, name]}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="middle"
            formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
