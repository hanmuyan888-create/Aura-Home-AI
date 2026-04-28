"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface HistoryItem {
  id: string;
  prompt: string;
  imageUrl: string;
  timestamp: number;
}

export default function HistoryPage() {
  const router = useRouter();
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('aura_history');
      if (stored) {
        const items = JSON.parse(stored) as HistoryItem[];
        items.sort((a, b) => b.timestamp - a.timestamp);
        setHistory(items);
      }
    } catch {}
  }, []);

  if (history.length === 0) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        backgroundColor: '#FDF6F0',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📋</div>
        <p style={{ color: '#3D3228', fontSize: '18px', fontWeight: 500 }}>
          No history yet
        </p >
        <p style={{ color: '#8C7A6B', fontSize: '14px', marginTop: '8px' }}>
          Your generated designs will appear here.
        </p >
        <button
          onClick={() => router.push('/studio')}
          style={{
            marginTop: '24px',
            padding: '10px 24px',
            background: '#E67E22',
            color: 'white',
            border: 'none',
            borderRadius: '40px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Go to Studio
        </button>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FDF6F0',
      padding: '24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
        }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 600,
            color: '#3D3228',
            margin: 0,
          }}>
            📋 Your Design History
          </h1>
          <button
            onClick={() => router.push('/studio')}
            style={{
              padding: '8px 16px',
              background: '#E67E22',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            ← Back to Studio
          </button>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '16px',
        }}>
          {history.map((item) => (
            <div
              key={item.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)';
              }}
            >
              <img
                src={item.imageUrl}
                alt="Generated Design"
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  backgroundColor: '#FDF6F0',
                }}
              />
              <div style={{ padding: '12px 16px' }}>
                <p style={{
                  fontSize: '13px',
                  color: '#5A4A3A',
                  margin: '0 0 8px 0',
                  lineHeight: '1.4',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}>
                  {item.prompt}
                </p >
                <p style={{
                  fontSize: '11px',
                  color: '#8C7A6B',
                  margin: 0,
                }}>
                  {new Date(item.timestamp).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p >
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}