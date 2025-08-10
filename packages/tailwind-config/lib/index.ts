/**
 * Tailwind CSS Configuration Generator from styles in Figma
 *
 * This module transforms Figma design tokens (exported as JSON) into Tailwind CSS configuration.
 * It processes colors, typography, shadows, and animations to generate:
 * - CSS custom properties for theming
 * - Component styles for typography
 * - Tailwind merge configurations
 * - Documentation data for design system
 */

import type { DropShadowEffect, InnerShadowEffect } from '@figma/rest-api-spec';
import { kebabCase } from 'es-toolkit';
import effectStyles from '../styles.effect.json' with { type: 'json' };
import fillStyles from '../styles.fill.json' with { type: 'json' };
import textStyles from '../styles.text.json' with { type: 'json' };
import { comparePaths } from './comparers.ts';

const rootFontSize = 16;

/** Transforms Figma color data into hex notation */
function rgbToHex({ r, g, b, a }: { r: number; g: number; b: number; a: number }) {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)];
  if (a !== 1) {
    hex.push(toHex(a));
  }
  return `#${hex.join('')}`;
}

/** Transforms Figma effect data into CSS string */
function formatEffect(effect: DropShadowEffect | InnerShadowEffect) {
  const {
    radius,
    offset: { x, y },
    spread,
    color,
  } = effect;
  const numbers = [`${x}px`, `${y}px`, `${radius}px`, `${spread}px`, rgbToHex(color)];
  return `${effect.type === 'INNER_SHADOW' ? 'inset ' : ''}${numbers.join(' ')}`;
}

/** Extracts all possible nested keys from a type T where T[K] is a record. */
type NestedKeys<T> = {
  [K in keyof T]: T[K] extends Record<string, unknown> ? keyof T[K] : never;
}[keyof T];

/** Transforms theme-grouped config to config-grouped structure. */
type Config<T> = {
  [K in NestedKeys<T>]: {
    [P in keyof T as K extends keyof T[P] ? P : never]: T[P][K];
  };
};

/** Configuration object for a single theme category. */
type ConfigPerTheme = Partial<{
  themeCss: string;
  componentsCss: string;
  twMergeKeys: string[];
  docsMeta: object;
}>;

/** Transforms theme-centric configuration to config-centric structure. */
function buildConfig<T extends Record<string, ConfigPerTheme>>(input: T): Config<T> {
  const result = {} as any;

  for (const [themeKey, config] of Object.entries(input)) {
    for (const [configKey, value] of Object.entries(config)) {
      if (!(configKey in result)) {
        result[configKey] = {};
      }
      result[configKey][themeKey] = value;
    }
  }

  return result;
}

