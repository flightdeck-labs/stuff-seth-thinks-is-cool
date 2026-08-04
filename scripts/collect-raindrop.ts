import { normalizeUrl } from './normalize-url.ts';

interface Args { since?: string; page: number; perPage: number; collectionId: string; }

function parseArgs(argv: string[]): Args {
  const args: Args = { page: 0, perPage: 50, collectionId: '0' };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--since') args.since = argv[++i];
    else if (arg === '--page') args.page = Number(argv[++i]);
    else if (arg === '--per-page') args.perPage = Number(argv[++i]);
    else if (arg === '--collection-id') args.collectionId = argv[++i];
    else throw new Error(`Unknown argument: ${arg}`);
  }
  return args;
}

const token = process.env.RAINDROP_TOKEN;
if (!token) throw new Error('RAINDROP_TOKEN is required. Set it in the Hermes environment; do not commit it to the repo.');

const args = parseArgs(process.argv.slice(2).filter((arg) => arg !== '--'));
const params = new URLSearchParams({ page: String(args.page), perpage: String(args.perPage), sort: '-created' });
if (args.since) params.set('search', `created:>${args.since}`);
const endpoint = `https://api.raindrop.io/rest/v1/raindrops/${encodeURIComponent(args.collectionId)}?${params}`;
const response = await fetch(endpoint, { headers: { Authorization: `Bearer ${token}` } });
if (!response.ok) throw new Error(`Raindrop API request failed: ${response.status} ${response.statusText}`);
const payload = await response.json();
const items = (payload.items ?? []).map((item: any) => ({
  raindrop_id: item._id,
  title: item.title,
  url: item.link,
  normalized_url: item.link ? normalizeUrl(item.link) : undefined,
  domain: item.domain || (item.link ? new URL(item.link).hostname.toLowerCase() : undefined),
  excerpt: item.excerpt,
  tags: item.tags ?? [],
  created_at: item.created,
  last_update: item.lastUpdate
}));
console.log(JSON.stringify({ count: items.length, items }, null, 2));
