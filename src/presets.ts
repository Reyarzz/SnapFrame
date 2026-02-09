export interface GradientPreset {
  id: string;
  name: string;
  style: string;
  css: string;
}

export interface FrameStyle {
  id: string;
  name: string;
  icon: string;
}

export interface AspectPreset {
  id: string;
  name: string;
  width: number;
  height: number;
  label: string;
}

export interface EditorState {
  image: string | null;
  fileName: string;
  // Background
  background: string;
  backgroundId: string;
  customBgColor1: string;
  customBgColor2: string;
  bgAngle: number;
  bgPattern: string; // 'none' | 'dots' | 'grid' | 'lines' | 'cross' | 'diagonal'
  bgPatternOpacity: number;
  bgNoise: number;
  // Layout
  padding: number;
  borderRadius: number;
  aspectRatio: string; // 'auto' | '16:9' | '4:3' | '1:1' | '9:16' | 'og' | 'twitter' | 'linkedin'
  // Effects
  shadow: number;
  shadowColor: string;
  frame: string;
  tiltX: number;
  tiltY: number;
  scale: number;
  rotation: number;
  // Image adjustments
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  // Border
  borderWidth: number;
  borderColor: string;
  // Text overlay
  titleText: string;
  titleSize: number;
  titleColor: string;
  titleFont: string;
  titlePosition: string; // 'above' | 'below' | 'center'
  subtitleText: string;
  subtitleSize: number;
  subtitleColor: string;
  // Background image
  bgImage: string | null;
  // Misc
  watermark: boolean;
  isPro: boolean;
  // Reflection
  reflection: boolean;
}

export interface StyleTemplate {
  id: string;
  name: string;
  emoji: string;
  overrides: Partial<EditorState>;
}

export const ASPECT_PRESETS: AspectPreset[] = [
  { id: 'auto', name: 'Auto', width: 0, height: 0, label: 'Auto' },
  { id: '16:9', name: '16:9', width: 1920, height: 1080, label: 'Widescreen' },
  { id: '4:3', name: '4:3', width: 1600, height: 1200, label: 'Standard' },
  { id: '1:1', name: '1:1', width: 1080, height: 1080, label: 'Square' },
  { id: '9:16', name: '9:16', width: 1080, height: 1920, label: 'Story' },
  { id: 'og', name: 'OG', width: 1200, height: 630, label: 'Open Graph' },
  { id: 'twitter', name: 'Twitter', width: 1600, height: 900, label: 'Twitter Card' },
  { id: 'linkedin', name: 'LinkedIn', width: 1200, height: 627, label: 'LinkedIn Post' },
  { id: 'ph', name: 'PH', width: 1270, height: 760, label: 'Product Hunt' },
];

export const GRADIENT_PRESETS: GradientPreset[] = [
  { id: 'sunset', name: 'Sunset', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'ocean', name: 'Ocean', style: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)', css: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)' },
  { id: 'candy', name: 'Candy', style: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', css: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)' },
  { id: 'aurora', name: 'Aurora', style: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 'midnight', name: 'Midnight', style: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)', css: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)' },
  { id: 'fire', name: 'Fire', style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'mint', name: 'Mint', style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'lavender', name: 'Lavender', style: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 'peach', name: 'Peach', style: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 'forest', name: 'Forest', style: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'cosmic', name: 'Cosmic', style: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)', css: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
  { id: 'mango', name: 'Mango', style: 'linear-gradient(135deg, #E8A87C 0%, #D76D77 50%, #85144B 100%)', css: 'linear-gradient(135deg, #E8A87C 0%, #D76D77 50%, #85144B 100%)' },
  { id: 'royal', name: 'Royal', style: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)', css: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' },
  { id: 'neon', name: 'Neon', style: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)', css: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)' },
  { id: 'cherry', name: 'Cherry', style: 'linear-gradient(135deg, #EB3349 0%, #F45C43 100%)', css: 'linear-gradient(135deg, #EB3349 0%, #F45C43 100%)' },
  { id: 'slate', name: 'Slate', style: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)', css: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)' },
  { id: 'warmth', name: 'Warmth', style: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)', css: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)' },
  { id: 'deep-sea', name: 'Deep Sea', style: 'linear-gradient(135deg, #1CB5E0 0%, #000851 100%)', css: 'linear-gradient(135deg, #1CB5E0 0%, #000851 100%)' },
  { id: 'cotton', name: 'Cotton Candy', style: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)', css: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)' },
  { id: 'ember', name: 'Ember', style: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)', css: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)' },
  { id: 'solid-black', name: 'Black', style: '#000000', css: '#000000' },
  { id: 'solid-white', name: 'White', style: '#ffffff', css: '#ffffff' },
  { id: 'solid-dark', name: 'Dark', style: '#18181b', css: '#18181b' },
  { id: 'transparent', name: 'None', style: 'transparent', css: 'transparent' },
];

