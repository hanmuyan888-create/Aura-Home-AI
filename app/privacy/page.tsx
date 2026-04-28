'use client';

export default function Privacy() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 24px' }}>
      <div className="card" style={{ padding: '48px', position: 'relative' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Privacy Policy</h1>
        <p style={{ color: '#5A4A3A', marginBottom: '24px' }}>Last Updated: April 1, 2026</p >

        {/* 隐私摘要模块 */}
        <div style={{
          backgroundColor: '#F9F3EC',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          border: '1px solid #E6DFD6',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#3D3228', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🔒</span> Your privacy at a glance
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Your photos are deleted within 24 hours</strong> — we don't keep them.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>We never sell your data</strong> — your email and usage are only for providing the service.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>AI provider (302.ai) processes images in real time</strong> and doesn't store them.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>You can delete your account anytime</strong> — we'll remove your info within 30 days.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>No marketing emails without your consent</strong> — only service updates.</span>
            </li>
          </ul>
          <p style={{ fontSize: '12px', color: '#8C7A6B', marginTop: '16px', marginBottom: 0, fontStyle: 'italic' }}>
            This is a friendly summary. The full privacy policy below explains everything in detail.
          </p >
        </div>

        <h2>1. Information We Collect</h2>
        <p><strong>Uploaded photos:</strong> Your room photos are temporarily stored on encrypted servers only during the AI generation process. They are automatically and permanently deleted within 24 hours after generation. We do not retain backups unless you explicitly consent for testing purposes.</p >
        <p><strong>Account information:</strong> When you register, we collect your email address. We use it for account verification, login, password recovery, service notifications, and support. Your email is stored securely and never shared with third parties except as required by law or necessary for service provision.</p >
        <p><strong>Usage data:</strong> We collect anonymized, de‑identified data such as device type, browser, access times, number of designs, style choices, and interactions. This data cannot identify you and is used solely for service improvement and analytics.</p >
        <p><strong>Device information:</strong> To ensure security and stability, we may collect IP addresses, device models, network types, and similar basic information.</p >
        <p><strong>Cookies & similar technologies:</strong> We use cookies to remember login status, preferences, and for analytics. You can disable cookies in your browser settings, but some features may not work properly.</p >

        <h2>2. How We Use Your Information</h2>
        <p>We use your information only for:<br/>
        – Providing and improving the Service (design generation, account management, troubleshooting).<br/>
        – Sending necessary service notifications and support responses (no marketing without your consent).<br/>
        – Analyzing usage patterns to enhance features and user experience.<br/>
        – Protecting against fraud, abuse, and security threats.<br/>
        – Complying with legal obligations.<br/>
        We never use your data for unrelated purposes without your explicit consent.</p >

        <h2>3. Data Storage & Security</h2>
        <p>Your information is stored on secure cloud servers with industry‑standard encryption (SSL/TLS). We implement access controls, encryption at rest, and regular security audits. While we strive to protect your data, no method of transmission or storage is 100% secure.</p >
        <p>If you delete your account, we will remove your personal information within <strong>30 days</strong>, except where retention is required by law or for legitimate business purposes (e.g., fraud prevention).</p >

        <h2>4. Data Sharing with Third Parties</h2>
        <p>We do not sell your personal data. We may share data with:<br/>
        – <strong>AI Service Provider (302.ai):</strong> Your uploaded photos are sent to 302.ai solely to generate the requested designs. They process the images in real time and do not store or use them for any other purpose. Their privacy policy applies to their processing.<br/>
        – <strong>Payment processors (e.g., PayPal):</strong> To handle purchases. We do not receive or store your payment card details.<br/>
        – <strong>Legal authorities:</strong> When required by law or to protect our rights.<br/>
        All third parties are contractually obligated to protect your data and use it only for the specified services.</p >

        <h2>5. Cross‑Border Data Transfers</h2>
        <p>Your information may be transferred to and stored on servers located outside your country of residence. By using the Service, you consent to such transfers. We ensure appropriate safeguards are in place to protect your data.</p >

        <h2>6. Your Privacy Rights</h2>
        <p>You have the right to:<br/>
        – Access the personal data we hold about you.<br/>
        – Request correction of inaccurate or incomplete information.<br/>
        – Request deletion of your personal data (subject to legal retention obligations).<br/>
        – Withdraw consent for processing (where consent is the legal basis).<br/>
        – Opt out of marketing emails by clicking the “unsubscribe” link at the bottom of any such email.<br/>
        To exercise these rights, email us at <a href=" " style={{ color: '#E67E22' }}>hanmuyan888@gmail.com</a >. We will respond within 30 days.</p >

        <h2>7. Children’s Privacy</h2>
        <p>Our Service is not intended for children under 13 (or under 16 in the EU). We do not knowingly collect personal information from children. If we become aware of such data, we will delete it immediately. Parents or guardians may contact us to request removal.</p >

        <h2>8. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. The “Last Updated” date indicates the latest version. Material changes will be communicated via email or website notice. Your continued use of the Service after the changes constitutes acceptance.</p >

        <h2>9. Contact Us & Policy Updates</h2>
        <p>If you have any questions or concerns about this Privacy Policy or your data, please email <a href="mailto:hanmuyan888@gmail.com" style={{ color: '#E67E22' }}>hanmuyan888@gmail.com</a >. We will respond within 3‑5 business days.</p >
        <p>The latest version of this Privacy Policy will always be available on this page. Your continued use of the Service after any changes indicates your acceptance of the revised policy.</p >

        {/* 返回顶部按钮 */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#E67E22',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            fontSize: '24px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            zIndex: 999,
          }}
          aria-label="Back to top"
        >
          ↑
        </button>
      </div>
    </div>
  );
}