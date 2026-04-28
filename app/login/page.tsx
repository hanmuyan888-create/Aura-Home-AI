'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // 简单邮箱格式校验：包含 @ 和 .
  const isValidEmail = (email: string) => {
    return email.includes('@') && email.includes('.');
  };

  // 初始化用户积分（每日免费1次，付费积分0）
  const initializeUserCredits = () => {
    const today = new Date().toDateString();
    localStorage.setItem('free_credits_date', today);
    localStorage.setItem('free_credits', '1');
    if (!localStorage.getItem('paid_credits')) {
      localStorage.setItem('paid_credits', '0');
    }
  };

  // 记录首次登录时间并触发邮件检查
  const handlePostLogin = (userId: string) => {
    // 记录首次登录时间戳
    let firstLogin = localStorage.getItem('aura_first_login');
    if (!firstLogin) {
      firstLogin = Date.now().toString();
      localStorage.setItem('aura_first_login', firstLogin);
    }

    // 异步调用检查提醒 API（不阻塞跳转）
    fetch('/api/check-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-user-id': userId,
      },
      body: JSON.stringify({ firstLoginTs: parseInt(firstLogin, 10) }),
    }).catch(console.error);
  };

  const handleContinueWithEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address (e.g., name@example.com)');
      return;
    }
    // 存储用户标识（直接用邮箱）
    localStorage.setItem('aura_user', email);
    // 初始化积分（如果还没有今日记录）
    if (!localStorage.getItem('free_credits_date') || localStorage.getItem('free_credits_date') !== new Date().toDateString()) {
      initializeUserCredits();
    }
    // 记录首次登录并触发邮件检查
    handlePostLogin(email);
    router.push('/studio');
  };

  const handleGuestLogin = () => {
    // 生成临时访客 ID
    const guestId = `guest_${Math.random().toString(36).substring(2, 10)}`;
    localStorage.setItem('aura_user', guestId);
    // 初始化积分
    if (!localStorage.getItem('free_credits_date') || localStorage.getItem('free_credits_date') !== new Date().toDateString()) {
      initializeUserCredits();
    }
    // 访客模式也记录首次登录，但由于没有邮箱，邮件无法发送，API 会自行处理
    handlePostLogin(guestId);
    router.push('/studio');
  };
  return (
    <div className="container" style={{ maxWidth: '500px', margin: '80px auto', padding: '0 24px' }}>
      <div className="card" style={{ padding: '40px', borderRadius: '20px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '24px', textAlign: 'center' }}>Welcome back</h1>
        <form onSubmit={handleContinueWithEmail}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid #E0D6CC' }}
            />
          </div>
          {error && <p style={{ color: '#E67E22', fontSize: '13px', marginBottom: '16px' }}>{error}</p >}
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: '12px' }}>
            Continue with Email
          </button>
        </form>
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#9D9D9D', marginTop: '12px' }}>
          No password required. We’ll never share your email.
        </p >
        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <button
            onClick={handleGuestLogin}
            style={{
              background: 'none',
              border: '1px solid #E67E22',
              color: '#E67E22',
              padding: '10px 20px',
              borderRadius: '40px',
              fontSize: '14px',
              cursor: 'pointer',
              transition: '0.2s',
              width: '100%',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(230,126,34,0.05)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
          >
            Try as Guest
          </button>
        </div>
        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#5A4A3A' }}>
          Don't have an account?{' '}
          <Link href="/register" style={{ color: '#E67E22', textDecoration: 'none' }}>
            Register
          </Link>
        </p >
        {/* 新增：法律告知文案 */}
        <p style={{ textAlign: 'center', fontSize: '12px', color: '#8C7A6B', marginTop: '24px', marginBottom: 0 }}>
          By signing in, you agree to our{' '}
          <Link href="/terms" style={{ color: '#E67E22', textDecoration: 'none' }}>Terms</Link>,{' '}
          <Link href="/privacy" style={{ color: '#E67E22', textDecoration: 'none' }}>Privacy</Link> and{' '}
          <Link href="/cookie-policy" style={{ color: '#E67E22', textDecoration: 'none' }}>Cookie Policy</Link>.
        </p >
      </div>
    </div>
  );
}