export const SHADOW_COLORS = [
  { id: 'black', name: 'Black', value: 'rgba(0,0,0,0.5)' },
  { id: 'purple', name: 'Purple', value: 'rgba(139,92,246,0.4)' },
  { id: 'blue', name: 'Blue', value: 'rgba(59,130,246,0.4)' },
  { id: 'pink', name: 'Pink', value: 'rgba(236,72,153,0.4)' },
  { id: 'green', name: 'Green', value: 'rgba(16,185,129,0.4)' },
];

export const BG_PATTERNS = [
  { id: 'none', name: 'None' },
  { id: 'dots', name: 'Dots' },
  { id: 'grid', name: 'Grid' },
  { id: 'lines', name: 'Lines' },
  { id: 'cross', name: 'Cross' },
  { id: 'diagonal', name: 'Diagonal' },
];

export const TITLE_FONTS = [
  { id: 'Inter', name: 'Inter' },
  { id: 'Georgia', name: 'Georgia' },
  { id: 'monospace', name: 'Mono' },
  { id: 'system-ui', name: 'System' },
];

export const DEFAULT_STATE: EditorState = {
  image: null,
  fileName: '',
  background: GRADIENT_PRESETS[0].css,
  backgroundId: GRADIENT_PRESETS[0].id,
  customBgColor1: '#667eea',
  customBgColor2: '#764ba2',
  bgAngle: 135,
  bgPattern: 'none',
  bgPatternOpacity: 0.1,
  bgNoise: 0,
  bgImage: null,
  padding: 64,
  borderRadius: 12,
  aspectRatio: 'auto',
  shadow: 40,
  shadowColor: 'rgba(0,0,0,0.5)',
  frame: 'none',
  tiltX: 0,
  tiltY: 0,
  scale: 1,
  rotation: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  borderWidth: 0,
  borderColor: 'rgba(255,255,255,0.2)',
  titleText: '',
  titleSize: 32,
  titleColor: '#ffffff',
  titleFont: 'Inter',
  titlePosition: 'above',
  subtitleText: '',
  subtitleSize: 16,
  subtitleColor: 'rgba(255,255,255,0.6)',
  watermark: true,
  isPro: false,
  reflection: false,
};

export const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'clean',
    name: 'Clean',
    emoji: '✨',
    overrides: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundId: 'sunset',
      padding: 64,
      borderRadius: 12,
      shadow: 40,
      shadowColor: 'rgba(0,0,0,0.5)',
      frame: 'none',
      tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 0,
    },
  },
  {
    id: 'browser-mockup',
    name: 'Browser',
    emoji: '🌐',
    overrides: {
      background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
      backgroundId: 'slate',
      padding: 48,
      borderRadius: 12,
      shadow: 60,
      shadowColor: 'rgba(0,0,0,0.5)',
      frame: 'browser',
      tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 0,
    },
  },
  {
    id: '3d-pop',
    name: '3D Pop',
    emoji: '🎯',
    overrides: {
      background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)',
      backgroundId: 'midnight',
      padding: 80,
      borderRadius: 16,
      shadow: 80,
      shadowColor: 'rgba(139,92,246,0.4)',
      frame: 'none',
      tiltX: 8, tiltY: -6, scale: 0.9, rotation: 0,
      bgPattern: 'dots', bgPatternOpacity: 0.08, bgNoise: 5,
      borderWidth: 1,
      borderColor: 'rgba(255,255,255,0.2)',
    },
  },
  {
    id: 'social',
    name: 'Social',
    emoji: '📱',
    overrides: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      backgroundId: 'fire',
      padding: 48,
      borderRadius: 20,
      shadow: 50,
      shadowColor: 'rgba(0,0,0,0.5)',
      frame: 'none',
      tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: '1:1',
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 0,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    emoji: '🧊',
    overrides: {
      background: '#ffffff',
      backgroundId: 'solid-white',
      padding: 48,
      borderRadius: 8,
      shadow: 20,
      shadowColor: 'rgba(0,0,0,0.5)',
      frame: 'none',
      tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 1,
      borderColor: 'rgba(0,0,0,0.08)',
    },
  },
  {
    id: 'macos-dark',
    name: 'macOS',
    emoji: '💻',
    overrides: {
      background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
      backgroundId: 'royal',
      padding: 64,
      borderRadius: 12,
      shadow: 70,
      shadowColor: 'rgba(0,0,0,0.5)',
      frame: 'macos',
      tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 0,
    },
  },
  {
    id: 'phone-hero',
    name: 'Phone',
    emoji: '📲',
    overrides: {
      background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
      backgroundId: 'cosmic',
      padding: 64,
      borderRadius: 12,
      shadow: 60,
      shadowColor: 'rgba(139,92,246,0.4)',
      frame: 'phone',
      tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 0,
    },
  },
  {
    id: 'neon-glow',
    name: 'Neon',
    emoji: '🔥',
    overrides: {
      background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)',
      backgroundId: 'midnight',
      padding: 80,
      borderRadius: 16,
      shadow: 90,
      shadowColor: 'rgba(236,72,153,0.4)',
      frame: 'none',
      tiltX: 0, tiltY: 0, scale: 0.95, rotation: 0,
      bgPattern: 'grid', bgPatternOpacity: 0.05, bgNoise: 8,
      borderWidth: 2,
      borderColor: '#ec4899',
    },
  },
];
