import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context: { site: URL }) {
  const links = (await getCollection('links')).sort((a, b) => new Date(b.data.proposed_at).getTime() - new Date(a.data.proposed_at).getTime());
  const site = new URL(import.meta.env.BASE_URL, context.site);
  return rss({
    title: 'Stuff Seth Thinks Is Cool',
    description: 'Selected software-development links Seth saves, curated with Goose.',
    site,
    items: links.map((link) => ({
      title: link.data.title,
      link: link.data.url,
      description: `${link.data.summary} (${link.data.domain})`,
      pubDate: new Date(link.data.published_at ?? link.data.proposed_at),
      categories: link.data.tags
    }))
  });
}
