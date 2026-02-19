import React, { useState, useRef } from 'react';
import {
  Palette, Download, Sparkles, RotateCcw,
  Smartphone, Globe, MonitorSmartphone, X, Type,
  SlidersHorizontal, RectangleHorizontal,
  Copy, Check, Undo2, Redo2, Wand2, ImagePlus, Trash2,
  FlipHorizontal2, Box,
} from 'lucide-react';
import {
  EditorState,
  GRADIENT_PRESETS,
  SHADOW_COLORS,
  ASPECT_PRESETS,
  BG_PATTERNS,
  TITLE_FONTS,
  STYLE_TEMPLATES,
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
}

const TABS = [
  { id: 'style', label: 'Style', Icon: Wand2 },
  { id: 'bg', label: 'BG', Icon: Palette },
  { id: 'canvas', label: 'Canvas', Icon: RectangleHorizontal },
  { id: 'adjust', label: 'Adjust', Icon: SlidersHorizontal },
  { id: 'transform', label: '3D', Icon: Box },
  { id: 'text', label: 'Text', Icon: Type },
] as const;

type TabId = typeof TABS[number]['id'];

/* ── Reusable primitives ─────────────────────────────── */

const SliderRow: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, unit = '', onChange }) => (
  <div className="space-y-1.5">
    <div className="flex items-center justify-between">
      <span className="text-xs text-white/50">{label}</span>
      <span className="text-[11px] text-white/70 font-mono bg-white/[0.08] px-2 py-0.5 rounded-md min-w-[44px] text-center tabular-nums">
        {value}{unit}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full"
    />
  </div>
);

const ToggleRow: React.FC<{
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}> = ({ label, value, onChange }) => (
  <div className="flex items-center justify-between py-0.5">
    <span className="text-xs text-white/50">{label}</span>
    <button
      onClick={() => onChange(!value)}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 flex-shrink-0 ${
        value ? 'bg-brand-500' : 'bg-white/10'
      }`}
      role="switch"
      aria-checked={value}
    >
      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all duration-200 ${
        value ? 'left-6' : 'left-1'
      }`} />
    </button>
  </div>
);

const SectionLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30">{children}</p>
);

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <div className={`rounded-xl bg-white/[0.04] ring-1 ring-white/[0.07] p-3.5 space-y-3 ${className}`}>
    {children}
  </div>
);

