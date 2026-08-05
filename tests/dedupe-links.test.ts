import { describe, expect, it } from 'vitest';
import { findDuplicateLink } from '../scripts/dedupe-links.ts';

describe('findDuplicateLink', () => {
  const existing = [
    { file: 'one.md', raindrop_id: '123', normalized_url: 'https://example.com/post?id=1' },
    { file: 'two.md', normalized_url: 'https://other.example/tool' }
  ];

  it('dedupes by raindrop id', () => {
    expect(findDuplicateLink({ url: 'https://new.example/', raindrop_id: 123 }, existing)?.file).toBe('one.md');
  });

  it('dedupes by normalized URL', () => {
    expect(findDuplicateLink({ url: 'https://EXAMPLE.com/post?utm_source=x&id=1#comments' }, existing)?.file).toBe('one.md');
  });

  it('returns undefined for new links', () => {
    expect(findDuplicateLink({ url: 'https://new.example/' }, existing)).toBeUndefined();
  });
});
