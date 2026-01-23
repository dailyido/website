import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Privacy Policy | Daily I Do',
  description: 'Privacy Policy for Daily I Do wedding planning app.',
}

export default function Privacy() {
  return (
    <>
      <Navigation />

      <section className="pt-[calc(3rem+80px)] pb-16">
        <div className="max-w-[800px] mx-auto px-6">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-lg text-[#7a7a7a] mb-4">Daily I Do</p>
          <p className="text-sm text-[#7a7a7a] mb-10 pb-6 border-b border-[#e5e5e5]">Effective Date: January 23, 2026</p>

          <div className="prose prose-gray max-w-none">
            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Introduction</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">1415 Collective, LLC ("we," "our," or "us") operates the Daily I Do mobile application (the "App"). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.</p>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">By using Daily I Do, you agree to the collection and use of information in accordance with this policy.</p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Information We Collect</h2>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-[#1a1a1a]">Information You Provide</h3>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">When you use Daily I Do, you may provide us with the following personal information:</p>
            <ul className="text-[#4a4a4a] mb-4 pl-6 list-disc space-y-2">
              <li><strong className="text-[#1a1a1a]">Name</strong> — Your name and your partner's name for personalization</li>
              <li><strong className="text-[#1a1a1a]">Wedding Date</strong> — To calculate your countdown and deliver timely tips</li>
              <li><strong className="text-[#1a1a1a]">Wedding Town</strong> — The town or city where you're getting married (used to calculate sunset time for your wedding day)</li>
              <li><strong className="text-[#1a1a1a]">Email Address</strong> (optional) — If you choose to provide it in Settings</li>
              <li><strong className="text-[#1a1a1a]">Wedding Preferences</strong> — Such as whether you're having a tented wedding</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-[#1a1a1a]">Information Collected Automatically</h3>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">When you use the App, we may automatically collect:</p>
            <ul className="text-[#4a4a4a] mb-4 pl-6 list-disc space-y-2">
              <li><strong className="text-[#1a1a1a]">Usage Data</strong> — Screens viewed, tips completed, features used, app opens, and session duration</li>
              <li><strong className="text-[#1a1a1a]">Device Information</strong> — Device type, operating system version, and unique device identifiers</li>
              <li><strong className="text-[#1a1a1a]">Streak and Progress Data</strong> — Your tip completion history and engagement patterns</li>
            </ul>

            <h3 className="text-lg font-semibold mt-6 mb-3 text-[#1a1a1a]">Information from Third-Party Services</h3>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">We use the following third-party services that may collect information:</p>
            <ul className="text-[#4a4a4a] mb-4 pl-6 list-disc space-y-2">
              <li><strong className="text-[#1a1a1a]">Supabase</strong> — For secure data storage and authentication</li>
              <li><strong className="text-[#1a1a1a]">RevenueCat</strong> — For managing subscriptions and purchases</li>
              <li><strong className="text-[#1a1a1a]">Superwall</strong> — For displaying subscription offers</li>
              <li><strong className="text-[#1a1a1a]">Google Places API</strong> — For wedding location autocomplete (processes only the search queries you type; we store only the town name you select)</li>
              <li><strong className="text-[#1a1a1a]">Apple Reminders</strong> — If you choose to integrate with Apple Reminders, the App accesses your Reminders with your permission</li>
            </ul>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">How We Use Your Information</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">We use the information we collect to:</p>
            <ul className="text-[#4a4a4a] mb-4 pl-6 list-disc space-y-2">
              <li>Provide and personalize your wedding countdown experience</li>
              <li>Deliver daily tips tailored to your wedding timeline</li>
              <li>Calculate sunset time for your wedding day based on your wedding location</li>
              <li>Track your progress and streaks within the App</li>
              <li>Send push notifications including daily reminders, milestone celebrations, and promotional messages</li>
              <li>Process and manage your subscription</li>
              <li>Analyze usage patterns to improve the App</li>
              <li>Respond to your inquiries and support requests</li>
            </ul>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Push Notifications</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">With your permission, we send push notifications including:</p>
            <ul className="text-[#4a4a4a] mb-4 pl-6 list-disc space-y-2">
              <li>Daily tip reminders</li>
              <li>Streak and milestone celebrations</li>
              <li>Scheduled wedding planning reminders</li>
              <li>Promotional and marketing messages</li>
            </ul>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">You can manage or disable push notifications at any time through your device settings.</p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Data Sharing and Disclosure</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed"><strong className="text-[#1a1a1a]">We do not sell your personal information.</strong></p>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">We may share your information only in the following circumstances:</p>
            <ul className="text-[#4a4a4a] mb-4 pl-6 list-disc space-y-2">
              <li><strong className="text-[#1a1a1a]">Service Providers</strong> — With third-party services (listed above) that help us operate the App, subject to confidentiality obligations</li>
              <li><strong className="text-[#1a1a1a]">Legal Requirements</strong> — If required by law, court order, or governmental authority</li>
              <li><strong className="text-[#1a1a1a]">Business Transfers</strong> — In connection with a merger, acquisition, or sale of assets, your information may be transferred</li>
            </ul>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Data Storage and Security</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">Your data is stored securely using Supabase, which employs industry-standard security measures including encryption. We retain your personal information for as long as your account exists.</p>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">While we implement reasonable security measures, no method of electronic storage is 100% secure. We cannot guarantee absolute security of your data.</p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Your Rights and Choices</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">You have the following rights regarding your data:</p>
            <ul className="text-[#4a4a4a] mb-4 pl-6 list-disc space-y-2">
              <li><strong className="text-[#1a1a1a]">Access and Update</strong> — You can view and update your personal information in the App's Settings</li>
              <li><strong className="text-[#1a1a1a]">Account Deletion</strong> — You can request deletion of your account and all associated data by emailing us at <a href="mailto:1415.jamie@gmail.com" className="text-accent hover:text-accent-dark underline">1415.jamie@gmail.com</a></li>
              <li><strong className="text-[#1a1a1a]">Push Notifications</strong> — You can disable notifications through your device settings</li>
              <li><strong className="text-[#1a1a1a]">Apple Reminders Access</strong> — You can revoke Reminders access through your device's Privacy settings</li>
            </ul>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Children's Privacy</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">Daily I Do is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately at <a href="mailto:1415.jamie@gmail.com" className="text-accent hover:text-accent-dark underline">1415.jamie@gmail.com</a> and we will delete that information.</p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Third-Party Links</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">The App may contain links to third-party websites or services (such as affiliate links to wedding vendors). We are not responsible for the privacy practices of these third parties. We encourage you to review their privacy policies.</p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Changes to This Privacy Policy</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy in the App and updating the "Effective Date" above. You are advised to review this Privacy Policy periodically.</p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">Contact Us</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">If you have questions about this Privacy Policy or wish to exercise your data rights, please contact us:</p>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">
              <strong className="text-[#1a1a1a]">1415 Collective, LLC</strong><br />
              Email: <a href="mailto:1415.jamie@gmail.com" className="text-accent hover:text-accent-dark underline">1415.jamie@gmail.com</a>
            </p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">California Privacy Rights</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">If you are a California resident, you have additional rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information we collect, the right to delete your personal information, and the right to opt-out of the sale of personal information. As stated above, we do not sell personal information.</p>

            <hr className="my-10 border-[#e5e5e5]" />

            <h2 className="text-2xl font-semibold mt-10 mb-4 text-[#1a1a1a]">International Users</h2>
            <p className="text-[#4a4a4a] mb-4 leading-relaxed">If you are accessing the App from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States where our servers are located. By using the App, you consent to this transfer.</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
