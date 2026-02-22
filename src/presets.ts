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
  bgRadial: boolean;
  patternScale: number;
  // Layout
  padding: number;
  borderRadius: number;
  aspectRatio: string;
  // Image positioning (zoom/crop)
  imageZoom: number;
  imagePanX: number;
  imagePanY: number;
  imageBorderRadius: number;
  imageFitMode: string;   // 'cover' | 'contain' | 'fill'
  // Effects
  shadow: number;
  shadowColor: string;
  shadowX: number;
  shadowY: number;
  shadowBlur: number;
  frame: string;
  tiltX: number;
  tiltY: number;
  scale: number;
  rotation: number;
  canvasRotation: number;
  skewX: number;
  skewY: number;
  flipY: boolean;
  perspectiveDistance: number;
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
  vignetteColor: string;
  flipX: boolean;
  // Advanced tone
  temperature: number;   // -100 to 100 (cool to warm)
  fade: number;          // 0-100 matte/film look
  sharpness: number;     // 0-100
  highlights: number;    // -100 to 100
  shadows: number;       // -100 to 100
  noiseOnImage: number;  // 0-100 grain on image
  // Duotone
  duotone: boolean;
  duotoneHighlight: string;
  duotoneShadow: string;
  // Overlay effects
  glowIntensity: number;
  glowColor: string;
  colorOverlay: string;
  colorOverlayOpacity: number;
  colorOverlayBlendMode: string;
  scanlines: number;
  scanlinesSpacing: number;
  scanlinesColor: string;
  filmGrain: number;
  bgBlur: number;
  innerShadow: number;
  innerGlowIntensity: number;
  innerGlowColor: string;
  // New overlays
  lightLeak: number;
  lightLeakAngle: number;
  chromaAberration: number;
  glitch: number;
  halftone: number;
  fog: number;
  stars: number;
  rain: number;
  lensFlare: number;
  lensFlareX: number;
  lensFlareY: number;
  spotlight: number;
  cornerDots: boolean;
  showRuleOfThirds: boolean;
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
  titleItalic: boolean;
  titleAllCaps: boolean;
  titleOpacity: number;
  titleGradient: boolean;
  titleGradientColor2: string;
  textAlign: string;
  letterSpacing: number;
  lineHeight: number;
  subtitleText: string;
  subtitleSize: number;
  subtitleColor: string;
  bodyText: string;
  bodySize: number;
  bodyColor: string;
  textBg: string;           // 'none' | 'pill' | 'box'
  textBgColor: string;
  textBgOpacity: number;
  textStroke: number;
  textStrokeColor: string;
  // Background image
  bgImage: string | null;
  // Logo / branding overlay
  logoImage: string | null;
  logoPosition: string;
  logoSize: number;
  logoOpacity: number;
  logoPadding: number;
  // Reflection
  reflection: boolean;
  reflectionOpacity: number;
  reflectionHeight: number;
  // Export
  exportFormat: 'png' | 'jpeg' | 'webp';
  exportScale: number;
  exportFilename: string;
  exportTransparent: boolean;
  exportQuality: number;
  // Misc
  watermark: boolean;
  isPro: boolean;
  previewGrid: boolean;
  // Image clip & transform extras
  imageClipShape: string;  // 'none' | 'circle' | 'hexagon' | 'diamond' | 'star' | 'arch' | 'rounded'
  imageOpacity: number;    // 0-100
  imageRotation: number;   // -180 to 180
  // Film look simulation
  filmLook: string;
  // Split tone
  splitTone: boolean;
  splitToneHighlightColor: string;
  splitToneShadowColor: string;
  splitToneHighlightStrength: number;
  splitToneShadowStrength: number;
  // Tilt shift (miniature effect)
  tiltShift: boolean;
  tiltShiftBlur: number;
  tiltShiftCenter: number;  // 0-100%
  tiltShiftRange: number;   // width of sharp band %
  // Badge / label overlay
  badge: string;
  badgePosition: string;
  badgeColor: string;
  // Emoji sticker
  emojiOverlay: string;
  emojiSize: number;
  emojiPositionX: number;
  emojiPositionY: number;
  // Neon text glow
  neonTextGlow: boolean;
  neonGlowColor: string;
  neonGlowIntensity: number;
  // Typography extras
  textRotation: number;
  wordSpacing: number;
  // Canvas visual effects
  prismEffect: number;
  sunburst: number;
  sunburstX: number;
  sunburstY: number;
  sunburstColor: string;
  shadowSpread: number;
  vibrance: number;
  // Per-side padding
  uniformPadding: boolean;
  paddingTop: number;
  paddingRight: number;
  paddingBottom: number;
  paddingLeft: number;
  // Custom watermark text
  watermarkText: string;
  watermarkOpacity: number;
  watermarkPosition: string;
  watermarkSize: number;
  // Double shadow
  doubleShadow: boolean;
  shadow2Color: string;
  shadow2X: number;
  shadow2Y: number;
  shadow2Blur: number;
  // Image glow (filter drop-shadow on image)
  imageGlow: number;
  imageGlowColor: string;
  // Pixelate / mosaic
  pixelate: number;
  // Background tint overlay
  bgTint: number;
  bgTintColor: string;
  // Cursor overlay
  cursorOverlay: boolean;
  cursorX: number;
  cursorY: number;
  // Burn & bloom
  burnEffect: number;
  bloomEffect: number;
  // Image outline ring
  imageOutline: number;
  imageOutlineColor: string;
  // Spotlight position
  spotlightX: number;
  spotlightY: number;
  // Custom text drop shadow
  textDropShadow: boolean;
  textShadowX: number;
  textShadowY: number;
  textShadowBlur: number;
  textShadowColor: string;
  // Paper texture overlay
  paperTexture: number;
  // Reflection gap
  reflectionGap: number;
  // Gradient map (tone-map image to two colors)
  gradientMap: boolean;
  gradientMapColor1: string;
  gradientMapColor2: string;
  // Frame chrome customization
  frameColor: string;
  frameOpacity: number;
  // Depth of field (radial center blur)
  depthOfField: boolean;
  depthOfFieldRadius: number;
  // Retro wave overlay
  retroWave: boolean;
  retroWaveOpacity: number;
  retroWaveAngle: number;
  // Overlay decorations
  gridLines: number;           // 0-100 canvas grid line intensity
  crosshair: boolean;          // crosshair/reticle over canvas
  crosshairColor: string;
  rainbowBorder: boolean;      // rainbow gradient border
  // Badge extras
  badgeSize: number;
  badgeRadius: number;
  // Image blend mode
  imageBlendMode: string;      // 'normal' | 'multiply' | 'screen' | 'overlay' | 'luminosity' | 'color'
  // Bokeh / bubble overlay
  bokehOverlay: number;
  bokehColor: string;
  // Stamp / ink effect
  stampEffect: boolean;
  stampColor: string;
}

