import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { validateLinkInput, type LinkInput, type ValidatedLinkInput } from './link-schema.ts';

function slugify(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 72) || 'link';
}

function yamlScalar(value: unknown): string {
  if (value === null) return 'null';
  if (typeof value === 'number') return String(value);
  return JSON.stringify(String(value));
}

export function filenameForLink(input: ValidatedLinkInput): string {
  const date = input.proposed_at.slice(0, 10);
  return `${date}-${slugify(input.domain)}-${slugify(input.title)}.md`;
}

export function renderLinkEntry(input: LinkInput): string {
  const link = validateLinkInput(input);
  const lines: string[] = ['---', `title: ${yamlScalar(link.title)}`, `url: ${yamlScalar(link.url)}`, `domain: ${yamlScalar(link.domain)}`];
  if (link.raindrop_id !== undefined) lines.push(`raindrop_id: ${yamlScalar(link.raindrop_id)}`);
  if (link.captured_at) lines.push(`captured_at: ${yamlScalar(link.captured_at)}`);
  lines.push(`proposed_at: ${yamlScalar(link.proposed_at)}`);
  if (link.published_at !== undefined) lines.push(`published_at: ${yamlScalar(link.published_at)}`);
  lines.push('tags:');
  for (const tag of link.tags) lines.push(`  - ${yamlScalar(tag)}`);
  lines.push(`summary: ${yamlScalar(link.summary)}`, `status: ${yamlScalar(link.status)}`, `source: ${yamlScalar(link.source)}`, '---', '', link.body || link.summary, '');
  return lines.join('\n');
}

export async function writeLinkEntry(input: LinkInput, outDir = 'src/content/links'): Promise<string> {
  const link = validateLinkInput(input);
  const target = path.join(outDir, filenameForLink(link));
  await mkdir(outDir, { recursive: true });
  await writeFile(target, renderLinkEntry(link), 'utf8');
  return target;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const json = args[0];
  if (!json) {
    console.error('Usage: tsx scripts/write-link-entry.ts \'{"title":"...","url":"...","summary":"..."}\' [outDir]');
    process.exit(1);
  }
  const target = await writeLinkEntry(JSON.parse(json), args[1]);
  console.log(target);
}
