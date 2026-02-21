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
  bgPattern: string; // 'none' | 'dots' | 'grid' | 'lines' | 'cross' | 'diagonal' | 'circles' | 'chevron' | 'triangles' | 'waves'
  bgPatternOpacity: number;
  bgNoise: number;
  bgOpacity: number; // 10-100
  // Layout
  padding: number;
  borderRadius: number;
  aspectRatio: string;
  // Effects
  shadow: number;
  shadowColor: string;
  shadowX: number; // -50 to 50
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
  sepia: number; // 0-100
  grayscale: number; // 0-100
  hueRotate: number; // -180 to 180
  invert: boolean;
  vignette: number; // 0-100
  flipX: boolean;
  // New effects
  glowIntensity: number; // 0-100
  glowColor: string;
  colorOverlay: string;
  colorOverlayOpacity: number; // 0-100
  scanlines: number; // 0-100
  filmGrain: number; // 0-100
  bgBlur: number; // 0-20px applied to bg image
  innerShadow: number; // 0-100
  // Border
  borderWidth: number;
  borderColor: string;
  borderStyle: string; // 'solid' | 'dashed' | 'dotted' | 'double' | 'gradient'
  // Text overlay
  titleText: string;
  titleSize: number;
  titleColor: string;
  titleFont: string;
  titlePosition: string; // 'above' | 'below' | 'center'
  titleWeight: string; // 'bold' | 'normal'
  titleShadow: boolean;
  textAlign: string; // 'left' | 'center' | 'right'
  letterSpacing: number; // 0-20
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
  previewGrid: boolean;
  exportScale: number; // 1 | 2 | 3
}

export interface StyleTemplate {
  id: string;
  name: string;
  emoji: string;
  overrides: Partial<EditorState>;
}

export const ASPECT_PRESETS: AspectPreset[] = [
  { id: 'auto',     name: 'Auto',   width: 0,    height: 0,    label: 'Auto' },
  { id: '16:9',     name: '16:9',   width: 1920, height: 1080, label: 'Widescreen' },
  { id: '4:3',      name: '4:3',    width: 1600, height: 1200, label: 'Standard' },
  { id: '1:1',      name: '1:1',    width: 1080, height: 1080, label: 'Square' },
  { id: '4:5',      name: '4:5',    width: 1080, height: 1350, label: 'Instagram' },
  { id: '9:16',     name: '9:16',   width: 1080, height: 1920, label: 'Story' },
  { id: 'og',       name: 'OG',     width: 1200, height: 630,  label: 'Open Graph' },
  { id: 'twitter',  name: 'Twitter',width: 1600, height: 900,  label: 'Twitter Card' },
  { id: 'linkedin', name: 'LinkedIn',width: 1200,height: 627,  label: 'LinkedIn Post' },
  { id: 'ph',       name: 'PH',     width: 1270, height: 760,  label: 'Product Hunt' },
  { id: '21:9',     name: '21:9',   width: 2560, height: 1080, label: 'Ultrawide' },
  { id: '2:1',      name: '2:1',    width: 2000, height: 1000, label: 'Panorama' },
];

