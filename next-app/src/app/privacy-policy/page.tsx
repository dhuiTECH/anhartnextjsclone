import { Metadata } from 'next';
import Footer from '../Merritt/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy | Anhart',
  description: 'Anhart\'s privacy policy explaining how we collect, use, and protect your personal information.',
  keywords: 'privacy policy, data protection, personal information, Anhart',
  openGraph: {
    title: 'Privacy Policy | Anhart',
    description: 'Learn how Anhart protects and handles your personal information.',
    type: 'website',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#f9f8f6]">
      {/* Header */}
      <header className="bg-[#1a2621] text-[#f2f0eb] py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl opacity-80 leading-relaxed">
              How we collect, use, and protect your personal information
            </p>
            <div className="mt-4 text-sm opacity-60">
              Last updated: {new Date().toLocaleDateString('en-CA', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="py-16 md:py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">

            <div className="prose prose-lg max-w-none">

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Introduction</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  At Anhart, we are committed to protecting your privacy and ensuring the security of your personal information.
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our
                  website, contact us, or engage with our services.
                </p>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  By using our website or providing us with personal information, you consent to the practices described in this policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Information We Collect</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  We may collect the following types of information:
                </p>
                <ul className="list-disc pl-6 text-[#1a2621]/80 space-y-2 mb-4">
                  <li><strong>Personal Information:</strong> Name, email address, phone number, mailing address</li>
                  <li><strong>Communication Data:</strong> Messages, inquiries, and feedback you send us</li>
                  <li><strong>Usage Information:</strong> How you interact with our website and services</li>
                  <li><strong>Location Data:</strong> Information about your location preferences or current residence</li>
                  <li><strong>Referral Information:</strong> How you heard about our projects and services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">How We Use Your Information</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 text-[#1a2621]/80 space-y-2 mb-4">
                  <li>To respond to your inquiries and provide customer service</li>
                  <li>To communicate about our housing projects and developments</li>
                  <li>To conduct market research and improve our services</li>
                  <li>To comply with legal obligations and protect our rights</li>
                  <li>To enhance our website and user experience</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Information Sharing and Disclosure</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  We are committed to protecting your privacy and do not sell, trade, or otherwise transfer your personal information to third parties, except in the following limited circumstances:
                </p>
                <ul className="list-disc pl-6 text-[#1a2621]/80 space-y-2 mb-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal requirements or court orders</li>
                  <li>To protect our rights, property, or safety, or that of our customers</li>
                  <li>In connection with a business transfer or acquisition</li>
                  <li>With trusted service providers who assist us in operating our business (under strict confidentiality agreements)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Data Security</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 text-[#1a2621]/80 space-y-2 mb-4">
                  <li>Secure data transmission using SSL encryption</li>
                  <li>Regular security assessments and updates</li>
                  <li>Limited access to personal information on a need-to-know basis</li>
                  <li>Secure storage and disposal of information</li>
                </ul>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Your Rights and Choices</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-[#1a2621]/80 space-y-2 mb-4">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                  <li><strong>Opt-out:</strong> Unsubscribe from marketing communications at any time</li>
                  <li><strong>Portability:</strong> Request transfer of your data in a structured format</li>
                </ul>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  To exercise these rights, please contact us using the information provided below.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Cookies and Tracking</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  Our website may use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and understand user preferences. You can control cookie settings through your browser preferences.
                </p>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  We do not use cookies for targeted advertising or to track users across other websites.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Data Retention</h2>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  We retain your personal information only as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law. When information is no longer needed, we securely delete or anonymize it.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Children's Privacy</h2>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">International Data Transfers</h2>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  Your information may be processed and stored in Canada and other countries where Anhart operates or uses service providers. We ensure that appropriate safeguards are in place to protect your information when it is transferred internationally.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Changes to This Privacy Policy</h2>
                <p className="text-[#1a2621]/80 leading-relaxed">
                  We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated policy on our website and updating the "Last updated" date.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-serif font-semibold text-[#1a2621] mb-4">Contact Us</h2>
                <p className="text-[#1a2621]/80 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-[#f9f8f6] p-4 rounded-lg">
                  <p className="text-[#1a2621]/80 mb-2"><strong>Anhart</strong></p>
                  <p className="text-[#1a2621]/80 mb-2">Suite 1480, RBC Building</p>
                  <p className="text-[#1a2621]/80 mb-2">Vancouver, BC</p>
                  <p className="text-[#1a2621]/80 mb-2">Email: info@anhart.ca</p>
                  <p className="text-[#1a2621]/80">Phone: 604.529.6259</p>
                </div>
              </section>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

