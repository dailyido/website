'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface RetentionData {
  name: string
  value: number
}

export default function RetentionChart() {
  const [data, setData] = useState<RetentionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRetention() {
      try {
        const { data: day1 } = await supabase
          .from('analytics_events')
          .select('id')
          .eq('event_name', 'day_1_return')

        const { data: day7 } = await supabase
          .from('analytics_events')
          .select('id')
          .eq('event_name', 'day_7_return')

        const { data: day30 } = await supabase
          .from('analytics_events')
          .select('id')
          .eq('event_name', 'day_30_return')

        const { data: totalUsers } = await supabase
          .from('analytics_events')
          .select('user_id')
          .eq('event_name', 'onboarding_completed')

        const total = totalUsers?.length || 1

        setData([
          { name: 'Day 1', value: Math.round(((day1?.length || 0) / total) * 100) },
          { name: 'Day 7', value: Math.round(((day7?.length || 0) / total) * 100) },
          { name: 'Day 30', value: Math.round(((day30?.length || 0) / total) * 100) },
        ])
      } catch (error) {
        console.error('Error fetching retention:', error)
        setData([
          { name: 'Day 1', value: 0 },
          { name: 'Day 7', value: 0 },
          { name: 'Day 30', value: 0 },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchRetention()
  }, [])

  if (loading) {
    return (
      <div className="h-[200px] flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    )
  }

  const colors = ['#22c55e', '#eab308', '#ef4444']

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} stroke="#9ca3af" />
          <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" unit="%" />
          <Tooltip
            formatter={(value: number) => [`${value}%`, 'Retention']}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e5e5',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
