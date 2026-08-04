import { describe, expect, it } from 'vitest';
import { filenameForLink, renderLinkEntry } from '../scripts/write-link-entry.ts';
import { validateLinkInput } from '../scripts/link-schema.ts';

describe('write link entry helpers', () => {
  const input = {
    title: 'A "Cool" Tool: Now With Markdown',
    url: 'https://Example.com/path?keep=yes',
    proposed_at: '2026-08-03T20:15:22Z',
    tags: ['software-development', 'tools'],
    summary: 'Line one\nline two',
    source: 'manual' as const
  };

  it('creates safe date/domain/title filenames', () => {
    const valid = validateLinkInput(input);
    expect(filenameForLink(valid)).toBe('2026-08-03-example-com-a-cool-tool-now-with-markdown.md');
  });

  it('writes frontmatter matching the Astro schema', () => {
    const markdown = renderLinkEntry(input);
    expect(markdown).toContain('title: "A \\"Cool\\" Tool: Now With Markdown"');
    expect(markdown).toContain('url: "https://example.com/path?keep=yes"');
    expect(markdown).toContain('domain: "example.com"');
    expect(markdown).toContain('proposed_at: "2026-08-03T20:15:22Z"');
    expect(markdown).toContain('status: "proposed"');
    expect(markdown).toContain('source: "manual"');
  });

  it('escapes quotes and multiline text safely', () => {
    const markdown = renderLinkEntry(input);
    expect(markdown).toContain('summary: "Line one\\nline two"');
  });

  it('refuses entries with missing title, URL, or summary', () => {
    expect(() => renderLinkEntry({ ...input, title: '' })).toThrow(/title/i);
    expect(() => renderLinkEntry({ ...input, url: '' })).toThrow(/URL/i);
    expect(() => renderLinkEntry({ ...input, summary: '' })).toThrow(/summary/i);
  });
});
