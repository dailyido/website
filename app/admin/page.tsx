'use client'

import { Suspense } from 'react'
import MetricCard from './components/MetricCard'
import OnboardingFunnel from './components/OnboardingFunnel'
import EngagementChart from './components/EngagementChart'
import RetentionChart from './components/RetentionChart'
import StreakDistribution from './components/StreakDistribution'
import AIChat from './components/AIChat'
import WeeklySummary from './components/WeeklySummary'
import SubmissionsTable from './components/SubmissionsTable'

function MetricCardSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow p-6 animate-pulse">
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
    </div>
  )
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Daily I Do Analytics</h1>
            <p className="text-gray-500 mt-1">Monitor app performance and user engagement</p>
          </div>
          <a
            href="/"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to Site
          </a>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          <Suspense fallback={<MetricCardSkeleton />}>
            <MetricCard title="Users Today" metricKey="active_users" icon="👥" />
          </Suspense>
          <Suspense fallback={<MetricCardSkeleton />}>
            <MetricCard title="New Signups" metricKey="new_users" icon="✨" />
          </Suspense>
          <Suspense fallback={<MetricCardSkeleton />}>
            <MetricCard title="Onboarding %" metricKey="onboarding_rate" icon="📋" suffix="%" />
          </Suspense>
          <Suspense fallback={<MetricCardSkeleton />}>
            <MetricCard title="Tips Viewed" metricKey="tips_viewed" icon="💡" />
          </Suspense>
          <Suspense fallback={<MetricCardSkeleton />}>
            <MetricCard title="Avg Streak" metricKey="avg_streak" icon="🔥" suffix=" days" />
          </Suspense>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Onboarding Funnel (Last 30 Days)</h2>
              <OnboardingFunnel />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Daily Engagement</h2>
              <EngagementChart />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Retention</h2>
                <RetentionChart />
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Streak Distribution</h2>
                <StreakDistribution />
              </div>
            </div>

            {/* Wedding Submissions Table */}
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Wedding Submissions</h2>
              <SubmissionsTable />
            </div>
          </div>

          {/* Right Column - AI & Summary */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Ask About Your Data</h2>
              <AIChat />
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Weekly Summary</h2>
              <WeeklySummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
