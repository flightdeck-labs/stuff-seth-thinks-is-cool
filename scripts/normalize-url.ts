const TRACKING_PARAMS = new Set(['fbclid', 'gclid', 'mc_cid', 'mc_eid']);

export function normalizeUrl(input: string): string {
  const url = new URL(input);
  url.hash = '';
  url.hostname = url.hostname.toLowerCase();
  const params = [...url.searchParams.entries()];
  url.search = '';
  for (const [key, value] of params) {
    const lowerKey = key.toLowerCase();
    if (lowerKey.startsWith('utm_') || TRACKING_PARAMS.has(lowerKey)) continue;
    url.searchParams.append(key, value);
  }
  return url.toString();
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const input = process.argv[2];
  if (!input) {
    console.error('Usage: tsx scripts/normalize-url.ts <url>');
    process.exit(1);
  }
  console.log(normalizeUrl(input));
}
