'use client';

export default function AcceptableUse() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 24px' }}>
      <div className="card" style={{ padding: '48px', position: 'relative' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Acceptable Use Policy</h1>
        <p style={{ color: '#5A4A3A', marginBottom: '24px' }}>Last Updated: April 8, 2026</p >

        {/* 摘要模块 */}
        <div style={{
          backgroundColor: '#F9F3EC',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          border: '1px solid #E6DFD6',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#3D3228', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>⚖️</span> Acceptable Use at a glance
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Be respectful and lawful</strong> — no illegal, harmful, or abusive content.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Respect intellectual property</strong> — only upload images you own or have permission to use.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>No automated abuse</strong> — bots, scrapers, or excessive API calls are prohibited.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Keep the community safe</strong> — we may suspend accounts that violate this policy.</span>
            </li>
          </ul>
          <p style={{ fontSize: '12px', color: '#8C7A6B', marginTop: '16px', marginBottom: 0, fontStyle: 'italic' }}>
            This is a summary. Please read the full policy below.
          </p >
        </div>

        <h2>1. Introduction</h2>
        <p>
          This Acceptable Use Policy (&quot;AUP&quot;) outlines the rules and guidelines for using AuraHome AI (&quot;Service&quot;). By accessing or using our Service, you agree to comply with this policy. We reserve the right to enforce this policy at our sole discretion, including suspending or terminating accounts that violate it.
        </p >

        <h2>2. Prohibited Content & Activities</h2>
        <p>You may not use AuraHome AI to create, upload, share, or promote any content that:</p >
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', color: '#5A4A3A' }}>
          <li>Is illegal, fraudulent, or promotes illegal activities.</li>
          <li>Infringes on intellectual property rights (copyright, trademark, trade secret) of others.</li>
          <li>Is defamatory, harassing, threatening, or invades the privacy of others.</li>
          <li>Contains hate speech, discrimination, or promotes violence against individuals or groups.</li>
          <li>Is obscene, pornographic, or sexually explicit.</li>
          <li>Depicts minors in any harmful or inappropriate context.</li>
          <li>Contains malicious code, viruses, or attempts to compromise the security of our systems.</li>
        </ul>

        <p>Additionally, you may not:</p >
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', color: '#5A4A3A' }}>
          <li>Use automated means (bots, scrapers, crawlers) to access or extract data from the Service without permission.</li>
          <li>Attempt to circumvent any usage limits, credit systems, or security measures.</li>
          <li>Reverse engineer, decompile, or disassemble any part of the Service.</li>
          <li>Impersonate another person or misrepresent your affiliation with any entity.</li>
          <li>Use the Service to generate spam, unsolicited messages, or misleading content.</li>
        </ul>

        <h2>3. Intellectual Property & User Content</h2>
        <p>
          You retain ownership of the images you upload. However, you grant AuraHome AI a limited, non‑exclusive license to process those images solely for the purpose of providing the requested AI design generation. This license ends when the processing is complete and the images are deleted (within 24 hours).
        </p >
        <p>
          You represent and warrant that you have all necessary rights to any content you upload, and that such content does not violate this AUP or any applicable laws.
        </p >

        <h2>4. Consequences of Violation</h2>
        <p>
          If we determine that you have violated this Acceptable Use Policy, we may take one or more of the following actions:
        </p >
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', color: '#5A4A3A' }}>
          <li>Immediate suspension or termination of your account.</li>
          <li>Removal of prohibited content.</li>
          <li>Forfeiture of unused credits without refund.</li>
          <li>Reporting illegal activity to law enforcement authorities.</li>
          <li>Taking legal action to recover damages or enforce our rights.</li>
        </ul>
        <p>
          We may also cooperate with legal authorities and third parties to investigate any alleged violations.
        </p >

        <h2>5. Reporting Violations</h2>
        <p>
          If you encounter content or behavior that you believe violates this AUP, please report it immediately to{' '}
          <a href=" " style={{ color: '#E67E22' }}>hanmuyan888@gmail.com</a >. We will review all reports and take appropriate action.
        </p >

        <h2>6. Changes to This Policy</h2>
        <p>
          We may modify this Acceptable Use Policy from time to time. The &quot;Last Updated&quot; date will reflect the most recent changes. Your continued use of the Service after any modifications constitutes acceptance of the revised policy.
        </p >

        <h2>7. Contact Us</h2>
        <p>
          For questions about this Acceptable Use Policy, please contact{' '}
          <a href="mailto:hanmuyan888@gmail.com" style={{ color: '#E67E22' }}>hanmuyan888@gmail.com</a >.
        </p >

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