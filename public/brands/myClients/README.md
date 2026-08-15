# STELIOS Brand Assets

This directory contains the official STELIOS brand logos and assets with advanced interactive features.

## Logo Files

### Primary Logos
- `logo.svg` - Full STELIOS logo with elegant cursive S and professional typography (280x80px)
- `logo-simple.svg` - Interactive STELIOS logo with hover effects and animations (280x70px)
- `stelios-favicon.svg` - Standalone cursive S favicon with animations (60x60px)

### Interactive Features
✨ **Built-in Animations**
- Color gradient transitions
- Subtle scaling and rotation effects
- Opacity pulsing for visual appeal
- Decorative flourish animations

✨ **Hover Effects** (Apple-style)
- S icon glow and scale on hover
- Text spacing animation
- Color transitions
- Smooth CSS transforms

### Usage Examples

```jsx
// In React/Next.js components
import Image from 'next/image';

// Full logo with animations
<Image 
  src="/brands/myClients/logo.svg" 
  alt="STELIOS Logo" 
  width={280} 
  height={80} 
/>

// Interactive simple logo
<Image 
  src="/brands/myClients/logo-simple.svg" 
  alt="STELIOS Logo" 
  width={280} 
  height={70} 
/>

// Favicon/icon only
<Image 
  src="/brands/myClients/stelios-favicon.svg" 
  alt="STELIOS Icon" 
  width={60} 
  height={60} 
/>
```

### Advanced SVG Features
- ✅ **Interactive hover effects** - Similar to Apple logo animations
- ✅ **Built-in CSS animations** - No external CSS required
- ✅ **Scalable vector graphics** - Perfect at any size
- ✅ **Professional cursive S favicon** - Refined brand icon
- ✅ **Color transitions** - Smooth gradient animations
- ✅ **Elegant typography** - Clean STELIOS wordmark
- ✅ **Web-optimized** - Fast loading, modern web standards

### Customization
To customize animations or colors:
1. Open the SVG file in any text editor
2. Modify animation `dur` attributes for timing
3. Adjust color values in gradient definitions
4. Change hover effects in the `<style>` section

### Brand Colors
- **Primary Blue**: `#1a5772` → `#2563eb` (animated)
- **Secondary Blue**: `#2B5A7A` → `#3b82f6` (animated)
- **Text Dark**: `#1F2937`
- **Text Gradient**: `#374151`

### Animation Specifications
- **S Icon Scale**: 2s infinite subtle pulse
- **Color Transition**: 3-4s infinite gradient shift
- **Hover Scale**: 1.1x with glow effect
- **Rotation**: 5° on hover with smooth transition
- **Text Spacing**: Expands on hover for emphasis
