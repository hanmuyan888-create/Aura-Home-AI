"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// 滑动条组件数据（客厅、卧室、家庭办公室）
const sliderExamples = [
  { before: '/living-before.PNG', after: '/living-after.PNG', title: 'Living Room' },
  { before: '/bedroom-before.PNG', after: '/bedroom-after.PNG', title: 'Bedroom' },
  { before: '/homeoffice-before.PNG', after: '/homeoffice-after.PNG', title: 'Home Office' },
];

// 升级后的滑动条组件（使用 next/image 优化）
const BeforeAfterSlider = ({ before, after, title }: { before: string; after: string; title: string }) => {
  const [sliderValue, setSliderValue] = useState(50);
  return (
    <div className="card" style={{ padding: '0', borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
      <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3', backgroundColor: '#F5F0EB' }}>
        {/* After 图片（底层） */}
        <Image
          src={after}
          alt="After"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          priority={false}
        />
        {/* Before 图片（顶层，根据滑块值裁剪宽度） */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: `${sliderValue}%`, height: '100%', overflow: 'hidden' }}>
          <Image
            src={before}
            alt="Before"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            style={{ objectFit: 'cover' }}
            priority={false}
          />
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={sliderValue}
          onChange={(e) => setSliderValue(Number(e.target.value))}
          className="slider-thumb"
          style={{
            position: 'absolute',
            bottom: '16px',
            left: '10%',
            width: '80%',
            zIndex: 2,
            cursor: 'pointer',
          }}
        />
        <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'rgba(0,0,0,0.5)', color: 'white', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: 500 }}>
          {title}
        </div>
        <div style={{ position: 'absolute', bottom: '12px', left: '8px', background: 'rgba(0,0,0,0.4)', color: '#D1C5B5', padding: '2px 8px', borderRadius: '20px', fontSize: '10px' }}>Before</div>
        <div style={{ position: 'absolute', bottom: '12px', right: '8px', background: 'rgba(0,0,0,0.4)', color: '#D1C5B5', padding: '2px 8px', borderRadius: '20px', fontSize: '10px' }}>After</div>
      </div>
      <div style={{ textAlign: 'center', padding: '12px 16px 16px' }}>
        <Link href="/studio">
          <button style={{
            background: 'none',
            border: '1px solid #E67E22',
            color: '#E67E22',
            borderRadius: '8px',
            padding: '6px 16px',
            fontSize: '13px',
            cursor: 'pointer',
            transition: 'background 0.3s ease, color 0.3s ease',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#F39C12'; e.currentTarget.style.color = 'white'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#E67E22'; }}
          >
            Generate This Style →
          </button>
        </Link>
      </div>
    </div>
  );
};

// 每日积分倒计时组件
const DailyCreditTimer = () => {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const nextReset = new Date(now);
      nextReset.setUTCHours(24, 0, 0, 0);
      const diff = nextReset.getTime() - now.getTime();
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft(`${hours}h ${minutes}m ${seconds}s`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span style={{
      background: 'rgba(230, 126, 34, 0.1)',
      padding: '6px 14px',
      borderRadius: '40px',
      fontSize: '14px',
      fontWeight: 500,
      color: '#E67E22',
      marginLeft: '20px',
    }}>
      ⏳ Next free credit in {timeLeft}
    </span>
  );
};

// FAQ 组件
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ backgroundColor: 'white', borderRadius: '16px', marginBottom: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
         onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
         onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: '18px 20px',
          fontSize: '16px',
          fontWeight: 500,
          color: '#2C2C2C',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background 0.3s ease',
        }}
        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#FFF9F2'}
        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
      >
        {question}
        <span style={{ fontSize: '22px', color: '#E67E22', lineHeight: 1 }}>{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div style={{ padding: '0 20px 20px 20px', borderTop: '1px solid #F9E5D2' }}>
          <p style={{ color: '#5A4A3A', lineHeight: 1.5 }}>{answer}</p >
        </div>
      )}
    </div>
  );
};

