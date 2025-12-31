import { CategoryDefinition, Preset, PromptOption } from './types';

// --- Helper to create options easily ---
// This reduces code repetition for the new styles
const createOption = (id: string, label: string, desc: string, prompt: string, color?: string): PromptOption => ({
  id, label, description: desc, promptValue: prompt, previewColor: color
});

// --- 1. GHIBLI (Existing) ---
const GHIBLI_OPTS = {
  style: createOption('ghibli_style', 'Ghibli Style', '吉卜力風格：手繪水彩，溫暖懷舊 (Hand-painted watercolor)', 'Studio Ghibli inspired, hand-painted watercolor texture, soft brushstrokes, gentle warm lighting, nostalgic anime movie still'),
  structure: createOption('ghibli_struct', 'Winding Path', '蜿蜒小徑：連接不同場景 (Dirt path or flying trail)', 'A winding dirt path through a landscape connected by a fantasy flying machine trail. Split screen comparison layout'),
  elements: createOption('ghibli_elem', 'Nature vs. Confusion', '自然精靈 vs 混亂：煤炭精靈、發光樹 (Soot sprites, glowing trees)', 'Left: Confused villager, dark forest, soot sprites. Right: Happy adventurer, lush meadow, giant glowing magical tree, forest spirits holding coins'),
  color: createOption('ghibli_color', 'Earthy & Soft', '大地色系：柔和水彩綠、藍、黃 (Greens, blues, muted yellows)', 'Earthy greens, soft sky blues, muted yellows, and warm watercolor palette', 'bg-gradient-to-r from-green-200 via-yellow-100 to-blue-200'),
  layout: createOption('ghibli_layout', 'Painterly Open', '繪畫留白：背景適合疊加文字 (Text over painted backgrounds)', 'Keep the layout clear for text overlays on top of the painted background')
};

// --- 2. PIXAR (Existing) ---
const PIXAR_OPTS = {
  style: createOption('pixar_style', 'Pixar Style', '皮克斯風格：3D動畫，細緻材質 (3D animation, rich textures)', '3D rendered animation still, Pixar movie style, rich textures (plastic, metal), cinematic lighting, highly polished, volumetric light'),
  structure: createOption('pixar_struct', 'Conveyor Belt', '輸送帶：玩具軌道或未來通道 (Futuristic 3D path/toy track)', 'A futuristic conveyor belt path that winds through two distinct zones in a 3D environment. Split screen layout'),
  elements: createOption('pixar_elem', 'Toys & Tech', '玩具與科技：機器人、金庫 (Robots, vaults, 3D chars)', 'Left: Stressed stylized 3D character, chaotic room, broken robot toys. Right: Confident 3D character, clean high-tech vault, mechanical money tree'),
  color: createOption('pixar_color', 'Vibrant 3D', '鮮豔飽和：冷暖光影對比 (Saturated, warm vs cool)', 'Vibrant and saturated colors, warm light vs cool shadows, high contrast', 'bg-gradient-to-r from-blue-500 via-red-500 to-yellow-400'),
  layout: createOption('pixar_layout', 'Floating Blocks', '懸浮區塊：3D空間中的文字框 (Text floating in 3D space)', 'Infographic composition with designated areas for text blocks floating in 3D space')
};

// --- 3. DEMON SLAYER (Existing) ---
const DEMON_OPTS = {
  style: createOption('demon_style', 'Demon Slayer', '鬼滅風格：動漫墨線，浮世繪特效 (Anime, ink lines, FX)', 'Anime still frame, Demon Slayer art style, heavy black ink outlines, Ukiyo-e woodblock print influence, dramatic energy visual effects'),
  structure: createOption('demon_struct', 'Sword Slash', '斬擊軌跡：動態刀鋒路徑 (Dynamic trajectory)', 'A path defined by a dynamic sword slash trajectory separating two opposing forces. Split screen comparison'),
  elements: createOption('demon_elem', 'Heroes vs. Demons', '獵鬼人 vs 惡鬼：呼吸法特效 (Samurai, breathing effects)', 'Left: Troubled samurai, dark aura, menacing demon shadows. Right: Heroic swordsman, water breathing visual effects turning into a golden tree'),
  color: createOption('demon_color', 'High Contrast Ink', '強烈對比：黑金配色 (Indigo/Black vs Gold)', 'High contrast. Deep indigo and black vs vibrant gold, orange, and electric blue', 'bg-gradient-to-r from-slate-900 via-blue-700 to-yellow-400'),
  layout: createOption('demon_layout', 'Scrolls & Drama', '卷軸構圖：具張力的日式排版 (Japanese scrolls for text)', 'Use traditional Japanese scrolls for text boxes, dramatic composition')
};

