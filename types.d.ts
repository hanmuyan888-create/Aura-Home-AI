// 为 react-cookie-consent 提供类型声明
declare module 'react-cookie-consent' {
  import * as React from 'react';
  export interface CookieConsentProps {
    location?: 'top' | 'bottom' | 'none';
    buttonText?: string;
    declineButtonText?: string;
    enableDeclineButton?: boolean;
    cookieName?: string;
    style?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    declineButtonStyle?: React.CSSProperties;
    expires?: number;
    children?: React.ReactNode;
    onAccept?: () => void;
    onDecline?: () => void;
  }
  const CookieConsent: React.FC<CookieConsentProps>;
  export default CookieConsent;
}

// 为自定义组件提供类型声明（确保 TS 能找到）
declare module './components/CookieConsentBanner' {
  const CookieConsentBanner: () => JSX.Element;
  export default CookieConsentBanner;
}