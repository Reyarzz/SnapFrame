export interface GradientPreset {
  id: string;
  name: string;
  style: string;
  css: string;
  category: 'dark' | 'vibrant' | 'pastel' | 'warm' | 'special' | 'solid';
}

export interface MeshGradientPreset {
  id: string;
  name: string;
  css: string;
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
  bgPattern: string;
  bgPatternOpacity: number;
  bgNoise: number;
  bgOpacity: number;
  // Layout
  padding: number;
  borderRadius: number;
  aspectRatio: string;
  // Image positioning (zoom/crop)
  imageZoom: number;   // 1.0 – 3.0
  imagePanX: number;  // –50 to 50
  imagePanY: number;  // –50 to 50
  // Effects
  shadow: number;
  shadowColor: string;
  shadowX: number;
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
  sepia: number;
  grayscale: number;
  hueRotate: number;
  invert: boolean;
  vignette: number;
  flipX: boolean;
  // Overlay effects
  glowIntensity: number;
  glowColor: string;
  colorOverlay: string;
  colorOverlayOpacity: number;
  scanlines: number;
  filmGrain: number;
  bgBlur: number;
  innerShadow: number;
  // Border
  borderWidth: number;
  borderColor: string;
  borderStyle: string;
  // Text overlay
  titleText: string;
  titleSize: number;
  titleColor: string;
  titleFont: string;
  titlePosition: string;
  titleWeight: string;
  titleShadow: boolean;
  textAlign: string;
  letterSpacing: number;
  subtitleText: string;
  subtitleSize: number;
  subtitleColor: string;
  // Background image
  bgImage: string | null;
  // Logo / branding overlay
  logoImage: string | null;
  logoPosition: string; // 'tl'|'tc'|'tr'|'ml'|'mc'|'mr'|'bl'|'bc'|'br'
  logoSize: number;     // 24–200 px
  logoOpacity: number;  // 0–100
  logoPadding: number;  // 8–48 px
  // Export
  exportFormat: 'png' | 'jpeg' | 'webp';
  exportScale: number;
  // Misc
  watermark: boolean;
  isPro: boolean;
  reflection: boolean;
  previewGrid: boolean;
}

export interface StyleTemplate {
  id: string;
  name: string;
  emoji: string;
  overrides: Partial<EditorState>;
}

/* ── Aspect ratios ─────────────────────────────── */
export const ASPECT_PRESETS: AspectPreset[] = [
  { id: 'auto',     name: 'Auto',    width: 0,    height: 0,    label: 'Auto' },
  { id: '16:9',     name: '16:9',    width: 1920, height: 1080, label: 'Widescreen' },
  { id: '4:3',      name: '4:3',     width: 1600, height: 1200, label: 'Standard' },
  { id: '1:1',      name: '1:1',     width: 1080, height: 1080, label: 'Square' },
  { id: '4:5',      name: '4:5',     width: 1080, height: 1350, label: 'Instagram' },
  { id: '9:16',     name: '9:16',    width: 1080, height: 1920, label: 'Story' },
  { id: 'og',       name: 'OG',      width: 1200, height: 630,  label: 'Open Graph' },
  { id: 'twitter',  name: 'Twitter', width: 1600, height: 900,  label: 'Twitter Card' },
  { id: 'linkedin', name: 'LinkedIn',width: 1200, height: 627,  label: 'LinkedIn' },
  { id: 'ph',       name: 'PH',      width: 1270, height: 760,  label: 'Product Hunt' },
  { id: '21:9',     name: '21:9',    width: 2560, height: 1080, label: 'Ultrawide' },
  { id: '2:1',      name: '2:1',     width: 2000, height: 1000, label: 'Panorama' },
];

