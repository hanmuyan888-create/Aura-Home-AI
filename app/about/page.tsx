"use client";

import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="container" style={{ padding: '80px 24px' }}>
      {/* 标题暖橙色渐变 */}
      <h1
        style={{
          fontSize: 'clamp(36px, 5vw, 48px)',
          textAlign: 'center',
          marginBottom: '24px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #E67E22, #F39C12)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        About AuraHome AI
      </h1>

      {/* 副标题 */}
      <p
        style={{
          fontSize: 'clamp(18px, 4vw, 22px)',
          textAlign: 'center',
          color: '#5A4A3A',
          maxWidth: '800px',
          margin: '0 auto 64px',
          lineHeight: 1.4,
        }}
      >
        Give every space the warm, cozy glow it deserves.
      </p >

      {/* 主体内容卡片（分段） */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* 我的使命 */}
        <div className="card" style={{ padding: '32px', borderRadius: '16px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#E67E22',
            }}
          >
            My Mission
          </h2>
          <p style={{ color: '#5A4A3A', lineHeight: 1.6, marginBottom: '16px' }}>
            I built AuraHome AI with one simple goal: to turn every space into something warm and inviting with the power of AI.
          </p >
          <p style={{ color: '#5A4A3A', lineHeight: 1.6 }}>
            I believe every space — whether inside your home or outside — should feel cozy, personal, and full of warmth, not cold or generic. That’s why I created this AI design tool to help anyone create beautiful, warm-toned visuals for any scene, no design skills needed.
          </p >
        </div>

        {/* 为什么我构建了这个产品 */}
        <div className="card" style={{ padding: '32px', borderRadius: '16px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '16px',
              color: '#E67E22',
            }}
          >
            Why I Built AuraHome AI
          </h2>
          <p style={{ color: '#5A4A3A', lineHeight: 1.6, marginBottom: '16px' }}>
            Like many people, I was frustrated with existing AI design tools. Most are limited only to indoor spaces, produce cold, impersonal results, or lock users into expensive subscriptions with rigid templates.
          </p >
          <p style={{ color: '#5A4A3A', lineHeight: 1.6, marginBottom: '16px' }}>
            So I built something different: a tool focused on warmth, flexibility, and full creative control. From indoor interiors to outdoor landscapes and any other scene you can imagine, you can choose styles, set moods, and create exactly the visuals you want — fully customized to your vision. No generic templates, no forced subscriptions, just simple, pay-as-you-go convenience.
          </p >
          <p style={{ color: '#5A4A3A', lineHeight: 1.6 }}>
            Whether you’re redesigning a bedroom, planning a backyard, or creating any other space, AuraHome AI brings that special warm glow to every render, tailored exactly to your taste.
          </p >
        </div>

        {/* 我的承诺（以网格展示7项，高度一致） */}
        <div className="card" style={{ padding: '32px', borderRadius: '16px' }}>
          <h2
            style={{
              fontSize: '24px',
              fontWeight: 600,
              marginBottom: '24px',
              color: '#E67E22',
              textAlign: 'center',
            }}
          >
            What I Promise You
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '20px',
            }}
          >
            <div style={{ height: '100%' }}>
              <strong style={{ color: '#E67E22' }}>✅ Warmth First, Always</strong><br />
              <span style={{ color: '#5A4A3A', fontSize: '14px' }}>Every design is crafted to feel cozy, inviting, and full of that signature warm glow.</span>
            </div>
            <div style={{ height: '100%' }}>
              <strong style={{ color: '#E67E22' }}>✅ Indoor & Outdoor, All Scenes Supported</strong><br />
              <span style={{ color: '#5A4A3A', fontSize: '14px' }}>Not limited to interiors — create stunning designs for outdoor spaces and any other scene.</span>
            </div>
            <div style={{ height: '100%' }}>
              <strong style={{ color: '#E67E22' }}>✅ Style + Vibe Customization</strong><br />
              <span style={{ color: '#5A4A3A', fontSize: '14px' }}>Choose your style and fine-tune the atmosphere for truly personalized results.</span>
            </div>
            <div style={{ height: '100%' }}>
              <strong style={{ color: '#E67E22' }}>✅ Full Custom Rendering</strong><br />
              <span style={{ color: '#5A4A3A', fontSize: '14px' }}>No fixed limits — create exactly the visuals you imagine, with complete creative freedom.</span>
            </div>
            <div style={{ height: '100%' }}>
              <strong style={{ color: '#E67E22' }}>✅ No Subscriptions, No Hidden Fees</strong><br />
              <span style={{ color: '#5A4A3A', fontSize: '14px' }}>Pay only for the credits you need, with no recurring charges. Unused credits never expire.</span>
            </div>
            <div style={{ height: '100%' }}>
              <strong style={{ color: '#E67E22' }}>✅ Commercial-Ready Designs</strong><br />
              <span style={{ color: '#5A4A3A', fontSize: '14px' }}>Pro and Business plans include full commercial usage rights for personal or professional projects.</span>
            </div>
            <div style={{ height: '100%' }}>
              <strong style={{ color: '#E67E22' }}>✅ High-Quality, Realistic Renders</strong><br />
              <span style={{ color: '#5A4A3A', fontSize: '14px' }}>Stunning, high-resolution results that look like real spaces — not generic AI art.</span>
            </div>
          </div>
        </div>
      </div>

      {/* 底部 CTA */}
      <div style={{ textAlign: 'center', marginTop: '64px' }}>
        <h2
          style={{
            fontSize: 'clamp(24px, 4vw, 32px)',
            marginBottom: '16px',
            fontWeight: 600,
            color: '#2C2C2C',
          }}
        >
          Ready to Create Your Warm, Custom Space?
        </h2>
        <p
          style={{
            fontSize: '16px',
            color: '#5A4A3A',
            marginBottom: '32px',
            maxWidth: '600px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          Start generating today and turn any indoor, outdoor, or custom scene into the cozy, personalized vision you’ve always wanted.
        </p >
        <Link href="/studio">
          <button
            className="btn-primary"
            style={{
              fontSize: '18px',
              padding: '14px 36px',
              borderRadius: '40px',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(230,126,34,0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(230,126,34,0.3)';
            }}
          >
            Start Generating Now
          </button>
        </Link>
      </div>

      {/* 移动端适配 */}
      <style jsx>{`
        @media (max-width: 768px) {
          .container {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          .card {
            padding: 20px !important;
          }
          h1 {
            font-size: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
}