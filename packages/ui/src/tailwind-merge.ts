import { extendTailwindMerge } from 'tailwind-merge';
import config from './tailwind-merge-config.json' with { type: 'json' };

export const twMerge = extendTailwindMerge(config);
