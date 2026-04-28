"use client";

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const galleryImages = [
  { src: '/gallery-1.PNG', title: 'Maximalist Home Office', style: 'Eclectic', type: 'Indoor' },
  { src: '/gallery-2.png', title: 'Bohemian Living Room', style: 'Bohemian', type: 'Indoor' },
  { src: '/gallery-3.png', title: 'Mediterranean Terrace', style: 'Coastal', type: 'Outdoor' },
  { src: '/gallery-4.png', title: 'Modern Pool Area', style: 'Modern', type: 'Outdoor' },
  { src: '/gallery-5.png', title: 'Industrial Cafe', style: 'Industrial', type: 'Commercial' },
  { src: '/gallery-6.png', title: 'Home Gym', style: 'Modern', type: 'Indoor' },
];

export default function Gallery() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [styleFilter, setStyleFilter] = useState<string>('All');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [likedImages, setLikedImages] = useState<string[]>([]);

  // 从 localStorage 加载点赞数据
  useEffect(() => {
    const stored = localStorage.getItem('gallery_likes');
    if (stored) {
      try {
        setLikedImages(JSON.parse(stored));
      } catch {}
    }
  }, []);

  // 切换点赞状态
  const toggleLike = (src: string, e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止触发卡片点击放大
    const newLikes = likedImages.includes(src)
      ? likedImages.filter(s => s !== src)
      : [...likedImages, src];
    setLikedImages(newLikes);
    localStorage.setItem('gallery_likes', JSON.stringify(newLikes));
  };

  // 提取所有独特的风格和类型用于筛选下拉
  const allStyles = useMemo(() => ['All', ...Array.from(new Set(galleryImages.map(img => img.style)))], []);
  const allTypes = useMemo(() => ['All', ...Array.from(new Set(galleryImages.map(img => img.type)))], []);

  // 根据筛选条件过滤图片
  const filteredImages = useMemo(() => {
    return galleryImages.filter(img => {
      const styleMatch = styleFilter === 'All' || img.style === styleFilter;
      const typeMatch = typeFilter === 'All' || img.type === typeFilter;
      return styleMatch && typeMatch;
    });
  }, [styleFilter, typeFilter]);

  // 跳转到 Studio 并尝试预填风格
  const handleTryStyle = (style: string) => {
    router.push(`/studio?style=${encodeURIComponent(style)}`);
  };

  // 空状态提示
  if (galleryImages.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <p style={{ color: '#E67E22', fontSize: '18px' }}>✨ No inspiration yet. Check back soon.</p >
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '80px 24px' }}>
      <h1
        style={{
          fontSize: 'clamp(32px, 5vw, 48px)',
          textAlign: 'center',
          marginBottom: '16px',
          fontWeight: 700,
          background: 'linear-gradient(135deg, #E67E22, #F39C12)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Inspiration Gallery
      </h1>
      <p
        style={{
          textAlign: 'center',
          color: '#5A4A3A',
          marginBottom: '32px',
          fontSize: '18px',
        }}
      >
        Explore AI-generated designs for indoor, outdoor, and commercial spaces
      </p >

      {/* 筛选器 */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontWeight: 500, color: '#3D3228' }}>🎨 Style:</label>
          <select
            value={styleFilter}
            onChange={(e) => setStyleFilter(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '40px',
              border: '1px solid #E0D6CC',
              backgroundColor: 'white',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {allStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label style={{ fontWeight: 500, color: '#3D3228' }}>🏠 Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            style={{
              padding: '8px 16px',
              borderRadius: '40px',
              border: '1px solid #E0D6CC',
              backgroundColor: 'white',
              fontSize: '14px',
              cursor: 'pointer',
            }}
          >
            {allTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>
      {/* 图片网格 */}
      <div
        className="gallery-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '32px',
        }}
      >
        {filteredImages.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px', color: '#8C7A6B' }}>
            No images match the selected filters.
          </div>
        ) : (
          filteredImages.map((img, idx) => {
            const isLiked = likedImages.includes(img.src);
            return (
              <div
                key={idx}
                className="card"
                style={{
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  borderRadius: '16px',
                  backgroundColor: '#FFFFFF',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
                  position: 'relative',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 24px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
                }}
              >
                {/* 点赞按钮 */}
                <button
                  onClick={(e) => toggleLike(img.src, e)}
                  style={{
                    position: 'absolute',
                    top: '28px',
                    right: '28px',
                    background: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    fontSize: '20px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    transition: 'transform 0.2s ease, background 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                  }}
                >
                  {isLiked ? '❤️' : '🤍'}
                </button>

                <div onClick={() => setSelectedImage(img.src)}>
                  <div style={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
                    <Image
                      src={img.src}
                      alt={img.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      style={{
                        objectFit: 'cover',
                        borderRadius: '16px',
                        backgroundColor: '#F5F0EB',
                        filter: 'brightness(1.02) sepia(0.08) hue-rotate(-2deg)',
                      }}
                    />
                  </div>
                  <div style={{ marginTop: '16px', textAlign: 'center' }}>
                    <p
                      style={{
                        fontWeight: 700,
                        marginBottom: '6px',
                        color: '#E67E22',
                        fontSize: '1.1rem',
                      }}
                    >
                      {img.title}
                    </p >
                    <p
                      style={{
                        fontSize: '13px',
                        color: '#5A4A3A',
                        letterSpacing: '0.3px',
                      }}
                    >
                      {img.style} · {img.type}
                    </p >
                  </div>
                </div>

                {/* 一键生成同款风格按钮 */}
                <div style={{ marginTop: '12px', textAlign: 'center' }}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTryStyle(img.style);
                    }}
                    style={{
                      background: 'none',
                      border: '1px solid #E67E22',
                      color: '#E67E22',
                      borderRadius: '40px',
                      padding: '6px 16px',
                      fontSize: '13px',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#E67E22';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#E67E22';
                    }}
                  >
                    Try this style →
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* 放大模态框 */}
      {selectedImage && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.85)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            cursor: 'pointer',
          }}
          onClick={() => setSelectedImage(null)}
        >
          <div style={{ position: 'relative', width: '90%', height: '90%' }}>
            <Image
              src={selectedImage}
              alt="Enlarged"
              fill
              sizes="90vw"
              style={{ objectFit: 'contain', borderRadius: '16px' }}
            />
          </div>
        </div>
      )}

      {/* 移动端适配 */}
      <style jsx>{`
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
          .container {
            padding-left: 16px !important;
            padding-right: 16px !important;
          }
          h1 {
            font-size: 2rem !important;
          }
          .card {
            padding: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}