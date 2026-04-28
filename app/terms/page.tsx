'use client';

export default function Terms() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 24px' }}>
      <div className="card" style={{ padding: '48px', position: 'relative' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Terms of Service</h1>
        <p style={{ color: '#5A4A3A', marginBottom: '24px' }}>Last Updated: April 1, 2026</p >

        {/* 条款摘要模块 */}
        <div style={{
          backgroundColor: '#F9F3EC',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          border: '1px solid #E6DFD6',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#3D3228', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>📋</span> In a nutshell
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>You keep your photos</strong> — we only process them to generate designs.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Free tier: personal use only.</strong> Paid plans unlock commercial rights.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Credits never expire</strong> while your account is active.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>No subscriptions, no auto‑renewal</strong> — pay once, use anytime.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>We don't train AI on your uploads</strong> without your consent.</span>
            </li>
          </ul>
          <p style={{ fontSize: '12px', color: '#8C7A6B', marginTop: '16px', marginBottom: 0, fontStyle: 'italic' }}>
            This is a friendly summary. The full legal terms below are what actually govern your use of AuraHome AI.
          </p >
        </div>

        <h2>1. Acceptance of Terms</h2>
        <p>By accessing, registering, or using AuraHome AI, you confirm that you are at least 13 years old (or 16 if you are in the EU) and agree to be bound by these Terms. These Terms apply from your first use of the Service. If you disagree with any part, you may not use our service.</p >

        <h2>2. Description of Service</h2>
        <p>AuraHome AI is an online, AI‑powered interior design SaaS tool. Users upload room photos, select design preferences, and receive AI‑generated design images. AI outputs are for creative reference only and do not constitute professional architectural or design advice. We may modify, suspend, or discontinue the Service (with 7 days’ notice for material changes) and do not guarantee uninterrupted 24/7 availability.</p >

        <h2>3. User Responsibilities</h2>
        <p>You must own or have permission to use any photos you upload. You may not upload illegal, infringing, harmful, or minors‑sensitive content. You are solely responsible for all activity under your account. You must keep your credentials secure and not share, rent, or sell your account. Immediately notify us if your account is compromised.</p >

        <h2>4. Intellectual Property</h2>
        <p><strong>Original photos:</strong> You retain full ownership of your uploaded images.</p >
        <p><strong>AI‑generated designs:</strong><br/>
        – Free users: personal, non‑commercial use only. No resale or distribution.<br/>
        – Mini / Basic packs: personal and small‑studio commercial use (e.g., client projects). No resale or bulk distribution of the generated images.<br/>
        – Pro / Business packs: full commercial use for companies, including bulk generation, but still no resale of the images as standalone assets.<br/>
        <strong>No copyright guarantee:</strong> AI‑generated outputs may not be eligible for copyright protection. You assume all risks associated with using AI‑generated content.<br/>
        <strong>Platform rights:</strong> We may display anonymized (non‑identifiable) designs in our gallery or promotional materials. You can opt out at any time by emailing us; we will remove your content within 7 days.<br/>
        <strong>Model training:</strong> We will not use your uploaded photos or generated designs to train our models without your explicit written consent.</p >

        <h2>5. Credits & Purchases</h2>
        <p><strong>Free credits:</strong> Registered users receive <strong>1 free design per day</strong>. Credits reset daily at 00:00 UTC, do not roll over, are non‑transferable, and have no cash value.</p >
        <p><strong>Paid credit packs:</strong><br/>
        – Mini: 5 credits / $2<br/>
        – Basic: 30 credits / $9<br/>
        – Pro: 100 credits / $19<br/>
        – Business: 200 credits / $29<br/>
        All prices are in USD, exclusive of taxes. Paid credits are non‑transferable and have no cash value. Credits do not expire while your account is active; they are forfeited upon account closure and are non‑refundable except as provided in our Refund Policy.<br/>
        <strong>No auto‑renewal:</strong> All purchases are one‑time prepaid credit packs; there are no recurring subscriptions.</p >
        <p><strong>Pro / Business pack benefits:</strong> Priority support (24h vs 48h for others), commercial use rights, higher resolution, no watermark, and batch generation.</p >
        <p><strong>Payment:</strong> Processed by third‑party providers (e.g., PayPal). We do not store your payment card details.</p >
        <p><strong>Price changes:</strong> We may adjust prices; changes apply only to future purchases.</p >
        <p><strong>Refunds:</strong> Governed by our separate <a href=" " style={{ color: '#E67E22' }}>Refund Policy</a >.</p >

        <h2>6. Prohibited Uses</h2>
        <p>You may not:<br/>
        – Generate, upload, or share illegal, infringing, defamatory, obscene, violent, hateful, or discriminatory content.<br/>
        – Impersonate others, share accounts, or engage in fraud.<br/>
        – Use automated tools, scrapers, or bots to access the Service.<br/>
        – Reverse engineer, decompile, or attempt to extract source code.<br/>
        – Bypass credit limits or security measures.<br/>
        – Use free‑tier outputs for commercial purposes.<br/>
        – Introduce malware or disrupt the Service.<br/>
        Violation may result in immediate account suspension/termination without refund.</p >

        <h2>7. Disclaimer of Warranties</h2>
        <p>The Service is provided “AS IS” and “AS AVAILABLE”. We disclaim all warranties, express or implied, including merchantability, fitness for a particular purpose, and non‑infringement. We do not warrant that the Service will be uninterrupted, error‑free, or that outputs will meet your expectations. AI outputs are for reference only and not professional advice.</p >

        <h2>8. Limitation of Liability</h2>
        <p>To the maximum extent permitted by law, AuraHome AI and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the Service. <strong>Our total liability shall not exceed the amount you paid us in the past 12 months (or $100 if no payment).</strong> This limitation does not apply to liability resulting from our gross negligence, fraud, or death/personal injury.</p >

        <h2>9. Account Termination & Suspension</h2>
        <p>We may suspend or terminate your account immediately if you violate these Terms, engage in fraud, abuse, or provide false information. You may delete your account at any time by contacting us; unused credits will be forfeited without refund.</p >

        <h2>10. Third‑Party Services</h2>
        <p>Our Service may include third‑party APIs (e.g., 302.ai) or links to external sites. We are not responsible for the content, privacy practices, or availability of those third‑party services. Your use of them is subject to their own terms and at your own risk.</p >

        <h2>11. Changes to Terms</h2>
        <p>We may modify these Terms. For material changes, we will notify you via email or website notice at least 7 days in advance. Your continued use after the effective date constitutes acceptance. If you do not agree, you may stop using the Service and delete your account.</p >

        <h2>12. Governing Law & Disputes</h2>
        <p>These Terms are governed by the laws of the State of California, USA, without regard to conflict of laws principles. Any dispute shall first be resolved through good‑faith negotiation; if unresolved, either party may bring a claim in the state or federal courts located in Los Angeles County, California.</p >

        <h2>13. Contact Us & Policy Updates</h2>
        <p>For questions, concerns, or account issues, please email us at <a href="mailto:hanmuyan888@gmail.com" style={{ color: '#E67E22' }}>hanmuyan888@gmail.com</a >. We will respond within 3‑5 business days (Monday–Friday, excluding public holidays).</p >
        <p>We may update these Terms from time to time. The latest version will always be posted on this page. Your continued use of the Service after any changes constitutes acceptance of the revised Terms.</p >

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