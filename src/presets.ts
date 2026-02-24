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
  // Batch 5
  // Overlay pattern (2nd pattern layer with custom color)
  overlayPatternColor: string;
  overlayPatternOpacity: number;
  overlayPatternType: string;   // 'none' | 'confetti' | 'snow' | 'hearts' | 'stars2' | 'dots2'
  // Split screen diagonal overlay
  splitScreen: boolean;
  splitScreenColor1: string;
  splitScreenColor2: string;
  splitScreenAngle: number;
  // Text outline (SVG paint-order)
  textOutline: number;
  textOutlineColor: string;
  // Image filter presets (Instagram-like)
  imagePreset: string;
  // Frame inner padding (space between frame chrome and image)
  frameInnerPadding: number;
  // Global accent color applied to primary shadow & glow
  accentColor: string;
  useAccentColor: boolean;
  // Warp / distortion
  warpEffect: number;   // positive = barrel, negative = pincushion
  // Subtitle/body text transform
  subtitleAllCaps: boolean;
  // Canvas border radius override per corner (top-left, top-right, bottom-right, bottom-left)
  borderRadiusTL: number;
  borderRadiusTR: number;
  borderRadiusBR: number;
  borderRadiusBL: number;
  usePerCornerRadius: boolean;
  // Batch 6
  // Frosted glass / glassmorphism overlay
  glassEffect: number;        // 0-100 strength
  glassColor: string;         // tint color for glass overlay
  // Corner accent brackets
  cornerAccents: boolean;
  cornerAccentColor: string;
  cornerAccentSize: number;   // 10-60
  cornerAccentThickness: number; // 1-6
  // Frame outer glow (around the frame border, not image shadow)
  frameGlow: number;          // 0-100
  frameGlowColor: string;
  // Mirror / flip effect on canvas
  mirrorMode: string;         // 'none' | 'horizontal' | 'vertical' | 'both'
  // Texture noise overlay type
  noiseType: string;          // 'none' | 'film' | 'sand' | 'fabric' | 'static'
  noiseAmount: number;        // 0-100
  // Horizontal duotone split (top/bottom)
  duotoneSplit: boolean;
  duotoneSplitColor1: string; // top color
  duotoneSplitColor2: string; // bottom color
  duotoneSplitMidpoint: number; // 0-100 where split happens
  // Quick shadow preset
  shadowPreset: string;       // 'none' | 'soft' | 'hard' | 'float' | 'neon' | 'retro'
  // Text glitch (chromatic title shift)
  textGlitch: number;         // 0-20 pixel offset
  textGlitchColor1: string;
  textGlitchColor2: string;
  // Canvas outer border (separate from image border)
  canvasBorderWidth: number;
  canvasBorderColor: string;
  canvasBorderStyle: string;  // 'solid' | 'dashed' | 'dotted' | 'double'
  // Batch 7
  titleUnderline: boolean;
  textBoxPadding: number;
  textGradientAngle: number;
  bgOverlayGradient: string;
  bgOverlayGradientOpacity: number;
  stickerText: string;
  stickerX: number;
  stickerY: number;
  stickerSize: number;
  stickerBg: string;
  stickerColor: string;
  stickerRadius: number;
  progressBar: boolean;
  progressBarValue: number;
  progressBarColor: string;
  progressBarBg: string;
  progressBarHeight: number;
  progressBarPosition: string;
  tagLine: string;
  tagLineColor: string;
  tagLineBg: string;
  canvasGradientOverlay: boolean;
  canvasGradientOverlayAngle: number;
  canvasGradientOverlayColor1: string;
  canvasGradientOverlayColor2: string;
  canvasGradientOverlayOpacity: number;
  overlayBlur: number;
  titleBackground: boolean;
  titleBackgroundColor: string;
  titleBackgroundPadding: number;
  // Batch 8
  lineAccent: boolean;         // horizontal line between title and subtitle
  lineAccentColor: string;
  lineAccentWidth: number;     // 0-100% of block width
  lineAccentHeight: number;    // 1-6px thickness
  logoRotation: number;        // -180 to 180
  imageColorShift: string;     // 'none' | 'red' | 'green' | 'blue' | 'cyan' | 'magenta' | 'yellow'
  imageColorShiftAmount: number; // 0-100
  bgPatternColor: string;      // custom tint color for bg pattern
  bgPatternColorEnabled: boolean;
  textSpacingPreset: string;   // 'normal' | 'compact' | 'wide' | 'ultra'
  accentLine: boolean;         // decorative accent line on canvas
  accentLineColor: string;
  accentLinePosition: string;  // 'top' | 'bottom' | 'left' | 'right'
  accentLineThickness: number; // 2-12
  chipText: string;            // annotation chip text
  chipX: number;
  chipY: number;
  chipColor: string;
  imageInnerGlow: number;      // inner glow on image (same as imageGlow but inset)
  imageInnerGlowColor: string;
  canvasInsetShadow: number;   // inset box-shadow on canvas
  vignetteShape: string;       // 'elliptical' | 'linear-v' | 'linear-h'
  // Batch 9
  titleShadowBlur: number;     // text shadow blur on title
  titleShadowColor: string;
  titleShadowX: number;
  titleShadowY: number;
  subtitleOpacity: number;     // 0-100
  bodyTextColor: string;
  bodyTextSize: number;
  imageSepia: number;          // 0-100 sepia on image
  imageCoolTone: boolean;      // cool blue cast on image
  imageWarmTone: boolean;      // warm orange cast on image
  stripeBg: boolean;           // alternating stripe bg pattern
  stripeBgColor1: string;
  stripeBgColor2: string;
  stripeBgAngle: number;
  frameDoubleBorder: boolean;  // double border ring inside frame
  frameDoubleBorderColor: string;
  frameDoubleBorderGap: number;
  cardStack: boolean;          // stacked card effect behind canvas
  cardStackColor: string;
  cardStackOffset: number;
  overlayDots: boolean;        // polka dot overlay
  overlayDotsColor: string;
  overlayDotsSize: number;
  overlayDotsOpacity: number;
  titleCaps: boolean;          // force title uppercase
  gradientText2: boolean;      // second gradient line on subtitle
  gradientText2Color1: string;
  gradientText2Color2: string;
  // Batch 10
  titleLetterSpacing: number;   // extra letter spacing just for title (em units * 100)
  subtitleFont: string;         // separate font for subtitle
  textShadowSpread: number;     // 0-30 spread on text block shadow
  overlayGrid: boolean;         // grid line overlay
  overlayGridColor: string;
  overlayGridSize: number;
  overlayGridOpacity: number;
  imageBorder: boolean;         // thin border around image inset
  imageBorderColor: string;
  imageBorderWidth: number;
  pulseRing: boolean;           // animated-look pulsing ring around image
  pulseRingColor: string;
  pulseRingSize: number;
  cornerRibbon: boolean;        // diagonal ribbon in corner (like "SALE" banner)
  cornerRibbonText: string;
  cornerRibbonColor: string;
  cornerRibbonBg: string;
  cornerRibbonCorner: string;   // 'tl'|'tr'|'bl'|'br'
  textHighlight: boolean;       // highlighted text background mark behind title chars
  textHighlightColor: string;
  bgBlurStrength: number;       // explicit bg blur (replaces bgBlur for more control)
  imageRounded: boolean;        // force image to circle/round shape
  imageRoundedAmount: number;   // 0-50% border-radius on image
  countdownBadge: boolean;      // numbered countdown badge overlay
  countdownValue: number;
  countdownColor: string;
  countdownBg: string;
  // Batch 11
  textBoxBorder: boolean;       // border around the text block
  textBoxBorderColor: string;
  textBoxBorderWidth: number;
  textBoxBorderRadius: number;
  imageGrayscale: number;       // 0-100 grayscale on image
  imagePixelate: number;        // pixel block size for pixelate FX (separate from global)
  bgMeshOpacity: number;        // mesh gradient opacity override
  gradientOverlayBlend: string; // 'normal'|'multiply'|'screen'|'overlay'|'soft-light'
  splitPane: boolean;           // split pane: image left, text right
  splitPaneRatio: number;       // 30-70 split percentage
  splitPaneBg: string;          // background for text side
  floatingLabel: boolean;       // floating top-center label bar
  floatingLabelText: string;
  floatingLabelBg: string;
  floatingLabelColor: string;
  imageSaturationBoost: number; // -100 to +100 saturation shift
  canvasPaddingTop: number;     // individual padding sides
  canvasPaddingBottom: number;
  canvasPaddingLeft: number;
  canvasPaddingRight: number;
  useCustomPadding: boolean;    // toggle per-side padding
  textShadowPreset: string;     // 'none'|'soft'|'hard'|'glow'|'retro'
  badgePulse: boolean;          // pulsing ring on badge
  // Batch 12
  titleFont2: string;           // second font applied to alternating words
  titleFont2Enabled: boolean;
  imageVignette: boolean;       // vignette applied only to image (not whole canvas)
  imageVignetteColor: string;
  imageVignetteSize: number;    // 0-100
  scrollingText: boolean;       // marquee-style text at bottom
  scrollingTextContent: string;
  scrollingTextColor: string;
  scrollingTextBg: string;
  scrollingTextSize: number;
  dividerLine: boolean;         // horizontal divider between image and text
  dividerLineColor: string;
  dividerLineHeight: number;
  dividerLineStyle: string;     // 'solid'|'dashed'|'dotted'|'double'
  overlayHalftone: boolean;     // halftone dot overlay (different from scanlines)
  overlayHalftoneColor: string;
  overlayHalftoneDensity: number;
  imageOverlayText: string;     // text printed directly over the image
  imageOverlayTextColor: string;
  imageOverlayTextSize: number;
  imageOverlayTextOpacity: number;
  bgGradientStops: number;      // number of gradient stops (2-4)
  bgGradientColor3: string;     // 3rd gradient stop
  bgGradientColor4: string;     // 4th gradient stop
  // Batch 13
  titleOutlineOnly: boolean;    // show only stroke outline, no fill on title
  titleOutlineWidth: number;    // 1-8px
  titleOutlineColor: string;
  imageTiltX: number;           // -20 to 20 horizontal tilt on image (CSS perspective)
  imageTiltY: number;           // -20 to 20 vertical tilt
  noiseGrain: boolean;          // fine grain noise across whole canvas
  noiseGrainOpacity: number;    // 0-100
  photoTilt: boolean;           // slight tilt on photo card (like Polaroid)
  photoTiltAngle: number;       // -15 to 15
  subtitleBold: boolean;        // bold subtitle
  subtitleItalic: boolean;
  subtitleUnderline: boolean;
  iconBar: boolean;             // row of social-style icons at bottom
  iconBarStyle: string;         // 'social'|'stars'|'arrows'|'dots'
  iconBarColor: string;
  overlayLinear: boolean;       // linear gradient overlay (top-to-bottom)
  overlayLinearColor1: string;
  overlayLinearColor2: string;
  overlayLinearOpacity: number;
  quoteStyle: boolean;          // render title as large quote with " marks
  quoteMarkColor: string;
  colorDuotoneMap: boolean;     // full duotone color mapping (separate from split)
  colorDuotoneMapColor1: string;
  colorDuotoneMapColor2: string;
  // Batch 14
  textReveal: boolean;          // reveal-style masked text (clip-path stripe)
  textRevealColor: string;
  backdropBlurCard: boolean;    // frosted glass card behind text
  backdropBlurCardBg: string;
  backdropBlurCardBlur: number;
  backdropBlurCardOpacity: number;
  imageShadow: boolean;         // drop shadow below image (perspective floor shadow)
  imageShadowColor: string;
  imageShadowBlur: number;
  framePolaroidLabel: string;   // text label below image in polaroid style
  framePolaroidLabelColor: string;
  bgAnimatedGradient: boolean;  // animated gradient (CSS @keyframes — static snapshot)
  bgAnimatedGradientSpeed: number;
  imageHueShift: number;        // -180 to 180 hue-rotate on image
  titleSkew: number;            // -20 to 20 skewX on title
  overlayVHS: boolean;          // VHS scanline + color shift combo
  overlayVHSIntensity: number;
  tiltShiftImage: boolean;      // tilt-shift blur on image (top + bottom blur)
  tiltShiftImageBlur: number;
  tiltShiftImageCenter: number; // 0-100% center of sharp band
  imagePerspective: string;     // 'flat'|'left'|'right'|'top'|'bottom' (CSS perspective)
  // Batch 15
  overlayRainbow: boolean;      // rainbow gradient overlay
  overlayRainbowOpacity: number;
  textNeonPulse: boolean;       // neon glow on title text
  textNeonPulseColor: string;
  textNeonPulseIntensity: number;
  imageSkewX: number;           // -20 to 20 horizontal skew on image
  imageSkewY: number;           // -20 to 20 vertical skew on image
  frameBadge: string;           // text in a corner status badge
  frameBadgeColor: string;
  frameBadgeBg: string;
  textBgGradient: boolean;      // gradient behind text block
  textBgGradientColor1: string;
  textBgGradientColor2: string;
  overlayAurora: boolean;       // aurora borealis gradient overlay
  overlayAuroraColor1: string;
  overlayAuroraColor2: string;
  overlayAuroraOpacity: number;
  imageVintageFrame: boolean;   // decorative vintage border on image
  imageVintageFrameColor: string;
  canvasGrain: boolean;         // grain on entire canvas (not just image)
  canvasGrainOpacity: number;
  titleBoxShadow: boolean;      // box shadow around title text wrapper
  titleBoxShadowColor: string;
  // Batch 16
  overlayHaze: boolean;         // soft haze/fog layer over canvas
  overlayHazeColor: string;
  overlayHazeOpacity: number;
  overlayBokeh: boolean;        // soft blurred bokeh circles overlay
  overlayBokehColor: string;
  overlayBokehOpacity: number;
  imageEdgeGlow: boolean;       // glowing halo around image edges
  imageEdgeGlowColor: string;
  imageEdgeGlowBlur: number;
  textUpperBand: boolean;       // colored label band at top of canvas
  textUpperBandBg: string;
  textUpperBandColor: string;
  textUpperBandText: string;
  overlayPrismatic: boolean;    // prismatic/iridescent light overlay
  overlayPrismaticOpacity: number;
  bgLayeredCards: boolean;      // stacked card layers behind main image
  bgLayeredCardsColor: string;
  bgLayeredCardsCount: number;
  titleDropCap: boolean;        // enlarged first letter of title
  logoText: string;             // text-only logo (no image needed)
  logoTextSize: number;
  logoTextColor: string;
  // Batch 17
  canvasStamp: boolean;         // diagonal APPROVED/SALE style stamp on canvas
  canvasStampText: string;
  canvasStampColor: string;
  canvasStampBg: string;
  textNeonBorder: boolean;      // neon glowing border around text block
  textNeonBorderColor: string;
  bgBubbles: boolean;           // floating bubble circles in background
  bgBubblesColor: string;
  bgBubblesOpacity: number;
  imageTexture: string;         // texture overlay on image: 'none'|'paper'|'canvas'|'linen'
  overlayRetroLines: boolean;   // retro horizontal colored lines overlay
  overlayRetroLinesColor: string;
  overlayRetroLinesOpacity: number;
  subtitleGradient: boolean;    // gradient fill on subtitle (separate from title gradient)
  subtitleGradientColor2: string;
  imageSolarize: boolean;       // solarize: partially invert bright tones
  imageColorLeakTop: boolean;   // warm color leak from top corner
  imageColorLeakColor: string;
  canvasRibbon: boolean;        // diagonal ribbon stripe across canvas (like corner ribbon but full-width)
  canvasRibbonText: string;
  canvasRibbonBg: string;
  canvasRibbonColor: string;
  // Batch 18
  imageLomo: boolean;           // lomo-style heavy vignette + saturation boost
  imageXProcess: boolean;       // cross-process color shift
  overlayGradientMesh: boolean; // multi-point mesh gradient overlay
  overlayGradientMeshOpacity: number;
  titleTypewriter: boolean;     // blinking cursor after title
  titleTypewriterColor: string;
  imageOverlayPattern: string;  // pattern on image: 'none'|'dots'|'lines'|'cross'
  imageOverlayPatternOpacity: number;
  bgWaves: boolean;             // wave lines in background
  bgWavesColor: string;
  bgWavesOpacity: number;
  imageColorMap: string;        // color scheme: 'none'|'cyber'|'matrix'|'fire'|'ice'
  frameMatte: boolean;          // thick museum matte border
  frameMatteColor: string;
  frameMatteWidth: number;
  textOutlineStroke: boolean;   // heavy outline preset on title
  textOutlineStrokeColor: string;
  canvasSpotlight: boolean;     // spotlight radial from center
  canvasSpotlightColor: string;
  canvasSpotlightStrength: number;
  // Batch 19
  titleGlitch: boolean;
  titleGlitchColor: string;
  bgDiamondPattern: boolean;
  bgDiamondOpacity: number;
  overlayHolographic: boolean;
  overlayHolographicOpacity: number;
  canvasBorderGlow: boolean;
  canvasBorderGlowColor: string;
  textHighlightBlock: boolean;
  textHighlightBlockColor: string;
  bgGlowOrb: boolean;
  bgGlowOrbColor: string;
  bgGlowOrbX: number;
  bgGlowOrbY: number;
  imageBloomLight: boolean;
  imageBloomLightColor: string;
  cardGlassOverlay: boolean;
  cardGlassOverlayBg: string;
  watermarkTiled: boolean;
  watermarkTiledText: string;
  // Batch 20
  bgGridLines: boolean;
  bgGridLinesColor: string;
  bgGridLinesOpacity: number;
  imageInkDrop: boolean;
  overlayDust: boolean;
  overlayDustOpacity: number;
  titleNeonSign: boolean;
  titleNeonSignColor: string;
  frameFilmStrip: boolean;
  bgCircuitBoard: boolean;
  bgCircuitBoardOpacity: number;
  imageChromeEffect: boolean;
  textKerningWide: boolean;
  overlayInkBleed: boolean;
  overlayInkBleedOpacity: number;
  bgHexGrid: boolean;
  bgHexGridColor: string;
  bgHexGridOpacity: number;
  // Batch 21
  titleStrikethrough: boolean;      // strikethrough decoration on title
  bgConcentricRings: boolean;       // concentric circle rings on background
  bgConcentricRingsColor: string;
  bgConcentricRingsOpacity: number;
  overlayLightRays: boolean;        // conic-gradient light beam rays
  overlayLightRaysOpacity: number;
  imageOilPaint: boolean;           // simulated oil paint filter on image
  bgNebula: boolean;                // multi-radial soft nebula background
  bgNebulaColor: string;
  bgNebulaOpacity: number;
  imagePosterize: boolean;          // high-contrast posterize approximation
  titleFlipText: boolean;           // horizontally mirror/flip the title
  bgDotMatrix: boolean;             // dense dot matrix background pattern
  bgDotMatrixColor: string;
  bgDotMatrixOpacity: number;
  textGlowBox: boolean;             // glowing box behind text block
  textGlowBoxColor: string;
  canvasRadialFade: boolean;        // radial vignette fade to color at edges
  canvasRadialFadeColor: string;
  overlayRetroGrid: boolean;        // 80s synthwave perspective floor grid
  overlayRetroGridOpacity: number;
  imageNoirEffect: boolean;         // high-contrast grayscale noir effect
  // Batch 22
  bgSunburst: boolean;              // radial sunburst rays from center
  bgSunburstColor: string;
  bgSunburstOpacity: number;
  imageVaporwave: boolean;          // pink+teal vaporwave color treatment
  overlaySnow: boolean;             // white particle snow/static overlay
  overlaySnowOpacity: number;
  titleOutlineGlow: boolean;        // glowing stroke outline on title (no fill)
  titleOutlineGlowColor: string;
  frameDiamondCut: boolean;         // angled corner clips on canvas
  bgStarfield: boolean;             // tiny white dot starfield on background
  bgStarfieldOpacity: number;
  textUppercase: boolean;           // force all title/subtitle to uppercase
  imageColorSplit: boolean;         // RGB channel-split aberration on image
  canvasGlassReflect: boolean;      // glass reflection highlight sheen
  canvasGlassReflectOpacity: number;
  overlayHeatmap: boolean;          // warm orange/red heatmap glow
  overlayHeatmapOpacity: number;
  bgLinenTexture: boolean;          // subtle linen cloth texture on background
  bgLinenTextureOpacity: number;
  imageDreamGlow: boolean;          // soft dreamy overexposed bloom on image
  // Batch 23
  bgTrianglePattern: boolean;       // triangular tessellation on background
  bgTriangleColor: string;
  bgTriangleOpacity: number;
  overlayColorBurn: boolean;        // dark color-burn blend over canvas
  overlayColorBurnColor: string;
  overlayColorBurnOpacity: number;
  imageAquaEffect: boolean;         // cool aqua/underwater blue-green tone
  titleShadowDouble: boolean;       // double layered text shadow for depth
  titleShadowDoubleColor: string;
  frameGoldLeaf: boolean;           // gold/metallic border frame
  frameGoldLeafWidth: number;
  bgSpiral: boolean;                // spiral/swirl pattern on background
  bgSpiralColor: string;
  bgSpiralOpacity: number;
  imageWatercolor: boolean;         // watercolor wash effect on image
  textBoxGlass: boolean;            // frosted glass panel behind text
  textBoxGlassOpacity: number;
  overlayFogBottom: boolean;        // dense fog bank at bottom of canvas
  overlayFogBottomColor: string;
  overlayFogBottomOpacity: number;
  imageMirrorSplit: boolean;        // mirror/kaleidoscope split on image
  bgColorWash: boolean;             // solid translucent color wash over BG
  bgColorWashColor: string;
  bgColorWashOpacity: number;
  // Batch 24
  overlayPixelGrid: boolean;        // pixel art grid overlay
  overlayPixelGridOpacity: number;
  imageFlatColor: boolean;          // flat graphic color pop (hard contrast)
  titleBounce: boolean;             // bouncy baseline wave on title text
  bgCrossHatch: boolean;            // crosshatch pen-stroke background
  bgCrossHatchColor: string;
  bgCrossHatchOpacity: number;
  imagePastelTone: boolean;         // soft pastel desaturated tones
  frameNeonTube: boolean;           // neon tube border glow (inset)
  frameNeonTubeColor: string;
  overlayPaperFold: boolean;        // paper fold/crease diagonal line
  overlayPaperFoldOpacity: number;
  bgRipple: boolean;                // water ripple concentric pattern
  bgRippleColor: string;
  bgRippleOpacity: number;
  titleGradientAngle: number;       // custom angle for title gradient
  textLetterboxBars: boolean;       // black cinematic letterbox bars
  imageInfrared: boolean;           // infrared false-color effect
  canvasTiltedFrame: boolean;       // slight tilt/skew on entire canvas
  canvasTiltedFrameAngle: number;
  bgSpiralConic: boolean;           // tight conic-gradient spiral look
  bgSpiralConicColor: string;
  bgSpiralConicOpacity: number;
  // Batch 25
  imageXRay: boolean;               // X-ray inverted negative effect
  bgMandala: boolean;               // mandala/flower-of-life radial pattern
  bgMandalaColor: string;
  bgMandalaOpacity: number;
  overlayGlare: boolean;            // directional glare/shine diagonal band
  overlayGlareOpacity: number;
  titleWordSpacingWide: boolean;    // extra word spacing on title
  frameVignetteMask: boolean;       // soft vignette mask on image edges only
  frameVignetteMaskColor: string;
  bgZigzagStripes: boolean;         // zig-zag stripe background
  bgZigzagStripesColor: string;
  bgZigzagStripesOpacity: number;
  imageGlitchScan: boolean;         // glitchy horizontal scan line offset
  overlayConfetti: boolean;         // colorful confetti dot overlay
  overlayConfettiOpacity: number;
  titleBackdropBlur: boolean;       // blurred backdrop directly behind title
  titleBackdropBlurColor: string;
  bgPrismaticSheen: boolean;        // iridescent prismatic sheen on background
  bgPrismaticSheenOpacity: number;
  imageCrossProcess2: boolean;      // alternate cross-process: green shadows
  canvasOutlineOnly: boolean;       // show canvas as outline box, no fill bg
  // Batch 26
  overlayLightLeak2: boolean;       // warm orange/amber second light leak
  overlayLightLeak2Opacity: number;
  imageOldPhoto: boolean;           // aged/vintage old photo filter
  titleNeonPulse: boolean;          // animated neon glow pulse on title
  frameDoubleStroke: boolean;       // two concentric border strokes
  frameDoubleStrokeColor: string;
  bgCircuitBoardColor: string;      // color for circuit board pattern
  imageHolographic: boolean;        // holographic rainbow foil look
  overlayRaindrops: boolean;        // simulated raindrop dots overlay
  overlayRaindropsOpacity: number;
  bgWaveform: boolean;              // audio waveform bars background
  bgWaveformColor: string;
  bgWaveformOpacity: number;
  canvasFloatShadow: boolean;       // deep floating drop shadow below canvas
  textSmallCaps: boolean;           // small-caps font variant on body text
  // Batch 27
  bgCamo: boolean;                  // organic camouflage blob pattern background
  bgCamoColor: string;
  bgCamoOpacity: number;
  bgHalftone: boolean;              // halftone dot grid background
  bgHalftoneColor: string;
  bgHalftoneOpacity: number;
  overlayNoise2: boolean;           // secondary fine grain noise overlay
  overlayNoise2Opacity: number;
  imageColorize: boolean;           // warm sepia colorize on image
  titleRainbow: boolean;            // rainbow spectrum gradient on title
  framePaintStroke: boolean;        // rough painted brush-stroke border
  framePaintStrokeColor: string;
  textShadowHard: boolean;          // hard no-blur drop shadow on title
  textShadowHardColor: string;
  bgPolkaDots: boolean;             // polka dot circle background
  bgPolkaDotsColor: string;
  bgPolkaDotsOpacity: number;
  canvasTapeCorners: boolean;       // tape strip stickers on canvas corners
  // Batch 28
  bgAurora: boolean;                // aurora borealis multi-color gradient background
  bgAuroraColor: string;
  bgAuroraOpacity: number;
  overlayStarburst: boolean;        // starburst/sunray conic overlay
  overlayStarburstOpacity: number;
  imageSatBoost: boolean;           // strong saturation boost filter
  titleSplit: boolean;              // title with two halves in different colors
  titleSplitColorB: string;
  canvasInnerGlow: boolean;         // inward canvas glow border
  canvasInnerGlowColor: string;
  bgScales: boolean;                // fish-scale / arc overlap background
  bgScalesColor: string;
  bgScalesOpacity: number;
  bgFibers: boolean;                // diagonal fiber/line texture background
  bgFibersColor: string;
  bgFibersOpacity: number;
  textItalicForce: boolean;         // force italic on title text
  frameCornerBrackets: boolean;     // L-shaped corner bracket decorations
  frameCornerBracketsColor: string;
  // Batch 29
  bgMarble: boolean;                // marble swirl vein background
  bgMarbleColor: string;
  bgMarbleOpacity: number;
  imageDuotone: boolean;            // duotone two-color image filter
  imageDuotoneColor: string;
  bgBrickWall: boolean;             // brick wall pattern background
  bgBrickWallColor: string;
  bgBrickWallOpacity: number;
  imageChalk: boolean;              // chalk/matte pastel effect on image
  overlayFlare: boolean;            // lens flare radial spot overlay
  overlayFlareOpacity: number;
  bgLattice: boolean;               // diagonal lattice/mesh grid background
  bgLatticeColor: string;
  bgLatticeOpacity: number;
  textUnderlineWave: boolean;       // wavy underline on title
  canvasSepia: boolean;             // sepia tint on whole canvas
  frameBezel: boolean;              // thick inset bezel border
  frameBezelColor: string;
  // Batch 30
  bgTerrazzo: boolean;              // terrazzo/mosaic scattered pebble pattern
  bgTerrazzoColor: string;
  bgTerrazzoOpacity: number;
  overlayPaintDrip: boolean;        // paint drip down from top edge
  overlayPaintDripColor: string;
  overlayPaintDripOpacity: number;
  imageLensBlur: boolean;           // subtle lens/depth-of-field blur on image
  titleGhost: boolean;              // ghost phantom offset shadow behind title
  titleGhostColor: string;
  bgSnakeskin: boolean;             // snakeskin diamond-scale pattern
  bgSnakeskinColor: string;
  bgSnakeskinOpacity: number;
  overlayIce: boolean;              // ice/frost crystal tint overlay
  overlayIceOpacity: number;
  bgDenim: boolean;                 // denim diagonal weave texture
  bgDenimOpacity: number;
  textStencil: boolean;             // stencil-style wide-tracked title
  canvasOldPaper: boolean;          // aged warm parchment tint on canvas
  // Batch 31
  bgTieDye: boolean;                // tie-dye radial swirl pattern background
  bgTieDyeColor: string;
  bgTieDyeOpacity: number;
  overlayMatrix: boolean;           // matrix falling binary characters overlay
  overlayMatrixOpacity: number;
  imageNeonEdge: boolean;           // neon edge-detection approximation filter
  titleFlicker: boolean;            // flickering neon animation on title
  bgCrystal: boolean;               // crystal/gem geometric facets background
  bgCrystalOpacity: number;
  imageBokeh: boolean;              // bokeh dreamy soft light effect
  bgWoodGrain: boolean;             // wood grain diagonal ripple background
  bgWoodGrainColor: string;
  bgWoodGrainOpacity: number;
  textCursive: boolean;             // cursive/script font on title
  bgTartanPlaid: boolean;           // tartan plaid crosshatch background
  bgTartanPlaidColor: string;
  bgTartanPlaidOpacity: number;
  canvasBloom: boolean;             // soft bloom glow on canvas center
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
  overlayPatternColor: 'rgba(255,255,255,0.8)',
  overlayPatternOpacity: 40,
  overlayPatternType: 'none',
  splitScreen: false,
  splitScreenColor1: 'rgba(139,92,246,0.3)',
  splitScreenColor2: 'rgba(236,72,153,0.3)',
  splitScreenAngle: 45,
  textOutline: 0,
  textOutlineColor: '#000000',
  imagePreset: 'none',
  frameInnerPadding: 0,
  accentColor: '#8b5cf6',
  useAccentColor: false,
  warpEffect: 0,
  subtitleAllCaps: false,
  borderRadiusTL: 12,
  borderRadiusTR: 12,
  borderRadiusBR: 12,
  borderRadiusBL: 12,
  usePerCornerRadius: false,
  // Batch 6
  glassEffect: 0,
  glassColor: '#ffffff',
  cornerAccents: false,
  cornerAccentColor: '#ffffff',
  cornerAccentSize: 28,
  cornerAccentThickness: 2,
  frameGlow: 0,
  frameGlowColor: '#8b5cf6',
  mirrorMode: 'none',
  noiseType: 'none',
  noiseAmount: 40,
  duotoneSplit: false,
  duotoneSplitColor1: '#ff6600',
  duotoneSplitColor2: '#3300cc',
  duotoneSplitMidpoint: 50,
  shadowPreset: 'none',
  textGlitch: 0,
  textGlitchColor1: '#ff0000',
  textGlitchColor2: '#00ffff',
  canvasBorderWidth: 0,
  canvasBorderColor: '#ffffff',
  canvasBorderStyle: 'solid',
  // Batch 7
  titleUnderline: false,
  textBoxPadding: 0,
  textGradientAngle: 135,
  bgOverlayGradient: 'none',     // 'none' | gradient css string id
  bgOverlayGradientOpacity: 0,
  stickerText: '',
  stickerX: 50,
  stickerY: 80,
  stickerSize: 16,
  stickerBg: '#8b5cf6',
  stickerColor: '#ffffff',
  stickerRadius: 999,
  progressBar: false,
  progressBarValue: 70,          // 0-100
  progressBarColor: '#8b5cf6',
  progressBarBg: 'rgba(255,255,255,0.15)',
  progressBarHeight: 4,
  progressBarPosition: 'bottom', // 'top' | 'bottom'
  tagLine: '',
  tagLineColor: '#ffffff',
  tagLineBg: '#8b5cf6',
  canvasGradientOverlay: false,
  canvasGradientOverlayAngle: 135,
  canvasGradientOverlayColor1: '#ff006680',
  canvasGradientOverlayColor2: '#8338ec80',
  canvasGradientOverlayOpacity: 30,
  overlayBlur: 0,
  titleBackground: false,
  titleBackgroundColor: 'rgba(0,0,0,0.5)',
  titleBackgroundPadding: 12,
  // Batch 8
  lineAccent: false,
  lineAccentColor: '#ffffff',
  lineAccentWidth: 60,
  lineAccentHeight: 2,
  logoRotation: 0,
  imageColorShift: 'none',
  imageColorShiftAmount: 40,
  bgPatternColor: '#ffffff',
  bgPatternColorEnabled: false,
  textSpacingPreset: 'normal',
  accentLine: false,
  accentLineColor: '#8b5cf6',
  accentLinePosition: 'bottom',
  accentLineThickness: 4,
  chipText: '',
  chipX: 60,
  chipY: 30,
  chipColor: '#f59e0b',
  imageInnerGlow: 0,
  imageInnerGlowColor: '#ffffff',
  canvasInsetShadow: 0,
  vignetteShape: 'elliptical',
  // Batch 9
  titleShadowBlur: 0,
  titleShadowColor: '#000000',
  titleShadowX: 0,
  titleShadowY: 2,
  subtitleOpacity: 100,
  bodyTextColor: '#ffffff',
  bodyTextSize: 13,
  imageSepia: 0,
  imageCoolTone: false,
  imageWarmTone: false,
  stripeBg: false,
  stripeBgColor1: '#1a1a2e',
  stripeBgColor2: '#16213e',
  stripeBgAngle: 45,
  frameDoubleBorder: false,
  frameDoubleBorderColor: '#8b5cf6',
  frameDoubleBorderGap: 4,
  cardStack: false,
  cardStackColor: '#1a1a2e',
  cardStackOffset: 8,
  overlayDots: false,
  overlayDotsColor: '#ffffff',
  overlayDotsSize: 4,
  overlayDotsOpacity: 10,
  titleCaps: false,
  gradientText2: false,
  gradientText2Color1: '#ec4899',
  gradientText2Color2: '#f59e0b',
  // Batch 10
  titleLetterSpacing: 0,
  subtitleFont: 'Inter',
  textShadowSpread: 0,
  overlayGrid: false,
  overlayGridColor: '#ffffff',
  overlayGridSize: 40,
  overlayGridOpacity: 10,
  imageBorder: false,
  imageBorderColor: '#8b5cf6',
  imageBorderWidth: 2,
  pulseRing: false,
  pulseRingColor: '#8b5cf6',
  pulseRingSize: 8,
  cornerRibbon: false,
  cornerRibbonText: 'NEW',
  cornerRibbonColor: '#ffffff',
  cornerRibbonBg: '#ec4899',
  cornerRibbonCorner: 'tr',
  textHighlight: false,
  textHighlightColor: '#f59e0b',
  bgBlurStrength: 0,
  imageRounded: false,
  imageRoundedAmount: 50,
  countdownBadge: false,
  countdownValue: 7,
  countdownColor: '#ffffff',
  countdownBg: '#8b5cf6',
  // Batch 11
  textBoxBorder: false,
  textBoxBorderColor: '#8b5cf6',
  textBoxBorderWidth: 1,
  textBoxBorderRadius: 8,
  imageGrayscale: 0,
  imagePixelate: 0,
  bgMeshOpacity: 100,
  gradientOverlayBlend: 'normal',
  splitPane: false,
  splitPaneRatio: 50,
  splitPaneBg: '#1a1a2e',
  floatingLabel: false,
  floatingLabelText: '',
  floatingLabelBg: '#8b5cf6',
  floatingLabelColor: '#ffffff',
  imageSaturationBoost: 0,
  canvasPaddingTop: 40,
  canvasPaddingBottom: 40,
  canvasPaddingLeft: 40,
  canvasPaddingRight: 40,
  useCustomPadding: false,
  textShadowPreset: 'none',
  badgePulse: false,
  // Batch 12
  titleFont2: 'Inter',
  titleFont2Enabled: false,
  imageVignette: false,
  imageVignetteColor: '#000000',
  imageVignetteSize: 40,
  scrollingText: false,
  scrollingTextContent: 'SnapFrame • Made with SnapFrame • ',
  scrollingTextColor: '#ffffff',
  scrollingTextBg: '#8b5cf6',
  scrollingTextSize: 11,
  dividerLine: false,
  dividerLineColor: '#ffffff',
  dividerLineHeight: 1,
  dividerLineStyle: 'solid',
  overlayHalftone: false,
  overlayHalftoneColor: '#000000',
  overlayHalftoneDensity: 4,
  imageOverlayText: '',
  imageOverlayTextColor: '#ffffff',
  imageOverlayTextSize: 24,
  imageOverlayTextOpacity: 30,
  bgGradientStops: 2,
  bgGradientColor3: '#f59e0b',
  bgGradientColor4: '#10b981',
  // Batch 13
  titleOutlineOnly: false,
  titleOutlineWidth: 2,
  titleOutlineColor: '#ffffff',
  imageTiltX: 0,
  imageTiltY: 0,
  noiseGrain: false,
  noiseGrainOpacity: 20,
  photoTilt: false,
  photoTiltAngle: -3,
  subtitleBold: false,
  subtitleItalic: false,
  subtitleUnderline: false,
  iconBar: false,
  iconBarStyle: 'stars',
  iconBarColor: '#f59e0b',
  overlayLinear: false,
  overlayLinearColor1: '#000000',
  overlayLinearColor2: '#00000000',
  overlayLinearOpacity: 60,
  quoteStyle: false,
  quoteMarkColor: '#8b5cf6',
  colorDuotoneMap: false,
  colorDuotoneMapColor1: '#8b5cf6',
  colorDuotoneMapColor2: '#ec4899',
  // Batch 14
  textReveal: false,
  textRevealColor: '#8b5cf6',
  backdropBlurCard: false,
  backdropBlurCardBg: '#00000060',
  backdropBlurCardBlur: 12,
  backdropBlurCardOpacity: 80,
  imageShadow: false,
  imageShadowColor: '#000000',
  imageShadowBlur: 20,
  framePolaroidLabel: '',
  framePolaroidLabelColor: '#333333',
  bgAnimatedGradient: false,
  bgAnimatedGradientSpeed: 50,
  imageHueShift: 0,
  titleSkew: 0,
  overlayVHS: false,
  overlayVHSIntensity: 40,
  tiltShiftImage: false,
  tiltShiftImageBlur: 8,
  tiltShiftImageCenter: 50,
  imagePerspective: 'flat',
  // Batch 15
  overlayRainbow: false,
  overlayRainbowOpacity: 30,
  textNeonPulse: false,
  textNeonPulseColor: '#8b5cf6',
  textNeonPulseIntensity: 60,
  imageSkewX: 0,
  imageSkewY: 0,
  frameBadge: '',
  frameBadgeColor: '#ffffff',
  frameBadgeBg: '#ec4899',
  textBgGradient: false,
  textBgGradientColor1: '#8b5cf6',
  textBgGradientColor2: '#ec4899',
  overlayAurora: false,
  overlayAuroraColor1: '#10b981',
  overlayAuroraColor2: '#8b5cf6',
  overlayAuroraOpacity: 40,
  imageVintageFrame: false,
  imageVintageFrameColor: '#c8a97e',
  canvasGrain: false,
  canvasGrainOpacity: 20,
  titleBoxShadow: false,
  titleBoxShadowColor: '#8b5cf6',
  // Batch 16
  overlayHaze: false,
  overlayHazeColor: '#c8d8ff',
  overlayHazeOpacity: 30,
  overlayBokeh: false,
  overlayBokehColor: '#ffffff',
  overlayBokehOpacity: 20,
  imageEdgeGlow: false,
  imageEdgeGlowColor: '#8b5cf6',
  imageEdgeGlowBlur: 24,
  textUpperBand: false,
  textUpperBandBg: '#8b5cf6',
  textUpperBandColor: '#ffffff',
  textUpperBandText: '',
  overlayPrismatic: false,
  overlayPrismaticOpacity: 25,
  bgLayeredCards: false,
  bgLayeredCardsColor: '#1a1a2e',
  bgLayeredCardsCount: 3,
  titleDropCap: false,
  logoText: '',
  logoTextSize: 13,
  logoTextColor: '#ffffff',
  // Batch 17
  canvasStamp: false,
  canvasStampText: 'APPROVED',
  canvasStampColor: '#ef4444',
  canvasStampBg: 'transparent',
  textNeonBorder: false,
  textNeonBorderColor: '#8b5cf6',
  bgBubbles: false,
  bgBubblesColor: '#ffffff',
  bgBubblesOpacity: 15,
  imageTexture: 'none',
  overlayRetroLines: false,
  overlayRetroLinesColor: '#ff6b6b',
  overlayRetroLinesOpacity: 20,
  subtitleGradient: false,
  subtitleGradientColor2: '#ec4899',
  imageSolarize: false,
  imageColorLeakTop: false,
  imageColorLeakColor: '#ff8c00',
  canvasRibbon: false,
  canvasRibbonText: 'NEW',
  canvasRibbonBg: '#ec4899',
  canvasRibbonColor: '#ffffff',
  // Batch 18
  imageLomo: false,
  imageXProcess: false,
  overlayGradientMesh: false,
  overlayGradientMeshOpacity: 40,
  titleTypewriter: false,
  titleTypewriterColor: '#a78bfa',
  imageOverlayPattern: 'none',
  imageOverlayPatternOpacity: 20,
  bgWaves: false,
  bgWavesColor: '#7c3aed',
  bgWavesOpacity: 20,
  imageColorMap: 'none',
  frameMatte: false,
  frameMatteColor: '#ffffff',
  frameMatteWidth: 20,
  textOutlineStroke: false,
  textOutlineStrokeColor: '#8b5cf6',
  canvasSpotlight: false,
  canvasSpotlightColor: '#ffffff',
  canvasSpotlightStrength: 50,
  // Batch 19
  titleGlitch: false,
  titleGlitchColor: '#ec4899',
  bgDiamondPattern: false,
  bgDiamondOpacity: 15,
  overlayHolographic: false,
  overlayHolographicOpacity: 35,
  canvasBorderGlow: false,
  canvasBorderGlowColor: '#8b5cf6',
  textHighlightBlock: false,
  textHighlightBlockColor: '#8b5cf6',
  bgGlowOrb: false,
  bgGlowOrbColor: '#7c3aed',
  bgGlowOrbX: 50,
  bgGlowOrbY: 50,
  imageBloomLight: false,
  imageBloomLightColor: '#ffffff',
  cardGlassOverlay: false,
  cardGlassOverlayBg: '#ffffff18',
  watermarkTiled: false,
  watermarkTiledText: 'CONFIDENTIAL',
  // Batch 20
  bgGridLines: false,
  bgGridLinesColor: '#8b5cf6',
  bgGridLinesOpacity: 12,
  imageInkDrop: false,
  overlayDust: false,
  overlayDustOpacity: 25,
  titleNeonSign: false,
  titleNeonSignColor: '#00ffff',
  frameFilmStrip: false,
  bgCircuitBoard: false,
  bgCircuitBoardOpacity: 12,
  imageChromeEffect: false,
  textKerningWide: false,
  overlayInkBleed: false,
  overlayInkBleedOpacity: 30,
  bgHexGrid: false,
  bgHexGridColor: '#a78bfa',
  bgHexGridOpacity: 12,
  // Batch 21
  titleStrikethrough: false,
  bgConcentricRings: false,
  bgConcentricRingsColor: '#8b5cf6',
  bgConcentricRingsOpacity: 12,
  overlayLightRays: false,
  overlayLightRaysOpacity: 20,
  imageOilPaint: false,
  bgNebula: false,
  bgNebulaColor: '#7c3aed',
  bgNebulaOpacity: 40,
  imagePosterize: false,
  titleFlipText: false,
  bgDotMatrix: false,
  bgDotMatrixColor: '#8b5cf6',
  bgDotMatrixOpacity: 10,
  textGlowBox: false,
  textGlowBoxColor: '#8b5cf6',
  canvasRadialFade: false,
  canvasRadialFadeColor: '#000000',
  overlayRetroGrid: false,
  overlayRetroGridOpacity: 30,
  imageNoirEffect: false,
  // Batch 22
  bgSunburst: false,
  bgSunburstColor: '#f59e0b',
  bgSunburstOpacity: 20,
  imageVaporwave: false,
  overlaySnow: false,
  overlaySnowOpacity: 20,
  titleOutlineGlow: false,
  titleOutlineGlowColor: '#00ffff',
  frameDiamondCut: false,
  bgStarfield: false,
  bgStarfieldOpacity: 30,
  textUppercase: false,
  imageColorSplit: false,
  canvasGlassReflect: false,
  canvasGlassReflectOpacity: 25,
  overlayHeatmap: false,
  overlayHeatmapOpacity: 30,
  bgLinenTexture: false,
  bgLinenTextureOpacity: 12,
  imageDreamGlow: false,
  // Batch 23
  bgTrianglePattern: false,
  bgTriangleColor: '#8b5cf6',
  bgTriangleOpacity: 10,
  overlayColorBurn: false,
  overlayColorBurnColor: '#1a0a2e',
  overlayColorBurnOpacity: 40,
  imageAquaEffect: false,
  titleShadowDouble: false,
  titleShadowDoubleColor: '#8b5cf6',
  frameGoldLeaf: false,
  frameGoldLeafWidth: 6,
  bgSpiral: false,
  bgSpiralColor: '#8b5cf6',
  bgSpiralOpacity: 15,
  imageWatercolor: false,
  textBoxGlass: false,
  textBoxGlassOpacity: 50,
  overlayFogBottom: false,
  overlayFogBottomColor: '#ffffff',
  overlayFogBottomOpacity: 40,
  imageMirrorSplit: false,
  bgColorWash: false,
  bgColorWashColor: '#8b5cf6',
  bgColorWashOpacity: 20,
  // Batch 24
  overlayPixelGrid: false,
  overlayPixelGridOpacity: 15,
  imageFlatColor: false,
  titleBounce: false,
  bgCrossHatch: false,
  bgCrossHatchColor: '#8b5cf6',
  bgCrossHatchOpacity: 12,
  imagePastelTone: false,
  frameNeonTube: false,
  frameNeonTubeColor: '#00ffff',
  overlayPaperFold: false,
  overlayPaperFoldOpacity: 20,
  bgRipple: false,
  bgRippleColor: '#8b5cf6',
  bgRippleOpacity: 15,
  titleGradientAngle: 135,
  textLetterboxBars: false,
  imageInfrared: false,
  canvasTiltedFrame: false,
  canvasTiltedFrameAngle: 3,
  bgSpiralConic: false,
  bgSpiralConicColor: '#8b5cf6',
  bgSpiralConicOpacity: 15,
  // Batch 25
  imageXRay: false,
  bgMandala: false,
  bgMandalaColor: '#8b5cf6',
  bgMandalaOpacity: 12,
  overlayGlare: false,
  overlayGlareOpacity: 30,
  titleWordSpacingWide: false,
  frameVignetteMask: false,
  frameVignetteMaskColor: '#000000',
  bgZigzagStripes: false,
  bgZigzagStripesColor: '#8b5cf6',
  bgZigzagStripesOpacity: 12,
  imageGlitchScan: false,
  overlayConfetti: false,
  overlayConfettiOpacity: 25,
  titleBackdropBlur: false,
  titleBackdropBlurColor: '#000000',
  bgPrismaticSheen: false,
  bgPrismaticSheenOpacity: 20,
  imageCrossProcess2: false,
  canvasOutlineOnly: false,
  // Batch 26
  overlayLightLeak2: false,
  overlayLightLeak2Opacity: 35,
  imageOldPhoto: false,
  titleNeonPulse: false,
  frameDoubleStroke: false,
  frameDoubleStrokeColor: '#8b5cf6',
  bgCircuitBoardColor: '#8b5cf6',
  imageHolographic: false,
  overlayRaindrops: false,
  overlayRaindropsOpacity: 20,
  bgWaveform: false,
  bgWaveformColor: '#8b5cf6',
  bgWaveformOpacity: 15,
  canvasFloatShadow: false,
  textSmallCaps: false,
  // Batch 27
  bgCamo: false,
  bgCamoColor: '#4a6741',
  bgCamoOpacity: 20,
  bgHalftone: false,
  bgHalftoneColor: '#8b5cf6',
  bgHalftoneOpacity: 15,
  overlayNoise2: false,
  overlayNoise2Opacity: 20,
  imageColorize: false,
  titleRainbow: false,
  framePaintStroke: false,
  framePaintStrokeColor: '#8b5cf6',
  textShadowHard: false,
  textShadowHardColor: '#000000',
  bgPolkaDots: false,
  bgPolkaDotsColor: '#8b5cf6',
  bgPolkaDotsOpacity: 15,
  canvasTapeCorners: false,
  // Batch 28
  bgAurora: false,
  bgAuroraColor: '#00c8a0',
  bgAuroraOpacity: 25,
  overlayStarburst: false,
  overlayStarburstOpacity: 15,
  imageSatBoost: false,
  titleSplit: false,
  titleSplitColorB: '#ec4899',
  canvasInnerGlow: false,
  canvasInnerGlowColor: '#8b5cf6',
  bgScales: false,
  bgScalesColor: '#8b5cf6',
  bgScalesOpacity: 15,
  bgFibers: false,
  bgFibersColor: '#8b5cf6',
  bgFibersOpacity: 12,
  textItalicForce: false,
  frameCornerBrackets: false,
  frameCornerBracketsColor: '#8b5cf6',
  // Batch 29
  bgMarble: false,
  bgMarbleColor: '#c8a0d8',
  bgMarbleOpacity: 20,
  imageDuotone: false,
  imageDuotoneColor: '#8b5cf6',
  bgBrickWall: false,
  bgBrickWallColor: '#8b5cf6',
  bgBrickWallOpacity: 12,
  imageChalk: false,
  overlayFlare: false,
  overlayFlareOpacity: 40,
  bgLattice: false,
  bgLatticeColor: '#8b5cf6',
  bgLatticeOpacity: 15,
  textUnderlineWave: false,
  canvasSepia: false,
  frameBezel: false,
  frameBezelColor: '#c8a06e',
  // Batch 30
  bgTerrazzo: false,
  bgTerrazzoColor: '#8b5cf6',
  bgTerrazzoOpacity: 18,
  overlayPaintDrip: false,
  overlayPaintDripColor: '#8b5cf6',
  overlayPaintDripOpacity: 60,
  imageLensBlur: false,
  titleGhost: false,
  titleGhostColor: '#8b5cf6',
  bgSnakeskin: false,
  bgSnakeskinColor: '#8b5cf6',
  bgSnakeskinOpacity: 15,
  overlayIce: false,
  overlayIceOpacity: 25,
  bgDenim: false,
  bgDenimOpacity: 12,
  textStencil: false,
  canvasOldPaper: false,
  // Batch 31
  bgTieDye: false,
  bgTieDyeColor: '#8b5cf6',
  bgTieDyeOpacity: 25,
  overlayMatrix: false,
  overlayMatrixOpacity: 20,
  imageNeonEdge: false,
  titleFlicker: false,
  bgCrystal: false,
  bgCrystalOpacity: 15,
  imageBokeh: false,
  bgWoodGrain: false,
  bgWoodGrainColor: '#8b6040',
  bgWoodGrainOpacity: 20,
  textCursive: false,
  bgTartanPlaid: false,
  bgTartanPlaidColor: '#8b5cf6',
  bgTartanPlaidOpacity: 15,
  canvasBloom: false,
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
  {
    id: 'split-diagonal',
    name: 'Split',
    emoji: '⬡',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', backgroundId: 'midnight',
      padding: 64, borderRadius: 16, shadow: 60, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      splitScreen: true, splitScreenColor1: 'rgba(139,92,246,0.25)', splitScreenColor2: 'rgba(236,72,153,0.25)', splitScreenAngle: 45,
    },
  },
  {
    id: 'accent-neon',
    name: 'Accent',
    emoji: '🎨',
    overrides: {
      background: '#0a0a12', backgroundId: 'solid-dark',
      padding: 72, borderRadius: 16, shadow: 80, shadowColor: 'rgba(139,92,246,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      useAccentColor: true, accentColor: '#8b5cf6',
      borderWidth: 1, borderStyle: 'gradient',
      glowIntensity: 40, bgPattern: 'dots', bgPatternOpacity: 0.06,
    },
  },
  {
    id: 'snow-scene',
    name: 'Snow',
    emoji: '❄️',
    overrides: {
      background: 'linear-gradient(180deg, #1a2a4a 0%, #0a1628 100%)', backgroundId: 'cobalt',
      padding: 64, borderRadius: 16, shadow: 50, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      overlayPatternType: 'snow', overlayPatternColor: 'rgba(255,255,255,0.85)', overlayPatternOpacity: 55,
      vignette: 30, vignetteColor: '#000a1a', filmGrain: 10,
    },
  },
  {
    id: 'confetti-pop',
    name: 'Party',
    emoji: '🎊',
    overrides: {
      background: 'linear-gradient(135deg, #1a0533 0%, #0a1a2e 100%)', backgroundId: 'midnight',
      padding: 56, borderRadius: 20, shadow: 50, shadowColor: 'rgba(0,0,0,0.5)', shadowX: 0,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      overlayPatternType: 'confetti', overlayPatternOpacity: 60,
      glowIntensity: 20, glowColor: 'rgba(255,200,50,0.5)',
    },
  },
  // Batch 6 templates
  {
    id: 'glass-card',
    name: 'Glass',
    emoji: '🔮',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', backgroundId: 'deep-space',
      padding: 48, borderRadius: 28, shadow: 60, shadowColor: 'rgba(0,0,0,0.6)',
      frame: 'none', tiltX: 0, tiltY: -8, scale: 1,
      glassEffect: 45, glassColor: '#a8d8ff',
      glowIntensity: 30, glowColor: 'rgba(100,180,255,0.4)',
    },
  },
  {
    id: 'retro-noise',
    name: 'Retro',
    emoji: '📺',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', backgroundId: 'black',
      padding: 40, borderRadius: 4, shadow: 50, shadowColor: 'rgba(0,0,0,0.8)',
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1, rotation: 0,
      noiseType: 'static', noiseAmount: 55, scanlines: 60, scanlinesSpacing: 3,
      imagePreset: 'moon',
    },
  },
  {
    id: 'neon-frame',
    name: 'Neon',
    emoji: '⚡',
    overrides: {
      background: 'linear-gradient(135deg, #000010 0%, #001020 100%)', backgroundId: 'ultra-dark',
      padding: 52, borderRadius: 16, shadow: 40,
      frame: 'none', tiltX: 0, tiltY: 0, scale: 1,
      frameGlow: 70, frameGlowColor: '#00ffff',
      cornerAccents: true, cornerAccentColor: '#00ffff', cornerAccentSize: 36,
      glowIntensity: 50, glowColor: 'rgba(0,255,255,0.5)',
      canvasBorderWidth: 2, canvasBorderColor: '#00ffff',
    },
  },
  {
    id: 'mirror-art',
    name: 'Mirror',
    emoji: '🪞',
    overrides: {
      background: 'linear-gradient(180deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', backgroundId: 'galaxy',
      padding: 40, borderRadius: 12, shadow: 60, tiltX: 0, tiltY: 6, scale: 1,
      mirrorMode: 'horizontal',
      glowIntensity: 20, glowColor: 'rgba(140,100,255,0.3)',
    },
  },
  {
    id: 'shadow-float',
    name: 'Float',
    emoji: '🌤',
    overrides: {
      background: 'linear-gradient(180deg, #f8faff 0%, #e8eeff 100%)', backgroundId: 'soft-white',
      padding: 60, borderRadius: 20, scale: 1, tiltX: 0, tiltY: 0,
      shadowPreset: 'float',
    },
  },
  // Batch 7 templates
  {
    id: 'progress-card',
    name: 'Progress',
    emoji: '📊',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', backgroundId: 'deep-space',
      padding: 52, borderRadius: 20, shadow: 50, tiltX: 0, tiltY: 0, scale: 1,
      progressBar: true, progressBarValue: 75, progressBarColor: '#8b5cf6',
      titleText: 'Progress Update', titleSize: 28, titleColor: '#ffffff',
    },
  },
  {
    id: 'tagged-post',
    name: 'Tagged',
    emoji: '🏷',
    overrides: {
      background: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', backgroundId: 'ocean',
      padding: 48, borderRadius: 16, shadow: 60, tiltX: 0, tiltY: 0, scale: 1,
      tagLine: 'NEW FEATURE', tagLineBg: '#8b5cf6', tagLineColor: '#ffffff',
      titleText: 'Introducing SnapFrame', titleSize: 32, titleColor: '#ffffff',
    },
  },
  {
    id: 'gradient-overlay',
    name: 'Gradient',
    emoji: '🌈',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #000000 100%)', backgroundId: 'black',
      padding: 40, borderRadius: 20, shadow: 40, tiltX: 0, tiltY: 0, scale: 1,
      canvasGradientOverlay: true, canvasGradientOverlayOpacity: 45,
      canvasGradientOverlayColor1: '#ff006680', canvasGradientOverlayColor2: '#8338ec80',
    },
  },
  {
    id: 'sticker-fun',
    name: 'Sticker',
    emoji: '✏️',
    overrides: {
      background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', backgroundId: 'peach',
      padding: 48, borderRadius: 24, shadow: 40, tiltX: 0, tiltY: 0, scale: 1,
      stickerText: '✨ NEW', stickerBg: '#8b5cf6', stickerColor: '#ffffff',
      stickerX: 80, stickerY: 85, stickerSize: 14,
    },
  },
  // Batch 8 templates
  {
    id: 'accent-stripe',
    name: 'Stripe',
    emoji: '▌',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)', backgroundId: 'galaxy',
      padding: 52, borderRadius: 16, shadow: 60, tiltX: 0, tiltY: 0, scale: 1,
      accentLine: true, accentLineColor: '#8b5cf6', accentLinePosition: 'left', accentLineThickness: 6,
      titleText: 'SnapFrame', titleSize: 34, titleColor: '#ffffff',
      lineAccent: true, lineAccentColor: '#8b5cf6', lineAccentWidth: 40,
    },
  },
  {
    id: 'warm-color',
    name: 'Warm',
    emoji: '🔴',
    overrides: {
      background: 'linear-gradient(135deg, #1a0a00 0%, #2d1200 100%)', backgroundId: 'dark-warm',
      padding: 48, borderRadius: 20, shadow: 60,
      imageColorShift: 'red', imageColorShiftAmount: 55,
      glowIntensity: 25, glowColor: 'rgba(255,80,0,0.4)',
    },
  },
  {
    id: 'chip-annotation',
    name: 'Annotate',
    emoji: '🏷',
    overrides: {
      background: 'linear-gradient(135deg, #1e3a5f 0%, #0a1a2e 100%)', backgroundId: 'ocean-dark',
      padding: 52, borderRadius: 20, shadow: 50,
      chipText: '👈 Click here', chipColor: '#f59e0b', chipX: 65, chipY: 40,
    },
  },
  {
    id: 'inset-depth',
    name: 'Depth',
    emoji: '🫧',
    overrides: {
      background: 'linear-gradient(135deg, #e0e0e0 0%, #f8f8f8 100%)', backgroundId: 'light-gray',
      padding: 56, borderRadius: 24,
      canvasInsetShadow: 60, shadowPreset: 'float',
    },
  },
  // Batch 10 templates
  {
    id: 'ribbon-sale',
    name: 'Ribbon',
    emoji: '🎀',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', backgroundId: 'navy-dark',
      padding: 48, borderRadius: 20, shadow: 50,
      cornerRibbon: true, cornerRibbonText: 'NEW', cornerRibbonBg: '#ec4899', cornerRibbonCorner: 'tr',
    },
  },
  {
    id: 'grid-tech',
    name: 'Grid Tech',
    emoji: '⬛',
    overrides: {
      background: 'linear-gradient(135deg, #000000 0%, #0a0a1a 100%)', backgroundId: 'pure-black',
      padding: 48, borderRadius: 16,
      overlayGrid: true, overlayGridColor: '#8b5cf6', overlayGridSize: 30, overlayGridOpacity: 20,
      titleGradient: true, frameGlow: 30, frameGlowColor: '#8b5cf6',
    },
  },
  {
    id: 'round-portrait',
    name: 'Portrait',
    emoji: '👤',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%)', backgroundId: 'deep-purple',
      padding: 52, borderRadius: 24, shadow: 60,
      imageRounded: true, imageRoundedAmount: 50,
      pulseRing: true, pulseRingColor: '#8b5cf6', pulseRingSize: 10,
    },
  },
  {
    id: 'countdown-launch',
    name: 'Countdown',
    emoji: '⏳',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)', backgroundId: 'cosmic',
      padding: 48, borderRadius: 20, shadow: 50,
      countdownBadge: true, countdownValue: 7, countdownBg: '#ec4899',
      tagLine: 'LAUNCHING IN', tagLineBg: '#8b5cf620',
    },
  },
  // Batch 11 templates
  {
    id: 'split-feature',
    name: 'Split',
    emoji: '⬛',
    overrides: {
      splitPane: true, splitPaneBg: '#0f0c29', splitPaneRatio: 45,
      padding: 0, borderRadius: 20, shadow: 60,
    },
  },
  {
    id: 'float-label',
    name: 'Float Label',
    emoji: '🔖',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)', backgroundId: 'navy-dark',
      padding: 52, borderRadius: 20, shadow: 50,
      floatingLabel: true, floatingLabelText: 'FEATURED', floatingLabelBg: '#8b5cf6',
    },
  },
  {
    id: 'textbox-card',
    name: 'Text Card',
    emoji: '📋',
    overrides: {
      background: 'linear-gradient(135deg, #13111a 0%, #1e1b2e 100%)', backgroundId: 'deep-dark',
      padding: 48, borderRadius: 20,
      textBoxBorder: true, textBoxBorderColor: '#8b5cf6', textBoxBorderWidth: 1, textBoxBorderRadius: 12,
      titleBackground: true, titleBackgroundPadding: 16,
    },
  },
  {
    id: 'bw-pop',
    name: 'B&W Pop',
    emoji: '⚫',
    overrides: {
      imageGrayscale: 100, accentLine: true, accentLineColor: '#ec4899', accentLinePosition: 'left', accentLineThickness: 6,
      background: '#0a0a0a', backgroundId: 'pure-black',
      padding: 48, borderRadius: 16, shadow: 50,
    },
  },
  // Batch 12 templates
  {
    id: 'halftone-pop',
    name: 'Halftone',
    emoji: '🔵',
    overrides: {
      background: 'linear-gradient(135deg, #fff7ed 0%, #fef3c7 100%)', backgroundId: 'warm-light',
      padding: 48, borderRadius: 20,
      overlayHalftone: true, overlayHalftoneColor: '#1a1a2e', overlayHalftoneDensity: 3,
      imageGrayscale: 20,
    },
  },
  {
    id: 'ticker-tape',
    name: 'Ticker',
    emoji: '📰',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a1a 0%, #111128 100%)', backgroundId: 'deep-dark',
      padding: 48, borderRadius: 16, shadow: 50,
      scrollingText: true, scrollingTextContent: '🔥 TRENDING NOW • NEW RELEASE • ', scrollingTextBg: '#ec4899',
    },
  },
  {
    id: 'divider-clean',
    name: 'Divided',
    emoji: '━',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', backgroundId: 'navy-dark',
      padding: 52, borderRadius: 20,
      dividerLine: true, dividerLineColor: '#8b5cf6', dividerLineHeight: 2,
      titleGradient: true,
    },
  },
  {
    id: 'watermark-art',
    name: 'Watermark',
    emoji: '💧',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #24243e 100%)', backgroundId: 'cosmic-dark',
      padding: 48, borderRadius: 20, shadow: 50,
      imageOverlayText: 'PREVIEW', imageOverlayTextOpacity: 15, imageOverlayTextSize: 32,
    },
  },
  // Batch 13 templates
  {
    id: 'outline-title',
    name: 'Outline',
    emoji: '🔲',
    overrides: {
      background: '#000000', backgroundId: 'pure-black',
      padding: 52, borderRadius: 20, shadow: 60,
      titleOutlineOnly: true, titleOutlineWidth: 3, titleOutlineColor: '#ffffff',
      titleSize: 64, titleColor: '#ffffff',
    },
  },
  {
    id: 'quote-card',
    name: 'Quote',
    emoji: '💬',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b69 100%)', backgroundId: 'deep-purple',
      padding: 56, borderRadius: 24, shadow: 50,
      quoteStyle: true, quoteMarkColor: '#8b5cf6',
      titleGradient: true, titleSize: 28,
    },
  },
  {
    id: 'polaroid',
    name: 'Polaroid',
    emoji: '📸',
    overrides: {
      background: '#f8f8f0', backgroundId: 'cream',
      padding: 24, borderRadius: 4, shadow: 80,
      photoTilt: true, photoTiltAngle: -2,
      canvasPaddingBottom: 64, useCustomPadding: true,
      canvasPaddingTop: 16, canvasPaddingLeft: 16, canvasPaddingRight: 16,
    },
  },
  {
    id: 'noise-film',
    name: 'Film Grain',
    emoji: '🎞',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)', backgroundId: 'pure-black',
      padding: 48, borderRadius: 16,
      noiseGrain: true, noiseGrainOpacity: 35,
      imageGrayscale: 30, shadowPreset: 'hard',
    },
  },
  // Batch 14 templates
  {
    id: 'vhs-retro',
    name: 'VHS',
    emoji: '📼',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)', backgroundId: 'deep-dark',
      padding: 48, borderRadius: 8, shadow: 60,
      overlayVHS: true, overlayVHSIntensity: 55,
      imageGrayscale: 15, imageSaturationBoost: -20,
      scanlines: 25, scanlinesSpacing: 3,
    },
  },
  {
    id: 'blur-glass-card',
    name: 'Glass Card',
    emoji: '🔮',
    overrides: {
      background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)', backgroundId: 'purple-pink',
      padding: 52, borderRadius: 24, shadow: 60,
      backdropBlurCard: true, backdropBlurCardBg: '#ffffff18', backdropBlurCardBlur: 16, backdropBlurCardOpacity: 85,
      titleGradient: false, titleColor: '#ffffff',
    },
  },
  {
    id: 'cinematic-tilt',
    name: 'Cinematic',
    emoji: '🎬',
    overrides: {
      background: 'linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)', backgroundId: 'pure-black',
      padding: 44, borderRadius: 16, shadow: 70,
      tiltShiftImage: true, tiltShiftImageBlur: 10, tiltShiftImageCenter: 50,
      imageHueShift: 10, imageSaturationBoost: 15,
    },
  },
  {
    id: 'neon-reveal',
    name: 'Neon Reveal',
    emoji: '✨',
    overrides: {
      background: 'linear-gradient(135deg, #0a0014 0%, #1a002e 100%)', backgroundId: 'deep-purple',
      padding: 52, borderRadius: 20, shadow: 70,
      textReveal: true, textRevealColor: '#8b5cf6',
      titleGradient: true, titleSize: 52,
      glowIntensity: 20, glowColor: '#8b5cf6',
    },
  },
  // Batch 15 templates
  {
    id: 'rainbow-pop',
    name: 'Rainbow',
    emoji: '🌈',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a1a 100%)', backgroundId: 'deep-dark',
      padding: 48, borderRadius: 20, shadow: 50,
      overlayRainbow: true, overlayRainbowOpacity: 35,
      imageGrayscale: 10,
    },
  },
  {
    id: 'neon-glow-text',
    name: 'Neon Text',
    emoji: '💡',
    overrides: {
      background: '#050510', backgroundId: 'pure-black',
      padding: 56, borderRadius: 20, shadow: 80,
      textNeonPulse: true, textNeonPulseColor: '#a78bfa', textNeonPulseIntensity: 80,
      titleSize: 56, titleColor: '#ffffff',
      canvasGrain: true, canvasGrainOpacity: 15,
    },
  },
  {
    id: 'aurora-bg',
    name: 'Aurora',
    emoji: '🌌',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a1a 0%, #001a0a 100%)', backgroundId: 'deep-dark',
      padding: 52, borderRadius: 24, shadow: 60,
      overlayAurora: true, overlayAuroraColor1: '#10b981', overlayAuroraColor2: '#8b5cf6', overlayAuroraOpacity: 50,
      titleGradient: true, titleGradientColor2: '#10b981',
    },
  },
  {
    id: 'vintage-frame',
    name: 'Vintage',
    emoji: '🖼',
    overrides: {
      background: 'linear-gradient(135deg, #2a1a0a 0%, #3d2a0f 100%)', backgroundId: 'warm-dark',
      padding: 48, borderRadius: 8, shadow: 70,
      imageVintageFrame: true, imageVintageFrameColor: '#c8a97e',
      imageSepia: 40, imageSaturationBoost: -20,
    },
  },
  // Batch 16 templates
  {
    id: 'haze-dream',
    name: 'Haze Dream',
    emoji: '🌫',
    overrides: {
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0e6ff 100%)', backgroundId: 'pastel-violet',
      padding: 52, borderRadius: 24, shadow: 40,
      overlayHaze: true, overlayHazeColor: '#c8d8ff', overlayHazeOpacity: 45,
      imageSepia: 10, fade: 20,
    },
  },
  {
    id: 'bokeh-night',
    name: 'Bokeh',
    emoji: '✦',
    overrides: {
      background: 'linear-gradient(135deg, #020818 0%, #0a0022 100%)', backgroundId: 'deep-dark',
      padding: 52, borderRadius: 20, shadow: 70,
      overlayBokeh: true, overlayBokehColor: '#8b5cf6', overlayBokehOpacity: 35,
      titleGradient: true, glowIntensity: 15,
    },
  },
  {
    id: 'prismatic-light',
    name: 'Prismatic',
    emoji: '💎',
    overrides: {
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a0f1a 100%)', backgroundId: 'deep-dark',
      padding: 48, borderRadius: 20, shadow: 60,
      overlayPrismatic: true, overlayPrismaticOpacity: 40,
      titleGradient: true,
    },
  },
  {
    id: 'band-announce',
    name: 'Band',
    emoji: '📢',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', backgroundId: 'navy-dark',
      padding: 48, borderRadius: 16, shadow: 50,
      textUpperBand: true, textUpperBandBg: '#ec4899', textUpperBandText: '🔥 NEW RELEASE',
      accentLine: true, accentLineColor: '#ec4899', accentLinePosition: 'bottom',
    },
  },
  // Batch 17 templates
  {
    id: 'stamp-approved',
    name: 'Stamp',
    emoji: '📮',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a2e 0%, #0a0a1a 100%)', backgroundId: 'deep-dark',
      padding: 52, borderRadius: 16, shadow: 50,
      canvasStamp: true, canvasStampText: 'APPROVED', canvasStampColor: '#10b981',
    },
  },
  {
    id: 'retro-lines',
    name: 'Retro Lines',
    emoji: '📺',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%)', backgroundId: 'deep-dark',
      padding: 48, borderRadius: 16, shadow: 60,
      overlayRetroLines: true, overlayRetroLinesColor: '#ff6b6b', overlayRetroLinesOpacity: 30,
      imageGrayscale: 20, scanlines: 15,
    },
  },
  {
    id: 'bubble-dream',
    name: 'Bubbles',
    emoji: '🫧',
    overrides: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', backgroundId: 'indigo-dark',
      padding: 52, borderRadius: 24, shadow: 50,
      bgBubbles: true, bgBubblesColor: '#8b5cf6', bgBubblesOpacity: 25,
      titleGradient: true,
    },
  },
  {
    id: 'diagonal-ribbon',
    name: 'Ribbon',
    emoji: '🎀',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a1a 0%, #16213e 100%)', backgroundId: 'navy-dark',
      padding: 48, borderRadius: 16, shadow: 60,
      canvasRibbon: true, canvasRibbonText: 'SALE', canvasRibbonBg: '#ec4899',
      titleGradient: true, accentLine: true, accentLineColor: '#ec4899',
    },
  },
  // Batch 31 templates
  {
    id: 'tie-dye-psychedelic',
    name: 'Tie Dye',
    emoji: '🌀',
    overrides: {
      background: 'linear-gradient(135deg, #1a0030 0%, #000820 100%)', backgroundId: 'midnight',
      padding: 52, borderRadius: 20, shadow: 50,
      bgTieDye: true, bgTieDyeColor: '#ff6eb4', bgTieDyeOpacity: 35,
      titleFlicker: true, titleGradient: true,
      overlayMatrix: true, overlayMatrixOpacity: 10,
    },
  },
  {
    id: 'matrix-hacker',
    name: 'Matrix',
    emoji: '💻',
    overrides: {
      background: '#000000', backgroundId: 'solid-black',
      padding: 48, borderRadius: 0, shadow: 40,
      overlayMatrix: true, overlayMatrixOpacity: 30,
      imageNeonEdge: true,
      canvasBorderGlow: true, canvasBorderGlowColor: '#00ff41',
      titleColor: '#00ff41', titleFont: 'monospace',
    },
  },
  {
    id: 'wood-rustic',
    name: 'Wood',
    emoji: '🪵',
    overrides: {
      background: '#2d1a0a', backgroundId: 'solid-black',
      padding: 52, borderRadius: 4, shadow: 50,
      bgWoodGrain: true, bgWoodGrainColor: '#8b6040', bgWoodGrainOpacity: 30,
      textCursive: true, canvasBloom: true,
      frameBezel: true, frameBezelColor: '#8b6040',
      titleColor: '#f5deb3', titleFont: 'serif',
    },
  },
  {
    id: 'tartan-classic',
    name: 'Tartan',
    emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    overrides: {
      background: '#1a0a0a', backgroundId: 'solid-black',
      padding: 52, borderRadius: 8, shadow: 50,
      bgTartanPlaid: true, bgTartanPlaidColor: '#dc2626', bgTartanPlaidOpacity: 25,
      bgCrystal: true, bgCrystalOpacity: 12,
      imageBokeh: true,
      titleColor: '#fef2f2',
    },
  },
  // Batch 30 templates
  {
    id: 'terrazzo-modern',
    name: 'Terrazzo',
    emoji: '🪟',
    overrides: {
      background: 'linear-gradient(135deg, #f0f0f0 0%, #e8e8f8 100%)', backgroundId: 'light',
      padding: 52, borderRadius: 16, shadow: 40,
      bgTerrazzo: true, bgTerrazzoColor: '#8b5cf6', bgTerrazzoOpacity: 25,
      canvasTapeCorners: true,
      titleColor: '#2d1b4e',
    },
  },
  {
    id: 'ice-frost',
    name: 'Ice',
    emoji: '🧊',
    overrides: {
      background: 'linear-gradient(135deg, #e8f4ff 0%, #d0eeff 100%)', backgroundId: 'light',
      padding: 56, borderRadius: 20, shadow: 40,
      overlayIce: true, overlayIceOpacity: 35,
      bgLattice: true, bgLatticeColor: '#93c5fd', bgLatticeOpacity: 15,
      canvasInnerGlow: true, canvasInnerGlowColor: '#93c5fd',
      titleColor: '#1e3a5f',
    },
  },
  {
    id: 'ghost-moody',
    name: 'Ghost',
    emoji: '👻',
    overrides: {
      background: 'linear-gradient(135deg, #050510 0%, #0f0520 100%)', backgroundId: 'midnight',
      padding: 52, borderRadius: 16, shadow: 70,
      titleGhost: true, titleGhostColor: '#8b5cf6',
      overlayIce: true, overlayIceOpacity: 10,
      canvasOldPaper: true,
      titleColor: '#e2d9f3',
    },
  },
  {
    id: 'denim-casual',
    name: 'Denim',
    emoji: '👖',
    overrides: {
      background: '#1a2a4a', backgroundId: 'solid-black',
      padding: 52, borderRadius: 8, shadow: 50,
      bgDenim: true, bgDenimOpacity: 20,
      overlayPaintDrip: true, overlayPaintDripColor: '#ec4899', overlayPaintDripOpacity: 50,
      textStencil: true,
      titleColor: '#ffffff',
    },
  },
  // Batch 29 templates
  {
    id: 'marble-luxury',
    name: 'Marble',
    emoji: '🪨',
    overrides: {
      background: 'linear-gradient(135deg, #f5f5f5 0%, #e8e0f0 100%)', backgroundId: 'light',
      padding: 56, borderRadius: 12, shadow: 60,
      bgMarble: true, bgMarbleColor: '#c8a0d8', bgMarbleOpacity: 30,
      frameBezel: true, frameBezelColor: '#c8a06e',
      imageChalk: true,
      titleColor: '#2d1b4e',
    },
  },
  {
    id: 'brick-grunge',
    name: 'Brick',
    emoji: '🧱',
    overrides: {
      background: '#1a0a00', backgroundId: 'solid-black',
      padding: 52, borderRadius: 0, shadow: 50,
      bgBrickWall: true, bgBrickWallColor: '#c8502a', bgBrickWallOpacity: 25,
      overlayFlare: true, overlayFlareOpacity: 30,
      textShadowHard: true, textShadowHardColor: '#000000',
      titleColor: '#ff9966',
    },
  },
  {
    id: 'duotone-cinema',
    name: 'Duotone',
    emoji: '🎬',
    overrides: {
      background: 'linear-gradient(135deg, #0a0020 0%, #200010 100%)', backgroundId: 'midnight',
      padding: 52, borderRadius: 16, shadow: 60,
      imageDuotone: true, imageDuotoneColor: '#8b5cf6',
      bgLattice: true, bgLatticeColor: '#8b5cf6', bgLatticeOpacity: 12,
      canvasSepia: true,
      titleGradient: true,
    },
  },
  {
    id: 'chalk-board',
    name: 'Chalkboard',
    emoji: '🖊️',
    overrides: {
      background: '#1a2e1a', backgroundId: 'solid-black',
      padding: 56, borderRadius: 8, shadow: 40,
      imageChalk: true,
      bgFibers: true, bgFibersColor: '#ffffff', bgFibersOpacity: 6,
      textUnderlineWave: true,
      titleColor: '#e8f5e8', titleFont: 'serif',
    },
  },
  // Batch 28 templates
  {
    id: 'aurora-dream',
    name: 'Aurora',
    emoji: '🌌',
    overrides: {
      background: 'linear-gradient(160deg, #020d1f 0%, #040a14 100%)', backgroundId: 'midnight',
      padding: 56, borderRadius: 20, shadow: 60,
      bgAurora: true, bgAuroraColor: '#00c8a0', bgAuroraOpacity: 30,
      canvasInnerGlow: true, canvasInnerGlowColor: '#00c8a0',
      titleGradient: true, overlayStarburst: true, overlayStarburstOpacity: 8,
    },
  },
  {
    id: 'fish-scales',
    name: 'Scales',
    emoji: '🐠',
    overrides: {
      background: 'linear-gradient(135deg, #0a1628 0%, #1a2840 100%)', backgroundId: 'midnight',
      padding: 52, borderRadius: 16, shadow: 50,
      bgScales: true, bgScalesColor: '#4d96ff', bgScalesOpacity: 20,
      overlayStarburst: true, overlayStarburstOpacity: 12,
      canvasInnerGlow: true, canvasInnerGlowColor: '#4d96ff',
      titleColor: '#93c5fd',
    },
  },
  {
    id: 'fiber-bracket',
    name: 'Fiber',
    emoji: '🧵',
    overrides: {
      background: 'linear-gradient(135deg, #1a0a2e 0%, #0f0820 100%)', backgroundId: 'midnight',
      padding: 60, borderRadius: 8, shadow: 50,
      bgFibers: true, bgFibersColor: '#a78bfa', bgFibersOpacity: 18,
      frameCornerBrackets: true, frameCornerBracketsColor: '#a78bfa',
      canvasFloatShadow: true, titleGradient: true,
    },
  },
  {
    id: 'split-pop',
    name: 'Split',
    emoji: '🎨',
    overrides: {
      background: 'linear-gradient(135deg, #0a0010 0%, #1a0028 100%)', backgroundId: 'midnight',
      padding: 52, borderRadius: 16, shadow: 50,
      titleSplit: true, titleColor: '#a78bfa', titleSplitColorB: '#ec4899',
      imageSatBoost: true,
      textItalicForce: true,
    },
  },
  // Batch 27 templates
  {
    id: 'halftone-pop',
    name: 'Halftone',
    emoji: '🔵',
    overrides: {
      background: 'linear-gradient(135deg, #fff5f5 0%, #fff0ff 100%)', backgroundId: 'light',
      padding: 52, borderRadius: 16, shadow: 40,
      bgHalftone: true, bgHalftoneColor: '#8b5cf6', bgHalftoneOpacity: 20,
      titleRainbow: true,
      framePaintStroke: true, framePaintStrokeColor: '#8b5cf6',
    },
  },
  {
    id: 'camo-tactical',
    name: 'Camo',
    emoji: '🎖️',
    overrides: {
      background: '#1a2410', backgroundId: 'solid-black',
      padding: 52, borderRadius: 0, shadow: 50,
      bgCamo: true, bgCamoColor: '#4a6741', bgCamoOpacity: 30,
      textShadowHard: true, textShadowHardColor: '#000000',
      titleColor: '#c8d8a0', titleFont: 'monospace',
    },
  },
  {
    id: 'polka-vintage',
    name: 'Polka',
    emoji: '🟣',
    overrides: {
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', backgroundId: 'warm',
      padding: 56, borderRadius: 20, shadow: 40,
      bgPolkaDots: true, bgPolkaDotsColor: '#ec4899', bgPolkaDotsOpacity: 20,
      canvasTapeCorners: true,
      imageColorize: true,
      titleColor: '#9d174d',
    },
  },
  {
    id: 'paint-stroke-frame',
    name: 'Paint Frame',
    emoji: '🖌️',
    overrides: {
      background: 'linear-gradient(135deg, #1a0a2e 0%, #2d1b4e 100%)', backgroundId: 'midnight',
      padding: 60, borderRadius: 8, shadow: 60,
      framePaintStroke: true, framePaintStrokeColor: '#a78bfa',
      overlayNoise2: true, overlayNoise2Opacity: 25,
      canvasFloatShadow: true,
      titleGradient: true,
    },
  },
  // Batch 26 templates
  {
    id: 'old-photo-warm',
    name: 'Old Photo',
    emoji: '📷',
    overrides: {
      background: 'linear-gradient(135deg, #2d1b00 0%, #1a0f00 100%)', backgroundId: 'vintage',
      padding: 52, borderRadius: 4, shadow: 60,
      imageOldPhoto: true,
      overlayLightLeak2: true, overlayLightLeak2Opacity: 45,
      frameDoubleStroke: true, frameDoubleStrokeColor: '#c8a26e',
      titleFont: 'serif', titleColor: '#f5e6c8',
    },
  },
  {
    id: 'holographic-foil',
    name: 'Holographic',
    emoji: '🌈',
    overrides: {
      background: 'linear-gradient(135deg, #0a0a1a 0%, #1a0a2e 100%)', backgroundId: 'cosmic',
      padding: 56, borderRadius: 20, shadow: 70,
      imageHolographic: true,
      overlayRaindrops: true, overlayRaindropsOpacity: 25,
      canvasFloatShadow: true,
      titleGradient: true,
    },
  },
  {
    id: 'waveform-audio',
    name: 'Waveform',
    emoji: '🎵',
    overrides: {
      background: 'linear-gradient(135deg, #020215 0%, #0a0020 100%)', backgroundId: 'midnight',
      padding: 52, borderRadius: 16, shadow: 50,
      bgWaveform: true, bgWaveformColor: '#8b5cf6', bgWaveformOpacity: 20,
      bgCircuitBoard: true, bgCircuitBoardColor: '#5b21b6', bgCircuitBoardOpacity: 8,
      canvasBorderGlow: true, canvasBorderGlowColor: '#8b5cf6',
      titleNeonPulse: true, titleColor: '#a78bfa',
    },
  },
  {
    id: 'double-stroke-art',
    name: 'Double Frame',
    emoji: '🖼️',
    overrides: {
      background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 100%)', backgroundId: 'midnight',
      padding: 60, borderRadius: 12, shadow: 60,
      frameDoubleStroke: true, frameDoubleStrokeColor: '#e2c97e',
      canvasFloatShadow: true,
      textSmallCaps: true,
      titleFont: 'serif', titleColor: '#e2c97e',
    },
  },
  // Batch 25 templates
  {
    id: 'xray-vision',
    name: 'X-Ray',
    emoji: '🩻',
    overrides: {
      background: '#020210', backgroundId: 'solid-black',
      padding: 48, borderRadius: 8, shadow: 70,
      imageXRay: true,
      bgZigzagStripes: true, bgZigzagStripesColor: '#00ffff', bgZigzagStripesOpacity: 8,
      canvasBorderGlow: true, canvasBorderGlowColor: '#00ffff',
      titleColor: '#00ffff', titleFont: 'monospace',
    },
  },
  {
    id: 'mandala-zen',
    name: 'Mandala',
    emoji: '🌸',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #24243e 100%)', backgroundId: 'cosmic',
      padding: 60, borderRadius: 50, shadow: 50,
      bgMandala: true, bgMandalaColor: '#a78bfa', bgMandalaOpacity: 18,
      bgPrismaticSheen: true, bgPrismaticSheenOpacity: 25,
      titleGradient: true,
    },
  },
  {
    id: 'confetti-pop',
    name: 'Confetti',
    emoji: '🎊',
    overrides: {
      background: 'linear-gradient(135deg, #1a0a2e 0%, #2e1a0a 100%)', backgroundId: 'midnight',
      padding: 52, borderRadius: 20, shadow: 50,
      overlayConfetti: true, overlayConfettiOpacity: 30,
      overlayGlare: true, overlayGlareOpacity: 20,
      titleGradient: true,
    },
  },
  {
    id: 'outline-minimal',
    name: 'Outline',
    emoji: '⬜',
    overrides: {
      background: 'transparent', backgroundId: 'transparent',
      padding: 52, borderRadius: 16, shadow: 0,
      canvasOutlineOnly: true,
      borderWidth: 2, borderColor: '#8b5cf6', borderStyle: 'solid',
      titleColor: '#ffffff',
    },
  },
  // Batch 24 templates
  {
    id: 'pixel-art',
    name: 'Pixel Art',
    emoji: '👾',
    overrides: {
      background: 'linear-gradient(135deg, #0d0d1a 0%, #1a1a3e 100%)', backgroundId: 'midnight',
      padding: 48, borderRadius: 0, shadow: 60,
      overlayPixelGrid: true, overlayPixelGridOpacity: 20,
      imageFlatColor: true,
      titleFont: 'monospace', titleColor: '#00ff41',
    },
  },
  {
    id: 'cinematic-bars',
    name: 'Cinema',
    emoji: '🎥',
    overrides: {
      background: '#000000', backgroundId: 'solid-black',
      padding: 0, borderRadius: 0, shadow: 70,
      textLetterboxBars: true,
      imageNoirEffect: true,
      titleColor: '#ffffff', titleFont: 'Georgia', titleSize: 26,
    },
  },
  {
    id: 'neon-tube-frame',
    name: 'Neon Tube',
    emoji: '💡',
    overrides: {
      background: '#050510', backgroundId: 'solid-black',
      padding: 52, borderRadius: 12, shadow: 60,
      frameNeonTube: true, frameNeonTubeColor: '#ff00ff',
      bgSpiralConic: true, bgSpiralConicColor: '#7c3aed', bgSpiralConicOpacity: 18,
      titleNeonSign: true, titleNeonSignColor: '#ff00ff',
    },
  },
  {
    id: 'infrared-scan',
    name: 'Infrared',
    emoji: '🌡',
    overrides: {
      background: 'linear-gradient(135deg, #050000 0%, #1a0500 100%)', backgroundId: 'solid-black',
      padding: 52, borderRadius: 8, shadow: 70,
      imageInfrared: true,
      overlayHeatmap: true, overlayHeatmapOpacity: 30,
      canvasBorderGlow: true, canvasBorderGlowColor: '#ff4400',
    },
  },
  // Batch 23 templates
  {
    id: 'gold-leaf',
    name: 'Gold Leaf',
    emoji: '🏆',
    overrides: {
      background: 'linear-gradient(135deg, #1a0f00 0%, #3d2200 100%)', backgroundId: 'mocha',
      padding: 52, borderRadius: 8, shadow: 70,
      frameGoldLeaf: true, frameGoldLeafWidth: 8,
      bgColorWash: true, bgColorWashColor: '#92400e', bgColorWashOpacity: 15,
      titleColor: '#fbbf24', titleFont: 'Georgia',
    },
  },
  {
    id: 'watercolor-dream',
    name: 'Watercolor',
    emoji: '🎨',
    overrides: {
      background: 'linear-gradient(135deg, #ede9fe 0%, #fce7f3 100%)', backgroundId: 'lavender',
      padding: 56, borderRadius: 20, shadow: 40,
      imageWatercolor: true,
      overlayFogBottom: true, overlayFogBottomColor: '#ede9fe', overlayFogBottomOpacity: 35,
      textBoxGlass: true, textBoxGlassOpacity: 40,
    },
  },
  {
    id: 'triangle-geo',
    name: 'Geometric',
    emoji: '🔺',
    overrides: {
      background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)', backgroundId: 'cobalt',
      padding: 52, borderRadius: 0, shadow: 60,
      bgTrianglePattern: true, bgTriangleColor: '#a78bfa', bgTriangleOpacity: 15,
      frameDiamondCut: true,
      titleGradient: true,
    },
  },
  {
    id: 'aqua-depths',
    name: 'Aqua',
    emoji: '🌊',
    overrides: {
      background: 'linear-gradient(180deg, #001a3a 0%, #003366 100%)', backgroundId: 'cobalt',
      padding: 56, borderRadius: 20, shadow: 70,
      imageAquaEffect: true,
      overlayFogBottom: true, overlayFogBottomColor: '#0ea5e9', overlayFogBottomOpacity: 25,
      bgWaves: true, bgWavesColor: '#38bdf8', bgWavesOpacity: 20,
      titleGradient: true,
    },
  },
  // Batch 22 templates
  {
    id: 'vaporwave-dream',
    name: 'Vaporwave',
    emoji: '🌸',
    overrides: {
      background: 'linear-gradient(135deg, #1a0a2e 0%, #2e0a1a 100%)', backgroundId: 'midnight',
      padding: 56, borderRadius: 20, shadow: 60,
      imageVaporwave: true,
      bgSunburst: true, bgSunburstColor: '#ff80ff', bgSunburstOpacity: 15,
      overlayHolographic: true, overlayHolographicOpacity: 25,
      titleGradient: true,
    },
  },
  {
    id: 'starfield-cosmos',
    name: 'Starfield',
    emoji: '✨',
    overrides: {
      background: '#00000f', backgroundId: 'solid-black',
      padding: 60, borderRadius: 24, shadow: 70,
      bgStarfield: true, bgStarfieldOpacity: 40,
      bgNebula: true, bgNebulaColor: '#1e3a8a', bgNebulaOpacity: 50,
      canvasGlassReflect: true, canvasGlassReflectOpacity: 15,
      titleGradient: true,
    },
  },
  {
    id: 'dream-glow',
    name: 'Dream',
    emoji: '💫',
    overrides: {
      background: 'linear-gradient(135deg, #fce4ec 0%, #e1f5fe 100%)', backgroundId: 'candy',
      padding: 52, borderRadius: 24, shadow: 50,
      imageDreamGlow: true,
      overlayLightRays: true, overlayLightRaysOpacity: 12,
      canvasGlassReflect: true, canvasGlassReflectOpacity: 20,
    },
  },
  {
    id: 'heatmap-thermal',
    name: 'Thermal',
    emoji: '🌡',
    overrides: {
      background: '#0a0000', backgroundId: 'solid-black',
      padding: 48, borderRadius: 8, shadow: 80,
      overlayHeatmap: true, overlayHeatmapOpacity: 45,
      imageColorSplit: true,
      canvasBorderGlow: true, canvasBorderGlowColor: '#ff4400',
    },
  },
  // Batch 21 templates
  {
    id: 'retro-grid-80s',
    name: 'Retrowave',
    emoji: '🌆',
    overrides: {
      background: 'linear-gradient(180deg, #0a0a1a 0%, #1a0a2e 50%, #2a0a1e 100%)', backgroundId: 'midnight',
      padding: 56, borderRadius: 16, shadow: 60,
      overlayRetroGrid: true, overlayRetroGridOpacity: 35,
      titleNeonSign: true, titleNeonSignColor: '#ff0080',
      canvasBorderGlow: true, canvasBorderGlowColor: '#ff0080',
      bgGlowOrb: true, bgGlowOrbColor: '#8b5cf6', bgGlowOrbX: 50, bgGlowOrbY: 70,
    },
  },
  {
    id: 'nebula-dream',
    name: 'Nebula',
    emoji: '🌌',
    overrides: {
      background: 'linear-gradient(135deg, #050510 0%, #0a0520 100%)', backgroundId: 'midnight',
      padding: 60, borderRadius: 20, shadow: 70,
      bgNebula: true, bgNebulaColor: '#4c1d95', bgNebulaOpacity: 60,
      overlayLightRays: true, overlayLightRaysOpacity: 15,
      overlayHolographic: true, overlayHolographicOpacity: 20,
      titleGradient: true,
    },
  },
  {
    id: 'oil-canvas',
    name: 'Oil Paint',
    emoji: '🎨',
    overrides: {
      background: 'linear-gradient(135deg, #2c1810 0%, #4a2c1a 100%)', backgroundId: 'mocha',
      padding: 52, borderRadius: 4, shadow: 60,
      imageOilPaint: true,
      frameMatte: true, frameMatteColor: '#1a0f08', frameMatteWidth: 20,
      titleFont: 'Georgia',
    },
  },
  {
    id: 'noir-city',
    name: 'Noir',
    emoji: '🎬',
    overrides: {
      background: '#000000', backgroundId: 'solid-black',
      padding: 48, borderRadius: 0, shadow: 80,
      imageNoirEffect: true,
      canvasRadialFade: true, canvasRadialFadeColor: '#000000',
      titleColor: '#ffffff', titleSize: 28, titleFont: 'Georgia',
    },
  },
  // Batch 20 templates
  {
    id: 'neon-sign',
    name: 'Neon Sign',
    emoji: '💡',
    overrides: {
      background: '#020208', backgroundId: 'pure-black',
      padding: 56, borderRadius: 20, shadow: 80,
      titleNeonSign: true, titleNeonSignColor: '#ff0080',
      bgGridLines: true, bgGridLinesColor: '#1a0a2e', bgGridLinesOpacity: 30,
      canvasBorderGlow: true, canvasBorderGlowColor: '#ff0080',
    },
  },
  {
    id: 'film-strip',
    name: 'Film Strip',
    emoji: '🎞',
    overrides: {
      background: '#0a0a0a', backgroundId: 'pure-black',
      padding: 48, borderRadius: 4, shadow: 50,
      frameFilmStrip: true,
      imageGrayscale: 20, filmGrain: 25,
      overlayDust: true, overlayDustOpacity: 20,
    },
  },
  {
    id: 'circuit-tech',
    name: 'Circuit',
    emoji: '🔌',
    overrides: {
      background: 'linear-gradient(135deg, #000d0d 0%, #001a0a 100%)', backgroundId: 'dark-green',
      padding: 52, borderRadius: 16, shadow: 60,
      bgCircuitBoard: true, bgCircuitBoardOpacity: 18,
      titleNeonSign: true, titleNeonSignColor: '#00ff88',
      canvasBorderGlow: true, canvasBorderGlowColor: '#00ff88',
    },
  },
  {
    id: 'hex-cosmos',
    name: 'Hex Cosmos',
    emoji: '⬡',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)', backgroundId: 'cosmic',
      padding: 56, borderRadius: 20, shadow: 60,
      bgHexGrid: true, bgHexGridColor: '#a78bfa', bgHexGridOpacity: 15,
      overlayHolographic: true, overlayHolographicOpacity: 25,
      titleGradient: true,
    },
  },
  // Batch 19 templates
  {
    id: 'glitch-title',
    name: 'Glitch',
    emoji: '⚡',
    overrides: {
      background: '#000000', backgroundId: 'pure-black',
      padding: 52, borderRadius: 16, shadow: 60,
      titleGlitch: true, titleGlitchColor: '#00ffff',
      canvasBorderGlow: true, canvasBorderGlowColor: '#ff0080',
      scanlines: 20, filmGrain: 15,
    },
  },
  {
    id: 'holographic',
    name: 'Holographic',
    emoji: '🌈',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #302b63 100%)', backgroundId: 'cosmic',
      padding: 56, borderRadius: 24, shadow: 60,
      overlayHolographic: true, overlayHolographicOpacity: 45,
      titleGradient: true, frameMatte: false,
    },
  },
  {
    id: 'glow-orb',
    name: 'Glow Orb',
    emoji: '🔮',
    overrides: {
      background: '#020208', backgroundId: 'pure-black',
      padding: 64, borderRadius: 20, shadow: 80,
      bgGlowOrb: true, bgGlowOrbColor: '#8b5cf6', bgGlowOrbX: 50, bgGlowOrbY: 35,
      canvasSpotlight: true, canvasSpotlightStrength: 30,
      titleGradient: true,
    },
  },
  {
    id: 'glass-card-frosted',
    name: 'Frosted',
    emoji: '🧊',
    overrides: {
      background: 'linear-gradient(135deg, #1a1a3e 0%, #0a1a3e 100%)', backgroundId: 'navy-dark',
      padding: 52, borderRadius: 24, shadow: 60,
      cardGlassOverlay: true, cardGlassOverlayBg: '#ffffff14',
      overlayHolographic: true, overlayHolographicOpacity: 20,
    },
  },
  // Batch 18 templates
  {
    id: 'lomo-film',
    name: 'Lomo',
    emoji: '🎞',
    overrides: {
      background: 'linear-gradient(135deg, #1a0a2e 0%, #0a1a2e 100%)', backgroundId: 'deep-dark',
      padding: 48, borderRadius: 12, shadow: 60,
      imageLomo: true, vignette: 50, filmGrain: 30,
      imageColorMap: 'none', saturation: 130,
    },
  },
  {
    id: 'xprocess',
    name: 'X-Process',
    emoji: '🔬',
    overrides: {
      background: 'linear-gradient(135deg, #0a1a0a 0%, #1a0a1a 100%)', backgroundId: 'dark-green',
      padding: 52, borderRadius: 16, shadow: 70,
      imageXProcess: true, canvasSpotlight: true, canvasSpotlightStrength: 40,
    },
  },
  {
    id: 'mesh-gradient',
    name: 'Mesh',
    emoji: '🌐',
    overrides: {
      background: 'linear-gradient(135deg, #0f0c29 0%, #24243e 100%)', backgroundId: 'cosmic',
      padding: 56, borderRadius: 24, shadow: 60,
      overlayGradientMesh: true, overlayGradientMeshOpacity: 50,
      titleGradient: true, frameMatte: true, frameMatteColor: '#0f0c29', frameMatteWidth: 16,
    },
  },
  {
    id: 'spotlight-hero',
    name: 'Spotlight',
    emoji: '💡',
    overrides: {
      background: '#050508', backgroundId: 'pure-black',
      padding: 64, borderRadius: 20, shadow: 80,
      canvasSpotlight: true, canvasSpotlightColor: '#a78bfa', canvasSpotlightStrength: 65,
      bgWaves: true, bgWavesColor: '#7c3aed', bgWavesOpacity: 15,
      titleGradient: true,
    },
  },
];