/* ── Main component ──────────────────────────────────── */

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  state, onChange, onExport, onCopy, copySuccess,
  onReset, onUpgrade, onRemoveImage, onUndo, onRedo, canUndo, canRedo,
}) => {
  const [activeTab, setActiveTab] = useState<TabId>('style');
  const bgImageInputRef = useRef<HTMLInputElement>(null);

  const handleBgImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      if (ev.target?.result) {
        onChange({ bgImage: ev.target.result as string, backgroundId: 'image' });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  /* ── Tab content ── */

  const renderStyleTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Quick Styles</SectionLabel>
        <div className="grid grid-cols-4 gap-2">
          {STYLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onChange(tmpl.overrides)}
              className="flex flex-col items-center gap-1.5 py-3 px-1 rounded-xl text-[10px] font-medium
                bg-white/[0.04] text-white/50 ring-1 ring-white/[0.07]
                hover:bg-white/[0.09] hover:text-white/80 hover:ring-brand-500/30
                transition-all active:scale-95"
            >
              <span className="text-xl leading-none">{tmpl.emoji}</span>
              <span>{tmpl.name}</span>
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Canvas Size</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {ASPECT_PRESETS.map((a) => (
            <button
              key={a.id}
              onClick={() => onChange({ aspectRatio: a.id })}
              className={`px-2 py-2.5 rounded-lg text-[10px] font-medium transition-all flex flex-col items-center gap-0.5 ring-1 ${
                state.aspectRatio === a.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/50'
                  : 'bg-white/[0.04] text-white/40 ring-white/[0.07] hover:bg-white/[0.09] hover:text-white/60'
              }`}
            >
              <span className="font-bold text-xs">{a.name}</span>
              <span className="text-[9px] opacity-60">{a.label}</span>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderBgTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Gradient Presets</SectionLabel>
        <div className="grid grid-cols-6 gap-1.5">
          {GRADIENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChange({ background: preset.css, backgroundId: preset.id, bgImage: null })}
              className={`w-full aspect-square rounded-lg transition-all duration-150 hover:scale-110 ${
                state.backgroundId === preset.id
                  ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-[#0c0c18] scale-110'
                  : 'ring-1 ring-white/10 hover:ring-white/30'
              } ${preset.id === 'transparent' ? 'checkerboard' : ''}`}
              style={{ background: preset.id === 'transparent' ? undefined : preset.style }}
              title={preset.name}
            />
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Custom Gradient</SectionLabel>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={state.customBgColor1}
            onChange={(e) => {
              const bg = `linear-gradient(${state.bgAngle}deg, ${e.target.value} 0%, ${state.customBgColor2} 100%)`;
              onChange({ customBgColor1: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
            }}
            className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent flex-shrink-0"
            title="Start color"
          />
          <div
            className="flex-1 h-10 rounded-xl ring-1 ring-white/10"
            style={{ background: `linear-gradient(90deg, ${state.customBgColor1}, ${state.customBgColor2})` }}
          />
          <input
            type="color"
            value={state.customBgColor2}
            onChange={(e) => {
              const bg = `linear-gradient(${state.bgAngle}deg, ${state.customBgColor1} 0%, ${e.target.value} 100%)`;
              onChange({ customBgColor2: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
            }}
            className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent flex-shrink-0"
            title="End color"
          />
        </div>
        <SliderRow
          label="Angle"
          value={state.bgAngle}
          min={0}
          max={360}
          unit="°"
          onChange={(v) => {
            if (state.backgroundId === 'custom') {
              onChange({ bgAngle: v, background: `linear-gradient(${v}deg, ${state.customBgColor1} 0%, ${state.customBgColor2} 100%)` });
            } else {
              onChange({ bgAngle: v });
            }
          }}
        />
      </Card>

      <Card>
        <SectionLabel>Background Image</SectionLabel>
        <input ref={bgImageInputRef} type="file" accept="image/*" className="hidden" onChange={handleBgImageUpload} />
        <div className="flex gap-2">
          <button
            onClick={() => bgImageInputRef.current?.click()}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs
              bg-white/[0.04] text-white/50 ring-1 ring-white/[0.07]
              hover:bg-white/[0.09] hover:text-white/70 transition-all"
          >
            <ImagePlus className="w-3.5 h-3.5" />
            {state.bgImage ? 'Change Image' : 'Upload Image'}
          </button>
          {state.bgImage && (
            <button
              onClick={() => onChange({ bgImage: null, backgroundId: GRADIENT_PRESETS[0].id, background: GRADIENT_PRESETS[0].css })}
              className="px-3 py-2.5 rounded-lg text-xs bg-white/[0.04] text-red-400/60
                hover:bg-red-500/10 hover:text-red-400 transition-all ring-1 ring-white/[0.07]"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </Card>

      <Card>
        <SectionLabel>Patterns & Texture</SectionLabel>
        <div className="grid grid-cols-3 gap-1.5">
          {BG_PATTERNS.map((p) => (
            <button
              key={p.id}
              onClick={() => onChange({ bgPattern: p.id })}
              className={`px-2 py-2 rounded-lg text-[10px] font-medium transition-all ring-1 ${
                state.bgPattern === p.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/50'
                  : 'bg-white/[0.04] text-white/40 ring-white/[0.07] hover:bg-white/[0.09]'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
        {state.bgPattern !== 'none' && (
          <SliderRow
            label="Pattern Opacity"
            value={Math.round(state.bgPatternOpacity * 100)}
            min={1}
            max={50}
            onChange={(v) => onChange({ bgPatternOpacity: v / 100 })}
          />
        )}
        <SliderRow
          label="Noise"
          value={state.bgNoise}
          min={0}
          max={50}
          onChange={(v) => onChange({ bgNoise: v })}
        />
      </Card>
    </div>
  );

  const renderCanvasTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Device Frame</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'none', name: 'None', Icon: X },
            { id: 'browser', name: 'Browser', Icon: Globe },
            { id: 'macos', name: 'macOS', Icon: MonitorSmartphone },
            { id: 'phone', name: 'Phone', Icon: Smartphone },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ frame: f.id })}
              className={`flex items-center gap-2.5 px-3 py-3 rounded-xl text-sm font-medium transition-all ring-1 ${
                state.frame === f.id
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/50'
                  : 'bg-white/[0.04] text-white/40 ring-white/[0.07] hover:bg-white/[0.09] hover:text-white/60'
              }`}
            >
              <f.Icon className="w-4 h-4 flex-shrink-0" />
              {f.name}
            </button>
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Padding</SectionLabel>
        <SliderRow
          label="Size"
          value={state.padding}
          min={0}
          max={160}
          unit="px"
          onChange={(v) => onChange({ padding: v })}
        />
        <div className="flex gap-1.5">
          {[0, 32, 64, 96, 128].map((v) => (
            <button
              key={v}
              onClick={() => onChange({ padding: v })}
              className={`flex-1 py-1.5 text-[10px] font-medium rounded-lg transition-all ring-1 ${
                state.padding === v
                  ? 'bg-brand-500/20 text-brand-300 ring-brand-500/50'
                  : 'bg-white/[0.04] text-white/40 ring-white/[0.07] hover:bg-white/[0.09]'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <SliderRow
          label="Corner Radius"
          value={state.borderRadius}
          min={0}
          max={48}
          unit="px"
          onChange={(v) => onChange({ borderRadius: v })}
        />
      </Card>

      <Card>
        <SectionLabel>Shadow</SectionLabel>
        <SliderRow
          label="Intensity"
          value={state.shadow}
          min={0}
          max={100}
          onChange={(v) => onChange({ shadow: v })}
        />
        <div className="flex gap-2.5">
          {SHADOW_COLORS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => onChange({ shadowColor: sc.value })}
              className={`w-9 h-9 rounded-full transition-all duration-150 hover:scale-110 flex-shrink-0 ${
                state.shadowColor === sc.value
                  ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-[#0c0c18]'
                  : 'ring-1 ring-white/10 hover:ring-white/30'
              }`}
              style={{ background: sc.value.replace(/[\d.]+\)$/, '1)') }}
              title={sc.name}
            />
          ))}
        </div>
      </Card>

      <Card>
        <SectionLabel>Border</SectionLabel>
        <SliderRow
          label="Width"
          value={state.borderWidth}
          min={0}
          max={10}
          unit="px"
          onChange={(v) => onChange({ borderWidth: v })}
        />
        {state.borderWidth > 0 && (
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/40 flex-shrink-0">Color</span>
            <input
              type="color"
              value={state.borderColor.startsWith('rgba') ? '#ffffff' : state.borderColor}
              onChange={(e) => onChange({ borderColor: e.target.value })}
              className="w-9 h-9 rounded-xl cursor-pointer border-0 bg-transparent flex-shrink-0"
            />
            <div className="flex gap-1.5 ml-auto">
              {['#ffffff', '#000000', '#8b5cf6', '#ec4899', 'rgba(255,255,255,0.2)'].map((c) => (
                <button
                  key={c}
                  onClick={() => onChange({ borderColor: c })}
                  className={`w-7 h-7 rounded-full ring-1 transition-all hover:scale-110 ${
                    state.borderColor === c
                      ? 'ring-2 ring-brand-500 ring-offset-1 ring-offset-[#0c0c18]'
                      : 'ring-white/10'
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}
      </Card>
    </div>
  );

  const renderAdjustTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Image Adjustments</SectionLabel>
        <SliderRow label="Brightness" value={state.brightness} min={50} max={150} unit="%" onChange={(v) => onChange({ brightness: v })} />
        <SliderRow label="Contrast" value={state.contrast} min={50} max={150} unit="%" onChange={(v) => onChange({ contrast: v })} />
        <SliderRow label="Saturation" value={state.saturation} min={0} max={200} unit="%" onChange={(v) => onChange({ saturation: v })} />
        <SliderRow label="Blur" value={state.blur} min={0} max={20} step={0.5} unit="px" onChange={(v) => onChange({ blur: v })} />
        <button
          onClick={() => onChange({ brightness: 100, contrast: 100, saturation: 100, blur: 0 })}
          className="w-full py-2 rounded-lg text-xs text-white/30 bg-white/[0.04] ring-1 ring-white/[0.07]
            hover:bg-white/[0.09] hover:text-white/50 transition-all"
        >
          Reset Adjustments
        </button>
      </Card>

      <Card>
        <SectionLabel>Vignette</SectionLabel>
        <SliderRow
          label="Intensity"
          value={state.vignette}
          min={0}
          max={100}
          onChange={(v) => onChange({ vignette: v })}
        />
      </Card>

      <Card>
        <SectionLabel>Transform</SectionLabel>
        <ToggleRow
          label="Flip Horizontal"
          value={state.flipX}
          onChange={(v) => onChange({ flipX: v })}
        />
      </Card>
    </div>
  );

  const renderTransformTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>3D Transform</SectionLabel>
        <SliderRow label="Tilt X" value={state.tiltX} min={-30} max={30} unit="°" onChange={(v) => onChange({ tiltX: v })} />
        <SliderRow label="Tilt Y" value={state.tiltY} min={-30} max={30} unit="°" onChange={(v) => onChange({ tiltY: v })} />
        <SliderRow label="Scale" value={Math.round(state.scale * 100)} min={50} max={150} unit="%" onChange={(v) => onChange({ scale: v / 100 })} />
        <SliderRow label="Rotation" value={state.rotation} min={-30} max={30} unit="°" onChange={(v) => onChange({ rotation: v })} />
        <button
          onClick={() => onChange({ tiltX: 0, tiltY: 0, scale: 1, rotation: 0 })}
          className="w-full py-2 rounded-lg text-xs text-white/30 bg-white/[0.04] ring-1 ring-white/[0.07]
            hover:bg-white/[0.09] hover:text-white/50 transition-all"
        >
          Reset Transform
        </button>
      </Card>

      <Card>
        <SectionLabel>Reflection</SectionLabel>
        <ToggleRow
          label="Mirror Reflection"
          value={state.reflection}
          onChange={(v) => onChange({ reflection: v })}
        />
      </Card>
    </div>
  );

  const renderTextTab = () => (
    <div className="space-y-3">
      <Card>
        <SectionLabel>Text Content</SectionLabel>
        <input
          type="text"
          placeholder="Title text..."
          value={state.titleText}
          onChange={(e) => onChange({ titleText: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/25 ring-1 ring-white/[0.1] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all"
        />
        <input
          type="text"
          placeholder="Subtitle text..."
          value={state.subtitleText}
          onChange={(e) => onChange({ subtitleText: e.target.value })}
          className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] text-white text-sm
            placeholder:text-white/25 ring-1 ring-white/[0.1] focus:ring-brand-500/50
            focus:bg-white/[0.09] outline-none transition-all"
        />
      </Card>

      {state.titleText && (
        <>
          <Card>
            <SectionLabel>Position</SectionLabel>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'above', name: 'Above' },
                { id: 'center', name: 'Center' },
                { id: 'below', name: 'Below' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => onChange({ titlePosition: p.id })}
                  className={`px-2 py-2.5 rounded-lg text-xs font-medium transition-all ring-1 ${
                    state.titlePosition === p.id
                      ? 'bg-brand-500/20 text-brand-300 ring-brand-500/50'
                      : 'bg-white/[0.04] text-white/40 ring-white/[0.07] hover:bg-white/[0.09]'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <SectionLabel>Typography</SectionLabel>
            <SliderRow label="Title Size" value={state.titleSize} min={14} max={72} unit="px" onChange={(v) => onChange({ titleSize: v })} />
            <SliderRow label="Subtitle Size" value={state.subtitleSize} min={10} max={36} unit="px" onChange={(v) => onChange({ subtitleSize: v })} />
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              {TITLE_FONTS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => onChange({ titleFont: f.id })}
                  className={`px-2 py-2 rounded-lg text-xs font-medium transition-all ring-1 ${
                    state.titleFont === f.id
                      ? 'bg-brand-500/20 text-brand-300 ring-brand-500/50'
                      : 'bg-white/[0.04] text-white/40 ring-white/[0.07] hover:bg-white/[0.09]'
                  }`}
                  style={{ fontFamily: f.id }}
                >
                  {f.name}
                </button>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5">
              {[{ id: 'bold', name: 'Bold' }, { id: 'normal', name: 'Regular' }].map((w) => (
                <button
                  key={w.id}
                  onClick={() => onChange({ titleWeight: w.id })}
                  className={`px-2 py-2 rounded-lg text-xs transition-all ring-1 ${
                    (state.titleWeight ?? 'bold') === w.id
                      ? 'bg-brand-500/20 text-brand-300 ring-brand-500/50'
                      : 'bg-white/[0.04] text-white/40 ring-white/[0.07] hover:bg-white/[0.09]'
                  }`}
                  style={{ fontWeight: w.id === 'bold' ? 700 : 400 }}
                >
                  {w.name}
                </button>
              ))}
            </div>
          </Card>

          <Card>
            <SectionLabel>Colors</SectionLabel>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 w-14 flex-shrink-0">Title</span>
              <input
                type="color"
                value={state.titleColor}
                onChange={(e) => onChange({ titleColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
              />
              <div
                className="flex-1 h-10 rounded-xl ring-1 ring-white/10"
                style={{ background: state.titleColor }}
              />
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-white/40 w-14 flex-shrink-0">Subtitle</span>
              <input
                type="color"
                value={state.subtitleColor.startsWith('rgba') ? '#999999' : state.subtitleColor}
                onChange={(e) => onChange({ subtitleColor: e.target.value })}
                className="w-10 h-10 rounded-xl cursor-pointer border-0 bg-transparent"
              />
              <div
                className="flex-1 h-10 rounded-xl ring-1 ring-white/10"
                style={{ background: state.subtitleColor.startsWith('rgba') ? '#999999' : state.subtitleColor }}
              />
            </div>
          </Card>
        </>
      )}
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'style':     return renderStyleTab();
      case 'bg':        return renderBgTab();
      case 'canvas':    return renderCanvasTab();
      case 'adjust':    return renderAdjustTab();
      case 'transform': return renderTransformTab();
      case 'text':      return renderTextTab();
    }
  };

  /* ── Render ── */

  return (
    <div
      className="w-full lg:w-80 xl:w-88 shrink-0 flex flex-col bg-[#0c0c18]
        lg:border-l border-white/[0.06] lg:h-[calc(100vh-4.25rem)] lg:overflow-hidden"
    >
      {/* Header */}
      <div className="shrink-0 px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-pink-500 flex items-center justify-center shadow-lg shadow-brand-500/20 flex-shrink-0">
            <svg width="14" height="14" viewBox="0 0 32 32" fill="none">
              <rect x="6" y="8" width="20" height="14" rx="2" fill="white" opacity="0.9" />
              <path d="M10 24h12" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            </svg>
          </div>
          <span className="font-bold text-[15px] text-white tracking-tight">SnapFrame</span>
          {state.isPro && (
            <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-[10px] font-bold ring-1 ring-amber-500/30">
              PRO
            </span>
          )}
          <div className="flex-1" />
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all disabled:opacity-20 disabled:pointer-events-none"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white/80 hover:bg-white/[0.08] transition-all disabled:opacity-20 disabled:pointer-events-none"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="shrink-0 flex bg-black/20 border-b border-white/[0.06]">
        {TABS.map(({ id, label, Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex flex-col items-center gap-1 py-2.5 text-[9px] font-semibold uppercase tracking-wider transition-all border-b-2 ${
              activeTab === id
                ? 'text-brand-400 border-brand-500 bg-brand-500/[0.06]'
                : 'text-white/35 border-transparent hover:text-white/55 hover:bg-white/[0.03]'
            }`}
          >
            <Icon className="w-[15px] h-[15px]" />
            <span>{label}</span>
          </button>
        ))}
      </div>

      {/* Scrollable tab content */}
      <div className="flex-1 lg:overflow-y-auto overflow-x-hidden px-3 py-3 space-y-3">
        {renderTabContent()}
      </div>

      {/* Export — always pinned at bottom */}
      <div className="shrink-0 border-t border-white/[0.08] px-3 pt-3 pb-4 space-y-2 bg-[#0c0c18]">
        {/* Scale selector */}
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-[10px] text-white/25 uppercase tracking-wider">Resolution</span>
          <div className="flex gap-1 ml-auto">
            {[1, 2, 3].map((s) => (
              <button
                key={s}
                onClick={() => onChange({ exportScale: s })}
                className={`w-9 py-1 text-[10px] font-bold rounded-md transition-all ${
                  (state.exportScale ?? 2) === s
                    ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/50'
                    : 'bg-white/[0.06] text-white/35 hover:bg-white/[0.1] hover:text-white/60'
                }`}
              >
                {s}×
              </button>
            ))}
          </div>
        </div>

        {/* Primary row */}
        <div className="flex gap-2">
          <button
            onClick={() => onExport('png')}
            className="flex-1 py-3 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
              transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25
              flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Download className="w-4 h-4" />
            Export PNG
          </button>
          <button
            onClick={onCopy}
            className={`px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
              flex items-center justify-center gap-2 active:scale-[0.98] ${
              copySuccess
                ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/30'
                : 'bg-white/[0.06] text-white/50 hover:bg-white/[0.1] hover:text-white/70 ring-1 ring-white/10'
            }`}
            title="Copy to clipboard (Ctrl+Shift+C)"
          >
            {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Secondary row */}
        <div className="flex gap-1.5">
          <button
            onClick={() => onExport('jpeg')}
            className="flex-1 py-2 rounded-lg text-xs font-medium bg-white/[0.06] text-white/45
              hover:bg-white/[0.1] hover:text-white/70 transition-all"
          >
            JPEG
          </button>
          <button
            onClick={() => onExport('webp')}
            className="flex-1 py-2 rounded-lg text-xs font-medium bg-white/[0.06] text-white/45
              hover:bg-white/[0.1] hover:text-white/70 transition-all"
          >
            WebP
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-2 rounded-lg text-xs font-medium bg-white/[0.06] text-white/45
              hover:bg-white/[0.1] hover:text-white/70 transition-all flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {state.watermark && (
          <button
            onClick={onUpgrade}
            className="w-full py-2.5 rounded-xl text-sm font-medium
              bg-gradient-to-r from-amber-500/15 to-orange-500/15
              text-amber-300 hover:from-amber-500/25 hover:to-orange-500/25
              transition-all duration-200 flex items-center justify-center gap-2
              ring-1 ring-amber-500/25"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Remove Watermark — $9.99
          </button>
        )}

        <button
          onClick={onRemoveImage}
          className="w-full py-1.5 rounded-lg text-xs font-medium text-white/20
            hover:text-red-400/70 hover:bg-red-500/[0.08] transition-all"
        >
          <FlipHorizontal2 className="w-3 h-3 inline mr-1.5 opacity-50" />
          Remove Image
        </button>
      </div>
    </div>
  );
};

export default ControlsPanel;