export default function Home() {
  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* 首屏英雄区 */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '48px', flexWrap: 'wrap', padding: '80px 0 60px' }}>
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h1 style={{ fontSize: 'clamp(36px, 8vw, 56px)', fontWeight: 700, lineHeight: 1.2, marginBottom: '20px' }}>
            Give your room a <span style={{ background: 'linear-gradient(135deg, #E67E22, #F39C12)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>warm glow</span> with AI
          </h1>
          <p style={{ fontSize: 'clamp(16px, 4vw, 18px)', color: '#5A4A3A', maxWidth: '550px', marginBottom: '32px', lineHeight: 1.5 }}>
            AI-powered interior design in 10 seconds
          </p >
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <Link href="/studio">
              <button
                className="btn-primary"
                style={{
                  fontSize: '18px',
                  padding: '14px 36px',
                  boxShadow: '0 8px 20px rgba(230,126,34,0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
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
                Try Free Now
              </button>
            </Link>
            <DailyCreditTimer />
          </div>
          <p style={{ marginTop: '16px', fontSize: '14px', color: '#A89F8E' }}>Simple · Smart · Beautiful</p >
        </div>
        {/* 右侧大滑块 - 厨房 */}
        <div style={{ flex: '1', minWidth: '320px' }}>
          <BeforeAfterSlider before="/kitchen-before.PNG" after="/kitchen-after.PNG" title="Kitchen" />
        </div>
      </div>

      {/* 信任徽章条（基于事实） */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '32px',
        flexWrap: 'wrap',
        padding: '24px 0',
        borderBottom: '1px solid #E6DFD6',
        marginBottom: '40px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🔒</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#5A4A3A' }}>SSL Secure</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px' }}>🛡️</span>
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#5A4A3A' }}>GDPR Ready</span>
        </div>
      </div>

      {/* 新增：品牌理念展示模块（零造假方案）- 标题标签已修正为 p */}
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '24px',
          justifyContent: 'center',
          marginTop: '20px',
        }}>
          <div style={{
            flex: '1 1 200px',
            maxWidth: '280px',
            padding: '24px 16px',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🔥</div>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#3D3228' }}>Warmth First, Always</p >
            <p style={{ fontSize: '14px', color: '#5A4A3A' }}>Every design crafted with cozy, inviting glow — never cold or generic.</p >
          </div>
          <div style={{
            flex: '1 1 200px',
            maxWidth: '280px',
            padding: '24px 16px',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🎨</div>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#3D3228' }}>20+ Design Styles</p >
            <p style={{ fontSize: '14px', color: '#5A4A3A' }}>From Scandinavian to Japandi, find the perfect aesthetic for any space.</p >
          </div>
          <div style={{
            flex: '1 1 200px',
            maxWidth: '280px',
            padding: '24px 16px',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💎</div>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#3D3228' }}>No Subscriptions</p >
            <p style={{ fontSize: '14px', color: '#5A4A3A' }}>Pay only for the credits you need. No recurring fees, ever.</p >
          </div>
          <div style={{
            flex: '1 1 200px',
            maxWidth: '280px',
            padding: '24px 16px',
            background: '#FFFFFF',
            borderRadius: '20px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
            <p style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px', color: '#3D3228' }}>Instant Results</p >
            <p style={{ fontSize: '14px', color: '#5A4A3A' }}>AI-powered designs ready in seconds — no waiting, no hassle.</p >
          </div>
        </div>
      </div>

      {/* 用户痛点 */}
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>Designing a beautiful home shouldn't be hard</h2>
        <p style={{ fontSize: '16px', color: '#5A4A3A', maxWidth: '700px', margin: '0 auto' }}>
          Traditional interior design is expensive, slow, and stressful. AuraHome AI gives you professional results in 10 seconds — for free.
        </p >
      </div>
   {/* See The Transformation 板块 */}
      <div style={{ marginBottom: '80px' }}>
        <h2
          style={{
            textAlign: 'center',
            fontSize: '32px',
            marginBottom: '48px',
            background: 'linear-gradient(135deg, #E67E22, #F39C12)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block',
            width: '100%',
          }}
        >
          See The Transformation ✨
        </h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          {sliderExamples.map((ex, idx) => (
            <div
              key={idx}
              style={{
                flex: '1 1 300px',
                maxWidth: '380px',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}
            >
              <BeforeAfterSlider before={ex.before} after={ex.after} title={ex.title} />
            </div>
          ))}
        </div>
      </div>

      {/* 步骤区 How It Works */}
      <div style={{ marginBottom: '80px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '48px' }}>How It Works</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          <div className="card" style={{ flex: '1 1 200px', textAlign: 'center', padding: '24px', borderRadius: '16px' }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}>
            <div style={{ width: '64px', height: '64px', background: '#E8D5C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#E67E22" stroke="none"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8" stroke="white" strokeWidth="2"/></svg>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Upload Your Photo</h3>
            <p style={{ fontSize: '14px', color: '#5A4A3A' }}>Upload any room photo in one click</p >
          </div>
          <div className="card" style={{ flex: '1 1 200px', textAlign: 'center', padding: '24px', borderRadius: '16px' }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}>
            <div style={{ width: '64px', height: '64px', background: '#E8D5C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#E67E22" stroke="none"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Choose Style & Vibe</h3>
            <p style={{ fontSize: '14px', color: '#5A4A3A' }}>Pick any style and warm atmosphere you love</p >
          </div>
          <div className="card" style={{ flex: '1 1 200px', textAlign: 'center', padding: '24px', borderRadius: '16px' }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}>
            <div style={{ width: '64px', height: '64px', background: '#E8D5C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#E67E22" stroke="none"><polygon points="12 2 15 9 22 9 16 14 19 22 12 17 5 22 8 14 2 9 9 9 12 2"/></svg>
            </div>
            <h3 style={{ fontSize: '20px', marginBottom: '8px' }}>Generate & Use</h3>
            <p style={{ fontSize: '14px', color: '#5A4A3A' }}>Get 2–4 designs in 10 seconds</p >
          </div>
        </div>
      </div>

      {/* 优势区 */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '48px' }}>Why choose AuraHome AI</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          <div className="card" style={{ flex: '1 1 280px', padding: '28px', borderRadius: '16px', textAlign: 'center' }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}>
            <div style={{ width: '64px', height: '64px', background: '#E8D5C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#E67E22"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/><path d="M12 6v6l4 2"/></svg>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>AI Design Magic</h3>
            <p>Redesign walls, furniture & lighting automatically</p >
          </div>
          <div className="card" style={{ flex: '1 1 280px', padding: '28px', borderRadius: '16px', textAlign: 'center' }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}>
            <div style={{ width: '64px', height: '64px', background: '#E8D5C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#E67E22"><path d="M12 2v4M12 22v-4M4 12H2M22 12h-2M19.07 4.93l-2.83 2.83M7.76 16.24l-2.83 2.83M16.24 7.76l2.83-2.83M4.93 19.07l2.83-2.83"/><circle cx="12" cy="12" r="4"/></svg>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Warm, Instant Designs</h3>
            <p>Beautiful, cozy results in seconds</p >
          </div>
          <div className="card" style={{ flex: '1 1 280px', padding: '28px', borderRadius: '16px', textAlign: 'center' }}
               onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)'; }}
               onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)'; }}>
            <div style={{ width: '64px', height: '64px', background: '#E8D5C0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="#E67E22"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
            </div>
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>Commercial Usage Allowed</h3>
            <p>Safe for Airbnb, designers & commercial projects</p >
          </div>
        </div>
      </div>

      {/* 信任背书 */}
      <div style={{ textAlign: 'center', marginBottom: '80px' }}>
        <h2 style={{ fontSize: '28px', marginBottom: '12px', background: 'linear-gradient(135deg, #E67E22, #F39C12)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
          AI Interior Design, Made For Real Homes
        </h2>
        <p style={{ fontSize: '16px', color: '#5A4A3A', maxWidth: '700px', margin: '0 auto' }}>
          Perfect for homeowners, renters, Airbnb hosts and realtors. Create beautiful spaces without the cost of a professional designer.
        </p >
      </div>

      {/* FAQ 板块 */}
      <div style={{ marginBottom: '80px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '32px', marginBottom: '32px' }}>Frequently Asked Questions</h2>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <FAQItem question="How many free credits do I get each day?" answer="You get 1 free credit every day. Additional credits are available to purchase." />
          <FAQItem question="Are my photos safe & private?" answer="Yes. Your photos are processed securely and deleted automatically within 24 hours." />
          <FAQItem question="Can I use designs for commercial projects?" answer="Yes, paid plans include commercial usage rights." />
          <FAQItem question="What photos work best?" answer="Bright, clear, straight-on photos work best. Avoid wide-angle or filtered images." />
        </div>
      </div>

      {/* 底部 CTA */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>Ready to transform your space?</h2>
        <p style={{ fontSize: '16px', color: '#5A4A3A', marginBottom: '32px' }}>Start your first warm design in 10 seconds — free daily try.</p >
        <Link href="/studio">
          <button
            className="btn-primary"
            style={{
              fontSize: '18px',
              padding: '14px 36px',
              boxShadow: '0 8px 20px rgba(230,126,34,0.3)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease',
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
            Try Free Now
          </button>
        </Link>
      </div>

      {/* 收尾句 */}
      <div style={{ textAlign: 'center', paddingTop: '20px' }}>
        <p style={{ fontSize: '14px', color: '#5A4A3A' }}>Simple · Smart · Beautiful. Redesign your home with the power of AI.</p >
      </div>
    </div>
  );
}   