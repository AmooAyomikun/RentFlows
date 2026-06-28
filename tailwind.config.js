/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — Forest Teal
        primary: {
          DEFAULT: '#0B4F45',
          dark: '#073A33',
        },
        // Accent — Sunclay
        accent: {
          DEFAULT: '#C75B30',
          light: '#E79868',
        },
        // Backgrounds & surfaces
        warm: '#FAF7F2',
        surface: '#FFFFFF',
        // Text colors
        charcoal: '#1B1F1D',
        body: '#4A4F4C',
        muted: '#8A8F8B',
        border: '#E5E1DA',
        // Semantic colors
        success: '#1E9E6A',
        warning: '#E8A23D',
        error: '#D14343',
        info: '#3B7DD8',
        // Dashboard sidebar dark
        sidebar: {
          bg: '#0E2522',
          text: '#F4F1EA',
        },
      },
      fontFamily: {
        display: ['Cabinet Grotesk', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        'data-mono': ['JetBrains Mono', 'monospace'],
        'body-sm': ['Inter', 'sans-serif'],
        'body-lg': ['Inter', 'sans-serif'],
        'headline-md': ['Sora', 'sans-serif'],
        'display-lg-mobile': ['Sora', 'sans-serif'],
        'label-caps': ['Inter', 'sans-serif'],
        'display-lg': ['Sora', 'sans-serif'],
      },
      fontSize: {
        'display': ['56px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['36px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['40px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2-sm': ['28px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['28px', { lineHeight: '1.3', fontWeight: '600' }],
        'h3-sm': ['22px', { lineHeight: '1.3', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'h4-sm': ['18px', { lineHeight: '1.4', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'micro': ['12px', { lineHeight: '1.4', fontWeight: '500' }],
        'data-mono': ['13px', { lineHeight: '18px', letterSpacing: '0.02em', fontWeight: '500' }],
        'body-sm': ['14px', { lineHeight: '20px', fontWeight: '400' }],
        'body-lg': ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'headline-md': ['24px', { lineHeight: '32px', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-lg-mobile': ['32px', { lineHeight: '40px', letterSpacing: '-0.02em', fontWeight: '700' }],
        'label-caps': ['12px', { lineHeight: '16px', letterSpacing: '0.05em', fontWeight: '600' }],
        'display-lg': ['48px', { lineHeight: '56px', letterSpacing: '-0.02em', fontWeight: '700' }],
      },
      spacing: {
        '0.5': '4px',
        '1': '8px',
        '1.5': '12px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '6': '48px',
        '8': '64px',
        '12': '96px',
        '16': '128px',
        'sidebar-width': '260px',
        'container-padding': '24px',
        'card-gap': '20px',
        'gutter': '16px',
        'base': '8px',
      },
      borderRadius: {
        'sm': '4px',
        DEFAULT: '12px',
        'lg': '20px',
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(27,31,29,0.06)',
        'md': '0 8px 24px rgba(27,31,29,0.08)',
        'lg': '0 24px 48px rgba(27,31,29,0.12)',
        'card': '0 1px 2px rgba(27,31,29,0.06)',
        'card-hover': '0 8px 24px rgba(27,31,29,0.08)',
      },
      maxWidth: {
        'marketing': '1280px',
        'dashboard': '1440px',
        'auth-card': '440px',
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'count-up': 'countUp 0.8s ease-out forwards',
        'fade-up': 'fadeUp 0.5s ease-out forwards',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backgroundImage: {
        'gradient-warm': 'linear-gradient(135deg, #0B4F45 0%, #073A33 50%, #0B4F45 100%)',
        'gradient-accent': 'linear-gradient(135deg, #C75B30 0%, #E79868 100%)',
        'shimmer-gradient': 'linear-gradient(90deg, #f0ece4 25%, #e8e3da 50%, #f0ece4 75%)',
      },
    },
  },
  plugins: [],
}
