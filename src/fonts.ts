import {loadFont as loadBricolage} from '@remotion/google-fonts/BricolageGrotesque';
import {loadFont as loadJetBrainsMono} from '@remotion/google-fonts/JetBrainsMono';
import {loadFont as loadSchibsted} from '@remotion/google-fonts/SchibstedGrotesk';

const bricolage = loadBricolage('normal', {
  weights: ['600', '700', '800'],
  subsets: ['latin'],
});

const schibsted = loadSchibsted('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

const jetbrains = loadJetBrainsMono('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

export const FONTS = {
  display: bricolage.fontFamily,
  sans: schibsted.fontFamily,
  mono: jetbrains.fontFamily,
} as const;
