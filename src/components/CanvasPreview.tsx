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

const TerminalFrame: React.FC<{ children: React.ReactNode; borderRadius: number }> = ({ children, borderRadius }) => (
  <div className="flex flex-col overflow-hidden" style={{ borderRadius: borderRadius + 4, background: '#0d1117' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px', background: '#161b22',
      borderTopLeftRadius: borderRadius + 4,
      borderTopRightRadius: borderRadius + 4,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', flexShrink: 0 }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', flexShrink: 0 }} />
      <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', flexShrink: 0 }} />
      <span style={{
        flex: 1, textAlign: 'center',
        fontSize: 11, fontFamily: 'monospace',
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: '0.02em',
      }}>bash — 80×24</span>
    </div>
    {children}
  </div>
);

const ArcFrame: React.FC<{ children: React.ReactNode; borderRadius: number }> = ({ children, borderRadius }) => (
  <div style={{
    display: 'flex', flexDirection: 'column', overflow: 'hidden',
    borderRadius: borderRadius + 6,
    background: 'rgba(240,237,255,0.06)',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.12)',
  }}>
    <div style={{
      padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
      background: 'rgba(255,255,255,0.05)',
      borderTopLeftRadius: borderRadius + 6,
      borderTopRightRadius: borderRadius + 6,
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <div style={{
        flex: 1, height: 24, borderRadius: 8,
        background: 'rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', padding: '0 10px',
      }}>
        <span style={{ fontSize: 10, fontFamily: 'system-ui', color: 'rgba(255,255,255,0.3)' }}>arc://</span>
      </div>
      <div style={{ display: 'flex', gap: 6 }}>
        {['#ff6b6b','#ffd93d','#6bcb77','#4d96ff'].map((c, i) => (
          <div key={i} style={{ width: 14, height: 14, borderRadius: '50%', background: c, opacity: 0.7 }} />
        ))}
      </div>
    </div>
    {children}
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
    case 'circles':
      return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'chevron':
      return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10l20 10L40 10M0 30l20 10L40 30' stroke='rgba(255,255,255,${o})' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
    case 'triangles':
      return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L35 30H5z' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'waves':
      return `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q15 0 30 10 Q45 20 60 10' stroke='rgba(255,255,255,${o})' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
    default:
      return 'none';
  }
}

const CanvasPreview: React.FC<CanvasPreviewProps> = ({ state, canvasRef }) => {
  const {
    image, background, padding, borderRadius, shadow, shadowColor, shadowX,
    frame, watermark, tiltX, tiltY, scale, rotation,
    brightness, contrast, saturation, blur: imgBlur,
    sepia, grayscale, hueRotate, invert,
    borderWidth, borderColor, borderStyle,
    bgPattern, bgPatternOpacity, bgNoise, bgOpacity,
    titleText, titleSize, titleColor, titleFont, titlePosition, titleWeight,
    titleShadow, textAlign, letterSpacing,
    subtitleText, subtitleSize, subtitleColor,
    aspectRatio, reflection, bgImage,
    vignette, flipX,
    glowIntensity, glowColor,
    colorOverlay, colorOverlayOpacity,
    scanlines, filmGrain, bgBlur, innerShadow,
    customBgColor1, customBgColor2, bgAngle,
  } = state;

  if (!image) return null;

  const aspectPreset = ASPECT_PRESETS.find(a => a.id === aspectRatio);
  const canvasStyle: React.CSSProperties = {
    background,
    padding,
    position: 'relative',
    overflow: 'hidden',
    opacity: (bgOpacity ?? 100) < 100 ? undefined : undefined, // bgOpacity affects bg layer, not whole canvas
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

  // Combined shadow: drop shadow + glow + optional inner shadow
  const buildShadow = (includeInner = false) => {
    const parts: string[] = [];
    const sx = shadowX ?? 0;
    if (shadow > 0) {
      parts.push(`${sx}px ${shadow}px ${shadow * 2}px ${shadowColor}`);
      parts.push(`${sx * 0.5}px ${shadow / 2}px ${shadow}px ${shadowColor.replace(/[\d.]+\)$/, (m) => `${parseFloat(m) * 0.5})`)}`);
    }
    if (glowIntensity > 0) {
      parts.push(`0 0 ${Math.round(glowIntensity * 0.5)}px ${glowColor}`);
      parts.push(`0 0 ${glowIntensity}px ${glowColor}`);
    }
    if (includeInner && innerShadow > 0) {
      const opacity = Math.min(innerShadow / 100 * 0.85, 0.75).toFixed(2);
      parts.push(`inset 0 ${Math.round(innerShadow * 0.3)}px ${innerShadow}px rgba(0,0,0,${opacity})`);
    }
    return parts.length > 0 ? parts.join(', ') : 'none';
  };

  const imageFilter = [
    brightness !== 100 ? `brightness(${brightness}%)` : '',
    contrast !== 100 ? `contrast(${contrast}%)` : '',
    saturation !== 100 ? `saturate(${saturation}%)` : '',
    imgBlur > 0 ? `blur(${imgBlur}px)` : '',
    (sepia ?? 0) > 0 ? `sepia(${sepia}%)` : '',
    (grayscale ?? 0) > 0 ? `grayscale(${grayscale}%)` : '',
    (hueRotate ?? 0) !== 0 ? `hue-rotate(${hueRotate}deg)` : '',
    invert ? 'invert(100%)' : '',
  ].filter(Boolean).join(' ') || undefined;

  const transformParts: string[] = [];
  if (flipX) transformParts.push('scaleX(-1)');
  if (tiltX !== 0 || tiltY !== 0) {
    transformParts.push(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
  }
  if (scale !== 1) transformParts.push(`scale(${scale})`);
  if (rotation !== 0) transformParts.push(`rotate(${rotation}deg)`);
  const imageTransform = transformParts.length > 0 ? transformParts.join(' ') : undefined;

  const useGradientBorder = borderStyle === 'gradient' && borderWidth > 0;
  const regularBorder = (borderWidth > 0 && !useGradientBorder)
    ? `${borderWidth}px ${borderStyle} ${borderColor}`
    : undefined;

  // Border radius of the outermost image wrapper depending on frame type
  const frameBR = frame === 'phone'
    ? Math.max(borderRadius, 28) + 8
    : frame === 'arc' ? borderRadius + 6
    : frame !== 'none' ? borderRadius + 4 : borderRadius;

  // Raw image element (no shadow — that goes on the wrapper)
  const renderImageEl = () => (
    <img
      src={image}
      alt="Screenshot"
      className="block w-full h-auto"
      style={{
        borderRadius: frame === 'none' ? borderRadius : 0,
        filter: imageFilter,
      }}
      draggable={false}
    />
  );

  // Frame shell (no shadow/border — caller adds those)
  const renderFrameShell = () => {
    switch (frame) {
      case 'browser':  return <BrowserFrame borderRadius={borderRadius}>{renderImageEl()}</BrowserFrame>;
      case 'macos':    return <MacFrame borderRadius={borderRadius}>{renderImageEl()}</MacFrame>;
      case 'phone':    return <PhoneFrame borderRadius={borderRadius}>{renderImageEl()}</PhoneFrame>;
      case 'terminal': return <TerminalFrame borderRadius={borderRadius}>{renderImageEl()}</TerminalFrame>;
      case 'arc':      return <ArcFrame borderRadius={borderRadius}>{renderImageEl()}</ArcFrame>;
      default:         return renderImageEl();
    }
  };

  // Color overlay element (sits atop the image/frame)
  const colorOverlayEl = colorOverlayOpacity > 0 ? (
    <div
      style={{
        position: 'absolute', inset: 0,
        background: colorOverlay,
        opacity: colorOverlayOpacity / 100,
        borderRadius: frameBR,
        pointerEvents: 'none',
        zIndex: 10,
        mixBlendMode: 'color',
      }}
    />
  ) : null;

  // Full image render: frame + borders + shadows + color overlay
  const renderFinalImage = () => {
    const shell = renderFrameShell();

    // ── Gradient border path ──
    if (useGradientBorder) {
      return (
        <div style={{
          padding: borderWidth,
          background: `linear-gradient(${bgAngle}deg, ${customBgColor1}, ${customBgColor2})`,
          borderRadius: frameBR + borderWidth,
          boxShadow: buildShadow(false),
          display: 'inline-flex',
          position: 'relative',
        }}>
          <div style={{ borderRadius: frameBR, overflow: 'hidden', position: 'relative', display: 'inline-flex' }}>
            {shell}
            {colorOverlayEl}
          </div>
        </div>
      );
    }

    // ── Framed (browser/mac/phone/terminal/arc) ──
    if (frame !== 'none') {
      return (
        <div style={{
          boxShadow: buildShadow(false),
          borderRadius: frameBR,
          border: regularBorder,
          display: 'inline-flex',
          position: 'relative',
        }}>
          {shell}
          {colorOverlayEl}
        </div>
      );
    }

    // ── Plain image (no frame) ──
    return (
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <img
          src={image}
          alt="Screenshot"
          className="block w-full h-auto"
          style={{
            borderRadius,
            boxShadow: buildShadow(true), // includes inner shadow
            filter: imageFilter,
            border: regularBorder,
          }}
          draggable={false}
        />
        {colorOverlayEl}
      </div>
    );
  };

  const patternBg = bgPattern !== 'none' ? getPatternSvg(bgPattern, bgPatternOpacity) : undefined;

  const textAlignVal = (textAlign ?? 'center') as 'left' | 'center' | 'right';
  const letterSpacingVal = (letterSpacing ?? 0);

  const renderTitle = (position: string) => {
    if (!titleText || titlePosition !== position) return null;
    const textShadowVal = titleShadow ? '0 2px 20px rgba(0,0,0,0.6), 0 0 40px rgba(0,0,0,0.4)' : (position === 'center' ? '0 2px 20px rgba(0,0,0,0.5)' : undefined);
    return (
      <div className="relative z-[2]" style={{
        width: '100%',
        paddingTop: position === 'below' ? 16 : 0,
        paddingBottom: position === 'above' ? 16 : 0,
        textAlign: textAlignVal,
      }}>
        <div style={{
          fontSize: titleSize,
          color: titleColor,
          fontFamily: titleFont,
          fontWeight: titleWeight === 'normal' ? 400 : 700,
          lineHeight: 1.3,
          letterSpacing: letterSpacingVal > 0 ? `${letterSpacingVal}px` : undefined,
          textShadow: textShadowVal,
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
            letterSpacing: letterSpacingVal > 0 ? `${Math.round(letterSpacingVal * 0.5)}px` : undefined,
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
        {/* Background color opacity overlay (when bgOpacity < 100) */}
        {(bgOpacity ?? 100) < 100 && (
          <div className="absolute inset-0 pointer-events-none z-0"
            style={{ background, opacity: (bgOpacity ?? 100) / 100 }} />
        )}

        {/* Background image */}
        {bgImage && (
          <img
            src={bgImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
            style={{
              filter: bgBlur > 0 ? `blur(${bgBlur}px)` : undefined,
              transform: bgBlur > 0 ? 'scale(1.08)' : undefined,
              opacity: (bgOpacity ?? 100) / 100,
            }}
            draggable={false}
          />
        )}

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
          {renderFinalImage()}

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
              {renderFrameShell()}
            </div>
          )}
        </div>

        {/* Title center overlay */}
        {titleText && titlePosition === 'center' && (
          <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none"
            style={{ textAlign: textAlignVal, padding: '0 24px' }}>
            {renderTitle('center')}
          </div>
        )}

        {/* Title below */}
        {renderTitle('below')}

        {/* Vignette */}
        {vignette > 0 && (
          <div
            className="absolute inset-0 pointer-events-none z-[20]"
            style={{
              background: `radial-gradient(ellipse at center, transparent ${Math.max(0, 70 - vignette * 0.5)}%, rgba(0,0,0,${(vignette / 100) * 0.85}) 100%)`,
            }}
          />
        )}

        {/* Scanlines */}
        {scanlines > 0 && (
          <div
            className="absolute inset-0 pointer-events-none z-[21]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)}) 0px, rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)}) 1px, transparent 1px, transparent 4px)`,
            }}
          />
        )}

        {/* Film grain */}
        {(filmGrain ?? 0) > 0 && (
          <div
            className="absolute inset-0 pointer-events-none z-[22]"
            style={{
              opacity: (filmGrain ?? 0) / 100 * 0.6,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23grain)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '180px 180px',
              mixBlendMode: 'overlay',
            }}
          />
        )}

        {watermark && <Watermark />}
      </div>
    </div>
  );
};

export default CanvasPreview;
