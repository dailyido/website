'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

interface Submission {
  id: string
  couple_names: string
  couple_instagram: string | null
  wedding_date: string
  wedding_location: string
  photo_urls: string[]
  status: string
  created_at: string
}

export default function SubmissionsTable() {
  const [submissions, setSubmissions] = useState<Submission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const { data, error } = await supabase
          .from('submissions')
          .select('*')
          .order('created_at', { ascending: false })

        if (!error && data) {
          setSubmissions(data)
        }
      } catch (error) {
        console.error('Error fetching submissions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSubmissions()
  }, [])

  const filteredSubmissions = filter === 'all'
    ? submissions
    : submissions.filter(s => (s.status || 'pending') === filter)

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === 'pending').length,
    approved: submissions.filter(s => s.status === 'approved').length,
  }

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    )
  }

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Total</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-yellow-600">{stats.pending}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Pending</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{stats.approved}</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide">Approved</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex justify-end mb-4">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Couple</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wedding Date</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photos</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredSubmissions.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No submissions yet
                </td>
              </tr>
            ) : (
              filteredSubmissions.map(submission => {
                const weddingDate = new Date(submission.wedding_date).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })
                const submittedDate = new Date(submission.created_at).toLocaleDateString('en-US', {
                  month: 'short', day: 'numeric', year: 'numeric'
                })
                const photoCount = submission.photo_urls?.length || 0
                const status = submission.status || 'pending'

                return (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4">
                      <div className="font-medium text-gray-900">{submission.couple_names}</div>
                      <div className="text-sm text-gray-500">{submission.couple_instagram || 'No Instagram'}</div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{weddingDate}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{submission.wedding_location}</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{photoCount} photos</td>
                    <td className="px-4 py-4 text-sm text-gray-600">{submittedDate}</td>
                    <td className="px-4 py-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                        status === 'approved' ? 'bg-green-100 text-green-700' :
                        status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