/* ── Mesh gradient presets ─────────────────────── */
export const MESH_PRESETS: MeshGradientPreset[] = [
  {
    id: 'mesh-aurora',
    name: 'Aurora',
    css: 'radial-gradient(ellipse 80% 80% at 20% 20%, rgba(120,40,200,0.85) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 10%, rgba(0,200,180,0.7) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 50% 80%, rgba(60,80,220,0.75) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(200,80,120,0.6) 0%, transparent 55%), #0a0a1a',
  },
  {
    id: 'mesh-cosmic',
    name: 'Cosmic',
    css: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(120,0,220,0.9) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(0,80,220,0.8) 0%, transparent 50%), radial-gradient(ellipse 70% 70% at 50% 100%, rgba(200,0,180,0.7) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 90% 10%, rgba(80,40,200,0.65) 0%, transparent 50%), #050010',
  },
  {
    id: 'mesh-sunrise',
    name: 'Sunrise',
    css: 'radial-gradient(ellipse 70% 70% at 10% 90%, rgba(255,100,50,0.9) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 90% 80%, rgba(255,200,50,0.8) 0%, transparent 50%), radial-gradient(ellipse 60% 80% at 50% 10%, rgba(200,50,150,0.7) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 70% 40%, rgba(255,120,80,0.65) 0%, transparent 50%), #1a0a05',
  },
  {
    id: 'mesh-ocean',
    name: 'Ocean',
    css: 'radial-gradient(ellipse 80% 60% at 0% 50%, rgba(0,120,255,0.85) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 100% 20%, rgba(0,220,200,0.75) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 50% 100%, rgba(0,60,180,0.8) 0%, transparent 55%), radial-gradient(ellipse 50% 60% at 80% 70%, rgba(80,200,220,0.6) 0%, transparent 50%), #020d1f',
  },
  {
    id: 'mesh-fire',
    name: 'Blaze',
    css: 'radial-gradient(ellipse 70% 80% at 30% 60%, rgba(255,60,0,0.9) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 20%, rgba(255,200,0,0.8) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 10% 30%, rgba(200,30,30,0.85) 0%, transparent 50%), radial-gradient(ellipse 40% 50% at 70% 80%, rgba(255,80,0,0.7) 0%, transparent 50%), #0f0300',
  },
  {
    id: 'mesh-candy',
    name: 'Candy',
    css: 'radial-gradient(ellipse 70% 70% at 20% 30%, rgba(255,100,180,0.85) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 70%, rgba(180,100,255,0.8) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 60% 10%, rgba(255,150,100,0.7) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 10% 80%, rgba(100,180,255,0.65) 0%, transparent 50%), #12050f',
  },
  {
    id: 'mesh-forest',
    name: 'Forest',
    css: 'radial-gradient(ellipse 80% 70% at 10% 20%, rgba(30,180,80,0.85) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 90% 50%, rgba(0,140,100,0.75) 0%, transparent 50%), radial-gradient(ellipse 70% 50% at 40% 90%, rgba(80,200,120,0.7) 0%, transparent 55%), radial-gradient(ellipse 40% 60% at 70% 10%, rgba(0,100,60,0.8) 0%, transparent 50%), #030d06',
  },
  {
    id: 'mesh-rose',
    name: 'Rose',
    css: 'radial-gradient(ellipse 70% 80% at 30% 40%, rgba(255,80,120,0.9) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 80% 30%, rgba(255,150,100,0.8) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 10% 80%, rgba(200,50,80,0.85) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 70% 80%, rgba(255,100,140,0.7) 0%, transparent 50%), #12030a',
  },
  {
    id: 'mesh-dusk',
    name: 'Dusk',
    css: 'radial-gradient(ellipse 70% 80% at 10% 60%, rgba(80,20,120,0.9) 0%, transparent 55%), radial-gradient(ellipse 80% 60% at 90% 30%, rgba(220,80,40,0.8) 0%, transparent 50%), radial-gradient(ellipse 60% 70% at 50% 100%, rgba(40,10,80,0.85) 0%, transparent 50%), radial-gradient(ellipse 50% 50% at 60% 10%, rgba(180,60,100,0.7) 0%, transparent 50%), #080408',
  },
  {
    id: 'mesh-ice',
    name: 'Ice',
    css: 'radial-gradient(ellipse 80% 70% at 20% 20%, rgba(180,230,255,0.85) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(100,200,240,0.75) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 50% 90%, rgba(140,180,255,0.7) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 90% 10%, rgba(200,240,255,0.65) 0%, transparent 50%), #050a14',
  },
  {
    id: 'mesh-spring',
    name: 'Spring',
    css: 'radial-gradient(ellipse 80% 70% at 30% 20%, rgba(255,180,200,0.85) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 70% 70%, rgba(180,255,200,0.75) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 10% 80%, rgba(255,220,150,0.7) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 80% 10%, rgba(200,180,255,0.65) 0%, transparent 50%), #0f0a10',
  },
  {
    id: 'mesh-steel',
    name: 'Steel',
    css: 'radial-gradient(ellipse 80% 70% at 20% 30%, rgba(100,130,180,0.8) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 80% 60%, rgba(60,90,140,0.75) 0%, transparent 50%), radial-gradient(ellipse 70% 60% at 50% 90%, rgba(80,110,160,0.7) 0%, transparent 55%), radial-gradient(ellipse 50% 50% at 90% 10%, rgba(120,150,200,0.65) 0%, transparent 50%), #080c14',
  },
];

