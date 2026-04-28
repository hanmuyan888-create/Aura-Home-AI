'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

// 判断用户是否为 Pro 或 Business 套餐（付费积分 ≥ 100）
const isProOrBusiness = (): boolean => {
  if (typeof window === 'undefined') return false;
  const paid = localStorage.getItem('paid_credits');
  if (!paid) return false;
  const credits = parseInt(paid, 10);
  // Pro 套餐至少 100 积分，Business 至少 200 积分
  return credits >= 100;
};

// 将使用 useSearchParams 的逻辑抽离到单独组件，并用 Suspense 包裹
function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isProUser, setIsProUser] = useState(false);

  useEffect(() => {
    // 安全访问 sessionStorage
    const getSessionItem = (key: string) => {
      if (typeof window === 'undefined') return null;
      return sessionStorage.getItem(key);
    };

    const imagesParam = searchParams.get('images');
    if (imagesParam) {
      try {
        const parsed = JSON.parse(decodeURIComponent(imagesParam));
        setGeneratedImages(Array.isArray(parsed) ? parsed : [parsed]);
      } catch {
        const gen = getSessionItem('lastGeneratedImage');
        if (gen) setGeneratedImages([gen]);
      }
    } else {
      const gen = getSessionItem('lastGeneratedImage');
      if (gen) setGeneratedImages([gen]);
    }

    const orig = getSessionItem('lastOriginalImage');
    if (orig) setOriginalImage(orig);

    // 检查用户套餐等级
    setIsProUser(isProOrBusiness());
  }, [searchParams]);

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4K 导出：放大 2 倍
  const export4K = (base64: string, index: number) => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 2;
      canvas.height = img.height * 2;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const highResBase64 = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = highResBase64;
        link.download = `aurahome-4k-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    img.src = base64;
  };

  // 无水印导出：直接下载原图（假设原图无水印，或 API 返回的即为无水印版本）
  const exportNoWatermark = (base64: string, index: number) => {
    const link = document.createElement('a');
    link.href = base64;
    link.download = `aurahome-nowatermark-${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const enhanceAndDownload = (base64: string, index: number) => {
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width * 1.5;
      canvas.height = img.height * 1.5;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const highResBase64 = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.href = highResBase64;
        link.download = `aurahome-hd-${index + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    };
    img.src = base64;
  };

  const batchDownload = () => {
    generatedImages.forEach((img, idx) => {
      setTimeout(() => downloadImage(img, `aura-design-${idx + 1}.png`), idx * 200);
    });
  };

  const batchHDDownload = () => {
    generatedImages.forEach((img, idx) => {
      setTimeout(() => enhanceAndDownload(img, idx), idx * 300);
    });
  };

  const shareImage = async (imageUrl: string) => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        const res = await fetch(imageUrl);
        const blob = await res.blob();
        const file = new File([blob], 'design.png', { type: 'image/png' });
        await navigator.share({
          title: 'AuraHome AI 设计',
          text: '看看我的 AI 室内设计！',
          files: [file]
        });
      } catch {
        alert('分享失败或取消');
      }
    } else {
      alert('当前浏览器不支持分享，请手动保存图片');
    }
  };

  const pinImage = (imageUrl: string) => {
    if (typeof window !== 'undefined') {
      const url = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(window.location.href)}&media=${encodeURIComponent(imageUrl)}&description=AuraHome%20AI%20Design`;
      window.open(url, '_blank');
    }
  };

  const regenerate = () => router.push('/studio');

  if (generatedImages.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">暂无生成结果，请先返回工作室生成设计。</p >
          <button onClick={() => router.push('/studio')} className="mt-4 bg-orange-500 text-white px-6 py-2 rounded-lg">
            去生成
          </button>
        </div>
      </div>
    );
  }

  const currentImage = generatedImages[selectedIndex];
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          你的 AI 设计结果 {generatedImages.length > 1 && `(${generatedImages.length} 张)`}
        </h1>

        {generatedImages.length > 1 && (
          <div className="flex justify-center gap-2 mb-4 overflow-x-auto pb-2">
            {generatedImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedIndex(idx)}
                className={`w-16 h-16 rounded-lg border-2 overflow-hidden ${
                  selectedIndex === idx ? 'border-orange-500' : 'border-transparent'
                }`}
              >
                < img src={img} alt={`缩略图 ${idx + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}

        <div className="bg-white rounded-xl shadow overflow-hidden">
          <div className="relative w-full aspect-square">
            <Image src={currentImage} alt="Generated Design" fill className="object-contain" />
          </div>
          <div className="p-6 border-t">
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => downloadImage(currentImage, `aura-design-${selectedIndex + 1}.png`)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                ⬇️ 下载当前
              </button>
              <button
                onClick={() => enhanceAndDownload(currentImage, selectedIndex)}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
              >
                ⭐ HD 高清导出
              </button>
              {/* 新增：4K 导出（Pro/Business 专属） */}
              {isProUser && (
                <button
                  onClick={() => export4K(currentImage, selectedIndex)}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                >
                  🖼️ 4K 导出
                </button>
              )}
              {/* 新增：无水印导出（Pro/Business 专属） */}
              {isProUser && (
                <button
                  onClick={() => exportNoWatermark(currentImage, selectedIndex)}
                  className="px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700"
                >
                  🚫 无水印导出
                </button>
              )}
              <button onClick={batchDownload} className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
                📦 批量下载 ({generatedImages.length})
              </button>
              <button onClick={batchHDDownload} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                ✨ 批量高清
              </button>
              <button onClick={() => shareImage(currentImage)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                📤 分享
              </button>
              <button onClick={() => pinImage(currentImage)} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                📌 Pin
              </button>
              <button onClick={regenerate} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">
                🔄 重新生成
              </button>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          💡 提示：为了获得更好的效果，建议使用清晰、光线充足的房间照片。AI 可能会创意性调整布局以优化设计。
        </div>
        {/* 新增：AI生成内容免责声明 */}
        <p className="text-center text-xs text-gray-500 mt-4">
          AI designs are for reference only.
        </p >
      </div>
    </div>
  );
}

// 主组件用 Suspense 包裹，确保 useSearchParams 仅在客户端执行
export default function ResultsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">加载中...</div>}>
      <ResultsContent />
    </Suspense>
  );
}