'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const getRemainingFreeCredits = () => {
  if (typeof window === 'undefined') return 0;
  const user = localStorage.getItem('aura_user');
  if (!user) return 0;
  const today = new Date().toDateString();
  const storedDate = localStorage.getItem('free_credits_date');
  if (storedDate !== today) {
    localStorage.setItem('free_credits_date', today);
    localStorage.setItem('free_credits', '1');
    return 1;
  }
  const credits = localStorage.getItem('free_credits');
  return credits ? parseInt(credits, 10) : 1;
};

const getPaidCredits = () => {
  if (typeof window === 'undefined') return 0;
  const paid = localStorage.getItem('paid_credits');
  return paid ? parseInt(paid, 10) : 0;
};

export default function Navbar() {
  const [freeCredits, setFreeCredits] = useState(0);
  const [paidCredits, setPaidCredits] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const pathname = usePathname();

  // 初始化主题（从 localStorage 或系统偏好读取）
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const initialTheme = prefersDark ? 'dark' : 'light';
      setTheme(initialTheme);
      document.documentElement.setAttribute('data-theme', initialTheme);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const user = localStorage.getItem('aura_user');
    setIsLoggedIn(!!user);
    if (user) {
      setFreeCredits(getRemainingFreeCredits());
      setPaidCredits(getPaidCredits());
    }
    const handleStorage = () => {
      if (localStorage.getItem('aura_user')) {
        setFreeCredits(getRemainingFreeCredits());
        setPaidCredits(getPaidCredits());
      } else {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link href="/" className="nav-logo">
          <span>AuraHome AI</span>
          <span className="nav-slogan">Give your room a warm glow</span>
        </Link>
        <div className="menu-icon" onClick={toggleMenu}>☰</div>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <Link href="/" style={{ borderBottom: pathname === '/' ? '2px solid #E67E22' : 'none' }}>Home</Link>
          <Link href="/studio" style={{ borderBottom: pathname === '/studio' ? '2px solid #E67E22' : 'none' }}>Generator</Link>
          <Link href="/gallery" style={{ borderBottom: pathname === '/gallery' ? '2px solid #E67E22' : 'none' }}>Gallery</Link>
          <Link href="/pricing" style={{ borderBottom: pathname === '/pricing' ? '2px solid #E67E22' : 'none' }}>Pricing</Link>
          <Link href="/about" style={{ borderBottom: pathname === '/about' ? '2px solid #E67E22' : 'none' }}>About</Link>
          {!isLoggedIn ? (
            <Link href="/login" style={{ borderBottom: pathname === '/login' ? '2px solid #E67E22' : 'none' }}>Sign in</Link>
          ) : (
            <button onClick={() => { localStorage.removeItem('aura_user'); window.location.href = '/'; }}>Logout</button>
          )}
          {isLoggedIn && (
            <div
              className="credits-tooltip nav-credits"
              data-tooltip="Includes daily free credit\n+ any credits you purchased\nPay as you go · No waste"
            >
              <span>✨</span>
              <span>Your Credits: {freeCredits + paidCredits}</span>
            </div>
          )}
          {/* 暗黑模式切换按钮 */}
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '20px',
              cursor: 'pointer',
              marginLeft: '8px',
              padding: '4px 8px',
              borderRadius: '20px',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(230,126,34,0.1)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}
            aria-label="切换暗黑模式"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </nav>
  );
}