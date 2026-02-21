import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Palette, Download, Sparkles, RotateCcw,
  Smartphone, Globe, MonitorSmartphone, X, Type,
  SlidersHorizontal, Maximize, Copy, Check,
  Undo2, Redo2, Wand2, ImagePlus, Trash2,
  FlipHorizontal2, RotateCw, Layers, Terminal,
  Monitor, Tablet, ZoomIn,
} from 'lucide-react';
import {
  EditorState, GRADIENT_PRESETS, MESH_PRESETS,
  SHADOW_COLORS, GLOW_COLORS, ASPECT_PRESETS,
  BG_PATTERNS, TITLE_FONTS, STYLE_TEMPLATES,
} from '../presets';

interface ControlsPanelProps {
  state: EditorState;
  onChange: (partial: Partial<EditorState>) => void;
  onExport: (format: 'png' | 'jpeg' | 'webp') => void;
  onCopy: () => void;
  copySuccess: boolean;
  onReset: () => void;
  onUpgrade: () => void;
  onRemoveImage: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isExporting: boolean;
}

const TABS = [
  { id: 'style',     label: 'Style',  Icon: Wand2 },
  { id: 'bg',        label: 'BG',     Icon: Palette },
  { id: 'layout',    label: 'Layout', Icon: Maximize },
  { id: 'fx',        label: 'FX',     Icon: Layers },
  { id: 'adjust',    label: 'Adjust', Icon: SlidersHorizontal },
  { id: 'transform', label: '3D',     Icon: RotateCw },
  { id: 'brand',     label: 'Brand',  Icon: Type },
] as const;

type TabId = typeof TABS[number]['id'];

const GRADIENT_CATEGORIES = [
  { key: 'dark',    label: 'Dark' },
  { key: 'vibrant', label: 'Vibrant' },
  { key: 'pastel',  label: 'Pastel' },
  { key: 'warm',    label: 'Warm' },
  { key: 'special', label: 'Special' },
  { key: 'solid',   label: 'Solid' },
] as const;

/* ── Primitives ─────────────────────────────────── */

/** Slider with typed number input alongside — Figma-style precision */
const Slider: React.FC<{
  label: string; value: number; min: number; max: number;
  step?: number; unit?: string; onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, unit = '', onChange }) => {
  const [raw, setRaw] = useState(String(value));

  useEffect(() => { setRaw(String(value)); }, [value]);

  const commit = useCallback((s: string) => {
    const n = parseFloat(s);
    if (!isNaN(n)) onChange(Math.min(max, Math.max(min, n)));
    setRaw(String(value));
  }, [min, max, onChange, value]);

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] text-white/45 flex-shrink-0">{label}</span>
        <div className="flex items-center gap-1">
          <input
            type="number" min={min} max={max} step={step}
            value={raw}
            onChange={e => setRaw(e.target.value)}
            onBlur={e => commit(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') commit((e.target as HTMLInputElement).value); }}
            className="no-spinner w-[3.25rem] text-right text-[11px] text-white/65 font-mono
              bg-white/[0.07] px-2 py-[3px] rounded-lg outline-none
              focus:ring-1 focus:ring-brand-500/50 focus:bg-white/[0.1] transition-all"
          />
          {unit && <span className="text-[10px] text-white/25 w-4 flex-shrink-0">{unit}</span>}
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => { const v = Number(e.target.value); setRaw(String(v)); onChange(v); }}
        className="w-full" />
    </div>
  );
};

const Toggle: React.FC<{ label: string; value: boolean; onChange: (v: boolean) => void; desc?: string }> = ({ label, value, onChange, desc }) => (
  <div className="flex items-center justify-between gap-2 py-0.5">
    <div>
      <span className="text-[11px] text-white/45">{label}</span>
      {desc && <p className="text-[9px] text-white/25 leading-tight mt-0.5">{desc}</p>}
    </div>
    <button onClick={() => onChange(!value)} role="switch" aria-checked={value}
      className={`relative w-10 h-5 rounded-full transition-all duration-200 flex-shrink-0 ${value ? 'bg-brand-500' : 'bg-white/[0.12]'}`}>
      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${value ? 'left-5' : 'left-0.5'}`} />
    </button>
  </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode; action?: React.ReactNode }> = ({ children, action }) => (
  <div className="flex items-center justify-between">
    <p className="text-[9.5px] font-bold uppercase tracking-[0.1em] text-white/25">{children}</p>
    {action}
  </div>
);

const Card: React.FC<{ children: React.ReactNode; className?: string; noPad?: boolean }> = ({ children, className = '', noPad }) => (
  <div className={`rounded-2xl bg-white/[0.035] ring-1 ring-white/[0.06] ${noPad ? '' : 'p-3.5'} space-y-3 ${className}`}>
    {children}
  </div>
);

const ResetBtn: React.FC<{ onClick: () => void; label?: string }> = ({ onClick, label = 'Reset' }) => (
  <button onClick={onClick}
    className="w-full py-1.5 rounded-lg text-[10px] text-white/25 hover:text-white/50 hover:bg-white/[0.06] transition-all">
    {label}
  </button>
);

const ColorDots: React.FC<{
  colors: { id: string; name: string; value: string }[];
  active: string; onSelect: (v: string) => void;
}> = ({ colors, active, onSelect }) => (
  <div className="flex gap-2 flex-wrap">
    {colors.map(c => (
      <button key={c.id} onClick={() => onSelect(c.value)} title={c.name}
        className={`w-6 h-6 rounded-full transition-all hover:scale-110 flex-shrink-0 ring-1 ${
          active === c.value ? 'ring-2 ring-brand-400 ring-offset-2 ring-offset-[#0c0c18]' : 'ring-white/15 hover:ring-white/30'
        }`}
        style={{ background: c.value.replace(/[\d.]+\)$/, '1)') }} />
    ))}
  </div>
);

const QuickChip: React.FC<{ active: boolean; onClick: () => void; children: React.ReactNode }> = ({ active, onClick, children }) => (
  <button onClick={onClick}
    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-medium transition-all ring-1 ${
      active ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40' : 'bg-white/[0.04] text-white/40 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/65'
    }`}>
    {children}
  </button>
);

