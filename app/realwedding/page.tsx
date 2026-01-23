'use client'

import { useState } from 'react'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'

export default function RealWedding() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showTerms, setShowTerms] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'))
    setSelectedFiles(prev => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // Upload photos
      const photoUrls: string[] = []
      for (const file of selectedFiles) {
        const fileName = `${Date.now()}-${file.name}`
        const { data, error } = await supabase.storage
          .from('wedding-photos')
          .upload(fileName, file)

        if (error) throw error

        const { data: urlData } = supabase.storage
          .from('wedding-photos')
          .getPublicUrl(fileName)

        photoUrls.push(urlData.publicUrl)
      }

      // Insert into database
      const { error } = await supabase.from('submissions').insert([{
        couple_names: formData.get('coupleNames'),
        couple_instagram: formData.get('coupleInstagram') || null,
        wedding_date: formData.get('weddingDate'),
        wedding_location: formData.get('weddingLocation'),
        vendor_instagrams: formData.get('vendorInstagrams') || null,
        favorite_detail: formData.get('favoriteDetail') || null,
        photo_urls: photoUrls,
        terms_accepted: true,
        status: 'pending',
        created_at: new Date().toISOString()
      }])

      if (error) throw error

      setShowSuccess(true)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (error) {
      console.error('Submission error:', error)
      alert('There was an error submitting your wedding. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navigation />

      {/* Page Header */}
      <header className="pt-[calc(6rem+80px)] pb-12 text-center">
        <div className="max-w-[1200px] mx-auto px-6">
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-4">Real Weddings</p>
          <h1 className="text-4xl font-bold text-[#1a1a1a] mb-4">Share Your Story</h1>
          <p className="text-lg text-[#4a4a4a]">We'd love to feature your wedding. Fill out the form below!</p>
        </div>
      </header>

      {/* Form Section */}
      <section className="pb-16">
        <div className="max-w-[600px] mx-auto px-6">
          {!showSuccess ? (
            <form onSubmit={handleSubmit}>
              <div className="bg-white border border-[#e5e5e5] rounded-2xl p-8 shadow-sm">
                {/* Couple Names */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-[#1a1a1a]">Couple Names *</label>
                  <input
                    type="text"
                    name="coupleNames"
                    placeholder="e.g. Sarah & Michael"
                    required
                    className="w-full px-4 py-3 bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg text-[#1a1a1a] focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10"
                  />
                </div>

                {/* Couple Instagram */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-[#1a1a1a]">
                    Couple Instagram Handle <span className="text-[#7a7a7a] font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    name="coupleInstagram"
                    placeholder="@yourhandle"
                    className="w-full px-4 py-3 bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg text-[#1a1a1a] focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10"
                  />
                </div>

                {/* Wedding Date */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-[#1a1a1a]">Wedding Date *</label>
                  <input
                    type="date"
                    name="weddingDate"
                    required
                    className="w-full px-4 py-3 bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg text-[#1a1a1a] focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10"
                  />
                </div>

                {/* Wedding Location */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-[#1a1a1a]">Wedding Location *</label>
                  <input
                    type="text"
                    name="weddingLocation"
                    placeholder="e.g. Napa Valley, California"
                    required
                    className="w-full px-4 py-3 bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg text-[#1a1a1a] focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10"
                  />
                </div>

                {/* Vendor Instagram Handles */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-[#1a1a1a]">
                    Vendor Instagram Handles <span className="text-[#7a7a7a] font-normal">(optional)</span>
                  </label>
                  <textarea
                    name="vendorInstagrams"
                    placeholder="e.g. Photographer: @janedoephoto&#10;Florist: @bloomsbyanna&#10;Venue: @thevineyardestate"
                    className="w-full px-4 py-3 bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg text-[#1a1a1a] focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 min-h-[120px] resize-y"
                  />
                </div>

                {/* Favorite Detail */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-[#1a1a1a]">
                    Favorite Wedding Day Detail <span className="text-[#7a7a7a] font-normal">(optional)</span>
                  </label>
                  <textarea
                    name="favoriteDetail"
                    placeholder="Tell us about a special moment or detail from your day..."
                    className="w-full px-4 py-3 bg-[#f8f6f4] border border-[#e5e5e5] rounded-lg text-[#1a1a1a] focus:outline-none focus:border-accent focus:bg-white focus:ring-2 focus:ring-accent/10 min-h-[120px] resize-y"
                  />
                </div>

                {/* Photo Upload */}
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-medium text-[#1a1a1a]">Wedding Photos *</label>
                  <div className="relative border-2 border-dashed border-[#e5e5e5] rounded-xl p-10 text-center bg-[#f8f6f4] hover:border-accent hover:bg-white transition-colors cursor-pointer">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="text-4xl mb-3">{selectedFiles.length > 0 ? '✓' : '📷'}</div>
                    <p className="text-[#4a4a4a]">
                      {selectedFiles.length > 0 ? (
                        <>
                          <strong className="text-green-500">{selectedFiles.length} photo{selectedFiles.length > 1 ? 's' : ''} added</strong><br />
                          <span className="text-xs opacity-70">Click to add more</span>
                        </>
                      ) : (
                        <>
                          <strong className="text-accent">Click to upload</strong> or drag and drop<br />
                          <span className="text-xs opacity-70">PNG, JPG, WEBP up to 10MB each</span>
                        </>
                      )}
                    </p>
                  </div>

                  {/* File List */}
                  {selectedFiles.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="flex justify-between items-center px-3 py-2 bg-black/[0.03] rounded-md text-sm">
                          <span className="flex items-center gap-2">
                            <span>📷</span>
                            <span className="text-[#333]">{file.name.length > 30 ? file.name.substring(0, 27) + '...' : file.name}</span>
                            <span className="text-[#999] text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(index)}
                            className="text-[#999] hover:text-[#333] text-lg"
                          >
                            &times;
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Terms Checkbox */}
                <div className="mt-8 mb-4">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      required
                      className="mt-1 w-[18px] h-[18px] accent-accent"
                    />
                    <span className="text-sm text-[#4a4a4a]">
                      I confirm I have permission to share this content and agree to Daily I Do's{' '}
                      <button
                        type="button"
                        onClick={() => setShowTerms(true)}
                        className="text-accent underline hover:text-accent-dark"
                      >
                        terms
                      </button>{' '}
                      for use and sharing on its website and social media, including Instagram.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 mt-4 bg-black text-white rounded-lg font-semibold hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Your Wedding'}
                </button>
              </div>
            </form>
          ) : (
            /* Success Message */
            <div className="bg-white border border-[#e5e5e5] rounded-2xl p-12 text-center shadow-sm">
              <div className="text-6xl mb-6">💐</div>
              <h3 className="text-2xl font-bold text-[#1a1a1a] mb-4">Thank You!</h3>
              <p className="text-[#4a4a4a] mb-8">
                Your wedding submission has been received! We'll review your photos and reach out if we'd like to feature your special day.
              </p>
              <a href="/" className="inline-block px-6 py-3 border border-[#e5e5e5] rounded-lg text-[#1a1a1a] hover:bg-[#f8f6f4] transition-colors">
                Back to Home
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Terms Modal */}
      {showTerms && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000] p-4"
          onClick={() => setShowTerms(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-[600px] w-full max-h-[80vh] overflow-hidden shadow-xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="p-6 border-b border-[#e5e5e5] flex justify-between items-center">
              <h3 className="text-xl font-semibold text-[#1a1a1a]">Image & Wedding Information Submission Terms</h3>
              <button
                onClick={() => setShowTerms(false)}
                className="text-[#7a7a7a] hover:text-[#1a1a1a] text-2xl"
              >
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[60vh] text-sm text-[#4a4a4a] leading-relaxed">
              <p className="mb-6">By submitting images, wedding details, or other content to Daily I Do ("we," "us," or "our"), you agree to the following terms:</p>

              <h4 className="text-[#1a1a1a] font-semibold mt-6 mb-3">Ownership & Rights</h4>
              <p className="mb-4">You confirm that you own the rights to the images and information you submit, or that you have permission from the photographer and any identifiable individuals to share this content.</p>

              <h4 className="text-[#1a1a1a] font-semibold mt-6 mb-3">Permission to Use Content</h4>
              <p className="mb-4">You grant Daily I Do permission to use, share, repost, and display submitted images and wedding details for promotional and editorial purposes. This may include use on our website, social media platforms (including Daily I Do's Instagram), marketing materials, and app-related content.</p>

              <h4 className="text-[#1a1a1a] font-semibold mt-6 mb-3">Credit</h4>
              <p className="mb-4">When possible, we will credit couples, photographers, and vendors as provided at the time of submission. You acknowledge that credit may vary based on platform limitations.</p>

              <h4 className="text-[#1a1a1a] font-semibold mt-6 mb-3">No Compensation</h4>
              <p className="mb-4">Submissions are voluntary and provided without expectation of payment or compensation.</p>

              <h4 className="text-[#1a1a1a] font-semibold mt-6 mb-3">Editing & Removal</h4>
              <p className="mb-4">Daily I Do may edit content for clarity, length, or formatting. We reserve the right not to publish submitted content or to remove it at any time.</p>

              <h4 className="text-[#1a1a1a] font-semibold mt-6 mb-3">Privacy</h4>
              <p className="mb-4">We will not intentionally share private or sensitive information beyond what you submit for public use. If you wish to remove content at a later date, you may contact us and we will make reasonable efforts to do so.</p>

              <h4 className="text-[#1a1a1a] font-semibold mt-6 mb-3">Agreement</h4>
              <p>By submitting content, you confirm that you have read, understood, and agreed to these terms.</p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
