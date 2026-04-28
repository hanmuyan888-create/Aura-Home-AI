'use client';

export default function Refund() {
  return (
    <div className="container" style={{ maxWidth: '900px', margin: '80px auto', padding: '0 24px' }}>
      <div className="card" style={{ padding: '48px', position: 'relative' }}>
        <h1 style={{ fontSize: '36px', marginBottom: '16px' }}>Refund Policy</h1>
        <p style={{ color: '#5A4A3A', marginBottom: '24px' }}>Last Updated: April 1, 2026</p >

        {/* 退款摘要模块 */}
        <div style={{
          backgroundColor: '#F9F3EC',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '40px',
          border: '1px solid #E6DFD6',
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#3D3228', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>💰</span> Refunds at a glance
          </h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>14‑day money‑back guarantee</strong> on your first credit pack purchase.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Refunds are prorated</strong> based on unused credits (must have &gt;50% remaining).</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Free daily credits are not refundable</strong> — they have no cash value.</span>
            </li>
            <li style={{ display: 'flex', gap: '12px', fontSize: '14px', color: '#5A4A3A' }}>
              <span style={{ color: '#E67E22', fontWeight: 600, minWidth: '24px' }}>✓</span>
              <span><strong>Just email us</strong> — we process valid requests within 5‑7 business days.</span>
            </li>
          </ul>
          <p style={{ fontSize: '12px', color: '#8C7A6B', marginTop: '16px', marginBottom: 0, fontStyle: 'italic' }}>
            This is a friendly summary. The full policy below contains all the details.
          </p >
        </div>

        <h2>1. Free vs Paid Credits</h2>
        <p>Free daily credits have no cash value and are not refundable. Paid credit packs (Mini, Basic, Pro, Business) are one‑time purchases. There are no recurring subscriptions.</p >
        <p><strong>Free or promotional credits</strong> (e.g., bonus credits) are non‑refundable and have no cash value.</p >

        <h2>2. Refund Eligibility</h2>
        <p>We offer a <strong>14‑day money‑back guarantee</strong> for <strong>first‑time credit pack purchases only</strong>. You may request a refund <strong>for any unused credits</strong> within 14 days of purchase.</p >
        <p><strong>Refund amount calculation:</strong> (remaining credits ÷ total credits) × purchase price. No refund will be issued if more than 50% of the credits have been used, or after 14 days.</p >
        <p><strong>Example:</strong> If you bought 30 credits for $9 and have 20 unused credits remaining, your refund would be (20/30) × $9 = $6.</p >
        <p>If you purchased a credit pack but have already used more than half of the credits, you are not eligible for a refund.</p >

        <h2>3. How to Request a Refund</h2>
        <p>Email us at <a href=" " style={{ color: '#E67E22' }}>hanmuyan888@gmail.com</a > with your account email, purchase receipt, and reason for refund. Please include your order details to expedite processing. We will process valid requests within 5‑7 business days and refund to your original payment method.</p >

        <h2>4. Non‑Refundable Situations</h2>
        <p>Refunds will not be issued in the following cases:<br/>
        – Requests made after 14 days of purchase.<br/>
        – More than 50% of the credits have been used.<br/>
        – The user has violated our Terms of Service (e.g., abusive behavior, fraud).<br/>
        – Free credits or promotional credits (no cash value).<br/>
        – Account termination initiated by the user after credits are purchased.<br/>
        – The purchase was not a first‑time purchase (the guarantee applies only to your first credit pack purchase).</p >

        <h2>5. Final Decision & Disputes</h2>
        <p>AuraHome AI reserves the right to make the final determination on refund eligibility. We will strive to resolve all refund requests fairly and in good faith. If you disagree with our decision, please contact us and we will work to resolve the matter amicably.</p >
        <p>For all refund‑related questions, email <a href="mailto:hanmuyan888@gmail.com" style={{ color: '#E67E22' }}>hanmuyan888@gmail.com</a >.</p >

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