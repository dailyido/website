import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(req: NextRequest) {
  try {
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        error: 'AI summary is not configured. Please add ANTHROPIC_API_KEY to your environment variables.'
      })
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })

    const supabase = createClient(supabaseUrl, supabaseKey)

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const twoWeeksAgo = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000)

    // Fetch this week's events
    const { data: thisWeekEvents } = await supabase
      .from('analytics_events')
      .select('event_name, user_id, screen_name, created_at')
      .gte('created_at', weekAgo.toISOString())

    // Fetch last week's events
    const { data: lastWeekEvents } = await supabase
      .from('analytics_events')
      .select('event_name, user_id, screen_name, created_at')
      .gte('created_at', twoWeeksAgo.toISOString())
      .lt('created_at', weekAgo.toISOString())

    // Calculate metrics for this week
    const thisWeekUsers = new Set(thisWeekEvents?.map(e => e.user_id).filter(Boolean) || [])
    const lastWeekUsers = new Set(lastWeekEvents?.map(e => e.user_id).filter(Boolean) || [])

    const thisWeekTips = thisWeekEvents?.filter(e => e.event_name === 'tip_viewed').length || 0
    const lastWeekTips = lastWeekEvents?.filter(e => e.event_name === 'tip_viewed').length || 0

    const thisWeekOnboardingStarts = thisWeekEvents?.filter(e => e.event_name === 'onboarding_started').length || 0
    const thisWeekOnboardingCompletions = thisWeekEvents?.filter(e => e.event_name === 'onboarding_completed').length || 0

    const prompt = `
Generate a concise weekly analytics summary for Daily I Do app.

THIS WEEK'S DATA:
- Active users: ${thisWeekUsers.size}
- Total events: ${thisWeekEvents?.length || 0}
- Tips viewed: ${thisWeekTips}
- Onboarding starts: ${thisWeekOnboardingStarts}
- Onboarding completions: ${thisWeekOnboardingCompletions}
- Completion rate: ${thisWeekOnboardingStarts > 0 ? Math.round((thisWeekOnboardingCompletions / thisWeekOnboardingStarts) * 100) : 0}%

LAST WEEK (for comparison):
- Active users: ${lastWeekUsers.size}
- Total events: ${lastWeekEvents?.length || 0}
- Tips viewed: ${lastWeekTips}

Generate a summary with these sections:
1. **HIGHLIGHTS** (2-3 bullet points with key wins or concerns)
2. **ENGAGEMENT** (active users, tips viewed trend)
3. **ONBOARDING** (completion rate, any concerns)
4. **RECOMMENDATIONS** (1-2 actionable suggestions)

Use arrows (↑ ↓) for comparisons. Be concise - under 200 words total.
If there's no data, acknowledge it and suggest what to look for once data comes in.
`

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }],
    })

    const textContent = response.content.find(c => c.type === 'text')
    const summaryText = textContent?.text || ''

    // Store the summary
    await supabase.from('analytics_summaries').insert({
      period_type: 'weekly',
      period_start: weekAgo.toISOString().split('T')[0],
      period_end: new Date().toISOString().split('T')[0],
      summary_text: summaryText,
      key_metrics: {
        active_users: thisWeekUsers.size,
        tips_viewed: thisWeekTips,
        onboarding_rate: thisWeekOnboardingStarts > 0
          ? Math.round((thisWeekOnboardingCompletions / thisWeekOnboardingStarts) * 100)
          : 0,
      }
    })

    return NextResponse.json({ summary: summaryText })
  } catch (error) {
    console.error('Summary API error:', error)
    return NextResponse.json({
      error: 'Failed to generate summary. Please try again.'
    }, { status: 500 })
  }
}
