import React, { useState } from 'react';
import { EditorState, ASPECT_PRESETS } from '../presets';

interface CanvasPreviewProps {
  state: EditorState;
  canvasRef: React.RefObject<HTMLDivElement | null>;
}

/* ── Frame components ───────────────────────────── */

const BrowserFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 14px', background: '#1e1e2e',
      borderTopLeftRadius: br + 4, borderTopRightRadius: br + 4,
    }}>
      <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <div style={{ flex: 1, height: 24, borderRadius: 6, background: 'rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', marginRight: 6, flexShrink: 0 }} />
        <span style={{ fontSize: 10, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.02em' }}>https://</span>
      </div>
    </div>
    {children}
  </div>
);

const MacFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px', background: '#ececec',
      borderTopLeftRadius: br + 4, borderTopRightRadius: br + 4,
    }}>
      <div style={{ display: 'flex', gap: 7 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f', boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15)' }} />
      </div>
    </div>
    {children}
  </div>
);

const PhoneFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => {
  const r = Math.max(br, 28) + 8;
  return (
    <div style={{
      background: 'linear-gradient(160deg, #2c2c2e 0%, #1a1a1c 100%)',
      borderRadius: r,
      padding: '10px 8px',
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)',
    }}>
      {/* Dynamic island notch */}
      <div style={{ display: 'flex', justifyContent: 'center', paddingBottom: 8 }}>
        <div style={{ width: 80, height: 22, borderRadius: 12, background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1a1a1a' }} />
          <div style={{ width: 14, height: 14, borderRadius: '50%', background: '#111' }} />
        </div>
      </div>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 20) }}>
        {children}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
        <div style={{ width: 80, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.25)' }} />
      </div>
    </div>
  );
};

const IPadFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{
    background: 'linear-gradient(160deg, #2d2d2f 0%, #1c1c1e 100%)',
    borderRadius: Math.max(br, 14) + 12,
    padding: '16px 10px',
    position: 'relative',
    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)',
  }}>
    {/* Camera dot — landscape center */}
    <div style={{ position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)', width: 6, height: 6, borderRadius: '50%', background: '#333' }} />
    <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 8) }}>
      {children}
    </div>
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 8 }}>
      <div style={{ width: 60, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.2)' }} />
    </div>
  </div>
);

const IMacFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {/* Screen */}
    <div style={{
      background: 'linear-gradient(170deg, #2d2d2f 0%, #1c1c1e 100%)',
      borderRadius: Math.max(br, 10) + 8,
      padding: '10px 10px 28px',
      position: 'relative',
      boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.09)',
    }}>
      <div style={{ overflow: 'hidden', borderRadius: Math.max(br, 6) }}>
        {children}
      </div>
      {/* Chin with camera */}
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3a3a3c' }} />
      </div>
    </div>
    {/* Stand */}
    <div style={{
      width: 56, height: 34,
      background: 'linear-gradient(to bottom, #6e6e73, #aeaeb2)',
      clipPath: 'polygon(25% 0%, 75% 0%, 90% 100%, 10% 100%)',
    }} />
    <div style={{ width: 110, height: 7, borderRadius: 4, background: 'linear-gradient(to bottom, #b0b0b5, #8e8e93)' }} />
  </div>
);

const TerminalFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: '#0d1117' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '10px 16px', background: '#161b22',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <span style={{ flex: 1, textAlign: 'center', fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
        bash — 80×24
      </span>
    </div>
    {children}
  </div>
);

const ArcFrame: React.FC<{ children: React.ReactNode; br: number }> = ({ children, br }) => (
  <div style={{ borderRadius: br + 6, overflow: 'hidden', display: 'flex', flexDirection: 'column', background: 'rgba(240,237,255,0.06)', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.1)' }}>
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '9px 14px', background: 'rgba(255,255,255,0.04)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div style={{ display: 'flex', gap: 6 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ff5f56' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffbd2e' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#27c93f' }} />
      </div>
      <div style={{ flex: 1, height: 24, borderRadius: 8, background: 'rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', padding: '0 10px' }}>
        <span style={{ fontSize: 10, fontFamily: 'system-ui', color: 'rgba(255,255,255,0.28)' }}>arc://newtab</span>
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff'].map((c, i) => (
          <div key={i} style={{ width: 13, height: 13, borderRadius: '50%', background: c, opacity: 0.75 }} />
        ))}
      </div>
    </div>
    {children}
  </div>
);

