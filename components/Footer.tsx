import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-12 border-t border-[#e5e5e5] mt-16">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center flex-wrap gap-6">
          <div className="text-lg font-bold">💍 Daily I Do</div>
          <ul className="flex gap-8 list-none">
            <li>
              <Link href="/" className="text-sm text-[#7a7a7a] hover:text-[#1a1a1a] transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/realwedding" className="text-sm text-[#7a7a7a] hover:text-[#1a1a1a] transition-colors">
                Real Weddings
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="text-sm text-[#7a7a7a] hover:text-[#1a1a1a] transition-colors">
                Privacy
              </Link>
            </li>
          </ul>
        </div>
        <div className="mt-8 pt-6 border-t border-[#e5e5e5] text-center text-sm text-[#7a7a7a]">
          &copy; 2025 Daily I Do. Made with love for love.
        </div>
      </div>
    </footer>
  )
}
