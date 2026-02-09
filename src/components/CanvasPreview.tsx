import React from 'react';
import { EditorState } from '../presets';

interface CanvasPreviewProps {
  state: EditorState;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

const BrowserFrame: React.FC<{ children: React.ReactNode; borderRadius: number }> = ({ children, borderRadius }) => (
  <div className="flex flex-col overflow-hidden" style={{ borderRadius: borderRadius + 4 }}>
    <div className="flex items-center gap-2 px-4 py-3 bg-[#1e1e2e]" style={{
      borderTopLeftRadius: borderRadius + 4,
      borderTopRightRadius: borderRadius + 4,
    }}>
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
      <div className="flex-1 mx-4">
        <div className="h-6 rounded-md bg-white/10 flex items-center px-3">
          <span className="text-[10px] text-white/30 font-mono">https://</span>
        </div>
      </div>
    </div>
    {children}
  </div>
);

const MacFrame: React.FC<{ children: React.ReactNode; borderRadius: number }> = ({ children, borderRadius }) => (
  <div className="flex flex-col overflow-hidden shadow-2xl" style={{ borderRadius: borderRadius + 4 }}>
    <div className="flex items-center gap-2 px-4 py-2.5 bg-[#e8e8e8]" style={{
      borderTopLeftRadius: borderRadius + 4,
      borderTopRightRadius: borderRadius + 4,
    }}>
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
      </div>
    </div>
    {children}
  </div>
);

const PhoneFrame: React.FC<{ children: React.ReactNode; borderRadius: number }> = ({ children, borderRadius }) => (
  <div className="relative p-2 bg-[#1a1a2e] overflow-hidden" style={{ borderRadius: Math.max(borderRadius, 28) + 8 }}>
    {/* Notch */}
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a2e] rounded-b-2xl z-20" />
    <div className="overflow-hidden" style={{ borderRadius: Math.max(borderRadius, 24) }}>
      {children}
    </div>
    {/* Home indicator */}
    <div className="flex justify-center pt-2 pb-1">
      <div className="w-28 h-1 rounded-full bg-white/30" />
    </div>
  </div>
);

const Watermark: React.FC = () => (
  <div className="absolute bottom-3 right-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-sm">
    <svg width="12" height="12" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#wg)" />
      <defs>
        <linearGradient id="wg" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8B5CF6" />
          <stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
    <span className="text-[10px] font-semibold text-white/70 tracking-wide">SnapFrame</span>
  </div>
);

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ state, canvasRef }) => {
  const { image, background, padding, borderRadius, shadow, shadowColor, frame, watermark } = state;

  if (!image) return null;

  const shadowStyle = shadow > 0
    ? `0 ${shadow}px ${shadow * 2}px ${shadowColor}, 0 ${shadow / 2}px ${shadow}px ${shadowColor.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.5})`)}`
    : 'none';

  const renderImage = () => (
    <img
      src={image}
      alt="Screenshot"
      className="block w-full h-auto"
      style={{
        borderRadius: frame === 'none' ? borderRadius : 0,
        boxShadow: frame === 'none' ? shadowStyle : 'none',
      }}
      draggable={false}
    />
  );

  const renderFramedImage = () => {
    switch (frame) {
      case 'browser':
        return (
          <div style={{ boxShadow: shadowStyle, borderRadius: borderRadius + 4 }}>
            <BrowserFrame borderRadius={borderRadius}>
              {renderImage()}
            </BrowserFrame>
          </div>
        );
      case 'macos':
        return (
          <div style={{ boxShadow: shadowStyle, borderRadius: borderRadius + 4 }}>
            <MacFrame borderRadius={borderRadius}>
              {renderImage()}
            </MacFrame>
          </div>
        );
      case 'phone':
        return (
          <div style={{ boxShadow: shadowStyle, borderRadius: Math.max(borderRadius, 28) + 8 }}>
            <PhoneFrame borderRadius={borderRadius}>
              {renderImage()}
            </PhoneFrame>
          </div>
        );
      default:
        return renderImage();
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        ref={canvasRef}
        className="relative inline-flex items-center justify-center overflow-hidden"
        style={{
          background: background,
          padding: padding,
          maxWidth: '100%',
        }}
      >
        <div style={{ maxWidth: frame === 'phone' ? 320 : '100%' }}>
          {renderFramedImage()}
        </div>

        {watermark && <Watermark />}
      </div>
    </div>
  );
};

export default CanvasPreview;
