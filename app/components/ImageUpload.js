import { useState } from 'react';
import imageCompression from 'browser-image-compression';

export default function ImageUpload({ onUpload }) {
  const [preview, setPreview] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const options = { maxSizeMB: 1, maxWidthOrHeight: 1024 };
      const compressedFile = await imageCompression(file, options);
      const previewUrl = URL.createObjectURL(compressedFile);
      setPreview(previewUrl);
      if (onUpload) onUpload(compressedFile);
    } catch (error) {
      console.error('压缩失败', error);
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {preview && < img src={preview} alt="预览" style={{ maxWidth: '100%', marginTop: '10px' }} />}
    </div>
  );
}