export interface StyleTemplate {
  id: string;
  name: string;
  emoji: string;
  overrides: Partial<EditorState>;
}

/* ── Aspect ratios ─────────────────────────────── */
export const ASPECT_PRESETS: AspectPreset[] = [
  { id: 'auto',      name: 'Auto',      width: 0,    height: 0,    label: 'Auto' },
  { id: '16:9',      name: '16:9',      width: 1920, height: 1080, label: 'Widescreen' },
  { id: '4:3',       name: '4:3',       width: 1600, height: 1200, label: 'Standard' },
  { id: '1:1',       name: '1:1',       width: 1080, height: 1080, label: 'Square' },
  { id: '4:5',       name: '4:5',       width: 1080, height: 1350, label: 'Instagram' },
  { id: '9:16',      name: '9:16',      width: 1080, height: 1920, label: 'Story' },
  { id: 'og',        name: 'OG',        width: 1200, height: 630,  label: 'Open Graph' },
  { id: 'twitter',   name: 'Twitter',   width: 1600, height: 900,  label: 'Twitter Card' },
  { id: 'linkedin',  name: 'LinkedIn',  width: 1200, height: 627,  label: 'LinkedIn' },
  { id: 'ph',        name: 'PH',        width: 1270, height: 760,  label: 'Product Hunt' },
  { id: '21:9',      name: '21:9',      width: 2560, height: 1080, label: 'Ultrawide' },
  { id: '2:1',       name: '2:1',       width: 2000, height: 1000, label: 'Panorama' },
  { id: 'youtube',   name: 'YT',        width: 1280, height: 720,  label: 'YouTube' },
  { id: 'pinterest', name: 'Pin',       width: 1000, height: 1500, label: 'Pinterest' },
  { id: 'tiktok',    name: 'TikTok',    width: 1080, height: 1920, label: 'TikTok' },
  { id: 'discord',   name: 'Discord',   width: 1280, height: 720,  label: 'Discord' },
  { id: 'facebook',  name: 'FB',        width: 1200, height: 628,  label: 'Facebook Ad' },
  { id: 'twitch',    name: 'Twitch',    width: 1280, height: 720,  label: 'Twitch' },
  { id: 'behance',   name: 'Behance',   width: 808,  height: 1000, label: 'Behance' },
  { id: '5:4',       name: '5:4',       width: 1250, height: 1000, label: 'Photo Print' },
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
  { id: 'solid-black', name: 'Black',  category: 'solid', style: '#000000',     css: '#000000' },
  { id: 'solid-white', name: 'White',  category: 'solid', style: '#ffffff',     css: '#ffffff' },
  { id: 'solid-dark',  name: 'Dark',   category: 'solid', style: '#18181b',     css: '#18181b' },
  { id: 'solid-gray',  name: 'Gray',   category: 'solid', style: '#3f3f46',     css: '#3f3f46' },
  { id: 'solid-slate', name: 'Slate',  category: 'solid', style: '#1e293b',     css: '#1e293b' },
  { id: 'transparent', name: 'None',   category: 'solid', style: 'transparent', css: 'transparent' },
];