const Watermark: React.FC = () => (
  <div style={{
    position: 'absolute', bottom: 12, right: 16, zIndex: 30,
    display: 'flex', alignItems: 'center', gap: 6,
    padding: '5px 10px', borderRadius: 999,
    background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(12px)',
  }}>
    <svg width="12" height="12" viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="8" fill="url(#wg2)" />
      <defs>
        <linearGradient id="wg2" x1="0" y1="0" x2="32" y2="32">
          <stop stopColor="#8B5CF6" /><stop offset="1" stopColor="#EC4899" />
        </linearGradient>
      </defs>
    </svg>
    <span style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.65)', letterSpacing: '0.04em' }}>SnapFrame</span>
  </div>
);

/* ── Pattern helpers ─────────────────────────────── */
function getPatternSvg(pattern: string, opacity: number): string {
  const o = opacity;
  switch (pattern) {
    case 'dots':      return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1.5' fill='rgba(255,255,255,${o})'/%3E%3C/svg%3E")`;
    case 'grid':      return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'lines':     return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0' y1='40' x2='40' y2='40' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'cross':     return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10 0v20M0 10h20' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'diagonal':  return `url("data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 20L20 0' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'circles':   return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='20' cy='20' r='8' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'chevron':   return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10l20 10L40 10M0 30l20 10L40 30' stroke='rgba(255,255,255,${o})' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
    case 'triangles': return `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 5L35 30H5z' fill='none' stroke='rgba(255,255,255,${o})' stroke-width='0.5'/%3E%3C/svg%3E")`;
    case 'waves':     return `url("data:image/svg+xml,%3Csvg width='60' height='20' viewBox='0 0 60 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 10 Q15 0 30 10 Q45 20 60 10' stroke='rgba(255,255,255,${o})' stroke-width='0.5' fill='none'/%3E%3C/svg%3E")`;
    default:          return 'none';
  }
}

/* ── Logo position helper ────────────────────────── */
function getLogoPositionStyle(pos: string, padding: number): React.CSSProperties {
  switch (pos) {
    case 'tl': return { top: padding, left: padding };
    case 'tc': return { top: padding, left: '50%', transform: 'translateX(-50%)' };
    case 'tr': return { top: padding, right: padding };
    case 'ml': return { top: '50%', left: padding, transform: 'translateY(-50%)' };
    case 'mc': return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    case 'mr': return { top: '50%', right: padding, transform: 'translateY(-50%)' };
    case 'bl': return { bottom: padding, left: padding };
    case 'bc': return { bottom: padding, left: '50%', transform: 'translateX(-50%)' };
    case 'br': default: return { bottom: padding, right: padding };
  }
}