// --- 4. BUSINESS CORP (New) ---
const BIZ_OPTS = {
  style: createOption('biz_style', 'Business Corp', '商務簡報：簡潔向量，等距視角 (Clean vector, isometric)', 'Corporate vector illustration, clean flat design, isometric perspective, professional, high quality vector art, dribbble style'),
  structure: createOption('biz_struct', 'Ascending Steps', '上升階梯：成長圖表 (Stairs or growth charts)', 'A clear ascending staircase structure showing progress from chaos to order. Isometric view'),
  elements: createOption('biz_elem', 'Office & Charts', '辦公室：數據圖、筆電 (Suits, laptops, graphs)', 'Left: Frustrated office worker, tangled wires, red downward charts. Right: Successful executive, organized server racks, ascending green bar charts, floating coins'),
  color: createOption('biz_color', 'Trust Blue', '專業信任：藍白配色 (Professional blues and whites)', 'Professional color palette, trustworthy deep blues, clean whites, and accent success greens', 'bg-gradient-to-r from-blue-900 via-blue-100 to-green-500'),
  layout: createOption('biz_layout', 'Grid System', '模組化網格：乾淨的卡片式排版 (Modular, clean cards)', 'Clean modular grid layout, white space, card-based text areas')
};

// --- 5. CHALKBOARD (New) ---
const CHALK_OPTS = {
  style: createOption('chalk_style', 'Chalkboard', '黑板手繪：粉筆質感 (Hand-drawn chalk on blackboard)', 'Realistic chalkboard art style, white chalk texture on dark green textured slate, hand-drawn sketch style, rough artistic strokes'),
  structure: createOption('chalk_struct', 'Mind Map', '心智圖：流程圖連結 (Connected flowcharts)', 'A hand-drawn flowchart connection style, arrows connecting different concepts, mind map structure'),
  elements: createOption('chalk_elem', 'Doodles', '塗鴉：火柴人、燈泡 (Stick figures, lightbulbs)', 'Left: Messy scribbles, question marks, rain clouds drawn in chalk. Right: Lightbulbs, treasure chest doodles, growing flower pot drawn in chalk'),
  color: createOption('chalk_color', 'Black & White', '黑板配色：深綠底白線 (Dark slate background)', 'Dark green blackboard background, white and yellow chalk lines', 'bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600'),
  layout: createOption('chalk_layout', 'Lesson Plan', '課程板書：條列式結構 (Structured lists)', 'Structured like a classroom lesson plan, clear headings drawn in chalk typography')
};

// --- 6. MODERN TECH (New) ---
const TECH_OPTS = {
  style: createOption('tech_style', 'Modern Tech', '現代科技：賽博龐克，玻璃擬態 (Dark mode, neon)', 'Cyberpunk aesthetic, modern technology, dark mode, neon glowing lines, glassmorphism UI elements, futuristic'),
  structure: createOption('tech_struct', 'Circuit Board', '電路板：數位傳輸路徑 (Digital pathways)', 'A glowing digital circuit board pathway connecting nodes of data'),
  elements: createOption('tech_elem', 'Holograms', '全像投影：虛擬數據流 (Digital avatars, tokens)', 'Left: Glitching red data streams, broken lock icon, warning signs. Right: Secure blue shield, holographic token coins, seamless data flow'),
  color: createOption('tech_color', 'Neon Dark', '暗黑霓虹：發光青紫 (Black, Cyan, Magenta)', 'Dark background, neon cyan and magenta accents, glowing effects', 'bg-gradient-to-r from-slate-900 via-purple-600 to-cyan-400'),
  layout: createOption('tech_layout', 'Dashboard', '儀表板：HUD 抬頭顯示器 (HUD style overlay)', 'Futuristic HUD (Heads Up Display) layout, semi-transparent data panels')
};