export const FILM_LOOKS = [
  { id: 'none',     name: 'None',      filters: '' },
  { id: 'portra',   name: 'Portra',    filters: 'contrast(95%) saturate(115%) sepia(8%)' },
  { id: 'velvia',   name: 'Velvia',    filters: 'contrast(115%) saturate(145%) brightness(98%)' },
  { id: 'cross',    name: 'Cross',     filters: 'contrast(110%) saturate(130%) hue-rotate(30deg)' },
  { id: 'bleach',   name: 'Bleach',    filters: 'contrast(95%) saturate(65%) brightness(112%)' },
  { id: 'goldenhr', name: 'Golden Hr', filters: 'sepia(20%) saturate(110%) brightness(102%) hue-rotate(-10deg)' },
  { id: 'bluehr',   name: 'Blue Hr',   filters: 'hue-rotate(195deg) saturate(80%) contrast(105%)' },
  { id: 'lomo',     name: 'Lomo',      filters: 'contrast(125%) saturate(125%) sepia(20%)' },
  { id: 'vintage',  name: 'Vintage',   filters: 'sepia(45%) saturate(80%) contrast(88%) brightness(108%)' },
  { id: 'cinema',   name: 'Cinema',    filters: 'grayscale(20%) contrast(112%) brightness(94%)' },
  { id: 'chrome',   name: 'Chrome',    filters: 'contrast(112%) saturate(108%) brightness(102%)' },
  { id: 'bw',       name: 'B&W',       filters: 'grayscale(100%) contrast(108%)' },
  { id: 'fuji',     name: 'Fuji',      filters: 'saturate(118%) contrast(104%) sepia(6%)' },
];

export const SHADOW_COLORS = [
  { id: 'black',  name: 'Black',  value: 'rgba(0,0,0,0.5)' },
  { id: 'purple', name: 'Purple', value: 'rgba(139,92,246,0.4)' },
  { id: 'blue',   name: 'Blue',   value: 'rgba(59,130,246,0.4)' },
  { id: 'pink',   name: 'Pink',   value: 'rgba(236,72,153,0.4)' },
  { id: 'green',  name: 'Green',  value: 'rgba(16,185,129,0.4)' },
  { id: 'orange', name: 'Orange', value: 'rgba(249,115,22,0.4)' },
  { id: 'cyan',   name: 'Cyan',   value: 'rgba(6,182,212,0.4)' },
  { id: 'teal',   name: 'Teal',   value: 'rgba(20,184,166,0.4)' },
  { id: 'gold',   name: 'Gold',   value: 'rgba(234,179,8,0.4)' },
];

