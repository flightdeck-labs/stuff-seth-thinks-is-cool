import { describe, expect, it } from 'vitest';
import { normalizeUrl } from '../scripts/normalize-url.ts';

describe('normalizeUrl', () => {
  it('removes utm parameters', () => {
    expect(normalizeUrl('https://example.com/path?utm_source=newsletter&utm_medium=email&id=7')).toBe('https://example.com/path?id=7');
  });

  it('removes known click identifiers', () => {
    expect(normalizeUrl('https://example.com/?fbclid=abc&gclid=def&mc_cid=ghi&mc_eid=jkl&keep=yes')).toBe('https://example.com/?keep=yes');
  });

  it('lowercases hostname and removes hash fragments', () => {
    expect(normalizeUrl('https://EXAMPLE.com/Thing#section')).toBe('https://example.com/Thing');
  });

  it('preserves meaningful query parameters', () => {
    expect(normalizeUrl('https://example.com/search?q=astro&page=2')).toBe('https://example.com/search?q=astro&page=2');
  });
});
