import React from 'react';
import { EditorState, ASPECT_PRESETS } from '../presets';

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
    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#1a1a2e] rounded-b-2xl z-20" />
    <div className="overflow-hidden" style={{ borderRadius: Math.max(borderRadius, 24) }}>
      {children}
    </div>
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

function getPatternSvg(pattern: string, opacity: number): string {
  const o = opacity;
  switch (pattern) {
    case 'dots':
      return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='rgba(255,255,255,${o})'/%3E%3C/svg%3E")`;
    case 'grid':
      return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'lines':
      return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='40' x2='40' y2='40' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'cross':
      return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'diagonal':
      return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    default:
      return 'none';
  }
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ state, canvasRef }) => {
  const {
    image, background, padding, borderRadius, shadow, shadowColor,
    frame, watermark, tiltX, tiltY, scale, rotation,
    brightness, contrast, saturation, blur: imgBlur,
    borderWidth, borderColor, bgPattern, bgPatternOpacity, bgNoise,
    titleText, titleSize, titleColor, titleFont, titlePosition,
    subtitleText, subtitleSize, subtitleColor,
    aspectRatio, reflection,
  } = state;

  if (!image) return null;

  const aspectPreset = ASPECT_PRESETS.find(a => a.id === aspectRatio);
  const canvasStyle: React.CSSProperties = {
    background,
    padding,
    position: 'relative',
    overflow: 'hidden',
  };

  if (aspectPreset && aspectPreset.id !== 'auto') {
    canvasStyle.width = '100%';
    canvasStyle.maxWidth = Math.min(aspectPreset.width, 900);
    canvasStyle.aspectRatio = `${aspectPreset.width} / ${aspectPreset.height}`;
    canvasStyle.display = 'flex';
    canvasStyle.flexDirection = 'column';
    canvasStyle.alignItems = 'center';
    canvasStyle.justifyContent = 'center';
  }

  const shadowStyle = shadow > 0
    ? `0 ${shadow}px ${shadow * 2}px ${shadowColor}, 0 ${shadow / 2}px ${shadow}px ${shadowColor.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.5})`)}`
    : 'none';

  const imageFilter = [
    brightness !== 100 ? `brightness(${brightness}%)` : '',
    contrast !== 100 ? `contrast(${contrast}%)` : '',
    saturation !== 100 ? `saturate(${saturation}%)` : '',
    imgBlur > 0 ? `blur(${imgBlur}px)` : '',
  ].filter(Boolean).join(' ') || undefined;

  const transformParts: string[] = [];
  if (tiltX !== 0 || tiltY !== 0) {
    transformParts.push(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
  }
  if (scale !== 1) transformParts.push(`scale(${scale})`);
  if (rotation !== 0) transformParts.push(`rotate(${rotation}deg)`);
  const imageTransform = transformParts.length > 0 ? transformParts.join(' ') : undefined;

  const imageBorder = borderWidth > 0 ? `${borderWidth}px solid ${borderColor}` : undefined;

  const renderImage = () => (
    <img
      src={image}
      alt="Screenshot"
      className="block w-full h-auto"
      style={{
        borderRadius: frame === 'none' ? borderRadius : 0,
        boxShadow: frame === 'none' ? shadowStyle : 'none',
        filter: imageFilter,
        border: frame === 'none' ? imageBorder : undefined,
      }}
      draggable={false}
    />
  );

  const renderFramedImage = () => {
    const wrapperShadow: React.CSSProperties = {
      boxShadow: shadowStyle,
      borderRadius: frame === 'phone' ? Math.max(borderRadius, 28) + 8 : borderRadius + 4,
      border: imageBorder,
    };

    switch (frame) {
      case 'browser':
        return <div style={wrapperShadow}><BrowserFrame borderRadius={borderRadius}>{renderImage()}</BrowserFrame></div>;
      case 'macos':
        return <div style={wrapperShadow}><MacFrame borderRadius={borderRadius}>{renderImage()}</MacFrame></div>;
      case 'phone':
        return <div style={{ boxShadow: shadowStyle }}><PhoneFrame borderRadius={borderRadius}>{renderImage()}</PhoneFrame></div>;
      default:
        return renderImage();
    }
  };

  const patternBg = bgPattern !== 'none' ? getPatternSvg(bgPattern, bgPatternOpacity) : undefined;

  const renderTitle = (position: string) => {
    if (!titleText || titlePosition !== position) return null;
    return (
      <div className="relative z-[2] text-center" style={{
        width: '100%',
        paddingTop: position === 'below' ? 16 : 0,
        paddingBottom: position === 'above' ? 16 : 0,
      }}>
        <div style={{
          fontSize: titleSize,
          color: titleColor,
          fontFamily: titleFont,
          fontWeight: 700,
          lineHeight: 1.3,
          textShadow: position === 'center' ? '0 2px 20px rgba(0,0,0,0.5)' : undefined,
        }}>
          {titleText}
        </div>
        {subtitleText && (
          <div style={{
            fontSize: subtitleSize,
            color: subtitleColor,
            fontFamily: titleFont,
            fontWeight: 400,
            marginTop: 6,
            textShadow: position === 'center' ? '0 2px 10px rgba(0,0,0,0.5)' : undefined,
          }}>
            {subtitleText}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div
        ref={canvasRef}
        className="relative inline-flex flex-col items-center justify-center"
        style={canvasStyle}
      >
        {/* Pattern overlay */}
        {patternBg && (
          <div className="absolute inset-0 pointer-events-none z-[1]"
            style={{ backgroundImage: patternBg, backgroundRepeat: 'repeat' }} />
        )}

        {/* Noise overlay */}
        {bgNoise > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[1]"
            style={{
              opacity: bgNoise / 100,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }} />
        )}

        {/* Title above */}
        {renderTitle('above')}

        {/* Image with transforms */}
        <div className="relative z-[2]" style={{
          transform: imageTransform,
          transition: 'transform 0.3s ease',
          maxWidth: frame === 'phone' ? 320 : '100%',
        }}>
          {renderFramedImage()}

          {/* Reflection */}
          {reflection && (
            <div className="pointer-events-none overflow-hidden" style={{
              transform: 'scaleY(-1)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 60%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 60%)',
              maxHeight: 120,
              marginTop: 2,
              opacity: 0.4,
            }}>
              {renderFramedImage()}
            </div>
          )}
        </div>

        {/* Title center overlay */}
        {titleText && titlePosition === 'center' && (
          <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none">
            {renderTitle('center')}
          </div>
        )}

        {/* Title below */}
        {renderTitle('below')}

        {watermark && <Watermark />}
      </div>
    </div>
  );
};

export default CanvasPreview;
