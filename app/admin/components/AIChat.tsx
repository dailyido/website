'use client'

import { useState } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await fetch('/admin/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      const data = await response.json()

      if (data.error) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: data.error
        }])
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      }
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please make sure the ANTHROPIC_API_KEY is configured.'
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-96">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-gray-400 text-sm">
            <p className="mb-3">Ask questions about your data:</p>
            <ul className="space-y-2">
              <li className="cursor-pointer hover:text-gray-600" onClick={() => setInput("What's the onboarding completion rate?")}>
                • "What's the onboarding completion rate?"
              </li>
              <li className="cursor-pointer hover:text-gray-600" onClick={() => setInput("Where are users dropping off?")}>
                • "Where are users dropping off?"
              </li>
              <li className="cursor-pointer hover:text-gray-600" onClick={() => setInput("Compare this week to last week")}>
                • "Compare this week to last week"
              </li>
              <li className="cursor-pointer hover:text-gray-600" onClick={() => setInput("Any anomalies today?")}>
                • "Any anomalies today?"
              </li>
            </ul>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-lg text-sm ${msg.role === 'user'
              ? 'bg-accent/10 ml-8 text-gray-800'
              : 'bg-gray-100 mr-8 text-gray-700'
            }`}
          >
            <div className="whitespace-pre-wrap">{msg.content}</div>
          </div>
        ))}
        {loading && (
          <div className="bg-gray-100 mr-8 p-3 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="animate-spin h-4 w-4 border-2 border-accent border-t-transparent rounded-full"></div>
              Analyzing your data...
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about your analytics..."
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-sm"
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent-dark disabled:opacity-50 transition-colors text-sm font-medium"
        >
          Send
        </button>
      </form>
    </div>
  )
}