export const GLOW_COLORS = [
  { id: 'purple', name: 'Purple', value: 'rgba(139,92,246,0.8)' },
  { id: 'pink',   name: 'Pink',   value: 'rgba(236,72,153,0.8)' },
  { id: 'blue',   name: 'Blue',   value: 'rgba(59,130,246,0.8)' },
  { id: 'cyan',   name: 'Cyan',   value: 'rgba(6,182,212,0.8)' },
  { id: 'green',  name: 'Green',  value: 'rgba(16,185,129,0.8)' },
  { id: 'orange', name: 'Orange', value: 'rgba(249,115,22,0.8)' },
  { id: 'white',  name: 'White',  value: 'rgba(255,255,255,0.6)' },
  { id: 'gold',   name: 'Gold',   value: 'rgba(234,179,8,0.8)' },
];

export const BG_PATTERNS = [
  { id: 'none',      name: 'None' },
  { id: 'dots',      name: 'Dots' },
  { id: 'grid',      name: 'Grid' },
  { id: 'lines',     name: 'Lines' },
  { id: 'cross',     name: 'Cross' },
  { id: 'diagonal',  name: 'Diag' },
  { id: 'circles',   name: 'Circles' },
  { id: 'chevron',   name: 'Chevron' },
  { id: 'triangles', name: 'Tri' },
  { id: 'waves',     name: 'Waves' },
  { id: 'hexagons',  name: 'Hex' },
  { id: 'bricks',    name: 'Bricks' },
  { id: 'plaid',     name: 'Plaid' },
];

export const TITLE_FONTS = [
  { id: 'Inter',              name: 'Inter' },
  { id: 'Georgia',            name: 'Georgia' },
  { id: 'monospace',          name: 'Mono' },
  { id: 'system-ui',          name: 'System' },
  { id: 'serif',              name: 'Serif' },
  { id: 'Courier New',        name: 'Courier' },
  { id: 'cursive',            name: 'Cursive' },
  { id: 'Impact',             name: 'Impact' },
  { id: "'Playfair Display'", name: 'Playfair' },
  { id: "'Space Mono'",       name: 'Space Mono' },
  { id: "'Oswald'",           name: 'Oswald' },
  { id: "'Cinzel'",           name: 'Cinzel' },
  { id: "'Dancing Script'",   name: 'Dancing' },
];

