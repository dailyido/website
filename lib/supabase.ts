import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zhekxbzyflcqeisknxwu.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpoZWt4Ynp5ZmxjcWVpc2tueHd1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5MjcyNTIsImV4cCI6MjA4NDUwMzI1Mn0.69z6VPlKf5d1fWUzpNHoL-u0A09N-ZsOkuc7nCBdwRg'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
