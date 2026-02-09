import React from 'react';
import {
  Palette,
  Maximize,
  Square,
  Layers,
  Monitor,
  Sun,
  Download,
  Sparkles,
  RotateCcw,
  Smartphone,
  Globe,
  MonitorSmartphone,
  X,
} from 'lucide-react';
import { EditorState, GRADIENT_PRESETS, SHADOW_COLORS } from '../presets';

interface ControlsPanelProps {
  state: EditorState;
  onChange: (partial: Partial<EditorState>) => void;
  onExport: (format: 'png' | 'jpeg' | 'webp') => void;
  onReset: () => void;
  onUpgrade: () => void;
  onRemoveImage: () => void;
}

const Section: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="mb-6">
    <h3 className="flex items-center gap-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-3">
      {icon}
      {title}
    </h3>
    {children}
  </div>
);

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  state,
  onChange,
  onExport,
  onReset,
  onUpgrade,
  onRemoveImage,
}) => {
  return (
    <div className="w-full lg:w-80 xl:w-96 shrink-0 overflow-y-auto max-h-[calc(100vh-120px)] p-5 space-y-1">
      {/* Background */}
      <Section title="Background" icon={<Palette className="w-3.5 h-3.5" />}>
        <div className="grid grid-cols-6 gap-2">
          {GRADIENT_PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => onChange({ background: preset.css, backgroundId: preset.id })}
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
      </Section>

      {/* Padding */}
      <Section title="Padding" icon={<Maximize className="w-3.5 h-3.5" />}>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="128"
            value={state.padding}
            onChange={(e) => onChange({ padding: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-xs text-white/50 font-mono w-10 text-right">{state.padding}px</span>
        </div>
        <div className="flex gap-2 mt-2">
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
      </Section>

      {/* Border Radius */}
      <Section title="Corner Radius" icon={<Square className="w-3.5 h-3.5" />}>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="48"
            value={state.borderRadius}
            onChange={(e) => onChange({ borderRadius: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-xs text-white/50 font-mono w-10 text-right">{state.borderRadius}px</span>
        </div>
      </Section>

      {/* Shadow */}
      <Section title="Shadow" icon={<Layers className="w-3.5 h-3.5" />}>
        <div className="flex items-center gap-3 mb-3">
          <input
            type="range"
            min="0"
            max="100"
            value={state.shadow}
            onChange={(e) => onChange({ shadow: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-xs text-white/50 font-mono w-10 text-right">{state.shadow}</span>
        </div>
        <div className="flex gap-2">
          {SHADOW_COLORS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => onChange({ shadowColor: sc.value })}
              className={`
                w-8 h-8 rounded-full transition-all duration-200 hover:scale-110
                ${state.shadowColor === sc.value
                  ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-[#0f0f23]'
                  : 'ring-1 ring-white/10'
                }
              `}
              style={{ background: sc.value.replace(/[\d.]+\)$/, '1)') }}
              title={sc.name}
            />
          ))}
        </div>
      </Section>

      {/* Frame */}
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
              className={`
                flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-all
                ${state.frame === f.id
                  ? 'bg-brand-500/20 text-brand-300 ring-1 ring-brand-500/50'
                  : 'bg-white/5 text-white/40 hover:bg-white/10 hover:text-white/60'
                }
              `}
            >
              {f.icon}
              {f.name}
            </button>
          ))}
        </div>
      </Section>

      {/* Export */}
      <div className="pt-4 border-t border-white/10 space-y-3">
        <button
          onClick={() => onExport('png')}
          className="w-full py-3.5 rounded-xl font-semibold text-white text-sm
            bg-gradient-to-r from-brand-500 to-pink-500 hover:from-brand-600 hover:to-pink-600
            transition-all duration-200 hover:shadow-lg hover:shadow-brand-500/25
            flex items-center justify-center gap-2"
        >
          <Download className="w-4 h-4" />
          Export PNG
        </button>

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