/* ── Image filter presets ──────────────────────── */
export const IMAGE_PRESETS: { id: string; name: string; filters: string }[] = [
  { id: 'none',       name: 'None',       filters: '' },
  { id: 'clarendon',  name: 'Clarendon',  filters: 'contrast(120%) saturate(125%) brightness(105%)' },
  { id: 'juno',       name: 'Juno',       filters: 'sepia(15%) contrast(115%) brightness(108%) saturate(130%)' },
  { id: 'lark',       name: 'Lark',       filters: 'brightness(110%) contrast(95%) saturate(110%)' },
  { id: 'ludwig',     name: 'Ludwig',     filters: 'saturate(90%) brightness(105%) contrast(105%)' },
  { id: 'moon',       name: 'Moon',       filters: 'grayscale(100%) brightness(110%) contrast(110%)' },
  { id: 'reyes',      name: 'Reyes',      filters: 'sepia(25%) brightness(110%) contrast(85%) saturate(75%)' },
  { id: 'rise',       name: 'Rise',       filters: 'brightness(105%) sepia(25%) saturate(130%) contrast(90%)' },
  { id: 'sierra',     name: 'Sierra',     filters: 'contrast(90%) saturate(90%) brightness(105%)' },
  { id: 'slumber',    name: 'Slumber',    filters: 'saturate(60%) brightness(95%) sepia(15%)' },
  { id: 'valencia',   name: 'Valencia',   filters: 'contrast(110%) brightness(105%) sepia(20%) saturate(80%)' },
  { id: 'xpro2',      name: 'X-Pro II',   filters: 'sepia(30%) contrast(120%) brightness(95%) saturate(130%)' },
  { id: 'willow',     name: 'Willow',     filters: 'grayscale(50%) contrast(95%) brightness(90%)' },
  { id: 'inkwell',    name: 'Inkwell',    filters: 'grayscale(100%) contrast(110%) brightness(90%)' },
  { id: 'kelvin',     name: 'Kelvin',     filters: 'sepia(50%) saturate(150%) brightness(110%) contrast(105%)' },
  { id: 'mayfair',    name: 'Mayfair',    filters: 'contrast(110%) saturate(110%) brightness(108%)' },
];
