"use client";

import { useEffect, useState, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Toast from '@/app/components/Toast';

interface ResultData {
  imageBase64: string;
  originalImageBase64?: string;
  prompt: string;
  count: number;
}

export default function LoadingContent() {
  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId');
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [resultData, setResultData] = useState<ResultData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [comparisonUrl, setComparisonUrl] = useState<string | null>(null);
  const [shareCardUrl, setShareCardUrl] = useState<string | null>(null);
  const [isSharingPinterest, setIsSharingPinterest] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!taskId) {
      setStatus('error');
      setToastMessage('Invalid task. Please try generating again.');
      return;
    }

    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      const data = event.data;
      if (data && data.type === 'GENERATION_RESULT' && data.taskId === taskId) {
        setResultData({
          imageBase64: data.imageBase64,
          originalImageBase64: data.originalImageBase64,
          prompt: data.prompt,
          count: data.count,
        });
        setStatus('ready');
      }
    };

    window.addEventListener('message', handleMessage);

    const timeoutId = setTimeout(() => {
      if (status === 'loading') {
        setStatus('error');
        setToastMessage('Generation timed out. Please try again.');
      }
    }, 120000);

    return () => {
      window.removeEventListener('message', handleMessage);
      clearTimeout(timeoutId);
    };
  }, [taskId, status]);

  const generatePremiumAssets = useCallback(async (data: ResultData) => {
    const { imageBase64, originalImageBase64 } = data;
    if (!originalImageBase64 || !imageBase64) return;

    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.src = src;
      });
    };

    try {
      const [originalImg, resultImg] = await Promise.all([
        loadImage(originalImageBase64),
        loadImage(imageBase64),
      ]);

      const dpr = window.devicePixelRatio || 1;
      
      const cardWidth = 1200;
      const cardHeight = Math.round(cardWidth * (resultImg.height / resultImg.width)) + 160;
      
      const cardCanvas = document.createElement('canvas');
      cardCanvas.width = cardWidth * dpr;
      cardCanvas.height = cardHeight * dpr;
      cardCanvas.style.width = `${cardWidth}px`;
      cardCanvas.style.height = `${cardHeight}px`;
      
      const cardCtx = cardCanvas.getContext('2d');
      if (!cardCtx) return;
      cardCtx.scale(dpr, dpr);

      cardCtx.fillStyle = '#FDF6F0';
      cardCtx.fillRect(0, 0, cardWidth, cardHeight);
      
      const imageData = cardCtx.getImageData(0, 0, cardWidth, cardHeight);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 6;
        imageData.data[i] = Math.min(255, Math.max(0, imageData.data[i] + noise));
        imageData.data[i + 1] = Math.min(255, Math.max(0, imageData.data[i + 1] + noise));
        imageData.data[i + 2] = Math.min(255, Math.max(0, imageData.data[i + 2] + noise));
      }
      cardCtx.putImageData(imageData, 0, 0);

      const glowGradient = cardCtx.createRadialGradient(cardWidth - 80, 80, 20, cardWidth - 80, 80, 400);
      glowGradient.addColorStop(0, 'rgba(230, 126, 34, 0.08)');
      glowGradient.addColorStop(0.5, 'rgba(230, 126, 34, 0.03)');
      glowGradient.addColorStop(1, 'rgba(253, 246, 240, 0)');
      cardCtx.fillStyle = glowGradient;
      cardCtx.fillRect(0, 0, cardWidth, cardHeight);

      const imgY = 60;
      const imgMaxHeight = cardHeight - 220;
      const imgScale = Math.min(cardWidth / resultImg.width, imgMaxHeight / resultImg.height);
      const imgDrawWidth = resultImg.width * imgScale;
      const imgDrawHeight = resultImg.height * imgScale;
      const imgX = (cardWidth - imgDrawWidth) / 2;
      
      cardCtx.drawImage(resultImg, imgX, imgY, imgDrawWidth, imgDrawHeight);

      const brandY = imgY + imgDrawHeight + 60;
      cardCtx.font = '500 28px system-ui, -apple-system, sans-serif';
      cardCtx.textAlign = 'center';
      
      cardCtx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      cardCtx.fillText('AuraHome AI', cardWidth / 2 + 1, brandY + 1);
      
      cardCtx.fillStyle = '#3D3228';
      cardCtx.fillText('AuraHome AI', cardWidth / 2, brandY);

      cardCtx.font = '400 14px system-ui, -apple-system, sans-serif';
      cardCtx.fillStyle = '#8C7A6B';
      cardCtx.fillText('Give your home a warm glow.', cardWidth / 2, brandY + 28);

      cardCtx.font = '400 12px system-ui, -apple-system, sans-serif';
      cardCtx.fillStyle = '#9D9D9D';
      cardCtx.fillText('myaurahomeai.com', cardWidth / 2, brandY + 50);

      const shareCardDataUrl = cardCanvas.toDataURL('image/png');
      setShareCardUrl(shareCardDataUrl);

      const padding = 40;
      const labelHeight = 80;
      const maxImgWidth = Math.min(originalImg.width, resultImg.width, (cardWidth - padding * 3) / 2);
      const unifiedHeight = Math.round(maxImgWidth * (Math.max(originalImg.height, resultImg.height) / Math.max(originalImg.width, resultImg.width)));
      
      const compCanvas = document.createElement('canvas');
      compCanvas.width = (maxImgWidth * 2 + padding * 3) * dpr;
      compCanvas.height = (unifiedHeight + padding * 2 + labelHeight) * dpr;
      compCanvas.style.width = `${maxImgWidth * 2 + padding * 3}px`;
      compCanvas.style.height = `${unifiedHeight + padding * 2 + labelHeight}px`;
      
      const compCtx = compCanvas.getContext('2d');
      if (!compCtx) return;
      compCtx.scale(dpr, dpr);

      compCtx.fillStyle = '#FDF6F0';
      compCtx.fillRect(0, 0, maxImgWidth * 2 + padding * 3, unifiedHeight + padding * 2 + labelHeight);

      compCtx.drawImage(originalImg, padding, padding, maxImgWidth, unifiedHeight);
      compCtx.drawImage(resultImg, padding * 2 + maxImgWidth, padding, maxImgWidth, unifiedHeight);

      const sepX = padding * 1.5 + maxImgWidth;
      const sepGradient = compCtx.createLinearGradient(sepX - 30, 0, sepX + 30, 0);
      sepGradient.addColorStop(0, 'rgba(230, 126, 34, 0)');
      sepGradient.addColorStop(0.5, 'rgba(230, 126, 34, 0.3)');
      sepGradient.addColorStop(1, 'rgba(230, 126, 34, 0)');
      compCtx.strokeStyle = sepGradient;
      compCtx.lineWidth = 1;
      compCtx.beginPath();
      compCtx.moveTo(sepX, padding + 10);
      compCtx.lineTo(sepX, padding + unifiedHeight - 10);
      compCtx.stroke();

      const labelY = unifiedHeight + padding + 30;
      compCtx.font = '400 15px system-ui, -apple-system, sans-serif';
      compCtx.textAlign = 'center';
      
      compCtx.fillStyle = '#3D3228';
      compCtx.fillText('Before', padding + maxImgWidth / 2, labelY);
      compCtx.fillText('After', padding * 2 + maxImgWidth + maxImgWidth / 2, labelY);
      
      compCtx.fillStyle = '#8C7A6B';
      compCtx.font = '400 12px system-ui, -apple-system, sans-serif';
      compCtx.fillText('Original Room', padding + maxImgWidth / 2, labelY + 20);
      compCtx.fillText('AI Generated', padding * 2 + maxImgWidth + maxImgWidth / 2, labelY + 20);

      const comparisonDataUrl = compCanvas.toDataURL('image/png');
      setComparisonUrl(comparisonDataUrl);
    } catch (error) {
      console.error('Failed to generate premium assets:', error);
    }
  }, []);

  useEffect(() => {
    if (status === 'ready' && resultData?.originalImageBase64) {
      generatePremiumAssets(resultData);
    }
  }, [status, resultData, generatePremiumAssets]);

  if (status === 'loading') {
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#FDF6F0',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎨</div>
          <p style={{ color: '#3D3228', fontSize: '18px', fontWeight: 500 }}>
            AI is generating your design...
          </p >
          <p style={{ color: '#8C7A6B', fontSize: '14px', marginTop: '8px' }}>
            This may take up to 30 seconds.
          </p >
          <div style={{
            marginTop: '24px',
            width: '200px',
            height: '4px',
            background: '#F0EDE8',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '24px auto 0',
          }}>
            <div style={{
              width: '60%',
              height: '100%',
              background: '#E67E22',
              borderRadius: '2px',
              animation: 'loading 1.5s infinite',
            }} />
          </div>
          <style jsx>{`
            @keyframes loading {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(200%); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div style={{
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#FDF6F0',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}>
        {toastMessage && <Toast message={toastMessage} type="error" onClose={() => setToastMessage(null)} />}
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>😔</div>
          <p style={{ color: '#3D3228', fontSize: '18px', fontWeight: 500 }}>
            Something went wrong.
          </p >
          <p style={{ color: '#8C7A6B', marginTop: '8px' }}>
            Please close this tab and try generating again.
          </p >
        </div>
      </div>
    );
  }
  const { imageBase64, prompt, count } = resultData!;

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePinterestShare = async () => {
    setIsSharingPinterest(true);
    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        alert('Pinterest share is not configured. Please contact support.');
        setIsSharingPinterest(false);
        return;
      }

      const imageToUpload = shareCardUrl || imageBase64;
      const base64Data = imageToUpload.split(',')[1] || imageToUpload;

      const formData = new FormData();
      formData.append('key', apiKey);
      formData.append('image', base64Data);

      const uploadRes = await fetch('https://api.imgbb.com/1/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadData = await uploadRes.json();

      if (!uploadData.success) {
        alert('Failed to upload image. Please try again.');
        setIsSharingPinterest(false);
        return;
      }

      const imageUrl = uploadData.data.url;
      const pageUrl = window.location.origin;
      const description = encodeURIComponent('AI Interior Design by AuraHome AI');

      window.open(
        `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(pageUrl)}&media=${encodeURIComponent(imageUrl)}&description=${description}`,
        '_blank'
      );
    } catch {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSharingPinterest(false);
    }
  };

  const handleTwitterShare = () => {
    const text = 'Check out this AI-generated room design!';
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#FDF6F0',
      padding: '24px',
      fontFamily: 'system-ui, sans-serif',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h1 style={{
          fontSize: '24px',
          fontWeight: 600,
          color: '#3D3228',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <span>✨ Generated Design</span>
          <span style={{
            background: '#E67E22',
            color: 'white',
            padding: '2px 10px',
            borderRadius: '40px',
            fontSize: '12px',
          }}>
            {count} image{count > 1 ? 's' : ''}
          </span>
        </h1>

        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          marginBottom: '24px',
        }}>
          <img
            src={imageBase64}
            alt="Generated Room"
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '12px',
              maxHeight: '70vh',
              objectFit: 'contain',
              backgroundColor: '#FDF6F0',
            }}
          />
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginTop: '24px',
        }}>
          <button
            onClick={() => handleDownload(imageBase64, `auraprompt_${Date.now()}.png`)}
            style={{
              background: '#E67E22',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            📥 Download Result
          </button>

          {comparisonUrl && (
            <button
              onClick={() => handleDownload(comparisonUrl, `comparison_${Date.now()}.png`)}
              style={{
                background: '#3D3228',
                color: 'white',
                border: 'none',
                borderRadius: '40px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              📸 Download Before & After
            </button>
          )}

          {shareCardUrl && (
            <button
              onClick={() => handleDownload(shareCardUrl, `auracard_${Date.now()}.png`)}
              style={{
                background: '#8C7A6B',
                color: 'white',
                border: 'none',
                borderRadius: '40px',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              🃏 Download Share Card
            </button>
          )}

          <button
            onClick={handleTwitterShare}
            style={{
              background: '#1DA1F2',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            🐦 Share on Twitter
          </button>

          <button
            onClick={handlePinterestShare}
            disabled={isSharingPinterest}
            style={{
              background: '#BD081C',
              color: 'white',
              border: 'none',
              borderRadius: '40px',
              padding: '10px 20px',
              fontSize: '14px',
              fontWeight: 500,
              cursor: isSharingPinterest ? 'wait' : 'pointer',
              opacity: isSharingPinterest ? 0.7 : 1,
            }}
          >
            {isSharingPinterest ? '⏳ Sharing...' : '📌 Share on Pinterest'}
          </button>
        </div>

        {prompt && (
          <div style={{
            marginTop: '24px',
            padding: '16px',
            background: '#F9F3EC',
            borderRadius: '12px',
            fontSize: '13px',
            color: '#5A4A3A',
          }}>
            <strong>Prompt used:</strong> {prompt}
          </div>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <a
            href=" "
            style={{
              color: '#E67E22',
              textDecoration: 'none',
              fontSize: '14px',
              fontWeight: 500,
            }}
          >
            ← Back to Studio
          </a >
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}