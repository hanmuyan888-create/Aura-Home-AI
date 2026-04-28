'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

// 与 Gallery 页面相同的数据源（确保一致性）
const galleryImages = [
  { src: '/gallery-1.PNG', title: 'Maximalist Home Office', style: 'Eclectic', type: 'Indoor', description: 'A vibrant home office with layered textures, bold artwork, and warm ambient lighting. Perfect for creative professionals.' },
  { src: '/gallery-2.png', title: 'Bohemian Living Room', style: 'Bohemian', type: 'Indoor', description: 'Cozy and eclectic living space with macrame wall hangings, layered rugs, and plenty of greenery. A true boho sanctuary.' },
  { src: '/gallery-3.png', title: 'Mediterranean Terrace', style: 'Coastal', type: 'Outdoor', description: 'Sun-drenched terrace with terracotta tiles, white stucco walls, and panoramic sea views. Ideal for al fresco dining.' },
  { src: '/gallery-4.png', title: 'Modern Pool Area', style: 'Modern', type: 'Outdoor', description: 'Sleek infinity pool with minimalist loungers, glass railings, and tropical landscaping. Resort-style living at home.' },
  { src: '/gallery-5.png', title: 'Industrial Cafe', style: 'Industrial', type: 'Commercial', description: 'Exposed brick, polished concrete, and vintage pendant lights create an authentic industrial cafe vibe.' },
  { src: '/gallery-6.png', title: 'Home Gym', style: 'Modern', type: 'Indoor', description: 'Bright and motivating home gym with rubber flooring, mirrored wall, and dedicated yoga corner.' },
];

export default function GalleryDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [image, setImage] = useState<(typeof galleryImages)[0] | null>(null);
  const [liked, setLiked] = useState(false);

  const id = params.id as string;

  useEffect(() => {
    // 根据文件名匹配（从 src 中提取文件名）
    const found = galleryImages.find(img => {
      const filename = img.src.split('/').pop()?.split('.')[0];
      return filename === id;
    });
    if (found) {
      setImage(found);
      // 读取点赞状态
      const likes = localStorage.getItem('gallery_likes');
      if (likes) {
        try {
          const likedList = JSON.parse(likes);
          setLiked(likedList.includes(found.src));
        } catch {}
      }
    }
  }, [id]);

  const toggleLike = () => {
    if (!image) return;
    const likes = localStorage.getItem('gallery_likes');
    let likedList: string[] = likes ? JSON.parse(likes) : [];
    if (liked) {
      likedList = likedList.filter(src => src !== image.src);
    } else {
      likedList.push(image.src);
    }
    localStorage.setItem('gallery_likes', JSON.stringify(likedList));
    setLiked(!liked);
  };

  const handleShare = async () => {
    if (!image) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: `Check out this ${image.style} design by AuraHome AI!`,
          url: window.location.href,
        });
      } catch (err) {
        // 用户取消分享，不做处理
      }
    } else {
      // 降级：复制链接到剪贴板
      navigator.clipboard?.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleTryStyle = () => {
    if (image) {
      router.push(`/studio?style=${encodeURIComponent(image.style)}`);
    }
  };

  if (!image) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: '#E67E22' }}>Loading...</p >
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 返回链接 */}
      <Link href="/gallery" style={{ display: 'inline-block', marginBottom: '24px', color: '#E67E22', textDecoration: 'none' }}>
        ← Back to Gallery
      </Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        {/* 左侧大图 */}
        <div style={{ flex: '2', minWidth: '300px' }}>
          <img
            src={image.src}
            alt={image.title}
            style={{
              width: '100%',
              borderRadius: '24px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
            }}
          />
        </div>

        {/* 右侧信息 */}
        <div style={{ flex: '1', minWidth: '280px' }}>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 36px)', fontWeight: 700, marginBottom: '12px', color: '#2C2C2C' }}>
            {image.title}
          </h1>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
            <span style={{ background: '#F0EDE8', padding: '6px 14px', borderRadius: '40px', fontSize: '14px' }}>
              {image.style}
            </span>
            <span style={{ background: '#F0EDE8', padding: '6px 14px', borderRadius: '40px', fontSize: '14px' }}>
              {image.type}
            </span>
          </div>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#5A4A3A', marginBottom: '32px' }}>
            {image.description}
          </p >

          {/* 操作按钮组 */}
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '32px' }}>
            <button
              onClick={handleTryStyle}
              style={{
                background: '#E67E22',
                color: 'white',
                border: 'none',
                borderRadius: '40px',
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                flex: '1',
              }}
            >
              🎨 Try this style
            </button>
            <button
              onClick={toggleLike}
              style={{
                background: liked ? '#FFE5E5' : '#F0EDE8',
                border: 'none',
                borderRadius: '40px',
                padding: '12px 20px',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              {liked ? '❤️' : '🤍'}
            </button>
            <button
              onClick={handleShare}
              style={{
                background: '#F0EDE8',
                border: 'none',
                borderRadius: '40px',
                padding: '12px 20px',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              📤
            </button>
          </div>

          {/* 设计参数标签（模拟） */}
          <div style={{ borderTop: '1px solid #E6DFD6', paddingTop: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '12px', color: '#3D3228' }}>
              Generation Parameters
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ background: '#F9F3EC', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                Model: Flux Kontext Max
              </span>
              <span style={{ background: '#F9F3EC', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                Guidance: 7.5
              </span>
              <span style={{ background: '#F9F3EC', padding: '4px 12px', borderRadius: '20px', fontSize: '13px' }}>
                Resolution: 1024x1024
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}