/* ── Main component ──────────────────────────────── */

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  state, onChange, onExport, onCopy, copySuccess,
  onReset, onUpgrade, onRemoveImage, onUndo, onRedo,
  canUndo, canRedo, isExporting,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('style');
  const bgImageInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Multi-stop gradient state
  type Stop = { color: string; position: number };
  const [gradientStops, setGradientStops] = useState<Stop[]>([
    { color: state.customBgColor1, position: 0 },
    { color: state.customBgColor2, position: 100 },
  ]);
  const [showMultiStop, setShowMultiStop] = useState(false);

  useEffect(() => {
    if (state.backgroundId !== 'custom') {
      setGradientStops([{ color: state.customBgColor1, position: 0 }, { color: state.customBgColor2, position: 100 }]);
      setShowMultiStop(false);
    }
  }, [state.backgroundId, state.customBgColor1, state.customBgColor2]);

  const applyStops = useCallback((stops: Stop[]) => {
    const sorted = [...stops].sort((a, b) => a.position - b.position);
    const css = `linear-gradient(${state.bgAngle}deg, ${sorted.map(s => `${s.color} ${s.position}%`).join(', ')})`;
    onChange({ background: css, backgroundId: 'custom', bgImage: null });
  }, [state.bgAngle, onChange]);

  const updateStop = (i: number, key: keyof Stop, val: string | number) => {
    const next = gradientStops.map((s, idx) => idx === i ? { ...s, [key]: val } : s);
    setGradientStops(next);
    applyStops(next);
  };

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { if (ev.target?.result) onChange({ bgImage: ev.target.result as string, backgroundId: 'image' }); };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { if (ev.target?.result) onChange({ logoImage: ev.target.result as string }); };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  /* ── Style tab ─────────────────────────────────── */
  const renderStyleTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Quick Styles</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {STYLE_TEMPLATES.map(tmpl => (
            <button key={tmpl.id} onClick={() => onChange(tmpl.overrides)}
              className="flex flex-col items-center gap-1.5 py-3 rounded-xl text-[10px] font-medium
                bg-white/[0.03] text-white/50 ring-1 ring-white/[0.06]
                hover:bg-white/[0.08] hover:text-white/80 hover:ring-brand-500/25
                transition-all active:scale-95">
              <span className="text-xl leading-none">{tmpl.emoji}</span>
              <span className="truncate w-full text-center px-1">{tmpl.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Device Frame</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'none',     name: 'None',     Icon: X },
            { id: 'browser',  name: 'Browser',  Icon: Globe },
            { id: 'macos',    name: 'macOS',    Icon: MonitorSmartphone },
            { id: 'phone',    name: 'Phone',    Icon: Smartphone },
            { id: 'ipad',     name: 'iPad',     Icon: Tablet },
            { id: 'imac',     name: 'iMac',     Icon: Monitor },
            { id: 'terminal', name: 'Terminal', Icon: Terminal },
            { id: 'arc',      name: 'Arc',      Icon: Globe },
          ].map(f => (
            <button key={f.id} onClick={() => onChange({ frame: f.id })}
              className={`flex flex-col items-center gap-1.5 py-2.5 rounded-xl text-[9px] font-medium transition-all ring-1 ${
                state.frame === f.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/60'
              }`}>
              <f.Icon className="w-3.5 h-3.5" />
              <span>{f.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Canvas Size</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {ASPECT_PRESETS.map(a => (
            <button key={a.id} onClick={() => onChange({ aspectRatio: a.id })}
              className={`px-1 py-2 rounded-xl text-[10px] font-medium transition-all flex flex-col items-center gap-0.5 ring-1 ${
                state.aspectRatio === a.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/60'
              }`}>
              <span className="font-bold">{a.name}</span>
              <span className="text-[8px] opacity-50 leading-tight text-center">{a.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );

  /* ── BG tab ─────────────────────────────────────── */
  const renderBgTab = () => (
    <div className="space-y-3">
      {/* Mesh gradients */}
      <Card>
        <SectionLabel>Mesh Gradients</SectionLabel>
        <p className="text-[9px] text-white/25 -mt-1">Multi-color blended backgrounds</p>
        <div className="grid grid-cols-6 gap-1.5">
          {MESH_PRESETS.map(m => (
            <button key={m.id}
              onClick={() => onChange({ background: m.css, backgroundId: m.id, bgImage: null })}
              className={`swatch-tip w-full aspect-square rounded-xl transition-all duration-150 hover:scale-110 ring-1 ${
                state.backgroundId === m.id
                  ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-[#0c0c18] scale-110'
                  : 'ring-white/10 hover:ring-white/30'
              }`}
              style={{ background: m.css }}
              data-name={m.name}
            />
          ))}
        </div>
      </Card>

      {/* Categorised linear gradients */}
      <Card>
        <SectionLabel>Gradients</SectionLabel>
        <div className="space-y-2.5">
          {GRADIENT_CATEGORIES.map(cat => {
            const presets = GRADIENT_PRESETS.filter(p => p.category === cat.key);
            return (
              <div key={cat.key}>
                <p className="text-[8.5px] font-semibold uppercase tracking-[0.1em] text-white/20 mb-1.5 px-0.5">{cat.label}</p>
                <div className="grid grid-cols-8 gap-1">
                  {presets.map(p => (
                    <button key={p.id}
                      onClick={() => onChange({ background: p.css, backgroundId: p.id, bgImage: null })}
                      className={`swatch-tip w-full aspect-square rounded-lg transition-all hover:scale-110 ring-1 ${
                        state.backgroundId === p.id
                          ? 'ring-2 ring-brand-500 ring-offset-1 ring-offset-[#0c0c18] scale-110'
                          : 'ring-white/10 hover:ring-white/25'
                      } ${p.id === 'transparent' ? 'checkerboard' : ''}`}
                      style={{ background: p.id === 'transparent' ? undefined : p.style }}
                      data-name={p.name}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Custom gradient */}
      <Card>
        <SectionLabel
          action={
            <button onClick={() => setShowMultiStop(v => !v)}
              className="text-[9px] text-brand-400 hover:text-brand-300 font-semibold uppercase tracking-wider transition-colors">
              {showMultiStop ? '2-stop' : 'Multi-stop'}
            </button>
          }
        >
          Custom Gradient
        </SectionLabel>

        {!showMultiStop ? (
          <div className="flex items-center gap-2">
            <input type="color" value={state.customBgColor1}
              onChange={e => {
                const bg = `linear-gradient(${state.bgAngle}deg, ${e.target.value} 0%, ${state.customBgColor2} 100%)`;
                onChange({ customBgColor1: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
              }}
              className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent flex-shrink-0" />
            <div className="flex-1 h-9 rounded-xl ring-1 ring-white/10"
              style={{ background: `linear-gradient(90deg, ${state.customBgColor1}, ${state.customBgColor2})` }} />
            <input type="color" value={state.customBgColor2}
              onChange={e => {
                const bg = `linear-gradient(${state.bgAngle}deg, ${state.customBgColor1} 0%, ${e.target.value} 100%)`;
                onChange({ customBgColor2: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
              }}
              className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent flex-shrink-0" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="w-full h-9 rounded-xl ring-1 ring-white/10"
              style={{ background: state.backgroundId === 'custom' ? state.background : `linear-gradient(${state.bgAngle}deg, ${gradientStops.map(s => `${s.color} ${s.position}%`).join(', ')})` }} />
            {gradientStops.map((stop, i) => (
              <div key={i} className="flex items-center gap-2">
                <input type="color" value={stop.color}
                  onChange={e => updateStop(i, 'color', e.target.value)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0" />
                <input type="range" min={0} max={100} value={stop.position}
                  onChange={e => updateStop(i, 'position', Number(e.target.value))}
                  className="flex-1" />
                <span className="text-[10px] text-white/30 font-mono w-7 text-right">{stop.position}%</span>
                {gradientStops.length > 2 && (
                  <button onClick={() => { const next = gradientStops.filter((_, idx) => idx !== i); setGradientStops(next); applyStops(next); }}
                    className="text-white/20 hover:text-red-400 text-sm transition-colors">×</button>
                )}
              </div>
            ))}
            {gradientStops.length < 5 && (
              <button onClick={() => { const next = [...gradientStops, { color: '#ffffff', position: 50 }]; setGradientStops(next); applyStops(next); }}
                className="w-full py-1.5 rounded-lg text-[10px] text-white/25 hover:text-white/50 bg-white/[0.03] hover:bg-white/[0.06] ring-1 ring-white/[0.06] transition-all">
                + Add Color Stop
              </button>
            )}
          </div>
        )}

        <Slider label="Angle" value={state.bgAngle} min={0} max={360} unit="°"
          onChange={v => {
            if (state.backgroundId === 'custom') {
              if (showMultiStop) {
                const sorted = [...gradientStops].sort((a, b) => a.position - b.position);
                onChange({ bgAngle: v, background: `linear-gradient(${v}deg, ${sorted.map(s => `${s.color} ${s.position}%`).join(', ')})` });
              } else {
                onChange({ bgAngle: v, background: `linear-gradient(${v}deg, ${state.customBgColor1} 0%, ${state.customBgColor2} 100%)` });
              }
            } else {
              onChange({ bgAngle: v });
            }
          }} />
        <Slider label="Opacity" value={state.bgOpacity ?? 100} min={10} max={100} unit="%" onChange={v => onChange({ bgOpacity: v })} />
      </Card>

      {/* Background image */}
      <Card>
        <SectionLabel>Background Image</SectionLabel>
        <input ref={bgImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
        <div className="flex gap-2">
          <button onClick={() => bgImageInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs
              bg-white/[0.04] text-white/45 ring-1 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/70 transition-all">
            <ImagePlus className="w-3.5 h-3.5" />
            {state.bgImage ? 'Change' : 'Upload'}
          </button>
          {state.bgImage && (
            <button onClick={() => onChange({ bgImage: null, backgroundId: GRADIENT_PRESETS[6].id, background: GRADIENT_PRESETS[6].css })}
              className="px-3 py-2.5 rounded-xl text-xs bg-white/[0.04] text-red-400/50 hover:bg-red-500/10 hover:text-red-400 transition-all ring-1 ring-white/[0.06]">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
        {state.bgImage && (
          <Slider label="Blur" value={state.bgBlur} min={0} max={20} unit="px" onChange={v => onChange({ bgBlur: v })} />
        )}
      </Card>

      {/* Patterns & Texture */}
      <Card>
        <SectionLabel>Patterns & Texture</SectionLabel>
        <div className="grid grid-cols-5 gap-1.5">
          {BG_PATTERNS.map(p => (
            <button key={p.id} onClick={() => onChange({ bgPattern: p.id })}
              className={`px-1 py-2 rounded-lg text-[9px] font-medium transition-all ring-1 ${
                state.bgPattern === p.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.07]'
              }`}>
              {p.name}
            </button>
          ))}
        </div>
        {state.bgPattern !== 'none' && (
          <Slider label="Pattern Opacity" value={Math.round(state.bgPatternOpacity * 100)} min={1} max={60}
            onChange={v => onChange({ bgPatternOpacity: v / 100 })} />
        )}
        <Slider label="Noise Texture" value={state.bgNoise} min={0} max={60} onChange={v => onChange({ bgNoise: v })} />
      </Card>
    </div>
  );

  /* ── Layout tab ─────────────────────────────────── */
  const renderLayoutTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Padding</SectionLabel>
        <Slider label="Size" value={state.padding} min={0} max={200} unit="px" onChange={v => onChange({ padding: v })} />
        <div className="flex gap-1.5">
          {[0, 32, 64, 96, 128, 160].map(v => (
            <QuickChip key={v} active={state.padding === v} onClick={() => onChange({ padding: v })}>{v}</QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Corner Radius</SectionLabel>
        <Slider label="Radius" value={state.borderRadius} min={0} max={80} unit="px" onChange={v => onChange({ borderRadius: v })} />
        <div className="flex gap-1.5">
          {[0, 8, 16, 24, 48, 64].map(v => (
            <QuickChip key={v} active={state.borderRadius === v} onClick={() => onChange({ borderRadius: v })}>{v}</QuickChip>
          ))}
        </div>
      </Card>

      {/* Image zoom & pan */}
      <Card>
        <SectionLabel>
          <span className="flex items-center gap-1.5">
            <ZoomIn className="w-3 h-3" /> Image Zoom & Pan
          </span>
        </SectionLabel>
        <Slider label="Zoom" value={Math.round((state.imageZoom ?? 1) * 100)} min={100} max={300} unit="%"
          onChange={v => onChange({ imageZoom: v / 100 })} />
        {(state.imageZoom ?? 1) > 1 && (
          <>
            <Slider label="Pan X" value={state.imagePanX ?? 0} min={-50} max={50}
              onChange={v => onChange({ imagePanX: v })} />
            <Slider label="Pan Y" value={state.imagePanY ?? 0} min={-50} max={50}
              onChange={v => onChange({ imagePanY: v })} />
          </>
        )}
        {(state.imageZoom ?? 1) > 1 && (
          <ResetBtn onClick={() => onChange({ imageZoom: 1, imagePanX: 0, imagePanY: 0 })} label="Reset Zoom" />
        )}
      </Card>
    </div>
  );

  /* ── FX tab ─────────────────────────────────────── */
  const renderFxTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Drop Shadow</SectionLabel>
        <Slider label="Intensity" value={state.shadow} min={0} max={120} onChange={v => onChange({ shadow: v })} />
        <Slider label="X Offset" value={state.shadowX ?? 0} min={-60} max={60} unit="px" onChange={v => onChange({ shadowX: v })} />
        <ColorDots colors={SHADOW_COLORS} active={state.shadowColor} onSelect={v => onChange({ shadowColor: v })} />
      </Card>

      <Card>
        <SectionLabel>Outer Glow</SectionLabel>
        <Slider label="Intensity" value={state.glowIntensity} min={0} max={120} onChange={v => onChange({ glowIntensity: v })} />
        {state.glowIntensity > 0 && (
          <ColorDots colors={GLOW_COLORS} active={state.glowColor} onSelect={v => onChange({ glowColor: v })} />
        )}
      </Card>

      <Card>
        <SectionLabel>Inner Shadow</SectionLabel>
        <Slider label="Depth" value={state.innerShadow} min={0} max={100} onChange={v => onChange({ innerShadow: v })} />
      </Card>

      <Card>
        <SectionLabel>Border</SectionLabel>
        <Slider label="Width" value={state.borderWidth} min={0} max={24} unit="px" onChange={v => onChange({ borderWidth: v })} />
        {state.borderWidth > 0 && (
          <>
            <div className="grid grid-cols-5 gap-1.5">
              {[
                { id: 'solid', label: '—' }, { id: 'dashed', label: '╌' },
                { id: 'dotted', label: '···' }, { id: 'double', label: '═' }, { id: 'gradient', label: '🌈' },
              ].map(s => (
                <button key={s.id} onClick={() => onChange({ borderStyle: s.id })}
                  className={`py-2 rounded-lg text-xs font-bold transition-all ring-1 ${
                    state.borderStyle === s.id
                      ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                      : 'bg-white/[0.03] text-white/45 ring-white/[0.06] hover:bg-white/[0.07]'
                  }`}>
                  {s.label}
                </button>
              ))}
            </div>
            {state.borderStyle !== 'gradient' ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] text-white/35">Color</span>
                <input type="color"
                  value={state.borderColor.startsWith('rgba') ? '#ffffff' : state.borderColor}
                  onChange={e => onChange({ borderColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent flex-shrink-0" />
                <div className="flex gap-1.5 ml-auto">
                  {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#38bdf8', '#f59e0b'].map(c => (
                    <button key={c} onClick={() => onChange({ borderColor: c })}
                      className={`w-6 h-6 rounded-full ring-1 transition-all hover:scale-110 ${
                        state.borderColor === c ? 'ring-2 ring-brand-400 ring-offset-1 ring-offset-[#0c0c18]' : 'ring-white/15'
                      }`}
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[9px] text-white/25">Uses your custom gradient colors from the BG tab.</p>
            )}
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Color Overlay</SectionLabel>
        <Slider label="Opacity" value={state.colorOverlayOpacity} min={0} max={100} unit="%" onChange={v => onChange({ colorOverlayOpacity: v })} />
        {state.colorOverlayOpacity > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.colorOverlay}
              onChange={e => onChange({ colorOverlay: e.target.value })}
              className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
            <div className="flex-1 h-9 rounded-xl ring-1 ring-white/10" style={{ background: state.colorOverlay }} />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Atmospheric</SectionLabel>
        <Slider label="Vignette"    value={state.vignette}         min={0} max={100} onChange={v => onChange({ vignette: v })} />
        <Slider label="Scanlines"   value={state.scanlines}        min={0} max={100} onChange={v => onChange({ scanlines: v })} />
        <Slider label="Film Grain"  value={state.filmGrain ?? 0}   min={0} max={100} onChange={v => onChange({ filmGrain: v })} />
      </Card>

      <ResetBtn
        onClick={() => onChange({
          shadow: 0, shadowX: 0, glowIntensity: 0, innerShadow: 0,
          borderWidth: 0, colorOverlayOpacity: 0,
          vignette: 0, scanlines: 0, filmGrain: 0,
        })}
        label="Clear All Effects"
      />
    </div>
  );

  /* ── Adjust tab ─────────────────────────────────── */
  const renderAdjustTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Tone</SectionLabel>
        <Slider label="Brightness" value={state.brightness} min={50}  max={150} unit="%" onChange={v => onChange({ brightness: v })} />
        <Slider label="Contrast"   value={state.contrast}   min={50}  max={150} unit="%" onChange={v => onChange({ contrast: v })} />
        <Slider label="Saturation" value={state.saturation} min={0}   max={200} unit="%" onChange={v => onChange({ saturation: v })} />
        <Slider label="Blur"       value={state.blur}       min={0}   max={20}  step={0.5} unit="px" onChange={v => onChange({ blur: v })} />
        <ResetBtn onClick={() => onChange({ brightness: 100, contrast: 100, saturation: 100, blur: 0 })} label="Reset Tone" />
      </Card>

      <Card>
        <SectionLabel>Filters</SectionLabel>
        <Slider label="Sepia"      value={state.sepia ?? 0}     min={0}    max={100} unit="%" onChange={v => onChange({ sepia: v })} />
        <Slider label="Grayscale"  value={state.grayscale ?? 0} min={0}    max={100} unit="%" onChange={v => onChange({ grayscale: v })} />
        <Slider label="Hue Shift"  value={state.hueRotate ?? 0} min={-180} max={180} unit="°" onChange={v => onChange({ hueRotate: v })} />
        <Toggle label="Invert Colors" value={state.invert ?? false} onChange={v => onChange({ invert: v })} />
        <Toggle label="Flip Horizontal" value={state.flipX} onChange={v => onChange({ flipX: v })} />
        <ResetBtn onClick={() => onChange({ sepia: 0, grayscale: 0, hueRotate: 0, invert: false, flipX: false })} label="Reset Filters" />
      </Card>
    </div>
  );

  /* ── 3D tab ─────────────────────────────────────── */
  const renderTransformTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>3D Transform</SectionLabel>
        <Slider label="Tilt X"   value={state.tiltX}                   min={-30} max={30}  unit="°"  onChange={v => onChange({ tiltX: v })} />
        <Slider label="Tilt Y"   value={state.tiltY}                   min={-30} max={30}  unit="°"  onChange={v => onChange({ tiltY: v })} />
        <Slider label="Scale"    value={Math.round(state.scale * 100)} min={50}  max={150} unit="%"  onChange={v => onChange({ scale: v / 100 })} />
        <Slider label="Rotation" value={state.rotation}                min={-45} max={45}  unit="°"  onChange={v => onChange({ rotation: v })} />
        <ResetBtn onClick={() => onChange({ tiltX: 0, tiltY: 0, scale: 1, rotation: 0 })} label="Reset Transform" />
      </Card>

      <Card>
        <SectionLabel>Perspective Presets</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: 'Flat',   tiltX: 0,   tiltY: 0 },
            { name: 'Left',   tiltX: 0,   tiltY: 12 },
            { name: 'Right',  tiltX: 0,   tiltY: -12 },
            { name: 'Top',    tiltX: -12, tiltY: 0 },
            { name: 'Bottom', tiltX: 12,  tiltY: 0 },
            { name: 'Corner', tiltX: 6,   tiltY: -9 },
          ].map(p => (
            <QuickChip key={p.name} active={state.tiltX === p.tiltX && state.tiltY === p.tiltY}
              onClick={() => onChange({ tiltX: p.tiltX, tiltY: p.tiltY })}>
              {p.name}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Reflection</SectionLabel>
        <Toggle label="Mirror Reflection" value={state.reflection} onChange={v => onChange({ reflection: v })} desc="Adds a fading reflection beneath the image" />
      </Card>
    </div>
  );

  /* ── Brand tab (text + logo) ────────────────────── */
  const renderBrandTab = () => (
    <div className="space-y-3">
      {/* Text content */}
      <Card>
        <SectionLabel>Text Overlay</SectionLabel>
        <input type="text" placeholder="Title…" value={state.titleText}
          onChange={e => onChange({ titleText: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        <input type="text" placeholder="Subtitle / tagline…" value={state.subtitleText}
          onChange={e => onChange({ subtitleText: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
      </Card>

      {state.titleText && (
        <>
          <Card>
            <SectionLabel>Position & Alignment</SectionLabel>
            <div className="grid grid-cols-3 gap-1.5">
              {[{ id: 'above', name: 'Above' }, { id: 'center', name: 'Center' }, { id: 'below', name: 'Below' }].map(p => (
                <QuickChip key={p.id} active={state.titlePosition === p.id} onClick={() => onChange({ titlePosition: p.id })}>
                  {p.name}
                </QuickChip>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[{ id: 'left', name: '⬅ Left' }, { id: 'center', name: '↔ Center' }, { id: 'right', name: 'Right ➡' }].map(a => (
                <QuickChip key={a.id} active={(state.textAlign ?? 'center') === a.id} onClick={() => onChange({ textAlign: a.id })}>
                  {a.name}
                </QuickChip>
              ))}
            </div>
          </Card>

          <Card>
            <SectionLabel>Typography</SectionLabel>
            <Slider label="Title Size"     value={state.titleSize}         min={12} max={96} unit="px" onChange={v => onChange({ titleSize: v })} />
            <Slider label="Subtitle Size"  value={state.subtitleSize}      min={10} max={48} unit="px" onChange={v => onChange({ subtitleSize: v })} />
            <Slider label="Letter Spacing" value={state.letterSpacing ?? 0} min={0}  max={20} unit="px" onChange={v => onChange({ letterSpacing: v })} />
            <div className="grid grid-cols-4 gap-1.5">
              {TITLE_FONTS.map(f => (
                <button key={f.id} onClick={() => onChange({ titleFont: f.id })}
                  className={`px-1.5 py-2 rounded-lg text-[10px] font-medium transition-all ring-1 ${
                    state.titleFont === f.id
                      ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                      : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
                  }`}
                  style={{ fontFamily: f.id }}>
                  {f.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ id: 'bold', name: 'Bold' }, { id: 'normal', name: 'Regular' }].map(w => (
                <QuickChip key={w.id} active={(state.titleWeight ?? 'bold') === w.id}
                  onClick={() => onChange({ titleWeight: w.id })}>
                  <span style={{ fontWeight: w.id === 'bold' ? 700 : 400 }}>{w.name}</span>
                </QuickChip>
              ))}
            </div>
            <Toggle label="Text Shadow" value={state.titleShadow ?? false} onChange={v => onChange({ titleShadow: v })} />
          </Card>

          <Card>
            <SectionLabel>Text Colors</SectionLabel>
            {[
              { label: 'Title',    val: state.titleColor,    key: 'titleColor' },
              { label: 'Subtitle', val: state.subtitleColor.startsWith('rgba') ? '#999999' : state.subtitleColor, key: 'subtitleColor' },
            ].map(({ label, val, key }) => (
              <div key={key} className="flex items-center gap-3">
                <span className="text-[10px] text-white/35 w-14 flex-shrink-0">{label}</span>
                <input type="color" value={val}
                  onChange={e => onChange({ [key]: e.target.value } as Partial<EditorState>)}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                <div className="flex gap-1.5 ml-auto">
                  {['#ffffff', '#000000', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'].map(c => (
                    <button key={c} onClick={() => onChange({ [key]: c } as Partial<EditorState>)}
                      className="w-6 h-6 rounded-full ring-1 ring-white/10 hover:scale-110 transition-all"
                      style={{ background: c }} />
                  ))}
                </div>
              </div>
            ))}
          </Card>
        </>
      )}

      {/* Logo / custom watermark */}
      <Card>
        <SectionLabel>Logo / Watermark</SectionLabel>
        <input ref={logoInputRef} type="file" accept="image/*,.svg" className="hidden" onChange={handleLogoUpload} />
        <div className="flex gap-2">
          <button onClick={() => logoInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs
              bg-white/[0.04] text-white/45 ring-1 ring-white/[0.06] hover:bg-white/[0.08] hover:text-white/70 transition-all">
            <ImagePlus className="w-3.5 h-3.5" />
            {state.logoImage ? 'Change Logo' : 'Upload Logo'}
          </button>
          {state.logoImage && (
            <button onClick={() => onChange({ logoImage: null })}
              className="px-3 rounded-xl bg-white/[0.04] text-red-400/50 hover:bg-red-500/10 hover:text-red-400 transition-all ring-1 ring-white/[0.06]">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {state.logoImage && (
          <>
            <Slider label="Size"    value={state.logoSize ?? 60}    min={16} max={200} unit="px" onChange={v => onChange({ logoSize: v })} />
            <Slider label="Opacity" value={state.logoOpacity ?? 100} min={10} max={100} unit="%" onChange={v => onChange({ logoOpacity: v })} />
            <Slider label="Padding" value={state.logoPadding ?? 16}  min={4}  max={48}  unit="px" onChange={v => onChange({ logoPadding: v })} />
            <div>
              <p className="text-[9.5px] text-white/25 mb-2">Position</p>
              <div className="grid grid-cols-3 gap-1.5 max-w-[160px]">
                {[
                  { id: 'tl', label: '↖' }, { id: 'tc', label: '↑' }, { id: 'tr', label: '↗' },
                  { id: 'ml', label: '←' }, { id: 'mc', label: '⊕' }, { id: 'mr', label: '→' },
                  { id: 'bl', label: '↙' }, { id: 'bc', label: '↓' }, { id: 'br', label: '↘' },
                ].map(p => (
                  <button key={p.id} onClick={() => onChange({ logoPosition: p.id })}
                    className={`py-2 rounded-lg text-sm transition-all ring-1 ${
                      (state.logoPosition ?? 'br') === p.id
                        ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                        : 'bg-white/[0.03] text-white/40 ring-white/[0.06] hover:bg-white/[0.08]'
                    }`}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'style':     return renderStyleTab();
      case 'bg':        return renderBgTab();
      case 'layout':    return renderLayoutTab();
      case 'fx':        return renderFxTab();
      case 'adjust':    return renderAdjustTab();
      case 'transform': return renderTransformTab();
      case 'brand':     return renderBrandTab();
    }
  };

  const fmt = state.exportFormat ?? 'png';
  const fmtHints: Record<string, string> = {
    png: 'Lossless · best for text & UI',
    jpeg: 'Smaller file · no transparency',
    webp: 'Best compression · modern browsers',
  };

  return (
    <div className="w-full lg:w-[22rem] xl:w-96 shrink-0 flex flex-col bg-[#0b0b17]
      lg:border-l border-white/[0.05] lg:h-[calc(100vh-4.25rem)] lg:overflow-hidden">

      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-white/[0.05]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center shadow-lg shadow-brand-500/20 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="8" width="20" height="14" rx="2" fill="white" opacity="0.9" />
              <path d="M10 24h12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>
          <span className="font-bold text-[14px] text-white tracking-tight">SnapFrame</span>
          {state.isPro && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-[9px] font-bold ring-1 ring-amber-500/30">
              PRO
            </span>
          )}
          <div className="flex-1" />
          <button onClick={onUndo} disabled={!canUndo} title="Undo (Ctrl+Z)"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-all disabled:opacity-20 disabled:pointer-events-none">
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button onClick={onRedo} disabled={!canRedo} title="Redo"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-white/30 hover:text-white/70 hover:bg-white/[0.07] transition-all disabled:opacity-20 disabled:pointer-events-none">
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="shrink-0 flex bg-black/25 border-b border-white/[0.05]">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center gap-[3px] py-2.5 text-[7.5px] font-bold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === id
                ? 'text-brand-400 border-brand-500 bg-brand-500/[0.05]'
                : 'text-white/28 border-transparent hover:text-white/50 hover:bg-white/[0.02]'
            }`}>
            <Icon className="w-[13px] h-[13px]" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Scrollable content */}
      <div className="flex-1 lg:overflow-y-auto overflow-x-hidden px-3 py-3 space-y-3">
        {renderTabContent()}
      </div>

      {/* Pinned export section */}
      <div className="shrink-0 border-t border-white/[0.07] px-3 pt-3 pb-4 space-y-2.5 bg-[#0b0b17]">
        {/* Format + resolution row */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {(['png', 'jpeg', 'webp'] as const).map(f => (
              <button key={f} onClick={() => onChange({ exportFormat: f })}
                className={`px-2.5 py-1 text-[9px] font-bold rounded-lg transition-all uppercase tracking-wider ${
                  fmt === f
                    ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/40'
                    : 'bg-white/[0.05] text-white/30 hover:bg-white/[0.09] hover:text-white/55'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="flex gap-1">
            {[1, 2, 3].map(s => (
              <button key={s} onClick={() => onChange({ exportScale: s })}
                className={`w-8 py-1 text-[9px] font-bold rounded-lg transition-all ${
                  (state.exportScale ?? 2) === s
                    ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/40'
                    : 'bg-white/[0.05] text-white/30 hover:bg-white/[0.09] hover:text-white/55'
                }`}>
                {s}×
              </button>
            ))}
          </div>
        </div>

        {/* Format hint */}
        <p className="text-[8.5px] text-white/20 leading-relaxed">{fmtHints[fmt]}</p>

        {/* Primary actions */}
        <div className="flex gap-2">
          <button onClick={() => onExport(fmt)} disabled={isExporting}
            className="flex-1 py-3 rounded-2xl font-semibold text-white text-sm
              bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
              transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30
              flex items-center justify-center gap-2 active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed">
            {isExporting ? (
              <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Exporting…</>
            ) : (
              <><Download className="w-4 h-4" />Export {fmt.toUpperCase()}</>
            )}
          </button>
          <button onClick={onCopy} title="Copy (Ctrl+Shift+C)"
            className={`px-4 py-3 rounded-2xl text-sm transition-all duration-200
              flex items-center justify-center active:scale-[0.98] ${
              copySuccess
                ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/30'
                : 'bg-white/[0.06] text-white/45 hover:bg-white/[0.1] hover:text-white/70 ring-1 ring-white/10'
            }`}>
            {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Secondary */}
        <div className="flex gap-1.5">
          <button onClick={onReset}
            className="flex-1 py-2 rounded-xl text-[11px] font-medium bg-white/[0.05] text-white/40
              hover:bg-white/[0.09] hover:text-white/65 transition-all flex items-center justify-center gap-1.5">
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
          <button onClick={onRemoveImage}
            className="flex-1 py-2 rounded-xl text-[11px] font-medium bg-white/[0.05] text-white/40
              hover:bg-red-500/[0.1] hover:text-red-400/80 transition-all flex items-center justify-center gap-1.5">
            <FlipHorizontal2 className="w-3 h-3" /> Remove
          </button>
        </div>

        {state.watermark && (
          <button onClick={onUpgrade}
            className="w-full py-2.5 rounded-2xl text-sm font-semibold
              bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-300
              hover:from-amber-500/25 hover:to-orange-500/25 transition-all
              flex items-center justify-center gap-2 ring-1 ring-amber-500/20">
            <Sparkles className="w-3.5 h-3.5" />
            Remove Watermark — $9.99
          </button>
        )}
      </div>
    </div>
  );
};

export default ControlsPanel;