/* ── Gradient presets ──────────────────────────── */
export const GRADIENT_PRESETS: GradientPreset[] = [
  // Dark
  { id: 'midnight',  name: 'Midnight',     category: 'dark',    style: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)', css: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)' },
  { id: 'royal',     name: 'Royal',        category: 'dark',    style: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)', css: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)' },
  { id: 'slate',     name: 'Slate',        category: 'dark',    style: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)', css: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)' },
  { id: 'cobalt',    name: 'Cobalt',       category: 'dark',    style: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', css: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' },
  { id: 'twilight',  name: 'Twilight',     category: 'dark',    style: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', css: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)' },
  { id: 'deep-sea',  name: 'Deep Sea',     category: 'dark',    style: 'linear-gradient(135deg, #1CB5E0 0%, #000851 100%)', css: 'linear-gradient(135deg, #1CB5E0 0%, #000851 100%)' },
  // Vibrant
  { id: 'sunset',    name: 'Sunset',       category: 'vibrant', style: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { id: 'cosmic',    name: 'Cosmic',       category: 'vibrant', style: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)', css: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)' },
  { id: 'fire',      name: 'Fire',         category: 'vibrant', style: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', css: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
  { id: 'ember',     name: 'Ember',        category: 'vibrant', style: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)', css: 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)' },
  { id: 'flamingo',  name: 'Flamingo',     category: 'vibrant', style: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', css: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)' },
  { id: 'cherry',    name: 'Cherry',       category: 'vibrant', style: 'linear-gradient(135deg, #EB3349 0%, #F45C43 100%)', css: 'linear-gradient(135deg, #EB3349 0%, #F45C43 100%)' },
  { id: 'mango',     name: 'Mango',        category: 'vibrant', style: 'linear-gradient(135deg, #E8A87C 0%, #D76D77 50%, #85144B 100%)', css: 'linear-gradient(135deg, #E8A87C 0%, #D76D77 50%, #85144B 100%)' },
  { id: 'citrus',    name: 'Citrus',       category: 'vibrant', style: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)', css: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { id: 'ocean',     name: 'Ocean',        category: 'vibrant', style: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)', css: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)' },
  { id: 'mint',      name: 'Mint',         category: 'vibrant', style: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', css: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
  { id: 'neon',      name: 'Neon',         category: 'vibrant', style: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)', css: 'linear-gradient(135deg, #00f260 0%, #0575e6 100%)' },
  { id: 'forest',    name: 'Forest',       category: 'vibrant', style: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', css: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' },
  { id: 'jade',      name: 'Jade',         category: 'vibrant', style: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)', css: 'linear-gradient(135deg, #00b09b 0%, #96c93d 100%)' },
  { id: 'northern',  name: 'Northern',     category: 'vibrant', style: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)', css: 'linear-gradient(135deg, #a8ff78 0%, #78ffd6 100%)' },
  { id: 'sage',      name: 'Sage',         category: 'vibrant', style: 'linear-gradient(135deg, #3d6b4f 0%, #7bbf85 100%)', css: 'linear-gradient(135deg, #3d6b4f 0%, #7bbf85 100%)' },
  // Pastel
  { id: 'candy',     name: 'Candy',        category: 'pastel',  style: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)', css: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 100%)' },
  { id: 'aurora',    name: 'Aurora',       category: 'pastel',  style: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', css: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' },
  { id: 'lavender',  name: 'Lavender',     category: 'pastel',  style: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)', css: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)' },
  { id: 'peach',     name: 'Peach',        category: 'pastel',  style: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', css: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' },
  { id: 'cotton',    name: 'Cotton Candy', category: 'pastel',  style: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)', css: 'linear-gradient(135deg, #E0C3FC 0%, #8EC5FC 100%)' },
  { id: 'bubblegum', name: 'Bubblegum',    category: 'pastel',  style: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #ffecd2 100%)', css: 'linear-gradient(135deg, #ff9a9e 0%, #fad0c4 50%, #ffecd2 100%)' },
  { id: 'rosegold',  name: 'Rose Gold',    category: 'pastel',  style: 'linear-gradient(135deg, #f3a59b 0%, #dd9ab5 50%, #b5aee4 100%)', css: 'linear-gradient(135deg, #f3a59b 0%, #dd9ab5 50%, #b5aee4 100%)' },
  { id: 'ice',       name: 'Ice',          category: 'pastel',  style: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)', css: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)' },
  // Warm
  { id: 'warmth',    name: 'Warmth',       category: 'warm',    style: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)', css: 'linear-gradient(135deg, #FEB692 0%, #EA5455 100%)' },
  { id: 'raspberry', name: 'Raspberry',    category: 'warm',    style: 'linear-gradient(135deg, #C6426E 0%, #642B73 100%)', css: 'linear-gradient(135deg, #C6426E 0%, #642B73 100%)' },
  { id: 'crimson',   name: 'Crimson',      category: 'warm',    style: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)', css: 'linear-gradient(135deg, #8B0000 0%, #DC143C 100%)' },
  { id: 'bronze',    name: 'Bronze',       category: 'warm',    style: 'linear-gradient(135deg, #3D1C02 0%, #CC5500 50%, #F5A623 100%)', css: 'linear-gradient(135deg, #3D1C02 0%, #CC5500 50%, #F5A623 100%)' },
  { id: 'mocha',     name: 'Mocha',        category: 'warm',    style: 'linear-gradient(135deg, #3E1C00 0%, #916C00 100%)', css: 'linear-gradient(135deg, #3E1C00 0%, #916C00 100%)' },
  { id: 'dusk',      name: 'Dusk',         category: 'warm',    style: 'linear-gradient(135deg, #2C3E50 0%, #FD746C 100%)', css: 'linear-gradient(135deg, #2C3E50 0%, #FD746C 100%)' },
  // Special
  { id: 'galaxy',    name: 'Galaxy',       category: 'special', style: 'linear-gradient(135deg, #360033 0%, #0b8793 100%)', css: 'linear-gradient(135deg, #360033 0%, #0b8793 100%)' },
  { id: 'amethyst',  name: 'Amethyst',     category: 'special', style: 'linear-gradient(135deg, #9D50BB 0%, #6E48AA 100%)', css: 'linear-gradient(135deg, #9D50BB 0%, #6E48AA 100%)' },
  { id: 'storm',     name: 'Storm',        category: 'special', style: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)', css: 'linear-gradient(135deg, #373B44 0%, #4286f4 100%)' },
  { id: 'cyber',     name: 'Cyber',        category: 'special', style: 'linear-gradient(135deg, #0d0d0d 0%, #003300 50%, #00ff41 100%)', css: 'linear-gradient(135deg, #0d0d0d 0%, #003300 50%, #00ff41 100%)' },
  { id: 'denim',     name: 'Denim',        category: 'special', style: 'linear-gradient(135deg, #1d3557 0%, #457b9d 50%, #a8dadc 100%)', css: 'linear-gradient(135deg, #1d3557 0%, #457b9d 50%, #a8dadc 100%)' },
  // Solids
  { id: 'solid-black', name: 'Black',  category: 'solid', style: '#000000',  css: '#000000' },
  { id: 'solid-white', name: 'White',  category: 'solid', style: '#ffffff',  css: '#ffffff' },
  { id: 'solid-dark',  name: 'Dark',   category: 'solid', style: '#18181b',  css: '#18181b' },
  { id: 'solid-gray',  name: 'Gray',   category: 'solid', style: '#3f3f46',  css: '#3f3f46' },
  { id: 'solid-slate', name: 'Slate',  category: 'solid', style: '#1e293b',  css: '#1e293b' },
  { id: 'transparent', name: 'None',   category: 'solid', style: 'transparent', css: 'transparent' },
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
  { id: 'Inter',       name: 'Inter' },
  { id: 'Georgia',     name: 'Georgia' },
  { id: 'monospace',   name: 'Mono' },
  { id: 'system-ui',   name: 'System' },
  { id: 'serif',       name: 'Serif' },
  { id: 'Courier New', name: 'Courier' },
  { id: 'cursive',     name: 'Cursive' },
  { id: 'Impact',      name: 'Impact' },
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
  imageZoom: 1,
  imagePanX: 0,
  imagePanY: 0,
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
  borderStyle: 'solid',
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
  exportFormat: 'png',
  glowIntensity: 0,
  glowColor: 'rgba(139,92,246,0.8)',
  colorOverlay: '#8b5cf6',
  colorOverlayOpacity: 0,
  scanlines: 0,
  filmGrain: 0,
  bgBlur: 0,
  innerShadow: 0,
  logoImage: null,
  logoPosition: 'br',
  logoSize: 60,
  logoOpacity: 100,
  logoPadding: 16,
};

export const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'clean',
    name: 'Clean',
    emoji: '✨',
    overrides: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundId: 'sunset',
      padding: 64, borderRadius: 12, shadow: 40, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      sepia: 0, grayscale: 0, hueRotate: 0, invert: false,
      glowIntensity: 0, scanlines: 0, filmGrain: 0, vignette: 0,
      imageZoom: 1, imagePanX: 0, imagePanY: 0,
    },
  },
  {
    id: 'browser-mockup',
    name: 'Browser',
    emoji: '🌐',
    overrides: {
      background: 'linear-gradient(135deg, #334155 0%, #1e293b 100%)', backgroundId: 'slate',
      padding: 48, borderRadius: 12, shadow: 60, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
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
      background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)', backgroundId: 'midnight',
      padding: 80, borderRadius: 16, shadow: 80, shadowColor: 'rgba(139,92,246,0.4)', shadowX: 0,
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
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', backgroundId: 'fire',
      padding: 48, borderRadius: 20, shadow: 50, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: '1:1', bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'minimal',
    name: 'Minimal',
    emoji: '🧊',
    overrides: {
      background: '#ffffff', backgroundId: 'solid-white',
      padding: 48, borderRadius: 8, shadow: 20, shadowColor: 'rgba(0,0,0,0.12)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 1, borderColor: 'rgba(0,0,0,0.08)',
      sepia: 0, grayscale: 0, glowIntensity: 0, vignette: 0,
    },
  },
  {
    id: 'macos-dark',
    name: 'macOS',
    emoji: '💻',
    overrides: {
      background: 'linear-gradient(135deg, #141e30 0%, #243b55 100%)', backgroundId: 'royal',
      padding: 64, borderRadius: 12, shadow: 70, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'macos', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'phone-hero',
    name: 'Phone',
    emoji: '📲',
    overrides: {
      background: 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)', backgroundId: 'cosmic',
      padding: 64, borderRadius: 12, shadow: 60, shadowColor: 'rgba(139,92,246,0.4)', shadowX: 0,
      frame: 'phone', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'neon-glow',
    name: 'Neon',
    emoji: '🔥',
    overrides: {
      background: 'linear-gradient(135deg, #0c0c1d 0%, #1a1a3e 50%, #2d1b69 100%)', backgroundId: 'midnight',
      padding: 80, borderRadius: 16, shadow: 90, shadowColor: 'rgba(236,72,153,0.4)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 0.95, rotation: 0,
      bgPattern: 'grid', bgPatternOpacity: 0.05, bgNoise: 8,
      borderWidth: 2, borderColor: '#ec4899',
      glowIntensity: 60, glowColor: 'rgba(236,72,153,0.8)',
    },
  },
  {
    id: 'mesh-hero',
    name: 'Mesh',
    emoji: '🌊',
    overrides: {
      background: 'radial-gradient(ellipse 80% 80% at 20% 20%, rgba(120,40,200,0.85) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 10%, rgba(0,200,180,0.7) 0%, transparent 55%), radial-gradient(ellipse 70% 60% at 50% 80%, rgba(60,80,220,0.75) 0%, transparent 50%), #0a0a1a',
      backgroundId: 'mesh-aurora',
      padding: 72, borderRadius: 16, shadow: 60, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      glowIntensity: 0,
    },
  },
  {
    id: 'terminal',
    name: 'Terminal',
    emoji: '⌨️',
    overrides: {
      background: '#0d1117', backgroundId: 'solid-dark',
      padding: 40, borderRadius: 10, shadow: 50, shadowColor: 'rgba(0,0,0,0.7)', shadowX: 0,
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
      background: 'linear-gradient(135deg, #3E1C00 0%, #916C00 100%)', backgroundId: 'mocha',
      padding: 64, borderRadius: 8, shadow: 60, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 4, borderColor: '#8B6914',
      sepia: 40, scanlines: 25, vignette: 30, filmGrain: 30,
    },
  },
  {
    id: 'ipad-hero',
    name: 'iPad',
    emoji: '📱',
    overrides: {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', backgroundId: 'twilight',
      padding: 56, borderRadius: 12, shadow: 70, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'ipad', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'imac-hero',
    name: 'iMac',
    emoji: '🖥️',
    overrides: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundId: 'sunset',
      padding: 64, borderRadius: 12, shadow: 60, shadowColor: 'rgba(0,0,0,0.4)', shadowX: 0,
      frame: 'imac', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
  {
    id: 'cinema',
    name: 'Cinema',
    emoji: '🎬',
    overrides: {
      background: '#000000', backgroundId: 'solid-black',
      padding: 64, borderRadius: 0, shadow: 0, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: '21:9', bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      vignette: 60, scanlines: 10, filmGrain: 20, sepia: 0, grayscale: 20,
    },
  },
  {
    id: 'gradient-pop',
    name: 'Vivid',
    emoji: '🌈',
    overrides: {
      background: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', backgroundId: 'flamingo',
      padding: 56, borderRadius: 24, shadow: 70, shadowColor: 'rgba(248,87,166,0.4)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: -4, scale: 0.95, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 3, borderStyle: 'gradient',
      glowIntensity: 40, glowColor: 'rgba(248,87,166,0.8)',
    },
  },
  {
    id: 'product-hunt',
    name: 'Launch',
    emoji: '🚀',
    overrides: {
      background: 'linear-gradient(135deg, #FF6154 0%, #FF4500 100%)',
      backgroundId: 'custom', customBgColor1: '#FF6154', customBgColor2: '#FF4500',
      padding: 56, borderRadius: 16, shadow: 60, shadowColor: 'rgba(255,97,84,0.3)', shadowX: 0,
      frame: 'browser', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: 'ph', bgPattern: 'none', bgNoise: 0, borderWidth: 0,
    },
  },
];