export const DEFAULT_STATE: EditorState = {
  image: null,
  fileName: '',
  background: GRADIENT_PRESETS[6].css,
  backgroundId: GRADIENT_PRESETS[6].id,
  customBgColor1: '#667eea',
  customBgColor2: '#764ba2',
  bgAngle: 135,
  bgPattern: 'none',
  bgPatternOpacity: 0.1,
  bgNoise: 0,
  bgOpacity: 100,
  bgRadial: false,
  patternScale: 20,
  bgImage: null,
  padding: 64,
  borderRadius: 12,
  aspectRatio: 'auto',
  imageZoom: 1,
  imagePanX: 0,
  imagePanY: 0,
  imageBorderRadius: 0,
  imageFitMode: 'cover',
  shadow: 40,
  shadowColor: 'rgba(0,0,0,0.5)',
  shadowX: 0,
  shadowY: 0,
  shadowBlur: 0,
  frame: 'none',
  tiltX: 0,
  tiltY: 0,
  scale: 1,
  rotation: 0,
  canvasRotation: 0,
  skewX: 0,
  skewY: 0,
  flipY: false,
  perspectiveDistance: 1000,
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  sepia: 0,
  grayscale: 0,
  hueRotate: 0,
  invert: false,
  vignette: 0,
  vignetteColor: '#000000',
  flipX: false,
  temperature: 0,
  fade: 0,
  sharpness: 0,
  highlights: 0,
  shadows: 0,
  noiseOnImage: 0,
  duotone: false,
  duotoneHighlight: '#ff6600',
  duotoneShadow: '#3300cc',
  borderWidth: 0,
  borderColor: 'rgba(255,255,255,0.2)',
  borderStyle: 'solid',
  titleText: '',
  titleSize: 32,
  titleColor: '#ffffff',
  titleFont: 'Inter',
  titlePosition: 'above',
  titleWeight: 'bold',
  titleShadow: false,
  titleItalic: false,
  titleAllCaps: false,
  titleOpacity: 100,
  titleGradient: false,
  titleGradientColor2: '#ec4899',
  textAlign: 'center',
  letterSpacing: 0,
  lineHeight: 1.25,
  subtitleText: '',
  subtitleSize: 16,
  subtitleColor: 'rgba(255,255,255,0.6)',
  bodyText: '',
  bodySize: 14,
  bodyColor: 'rgba(255,255,255,0.5)',
  textBg: 'none',
  textBgColor: '#000000',
  textBgOpacity: 50,
  textStroke: 0,
  textStrokeColor: '#000000',
  watermark: true,
  isPro: false,
  reflection: false,
  reflectionOpacity: 35,
  reflectionHeight: 60,
  previewGrid: false,
  glowIntensity: 0,
  glowColor: 'rgba(139,92,246,0.8)',
  colorOverlay: '#8b5cf6',
  colorOverlayOpacity: 0,
  colorOverlayBlendMode: 'color',
  scanlines: 0,
  scanlinesSpacing: 4,
  scanlinesColor: 'dark',
  filmGrain: 0,
  bgBlur: 0,
  innerShadow: 0,
  innerGlowIntensity: 0,
  innerGlowColor: 'rgba(255,255,255,0.6)',
  lightLeak: 0,
  lightLeakAngle: 315,
  chromaAberration: 0,
  glitch: 0,
  halftone: 0,
  fog: 0,
  stars: 0,
  rain: 0,
  lensFlare: 0,
  lensFlareX: 20,
  lensFlareY: 15,
  spotlight: 0,
  cornerDots: false,
  showRuleOfThirds: false,
  logoImage: null,
  logoPosition: 'br',
  logoSize: 60,
  logoOpacity: 100,
  logoPadding: 16,
  exportScale: 2,
  exportFormat: 'png',
  exportFilename: '',
  exportTransparent: false,
  exportQuality: 92,
  imageClipShape: 'none',
  imageOpacity: 100,
  imageRotation: 0,
  filmLook: 'none',
  splitTone: false,
  splitToneHighlightColor: '#ffcc66',
  splitToneShadowColor: '#3366cc',
  splitToneHighlightStrength: 30,
  splitToneShadowStrength: 30,
  tiltShift: false,
  tiltShiftBlur: 10,
  tiltShiftCenter: 50,
  tiltShiftRange: 30,
  badge: '',
  badgePosition: 'tr',
  badgeColor: '#8b5cf6',
  emojiOverlay: '',
  emojiSize: 48,
  emojiPositionX: 50,
  emojiPositionY: 50,
  neonTextGlow: false,
  neonGlowColor: '#00ffff',
  neonGlowIntensity: 60,
  textRotation: 0,
  wordSpacing: 0,
  prismEffect: 0,
  sunburst: 0,
  sunburstX: 50,
  sunburstY: 50,
  sunburstColor: '#ffee88',
  shadowSpread: 0,
  vibrance: 0,
  uniformPadding: true,
  paddingTop: 64,
  paddingRight: 64,
  paddingBottom: 64,
  paddingLeft: 64,
  watermarkText: '',
  watermarkOpacity: 70,
  watermarkPosition: 'br',
  watermarkSize: 11,
  doubleShadow: false,
  shadow2Color: 'rgba(139,92,246,0.3)',
  shadow2X: 20,
  shadow2Y: 20,
  shadow2Blur: 40,
  imageGlow: 0,
  imageGlowColor: 'rgba(255,255,255,0.8)',
  pixelate: 0,
  bgTint: 0,
  bgTintColor: '#8b5cf6',
  cursorOverlay: false,
  cursorX: 50,
  cursorY: 50,
  burnEffect: 0,
  bloomEffect: 0,
  imageOutline: 0,
  imageOutlineColor: '#ffffff',
  spotlightX: 50,
  spotlightY: 50,
  textDropShadow: false,
  textShadowX: 2,
  textShadowY: 2,
  textShadowBlur: 8,
  textShadowColor: 'rgba(0,0,0,0.6)',
  paperTexture: 0,
  reflectionGap: 2,
  gradientMap: false,
  gradientMapColor1: '#000000',
  gradientMapColor2: '#ffffff',
  frameColor: '',
  frameOpacity: 100,
  depthOfField: false,
  depthOfFieldRadius: 40,
  retroWave: false,
  retroWaveOpacity: 60,
  retroWaveAngle: 0,
  gridLines: 0,
  crosshair: false,
  crosshairColor: 'rgba(255,255,255,0.6)',
  rainbowBorder: false,
  badgeSize: 11,
  badgeRadius: 6,
  imageBlendMode: 'normal',
  bokehOverlay: 0,
  bokehColor: 'rgba(255,255,255,0.3)',
  stampEffect: false,
  stampColor: '#cc0000',
};