export const { themeCss, componentsCss, twMergeKeys, docsMeta } = buildConfig({
  color: (() => {
    const themeDecls = [];
    const docsItems = [];

    const styles = fillStyles
      .filter(({ name }) => name.startsWith('Primitive/'))
      .toSorted((a, b) => comparePaths(a.name, b.name));

    for (const { name, fills } of styles) {
      const themeKey = `--color-${kebabCase(name)}`;
      const fill = fills[0];
      const value = rgbToHex({
        ...fill.color,
        a: 'opacity' in fill ? fill.opacity : fill.color.a,
      });

      themeDecls.push(`${themeKey}: ${value};`);

      docsItems.push({
        figmaName: name,
        variableName: `${themeKey}: ${value};`,
        hex: value,
      });
    }

    return {
      themeCss: themeDecls.join('\n'),
      docsMeta: {
        items: docsItems,
      },
    };
  })(),

  borderColor: (() => {
    const themeDecls = [];
    const docsItems = [];

    const styles = fillStyles.filter(({ name }) => name.startsWith('Semantic/Border/'));

    for (const { name, fills } of styles) {
      const unprefixedName = name.replace(/^Semantic\/Border/, '');
      const themeKey = `--border-color-${kebabCase(unprefixedName)}`;
      const fill = fills[0];
      const value = rgbToHex({
        ...fill.color,
        a: 'opacity' in fill ? fill.opacity : fill.color.a,
      });

      themeDecls.push(`${themeKey}: ${value};`);

      docsItems.push({
        figmaName: name,
        className: `border-${kebabCase(unprefixedName)}`,
        stylePreview: `border-color: var(${themeKey});`,
        hex: value,
      });
    }

    return {
      themeCss: themeDecls.join('\n'),
      docsMeta: {
        items: docsItems,
      },
    };
  })(),

  divideColor: (() => {
    const themeDecls = [];
    const docsItems = [];

    const styles = fillStyles.filter(({ name }) => name.startsWith('Semantic/Border/'));

    for (const { name, fills } of styles) {
      const unprefixedName = name.replace(/^Semantic\/Border/, '');
      const themeKey = `--divide-color-${kebabCase(unprefixedName)}`;
      const fill = fills[0];
      const value = rgbToHex({
        ...fill.color,
        a: 'opacity' in fill ? fill.opacity : fill.color.a,
      });

      themeDecls.push(`${themeKey}: ${value};`);

      docsItems.push({
        figmaName: name,
        className: `divide-${kebabCase(unprefixedName)}`,
        stylePreview: `& > :not(:last-child) {
  border-color: var(${themeKey});
}`,
        hex: value,
      });
    }

    return {
      themeCss: themeDecls.join('\n'),
      docsMeta: {
        items: docsItems,
      },
    };
  })(),

  backgroundColor: (() => {
    const themeDecls = [];
    const docsItems = [];

    const styles = fillStyles.filter(({ name }) => name.startsWith('Semantic/Bg/'));

    for (const { name, fills } of styles) {
      let unprefixedName = name.replace(/^Semantic\/Bg\//, '');
      // Simplify action button naming
      if (unprefixedName.startsWith('Action/') && unprefixedName.endsWith('/Default')) {
        unprefixedName = unprefixedName.replace(/\/Default$/, '');
      }
      const themeKey = `--background-color-${kebabCase(unprefixedName)}`;
      const fill = fills[0];
      const value = rgbToHex({
        ...fill.color,
        a: 'opacity' in fill ? fill.opacity : fill.color.a,
      });

      themeDecls.push(`${themeKey}: ${value};`);

      docsItems.push({
        figmaName: name,
        className: `bg-${kebabCase(unprefixedName)}`,
        stylePreview: `background-color: var(${themeKey});`,
        hex: value,
      });
    }

    return {
      themeCss: themeDecls.join('\n'),
      docsMeta: {
        items: docsItems,
      },
    };
  })(),

  textColor: (() => {
    const themeDecls = [];
    const docsItems = [];

    const styles = fillStyles.filter(({ name }) => name.startsWith('Semantic/Text/'));

    for (const { name, fills } of styles) {
      const unprefixedName = name.replace(/^Semantic\/Text\//, '');
      const themeKey = `--text-color-${kebabCase(unprefixedName)}`;
      const fill = fills[0];
      const value = rgbToHex({
        ...fill.color,
        a: 'opacity' in fill ? fill.opacity : fill.color.a,
      });

      themeDecls.push(`${themeKey}: ${value};`);

      docsItems.push({
        figmaName: name,
        className: `text-${kebabCase(unprefixedName)}`,
        stylePreview: `color: var(${themeKey});`,
        hex: value,
      });
    }

    return {
      themeCss: themeDecls.join('\n'),
      docsMeta: {
        items: docsItems,
      },
    };
  })(),

  text: (() => {
    const themeDecls = [];
    const docsItems = [];

    // Format: [fontSize, lineHeight] in pixels
    const styles = Object.entries({
      '3xs': [10, 16],
      '2xs': [11, 18],
      xs: [12, 20],
      sm: [14, 24],
      base: [16, 28],
      lg: [18, 28],
      xl: [20, 32],
      '2xl': [24, 40],
      '3xl': [32, 48],
      '4xl': [40, 56],
      '5xl': [56, 80],
      '6xl': [72, 96],
    } as const);

    for (const [name, [fontSize, lineHeight]] of styles) {
      const themeKey = `--text-${name}`;
      const themeKeyLineHeight = `--text-${name}--line-height`;
      const fontSizeAsRem = fontSize / rootFontSize;
      const lineHeightAsRem = lineHeight / rootFontSize;

      themeDecls.push(
        `${themeKey}: ${fontSizeAsRem}rem;`,
        `${themeKeyLineHeight}: calc(${lineHeightAsRem} / ${fontSizeAsRem});`,
      );

      docsItems.push({
        className: `text-${name}`,
        stylePreview: `font-size: var(${themeKey}); /* ${fontSize}px */
line-height: var(${themeKeyLineHeight}); /* ${lineHeight}px */`,
      });
    }

    return {
      themeCss: themeDecls.join('\n'),
      docsMeta: {
        items: docsItems,
      },
    };
  })(),

  shadow: (() => {
    const themeDecls = [];
    const twMergeKeys = [];
    const docsItems = [];

    const styles = effectStyles.toSorted((a, b) => comparePaths(a.name, b.name));

    for (const { name, effects } of styles) {
      const unprefixedName = name.startsWith('Elevation/')
        ? name.replace(/^Elevation\//, '')
        : name.replace(/^Elevation /, '');
      const themeKey = `--shadow-${kebabCase(unprefixedName)}`;
      const value = effects
        .map((effect) => formatEffect(effect as DropShadowEffect | InnerShadowEffect))
        .join(', ');
      const [type, level] = name.split('/') as [string, string];

      const getColor = (styleName: string) => {
        const colorStyle = fillStyles.find(({ name }) => name === styleName);
        return colorStyle && rgbToHex(colorStyle.fills[0].color);
      };
      const backgroundColor =
        getColor(`Primitive/${type.replace(/^Elevation /, '')}/700`) ?? getColor('Primitive/White');

      themeDecls.push(`${themeKey}: ${value};`);

      twMergeKeys.push(kebabCase(unprefixedName));

      docsItems.push({
        figmaName: name,
        className: `shadow-${kebabCase(unprefixedName)}`,
        stylePreview: `box-shadow: var(${themeKey}); /* ${value} */`,
        type,
        level,
        style: {
          backgroundColor,
          boxShadow: value,
        },
      });
    }

    return {
      themeCss: themeDecls.join('\n'),
      twMergeKeys,
      docsMeta: {
        items: docsItems,
      },
    };
  })(),

  animate: (() => {
    const themeDecls = [];
    const twMergeKeys = [];

    const styles = Object.entries({
      swing: 'swing 0.8s ease',
      'fade-in-150': 'fade-in 0.15s ease-out',
      'fade-out-150': 'fade-out 0.15s ease-in',
      'fade-in-300': 'fade-in 0.3s ease-out',
      'fade-out-300': 'fade-out 0.3s ease-in',
      'zoom-in-150': 'zoom-in 0.15s ease-out',
      'zoom-in-300': 'zoom-in 0.3s ease-out',
      'slide-in-right-150': 'slide-in-right 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      'slide-in-right-300': 'slide-in-right 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      'slide-in-bottom-150': 'slide-in-bottom 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      'slide-in-bottom-300': 'slide-in-bottom 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94) both',
      'inflate-150': 'inflate 0.15s ease-out',
      'inflate-300': 'inflate 0.3s ease-out',
      'accordion-slide-down': 'accordion-slide-down 0.15s ease-out',
      'accordion-slide-up': 'accordion-slide-up 0.15s ease-out',
    });

    for (const [name, value] of styles) {
      themeDecls.push(`--animate-${name}: ${value};`);

      twMergeKeys.push(name);
    }

    return {
      themeCss: themeDecls.join('\n'),
      twMergeKeys,
    };
  })(),

  typography: (() => {
    const componentsDecls = [];
    const docsItems = [];

    for (const { name, fontWeight, fontSize, lineHeightPx, letterSpacing } of textStyles) {
      // Skip non-regular body styles and link styles for component generation
      if ((name.startsWith('Body/') && !name.endsWith(' Regular')) || name.startsWith('Link/')) {
        docsItems.push({
          figmaName: name,
        });
        continue;
      }

      const className = `typography-${kebabCase(name.replace(/ Regular$/, ''))}`;
      const fontSizeAsRem = fontSize / rootFontSize;
      const lineHeightAsRem = lineHeightPx / rootFontSize;

      componentsDecls.push(
        `.${className} {
  font-weight: ${fontWeight};
  font-size: ${fontSizeAsRem}rem;
  line-height: calc(${lineHeightAsRem} / ${fontSizeAsRem});
  font-family: var(--font-sans);
  letter-spacing: ${letterSpacing === 0 ? '0' : `${letterSpacing / fontSize}em`};
}`,
      );

      docsItems.push({
        figmaName: name,
        className,
        stylePreview: `font-weight: ${fontWeight};
font-size: ${fontSizeAsRem}rem; /* ${fontSize}px */
line-height: calc(${lineHeightAsRem} / ${fontSizeAsRem}); /* ${lineHeightPx}px */
font-family: var(--font-sans);
letter-spacing: ${letterSpacing === 0 ? '0' : `${letterSpacing / fontSize}em`}; /* ${letterSpacing}px */`,
      });
    }

    return {
      componentsCss: componentsDecls.join('\n\n'),
      docsMeta: {
        items: docsItems,
      },
    };
  })(),
});
