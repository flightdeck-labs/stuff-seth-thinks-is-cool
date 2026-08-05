export type LinkStatus = 'proposed' | 'published';
export type LinkSource = 'raindrop' | 'manual';

export interface LinkInput {
  title: string;
  url: string;
  domain?: string;
  raindrop_id?: string | number;
  captured_at?: string;
  proposed_at?: string;
  published_at?: string | null;
  tags?: string[];
  summary: string;
  status?: LinkStatus;
  source?: LinkSource;
  body?: string;
}

export interface ValidatedLinkInput extends Required<Pick<LinkInput, 'title' | 'url' | 'domain' | 'proposed_at' | 'tags' | 'summary' | 'status' | 'source'>> {
  raindrop_id?: string | number;
  captured_at?: string;
  published_at?: string | null;
  body?: string;
}

export function validateLinkInput(input: LinkInput): ValidatedLinkInput {
  if (!input.title?.trim()) throw new Error('Link entry requires a title.');
  if (!input.url?.trim()) throw new Error('Link entry requires a URL.');
  if (!input.summary?.trim()) throw new Error('Link entry requires a summary.');
  const parsed = new URL(input.url);
  const domain = input.domain?.trim() || parsed.hostname.toLowerCase();
  const status = input.status ?? 'proposed';
  if (status !== 'proposed' && status !== 'published') throw new Error(`Invalid status: ${status}`);
  const source = input.source ?? 'raindrop';
  if (source !== 'raindrop' && source !== 'manual') throw new Error(`Invalid source: ${source}`);
  return {
    title: input.title.trim(),
    url: parsed.toString(),
    domain,
    raindrop_id: input.raindrop_id,
    captured_at: input.captured_at,
    proposed_at: input.proposed_at ?? new Date().toISOString(),
    published_at: input.published_at,
    tags: [...new Set(input.tags ?? [])].map((tag) => tag.trim()).filter(Boolean).sort(),
    summary: input.summary.trim(),
    status,
    source,
    body: input.body?.trim()
  };
}
