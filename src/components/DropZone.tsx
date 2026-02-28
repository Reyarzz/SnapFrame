import React, { useCallback, useState, useRef } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';

interface DropZoneProps {
  onImageLoad: (dataUrl: string, fileName: string) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onImageLoad }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onImageLoad(e.target.result as string, file.name);
      }
    };
    reader.readAsDataURL(file);
  }, [onImageLoad]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.startsWith('image/')) {
        const file = items[i].getAsFile();
        if (file) handleFile(file);
        break;
      }
    }
  }, [handleFile]);

  return (
    <div
      className="relative flex flex-col items-center justify-center w-full mx-auto cursor-pointer transition-all duration-200"
      style={{
        minHeight: '320px',
        borderRadius: '12px',
        border: isDragging
          ? '1.5px dashed rgba(124,58,237,0.60)'
          : '1.5px dashed rgba(255,255,255,0.10)',
        background: isDragging
          ? 'rgba(124,58,237,0.06)'
          : 'rgba(255,255,255,0.015)',
        transform: isDragging ? 'scale(1.01)' : 'scale(1)',
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onPaste={handlePaste}
      onClick={() => fileInputRef.current?.click()}
      tabIndex={0}
      onMouseEnter={e => {
        if (!isDragging) {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.18)';
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.025)';
        }
      }}
      onMouseLeave={e => {
        if (!isDragging) {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.10)';
          (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.015)';
        }
      }}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
      />

      <div className="flex flex-col items-center gap-5 px-8 py-12 select-none">
        <div
          className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-200"
          style={{
            background: isDragging ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
          {isDragging
            ? <ImageIcon className="w-7 h-7" style={{ color: '#a78bfa' }} />
            : <Upload className="w-7 h-7" style={{ color: 'rgba(228,228,231,0.35)' }} />}
        </div>

        <div className="text-center">
          <p className="text-[15px] font-semibold mb-1.5" style={{ color: isDragging ? '#c4b5fd' : 'rgba(228,228,231,0.75)' }}>
            {isDragging ? 'Drop to open' : 'Drop image here'}
          </p>
          <p className="text-[12px]" style={{ color: 'rgba(228,228,231,0.30)' }}>
            PNG, JPG, WebP — or click to browse
          </p>
        </div>

        <div className="flex items-center gap-2" style={{ color: 'rgba(228,228,231,0.22)' }}>
          <kbd className="px-2 py-0.5 rounded text-[10px] font-mono"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.09)' }}>
            Ctrl+V
          </kbd>
          <span className="text-[11px]">paste from clipboard</span>
        </div>
      </div>
    </div>
  );
};

export default DropZone;