export const GRADIENT_PRESETS: GradientPreset[] = [
  // Dark/moody
  { id: 'midnight',  name: 'Midnight',     style: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)', css: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)' },
  { id: 'royal',     name: 'Royal',        style: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)', css: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' },
  { id: 'slate',     name: 'Slate',        style: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)', css: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)' },
  { id: 'cobalt',    name: 'Cobalt',       style: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', css: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { id: 'twilight',  name: 'Twilight',     style: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
  { id: 'deep-sea',  name: 'Deep Sea',     style: 'linear-gradient(135deg, #1CB5E0 0%, #000851 100%)', css: 'linear-gradient(135deg, #1CB5E0 0%, #000851 100%)' },
  // Vibrant/colorful
  { id: 'sunset',    name: 'Sunset',       style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'cosmic',    name: 'Cosmic',       style: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)', css: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
  { id: 'fire',      name: 'Fire',         style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'ember',     name: 'Ember',        style: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)', css: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)' },
  { id: 'flamingo',  name: 'Flamingo',     style: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', css: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)' },
  { id: 'cherry',    name: 'Cherry',       style: 'linear-gradient(135deg, #EB3349 0%, #F45C43 100%)', css: 'linear-gradient(135deg, #EB3349 0%, #F45C43 100%)' },
  { id: 'mango',     name: 'Mango',        style: 'linear-gradient(135deg, #E8A87C 0%, #D76D77 50%, #85144B 100%)', css: 'linear-gradient(135deg, #E8A87C 0%, #D76D77 50%, #85144B 100%)' },
  { id: 'citrus',    name: 'Citrus',       style: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', css: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'ocean',     name: 'Ocean',        style: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)', css: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)' },
  { id: 'mint',      name: 'Mint',         style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'neon',      name: 'Neon',         style: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)', css: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)' },
  { id: 'forest',    name: 'Forest',       style: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'jade',      name: 'Jade',         style: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)', css: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)' },
  { id: 'northern',  name: 'Northern',     style: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)', css: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)' },
  { id: 'sage',      name: 'Sage',         style: 'linear-gradient(135deg, #3d6b4f 0%, #7bbf85 100%)', css: 'linear-gradient(135deg, #3d6b4f 0%, #7bbf85 100%)' },
  // Pastel/soft
  { id: 'candy',     name: 'Candy',        style: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', css: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)' },
  { id: 'aurora',    name: 'Aurora',       style: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 'lavender',  name: 'Lavender',     style: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 'peach',     name: 'Peach',        style: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 'cotton',    name: 'Cotton Candy', style: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)', css: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)' },
  { id: 'bubblegum', name: 'Bubblegum',    style: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #ffecd2 100%)', css: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #ffecd2 100%)' },
  { id: 'rosegold',  name: 'Rose Gold',    style: 'linear-gradient(135deg, #f3a59b 0%, #dd9ab5 50%, #b5aee4 100%)', css: 'linear-gradient(135deg, #f3a59b 0%, #dd9ab5 50%, #b5aee4 100%)' },
  { id: 'ice',       name: 'Ice',          style: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)', css: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)' },
  // Warm/rich
  { id: 'warmth',    name: 'Warmth',       style: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)', css: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)' },
  { id: 'raspberry', name: 'Raspberry',    style: 'linear-gradient(135deg, #C6426E 0%, #642B73 100%)', css: 'linear-gradient(135deg, #C6426E 0%, #642B73 100%)' },
  { id: 'crimson',   name: 'Crimson',      style: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)', css: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)' },
  { id: 'bronze',    name: 'Bronze',       style: 'linear-gradient(135deg, #3D1C02 0%, #CC5500 50%, #F5A623 100%)', css: 'linear-gradient(135deg, #3D1C02 0%, #CC5500 50%, #F5A623 100%)' },
  { id: 'mocha',     name: 'Mocha',        style: 'linear-gradient(135deg, #3E1C00 0%, #916C00 100%)', css: 'linear-gradient(135deg, #3E1C00 0%, #916C00 100%)' },
  { id: 'dusk',      name: 'Dusk',         style: 'linear-gradient(135deg, #2C3E50 0%, #FD746C 100%)', css: 'linear-gradient(135deg, #2C3E50 0%, #FD746C 100%)' },
  // Special
  { id: 'galaxy',    name: 'Galaxy',       style: 'linear-gradient(135deg, #360033 0%, #0b8793 100%)', css: 'linear-gradient(135deg, #360033 0%, #0b8793 100%)' },
  { id: 'amethyst',  name: 'Amethyst',     style: 'linear-gradient(135deg, #9D50BB 0%, #6E48AA 100%)', css: 'linear-gradient(135deg, #9D50BB 0%, #6E48AA 100%)' },
  { id: 'storm',     name: 'Storm',        style: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)', css: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)' },
  { id: 'cyber',     name: 'Cyber',        style: 'linear-gradient(135deg, #0d0d0d 0%, #003300 50%, #00ff41 100%)', css: 'linear-gradient(135deg, #0d0d0d 0%, #003300 50%, #00ff41 100%)' },
  { id: 'denim',     name: 'Denim',        style: 'linear-gradient(135deg, #1d3557 0%, #457b9d 50%, #a8dadc 100%)', css: 'linear-gradient(135deg, #1d3557 0%, #457b9d 50%, #a8dadc 100%)' },
  // Solids
  { id: 'solid-black', name: 'Black',  style: '#000000',  css: '#000000' },
  { id: 'solid-white', name: 'White',  style: '#ffffff',  css: '#ffffff' },
  { id: 'solid-dark',  name: 'Dark',   style: '#18181b',  css: '#18181b' },
  { id: 'solid-gray',  name: 'Gray',   style: '#3f3f46',  css: '#3f3f46' },
  { id: 'transparent', name: 'None',   style: 'transparent', css: 'transparent' },
];

export const SHADOW_COLORS = [
  { id: 'black',  name: 'Black',  value: 'rgba(0,0,0,0.5)' },
  { id: 'purple', name: 'Purple', value: 'rgba(139,92,246,0.4)' },
  { id: 'blue',   name: 'Blue',   value: 'rgba(59,130,246,0.4)' },
  { id: 'pink',   name: 'Pink',   value: 'rgba(236,72,153,0.4)' },
  { id: 'green',  name: 'Green',  value: 'rgba(16,185,129,0.4)' },
  { id: 'orange', name: 'Orange', value: 'rgba(249,115,22,0.4)' },
  { id: 'cyan',   name: 'Cyan',   value: 'rgba(6,182,212,0.4)' },
];

