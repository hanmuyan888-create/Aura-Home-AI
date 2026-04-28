"use client";

import { useEffect, useState } from 'react';

interface ToastProps {
  message: string;
  type?: 'error' | 'success' | 'info';
  duration?: number;
  onClose?: () => void;
}

export default function Toast({ message, type = 'info', duration = 4000, onClose }: ToastProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const bgColor = type === 'error' ? '#D32F2F' : type === 'success' ? '#2E7D32' : '#3D3228';

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: bgColor,
      color: 'white',
      padding: '12px 24px',
      borderRadius: '40px',
      fontSize: '14px',
      fontWeight: 500,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 9999,
      animation: 'fadeIn 0.3s ease',
    }}>
      {message}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(10px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}