'use client';

import CookieConsent from 'react-cookie-consent';

export default function CookieConsentBanner() {
  const handleAccept = () => {
    console.log('Cookie consent accepted');
  };

  const handleDecline = () => {
    // 用户拒绝非必要Cookie，禁用Google Analytics追踪
    if (typeof window !== 'undefined') {
      // 使用类型断言绕过 TypeScript 类型检查
      const gtag = (window as any).gtag;
      if (gtag) {
        gtag('consent', 'update', {
          analytics_storage: 'denied',
        });
      }
      // 清除已有的 Cookie（可选）
      document.cookie.split(';').forEach(c => {
        document.cookie = c
          .replace(/^ +/, '')
          .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
      });
    }
    console.log('Cookie consent declined');
  };

  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="aurahome-cookie-consent"
      onAccept={handleAccept}
      onDecline={handleDecline}
      style={{
        background: '#2B2B2B',
        color: '#F5F0EB',
        fontSize: '14px',
        padding: '16px 24px',
        alignItems: 'center',
      }}
      buttonStyle={{
        background: '#E67E22',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 600,
        borderRadius: '40px',
        padding: '10px 24px',
        border: 'none',
        marginLeft: '20px',
      }}
      declineButtonStyle={{
        background: 'transparent',
        color: '#B0A89A',
        fontSize: '14px',
        fontWeight: 400,
        borderRadius: '40px',
        padding: '10px 24px',
        border: '1px solid #5A4A3A',
        marginLeft: '10px',
      }}
      expires={150}
    >
      We use cookies to enhance your experience. By continuing to visit this site you agree to our use of cookies.{' '}
      <a href=" " style={{ color: '#E67E22', textDecoration: 'underline' }}>
        Learn more
      </a >
    </CookieConsent>
  );
}