import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Palette, Download, Sparkles, RotateCcw,
  Smartphone, Globe, MonitorSmartphone, X, Type,
  SlidersHorizontal, Maximize, Copy, Check,
  Undo2, Redo2, Wand2, ImagePlus, Trash2,
  FlipHorizontal2, RotateCw, Layers, Terminal,
  Monitor, Tablet, Share2, Shuffle,
  Camera, Newspaper, Laptop, Grid3X3,
  Tv2, BookOpen,
} from 'lucide-react';
import {
  EditorState, GRADIENT_PRESETS, MESH_PRESETS,
  SHADOW_COLORS, GLOW_COLORS, ASPECT_PRESETS,
  BG_PATTERNS, TITLE_FONTS, STYLE_TEMPLATES, FILM_LOOKS,
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
  { id: 'style',     label: 'Style',   Icon: Wand2 },
  { id: 'bg',        label: 'BG',      Icon: Palette },
  { id: 'layout',    label: 'Layout',  Icon: Maximize },
  { id: 'fx',        label: 'FX',      Icon: Layers },
  { id: 'adjust',    label: 'Adjust',  Icon: SlidersHorizontal },
  { id: 'transform', label: '3D',      Icon: RotateCw },
  { id: 'brand',     label: 'Brand',   Icon: Type },
  { id: 'export',    label: 'Export',  Icon: Download },
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

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-2xl bg-white/[0.035] ring-1 ring-white/[0.06] p-3.5 space-y-3 ${className}`}>
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

  const handleRandomize = () => {
    const gradients = [...GRADIENT_PRESETS, ...MESH_PRESETS];
    const randGrad = gradients[Math.floor(Math.random() * gradients.length)];
    const randFrame = ['none', 'none', 'none', 'browser', 'macos', 'phone', 'ipad', 'terminal', 'arc', 'samsung', 'macbook'][Math.floor(Math.random() * 11)];
    const randPattern = ['none', 'none', 'dots', 'grid', 'diagonal', 'waves', 'hexagons'][Math.floor(Math.random() * 7)];
    onChange({
      background: randGrad.css, backgroundId: randGrad.id,
      frame: randFrame,
      padding: [32, 48, 64, 80, 96][Math.floor(Math.random() * 5)],
      borderRadius: [0, 8, 12, 16, 24][Math.floor(Math.random() * 5)],
      shadow: Math.floor(Math.random() * 80),
      tiltX: (Math.random() - 0.5) * 16,
      tiltY: (Math.random() - 0.5) * 20,
      scale: 0.85 + Math.random() * 0.2,
      rotation: (Math.random() - 0.5) * 10,
      bgPattern: randPattern,
      bgPatternOpacity: Math.random() * 0.15,
      borderWidth: Math.random() > 0.6 ? Math.floor(Math.random() * 4) : 0,
      glowIntensity: Math.random() > 0.6 ? Math.floor(Math.random() * 60) : 0,
      vignette: Math.floor(Math.random() * 40),
    });
  };

  const handleAutoEnhance = () => {
    onChange({
      brightness: 103, contrast: 105, saturation: 110,
      sharpness: 20, fade: 0, temperature: 5,
      vignette: 15, shadow: 50,
    });
  };

  /* ── Style tab ─────────────────────────────────── */
  const renderStyleTab = () => (
    <div className="space-y-3">
      <div className="flex gap-2">
        <button onClick={handleRandomize}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium
            bg-white/[0.05] text-white/50 ring-1 ring-white/[0.08] hover:bg-brand-500/10 hover:text-brand-300
            hover:ring-brand-500/30 transition-all">
          <Shuffle className="w-3 h-3" /> Randomize
        </button>
        <button onClick={handleAutoEnhance}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-medium
            bg-white/[0.05] text-white/50 ring-1 ring-white/[0.08] hover:bg-amber-500/10 hover:text-amber-300
            hover:ring-amber-500/30 transition-all">
          <Sparkles className="w-3 h-3" /> Auto-Enhance
        </button>
      </div>

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
            { id: 'none',      name: 'None',     Icon: X },
            { id: 'browser',   name: 'Browser',  Icon: Globe },
            { id: 'macos',     name: 'macOS',    Icon: MonitorSmartphone },
            { id: 'phone',     name: 'iPhone',   Icon: Smartphone },
            { id: 'ipad',      name: 'iPad',     Icon: Tablet },
            { id: 'imac',      name: 'iMac',     Icon: Monitor },
            { id: 'terminal',  name: 'Terminal', Icon: Terminal },
            { id: 'arc',       name: 'Arc',      Icon: Globe },
            { id: 'samsung',   name: 'Galaxy',   Icon: Smartphone },
            { id: 'macbook',   name: 'MacBook',  Icon: Laptop },
            { id: 'polaroid',  name: 'Polaroid', Icon: Camera },
            { id: 'newspaper', name: 'News',     Icon: Newspaper },
            { id: 'smarttv',   name: 'Smart TV', Icon: Tv2 },
            { id: 'kindle',    name: 'Kindle',   Icon: BookOpen },
            { id: 'windows',   name: 'Windows',  Icon: Monitor },
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
      <Card>
        <SectionLabel>Mesh Gradients</SectionLabel>
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
        <Toggle label="Radial Gradient" value={state.bgRadial ?? false} onChange={v => onChange({ bgRadial: v })} desc="Renders gradient as radial instead of linear" />
        <Slider label="Opacity" value={state.bgOpacity ?? 100} min={10} max={100} unit="%" onChange={v => onChange({ bgOpacity: v })} />
      </Card>

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
          <>
            <Slider label="Pattern Opacity" value={Math.round(state.bgPatternOpacity * 100)} min={1} max={60}
              onChange={v => onChange({ bgPatternOpacity: v / 100 })} />
            <Slider label="Pattern Scale" value={state.patternScale ?? 20} min={6} max={80} unit="px"
              onChange={v => onChange({ patternScale: v })} />
          </>
        )}
        <Slider label="Noise Texture" value={state.bgNoise} min={0} max={60} onChange={v => onChange({ bgNoise: v })} />
      </Card>
    </div>
  );

  /* ── Layout tab ─────────────────────────────────── */
  const renderLayoutTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel
          action={
            <button onClick={() => onChange({ uniformPadding: !(state.uniformPadding ?? true) })}
              className="text-[9px] text-brand-400 hover:text-brand-300 font-semibold uppercase tracking-wider transition-colors">
              {(state.uniformPadding ?? true) ? 'Per Side' : 'Uniform'}
            </button>
          }
        >
          Padding
        </SectionLabel>

        {(state.uniformPadding ?? true) ? (
          <>
            <Slider label="Size" value={state.padding} min={0} max={200} unit="px" onChange={v => onChange({ padding: v })} />
            <div className="flex gap-1.5 flex-wrap">
              {[0, 24, 48, 64, 96, 128, 160].map(v => (
                <QuickChip key={v} active={state.padding === v} onClick={() => onChange({ padding: v })}>{v}</QuickChip>
              ))}
            </div>
          </>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <Slider label="Top"    value={state.paddingTop    ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingTop: v })} />
            <Slider label="Right"  value={state.paddingRight  ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingRight: v })} />
            <Slider label="Bottom" value={state.paddingBottom ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingBottom: v })} />
            <Slider label="Left"   value={state.paddingLeft   ?? state.padding} min={0} max={200} unit="px" onChange={v => onChange({ paddingLeft: v })} />
          </div>
        )}
      </Card>

      <Card>
        <SectionLabel>Corner Radius</SectionLabel>
        <Slider label="Canvas Radius" value={state.borderRadius} min={0} max={80} unit="px" onChange={v => onChange({ borderRadius: v })} />
        <div className="flex gap-1.5 flex-wrap">
          {[0, 4, 8, 12, 16, 24, 32, 48].map(v => (
            <QuickChip key={v} active={state.borderRadius === v} onClick={() => onChange({ borderRadius: v })}>{v}</QuickChip>
          ))}
        </div>
        <Slider label="Image Radius" value={state.imageBorderRadius ?? 0} min={0} max={60} unit="px"
          onChange={v => onChange({ imageBorderRadius: v })} />
      </Card>

      <Card>
        <SectionLabel>Image Clip Shape</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { id: 'none',    label: 'None' },
            { id: 'circle',  label: 'Circle' },
            { id: 'hexagon', label: 'Hex' },
            { id: 'diamond', label: 'Diamond' },
            { id: 'star',    label: 'Star' },
            { id: 'arch',    label: 'Arch' },
            { id: 'rounded', label: 'Rounded' },
          ].map(s => (
            <QuickChip key={s.id} active={(state.imageClipShape ?? 'none') === s.id}
              onClick={() => onChange({ imageClipShape: s.id })}>
              {s.label}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Image Zoom & Pan</SectionLabel>
        <Slider label="Zoom" value={Math.round((state.imageZoom ?? 1) * 100)} min={100} max={300} unit="%"
          onChange={v => onChange({ imageZoom: v / 100 })} />
        {(state.imageZoom ?? 1) > 1 && (
          <>
            <Slider label="Pan X" value={state.imagePanX ?? 0} min={-50} max={50}
              onChange={v => onChange({ imagePanX: v })} />
            <Slider label="Pan Y" value={state.imagePanY ?? 0} min={-50} max={50}
              onChange={v => onChange({ imagePanY: v })} />
            <ResetBtn onClick={() => onChange({ imageZoom: 1, imagePanX: 0, imagePanY: 0 })} label="Reset Zoom" />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Image Transform</SectionLabel>
        <Slider label="Opacity" value={state.imageOpacity ?? 100} min={0} max={100} unit="%"
          onChange={v => onChange({ imageOpacity: v })} />
        <Slider label="Rotation" value={state.imageRotation ?? 0} min={-180} max={180} unit="°"
          onChange={v => onChange({ imageRotation: v })} />
      </Card>

      <Card>
        <SectionLabel>Image Fit Mode</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { id: 'cover',   label: 'Cover' },
            { id: 'contain', label: 'Contain' },
            { id: 'fill',    label: 'Fill' },
          ].map(m => (
            <QuickChip key={m.id} active={(state.imageFitMode ?? 'cover') === m.id}
              onClick={() => onChange({ imageFitMode: m.id })}>
              {m.label}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Canvas Options</SectionLabel>
        <Slider label="Canvas Rotation" value={state.canvasRotation ?? 0} min={-15} max={15} unit="°"
          onChange={v => onChange({ canvasRotation: v })} />
        <Slider label="Spotlight" value={state.spotlight ?? 0} min={0} max={100}
          onChange={v => onChange({ spotlight: v })} />
        <Toggle label="Rule of Thirds" value={state.showRuleOfThirds ?? false} onChange={v => onChange({ showRuleOfThirds: v })}
          desc="Composition guide overlay (preview only)" />
        <Toggle label="Corner Dots" value={state.cornerDots ?? false} onChange={v => onChange({ cornerDots: v })} />
      </Card>
    </div>
  );

  /* ── FX tab ─────────────────────────────────────── */
  const renderFxTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Drop Shadow</SectionLabel>
        <Slider label="Intensity"   value={state.shadow}              min={0}   max={120}      onChange={v => onChange({ shadow: v })} />
        <Slider label="X Offset"    value={state.shadowX ?? 0}        min={-60} max={60}  unit="px" onChange={v => onChange({ shadowX: v })} />
        <Slider label="Y Offset"    value={state.shadowY ?? 0}        min={-60} max={60}  unit="px" onChange={v => onChange({ shadowY: v })} />
        <Slider label="Blur Radius" value={state.shadowBlur ?? 0}     min={0}   max={120} unit="px" onChange={v => onChange({ shadowBlur: v })} />
        <Slider label="Spread"      value={state.shadowSpread ?? 0}   min={-20} max={60}  unit="px" onChange={v => onChange({ shadowSpread: v })} />
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
        <SectionLabel>Inner Shadow & Glow</SectionLabel>
        <Slider label="Inner Shadow" value={state.innerShadow} min={0} max={100} onChange={v => onChange({ innerShadow: v })} />
        <Slider label="Inner Glow"   value={state.innerGlowIntensity ?? 0} min={0} max={100} onChange={v => onChange({ innerGlowIntensity: v })} />
        {(state.innerGlowIntensity ?? 0) > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color"
              value={state.innerGlowColor?.startsWith('rgba') ? '#ffffff' : (state.innerGlowColor ?? '#ffffff')}
              onChange={e => onChange({ innerGlowColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <ColorDots colors={GLOW_COLORS} active={state.innerGlowColor ?? ''} onSelect={v => onChange({ innerGlowColor: v })} />
          </div>
        )}
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
          <>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.colorOverlay}
                onChange={e => onChange({ colorOverlay: e.target.value })}
                className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-9 rounded-xl ring-1 ring-white/10" style={{ background: state.colorOverlay }} />
            </div>
            <div>
              <p className="text-[9.5px] text-white/25 mb-1.5">Blend Mode</p>
              <div className="grid grid-cols-4 gap-1.5">
                {['color', 'multiply', 'screen', 'overlay'].map(m => (
                  <QuickChip key={m} active={(state.colorOverlayBlendMode ?? 'color') === m}
                    onClick={() => onChange({ colorOverlayBlendMode: m })}>
                    {m.charAt(0).toUpperCase() + m.slice(1)}
                  </QuickChip>
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Atmospheric</SectionLabel>
        <Slider label="Vignette"   value={state.vignette}       min={0} max={100} onChange={v => onChange({ vignette: v })} />
        {state.vignette > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/35">Color</span>
            <input type="color" value={state.vignetteColor ?? '#000000'}
              onChange={e => onChange({ vignetteColor: e.target.value })}
              className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
            <div className="flex gap-1.5 ml-auto">
              {['#000000', '#ffffff', '#1a0a3e', '#0a1a3e', '#1a0a0a'].map(c => (
                <button key={c} onClick={() => onChange({ vignetteColor: c })}
                  className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                  style={{ background: c }} />
              ))}
            </div>
          </div>
        )}
        <Slider label="Scanlines"  value={state.scanlines}      min={0} max={100} onChange={v => onChange({ scanlines: v })} />
        {state.scanlines > 0 && (
          <>
            <Slider label="Line Spacing" value={state.scanlinesSpacing ?? 4} min={2} max={12}
              onChange={v => onChange({ scanlinesSpacing: v })} />
            <div className="grid grid-cols-2 gap-1.5">
              <QuickChip active={(state.scanlinesColor ?? 'dark') === 'dark'} onClick={() => onChange({ scanlinesColor: 'dark' })}>Dark Lines</QuickChip>
              <QuickChip active={(state.scanlinesColor ?? 'dark') === 'light'} onClick={() => onChange({ scanlinesColor: 'light' })}>Light Lines</QuickChip>
            </div>
          </>
        )}
        <Slider label="Film Grain" value={state.filmGrain ?? 0} min={0} max={100} onChange={v => onChange({ filmGrain: v })} />
      </Card>

      <Card>
        <SectionLabel>Overlays</SectionLabel>
        <Slider label="Light Leak" value={state.lightLeak ?? 0} min={0} max={100} onChange={v => onChange({ lightLeak: v })} />
        {(state.lightLeak ?? 0) > 0 && (
          <div>
            <p className="text-[9.5px] text-white/25 mb-1.5">Leak Position</p>
            <div className="grid grid-cols-4 gap-1.5">
              {[{ v: 315, l: '↖ TL' }, { v: 45, l: '↗ TR' }, { v: 225, l: '↙ BL' }, { v: 135, l: '↘ BR' }, { v: 0, l: '↑ Top' }, { v: 90, l: '→ Right' }, { v: 180, l: '↓ Bot' }, { v: 270, l: '← Left' }].map(p => (
                <QuickChip key={p.v} active={(state.lightLeakAngle ?? 315) === p.v} onClick={() => onChange({ lightLeakAngle: p.v })}>{p.l}</QuickChip>
              ))}
            </div>
          </div>
        )}
        <Slider label="Prism Effect" value={state.prismEffect ?? 0} min={0} max={100} onChange={v => onChange({ prismEffect: v })} />
        <Slider label="Fog / Haze"   value={state.fog ?? 0}          min={0} max={100} onChange={v => onChange({ fog: v })} />
        <Slider label="Stars"        value={state.stars ?? 0}        min={0} max={100} onChange={v => onChange({ stars: v })} />
        <Slider label="Rain"         value={state.rain ?? 0}         min={0} max={100} onChange={v => onChange({ rain: v })} />
        <Slider label="Halftone"     value={state.halftone ?? 0}     min={0} max={100} onChange={v => onChange({ halftone: v })} />
        <Slider label="Lens Flare"   value={state.lensFlare ?? 0}    min={0} max={100} onChange={v => onChange({ lensFlare: v })} />
        {(state.lensFlare ?? 0) > 0 && (
          <>
            <Slider label="Flare X" value={state.lensFlareX ?? 20} min={0} max={100} unit="%" onChange={v => onChange({ lensFlareX: v })} />
            <Slider label="Flare Y" value={state.lensFlareY ?? 15} min={0} max={100} unit="%" onChange={v => onChange({ lensFlareY: v })} />
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Sunburst Rays</SectionLabel>
        <Slider label="Intensity" value={state.sunburst ?? 0} min={0} max={100} onChange={v => onChange({ sunburst: v })} />
        {(state.sunburst ?? 0) > 0 && (
          <>
            <Slider label="Origin X" value={state.sunburstX ?? 50} min={0} max={100} unit="%" onChange={v => onChange({ sunburstX: v })} />
            <Slider label="Origin Y" value={state.sunburstY ?? 50} min={0} max={100} unit="%" onChange={v => onChange({ sunburstY: v })} />
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35">Ray Color</span>
              <input type="color" value={state.sunburstColor ?? '#ffee88'}
                onChange={e => onChange({ sunburstColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#ffee88', '#ffffff', '#ffa500', '#ff6600', '#aaffaa'].map(c => (
                  <button key={c} onClick={() => onChange({ sunburstColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Glitch & Distortion</SectionLabel>
        <Slider label="Glitch"            value={state.glitch ?? 0}           min={0} max={100} onChange={v => onChange({ glitch: v })} />
        <Slider label="Chroma Aberration" value={state.chromaAberration ?? 0} min={0} max={20}  onChange={v => onChange({ chromaAberration: v })} />
      </Card>

      <ResetBtn
        onClick={() => onChange({
          shadow: 0, shadowX: 0, shadowY: 0, shadowBlur: 0, shadowSpread: 0,
          glowIntensity: 0, innerShadow: 0, innerGlowIntensity: 0,
          borderWidth: 0, colorOverlayOpacity: 0,
          vignette: 0, scanlines: 0, filmGrain: 0,
          lightLeak: 0, fog: 0, stars: 0, rain: 0, halftone: 0,
          lensFlare: 0, glitch: 0, chromaAberration: 0, spotlight: 0,
          prismEffect: 0, sunburst: 0,
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
        <Slider label="Brightness" value={state.brightness}        min={50}  max={150} unit="%" onChange={v => onChange({ brightness: v })} />
        <Slider label="Contrast"   value={state.contrast}          min={50}  max={150} unit="%" onChange={v => onChange({ contrast: v })} />
        <Slider label="Saturation" value={state.saturation}        min={0}   max={200} unit="%" onChange={v => onChange({ saturation: v })} />
        <Slider label="Vibrance"   value={state.vibrance ?? 0}     min={-100} max={100}          onChange={v => onChange({ vibrance: v })} />
        <Slider label="Blur"       value={state.blur}              min={0}   max={20}  step={0.5} unit="px" onChange={v => onChange({ blur: v })} />
        <ResetBtn onClick={() => onChange({ brightness: 100, contrast: 100, saturation: 100, blur: 0, vibrance: 0 })} label="Reset Tone" />
      </Card>

      <Card>
        <SectionLabel>Advanced Tone</SectionLabel>
        <Slider label="Temperature" value={state.temperature ?? 0} min={-100} max={100} onChange={v => onChange({ temperature: v })} />
        <p className="text-[8.5px] text-white/20 -mt-1">
          {(state.temperature ?? 0) > 0 ? 'Warm →' : (state.temperature ?? 0) < 0 ? '← Cool' : 'Neutral'}
        </p>
        <Slider label="Highlights"   value={state.highlights ?? 0}   min={-100} max={100} onChange={v => onChange({ highlights: v })} />
        <Slider label="Shadows"      value={state.shadows ?? 0}      min={-100} max={100} onChange={v => onChange({ shadows: v })} />
        <Slider label="Fade / Matte" value={state.fade ?? 0}         min={0}    max={100} onChange={v => onChange({ fade: v })} />
        <Slider label="Sharpness"    value={state.sharpness ?? 0}    min={0}    max={100} onChange={v => onChange({ sharpness: v })} />
        <Slider label="Image Noise"  value={state.noiseOnImage ?? 0} min={0}    max={100} onChange={v => onChange({ noiseOnImage: v })} />
        <ResetBtn onClick={() => onChange({ temperature: 0, highlights: 0, shadows: 0, fade: 0, sharpness: 0, noiseOnImage: 0 })} label="Reset Advanced" />
      </Card>

      <Card>
        <SectionLabel>Film Look</SectionLabel>
        <div className="grid grid-cols-4 gap-1.5">
          {FILM_LOOKS.map(f => (
            <button key={f.id} onClick={() => onChange({ filmLook: f.id })}
              className={`py-2 rounded-lg text-[9px] font-medium transition-all ring-1 ${
                (state.filmLook ?? 'none') === f.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                  : 'bg-white/[0.03] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
              }`}>
              {f.name}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Filters</SectionLabel>
        <Slider label="Sepia"      value={state.sepia ?? 0}     min={0}    max={100} unit="%" onChange={v => onChange({ sepia: v })} />
        <Slider label="Grayscale"  value={state.grayscale ?? 0} min={0}    max={100} unit="%" onChange={v => onChange({ grayscale: v })} />
        <Slider label="Hue Shift"  value={state.hueRotate ?? 0} min={-180} max={180} unit="°" onChange={v => onChange({ hueRotate: v })} />
        <Toggle label="Invert Colors"   value={state.invert ?? false}  onChange={v => onChange({ invert: v })} />
        <Toggle label="Flip Horizontal" value={state.flipX}            onChange={v => onChange({ flipX: v })} />
        <Toggle label="Flip Vertical"   value={state.flipY ?? false}   onChange={v => onChange({ flipY: v })} />
        <ResetBtn onClick={() => onChange({ sepia: 0, grayscale: 0, hueRotate: 0, invert: false, flipX: false, flipY: false })} label="Reset Filters" />
      </Card>

      <Card>
        <SectionLabel>Duotone</SectionLabel>
        <Toggle label="Enable Duotone" value={state.duotone ?? false} onChange={v => onChange({ duotone: v })}
          desc="Converts to grayscale then maps two colors" />
        {state.duotone && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Highlight</span>
              <input type="color" value={state.duotoneHighlight ?? '#ff6600'}
                onChange={e => onChange({ duotoneHighlight: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.duotoneHighlight }} />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Shadow</span>
              <input type="color" value={state.duotoneShadow ?? '#3300cc'}
                onChange={e => onChange({ duotoneShadow: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.duotoneShadow }} />
            </div>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { h: '#ff6600', s: '#3300cc', l: 'Sunset' },
                { h: '#00ffcc', s: '#003366', l: 'Ocean' },
                { h: '#ff00ff', s: '#111100', l: 'Neon' },
                { h: '#ffdd00', s: '#660066', l: 'Gold' },
                { h: '#ffffff', s: '#000066', l: 'Mono' },
                { h: '#ff3366', s: '#003300', l: 'Rose' },
              ].map(p => (
                <button key={p.l}
                  onClick={() => onChange({ duotoneHighlight: p.h, duotoneShadow: p.s })}
                  className="py-2 rounded-lg text-[9px] text-white/40 ring-1 ring-white/[0.06] hover:bg-white/[0.07] transition-all overflow-hidden relative">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.s}, ${p.h})` }} />
                  <span className="relative z-10 font-medium text-white/80">{p.l}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Split Tone</SectionLabel>
        <Toggle label="Enable Split Tone" value={state.splitTone ?? false} onChange={v => onChange({ splitTone: v })}
          desc="Tints highlights & shadows with different colors" />
        {(state.splitTone ?? false) && (
          <>
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Highlights</span>
              <input type="color" value={state.splitToneHighlightColor ?? '#ffcc66'}
                onChange={e => onChange({ splitToneHighlightColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.splitToneHighlightColor }} />
            </div>
            <Slider label="Highlight Strength" value={state.splitToneHighlightStrength ?? 30} min={0} max={100}
              onChange={v => onChange({ splitToneHighlightStrength: v })} />
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-white/35 w-20">Shadows</span>
              <input type="color" value={state.splitToneShadowColor ?? '#3366cc'}
                onChange={e => onChange({ splitToneShadowColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex-1 h-8 rounded-lg ring-1 ring-white/10" style={{ background: state.splitToneShadowColor }} />
            </div>
            <Slider label="Shadow Strength" value={state.splitToneShadowStrength ?? 30} min={0} max={100}
              onChange={v => onChange({ splitToneShadowStrength: v })} />
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { h: '#ffcc66', s: '#3366cc', l: 'Classic' },
                { h: '#ff9966', s: '#6633cc', l: 'Warm/Cool' },
                { h: '#ffeeaa', s: '#2244aa', l: 'Sepia/Blue' },
                { h: '#aaffcc', s: '#334488', l: 'Teal/Navy' },
                { h: '#ffccff', s: '#224422', l: 'Pink/Grn' },
                { h: '#ffffff', s: '#334466', l: 'White/Blue' },
              ].map(p => (
                <button key={p.l}
                  onClick={() => onChange({ splitToneHighlightColor: p.h, splitToneShadowColor: p.s })}
                  className="py-2 rounded-lg text-[9px] text-white/40 ring-1 ring-white/[0.06] hover:bg-white/[0.07] transition-all overflow-hidden relative">
                  <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${p.s}, ${p.h})` }} />
                  <span className="relative z-10 font-medium text-white/80">{p.l}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Tilt Shift (Miniature)</SectionLabel>
        <Toggle label="Enable Tilt Shift" value={state.tiltShift ?? false} onChange={v => onChange({ tiltShift: v })}
          desc="Blurs top & bottom, leaving a sharp band in the middle" />
        {(state.tiltShift ?? false) && (
          <>
            <Slider label="Blur Amount" value={state.tiltShiftBlur ?? 10}   min={1}  max={30}  unit="px" onChange={v => onChange({ tiltShiftBlur: v })} />
            <Slider label="Center"      value={state.tiltShiftCenter ?? 50} min={10} max={90} unit="%"  onChange={v => onChange({ tiltShiftCenter: v })} />
            <Slider label="Sharp Range" value={state.tiltShiftRange ?? 30}  min={5}  max={80} unit="%"  onChange={v => onChange({ tiltShiftRange: v })} />
          </>
        )}
      </Card>
    </div>
  );

  /* ── 3D tab ─────────────────────────────────────── */
  const renderTransformTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>3D Transform</SectionLabel>
        <Slider label="Tilt X"   value={state.tiltX}                    min={-30} max={30}  unit="°"  onChange={v => onChange({ tiltX: v })} />
        <Slider label="Tilt Y"   value={state.tiltY}                    min={-30} max={30}  unit="°"  onChange={v => onChange({ tiltY: v })} />
        <Slider label="Scale"    value={Math.round(state.scale * 100)}  min={50}  max={150} unit="%"  onChange={v => onChange({ scale: v / 100 })} />
        <Slider label="Rotation" value={state.rotation}                 min={-45} max={45}  unit="°"  onChange={v => onChange({ rotation: v })} />
        <Slider label="Skew X"   value={state.skewX ?? 0}               min={-30} max={30}  unit="°"  onChange={v => onChange({ skewX: v })} />
        <Slider label="Skew Y"   value={state.skewY ?? 0}               min={-30} max={30}  unit="°"  onChange={v => onChange({ skewY: v })} />
        <Slider label="Perspective" value={state.perspectiveDistance ?? 1000} min={300} max={2000} unit="px"
          onChange={v => onChange({ perspectiveDistance: v })} />
        <ResetBtn onClick={() => onChange({ tiltX: 0, tiltY: 0, scale: 1, rotation: 0, skewX: 0, skewY: 0, perspectiveDistance: 1000 })} label="Reset Transform" />
      </Card>

      <Card>
        <SectionLabel>Perspective Presets</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { name: 'Flat',       tiltX: 0,   tiltY: 0,   skewX: 0 },
            { name: 'Left',       tiltX: 0,   tiltY: 12,  skewX: 0 },
            { name: 'Right',      tiltX: 0,   tiltY: -12, skewX: 0 },
            { name: 'Top',        tiltX: -12, tiltY: 0,   skewX: 0 },
            { name: 'Bottom',     tiltX: 12,  tiltY: 0,   skewX: 0 },
            { name: 'Corner',     tiltX: 6,   tiltY: -9,  skewX: 0 },
            { name: 'Isometric',  tiltX: 15,  tiltY: -15, skewX: 0 },
            { name: 'Dramatic',   tiltX: 20,  tiltY: -20, skewX: 0 },
            { name: 'Cinematic',  tiltX: 5,   tiltY: -5,  skewX: 3 },
          ].map(p => (
            <QuickChip key={p.name}
              active={state.tiltX === p.tiltX && state.tiltY === p.tiltY && (state.skewX ?? 0) === p.skewX}
              onClick={() => onChange({ tiltX: p.tiltX, tiltY: p.tiltY, skewX: p.skewX })}>
              {p.name}
            </QuickChip>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Reflection</SectionLabel>
        <Toggle label="Mirror Reflection" value={state.reflection} onChange={v => onChange({ reflection: v })} />
        {state.reflection && (
          <>
            <Slider label="Opacity" value={state.reflectionOpacity ?? 35} min={5} max={100} unit="%"
              onChange={v => onChange({ reflectionOpacity: v })} />
            <Slider label="Height"  value={state.reflectionHeight ?? 60}  min={10} max={100} unit="%"
              onChange={v => onChange({ reflectionHeight: v })} />
          </>
        )}
      </Card>
    </div>
  );

  /* ── Brand tab ──────────────────────────────────── */
  const renderBrandTab = () => (
    <div className="space-y-3">
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
        <input type="text" placeholder="Body text / description…" value={state.bodyText ?? ''}
          onChange={e => onChange({ bodyText: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
      </Card>

      {(state.titleText || state.subtitleText || state.bodyText) && (
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
            <Slider label="Title Size"     value={state.titleSize}           min={12} max={96} unit="px" onChange={v => onChange({ titleSize: v })} />
            <Slider label="Subtitle Size"  value={state.subtitleSize}        min={10} max={48} unit="px" onChange={v => onChange({ subtitleSize: v })} />
            {state.bodyText && (
              <Slider label="Body Size" value={state.bodySize ?? 14} min={10} max={36} unit="px" onChange={v => onChange({ bodySize: v })} />
            )}
            <Slider label="Letter Spacing" value={state.letterSpacing ?? 0}  min={0}  max={20} unit="px" onChange={v => onChange({ letterSpacing: v })} />
            <Slider label="Word Spacing"   value={state.wordSpacing ?? 0}    min={0}  max={20} unit="px" onChange={v => onChange({ wordSpacing: v })} />
            <Slider label="Line Height"    value={state.lineHeight ?? 1.25}  min={1}  max={3}  step={0.05}
              onChange={v => onChange({ lineHeight: v })} />
            <Slider label="Title Opacity"  value={state.titleOpacity ?? 100} min={10} max={100} unit="%"
              onChange={v => onChange({ titleOpacity: v })} />
            <Slider label="Text Rotation"  value={state.textRotation ?? 0}   min={-45} max={45} unit="°"
              onChange={v => onChange({ textRotation: v })} />
            <div className="grid grid-cols-4 gap-1.5 mt-1">
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
            <div className="grid grid-cols-2 gap-1.5">
              <Toggle label="Italic"   value={state.titleItalic ?? false}  onChange={v => onChange({ titleItalic: v })} />
              <Toggle label="All Caps" value={state.titleAllCaps ?? false} onChange={v => onChange({ titleAllCaps: v })} />
            </div>
            <Toggle label="Text Shadow" value={state.titleShadow ?? false} onChange={v => onChange({ titleShadow: v })} />
          </Card>

          <Card>
            <SectionLabel>Neon Glow Text</SectionLabel>
            <Toggle label="Enable Neon Glow" value={state.neonTextGlow ?? false} onChange={v => onChange({ neonTextGlow: v })}
              desc="Adds a glowing neon effect to the title text" />
            {(state.neonTextGlow ?? false) && (
              <>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-white/35">Glow Color</span>
                  <input type="color" value={state.neonGlowColor ?? '#00ffff'}
                    onChange={e => onChange({ neonGlowColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#00ffff', '#ff00ff', '#00ff00', '#ffff00', '#ff6600', '#ffffff'].map(c => (
                      <button key={c} onClick={() => onChange({ neonGlowColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                        style={{ background: c, boxShadow: `0 0 6px ${c}` }} />
                    ))}
                  </div>
                </div>
                <Slider label="Glow Intensity" value={state.neonGlowIntensity ?? 60} min={10} max={120}
                  onChange={v => onChange({ neonGlowIntensity: v })} />
              </>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Style</SectionLabel>
            <Slider label="Stroke Width" value={state.textStroke ?? 0} min={0} max={8} unit="px"
              onChange={v => onChange({ textStroke: v })} />
            {(state.textStroke ?? 0) > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-white/35">Stroke</span>
                <input type="color" value={state.textStrokeColor ?? '#000000'}
                  onChange={e => onChange({ textStrokeColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              </div>
            )}
            <div>
              <p className="text-[9.5px] text-white/25 mb-1.5">Text Background</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[{ id: 'none', l: 'None' }, { id: 'pill', l: 'Pill' }, { id: 'box', l: 'Box' }].map(t => (
                  <QuickChip key={t.id} active={(state.textBg ?? 'none') === t.id}
                    onClick={() => onChange({ textBg: t.id })}>{t.l}</QuickChip>
                ))}
              </div>
            </div>
            {(state.textBg ?? 'none') !== 'none' && (
              <>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-white/35">BG Color</span>
                  <input type="color" value={state.textBgColor ?? '#000000'}
                    onChange={e => onChange({ textBgColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
                  <div className="flex gap-1.5 ml-auto">
                    {['#000000', '#ffffff', '#1a1a2e', '#8b5cf6', '#ec4899', '#f59e0b'].map(c => (
                      <button key={c} onClick={() => onChange({ textBgColor: c })}
                        className="w-5 h-5 rounded-full ring-1 ring-white/15" style={{ background: c }} />
                    ))}
                  </div>
                </div>
                <Slider label="BG Opacity" value={state.textBgOpacity ?? 50} min={10} max={100} unit="%"
                  onChange={v => onChange({ textBgOpacity: v })} />
              </>
            )}
            <Toggle label="Gradient Text" value={state.titleGradient ?? false} onChange={v => onChange({ titleGradient: v })} />
            {(state.titleGradient ?? false) && (
              <div className="flex items-center gap-3">
                <span className="text-[10px] text-white/35">2nd Color</span>
                <input type="color" value={state.titleGradientColor2 ?? '#ec4899'}
                  onChange={e => onChange({ titleGradientColor2: e.target.value })}
                  className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent" />
                <div className="flex-1 h-9 rounded-xl ring-1 ring-white/10"
                  style={{ background: `linear-gradient(135deg, ${state.titleColor}, ${state.titleGradientColor2 ?? '#ec4899'})` }} />
              </div>
            )}
          </Card>

          <Card>
            <SectionLabel>Text Colors</SectionLabel>
            {[
              { label: 'Title',    val: state.titleColor,    key: 'titleColor' },
              { label: 'Subtitle', val: state.subtitleColor.startsWith('rgba') ? '#999999' : state.subtitleColor, key: 'subtitleColor' },
              ...(state.bodyText ? [{ label: 'Body', val: state.bodyColor?.startsWith('rgba') ? '#888888' : (state.bodyColor ?? '#888888'), key: 'bodyColor' }] : []),
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

      <Card>
        <SectionLabel>Badge / Label</SectionLabel>
        <input type="text" placeholder="Badge text (e.g. NEW, BETA, PRO)…" value={state.badge ?? ''}
          onChange={e => onChange({ badge: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        {(state.badge ?? '').length > 0 && (
          <>
            <div className="grid grid-cols-3 gap-1.5">
              <p className="col-span-3 text-[9.5px] text-white/25">Quick Labels</p>
              {['NEW', 'HOT', 'PRO', 'BETA', 'SALE', '🔥'].map(b => (
                <QuickChip key={b} active={state.badge === b} onClick={() => onChange({ badge: b })}>{b}</QuickChip>
              ))}
            </div>
            <div>
              <p className="text-[9.5px] text-white/25 mb-1.5">Position</p>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'tl', label: '↖ TL' }, { id: 'tc', label: '↑ TC' }, { id: 'tr', label: '↗ TR' },
                  { id: 'bl', label: '↙ BL' }, { id: 'bc', label: '↓ BC' }, { id: 'br', label: '↘ BR' },
                ].map(p => (
                  <QuickChip key={p.id} active={(state.badgePosition ?? 'tr') === p.id}
                    onClick={() => onChange({ badgePosition: p.id })}>{p.label}</QuickChip>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] text-white/35">Color</span>
              <input type="color" value={state.badgeColor ?? '#8b5cf6'}
                onChange={e => onChange({ badgeColor: e.target.value })}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent" />
              <div className="flex gap-1.5 ml-auto">
                {['#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'].map(c => (
                  <button key={c} onClick={() => onChange({ badgeColor: c })}
                    className="w-5 h-5 rounded-full ring-1 ring-white/15 hover:scale-110 transition-all"
                    style={{ background: c }} />
                ))}
              </div>
            </div>
          </>
        )}
      </Card>

      <Card>
        <SectionLabel>Emoji Sticker</SectionLabel>
        <input type="text" placeholder="Paste an emoji (e.g. 🔥 🎉 ✨)…" value={state.emojiOverlay ?? ''}
          onChange={e => onChange({ emojiOverlay: e.target.value })}
          className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] text-white text-2xl
            placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all" />
        {(state.emojiOverlay ?? '').length > 0 && (
          <>
            <div className="grid grid-cols-6 gap-1.5">
              {['🔥', '✨', '🎉', '💎', '🚀', '⚡', '❤️', '🌊', '🎯', '💫', '🏆', '👑'].map(e => (
                <button key={e} onClick={() => onChange({ emojiOverlay: e })}
                  className="py-2 text-xl rounded-lg ring-1 ring-white/[0.06] hover:bg-white/[0.08] transition-all">
                  {e}
                </button>
              ))}
            </div>
            <Slider label="Size"    value={state.emojiSize ?? 48}      min={16} max={160} unit="px" onChange={v => onChange({ emojiSize: v })} />
            <Slider label="X Pos"   value={state.emojiPositionX ?? 50} min={0}  max={100} unit="%"  onChange={v => onChange({ emojiPositionX: v })} />
            <Slider label="Y Pos"   value={state.emojiPositionY ?? 50} min={0}  max={100} unit="%"  onChange={v => onChange({ emojiPositionY: v })} />
          </>
        )}
      </Card>

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

  /* ── Export tab ─────────────────────────────────── */
  const renderExportTab = () => {
    const fmt = state.exportFormat ?? 'png';
    const handleWebShare = async () => {
      if (!navigator.share) { alert('Web Share not supported in this browser.'); return; }
      try {
        await navigator.share({ title: 'SnapFrame Export', text: 'Created with SnapFrame' });
      } catch { /* user cancelled */ }
    };

    return (
      <div className="space-y-3">
        <Card>
          <SectionLabel>Format</SectionLabel>
          <div className="grid grid-cols-3 gap-1.5">
            {(['png', 'jpeg', 'webp'] as const).map(f => (
              <button key={f} onClick={() => onChange({ exportFormat: f })}
                className={`py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ring-1 ${
                  fmt === f
                    ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                    : 'bg-white/[0.04] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
                }`}>
                {f}
              </button>
            ))}
          </div>
          <div className="text-[9px] text-white/20">
            {fmt === 'png'  && 'Lossless · best for text & UI · supports transparency'}
            {fmt === 'jpeg' && 'Smaller file · no transparency · great for photos'}
            {fmt === 'webp' && 'Best compression · modern browsers only'}
          </div>
          {fmt === 'png' && (
            <Toggle label="Transparent Background" value={state.exportTransparent ?? false}
              onChange={v => onChange({ exportTransparent: v })}
              desc="Exports with no background (alpha channel)" />
          )}
          {(fmt === 'jpeg' || fmt === 'webp') && (
            <Slider label="Quality" value={state.exportQuality ?? 92} min={50} max={100} unit="%"
              onChange={v => onChange({ exportQuality: v })} />
          )}
        </Card>

        <Card>
          <SectionLabel>Resolution</SectionLabel>
          <div className="grid grid-cols-4 gap-1.5">
            {[1, 2, 3, 4].map(s => (
              <button key={s} onClick={() => onChange({ exportScale: s })}
                className={`py-2.5 rounded-xl text-xs font-bold transition-all ring-1 ${
                  (state.exportScale ?? 2) === s
                    ? 'bg-brand-500/20 text-brand-300 ring-brand-500/40'
                    : 'bg-white/[0.04] text-white/35 ring-white/[0.06] hover:bg-white/[0.08]'
                }`}>
                {s}×
              </button>
            ))}
          </div>
          <p className="text-[9px] text-white/20">
            {(state.exportScale ?? 2)}× = ~{(state.exportScale ?? 2) * 1200} × {(state.exportScale ?? 2) * 800} px typical
          </p>
        </Card>

        <Card>
          <SectionLabel>Filename</SectionLabel>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="snapframe-export"
              value={state.exportFilename ?? ''}
              onChange={e => onChange({ exportFilename: e.target.value })}
              className="flex-1 px-3 py-2 rounded-xl bg-white/[0.06] text-white text-xs
                placeholder:text-white/20 ring-1 ring-white/[0.09] focus:ring-brand-500/50
                focus:bg-white/[0.09] outline-none transition-all"
            />
            <span className="text-[10px] text-white/25">.{fmt}</span>
          </div>
        </Card>

        <Card>
          <SectionLabel>Actions</SectionLabel>
          <button onClick={() => onExport(fmt)} disabled={isExporting}
            className="w-full py-3 rounded-2xl font-semibold text-white text-sm
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
          <div className="grid grid-cols-2 gap-1.5">
            <button onClick={onCopy}
              className={`py-2.5 rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5 ring-1 ${
                copySuccess
                  ? 'bg-green-500/20 text-green-300 ring-green-500/30'
                  : 'bg-white/[0.05] text-white/45 ring-white/[0.08] hover:bg-white/[0.09] hover:text-white/70'
              }`}>
              {copySuccess ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copySuccess ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={handleWebShare}
              className="py-2.5 rounded-xl text-xs font-medium bg-white/[0.05] text-white/45 ring-1 ring-white/[0.08]
                hover:bg-white/[0.09] hover:text-white/70 transition-all flex items-center justify-center gap-1.5">
              <Share2 className="w-3.5 h-3.5" /> Share
            </button>
          </div>
        </Card>

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
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'style':     return renderStyleTab();
      case 'bg':        return renderBgTab();
      case 'layout':    return renderLayoutTab();
      case 'fx':        return renderFxTab();
      case 'adjust':    return renderAdjustTab();
      case 'transform': return renderTransformTab();
      case 'brand':     return renderBrandTab();
      case 'export':    return renderExportTab();
    }
  };

  const fmt = state.exportFormat ?? 'png';

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
      <div className="shrink-0 flex bg-black/25 border-b border-white/[0.05] overflow-x-auto no-scrollbar">
        {TABS.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setActiveTab(id)}
            className={`flex-1 min-w-[3rem] flex flex-col items-center gap-[3px] py-2.5 text-[7px] font-bold uppercase tracking-wider transition-all border-b-2 ${
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

      {/* Pinned bottom bar (only when not on export tab) */}
      {activeTab !== 'export' && (
        <div className="shrink-0 border-t border-white/[0.07] px-3 pt-2.5 pb-3 space-y-2 bg-[#0b0b17]">
          <div className="flex gap-1.5">
            <button onClick={() => onExport(fmt)} disabled={isExporting}
              className="flex-1 py-2.5 rounded-2xl font-semibold text-white text-sm
                bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
                transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/30
                flex items-center justify-center gap-2 active:scale-[0.98]
                disabled:opacity-60 disabled:cursor-not-allowed">
              {isExporting ? (
                <><div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Exporting…</>
              ) : (
                <><Download className="w-3.5 h-3.5" />Export</>
              )}
            </button>
            <button onClick={onCopy} title="Copy (Ctrl+Shift+C)"
              className={`px-3 py-2.5 rounded-2xl text-sm transition-all duration-200
                flex items-center justify-center active:scale-[0.98] ring-1 ${
                copySuccess
                  ? 'bg-green-500/20 text-green-300 ring-green-500/30'
                  : 'bg-white/[0.06] text-white/45 ring-white/10 hover:bg-white/[0.1] hover:text-white/70'
              }`}>
              {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
            <button onClick={() => setActiveTab('export')} title="Export options"
              className="px-3 py-2.5 rounded-2xl text-sm bg-white/[0.06] text-white/35
                ring-1 ring-white/10 hover:bg-white/[0.1] hover:text-white/60 transition-all">
              <Grid3X3 className="w-4 h-4" />
            </button>
          </div>
          <div className="flex gap-1.5">
            <button onClick={onReset}
              className="flex-1 py-1.5 rounded-xl text-[10px] font-medium bg-white/[0.04] text-white/35
                hover:bg-white/[0.08] hover:text-white/60 transition-all flex items-center justify-center gap-1">
              <RotateCcw className="w-3 h-3" /> Reset
            </button>
            <button onClick={onRemoveImage}
              className="flex-1 py-1.5 rounded-xl text-[10px] font-medium bg-white/[0.04] text-white/35
                hover:bg-red-500/[0.1] hover:text-red-400/80 transition-all flex items-center justify-center gap-1">
              <FlipHorizontal2 className="w-3 h-3" /> Remove
            </button>
          </div>
          {state.watermark && (
            <button onClick={onUpgrade}
              className="w-full py-2 rounded-2xl text-xs font-semibold
                bg-gradient-to-r from-amber-500/12 to-orange-500/12 text-amber-300
                hover:from-amber-500/20 hover:to-orange-500/20 transition-all
                flex items-center justify-center gap-1.5 ring-1 ring-amber-500/20">
              <Sparkles className="w-3 h-3" /> Remove Watermark — $9.99
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ControlsPanel;
