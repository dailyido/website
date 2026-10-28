/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.pravatar.cc', 'zhekxbzyflcqeisknxwu.supabase.co'],
  },
  async rewrites() {
    return [
      // Serve the static App Store link page (public/getapp/index.html) at /getapp.
      // Used for Instagram/TikTok bios and DMs; see public/getapp/index.html.
      { source: '/getapp', destination: '/getapp/index.html' },
    ]
  },
}

module.exports = nextConfig