export const STYLE_TEMPLATES: StyleTemplate[] = [
  {
    id: 'clean',
    name: 'Clean',
    emoji: '✨',
    overrides: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', backgroundId: 'sunset',
      padding: 64, borderRadius: 12, shadow: 40, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0, shadowY: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', bgNoise: 0, borderWidth: 0,
      sepia: 0, grayscale: 0, hueRotate: 0, invert: false,
      glowIntensity: 0, scanlines: 0, filmGrain: 0, vignette: 0,
      lightLeak: 0, fog: 0, stars: 0, glitch: 0, chromaAberration: 0,
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
      borderWidth: 4, borderColor: '#8B6914',
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
      aspectRatio: '21:9', bgPattern: 'none', borderWidth: 0,
      vignette: 60, scanlines: 10, filmGrain: 20, grayscale: 20,
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
      borderWidth: 3, borderStyle: 'gradient',
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
      aspectRatio: 'ph',
    },
  },
  // NEW TEMPLATES
  {
    id: 'glassmorphism',
    name: 'Glass',
    emoji: '🪟',
    overrides: {
      background: 'radial-gradient(ellipse 80% 80% at 20% 20%, rgba(120,40,200,0.85) 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 80% 10%, rgba(0,200,180,0.7) 0%, transparent 55%), #0a0a1a',
      backgroundId: 'mesh-aurora',
      padding: 48, borderRadius: 20, shadow: 60, shadowColor: 'rgba(0,0,0,0.4)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)',
      bgBlur: 0, colorOverlayOpacity: 8, colorOverlay: '#ffffff',
      colorOverlayBlendMode: 'screen', glowIntensity: 20, glowColor: 'rgba(255,255,255,0.3)',
    },
  },
  {
    id: 'notion-dark',
    name: 'Notion',
    emoji: '📝',
    overrides: {
      background: '#191919', backgroundId: 'solid-dark',
      padding: 40, borderRadius: 8, shadow: 30, shadowColor: 'rgba(0,0,0,0.6)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'none', borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)',
      brightness: 100, contrast: 100, saturation: 95,
    },
  },
  {
    id: 'saas-hero',
    name: 'SaaS',
    emoji: '⚡',
    overrides: {
      background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(120,0,220,0.9) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(0,80,220,0.8) 0%, transparent 50%), #050010',
      backgroundId: 'mesh-cosmic',
      padding: 80, borderRadius: 16, shadow: 80, shadowColor: 'rgba(139,92,246,0.5)', shadowX: 0,
      frame: 'browser', tiltX: 0, tiltY: 0, scale: 0.9, rotation: 0,
      glowIntensity: 30, glowColor: 'rgba(139,92,246,0.8)',
      bgPattern: 'dots', bgPatternOpacity: 0.06,
      borderWidth: 1, borderColor: 'rgba(139,92,246,0.3)',
    },
  },
  {
    id: 'dev-dark',
    name: 'Dev',
    emoji: '👨‍💻',
    overrides: {
      background: '#0d1117', backgroundId: 'solid-dark',
      padding: 48, borderRadius: 10, shadow: 60, shadowColor: 'rgba(0,0,0,0.8)', shadowX: 0,
      frame: 'terminal', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'grid', bgPatternOpacity: 0.04,
      borderWidth: 1, borderColor: 'rgba(48,54,61,1)',
    },
  },
  {
    id: 'presentation',
    name: 'Slides',
    emoji: '📊',
    overrides: {
      background: '#f8f9fa', backgroundId: 'solid-white',
      padding: 56, borderRadius: 12, shadow: 25, shadowColor: 'rgba(0,0,0,0.15)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: '16:9', bgPattern: 'none',
      borderWidth: 2, borderColor: 'rgba(0,0,0,0.06)',
    },
  },
  {
    id: 'game-screenshot',
    name: 'Game',
    emoji: '🎮',
    overrides: {
      background: 'linear-gradient(135deg, #0d0d0d 0%, #003300 50%, #00ff41 100%)', backgroundId: 'cyber',
      padding: 48, borderRadius: 4, shadow: 80, shadowColor: 'rgba(0,255,65,0.3)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'grid', bgPatternOpacity: 0.08,
      borderWidth: 2, borderColor: 'rgba(0,255,65,0.5)',
      glowIntensity: 50, glowColor: 'rgba(0,255,65,0.6)',
      scanlines: 15, filmGrain: 10, vignette: 40,
    },
  },
  {
    id: 'portfolio',
    name: 'Portfolio',
    emoji: '🎨',
    overrides: {
      background: '#1a1a1a', backgroundId: 'solid-dark',
      padding: 60, borderRadius: 0, shadow: 0, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      aspectRatio: '4:3', bgPattern: 'none',
      borderWidth: 8, borderColor: '#ffffff',
    },
  },
  {
    id: 'viral-social',
    name: 'Viral',
    emoji: '🔴',
    overrides: {
      background: 'linear-gradient(135deg, #f857a6 0%, #ff5858 100%)', backgroundId: 'flamingo',
      padding: 40, borderRadius: 24, shadow: 60, shadowColor: 'rgba(248,87,166,0.5)', shadowX: 0,
      frame: 'phone', tiltX: 0, tiltY: -6, scale: 0.88, rotation: 0,
      glowIntensity: 50, glowColor: 'rgba(248,87,166,0.8)',
      bgPattern: 'none', bgNoise: 5,
    },
  },
  {
    id: 'macbook-hero',
    name: 'MacBook',
    emoji: '🍎',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', backgroundId: 'cobalt',
      padding: 64, borderRadius: 8, shadow: 70, shadowColor: 'rgba(0,0,0,0.6)', shadowX: 0,
      frame: 'macbook', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
    },
  },
  {
    id: 'polaroid-style',
    name: 'Polaroid',
    emoji: '📷',
    overrides: {
      background: '#f0ebe3', backgroundId: 'solid-white',
      padding: 32, borderRadius: 4, shadow: 40, shadowColor: 'rgba(0,0,0,0.25)', shadowX: 4,
      frame: 'polaroid', tiltX: 0, tiltY: 0, scale: 1, rotation: 3,
      bgPattern: 'none',
    },
  },
  {
    id: 'app-store',
    name: 'App Store',
    emoji: '📦',
    overrides: {
      background: 'linear-gradient(135deg, #0093E9 0%, #80D0C7 100%)', backgroundId: 'ocean',
      padding: 56, borderRadius: 16, shadow: 60, shadowColor: 'rgba(0,147,233,0.3)', shadowX: 0,
      frame: 'phone', tiltX: 0, tiltY: 8, scale: 0.85, rotation: 0,
      glowIntensity: 25, glowColor: 'rgba(0,147,233,0.6)',
      aspectRatio: '4:5',
    },
  },
  {
    id: 'miniature-look',
    name: 'Miniature',
    emoji: '🔭',
    overrides: {
      background: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)', backgroundId: 'forest',
      padding: 64, borderRadius: 12, shadow: 50, shadowColor: 'rgba(0,0,0,0.4)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      tiltShift: true, tiltShiftBlur: 12, tiltShiftCenter: 50, tiltShiftRange: 25,
      filmLook: 'velvia', saturation: 120,
    },
  },
  {
    id: 'double-shadow-hero',
    name: 'Elevated',
    emoji: '⬆️',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', backgroundId: 'cobalt',
      padding: 72, borderRadius: 16, shadow: 60, shadowColor: 'rgba(0,0,0,0.6)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      doubleShadow: true, shadow2Color: 'rgba(59,130,246,0.2)', shadow2X: 0, shadow2Y: 50, shadow2Blur: 80,
      glowIntensity: 30, glowColor: 'rgba(59,130,246,0.6)',
    },
  },
  {
    id: 'film-noir',
    name: 'Noir',
    emoji: '🎞️',
    overrides: {
      background: '#000000', backgroundId: 'solid-black',
      padding: 48, borderRadius: 0, shadow: 0, shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      filmLook: 'bw', grayscale: 100, contrast: 115, fade: 15,
      vignette: 70, vignetteColor: '#000000', burnEffect: 60,
      scanlines: 8, filmGrain: 35,
    },
  },
  {
    id: 'vintage-photo',
    name: 'Vintage',
    emoji: '📸',
    overrides: {
      background: '#f0ebe3', backgroundId: 'solid-white',
      padding: 40, borderRadius: 4, shadow: 30, shadowColor: 'rgba(0,0,0,0.2)', shadowX: 4,
      frame: 'polaroid', tiltX: 0, tiltY: 0, scale: 1, rotation: -2,
      filmLook: 'vintage', sepia: 25, vignette: 35, filmGrain: 45,
      paperTexture: 40,
    },
  },
  {
    id: 'cyberpunk',
    name: 'Cyber',
    emoji: '🤖',
    overrides: {
      background: 'linear-gradient(135deg, #0d0d0d 0%, #1a0033 50%, #000d1a 100%)', backgroundId: 'solid-dark',
      padding: 48, borderRadius: 0, shadow: 80, shadowColor: 'rgba(0,255,255,0.3)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bgPattern: 'grid', bgPatternOpacity: 0.12,
      borderWidth: 2, borderColor: 'rgba(0,255,255,0.6)',
      glowIntensity: 70, glowColor: 'rgba(0,255,255,0.8)',
      rainbowBorder: false, scanlines: 12, filmGrain: 8,
      neonTextGlow: true, neonGlowColor: '#00ffff', neonGlowIntensity: 80,
    },
  },
  {
    id: 'dreamy',
    name: 'Dreamy',
    emoji: '💭',
    overrides: {
      background: 'radial-gradient(ellipse 80% 70% at 30% 20%, rgba(255,180,200,0.85) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 70% 70%, rgba(180,200,255,0.75) 0%, transparent 50%), #100818',
      backgroundId: 'mesh-spring',
      padding: 72, borderRadius: 32, shadow: 60, shadowColor: 'rgba(200,150,255,0.3)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      bloomEffect: 35, vignette: 20, vignetteColor: '#1a0030',
      filmGrain: 15, glowIntensity: 25, glowColor: 'rgba(180,150,255,0.6)',
      saturation: 115, fade: 10,
    },
  },
  {
    id: 'bold-card',
    name: 'Bold',
    emoji: '💥',
    overrides: {
      background: '#0a0a0a', backgroundId: 'solid-black',
      padding: 64, borderRadius: 20, shadow: 100, shadowColor: 'rgba(0,0,0,0.8)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 0.88, rotation: 0,
      borderWidth: 3, borderColor: '#ffffff',
      doubleShadow: true, shadow2Color: 'rgba(255,255,255,0.08)', shadow2X: 0, shadow2Y: -6, shadow2Blur: 30,
      contrast: 108, brightness: 102,
    },
  },
  {
    id: 'depth-focus',
    name: 'Focus',
    emoji: '🎯',
    overrides: {
      background: 'radial-gradient(ellipse 80% 60% at 20% 30%, rgba(120,0,220,0.9) 0%, transparent 55%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(0,80,220,0.8) 0%, transparent 50%), #050010',
      backgroundId: 'mesh-cosmic',
      padding: 80, borderRadius: 16, shadow: 70, shadowColor: 'rgba(139,92,246,0.4)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      depthOfField: true, depthOfFieldRadius: 45,
      glowIntensity: 20, glowColor: 'rgba(139,92,246,0.7)',
    },
  },
  {
    id: 'stamp-art',
    name: 'Stamp',
    emoji: '🔖',
    overrides: {
      background: '#f5f0e8', backgroundId: 'solid-white',
      padding: 48, borderRadius: 4, shadow: 20, shadowColor: 'rgba(0,0,0,0.2)', shadowX: 4,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 1,
      stampEffect: true, stampColor: '#cc0000',
      sepia: 20, vignette: 25, paperTexture: 30,
      borderWidth: 3, borderColor: 'rgba(0,0,0,0.15)',
    },
  },
];
