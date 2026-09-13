import {
  VT323,
  Orbitron,
  Cedarville_Cursive,
  Playfair_Display,
  Roboto_Mono
} from 'next/font/google';

export const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
  display: 'swap',
});

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const cedarvilleCursive = Cedarville_Cursive({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-cedarville',
  display: 'swap',
});

export const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const robotoMono = Roboto_Mono({
  weight: '700',
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});
