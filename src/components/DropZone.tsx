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
      className={`
        relative flex flex-col items-center justify-center
        w-full max-w-2xl mx-auto
        border-2 border-dashed rounded-2xl
        transition-all duration-300 cursor-pointer
        min-h-[340px]
        ${isDragging
          ? 'border-brand-500 bg-brand-500/10 scale-[1.02]'
          : 'border-white/20 hover:border-white/40 bg-white/[0.02] hover:bg-white/[0.04]'
        }
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onPaste={handlePaste}
      onClick={() => fileInputRef.current?.click()}
      tabIndex={0}
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

      <div className={`
        w-20 h-20 rounded-2xl flex items-center justify-center mb-6
        transition-all duration-300
        ${isDragging
          ? 'bg-brand-500/20 scale-110'
          : 'bg-white/5'
        }
      `}>
        {isDragging ? (
          <ImageIcon className="w-10 h-10 text-brand-400" />
        ) : (
          <Upload className="w-10 h-10 text-white/40" />
        )}
      </div>

      <h3 className="text-xl font-semibold text-white/90 mb-2">
        {isDragging ? 'Drop your image here' : 'Drop image or click to upload'}
      </h3>
      <p className="text-sm text-white/40 mb-4">
        PNG, JPG, WebP — or paste from clipboard (Ctrl+V)
      </p>

      <div className="flex items-center gap-3 text-xs text-white/30">
        <kbd className="px-2 py-1 rounded bg-white/10 font-mono">Ctrl+V</kbd>
        <span>to paste from clipboard</span>
      </div>

      {/* Decorative glow */}
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-brand-500/20 via-pink-500/20 to-brand-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />
    </div>
  );
};

export default DropZone;
