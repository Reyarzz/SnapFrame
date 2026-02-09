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

export interface EditorState {
  image: string | null;
  fileName: string;
  background: string;
  backgroundId: string;
  padding: number;
  borderRadius: number;
  shadow: number;
  shadowColor: string;
  frame: string;
  scale: number;
  rotation: number;
  watermark: boolean;
  isPro: boolean;
}

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

export const DEFAULT_STATE: EditorState = {
  image: null,
  fileName: '',
  background: GRADIENT_PRESETS[0].css,
  backgroundId: GRADIENT_PRESETS[0].id,
  padding: 64,
  borderRadius: 12,
  shadow: 40,
  shadowColor: 'rgba(0,0,0,0.5)',
  frame: 'none',
  scale: 1,
  rotation: 0,
  watermark: true,
  isPro: false,
};
