'use client'

import { useState, useEffect } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

type VenueFoodMode = 'combined' | 'split'

interface BudgetCategory {
  id: string
  label: string
  defaultPercent: number
  actualAmount: string
  tip: string
}

interface BudgetState {
  totalBudget: string
  venueFoodMode: VenueFoodMode
  categories: BudgetCategory[]
  coupleNames: string
  weddingDate: string
}

const DEFAULT_CATEGORIES: BudgetCategory[] = [
  {
    id: 'venue-food-combined',
    label: 'Venue, Food & Beverage',
    defaultPercent: 50,
    actualAmount: '',
    tip: 'The single largest line item. Venue rental, catering, bar service, and cake are often quoted together. Ask venues for all-inclusive packages to simplify comparison.',
  },
  {
    id: 'catering-bar',
    label: 'Catering & Beverage',
    defaultPercent: 25,
    actualAmount: '',
    tip: 'Per-head catering costs vary widely by region ($85–$250+). Open bar adds $45–$100/person. Ask about minimums and service charges, which can add 22–25%.',
  },
  {
    id: 'rentals',
    label: 'Rentals',
    defaultPercent: 15,
    actualAmount: '',
    tip: 'Covers tables, chairs, linens, china, glassware, and any specialty furniture or lounge pieces. Rental costs add up quickly for tented weddings where nothing is provided by the venue.',
  },
  {
    id: 'venue',
    label: 'Venue',
    defaultPercent: 10,
    actualAmount: '',
    tip: 'Venue rental ranges from $2k (restaurant buyout) to $20k+ (estate). Off-peak dates (Friday, Sunday, January–March) can cut venue cost by 20–40%.',
  },
  {
    id: 'floral-decor',
    label: 'Floral Design & Decor',
    defaultPercent: 12,
    actualAmount: '',
    tip: 'Greenery-forward arrangements and dried florals can reduce this significantly. Ceremony arch, centerpieces, and personal flowers (bouquet, bouts) are the big-ticket items.',
  },
  {
    id: 'music',
    label: 'Music',
    defaultPercent: 9,
    actualAmount: '',
    tip: "A live band typically costs $5k–$15k; a DJ runs $1.5k–$4k. The 9% default assumes a live band — adjust down to ~2% if you're going the DJ route.",
  },
  {
    id: 'photo-video',
    label: 'Photographer & Videographer',
    defaultPercent: 8,
    actualAmount: '',
    tip: 'Photos and video are among the few things you keep forever. A photographer-only package runs $3k–$7k; adding videography adds $2k–$5k. Book 12–18 months out.',
  },
  {
    id: 'attire',
    label: 'Attire, Rings & Beauty',
    defaultPercent: 8,
    actualAmount: '',
    tip: 'Includes wedding dress, alterations, suit/tux rental or purchase, rings, hair, and makeup. Sample sales and trunk shows can yield 30–50% off bridal gowns.',
  },
  {
    id: 'planner',
    label: 'Wedding Planner',
    defaultPercent: 8,
    actualAmount: '',
    tip: 'A full-service planner (8–12% of total budget) vs. a day-of coordinator ($1k–$3k flat). A good planner often saves their own fee through vendor relationships.',
  },
  {
    id: 'transportation',
    label: 'Transportation',
    defaultPercent: 2,
    actualAmount: '',
    tip: "Covers getting-ready vehicles, ceremony-to-reception shuttle, and the couple's getaway car. Vintage cars and trolleys are popular splurges in this category. This could cost more depending on your guest count and if you choose to offer transportation for your guests.",
  },
  {
    id: 'stationery',
    label: 'Stationery',
    defaultPercent: 2,
    actualAmount: '',
    tip: 'Save-the-dates, invitations, menus, programs, and signage. Digital save-the-dates and a rented chalkboard for day-of signage can significantly reduce this.',
  },
  {
    id: 'officiant',
    label: 'Officiant',
    defaultPercent: 1,
    actualAmount: '',
    tip: "A professional officiant costs $300–$800. Having a close friend get ordained through the Universal Life Church is free (just check your state's legal requirements first).",
  },
]

const DEFAULT_STATE: BudgetState = {
  totalBudget: '',
  venueFoodMode: 'combined',
  categories: DEFAULT_CATEGORIES,
  coupleNames: '',
  weddingDate: '',
}

function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value)
}

