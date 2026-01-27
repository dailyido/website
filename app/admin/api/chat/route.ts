import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        error: 'AI chat is not configured. Please add ANTHROPIC_API_KEY to your environment variables.'
      })
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Fetch relevant analytics data
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

    const [recentEvents, funnelData, submissions] = await Promise.all([
      supabase
        .from('analytics_events')
        .select('event_name, user_id, screen_name, created_at')
        .gte('created_at', sevenDaysAgo)
        .order('created_at', { ascending: false })
        .limit(500),
      supabase
        .from('analytics_events')
        .select('screen_name, user_id')
        .eq('event_name', 'onboarding_screen_viewed')
        .gte('created_at', thirtyDaysAgo),
      supabase
        .from('submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50),
    ])

    // Calculate event counts
    const eventCounts: Record<string, number> = {}
    recentEvents.data?.forEach(event => {
      eventCounts[event.event_name] = (eventCounts[event.event_name] || 0) + 1
    })

    // Calculate funnel
    const funnelCounts: Record<string, Set<string>> = {}
    funnelData.data?.forEach(event => {
      if (event.screen_name) {
        if (!funnelCounts[event.screen_name]) {
          funnelCounts[event.screen_name] = new Set()
        }
        if (event.user_id) {
          funnelCounts[event.screen_name].add(event.user_id)
        }
      }
    })

    const funnelSummary = Object.entries(funnelCounts)
      .map(([screen, users]) => `${screen}: ${users.size} users`)
      .join('\n')

    // Build context for Claude
    const context = `
You are an analytics assistant for Daily I Do, a wedding countdown iOS app.
Answer questions about the app's analytics data concisely and accurately.

RECENT EVENTS (Last 7 days):
Total events: ${recentEvents.data?.length || 0}
Event breakdown:
${Object.entries(eventCounts).map(([name, count]) => `- ${name}: ${count}`).join('\n')}

ONBOARDING FUNNEL (Last 30 days):
${funnelSummary || 'No funnel data available yet'}

WEDDING SUBMISSIONS:
Total: ${submissions.data?.length || 0}
Pending: ${submissions.data?.filter(s => s.status === 'pending').length || 0}
Approved: ${submissions.data?.filter(s => s.status === 'approved').length || 0}

Guidelines:
- Be concise and data-driven
- If you notice anomalies or patterns, mention them
- Format numbers with commas (e.g., "1,234")
- If data is missing, acknowledge it honestly
- Provide actionable insights when possible
`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      system: context,
      messages: [{ role: 'user', content: message }],
    })

    const textContent = response.content.find(c => c.type === 'text')

    return NextResponse.json({
      response: textContent?.text || 'Unable to generate response'
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({
      error: 'Failed to process your question. Please try again.'
    }, { status: 500 })
  }
}