/* ── Main component ──────────────────────────────── */
const CanvasPreview: React.FC<CanvasPreviewProps> = ({ state, canvasRef }) => {
  const [imgNatural, setImgNatural] = useState<{ w: number; h: number } | null>(null);

  const {
    image, background, padding, borderRadius,
    shadow, shadowColor, shadowX,
    frame, watermark, tiltX, tiltY, scale, rotation,
    brightness, contrast, saturation, blur: imgBlur,
    sepia, grayscale, hueRotate, invert,
    imageZoom, imagePanX, imagePanY,
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
    logoImage, logoPosition, logoSize, logoOpacity, logoPadding,
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

  /* ── Shadow / glow compositing ── */
  const buildShadow = (includeInner = false) => {
    const parts: string[] = [];
    const sx = shadowX ?? 0;
    if (shadow > 0) {
      parts.push(`${sx}px ${shadow}px ${shadow * 2}px ${shadowColor}`);
      parts.push(`${sx * 0.5}px ${shadow / 2}px ${shadow}px ${shadowColor.replace(/[\d.]+\)$/, m => `${parseFloat(m) * 0.5})`)}`);
    }
    if (glowIntensity > 0) {
      parts.push(`0 0 ${Math.round(glowIntensity * 0.5)}px ${glowColor}`);
      parts.push(`0 0 ${glowIntensity}px ${glowColor}`);
    }
    if (includeInner && innerShadow > 0) {
      const op = Math.min(innerShadow / 100 * 0.85, 0.75).toFixed(2);
      parts.push(`inset 0 ${Math.round(innerShadow * 0.3)}px ${innerShadow}px rgba(0,0,0,${op})`);
    }
    return parts.length > 0 ? parts.join(', ') : 'none';
  };

  /* ── CSS filter chain ── */
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

  /* ── 3D transforms ── */
  const transformParts: string[] = [];
  if (flipX) transformParts.push('scaleX(-1)');
  if (tiltX !== 0 || tiltY !== 0) transformParts.push(`perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`);
  if (scale !== 1) transformParts.push(`scale(${scale})`);
  if (rotation !== 0) transformParts.push(`rotate(${rotation}deg)`);
  const imageTransform = transformParts.length > 0 ? transformParts.join(' ') : undefined;

  const useGradientBorder = borderStyle === 'gradient' && borderWidth > 0;
  const regularBorder = borderWidth > 0 && !useGradientBorder ? `${borderWidth}px ${borderStyle} ${borderColor}` : undefined;

  const zoom = imageZoom ?? 1;
  const panX = imagePanX ?? 0;
  const panY = imagePanY ?? 0;
  const hasZoomPan = zoom !== 1 || panX !== 0 || panY !== 0;

  const frameBR = frame === 'phone' ? Math.max(borderRadius, 28) + 8
    : frame === 'arc'  ? borderRadius + 6
    : frame !== 'none' ? borderRadius + 4 : borderRadius;

  /* ── Inner image element (handles zoom/pan) ── */
  const renderImageEl = (rawBorderRadius = 0) => {
    if (!hasZoomPan) {
      return (
        <img src={image} alt="Screenshot" className="block w-full h-auto"
          style={{ borderRadius: rawBorderRadius, filter: imageFilter }}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
          draggable={false}
        />
      );
    }
    // Zoom/pan: need clipping container with preserved aspect ratio
    const ratio = imgNatural ? imgNatural.w / imgNatural.h : 16 / 9;
    return (
      <div style={{
        width: '100%',
        aspectRatio: String(ratio),
        overflow: 'hidden',
        borderRadius: rawBorderRadius,
        position: 'relative',
      }}>
        <img src={image} alt="Screenshot" draggable={false}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover',
            filter: imageFilter,
            transform: `translate(${panX}%, ${panY}%) scale(${zoom})`,
            transformOrigin: 'center center',
          }}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
        />
      </div>
    );
  };

  /* ── Frame shell ── */
  const renderFrameShell = () => {
    switch (frame) {
      case 'browser':  return <BrowserFrame br={borderRadius}>{renderImageEl(0)}</BrowserFrame>;
      case 'macos':    return <MacFrame br={borderRadius}>{renderImageEl(0)}</MacFrame>;
      case 'phone':    return <PhoneFrame br={borderRadius}>{renderImageEl(0)}</PhoneFrame>;
      case 'ipad':     return <IPadFrame br={borderRadius}>{renderImageEl(0)}</IPadFrame>;
      case 'imac':     return <IMacFrame br={borderRadius}>{renderImageEl(0)}</IMacFrame>;
      case 'terminal': return <TerminalFrame br={borderRadius}>{renderImageEl(0)}</TerminalFrame>;
      case 'arc':      return <ArcFrame br={borderRadius}>{renderImageEl(0)}</ArcFrame>;
      default:         return renderImageEl(borderRadius);
    }
  };

  /* ── Color overlay ── */
  const colorOverlayEl = colorOverlayOpacity > 0 ? (
    <div style={{
      position: 'absolute', inset: 0,
      background: colorOverlay,
      opacity: colorOverlayOpacity / 100,
      borderRadius: frameBR,
      pointerEvents: 'none',
      zIndex: 10,
      mixBlendMode: 'color',
    }} />
  ) : null;

  /* ── Final image render (frame + border + shadow) ── */
  const renderFinalImage = () => {
    const shell = renderFrameShell();

    if (useGradientBorder) {
      return (
        <div style={{
          padding: borderWidth,
          background: `linear-gradient(${bgAngle}deg, ${customBgColor1}, ${customBgColor2})`,
          borderRadius: frameBR + borderWidth,
          boxShadow: buildShadow(false),
          display: 'inline-flex', position: 'relative',
        }}>
          <div style={{ borderRadius: frameBR, overflow: 'hidden', position: 'relative', display: 'inline-flex' }}>
            {shell}{colorOverlayEl}
          </div>
        </div>
      );
    }

    if (frame !== 'none') {
      return (
        <div style={{
          boxShadow: buildShadow(false),
          borderRadius: frameBR,
          border: regularBorder,
          display: 'inline-flex', position: 'relative',
        }}>
          {shell}{colorOverlayEl}
        </div>
      );
    }

    // Plain image
    if (hasZoomPan) {
      // Zoom/pan with clipping — shadow & border go on the outer wrapper
      return (
        <div style={{
          position: 'relative', display: 'inline-flex',
          borderRadius, overflow: 'hidden',
          boxShadow: buildShadow(true),
          border: regularBorder,
        }}>
          {shell}{colorOverlayEl}
        </div>
      );
    }
    return (
      <div style={{ position: 'relative', display: 'inline-flex' }}>
        <img src={image} alt="Screenshot" className="block w-full h-auto"
          style={{ borderRadius, boxShadow: buildShadow(true), filter: imageFilter, border: regularBorder }}
          onLoad={e => { const t = e.currentTarget; setImgNatural({ w: t.naturalWidth, h: t.naturalHeight }); }}
          draggable={false}
        />
        {colorOverlayEl}
      </div>
    );
  };

  /* ── Text rendering ── */
  const textAlignVal = (textAlign ?? 'center') as React.CSSProperties['textAlign'];
  const lsVal = (letterSpacing ?? 0) > 0 ? `${letterSpacing}px` : undefined;

  const renderTitle = (position: string) => {
    if (!titleText || titlePosition !== position) return null;
    const textShadowVal = titleShadow
      ? '0 2px 24px rgba(0,0,0,0.7), 0 0 40px rgba(0,0,0,0.4)'
      : position === 'center' ? '0 2px 20px rgba(0,0,0,0.5)' : undefined;

    return (
      <div className="relative z-[2]" style={{
        width: '100%', textAlign: textAlignVal,
        paddingTop: position === 'below' ? 16 : 0,
        paddingBottom: position === 'above' ? 16 : 0,
      }}>
        <div style={{
          fontSize: titleSize, color: titleColor, fontFamily: titleFont,
          fontWeight: titleWeight === 'normal' ? 400 : 700,
          lineHeight: 1.25, letterSpacing: lsVal, textShadow: textShadowVal,
        }}>
          {titleText}
        </div>
        {subtitleText && (
          <div style={{
            fontSize: subtitleSize, color: subtitleColor, fontFamily: titleFont,
            fontWeight: 400, marginTop: 6, letterSpacing: lsVal ? `${parseFloat(lsVal) * 0.5}px` : undefined,
            textShadow: position === 'center' ? '0 1px 12px rgba(0,0,0,0.5)' : undefined,
          }}>
            {subtitleText}
          </div>
        )}
      </div>
    );
  };

  /* ── Background opacity layer ── */
  const patternBg = bgPattern !== 'none' ? getPatternSvg(bgPattern, bgPatternOpacity) : undefined;

  return (
    <div className="flex items-center justify-center w-full">
      <div ref={canvasRef} className="relative inline-flex flex-col items-center justify-center" style={canvasStyle}>

        {/* BG opacity overlay (when < 100%) */}
        {(bgOpacity ?? 100) < 100 && (
          <div className="absolute inset-0 pointer-events-none z-0" style={{ background, opacity: (bgOpacity ?? 100) / 100 }} />
        )}

        {/* Background image */}
        {bgImage && (
          <img src={bgImage} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
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

        {/* Main image with 3D transforms */}
        <div className="relative z-[2]" style={{
          transform: imageTransform,
          transition: 'transform 0.2s ease',
          maxWidth: frame === 'phone' ? 320 : '100%',
        }}>
          {renderFinalImage()}

          {/* Reflection */}
          {reflection && (
            <div className="pointer-events-none overflow-hidden" style={{
              transform: 'scaleY(-1)',
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.28), transparent 65%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.28), transparent 65%)',
              maxHeight: 100, marginTop: 2, opacity: 0.35,
            }}>
              {renderFrameShell()}
            </div>
          )}
        </div>

        {/* Title center overlay */}
        {titleText && titlePosition === 'center' && (
          <div className="absolute inset-0 flex items-center justify-center z-[5] pointer-events-none" style={{ textAlign: textAlignVal, padding: '0 24px' }}>
            {renderTitle('center')}
          </div>
        )}

        {/* Title below */}
        {renderTitle('below')}

        {/* Vignette */}
        {vignette > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[20]" style={{
            background: `radial-gradient(ellipse at center, transparent ${Math.max(0, 70 - vignette * 0.5)}%, rgba(0,0,0,${(vignette / 100) * 0.85}) 100%)`,
          }} />
        )}

        {/* Scanlines */}
        {scanlines > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[21]" style={{
            backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)}) 0px, rgba(0,0,0,${(scanlines / 100 * 0.45).toFixed(2)}) 1px, transparent 1px, transparent 4px)`,
          }} />
        )}

        {/* Film grain */}
        {(filmGrain ?? 0) > 0 && (
          <div className="absolute inset-0 pointer-events-none z-[22]" style={{
            opacity: (filmGrain ?? 0) / 100 * 0.55,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            backgroundSize: '180px 180px',
            mixBlendMode: 'overlay',
          }} />
        )}

        {/* Custom logo overlay */}
        {logoImage && (logoOpacity ?? 100) > 0 && (
          <div style={{
            position: 'absolute',
            zIndex: 26,
            opacity: (logoOpacity ?? 100) / 100,
            ...getLogoPositionStyle(logoPosition ?? 'br', logoPadding ?? 16),
          }}>
            <img src={logoImage} alt="Logo" draggable={false}
              style={{ width: logoSize ?? 60, height: logoSize ?? 60, objectFit: 'contain', display: 'block' }}
            />
          </div>
        )}

        {watermark && <Watermark />}
      </div>
    </div>
  );
};

export default CanvasPreview;
