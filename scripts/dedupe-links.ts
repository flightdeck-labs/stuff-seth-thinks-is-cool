import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { normalizeUrl } from './normalize-url.ts';

export interface ExistingLinkEntry {
  file: string;
  raindrop_id?: string;
  normalized_url?: string;
}

function frontmatterValue(markdown: string, key: string): string | undefined {
  const match = markdown.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  if (!match) return undefined;
  const raw = match[1].trim();
  if (raw === 'null') return undefined;
  try { return String(JSON.parse(raw)); } catch { return raw.replace(/^['"]|['"]$/g, ''); }
}

export async function readExistingLinks(dir = 'src/content/links'): Promise<ExistingLinkEntry[]> {
  const files = (await readdir(dir)).filter((file) => file.endsWith('.md'));
  return Promise.all(files.map(async (file) => {
    const markdown = await readFile(path.join(dir, file), 'utf8');
    const url = frontmatterValue(markdown, 'url');
    const raindrop = frontmatterValue(markdown, 'raindrop_id');
    return { file, raindrop_id: raindrop, normalized_url: url ? normalizeUrl(url) : undefined };
  }));
}

export function findDuplicateLink(candidate: { url: string; raindrop_id?: string | number }, existing: ExistingLinkEntry[]): ExistingLinkEntry | undefined {
  const candidateRaindrop = candidate.raindrop_id === undefined ? undefined : String(candidate.raindrop_id);
  const candidateUrl = normalizeUrl(candidate.url);
  return existing.find((entry) =>
    (candidateRaindrop && entry.raindrop_id === candidateRaindrop) ||
    (entry.normalized_url && entry.normalized_url === candidateUrl)
  );
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2).filter((arg) => arg !== '--');
  const json = args[0];
  if (!json) {
    console.error('Usage: tsx scripts/dedupe-links.ts \'{"url":"...","raindrop_id":"..."}\' [dir]');
    process.exit(1);
  }
  const duplicate = findDuplicateLink(JSON.parse(json), await readExistingLinks(args[1]));
  if (duplicate) {
    console.log(JSON.stringify(duplicate, null, 2));
    process.exit(2);
  }
  console.log('no duplicate');
}