// --- 7. EDITORIAL ILLUSTRATION (New) ---
const ILLU_OPTS = {
  style: createOption('illu_style', 'Trendy Illustration', '流行插畫：扁平幾何，曼非斯 (Flat, abstract, Memphis)', 'Trendy editorial illustration, flat design, abstract shapes, Memphis design elements, noise texture, grain, Behance style'),
  structure: createOption('illu_struct', 'River Flow', '流動曲線：有機線條引導 (Organic curves)', 'An organic flowing river shape guiding the eye from top to bottom'),
  elements: createOption('illu_elem', 'Abstract Metaphor', '抽象隱喻：巨手、植物 (Giant hands, plants)', 'Left: Giant stylized hand tangling threads, withered plants. Right: Giant hand watering a large geometric money plant, abstract coins'),
  color: createOption('illu_color', 'Pastel Pop', '柔和粉彩：粉紅、薄荷綠 (Soft pinks, purples, mint)', 'Soft pastel color palette, coral pink, mint green, and lavender purple', 'bg-gradient-to-r from-pink-200 via-purple-200 to-teal-200'),
  layout: createOption('illu_layout', 'Magazine', '雜誌排版：大膽字體與留白 (Magazine, bold typography)', 'Magazine editorial layout, bold typography headers, ample negative space')
};


// --- CATEGORIES AGGREGATION ---

export const CATEGORIES: CategoryDefinition[] = [
  {
    key: 'style',
    title: '1. Art Style',
    description: 'Define the aesthetic.',
    options: [GHIBLI_OPTS.style, PIXAR_OPTS.style, DEMON_OPTS.style, BIZ_OPTS.style, CHALK_OPTS.style, TECH_OPTS.style, ILLU_OPTS.style]
  },
  {
    key: 'structure',
    title: '2. Structure',
    description: 'Visual flow.',
    options: [GHIBLI_OPTS.structure, PIXAR_OPTS.structure, DEMON_OPTS.structure, BIZ_OPTS.structure, CHALK_OPTS.structure, TECH_OPTS.structure, ILLU_OPTS.structure]
  },
  {
    key: 'elements',
    title: '3. Elements',
    description: 'Objects & Characters.',
    options: [GHIBLI_OPTS.elements, PIXAR_OPTS.elements, DEMON_OPTS.elements, BIZ_OPTS.elements, CHALK_OPTS.elements, TECH_OPTS.elements, ILLU_OPTS.elements]
  },
  {
    key: 'color',
    title: '4. Color',
    description: 'Palette & Mood.',
    options: [GHIBLI_OPTS.color, PIXAR_OPTS.color, DEMON_OPTS.color, BIZ_OPTS.color, CHALK_OPTS.color, TECH_OPTS.color, ILLU_OPTS.color]
  },
  {
    key: 'layout',
    title: '5. Layout',
    description: 'Composition.',
    options: [GHIBLI_OPTS.layout, PIXAR_OPTS.layout, DEMON_OPTS.layout, BIZ_OPTS.layout, CHALK_OPTS.layout, TECH_OPTS.layout, ILLU_OPTS.layout]
  }
];

// --- PRESETS ---

const createPreset = (name: string, desc: string, opts: any): Preset => ({
  name, description: desc, data: { style: opts.style, structure: opts.structure, elements: opts.elements, color: opts.color, layout: opts.layout }
});

export const PRESETS: Preset[] = [
  createPreset('Ghibli Nostalgia', '吉卜力風格：手繪水彩與自然 (Watercolor & Nature)', GHIBLI_OPTS),
  createPreset('Pixar 3D Magic', '皮克斯風格：3D動畫與高科技 (High-tech & Toys)', PIXAR_OPTS),
  createPreset('Anime Action', '鬼滅風格：水墨特效與張力 (Ink & Effects)', DEMON_OPTS),
  createPreset('Business Pro', '商務簡報：簡潔向量與藍調 (Clean Vector & Blue)', BIZ_OPTS),
  createPreset('Chalkboard Edu', '黑板手繪：教學與塗鴉 (Sketch & Teaching)', CHALK_OPTS),
  createPreset('Cyber Tech', '現代科技：霓虹與暗黑模式 (Neon & Dark Mode)', TECH_OPTS),
  createPreset('Artistic Editorial', '插畫手繪：流行配色與抽象 (Pastel & Abstract)', ILLU_OPTS),
];