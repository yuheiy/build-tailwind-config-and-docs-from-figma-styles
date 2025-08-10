import { twMerge as originalTwMerge } from 'tailwind-merge';
import { describe, expect, test } from 'vitest';
import { twMerge } from './tailwind-merge';

describe('twMerge', () => {
  test('merge shadow utilities', () => {
    expect(originalTwMerge('shadow-1 shadow-none')).toBe('shadow-1 shadow-none');
    expect(twMerge('shadow-1 shadow-none')).toBe('shadow-none');
  });

  test('merge animate utilities', () => {
    expect(originalTwMerge('animate-spin animate-swing')).toBe('animate-spin animate-swing');
    expect(twMerge('animate-spin animate-swing')).toBe('animate-swing');
  });
});
