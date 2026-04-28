'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const openTwitter = () => window.open('https://x.com/hanmuyan888?s=21', '_blank');
  const openPinterest = () => window.open('https://www.pinterest.com/hanmuyan888/', '_blank');
  const copyEmail = () => {
    navigator.clipboard.writeText('hanmuyan888@gmail.com');
    alert('Email copied to clipboard: hanmuyan888@gmail.com');
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-column">
          <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
            <span style={{ fontSize: '22px', fontWeight: 600, color: '#E67E22' }}>AuraHome</span>
            <span style={{ fontSize: '22px', fontWeight: 600, color: '#E67E22' }}>AI</span>
          </div>
          <p style={{ fontSize: '12px', color: '#E67E22', fontWeight: 600 }}>
            © 2026 AuraHome AI. All rights reserved.
          </p >
        </div>
        <div className="footer-column">
          <h4>Product</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/studio">Generator</Link></li>
            <li><Link href="/gallery">Gallery</Link></li>
            <li><Link href="/pricing">Pricing</Link></li>
            <li><Link href="/about">About</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Legal</h4>
          <ul>
            <li><Link href="/terms">Terms of Service</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li>
            <li><Link href="/cookie-policy">Cookie Policy</Link></li>
            <li><Link href="/refund">Refund Policy</Link></li>
            <li><Link href="/acceptable-use">Acceptable Use</Link></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Connect</h4>
          <ul style={{ marginBottom: '20px' }}>
            <li><button onClick={openTwitter} style={{ background: 'none', border: 'none', color: '#5A4A3A', cursor: 'pointer', padding: 0, font: 'inherit' }}>Twitter</button></li>
            <li><button onClick={openPinterest} style={{ background: 'none', border: 'none', color: '#5A4A3A', cursor: 'pointer', padding: 0, font: 'inherit' }}>Pinterest</button></li>
            <li><button onClick={copyEmail} style={{ background: 'none', border: 'none', color: '#5A4A3A', cursor: 'pointer', padding: 0, font: 'inherit' }}>Contact</button></li>
          </ul>
          <div style={{ marginTop: '8px' }}>
            <label htmlFor="newsletter-email" style={{ fontSize: '13px', fontWeight: 600, marginBottom: '8px', color: '#3D3228', display: 'block' }}>Subscribe to our newsletter</label>
            <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              <input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  minWidth: '160px',
                  padding: '10px 14px',
                  borderRadius: '40px',
                  border: '1px solid #E0D6CC',
                  backgroundColor: '#FFFFFF',
                  fontSize: '14px',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                disabled={subscribeStatus === 'loading'}
                style={{
                  background: '#E67E22',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '40px',
                  padding: '10px 18px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#D36B1E')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#E67E22')}
              >
                {subscribeStatus === 'loading' ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
            {subscribeStatus === 'success' && (
              <p style={{ fontSize: '12px', color: '#2E7D32', marginTop: '8px' }}>✓ Thanks for subscribing!</p >
            )}
            {subscribeStatus === 'error' && (
              <p style={{ fontSize: '12px', color: '#D32F2F', marginTop: '8px' }}>Something went wrong. Please try again.</p >
            )}
          </div>
        </div>
      </div>
     <div className="footer-bottom" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <p style={{ margin: 0 }}>Simple · Smart · Beautiful</p >
        <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '18px' }}>🔒</span>
            <span style={{ fontSize: '13px', color: '#5A4A3A' }}>SSL Secure</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ fontSize: '18px' }}>🛡️</span>
            <span style={{ fontSize: '13px', color: '#5A4A3A' }}>GDPR Ready</span>
          </div>
        </div>
        <p style={{ margin: 0, fontSize: '13px', color: '#8C7A6B' }}>
          © 2026 AuraHome AI. All rights reserved.
        </p >
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center', fontSize: '12px', color: '#8C7A6B' }}>
          <Link href="/terms" style={{ color: '#8C7A6B', textDecoration: 'none' }}>Terms</Link>
          <span>·</span>
          <Link href="/privacy" style={{ color: '#8C7A6B', textDecoration: 'none' }}>Privacy</Link>
          <span>·</span>
          <Link href="/cookie-policy" style={{ color: '#8C7A6B', textDecoration: 'none' }}>Cookie</Link>
          <span>·</span>
          <Link href="/refund" style={{ color: '#8C7A6B', textDecoration: 'none' }}>Refund</Link>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background-color: #F5F0EB;
          padding: 48px 24px 24px;
          border-top: 1px solid #E6DFD6;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
        }
        .footer-column h4 {
          color: #3D3228;
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 600;
        }
        .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-column ul li {
          margin-bottom: 10px;
        }
        .footer-column ul li a,
        .footer-column ul li button {
          color: #5A4A3A;
          text-decoration: none;
          font-size: 14px;
          transition: color 0.2s;
        }
        .footer-column ul li a:hover,
        .footer-column ul li button:hover {
          color: #E67E22;
        }
        .footer-bottom {
          margin-top: 48px;
          text-align: center;
          color: #8C7A6B;
          font-size: 14px;
          border-top: 1px solid #E6DFD6;
          padding-top: 24px;
        }
        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .footer {
            padding: 40px 16px 20px;
          }
        }
      `}</style>
    </footer>
  );
} 