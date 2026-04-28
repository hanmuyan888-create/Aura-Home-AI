'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Pricing() {
  const router = useRouter();

  const plans = [
    {
      name: 'Mini',
      price: 2,
      credits: 5,
      pricePerCredit: 0.4,
      checkoutUrl: 'https://buy.polar.sh/polar_cl_xmOvFrGYeCEaOsiYc9ptanfYhQiyzGBm6Cd2i3yfIgd',
      features: [
        '✅ Basic AI Generation (1 credit = 1 standard generation)',
        '✅ Standard-Resolution Export',
      ],
    },
    {
      name: 'Basic',
      price: 9,
      credits: 30,
      pricePerCredit: 0.3,
      recommended: true,
      checkoutUrl: 'https://buy.polar.sh/polar_cl_kbBGWBMqNL0juCUGqdgh4P5hvsdPaVl4GJ9Fp2NdOPw',
      features: [
        '✅ All Mini features included',
        '✅ Full Style Access (20+ interior styles)',
        '✅ Priority Rendering (faster generation speed)',
        '✅ Standard-Resolution Export',
      ],
    },
    {
      name: 'Pro',
      price: 19,
      credits: 100,
      pricePerCredit: 0.19,
      bestValue: true,
      checkoutUrl: 'https://buy.polar.sh/polar_cl_c35P6JnQFS7KxTzGhcN4BjQMDPEiW2G3C8ART2El2vw',
      features: [
        '✅ All Basic features included',
        '✅ Access to Premium Models (2-3 credits per generation)',
        '✅ Batch Generation (up to 4 designs at once)',
        '✅ Full Commercial Usage Rights',
        '✅ High-Resolution Export',
        '⭐ Priority early access to new styles',
      ],
    },
    {
      name: 'Business',
      price: 29,
      credits: 200,
      pricePerCredit: 0.145,
      checkoutUrl: 'https://buy.polar.sh/polar_cl_Ff3ci9q1msRRMprfywGHyS7bPMaOfg7MSZqH32HHaSJ',
      features: [
        '✅ All Pro features included',
        '✅ Team collaboration access',
        '✅ API access (personal use)',
        '✅ Custom style requests',
      ],
    },
  ];

  const faqs = [
    {
      q: "What are credits?",
      a: "Credits are your universal currency for all AI actions.\n\n• 1 credit = 1 basic generation (standard model, standard resolution)\n• Higher-tier models, high-res exports, or batch generation cost 2-3 credits per action.\nYou'll always see the exact credit cost BEFORE you generate.",
    },
    {
      q: "Do credits expire?",
      a: "No. Purchased credits never expire — use them anytime, anywhere.",
    },
    {
      q: "Can I get a refund?",
      a: "Yes. We offer a 14-day money-back guarantee for unused credits.",
    },
    {
      q: "Can I use designs commercially?",
      a: "Yes. Pro & Business plans grant full commercial usage rights for all generated designs.",
    },
  ];

  const handlePurchase = (checkoutUrl: string) => {
    window.open(checkoutUrl, '_blank');
  };

  const handleEnterpriseContact = () => {
    alert('📧 Please contact us at: hanmuyan888@gmail.com');
  };

  const handleSupportContact = () => {
    alert('📧 Please contact us at: hanmuyan888@gmail.com\nWe will respond within 1 business day.');
  };

  return (
    <div className="container" style={{ padding: '80px 24px' }}>
      {/* 标题 + 退款徽章 */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <h1
          style={{
            fontSize: 'clamp(36px, 5vw, 48px)',
            marginBottom: '16px',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #E67E22, #F39C12)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Simple, flexible pricing
        </h1>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: '#E8F5E9',
            padding: '8px 20px',
            borderRadius: '40px',
            marginBottom: '20px',
          }}
        >
          <span style={{ fontSize: '18px' }}>🛡️</span>
          <span style={{ fontSize: '15px', fontWeight: 500, color: '#2E7D32' }}>
            14-Day Money-Back Guarantee
          </span>
        </div>
      </div>

      {/* 副标题 */}
      <p
        style={{
          fontSize: 'clamp(16px, 4vw, 18px)',
          color: '#5A4A3A',
          textAlign: 'center',
          marginBottom: '12px',
        }}
      >
        Pay only for what you use. No subscriptions, no hidden fees.
      </p >
      <p
        style={{
          fontSize: '14px',
          color: '#E67E22',
          textAlign: 'center',
          marginBottom: '64px',
          fontWeight: 500,
        }}
      >
        1 free credit every day — Try AuraHome AI for free daily
      </p >

      {/* 套餐网格 */}
      <div
        className="pricing-grid"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '32px',
          justifyContent: 'center',
          marginBottom: '80px',
        }}
      >
        {plans.map((plan) => {
          const isBasic = plan.recommended;
          const isPro = plan.bestValue;
          return (
            <div
              key={plan.name}
              className="card"
              style={{
                flex: '1 1 240px',
                padding: '24px',
                borderRadius: '16px',
                backgroundColor: '#FFFFFF',
                boxShadow: isBasic
                  ? '0 12px 24px rgba(0,0,0,0.1)'
                  : isPro
                  ? '0 12px 24px rgba(0,0,0,0.08)'
                  : '0 4px 12px rgba(0,0,0,0.05)',
                transform: isBasic ? 'translateY(-4px)' : isPro ? 'translateY(-2px)' : 'none',
                position: 'relative',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                border: isBasic
                  ? '1px solid rgba(230,126,34,0.3)'
                  : isPro
                  ? '1px solid rgba(230,126,34,0.2)'
                  : 'none',
                background: isBasic
                  ? 'linear-gradient(135deg, rgba(230,126,34,0.02), rgba(243,156,18,0.01))'
                  : isPro
                  ? 'linear-gradient(135deg, rgba(230,126,34,0.03), rgba(243,156,18,0.02))'
                  : '#FFFFFF',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0,0,0,0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = isBasic ? 'translateY(-4px)' : isPro ? 'translateY(-2px)' : 'translateY(0)';
                e.currentTarget.style.boxShadow = isBasic
                  ? '0 12px 24px rgba(0,0,0,0.1)'
                  : isPro
                  ? '0 12px 24px rgba(0,0,0,0.08)'
                  : '0 4px 12px rgba(0,0,0,0.05)';
              }}
            >
              {isBasic && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#E67E22',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '40px',
                    fontSize: '12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  Most Popular
                </div>
              )}
              {isPro && (
                <div
                  style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: '#F39C12',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '40px',
                    fontSize: '12px',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  ⭐ Best Value
                </div>
              )}
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#2C2C2C' }}>
                {plan.name}
              </h2>
              <p style={{ fontSize: '36px', fontWeight: 700, margin: '20px 0', color: '#E67E22' }}>
                ${plan.price}
              </p >
  <p style={{ marginBottom: '8px', color: '#5A4A3A' }}>{plan.credits} credits</p >
              <p style={{ fontSize: '14px', color: '#9D9D9D', marginBottom: '24px' }}>
                ${plan.pricePerCredit.toFixed(3).replace(/\.?0+$/, '')} per credit
              </p >
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '24px', textAlign: 'left' }}>
                {plan.features.map((feature, idx) => (
                  <li key={idx} style={{ marginBottom: '8px', fontSize: '14px', color: '#5A4A3A' }}>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className="btn-primary"
                onClick={() => handlePurchase(plan.checkoutUrl)}
                style={{
                  width: '100%',
                  borderRadius: '16px',
                  transition: 'background 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D35400';
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E67E22';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                Buy Now
              </button>
              <p style={{
                fontSize: '11px',
                color: '#8C7A6B',
                textAlign: 'center',
                marginTop: '12px',
                marginBottom: 0
              }}>
                🔒 SSL Secure · Powered by Polar
              </p >
            </div>
          );
        })}
      </div>
      {/* 套餐横向对比表 */}
      <div style={{ maxWidth: '1000px', margin: '0 auto 40px', overflowX: 'auto' }}>
        <h2
          style={{
            fontSize: '28px',
            textAlign: 'center',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #E67E22, #F39C12)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Compare Plans
        </h2>
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            fontSize: '14px',
          }}
        >
          <thead>
            <tr style={{ backgroundColor: '#F5F0EB' }}>
              <th style={{ padding: '16px', textAlign: 'left', fontWeight: 600, color: '#3D3228' }}>Feature</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: '#3D3228' }}>Mini</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: '#3D3228' }}>Basic</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: '#3D3228' }}>Pro</th>
              <th style={{ padding: '16px', textAlign: 'center', fontWeight: 600, color: '#3D3228' }}>Business</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #E6DFD6' }}>
              <td style={{ padding: '14px 16px' }}>Credits</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>5</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>30</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>100</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>200</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6DFD6' }}>
              <td style={{ padding: '14px 16px' }}>Price per credit</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>$0.40</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>$0.30</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>$0.19</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>$0.145</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6DFD6' }}>
              <td style={{ padding: '14px 16px' }}>Full Style Access</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6DFD6' }}>
              <td style={{ padding: '14px 16px' }}>Premium Models</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6DFD6' }}>
              <td style={{ padding: '14px 16px' }}>Batch Generation</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6DFD6' }}>
              <td style={{ padding: '14px 16px' }}>High-Resolution Export</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
            </tr>
            <tr style={{ borderBottom: '1px solid #E6DFD6' }}>
              <td style={{ padding: '14px 16px' }}>Commercial Use</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
            </tr>
            <tr>
              <td style={{ padding: '14px 16px' }}>Team Collaboration</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>❌</td>
              <td style={{ padding: '14px 16px', textAlign: 'center' }}>✅</td>
            </tr>
          </tbody>
        </table>
        <p style={{ fontSize: '13px', color: '#8C7A6B', marginTop: '12px', textAlign: 'center' }}>
          * All plans include 1 free daily credit and priority support for Pro/Business.
        </p >
      </div>

      {/* 企业定制入口 */}
      <div style={{ maxWidth: '800px', margin: '0 auto 60px', textAlign: 'center' }}>
        <div
          style={{
            backgroundColor: '#F9F3EC',
            borderRadius: '20px',
            padding: '32px 24px',
            border: '1px solid #E6DFD6',
          }}
        >
          <h3 style={{ fontSize: '22px', fontWeight: 600, color: '#3D3228', marginBottom: '12px' }}>
            🏢 Need a custom enterprise plan?
          </h3>
          <p style={{ color: '#5A4A3A', marginBottom: '24px', fontSize: '15px' }}>
            For teams of 5+ or high-volume usage, contact us for tailored pricing and dedicated support.
          </p >
          <button
            onClick={handleEnterpriseContact}
            style={{
              background: '#E67E22',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              padding: '14px 32px',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'background 0.3s ease, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D35400';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#E67E22';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            📧 Contact Enterprise Sales
          </button>
          <p style={{ fontSize: '13px', color: '#8C7A6B', marginTop: '16px' }}>
            We'll respond within 1 business day.
          </p >
        </div>
      </div>

      {/* FAQ 模块 + 联系引导（第7项） */}
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <h2
          style={{
            fontSize: '28px',
            textAlign: 'center',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #E67E22, #F39C12)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Frequently Asked Questions
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px' }}>
          {/* 左侧 FAQ 列表 */}
          <div style={{ flex: '2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {faqs.map((faq, idx) => {
              const [open, setOpen] = useState(false);
              return (
                <div
                  key={idx}
                  style={{
                    backgroundColor: 'white',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  }}
                >
                  <button
                    onClick={() => setOpen(!open)}
                    style={{
                      width: '100%',
                      textAlign: 'left',
                      padding: '18px 20px',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#2C2C2C',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      transition: 'background 0.3s ease',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#FFF9F2')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                  >
                    {faq.q}
                    <span style={{ fontSize: '22px', color: '#E67E22' }}>{open ? '−' : '+'}</span>
                  </button>
                  {open && (
                    <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid #F9E5D2' }}>
                      <p style={{ color: '#5A4A3A', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                        {faq.a}
                      </p >
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {/* 右侧联系引导卡片（第7项新增） */}
          <div style={{ flex: '1', minWidth: '240px' }}>
            <div
              style={{
                backgroundColor: '#F9F3EC',
                borderRadius: '20px',
                padding: '28px 20px',
                textAlign: 'center',
                border: '1px solid #E6DFD6',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
              <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#3D3228', marginBottom: '8px' }}>
                Still have questions?
              </h3>
              <p style={{ fontSize: '14px', color: '#5A4A3A', marginBottom: '20px' }}>
                We're here to help. Reach out and we'll get back to you within 1 business day.
              </p >
              <button
                onClick={handleSupportContact}
                style={{
                  background: '#E67E22',
                  color: 'white',
                  border: 'none',
                  borderRadius: '40px',
                  padding: '12px 24px',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.3s ease, transform 0.2s',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#D35400';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#E67E22';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                📧 Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 底部补充文案 */}
      <p
        style={{
          fontSize: '14px',
          color: '#5A4A3A',
          textAlign: 'center',
          marginTop: '64px',
        }}
      >
        Use credits anytime. Unused credits never expire.
      </p >

      {/* 移动端适配 */}
      <style jsx>{`
        @media (max-width: 768px) {
          .pricing-grid {
            flex-direction: column;
            align-items: center;
            gap: 24px !important;
          }
          .pricing-grid > div {
            width: 100%;
            max-width: 380px;
          }
          .btn-primary {
            font-size: 1rem;
            padding: 12px 24px;
          }
          h1 {
            font-size: 2rem !important;
          }
          table {
            font-size: 12px !important;
          }
          th, td {
            padding: 10px 8px !important;
          }
        }
      `}</style>
    </div>
  );
}            