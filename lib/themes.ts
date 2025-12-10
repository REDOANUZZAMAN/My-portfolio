// Theme presets for the portfolio

export interface ThemePreset {
  id: string;
  name: string;
  description: string;
  primary: string;
  accent: string;
  gradient: string;
}

export const themePresets: ThemePreset[] = [
  {
    id: 'blue-purple',
    name: 'Blue to Purple',
    description: 'Cool and professional',
    primary: '#0ea5e9',
    accent: '#d946ef',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    id: 'gold-orange',
    name: 'Gold to Orange',
    description: 'Luxury and elegance',
    primary: '#f59e0b',
    accent: '#f97316',
    gradient: 'from-amber-500 to-orange-600',
  },
  {
    id: 'orange-red',
    name: 'Orange to Red',
    description: 'Energetic and bold',
    primary: '#f97316',
    accent: '#ef4444',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 'green-teal',
    name: 'Green to Teal',
    description: 'Fresh and natural',
    primary: '#10b981',
    accent: '#14b8a6',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    id: 'pink-purple',
    name: 'Pink to Purple',
    description: 'Creative and vibrant',
    primary: '#ec4899',
    accent: '#a855f7',
    gradient: 'from-pink-500 to-purple-600',
  },
  {
    id: 'red-pink',
    name: 'Red to Pink',
    description: 'Bold and passionate',
    primary: '#ef4444',
    accent: '#ec4899',
    gradient: 'from-red-500 to-pink-600',
  },
  {
    id: 'blue-green',
    name: 'Blue to Green',
    description: 'Tech and modern',
    primary: '#3b82f6',
    accent: '#10b981',
    gradient: 'from-blue-600 to-green-500',
  },
  {
    id: 'indigo-blue',
    name: 'Indigo to Blue',
    description: 'Deep and trustworthy',
    primary: '#6366f1',
    accent: '#3b82f6',
    gradient: 'from-indigo-600 to-blue-500',
  },
  {
    id: 'cyan-blue',
    name: 'Cyan to Blue',
    description: 'Bright and clean',
    primary: '#06b6d4',
    accent: '#3b82f6',
    gradient: 'from-cyan-500 to-blue-600',
  },
  {
    id: 'yellow-orange',
    name: 'Yellow to Orange',
    description: 'Sunny and optimistic',
    primary: '#eab308',
    accent: '#f97316',
    gradient: 'from-yellow-500 to-orange-500',
  },
  // Premium Gradients
  {
    id: 'sunset-fire',
    name: 'Sunset Fire',
    description: '🔥 Premium - Warm sunset',
    primary: '#ff6b6b',
    accent: '#ffd93d',
    gradient: 'from-red-400 to-yellow-400',
  },
  {
    id: 'ocean-breeze',
    name: 'Ocean Breeze',
    description: '🌊 Premium - Deep ocean',
    primary: '#4facfe',
    accent: '#00f2fe',
    gradient: 'from-blue-400 to-cyan-300',
  },
  {
    id: 'purple-haze',
    name: 'Purple Haze',
    description: '💜 Premium - Royal luxury',
    primary: '#a855f7',
    accent: '#ec4899',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    id: 'emerald-mint',
    name: 'Emerald Mint',
    description: '💎 Premium - Fresh emerald',
    primary: '#10b981',
    accent: '#6ee7b7',
    gradient: 'from-emerald-500 to-emerald-300',
  },
  {
    id: 'ruby-rose',
    name: 'Ruby Rose',
    description: '🌹 Premium - Elegant rose',
    primary: '#e11d48',
    accent: '#fb7185',
    gradient: 'from-rose-600 to-rose-400',
  },
  {
    id: 'midnight-blue',
    name: 'Midnight Blue',
    description: '🌙 Premium - Deep night',
    primary: '#1e40af',
    accent: '#3b82f6',
    gradient: 'from-blue-800 to-blue-500',
  },
  {
    id: 'neon-pink',
    name: 'Neon Pink',
    description: '✨ Premium - Electric glow',
    primary: '#ff0080',
    accent: '#ff8c00',
    gradient: 'from-pink-600 to-orange-500',
  },
  {
    id: 'forest-green',
    name: 'Forest Green',
    description: '🌲 Premium - Nature vibes',
    primary: '#059669',
    accent: '#84cc16',
    gradient: 'from-green-600 to-lime-500',
  },
  {
    id: 'cosmic-purple',
    name: 'Cosmic Purple',
    description: '🌌 Premium - Galaxy vibes',
    primary: '#7c3aed',
    accent: '#c026d3',
    gradient: 'from-violet-600 to-fuchsia-600',
  },
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: '☀️ Premium - Magic hour',
    primary: '#f59e0b',
    accent: '#fbbf24',
    gradient: 'from-amber-500 to-amber-400',
  },
  {
    id: 'ice-blue',
    name: 'Ice Blue',
    description: '❄️ Premium - Cool frost',
    primary: '#0ea5e9',
    accent: '#67e8f9',
    gradient: 'from-sky-500 to-cyan-300',
  },
  {
    id: 'lava-red',
    name: 'Lava Red',
    description: '🌋 Premium - Hot lava',
    primary: '#dc2626',
    accent: '#f97316',
    gradient: 'from-red-600 to-orange-500',
  },
  {
    id: 'mint-dream',
    name: 'Mint Dream',
    description: '🍃 Premium - Soft mint',
    primary: '#34d399',
    accent: '#6ee7b7',
    gradient: 'from-emerald-400 to-emerald-300',
  },
  {
    id: 'royal-gold',
    name: 'Royal Gold',
    description: '👑 Premium - King\'s gold',
    primary: '#d97706',
    accent: '#fbbf24',
    gradient: 'from-amber-600 to-amber-400',
  },
  {
    id: 'electric-blue',
    name: 'Electric Blue',
    description: '⚡ Premium - High voltage',
    primary: '#2563eb',
    accent: '#06b6d4',
    gradient: 'from-blue-600 to-cyan-500',
  },
];

export const getThemeById = (id: string): ThemePreset | undefined => {
  return themePresets.find(theme => theme.id === id);
};

export const applyTheme = (primary: string, accent: string) => {
  document.documentElement.style.setProperty('--color-primary', primary);
  document.documentElement.style.setProperty('--color-accent', accent);
};
