'use client';

import { useState } from 'react';

export default function CookiePolicy() {
  const [showResetMessage, setShowResetMessage] = useState(false);

  const handleCookieSettings = () => {
    // 清除 Cookie 同意记录
    document.cookie = 'aurahome-cookie-consent=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    localStorage.removeItem('aurahome-cookie-consent');
    setShowResetMessage(true);
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  return (
    <div className="container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 24px' }}>
      <div className="card" style={{ padding: '48px', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h1 style={{ fontSize: '36px', margin: 0 }}>Cookie Policy</h1>
          <button
            onClick={handleCookieSettings}
            style={{
              background: '#F0EDE8',
              border: 'none',
              borderRadius: '40px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              color: '#3D3228',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#E6DFD6'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#F0EDE8'}
          >
            🍪 Cookie Settings
          </button>
        </div>
        <p style={{ color: '#5A4A3A', marginBottom: '24px' }}>Last Updated: April 8, 2026</p >

        {showResetMessage && (
          <div style={{
            backgroundColor: '#E8F5E9',
            borderRadius: '12px',
            padding: '12px 16px',
            marginBottom: '20px',
            color: '#2E7D32',
            fontSize: '14px',
          }}>
            ✓ Cookie preferences reset. Refreshing page...
          </div>
        )}

        {/* Cookie 摘要模块 */}
        <div style={{
          backgroundColor: '#F9F3EC',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          border: '1px solid #E6DFD6',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#3D3228', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🍪</span> Cookies at a glance
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>We use essential cookies</strong> to keep you logged in and the site working.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Optional analytics cookies</strong> help us understand how you use AuraHome AI.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>You're in control</strong> — manage preferences via our cookie banner or browser settings.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>We never sell cookie data</strong> or use it for advertising profiling.</span>
            </li>
          </ul>
          <p style={{ fontSize: '12px', color: '#8C7A6B', marginTop: '16px', marginBottom: 0, fontStyle: 'italic' }}>
            This summary is for convenience. Full details are below.
          </p >
        </div>
     <h2>1. What Are Cookies?</h2>
        <p>
          Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to the site owners.
        </p >
        <p>
          We use cookies to ensure the proper functioning of AuraHome AI, to remember your login status, and to understand how you interact with our service so we can improve it.
        </p >

        <h2>2. Types of Cookies We Use</h2>
        <p><strong>Essential Cookies (Strictly Necessary)</strong></p >
        <p>
          These cookies are required for the core functionality of our website. They enable you to log in, navigate the site, and use essential features like the design generator. Without these cookies, the service cannot be provided. Examples include:
        </p >
        <ul style={{ marginBottom: '20px', paddingLeft: '20px', color: '#5A4A3A' }}>
          <li>Session cookies to maintain your login state.</li>
          <li>Cookies that remember your cookie consent preferences.</li>
        </ul>

        <p><strong>Analytics / Performance Cookies (Optional)</strong></p >
        <p>
          With your consent, we use these cookies to collect information about how visitors use AuraHome AI. This helps us measure traffic, identify popular features, and spot any issues. All data is aggregated and anonymized, and cannot be used to identify you personally.
        </p >
        <p>
          We use <strong>Google Analytics</strong> for this purpose. Google Analytics sets its own cookies to track user interactions. You can learn more about how Google uses data at{' '}
          <a href=" " target="_blank" rel="noopener noreferrer" style={{ color: '#E67E22' }}>
            Google's Partner Sites Policy
          </a >.
        </p >

        <h2>3. How Long Do Cookies Stay on My Device?</h2>
        <p>
          <strong>Session cookies</strong> are temporary and expire when you close your browser.<br/>
          <strong>Persistent cookies</strong> remain on your device for a set period (e.g., to remember your consent choice) or until you manually delete them.
        </p >

        <h2>4. Managing Your Cookie Preferences</h2>
        <p>
          You have full control over non‑essential cookies. When you first visit AuraHome AI, our cookie banner allows you to accept or decline optional analytics cookies. You can change your preference at any time by clicking the "Cookie Settings" button at the top of this page.
        </p >
        <p>
          You can also configure your browser to block all cookies or alert you when a cookie is being set. Please note that blocking essential cookies may prevent you from logging in or using core features.
        </p >
        <p>
          <strong>Browser‑level controls:</strong><br/>
          · <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" style={{ color: '#E67E22' }}>Google Chrome</a ><br/>
          · <a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" style={{ color: '#E67E22' }}>Mozilla Firefox</a ><br/>
          · <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" style={{ color: '#E67E22' }}>Safari</a ><br/>
          · <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" style={{ color: '#E67E22' }}>Microsoft Edge</a >
        </p >

        <h2>5. Third‑Party Cookies</h2>
        <p>
          Some cookies may be set by third‑party services that appear on our pages. For example, Google Analytics sets its own cookies when you consent to analytics. We do not control the dissemination of these third‑party cookies. You should check the relevant third‑party website for more information.
        </p >

        <h2>6. Changes to This Cookie Policy</h2>
        <p>
          We may update this Cookie Policy from time to time to reflect changes in technology, law, or our business practices. The "Last Updated" date at the top indicates when the latest changes were made. We encourage you to review this page periodically.
        </p >

        <h2>7. Contact Us</h2>
        <p>
          If you have any questions about our use of cookies, please contact us at{' '}
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