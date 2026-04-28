"use client";

import imageCompression from 'browser-image-compression';
import { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const STYLES = [
{ id: 'Scandinavian', name: 'Scandinavian', icon: '🪑' },
{ id: 'Industrial', name: 'Industrial', icon: '🏭' },
{ id: 'Modern', name: 'Modern', icon: '🏢' },
{ id: 'Mid-Century Modern', name: 'Mid-Century Modern', icon: '🕰️' },
{ id: 'Bohemian', name: 'Bohemian', icon: '🌿' },
{ id: 'Farmhouse', name: 'Farmhouse', icon: '🚜' },
{ id: 'Minimalist', name: 'Minimalist', icon: '⬜' },
{ id: 'Japandi', name: 'Japandi', icon: '🎋' },
{ id: 'Coastal', name: 'Coastal', icon: '🌊' },
{ id: 'Art Deco', name: 'Art Deco', icon: '💎' },
{ id: 'Rustic', name: 'Rustic', icon: '🌲' },
{ id: 'Eclectic', name: 'Eclectic', icon: '🎨' }
];

const FEELINGS = [
{ id: 'cozy', name: 'Cozy & Affordable', keywords: 'cozy atmosphere with soft warm lighting, plush textures, gentle colors, and affordable materials like cotton and wood. The space feels inviting and restful.' },
{ id: 'timeless', name: 'Warm & Timeless', keywords: 'timeless design with natural textures, emotional connection, safe for family. Use warm neutrals, classic furniture shapes, and subtle elegance.' },
{ id: 'inviting', name: 'Inviting & Stylish', keywords: 'inviting and stylish space, photogenic, high-end feel with warm glow. Incorporate a mix of contemporary and classic elements, with a focus on comfort and visual appeal.' },
{ id: 'professional', name: 'Professional & High-End', keywords: 'professional, high-end workspace with nuanced details, subtle warmth, rich textures like leather and velvet, polished metals, and sophisticated color palette of charcoal, navy, and warm brass.' }
];
const getStyleBase = (styleId: string): string => {
const map: Record<string, string> = {
'Scandinavian': 'Scandinavian style with warm oak wood floors, off-white walls, a beige linen sofa, a light oak coffee table, a soft wool rug in cream, and warm ambient lighting from a brass floor lamp.',
'Industrial': 'Industrial style with exposed brick walls, dark metal beams, polished concrete floors, leather furniture, and vintage Edison bulb lighting.',
'Mid-Century Modern': 'Mid-Century Modern style with walnut wood furniture, tapered legs, geometric shapes, muted earth tones, and statement lighting.',
'Bohemian': 'Bohemian style with layered textiles, rattan, macrame, plants, and a mix of patterns and colors.',
'Farmhouse': 'Farmhouse style with shiplap walls, rustic wood beams, a farmhouse sink, vintage accents, and a cozy, lived-in feel.',
'Minimalist': 'Minimalist style with clean lines, monochromatic palette, hidden storage, and a focus on essential furniture.',
'Japandi': 'Japandi style blending Japanese minimalism and Scandinavian coziness. Natural wood, soft neutrals, clean lines, and a sense of balance and tranquility.',
'Coastal': 'Coastal style with light blue and white palette, natural textures like rattan and linen, driftwood accents, and breezy, airy spaces.',
'Art Deco': 'Art Deco style with bold geometric patterns, rich jewel tones, mirrored surfaces, velvet upholstery, and gold accents.',
'Modern': 'Modern style with sleek lines, neutral colors, a mix of materials like glass, steel, and wood.',
'Rustic': 'Rustic style with reclaimed wood, stone fireplace, warm earthy colors, and handcrafted furniture.',
'Eclectic': 'Eclectic style with a curated mix of different eras, textures, and colors.'
};
return map[styleId] || styleId;
};

const SPACE_TYPES = [
{ id: 'living', name: 'Living Room', icon: '🛋️' },
{ id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
{ id: 'kitchen', name: 'Kitchen', icon: '🍳' },
{ id: 'bathroom', name: 'Bathroom', icon: '🚿' },
{ id: 'dining', name: 'Dining Room', icon: '🍽️' },
{ id: 'study', name: 'Study', icon: '📚' },
{ id: 'closet', name: 'Closet', icon: '👗' },
{ id: 'entrance', name: 'Entrance', icon: '🚪' },
{ id: 'office', name: 'Office', icon: '💼' },
{ id: 'homeoffice', name: 'Home Office', icon: '🏢' },
{ id: 'garden', name: 'Garden', icon: '🌻' },
{ id: 'lawn', name: 'Lawn', icon: '🌿' },
{ id: 'terrace', name: 'Terrace', icon: '☕' },
{ id: 'balcony', name: 'Balcony', icon: '🏙️' },
{ id: 'backyard', name: 'Backyard', icon: '🌳' },
{ id: 'pool', name: 'Pool', icon: '🏊' },
{ id: 'shop', name: 'Small Shop', icon: '🏪' },
{ id: 'nail', name: 'Nail Salon', icon: '💅' },
{ id: 'restaurant', name: 'Restaurant', icon: '🍜' },
{ id: 'teahouse', name: 'Teahouse', icon: '🍵' }
];
const fileToBase64 = (file: File): Promise<string> => {
return new Promise((resolve, reject) => {
const reader = new FileReader();
reader.readAsDataURL(file);
reader.onload = () => resolve(reader.result as string);
reader.onerror = error => reject(error);
});
};

const getRemainingFreeCredits = (): number => {
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

const consumeFreeCredit = () => {
if (typeof window === 'undefined') return;
const current = getRemainingFreeCredits();
if (current > 0) localStorage.setItem('free_credits', (current - 1).toString());
};

const getPaidCredits = (): number => {
if (typeof window === 'undefined') return 0;
const paid = localStorage.getItem('paid_credits');
return paid ? parseInt(paid, 10) : 0;
};

const consumePaidCredits = (count: number) => {
if (typeof window === 'undefined') return;
const current = getPaidCredits();
if (current >= count) localStorage.setItem('paid_credits', (current - count).toString());
};

const consumeCreditsByTier = (perImageCost: number, quantity: number) => {
const totalCost = perImageCost * quantity;
let remaining = totalCost;
if (perImageCost === 1) {
const free = getRemainingFreeCredits();
if (free > 0) {
const freeConsume = Math.min(free, remaining);
for (let i = 0; i < freeConsume; i++) consumeFreeCredit();
remaining -= freeConsume;
}
}
if (remaining > 0) consumePaidCredits(remaining);
};

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
<span style={{ background: 'rgba(230, 126, 34, 0.1)', padding: '4px 10px', borderRadius: '40px', fontSize: '12px', fontWeight: 500, color: '#E67E22', marginLeft: '8px' }}>
⏳ {timeLeft}
</span>
);
};
const GuideCard = ({ onClose }: { onClose: (dontShowAgain: boolean) => void }) => {
const [dontShow, setDontShow] = useState(false);
return (
<div style={{
width: '100%', maxWidth: '560px', marginBottom: '12px',
background: '#FFFFFF', borderRadius: '16px', padding: '16px 20px',
boxShadow: '0 4px 12px rgba(0,0,0,0.08)', border: '1px solid #E6DFD6',
position: 'relative',
}}>
<button
onClick={() => onClose(dontShow)}
style={{ position: 'absolute', top: '12px', right: '12px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#8C7A6B' }}
aria-label="关闭"
>✕</button>
<h4 style={{ fontSize: '16px', fontWeight: 600, color: '#3D3228', marginBottom: '12px' }}>👋 Welcome to AuraHome AI!</h4>
<ol style={{ margin: 0, paddingLeft: '20px', fontSize: '14px', color: '#5A4A3A', lineHeight: '1.8' }}>
<li>📸 <strong>Upload</strong> your room photo</li>
<li>🎨 <strong>Choose</strong> a style & vibe</li>
<li>✨ Click <strong>"Generate"</strong> to see the magic</li>
</ol>
<div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
<input
type="checkbox"
id="dontShowAgain"
checked={dontShow}
onChange={(e) => setDontShow(e.target.checked)}
style={{ width: '14px', height: '14px', cursor: 'pointer' }}
/>
<label htmlFor="dontShowAgain" style={{ fontSize: '13px', color: '#8C7A6B', cursor: 'pointer' }}>Don't show this again</label>
</div>
</div>
);
};

interface HistoryItem {
id: string;
prompt: string;
imageUrl: string;
timestamp: number;
}
function StudioContent() {
const router = useRouter();
const searchParams = useSearchParams();

const [selectedStyle, setSelectedStyle] = useState(STYLES[0].id);
const [selectedSpace, setSelectedSpace] = useState(SPACE_TYPES[0].id);
const [selectedFeeling, setSelectedFeeling] = useState(FEELINGS[0].id);
const [generateCount, setGenerateCount] = useState(2);
const [uploadedImage, setUploadedImage] = useState<File | null>(null);
const [loading, setLoading] = useState(false);
const [showPayModal, setShowPayModal] = useState(false);
const [customRequest, setCustomRequest] = useState('');
const [loadingMessage, setLoadingMessage] = useState('');
const [loadingProgress, setLoadingProgress] = useState(0);
const fileInputRef = useRef<HTMLInputElement>(null);
const [previewUrl, setPreviewUrl] = useState<string | null>(null);
const [remainingCredits, setRemainingCredits] = useState(0);
const [expertMode, setExpertMode] = useState(false);
const [history, setHistory] = useState<HistoryItem[]>([]);
const [isEnhancing, setIsEnhancing] = useState(false);
const [isClient, setIsClient] = useState(false);
const [showGuideCard, setShowGuideCard] = useState(false);

useEffect(() => {
if (typeof window !== 'undefined') {
const hasSeenGuide = localStorage.getItem('aura_studio_guide_seen');
if (!hasSeenGuide) {
setShowGuideCard(true);
}
}
}, []);

const handleCloseGuide = (dontShowAgain: boolean) => {
setShowGuideCard(false);
if (dontShowAgain) {
localStorage.setItem('aura_studio_guide_seen', 'true');
}
};

useEffect(() => {
setIsClient(true);
const styleParam = searchParams.get('style');
if (styleParam && STYLES.some(s => s.id === styleParam)) {
setSelectedStyle(styleParam);
}
}, [searchParams]);

useEffect(() => {
if (!isClient) return;
const user = localStorage.getItem('aura_user');
if (!user) return;

const syncHistory = async () => {
try {
const res = await fetch('/api/history', {
headers: { 'x-user-id': user },
});
if (res.ok) {
const data = await res.json();
if (data.history && Array.isArray(data.history)) {
const localStored = localStorage.getItem('aura_history');
const localItems: HistoryItem[] = localStored ? JSON.parse(localStored) : [];
const cloudItems = data.history.map((item: any) => ({
id: item.id,
prompt: item.prompt,
imageUrl: item.image_url,
timestamp: new Date(item.created_at).getTime(),
}));
const merged = [...cloudItems, ...localItems];
const unique = merged.filter((item, index, self) =>
index === self.findIndex(t => t.id === item.id)
);
unique.sort((a, b) => b.timestamp - a.timestamp);
const latest = unique.slice(0, 20);
localStorage.setItem('aura_history', JSON.stringify(latest));
setHistory(latest.slice(0, 3));
}
}
} catch (error) {
console.error('Failed to sync history:', error);
}
};

syncHistory();
}, [isClient]);

useEffect(() => {
if (!isClient) return;

const stored = localStorage.getItem('aura_history');
if (stored) {
try {
const items = JSON.parse(stored) as HistoryItem[];
setHistory(items.slice(0, 3));
} catch {}
}

const currentPaid = getPaidCredits();
if (currentPaid < 500) {
localStorage.setItem('paid_credits', '1000');
console.log('✅ 测试积分已充值 1000');
}

const free = getRemainingFreeCredits();
const paid = getPaidCredits();
setRemainingCredits(free + paid);

const user = localStorage.getItem('aura_user');
if (!user) router.push('/login');
}, [isClient, router]);
const saveToHistory = async (prompt: string, imageUrl: string) => {
    if (typeof window === 'undefined') return;
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      prompt,
      imageUrl,
      timestamp: Date.now(),
    };

    // 1. 始终保存到本地存储
    try {
      const existing = localStorage.getItem('aura_history');
      const localItems: HistoryItem[] = existing ? JSON.parse(existing) : [];
      localItems.unshift(newItem);
      localStorage.setItem('aura_history', JSON.stringify(localItems.slice(0, 20)));
      setHistory(prev => [newItem, ...prev].slice(0, 20));
    } catch (e) {
      console.error('保存到本地存储失败:', e);
    }

    // 2. 尝试同步到 Supabase（即使失败，本地存储已经保存了）
    const user = localStorage.getItem('aura_user');
    if (user) {
      try {
        await fetch('/api/history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-user-id': user,
          },
          body: JSON.stringify({
            prompt,
            imageUrl,
            creditsUsed: 1,
          }),
        });
      } catch (error) {
        console.error('Failed to save history to cloud:', error);
      }
    }
  };

  const handleUpload = (file: File) => {
    setUploadedImage(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const buildPrompt = () => {
    const styleBase = getStyleBase(selectedStyle);
    const feeling = FEELINGS.find(f => f.id === selectedFeeling);
    let finalPrompt = `${styleBase}. ${feeling?.keywords || ''}`;
    if (customRequest.trim() !== '') {
      finalPrompt = `${finalPrompt}. Additionally, ${customRequest.trim()}`;
    }
    return finalPrompt;
  };

  const enhancePrompt = async () => {
    if (!customRequest.trim()) return;
    setIsEnhancing(true);
    try {
      const res = await fetch('/api/enhance-prompt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: customRequest }),
      });
      const data = await res.json();
      if (data.enhanced) setCustomRequest(data.enhanced);
      else alert('Could not enhance prompt. Please try again.');
    } catch {
      alert('Failed to enhance prompt. Please check your connection.');
    } finally {
      setIsEnhancing(false);
    }
  };
  const generate = async () => {
    if (!uploadedImage) {
      alert('Please upload a room photo first.');
      return;
    }
    if (remainingCredits < totalCost) {
      setShowPayModal(true);
      return;
    }

    const taskId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newTab = window.open(`/loading?taskId=${taskId}`, '_blank');

    setLoading(true);
    setLoadingProgress(0);
    setLoadingMessage('Compressing image...');

    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => (prev >= 90 ? prev : prev + Math.random() * 15));
    }, 800);

    try {
      const imageToUse = await fileToBase64(uploadedImage);
      
      setLoadingMessage('Compressing image...');
      
      const base64ToBlob = (base64: string) => {
        const arr = base64.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) { u8arr[n] = bstr.charCodeAt(n); }
        return new Blob([u8arr], { type: mime });
      };
      
      let finalBase64 = imageToUse;
      const blob = base64ToBlob(imageToUse);
      if (blob.size > 500 * 1024) {
        const file = new File([blob], 'image.png', { type: 'image/png' });
        const compressedBlob = await imageCompression(file, {
          maxSizeMB: 3,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
          initialQuality: 0.8,
        });
        finalBase64 = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(compressedBlob);
        });
      }
      
      const stylePrompt = buildPrompt();
      setLoadingMessage('Applying style & lighting...');

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: finalBase64,
          prompt: stylePrompt,
          spaceType: selectedSpace,
          count: generateCount,
          customRequest,
          expertMode,
        })
      });

      clearInterval(progressInterval);
      setLoadingProgress(100);

      const data = await response.json();
      if (data.success && data.imageBase64) {
        consumeCreditsByTier(perImageCost, generateCount);
        setRemainingCredits(getRemainingFreeCredits() + getPaidCredits());
        saveToHistory(stylePrompt, data.imageBase64);
        
        if (newTab) {
          newTab.postMessage({
            type: 'GENERATION_RESULT',
            taskId: taskId,
            imageBase64: data.imageBase64,
            originalImageBase64: imageToUse,
            prompt: stylePrompt,
            count: generateCount,
          }, window.location.origin);
        } else {
          alert('Please allow pop-ups for this site to see the result.');
        }
      } else {
        alert('Generation failed. Please try again.');
        if (newTab) newTab.close();
      }
    } catch (error) {
      clearInterval(progressInterval);
      console.error('Generation failed', error);
      alert('Network error. Please check your connection.');
      if (newTab) newTab.close();
    } finally {
      setLoading(false);
      setLoadingProgress(0);
      setLoadingMessage('');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleUpload(file);
  };

  const handleDragOver = (e: React.DragEvent) => e.preventDefault();
  const triggerFileInput = () => fileInputRef.current?.click();

  const wordCount = customRequest.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isLongText = wordCount > 100;

  let perImageCost = 1;
  if (isLongText) perImageCost = 2;
  const totalCost = perImageCost * generateCount;
  const canUseFreeCredit = perImageCost === 1 && getRemainingFreeCredits() > 0;

  let priceBarText = '', priceBarColor = '';
  if (isLongText) {
    priceBarText = `⚠ Cost: 2 credits/image (long text request)`;
    priceBarColor = '#FFF3E0';
  } else {
    priceBarText = `✅ Cost: 1 credit/image | ${canUseFreeCredit ? '1 free daily credit available' : 'no free credit left'}`;
    priceBarColor = '#E8F5E9';
  }
  if (generateCount > 1) {
    priceBarText = `⚠ Total Cost: ${totalCost} credits (${perImageCost} credit${perImageCost > 1 ? 's' : ''}/image × ${generateCount})`;
  }

  const wordDisplay = (
    <span>
      Word count: <span style={{ color: isLongText ? '#E67E22' : 'inherit' }}>{wordCount}</span>/{wordCount > 100 ? <span style={{ color: '#E67E22' }}>100</span> : '100'}
    </span>
  );

  const handleQuickTag = (tag: string) => {
    setCustomRequest(prev => prev.trim() ? `${prev} ${tag}` : tag);
  };

  if (!isClient) {
    return <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)', backgroundColor: '#FDF6F0' }}>Loading...</div>;
  }
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)', backgroundColor: '#FDF6F0', fontSize: '14px' }}>
      <div className="studio-main-panel" style={{ 
        width: '400px', 
        padding: '12px 16px', 
        borderRight: '1px solid rgba(0,0,0,0.05)', 
        background: 'rgba(255,255,255,0.6)', 
        backdropFilter: 'blur(8px)', 
        overflowY: 'auto',
        boxSizing: 'border-box'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <span style={{ background: '#E67E22', color: 'white', padding: '2px 10px', borderRadius: '40px', fontSize: '13px', fontWeight: 500 }}>{remainingCredits} credits left</span>
          <DailyCreditTimer />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, color: '#2C2C2C', fontSize: '15px' }}>🏠 Space Type</label>
          <select value={selectedSpace} onChange={(e) => setSelectedSpace(e.target.value)} style={{ width: '100%', padding: '6px 8px', borderRadius: '12px', border: '1px solid #E0D6CC', fontSize: '14px' }}>
            {SPACE_TYPES.map(space => <option key={space.id} value={space.id}>{space.icon} {space.name}</option>)}
          </select>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, color: '#2C2C2C', fontSize: '15px' }}>🎨 Style</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {STYLES.map(style => (
              <button key={style.id} onClick={() => setSelectedStyle(style.id)} style={{
                padding: '6px 8px', borderRadius: '40px', border: 'none',
                backgroundColor: selectedStyle === style.id ? '#E67E22' : '#F0EDE8',
                color: selectedStyle === style.id ? 'white' : '#2C2C2C',
                cursor: 'pointer', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left',
              }} title={style.name}>
                <span style={{ display: 'inline' }}>{style.icon} {style.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, color: '#2C2C2C', fontSize: '15px' }}>✨ Vibe / Feeling</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
            {FEELINGS.map(feeling => (
              <button key={feeling.id} onClick={() => setSelectedFeeling(feeling.id)} style={{
                padding: '6px 8px', borderRadius: '40px', border: 'none',
                backgroundColor: selectedFeeling === feeling.id ? '#E67E22' : '#F0EDE8',
                color: selectedFeeling === feeling.id ? 'white' : '#2C2C2C',
                cursor: 'pointer', fontSize: '14px', fontWeight: 500, transition: 'all 0.2s',
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', textAlign: 'left',
              }} title={feeling.name}>
                <span style={{ display: 'inline' }}>{feeling.name}</span>
              </button>
            ))}
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500, color: '#2C2C2C', fontSize: '15px' }}>
              <input type="checkbox" checked={expertMode} onChange={(e) => setExpertMode(e.target.checked)} style={{ width: '14px', height: '14px' }} />
              ✨ Expert Mode (No Extra Cost)
            </label>
            <span style={{ cursor: 'pointer', color: '#9D9D9D', fontSize: '13px' }} title="Higher quality, no extra cost">ⓘ</span>
          </div>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, color: '#2C2C2C', fontSize: '15px' }}>✏️ Additional Requests (optional)</label>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
            <textarea rows={2} placeholder="Enter simple details (100 words max for 1 credit | Longer text = 2 credits)" value={customRequest} onChange={(e) => setCustomRequest(e.target.value)}
              style={{ width: '100%', padding: '6px 8px', borderRadius: '12px', border: '1px solid #E0D6CC', resize: 'vertical', fontSize: '14px' }} />
            <button onClick={enhancePrompt} disabled={isEnhancing} style={{ background: '#F0EDE8', border: 'none', borderRadius: '40px', padding: '8px 12px', cursor: 'pointer', fontSize: '16px', transition: 'background 0.2s', flexShrink: 0 }}
              title="Enhance with AI" onMouseEnter={(e) => e.currentTarget.style.background = '#E67E22'} onMouseLeave={(e) => e.currentTarget.style.background = '#F0EDE8'}>
              {isEnhancing ? '✨...' : '✨'}
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginTop: '6px' }}>
            <button onClick={() => handleQuickTag('cream linen sofa with relaxed shape')} style={{ background: '#F9F3EC', border: 'none', borderRadius: '40px', padding: '4px 6px', fontSize: '13px', color: '#5A4A3A', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🛋️ sofa</button>
            <button onClick={() => handleQuickTag('warm paper pendant light')} style={{ background: '#F9F3EC', border: 'none', borderRadius: '40px', padding: '4px 6px', fontSize: '13px', color: '#5A4A3A', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>💡 light</button>
            <button onClick={() => handleQuickTag('solid warm beige wool rug')} style={{ background: '#F9F3EC', border: 'none', borderRadius: '40px', padding: '4px 6px', fontSize: '13px', color: '#5A4A3A', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🧶 rug</button>
            <button onClick={() => handleQuickTag('oak wood chair with curved backrest')} style={{ background: '#F9F3EC', border: 'none', borderRadius: '40px', padding: '4px 6px', fontSize: '13px', color: '#5A4A3A', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🪑 chair</button>
            <button onClick={() => handleQuickTag('a large potted plant in the corner')} style={{ background: '#F9F3EC', border: 'none', borderRadius: '40px', padding: '4px 6px', fontSize: '13px', color: '#5A4A3A', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🪴 plant</button>
            <button onClick={() => handleQuickTag('warm beige walls with subtle texture')} style={{ background: '#F9F3EC', border: 'none', borderRadius: '40px', padding: '4px 6px', fontSize: '13px', color: '#5A4A3A', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>🎨 walls</button>
          </div>
          <div style={{ marginTop: '6px', fontSize: '12px', color: '#8C7A6B' }}>
            💡 Describe specific changes, e.g., "cream linen sofa", "paper pendant light".
          </div>
          <div style={{ marginTop: '2px', fontSize: '14px', textAlign: 'right', color: '#9D9D9D' }}>{wordDisplay}</div>
          {isLongText && (
            <div style={{ marginTop: '4px', padding: '4px 8px', backgroundColor: '#FFF3E0', borderRadius: '10px', fontSize: '14px', color: '#E67E22' }}>
              ⚠ Your request exceeds 100 words → 2 credits/image
            </div>
          )}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ display: 'block', marginBottom: '4px', fontWeight: 500, color: '#2C2C2C', fontSize: '15px' }}>🔢 Number of designs</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 4].map(num => (
              <button key={num} onClick={() => setGenerateCount(num)} style={{ padding: '4px 14px', borderRadius: '40px', border: generateCount === num ? '2px solid #E67E22' : '1px solid #E0D6CC', backgroundColor: generateCount === num ? '#E67E22' : 'white', color: generateCount === num ? 'white' : '#2C2C2C', cursor: 'pointer', fontWeight: 500, fontSize: '14px' }}>{num}</button>
            ))}
          </div>
          <div style={{ marginTop: '3px', fontSize: '13px', color: '#9D9D9D', textAlign: 'center' }}>Total Cost = per image credit × quantity</div>
        </div>
        <div style={{ marginBottom: '12px', padding: '8px', backgroundColor: priceBarColor, borderRadius: '12px', textAlign: 'center', fontWeight: 500, fontSize: '15px' }}>{priceBarText}</div>
        <button onClick={generate} disabled={loading} style={{ width: '100%', padding: '10px', fontSize: '16px', background: 'linear-gradient(135deg, #E67E22, #D35400)', color: 'white', border: 'none', borderRadius: '40px', cursor: loading ? 'not-allowed' : 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', fontWeight: 600 }}
          onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.1)'; } }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}>
          {loading ? 'Generating...' : `Generate (${totalCost} credit${totalCost !== 1 ? 's' : ''})`}
        </button>
        {loading && (
          <div style={{ marginTop: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '4px', color: '#5A4A3A' }}>
              <span>{loadingMessage}</span>
              <span>{Math.round(loadingProgress)}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', backgroundColor: '#F0EDE8', borderRadius: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${loadingProgress}%`, height: '100%', background: 'linear-gradient(90deg, #E67E22, #F39C12)', borderRadius: '10px', transition: 'width 0.3s ease' }} />
            </div>
          </div>
        )}
      </div>
      <div className="studio-preview" style={{ flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', background: 'rgba(253,246,240,0.4)' }}>
        {showGuideCard && <GuideCard onClose={handleCloseGuide} />}
        <div style={{ width: '100%', maxWidth: '560px', position: 'relative' }}>
          <button onClick={() => router.push('/history')} title="View generation history" style={{
            position: 'absolute', top: '-12px', right: '-12px', background: 'linear-gradient(135deg, #E67E22, #F39C12)',
            color: 'white', border: 'none', borderRadius: '40px', padding: '10px 18px', fontSize: '14px', fontWeight: 600,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 0 16px rgba(230, 126, 34, 0.5), 0 4px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s, box-shadow 0.2s', zIndex: 10,
          }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 0 24px rgba(230, 126, 34, 0.7), 0 6px 12px rgba(0,0,0,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 0 16px rgba(230, 126, 34, 0.5), 0 4px 8px rgba(0,0,0,0.1)'; }}
          >🌟 History</button>
          <div onDrop={handleDrop} onDragOver={handleDragOver} onClick={triggerFileInput} style={{
            width: '100%', aspectRatio: '5/4', background: 'white', borderRadius: '20px', border: '2px dashed #E0D6CC',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'border 0.2s', overflow: 'hidden', flexDirection: 'column'
          }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#E67E22'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#E0D6CC'}>
            <input type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])} style={{ display: 'none' }} ref={fileInputRef} />
            {previewUrl ? (
              < img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'contain', backgroundColor: '#FDF6F0' }} />
            ) : (
              <div style={{ textAlign: 'center', padding: '12px' }}>
                <div style={{ fontSize: '48px', marginBottom: '8px' }}>📸</div>
                <p style={{ fontSize: '15px', fontWeight: 500, color: '#2C2C2C' }}>Upload your room photo</p >
                <p style={{ fontSize: '13px', color: '#9D9D9D' }}>Click or drag & drop (JPG, PNG)</p >
                <div style={{ marginTop: '12px', padding: '8px 12px', backgroundColor: '#F9F3EC', borderRadius: '12px', textAlign: 'left', fontSize: '12px', color: '#5A4A3A' }}>
                  <strong>📷 For best results:</strong><br />
                  • Face the main wall<br />• Keep camera at eye level<br />• Ensure bright, natural light<br />• Avoid clutter<br />• Only upload images you own or have permission to use.
                </div>
              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop: '10px', padding: '6px 10px', backgroundColor: '#F9F3EC', borderRadius: '12px', fontSize: '14px', color: '#5A4A3A', textAlign: 'center', maxWidth: '560px' }}>
          <strong>Two ways to generate your room design</strong><br />
          1. Upload your room photo → Choose space/style/vibe<br />
          2. Upload white background → Type custom request
        </div>
      </div>
      {showPayModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div className="card" style={{ maxWidth: '400px', textAlign: 'center', padding: '24px', borderRadius: '20px' }}>
            <h2 style={{ marginBottom: '16px' }}>Out of Credits 🎨</h2>
            <p style={{ marginBottom: '24px' }}>You've used all your free and paid credits. Get more credits to continue creating.</p >
            <button className="btn-primary" onClick={() => router.push('/pricing')}>Buy Credits</button>
            <button onClick={() => setShowPayModal(false)} style={{ marginTop: '16px', background: 'none', border: 'none', color: '#5A4A3A', cursor: 'pointer' }}>Maybe later</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Studio() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', minHeight: 'calc(100vh - 120px)', backgroundColor: '#FDF6F0', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <StudioContent />
    </Suspense>
  );
}