export const GLOW_COLORS = [
  { id: 'purple', name: 'Purple', value: 'rgba(139,92,246,0.8)' },
  { id: 'pink',   name: 'Pink',   value: 'rgba(236,72,153,0.8)' },
  { id: 'blue',   name: 'Blue',   value: 'rgba(59,130,246,0.8)' },
  { id: 'cyan',   name: 'Cyan',   value: 'rgba(6,182,212,0.8)' },
  { id: 'green',  name: 'Green',  value: 'rgba(16,185,129,0.8)' },
  { id: 'orange', name: 'Orange', value: 'rgba(249,115,22,0.8)' },
  { id: 'white',  name: 'White',  value: 'rgba(255,255,255,0.6)' },
];

export const BG_PATTERNS = [
  { id: 'none',      name: 'None' },
  { id: 'dots',      name: 'Dots' },
  { id: 'grid',      name: 'Grid' },
  { id: 'lines',     name: 'Lines' },
  { id: 'cross',     name: 'Cross' },
  { id: 'diagonal',  name: 'Diagonal' },
  { id: 'circles',   name: 'Circles' },
  { id: 'chevron',   name: 'Chevron' },
  { id: 'triangles', name: 'Triangles' },
  { id: 'waves',     name: 'Waves' },
];

export const TITLE_FONTS = [
  { id: 'Inter',           name: 'Inter' },
  { id: 'Georgia',         name: 'Georgia' },
  { id: 'monospace',       name: 'Mono' },
  { id: 'system-ui',       name: 'System' },
  { id: 'serif',           name: 'Serif' },
  { id: 'Courier New',     name: 'Courier' },
  { id: 'cursive',         name: 'Cursive' },
  { id: 'Impact',          name: 'Impact' },
];

export const DEFAULT_STATE: EditorState = {
  image: null,
  fileName: '',
  background: GRADIENT_PRESETS[6].css, // sunset
  backgroundId: GRADIENT_PRESETS[6].id,
  customBgColor1: '#667eea',
  customBgColor2: '#764ba2',
  bgAngle: 135,
  bgPattern: 'none',
  bgPatternOpacity: 0.1,
  bgNoise: 0,
  bgOpacity: 100,
  bgImage: null,
  padding: 64,
  borderRadius: 12,
  aspectRatio: 'auto',
  shadow: 40,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowX: 0,
  frame: 'none',
  tiltX: 0,
  tiltY: 0,
  scale: 1,
  rotation: 0,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  sepia: 0,
  grayscale: 0,
  hueRotate: 0,
  invert: false,
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
  previewGrid: false,
  vignette: 0,
  flipX: false,
  titleWeight: 'bold',
  titleShadow: false,
  textAlign: 'center',
  letterSpacing: 0,
  exportScale: 2,
  glowIntensity: 0,
  glowColor: 'rgba(139,92,246,0.8)',
  colorOverlay: '#8b5cf6',
  colorOverlayOpacity: 0,
  scanlines: 0,
  filmGrain: 0,
  bgBlur: 0,
  innerShadow: 0,
  borderStyle: 'solid',
};