function daysUntil(dateString: string): number | null {
  if (!dateString) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(dateString + 'T12:00:00')
  const diff = target.getTime() - today.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

function getActiveCategories(state: BudgetState): BudgetCategory[] {
  return state.categories.filter(cat => {
    if (state.venueFoodMode === 'combined') {
      return cat.id !== 'catering-bar' && cat.id !== 'venue' && cat.id !== 'rentals'
    }
    return cat.id !== 'venue-food-combined'
  })
}

export default function BudgetTracker() {
  const [budget, setBudget] = useState<BudgetState>(DEFAULT_STATE)
  const [openTips, setOpenTips] = useState<Set<string>>(new Set())
  const [copySuccess, setCopySuccess] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const encoded = params.get('b')
    if (encoded) {
      try {
        const decoded = JSON.parse(decodeURIComponent(encoded)) as BudgetState
        setBudget({ ...DEFAULT_STATE, ...decoded })
        setMounted(true)
        return
      } catch {
        // fall through to localStorage
      }
    }
    try {
      const saved = localStorage.getItem('dailyido-budget')
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<BudgetState>
        setBudget(prev => ({ ...prev, ...parsed }))
      }
    } catch {
      // ignore
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    try {
      localStorage.setItem('dailyido-budget', JSON.stringify(budget))
    } catch {
      // ignore
    }
  }, [budget, mounted])

  const totalBudgetNum = parseFloat(budget.totalBudget) || 0
  const activeCategories = getActiveCategories(budget)
  const totalActual = activeCategories.reduce(
    (sum, cat) => sum + (parseFloat(cat.actualAmount) || 0),
    0
  )
  const remaining = totalBudgetNum - totalActual
  const isOverBudget = totalActual > totalBudgetNum && totalBudgetNum > 0
  const days = mounted ? daysUntil(budget.weddingDate) : null

  function updateCategory(id: string, value: string) {
    setBudget(prev => ({
      ...prev,
      categories: prev.categories.map(cat =>
        cat.id === id ? { ...cat, actualAmount: value } : cat
      ),
    }))
  }

  function toggleTip(id: string) {
    setOpenTips(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleReset() {
    if (!window.confirm('Reset all amounts and start over?')) return
    try { localStorage.removeItem('dailyido-budget') } catch { /* ignore */ }
    setBudget(DEFAULT_STATE)
    setOpenTips(new Set())
  }

  async function handleCopyLink() {
    try {
      const encoded = encodeURIComponent(JSON.stringify(budget))
      const url = `${window.location.origin}/budgettracker?b=${encoded}`
      await navigator.clipboard.writeText(url)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2500)
    } catch {
      // ignore
    }
  }

  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#fdfcfb]">
        <div className="max-w-[1200px] mx-auto px-6 pt-[calc(6rem+80px)] pb-20">

          {/* Print-only header */}
          <div className="budget-print-header hidden mb-6 pb-4 border-b border-[#e5e5e5]">
            <p className="text-xs text-[#7a7a7a] mb-1">Daily I Do — Wedding Budget Tracker</p>
            <h2 className="text-xl font-bold text-[#1a1a1a]">
              {budget.coupleNames ? `${budget.coupleNames}'s Wedding Budget` : 'Wedding Budget'}
            </h2>
            {budget.weddingDate && (
              <p className="text-sm text-[#4a4a4a] mt-0.5">
                Wedding Date:{' '}
                {new Date(budget.weddingDate + 'T12:00:00').toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            )}
            {totalBudgetNum > 0 && (
              <p className="text-sm font-semibold text-[#1a1a1a] mt-1">
                Total Budget: {formatCurrency(totalBudgetNum)}
              </p>
            )}
          </div>

          {/* Page Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <p className="text-xs tracking-[0.2em] uppercase text-[#c48b98] font-medium mb-3">
              Wedding Planning
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4">Budget Tracker</h1>
            <p className="text-[#7a7a7a] text-lg max-w-[560px] mx-auto">
              See where every dollar should go — and track what you&apos;ve already booked.
            </p>
          </div>

          {/* Budget Input Card */}
          <div className="max-w-[600px] mx-auto mb-8">
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-sm">
              <label className="block text-sm font-semibold text-[#1a1a1a] mb-2">
                What&apos;s your total wedding budget?
              </label>
              <div className="relative mb-6">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7a7a7a] font-semibold text-xl select-none">
                  $
                </span>
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="50,000"
                  value={budget.totalBudget}
                  onChange={e =>
                    setBudget(prev => ({
                      ...prev,
                      totalBudget: e.target.value.replace(/[^0-9.]/g, ''),
                    }))
                  }
                  className="w-full pl-9 pr-4 py-4 text-2xl font-bold bg-[#f8f6f4] border border-[#e5e5e5] rounded-xl focus:outline-none focus:border-[#c48b98] focus:ring-2 focus:ring-[#c48b98]/10 text-[#1a1a1a] placeholder:text-[#d0d0d0]"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#7a7a7a] mb-1.5">
                    Couple names (optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Emma & James"
                    value={budget.coupleNames}
                    onChange={e =>
                      setBudget(prev => ({ ...prev, coupleNames: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 text-sm bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#c48b98] focus:ring-2 focus:ring-[#c48b98]/10 text-[#1a1a1a] placeholder:text-[#d0d0d0]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#7a7a7a] mb-1.5">
                    Wedding date (optional)
                  </label>
                  <input
                    type="date"
                    value={budget.weddingDate}
                    onChange={e =>
                      setBudget(prev => ({ ...prev, weddingDate: e.target.value }))
                    }
                    className="w-full px-3 py-2.5 text-sm bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg focus:outline-none focus:border-[#c48b98] focus:ring-2 focus:ring-[#c48b98]/10 text-[#1a1a1a]"
                  />
                </div>
              </div>
              {days !== null && days > 0 && (
                <div className="mt-4 p-3 bg-[#fdf6f7] border border-[#e8d0d5] rounded-xl text-sm text-[#9a6070] flex items-center gap-2">
                  <span>💍</span>
                  <span>
                    <strong className="text-[#c48b98]">{days.toLocaleString()} days</strong> until
                    your wedding — here&apos;s where you stand
                  </span>
                </div>
              )}
              {days !== null && days === 0 && (
                <div className="mt-4 p-3 bg-[#fdf6f7] border border-[#e8d0d5] rounded-xl text-sm text-[#9a6070] flex items-center gap-2">
                  <span>🎉</span>
                  <span>Today is your wedding day! Congratulations!</span>
                </div>
              )}
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 text-center shadow-sm">
              <p className="text-xs uppercase tracking-widest text-[#7a7a7a] font-medium mb-2">
                Total Budget
              </p>
              <p className="text-2xl font-bold text-[#1a1a1a]">
                {totalBudgetNum > 0 ? formatCurrency(totalBudgetNum) : '—'}
              </p>
            </div>
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-6 text-center shadow-sm">
              <p className="text-xs uppercase tracking-widest text-[#7a7a7a] font-medium mb-2">
                Total Booked
              </p>
              <p className="text-2xl font-bold text-[#1a1a1a]">
                {totalActual > 0 ? formatCurrency(totalActual) : '—'}
              </p>
              {totalBudgetNum > 0 && totalActual > 0 && (
                <p className="text-xs text-[#7a7a7a] mt-1">
                  {Math.round((totalActual / totalBudgetNum) * 100)}% of budget
                </p>
              )}
            </div>
            <div
              className={`rounded-2xl p-6 text-center shadow-sm border ${
                isOverBudget ? 'bg-red-50 border-red-200' : 'bg-white border-[#e5e5e5]'
              }`}
            >
              <p
                className={`text-xs uppercase tracking-widest font-medium mb-2 ${
                  isOverBudget ? 'text-red-500' : 'text-[#7a7a7a]'
                }`}
              >
                {isOverBudget ? 'Over Budget' : 'Remaining'}
              </p>
              <p
                className={`text-2xl font-bold ${
                  isOverBudget
                    ? 'text-red-600'
                    : totalBudgetNum > 0
                    ? 'text-[#2d6a4f]'
                    : 'text-[#1a1a1a]'
                }`}
              >
                {totalBudgetNum > 0
                  ? isOverBudget
                    ? `-${formatCurrency(Math.abs(remaining))}`
                    : formatCurrency(remaining)
                  : '—'}
              </p>
              {!isOverBudget && totalBudgetNum > 0 && remaining > 0 && (
                <p className="text-xs text-[#2d6a4f] mt-1">unallocated</p>
              )}
            </div>
          </div>

          {/* Venue / Food Toggle */}
          <div className="mb-4 no-print">
            <p className="text-sm font-medium text-[#4a4a4a] mb-2">Venue &amp; food budget view</p>
            <div className="inline-flex bg-[#f0edeb] rounded-lg p-1 flex-wrap gap-1">
              <button
                onClick={() => setBudget(prev => ({ ...prev, venueFoodMode: 'combined' }))}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-all ${
                  budget.venueFoodMode === 'combined'
                    ? 'bg-white text-[#1a1a1a] shadow-sm'
                    : 'text-[#7a7a7a] hover:text-[#4a4a4a]'
                }`}
              >
                Venue
              </button>
              <button
                onClick={() => setBudget(prev => ({ ...prev, venueFoodMode: 'split' }))}
                className={`px-4 py-2 text-sm rounded-md font-medium transition-all ${
                  budget.venueFoodMode === 'split'
                    ? 'bg-white text-[#1a1a1a] shadow-sm'
                    : 'text-[#7a7a7a] hover:text-[#4a4a4a]'
                }`}
              >
                Tent or Venue Needing Catering
              </button>
            </div>
          </div>

          {/* Category Table */}
          <div
            id="budget-print-area"
            className="bg-white border border-[#e5e5e5] rounded-2xl shadow-sm overflow-hidden mb-6"
          >
            {/* Table header — desktop only */}
            <div className="hidden sm:grid sm:grid-cols-[1fr_140px_200px_110px] gap-4 px-6 py-3 bg-[#f8f6f4] border-b border-[#e5e5e5]">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">
                Category
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a] text-right">
                Suggested
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">
                Amount Booked
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#7a7a7a]">
                Status
              </span>
            </div>

            {/* Category rows */}
            {activeCategories.map(cat => {
              const suggested = (cat.defaultPercent / 100) * totalBudgetNum
              const actual = parseFloat(cat.actualAmount) || 0
              const isRowOver = actual > suggested && suggested > 0
              const progressPercent =
                suggested > 0 ? Math.min((actual / suggested) * 100, 100) : 0
              const isOverProgress = suggested > 0 && actual > suggested

              let statusLabel = 'Not Started'
              let statusClass = 'bg-[#f0edeb] text-[#7a7a7a]'
              if (actual > 0 && suggested > 0 && actual < suggested) {
                statusLabel = 'In Progress'
                statusClass = 'bg-amber-100 text-amber-700'
              } else if (actual > 0 && (actual >= suggested || suggested === 0)) {
                statusLabel = 'Booked ✓'
                statusClass = 'bg-green-100 text-[#2d6a4f]'
              }
              if (isRowOver) {
                statusLabel = 'Over Budget'
                statusClass = 'bg-red-100 text-red-600'
              }

              return (
                <div
                  key={cat.id}
                  className={`category-row border-b border-[#e5e5e5] last:border-0 transition-colors ${
                    isRowOver ? 'bg-red-50/50' : ''
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px_200px_110px] gap-2 sm:gap-4 px-6 py-4 items-start sm:items-center">
                    {/* Category name + tip */}
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`font-medium text-sm ${
                            isRowOver ? 'text-red-600' : 'text-[#1a1a1a]'
                          }`}
                        >
                          {cat.label}
                        </span>
                        <span className="text-xs text-[#7a7a7a] font-medium">
                          {cat.defaultPercent}%
                        </span>
                        <button
                          onClick={() => toggleTip(cat.id)}
                          className="no-print text-[#c48b98] hover:text-[#9a6070] transition-colors"
                          aria-label={openTips.has(cat.id) ? 'Hide tip' : 'Show tip'}
                        >
                          <span className="text-xs leading-none">
                            {openTips.has(cat.id) ? '✕' : 'ⓘ'}
                          </span>
                        </button>
                      </div>
                      {openTips.has(cat.id) && (
                        <p className="mt-2 text-xs text-[#4a4a4a] leading-relaxed bg-[#fdf6f7] border border-[#e8d0d5] rounded-lg px-3 py-2 no-print">
                          {cat.tip}
                        </p>
                      )}
                    </div>

                    {/* Suggested amount */}
                    <div className="sm:text-right">
                      <p className="text-xs text-[#7a7a7a] sm:hidden font-medium mb-0.5">
                        Suggested
                      </p>
                      <p className="text-sm font-medium text-[#4a4a4a]">
                        {totalBudgetNum > 0 ? formatCurrency(suggested) : '—'}
                      </p>
                    </div>

                    {/* Booked input + progress bar */}
                    <div>
                      <p className="text-xs text-[#7a7a7a] sm:hidden font-medium mb-0.5">
                        Amount Booked
                      </p>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a7a7a] text-sm select-none">
                          $
                        </span>
                        <input
                          type="text"
                          inputMode="numeric"
                          placeholder="0"
                          value={cat.actualAmount}
                          onChange={e =>
                            updateCategory(cat.id, e.target.value.replace(/[^0-9.]/g, ''))
                          }
                          className={`w-full pl-6 pr-3 py-2 text-sm rounded-lg border focus:outline-none focus:ring-2 transition-colors ${
                            isRowOver
                              ? 'border-red-300 bg-red-50 text-red-700 focus:border-red-400 focus:ring-red-100'
                              : 'border-[#e5e5e5] bg-[#f8f6f4] text-[#1a1a1a] focus:border-[#c48b98] focus:ring-[#c48b98]/10'
                          }`}
                        />
                      </div>
                      {totalBudgetNum > 0 && (
                        <div className="mt-1.5 h-1.5 bg-[#f0edeb] rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-300 ${
                              isOverProgress ? 'bg-red-400' : 'bg-[#c48b98]'
                            }`}
                            style={{ width: `${progressPercent}%` }}
                          />
                        </div>
                      )}
                    </div>

                    {/* Status badge */}
                    <div>
                      <p className="text-xs text-[#7a7a7a] sm:hidden font-medium mb-0.5">
                        Status
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap ${statusClass}`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Totals row */}
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_140px_200px_110px] gap-2 sm:gap-4 px-6 py-4 bg-[#f8f6f4] border-t-2 border-[#e5e5e5]">
              <span className="text-sm font-bold text-[#1a1a1a]">Total</span>
              <span className="sm:text-right text-sm font-bold text-[#4a4a4a]">
                {totalBudgetNum > 0 ? formatCurrency(totalBudgetNum) : '—'}
              </span>
              <span
                className={`text-sm font-bold ${
                  isOverBudget ? 'text-red-600' : 'text-[#1a1a1a]'
                }`}
              >
                {totalActual > 0 ? formatCurrency(totalActual) : '—'}
              </span>
              <span
                className={`text-sm font-bold ${
                  isOverBudget
                    ? 'text-red-600'
                    : totalBudgetNum > 0 && remaining >= 0
                    ? 'text-[#2d6a4f]'
                    : 'text-[#1a1a1a]'
                }`}
              >
                {totalBudgetNum > 0
                  ? isOverBudget
                    ? `-${formatCurrency(Math.abs(remaining))}`
                    : formatCurrency(remaining)
                  : '—'}
              </span>
            </div>
          </div>

          {/* Over-budget banner */}
          {isOverBudget && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 no-print">
              <span className="text-xl flex-shrink-0">⚠️</span>
              <p className="text-sm text-red-700 font-medium">
                You&apos;re <strong>{formatCurrency(Math.abs(remaining))}</strong> over budget.
                Consider adjusting a category or increasing your total budget above.
              </p>
            </div>
          )}

          {/* Market fluctuation note */}
          <div className="mb-8 p-5 bg-[#f8f6f4] border border-[#e5e5e5] rounded-xl">
            <p className="text-sm text-[#4a4a4a] leading-relaxed">
              <strong className="text-[#1a1a1a]">A note on these percentages:</strong>{' '}
              <em>
                Industry benchmarks vary significantly by market, season, and priorities. In major
                cities, venue alone can exceed 30% of budget. Music might be 2% with a great DJ or
                9%+ with a live band. Photography could easily be your top priority and worth
                doubling. Destination weddings shift everything. These numbers are a starting point
                — your wedding, your budget, your call.
              </em>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 no-print">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 text-sm font-medium text-[#7a7a7a] bg-white border border-[#e5e5e5] rounded-lg hover:border-[#c48b98] hover:text-[#9a6070] transition-colors"
            >
              Reset to defaults
            </button>
            <button
              onClick={handleCopyLink}
              className="px-5 py-2.5 text-sm font-medium text-[#4a4a4a] bg-white border border-[#e5e5e5] rounded-lg hover:border-[#c48b98] hover:text-[#9a6070] transition-colors flex items-center gap-2"
            >
              {copySuccess ? (
                <span className="text-[#2d6a4f]">✓ Copied to clipboard!</span>
              ) : (
                '🔗 Copy shareable link'
              )}
            </button>
            <button
              onClick={() => window.print()}
              className="px-5 py-2.5 text-sm font-medium text-white bg-black rounded-lg hover:bg-black/90 transition-colors"
            >
              Print / Save as PDF
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
