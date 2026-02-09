import React, { useState, useRef } from 'react';
import {
  Palette,
  Maximize,
  Square,
  Layers,
  Monitor,
  Download,
  Sparkles,
  RotateCcw,
  Smartphone,
  Globe,
  MonitorSmartphone,
  X,
  Type,
  SlidersHorizontal,
  RotateCw,
  RectangleHorizontal,
  Grid3x3,
  ChevronDown,
  ChevronRight,
  Copy,
  Check,
  Undo2,
  Redo2,
  Wand2,
  ImagePlus,
  Trash2,
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

const Section: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}> = ({ title, icon, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full text-xs font-semibold text-white/50 uppercase tracking-wider mb-2 hover:text-white/70 transition-colors"
      >
        <span className="flex items-center gap-2">
          {icon}
          {title}
        </span>
        {isOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
      </button>
      {isOpen && <div className="space-y-3">{children}</div>}
    </div>
  );
};

const SliderRow: React.FC<{
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (v: number) => void;
}> = ({ label, value, min, max, step = 1, unit = '', onChange }) => (
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs text-white/40">{label}</span>
      <span className="text-xs text-white/50 font-mono">{value}{unit}</span>
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

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  state,
  onChange,
  onExport,
  onCopy,
  copySuccess,
  onReset,
  onUpgrade,
  onRemoveImage,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
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

  return (
    <div className="w-full lg:w-80 xl:w-96 shrink-0 overflow-y-auto max-h-[calc(100vh-7rem)] p-5 space-y-1">

      {/* Undo/Redo toolbar */}
      <div className="flex items-center gap-1.5 mb-3 pb-3 border-b border-white/5">
        <button
          onClick={onUndo}
          disabled={!canUndo}
          className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all disabled:opacity-20 disabled:pointer-events-none"
          title="Undo (Ctrl+Z)"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={onRedo}
          disabled={!canRedo}
          className="p-2 rounded-lg text-white/40 hover:text-white/70 hover:bg-white/5 transition-all disabled:opacity-20 disabled:pointer-events-none"
          title="Redo (Ctrl+Shift+Z)"
        >
          <Redo2 className="w-4 h-4" />
        </button>
        <div className="flex-1" />
        <span className="text-[10px] text-white/20 font-mono">
          {canUndo ? `${canUndo ? '●' : '○'} unsaved` : ''}
        </span>
      </div>

      {/* ===== QUICK STYLES ===== */}
      <Section title="Quick Styles" icon={<Wand2 className="w-3.5 h-3.5" />}>
        <div className="grid grid-cols-4 gap-1.5">
          {STYLE_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => onChange(tmpl.overrides)}
              className="flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg text-[11px] transition-all
                bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/80 hover:scale-105"
            >
              <span className="text-base">{tmpl.emoji}</span>
              <span>{tmpl.name}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* ===== BACKGROUND ===== */}
      <Section title="Background" icon={<Palette className="w-3.5 h-3.5" />}>
        {/* Gradient presets */}
        <div className="grid grid-cols-6 gap-2">
          {GRADIENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChange({ background: preset.css, backgroundId: preset.id, bgImage: null })}
              className={`
                w-full aspect-square rounded-lg transition-all duration-200 hover:scale-110
                ${state.backgroundId === preset.id
                  ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-[#0f0f23] scale-110'
                  : 'ring-1 ring-white/10 hover:ring-white/30'
                }
                ${preset.id === 'transparent' ? 'checkerboard' : ''}
              `}
              style={{
                background: preset.id === 'transparent' ? undefined : preset.style,
              }}
              title={preset.name}
            />
          ))}
        </div>

        {/* Custom gradient */}
        <div className="pt-3 border-t border-white/5">
          <span className="text-xs text-white/30 mb-2 block">Custom Gradient</span>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 flex-1">
              <input
                type="color"
                value={state.customBgColor1}
                onChange={(e) => {
                  const bg = `linear-gradient(${state.bgAngle}deg, ${e.target.value} 0%, ${state.customBgColor2} 100%)`;
                  onChange({ customBgColor1: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
                }}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
              />
              <input
                type="color"
                value={state.customBgColor2}
                onChange={(e) => {
                  const bg = `linear-gradient(${state.bgAngle}deg, ${state.customBgColor1} 0%, ${e.target.value} 100%)`;
                  onChange({ customBgColor2: e.target.value, background: bg, backgroundId: 'custom', bgImage: null });
                }}
                className="w-8 h-8 rounded-lg cursor-pointer border-0 bg-transparent"
              />
            </div>
            <button
              onClick={() => {
                const bg = `linear-gradient(${state.bgAngle}deg, ${state.customBgColor1} 0%, ${state.customBgColor2} 100%)`;
                onChange({ background: bg, backgroundId: 'custom', bgImage: null });
              }}
              className="px-3 py-1.5 rounded-md text-xs bg-white/10 text-white/60 hover:bg-white/15 transition-all"
            >
              Apply
            </button>
          </div>
          <SliderRow
            label="Angle"
            value={state.bgAngle}
            min={0}
            max={360}
            unit="°"
            onChange={(v) => {
              if (state.backgroundId === 'custom') {
                const bg = `linear-gradient(${v}deg, ${state.customBgColor1} 0%, ${state.customBgColor2} 100%)`;
                onChange({ bgAngle: v, background: bg });
              } else {
                onChange({ bgAngle: v });
              }
            }}
          />
        </div>

        {/* Background image */}
        <div className="pt-3 border-t border-white/5">
          <span className="text-xs text-white/30 mb-2 block">Background Image</span>
          <input
            ref={bgImageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBgImageUpload}
          />
          <div className="flex gap-2">
            <button
              onClick={() => bgImageInputRef.current?.click()}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 transition-all ring-1 ring-white/10"
            >
              <ImagePlus className="w-3.5 h-3.5" />
              {state.bgImage ? 'Change' : 'Upload'}
            </button>
            {state.bgImage && (
              <button
                onClick={() => onChange({ bgImage: null })}
                className="px-3 py-2 rounded-lg text-xs bg-white/5 text-red-400/60 hover:bg-red-500/10 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </Section>

      {/* ===== BACKGROUND EFFECTS ===== */}
      <Section title="Background Effects" icon={<Grid3x3 className="w-3.5 h-3.5" />} defaultOpen={false}>
        {/* Pattern */}
        <div>
          <span className="text-xs text-white/30 mb-2 block">Pattern</span>
          <div className="grid grid-cols-3 gap-1.5">
            {BG_PATTERNS.map((p) => (
              <button
                key={p.id}
                onClick={() => onChange({ bgPattern: p.id })}
                className={`px-2 py-1.5 rounded-md text-[11px] transition-all ${
                  state.bgPattern === p.id
                    ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/50'
                    : 'bg-white/5 text-white/40 hover:bg-white/10'
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
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
          label="Noise Texture"
          value={state.bgNoise}
          min={0}
          max={50}
          onChange={(v) => onChange({ bgNoise: v })}
        />
      </Section>

      {/* ===== CANVAS SIZE ===== */}
      <Section title="Canvas Size" icon={<RectangleHorizontal className="w-3.5 h-3.5" />} defaultOpen={false}>
        <div className="grid grid-cols-3 gap-1.5">
          {ASPECT_PRESETS.map((a) => (
            <button
              key={a.id}
              onClick={() => onChange({ aspectRatio: a.id })}
              className={`px-2 py-2 rounded-md text-[11px] transition-all flex flex-col items-center ${
                state.aspectRatio === a.id
                  ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/50'
                  : 'bg-white/5 text-white/40 hover:bg-white/10'
              }`}
            >
              <span className="font-semibold">{a.name}</span>
              <span className="text-[9px] text-white/25">{a.label}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* ===== LAYOUT ===== */}
      <Section title="Layout" icon={<Maximize className="w-3.5 h-3.5" />}>
        <SliderRow label="Padding" value={state.padding} min={0} max={160} unit="px"
          onChange={(v) => onChange({ padding: v })} />
        <div className="flex gap-2">
          {[0, 32, 48, 64, 96, 128].map((v) => (
            <button
              key={v}
              onClick={() => onChange({ padding: v })}
              className={`flex-1 py-1.5 text-xs rounded-md transition-all ${
                state.padding === v
                  ? 'bg-brand-500/30 text-brand-300 ring-1 ring-brand-500/50'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
              }`}
            >
              {v}
            </button>
          ))}
        </div>
        <SliderRow label="Corner Radius" value={state.borderRadius} min={0} max={48} unit="px"
          onChange={(v) => onChange({ borderRadius: v })} />
      </Section>

      {/* ===== SHADOW ===== */}
      <Section title="Shadow" icon={<Layers className="w-3.5 h-3.5" />}>
        <SliderRow label="Intensity" value={state.shadow} min={0} max={100}
          onChange={(v) => onChange({ shadow: v })} />
        <div>
          <span className="text-xs text-white/30 mb-1.5 block">Shadow Color</span>
          <div className="flex gap-2">
            {SHADOW_COLORS.map((sc) => (
              <button
                key={sc.id}
                onClick={() => onChange({ shadowColor: sc.value })}
                className={`w-8 h-8 rounded-full transition-all duration-200 hover:scale-110 ${
                  state.shadowColor === sc.value
                    ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-[#0f0f23]'
                    : 'ring-1 ring-white/10'
                }`}
                style={{ background: sc.value.replace(/[\d.]+\)$/, '1)') }}
                title={sc.name}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* ===== BORDER ===== */}
      <Section title="Border" icon={<Square className="w-3.5 h-3.5" />} defaultOpen={false}>
        <SliderRow label="Width" value={state.borderWidth} min={0} max={10} unit="px"
          onChange={(v) => onChange({ borderWidth: v })} />
        {state.borderWidth > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-white/30">Color</span>
            <input
              type="color"
              value={state.borderColor.startsWith('rgba') ? '#ffffff' : state.borderColor}
              onChange={(e) => onChange({ borderColor: e.target.value })}
              className="w-8 h-8 rounded cursor-pointer border-0 bg-transparent"
            />
            <div className="flex gap-1.5 ml-auto">
              {['#ffffff', '#000000', '#8b5cf6', '#ec4899', 'rgba(255,255,255,0.2)'].map((c) => (
                <button
                  key={c}
                  onClick={() => onChange({ borderColor: c })}
                  className={`w-6 h-6 rounded-full ring-1 ${
                    state.borderColor === c ? 'ring-brand-500' : 'ring-white/10'
                  }`}
                  style={{ background: c }}
                />
              ))}
            </div>
          </div>
        )}
      </Section>

      {/* ===== DEVICE FRAME ===== */}
      <Section title="Device Frame" icon={<Monitor className="w-3.5 h-3.5" />}>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'none', name: 'None', icon: <X className="w-4 h-4" /> },
            { id: 'browser', name: 'Browser', icon: <Globe className="w-4 h-4" /> },
            { id: 'macos', name: 'macOS', icon: <MonitorSmartphone className="w-4 h-4" /> },
            { id: 'phone', name: 'Phone', icon: <Smartphone className="w-4 h-4" /> },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => onChange({ frame: f.id })}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all ${
                state.frame === f.id
                  ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/50'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
              }`}
            >
              {f.icon}
              {f.name}
            </button>
          ))}
        </div>
      </Section>

      {/* ===== 3D TRANSFORM ===== */}
      <Section title="3D Transform" icon={<RotateCw className="w-3.5 h-3.5" />} defaultOpen={false}>
        <SliderRow label="Tilt X" value={state.tiltX} min={-30} max={30} unit="°"
          onChange={(v) => onChange({ tiltX: v })} />
        <SliderRow label="Tilt Y" value={state.tiltY} min={-30} max={30} unit="°"
          onChange={(v) => onChange({ tiltY: v })} />
        <SliderRow label="Scale" value={Math.round(state.scale * 100)} min={50} max={150} unit="%"
          onChange={(v) => onChange({ scale: v / 100 })} />
        <SliderRow label="Rotation" value={state.rotation} min={-15} max={15} unit="°"
          onChange={(v) => onChange({ rotation: v })} />
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/40">Reflection</span>
          <button
            onClick={() => onChange({ reflection: !state.reflection })}
            className={`relative w-10 h-5 rounded-full transition-all ${
              state.reflection ? 'bg-brand-500' : 'bg-white/10'
            }`}
          >
            <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
              state.reflection ? 'left-5' : 'left-0.5'
            }`} />
          </button>
        </div>
      </Section>

      {/* ===== IMAGE ADJUSTMENTS ===== */}
      <Section title="Image Adjustments" icon={<SlidersHorizontal className="w-3.5 h-3.5" />} defaultOpen={false}>
        <SliderRow label="Brightness" value={state.brightness} min={50} max={150} unit="%"
          onChange={(v) => onChange({ brightness: v })} />
        <SliderRow label="Contrast" value={state.contrast} min={50} max={150} unit="%"
          onChange={(v) => onChange({ contrast: v })} />
        <SliderRow label="Saturation" value={state.saturation} min={0} max={200} unit="%"
          onChange={(v) => onChange({ saturation: v })} />
        <SliderRow label="Blur" value={state.blur} min={0} max={10} unit="px"
          onChange={(v) => onChange({ blur: v })} />
        <button
          onClick={() => onChange({ brightness: 100, contrast: 100, saturation: 100, blur: 0 })}
          className="w-full py-1.5 rounded-md text-xs text-white/30 bg-white/5 hover:bg-white/10 transition-all"
        >
          Reset Adjustments
        </button>
      </Section>

      {/* ===== TEXT OVERLAY ===== */}
      <Section title="Text Overlay" icon={<Type className="w-3.5 h-3.5" />} defaultOpen={false}>
        <div>
          <span className="text-xs text-white/30 mb-1 block">Title</span>
          <input
            type="text"
            placeholder="Add a title..."
            value={state.titleText}
            onChange={(e) => onChange({ titleText: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white/5 text-white text-sm
              placeholder:text-white/20 ring-1 ring-white/10 focus:ring-brand-500/50
              outline-none transition-all"
          />
        </div>
        <div>
          <span className="text-xs text-white/30 mb-1 block">Subtitle</span>
          <input
            type="text"
            placeholder="Add a subtitle..."
            value={state.subtitleText}
            onChange={(e) => onChange({ subtitleText: e.target.value })}
            className="w-full px-3 py-2 rounded-lg bg-white/5 text-white text-sm
              placeholder:text-white/20 ring-1 ring-white/10 focus:ring-brand-500/50
              outline-none transition-all"
          />
        </div>
        {state.titleText && (
          <>
            <div>
              <span className="text-xs text-white/30 mb-1.5 block">Position</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'above', name: 'Above' },
                  { id: 'center', name: 'Center' },
                  { id: 'below', name: 'Below' },
                ].map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onChange({ titlePosition: p.id })}
                    className={`px-2 py-1.5 rounded-md text-[11px] transition-all ${
                      state.titlePosition === p.id
                        ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/50'
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
            <SliderRow label="Title Size" value={state.titleSize} min={14} max={72} unit="px"
              onChange={(v) => onChange({ titleSize: v })} />
            <SliderRow label="Subtitle Size" value={state.subtitleSize} min={10} max={36} unit="px"
              onChange={(v) => onChange({ subtitleSize: v })} />
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/30">Title Color</span>
              <input
                type="color"
                value={state.titleColor}
                onChange={(e) => onChange({ titleColor: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
              />
              <span className="text-xs text-white/30 ml-2">Sub</span>
              <input
                type="color"
                value={state.subtitleColor.startsWith('rgba') ? '#999999' : state.subtitleColor}
                onChange={(e) => onChange({ subtitleColor: e.target.value })}
                className="w-7 h-7 rounded cursor-pointer border-0 bg-transparent"
              />
            </div>
            <div>
              <span className="text-xs text-white/30 mb-1.5 block">Font</span>
              <div className="grid grid-cols-2 gap-1.5">
                {TITLE_FONTS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => onChange({ titleFont: f.id })}
                    className={`px-2 py-1.5 rounded-md text-[11px] transition-all ${
                      state.titleFont === f.id
                        ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/50'
                        : 'bg-white/5 text-white/40 hover:bg-white/10'
                    }`}
                    style={{ fontFamily: f.id }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </Section>

      {/* ===== EXPORT ===== */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => onExport('png')}
            className="flex-1 py-3.5 rounded-xl font-semibold text-white text-sm
              bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
              transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25
              flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            Export PNG
          </button>
          <button
            onClick={onCopy}
            className={`px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200
              flex items-center justify-center gap-2
              ${copySuccess
                ? 'bg-green-500/20 text-green-300 ring-1 ring-green-500/30'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70 ring-1 ring-white/10'
              }`}
            title="Copy to clipboard (Ctrl+Shift+C)"
          >
            {copySuccess ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onExport('jpeg')}
            className="flex-1 py-2.5 rounded-lg text-xs font-medium bg-white/5 text-white/50
              hover:bg-white/10 hover:text-white/70 transition-all"
          >
            JPEG
          </button>
          <button
            onClick={() => onExport('webp')}
            className="flex-1 py-2.5 rounded-lg text-xs font-medium bg-white/5 text-white/50
              hover:bg-white/10 hover:text-white/70 transition-all"
          >
            WebP
          </button>
          <button
            onClick={onReset}
            className="flex-1 py-2.5 rounded-lg text-xs font-medium bg-white/5 text-white/50
              hover:bg-white/10 hover:text-white/70 transition-all flex items-center justify-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            Reset
          </button>
        </div>

        {state.watermark && (
          <button
            onClick={onUpgrade}
            className="w-full py-3 rounded-xl text-sm font-medium
              bg-gradient-to-r from-amber-500/20 to-orange-500/20
              text-amber-300 hover:from-amber-500/30 hover:to-orange-500/30
              transition-all duration-200 flex items-center justify-center gap-2
              ring-1 ring-amber-500/30"
          >
            <Sparkles className="w-4 h-4" />
            Remove Watermark — $9.99
          </button>
        )}

        <button
          onClick={onRemoveImage}
          className="w-full py-2.5 rounded-lg text-xs font-medium text-white/30
            hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          Remove Image
        </button>
      </div>
    </div>
  );
};

export default ControlsPanel;