export const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'clean',
    name: 'Clean',
    emoji: '✨',
    overrides: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      backgroundId: 'sunset',
      padding: 64, borderRadius: 12,
      shadow: 40, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      sepia: 0, grayscale: 0, hueRotate: 0, invert: false,
      glowIntensity: 0, scanlines: 0, filmGrain: 0, vignette: 0,
    },
  },
  {
    id: 'browser-mockup',
    name: 'Browser',
    emoji: '🌐',
    overrides: {
      background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)',
      backgroundId: 'slate',
      padding: 48, borderRadius: 12,
      shadow: 60, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'browser', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      sepia: 0, grayscale: 0, hueRotate: 0, invert: false,
    },
  },
  {
    id: '3d-pop',
    name: '3D Pop',
    emoji: '🎯',
    overrides: {
      background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)',
      backgroundId: 'midnight',
      padding: 80, borderRadius: 16,
      shadow: 80, shadowColor: 'rgba(139,92,246,0.4)', shadowX: 0,
      frame: 'none', tiltX: 8, tiltY: -6, scale: 0.9, rotation: 0,
      bgPattern: 'dots', bgPatternOpacity: 0.08, bgNoise: 5,
      borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)',
    },
  },
  {
    id: 'social',
    name: 'Social',
    emoji: '📱',
    overrides: {
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      backgroundId: 'fire',
      padding: 48, borderRadius: 20,
      shadow: 50, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: '1:1', bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    emoji: '🧊',
    overrides: {
      background: '#ffffff',
      backgroundId: 'solid-white',
      padding: 48, borderRadius: 8,
      shadow: 20, shadowColor: 'rgba(0,0,0,0.12)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
      sepia: 0, grayscale: 0, glowIntensity: 0, vignette: 0,
    },
  },
  {
    id: 'macos-dark',
    name: 'macOS',
    emoji: '💻',
    overrides: {
      background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
      backgroundId: 'royal',
      padding: 64, borderRadius: 12,
      shadow: 70, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'macos', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'phone-hero',
    name: 'Phone',
    emoji: '📲',
    overrides: {
      background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',
      backgroundId: 'cosmic',
      padding: 64, borderRadius: 12,
      shadow: 60, shadowColor: 'rgba(139,92,246,0.4)', shadowX: 0,
      frame: 'phone', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'neon-glow',
    name: 'Neon',
    emoji: '🔥',
    overrides: {
      background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)',
      backgroundId: 'midnight',
      padding: 80, borderRadius: 16,
      shadow: 90, shadowColor: 'rgba(236,72,153,0.4)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 0.95, rotation: 0,
      bgPattern: 'grid', bgPatternOpacity: 0.05, bgNoise: 8,
      borderWidth: 2, borderColor: '#ec4899',
      glowIntensity: 60, glowColor: 'rgba(236,72,153,0.8)',
    },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    emoji: '⌨️',
    overrides: {
      background: '#0d1117',
      backgroundId: 'solid-dark',
      padding: 40, borderRadius: 10,
      shadow: 50, shadowColor: 'rgba(0,0,0,0.7)', shadowX: 0,
      frame: 'terminal', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      glowIntensity: 20, glowColor: 'rgba(16,185,129,0.8)',
    },
  },
  {
    id: 'retro',
    name: 'Retro',
    emoji: '📺',
    overrides: {
      background: 'linear-gradient(135deg, #3E1C00 0%, #916C00 100%)',
      backgroundId: 'mocha',
      padding: 64, borderRadius: 8,
      shadow: 60, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 4, borderColor: '#8B6914',
      sepia: 40, scanlines: 25, vignette: 30, filmGrain: 30,
      glowIntensity: 0,
    },
  },
  {
    id: 'github',
    name: 'GitHub',
    emoji: '🐙',
    overrides: {
      background: '#0d1117',
      backgroundId: 'solid-dark',
      padding: 48, borderRadius: 6,
      shadow: 40, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'browser', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      sepia: 0, grayscale: 0,
    },
  },
  {
    id: 'gradient-pop',
    name: 'Vivid',
    emoji: '🌈',
    overrides: {
      background: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)',
      backgroundId: 'flamingo',
      padding: 56, borderRadius: 24,
      shadow: 70, shadowColor: 'rgba(248,87,166,0.4)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: -4, scale: 0.95, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 3, borderStyle: 'gradient',
      glowIntensity: 40, glowColor: 'rgba(248,87,166,0.8)',
    },
  },
  {
    id: 'cinema',
    name: 'Cinema',
    emoji: '🎬',
    overrides: {
      background: '#000000',
      backgroundId: 'solid-black',
      padding: 64, borderRadius: 0,
      shadow: 0, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: '21:9',
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      vignette: 60, scanlines: 10, filmGrain: 20,
      sepia: 0, grayscale: 20,
    },
  },
  {
    id: 'glass',
    name: 'Glass',
    emoji: '🔮',
    overrides: {
      background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)',
      backgroundId: 'custom',
      customBgColor1: 'rgba(255,255,255,0.15)', customBgColor2: 'rgba(255,255,255,0.05)',
      padding: 48, borderRadius: 24,
      shadow: 30, shadowColor: 'rgba(0,0,0,0.2)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 1, borderStyle: 'solid', borderColor: 'rgba(255,255,255,0.3)',
      glowIntensity: 0,
    },
  },
  {
    id: 'product-hunt',
    name: 'Launch',
    emoji: '🚀',
    overrides: {
      background: 'linear-gradient(135deg, #FF6154 0%, #FF4500 100%)',
      backgroundId: 'custom',
      customBgColor1: '#FF6154', customBgColor2: '#FF4500',
      padding: 56, borderRadius: 16,
      shadow: 60, shadowColor: 'rgba(255,97,84,0.3)', shadowX: 0,
      frame: 'browser', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: 'ph', bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'dark-elegant',
    name: 'Elegant',
    emoji: '🖤',
    overrides: {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
      backgroundId: 'twilight',
      padding: 80, borderRadius: 4,
      shadow: 80, shadowColor: 'rgba(0,0,0,0.7)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0,
      borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
      glowIntensity: 0, vignette: 20,
    },
  },
];
