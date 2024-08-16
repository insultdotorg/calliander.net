import {
  getAlgoliaIndex,
  logError,
  logHeading,
  logInfo,
  logOutcome,
  siteUrl,
} from '../lib/common.js'
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { glob } from 'glob'
import RichTextResolver from 'storyblok-js-client/richTextResolver'
import RSS from 'rss'
import striptags from 'striptags'
import xml from 'xml'

const POSTS_PATH = 'src/lib/cms/posts'
const MOD_FILE = `${POSTS_PATH}/lastMod.txt`
const OUTPUT_ALGOLIA = 'src/lib/cms/algolia.json'
const OUTPUT_RSS = 'static/feed.xml'
const OUTPUT_SITEMAP = 'static/sitemap.xml'

logHeading('Building Algolia, RSS, and sitemap catalogs')

if (!existsSync(POSTS_PATH)) {
  logError('Posts cache is missing')
  process.exit(1)
}

const modDate = new Date(readFileSync(MOD_FILE, 'utf-8'))

const algoliaEntries = []
const sitemapEntries = {
  urlset: [
    {
      _attr: {
        xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
      },
    },
    {
      url: [
        { loc: siteUrl },
        { lastMod: modDate.toISOString() },
        { changefreq: 'daily' },
        { priority: 0.1 },
      ],
    },
    {
      url: [
        { loc: `${siteUrl}/search` },
        { changefreq: 'never' },
        { priority: 0.0 },
      ],
    },
  ],
}
const rssEntries = new RSS({
  title: 'calliander.net',
  site_url: siteUrl,
  feed_url: `${siteUrl}/feed.xml`,
  description: 'calliander.net - 30  years of web dominance',
  generator: 'SvelteKit',
  language: 'en-us',
  pubDate: modDate,
})

const resolver = new RichTextResolver()
const cachedFiles = await glob(`${POSTS_PATH}/**/*.json`)

cachedFiles.forEach((file) => {
  const post = JSON.parse(readFileSync(file, 'utf-8'))

  const postDate = post.first_published_at || post.created_at
  const postUrl = `${siteUrl}/${post.full_slug}`
  const postDescription = post.content.description
  const renderedContent = resolver.render(post.content.content)

  algoliaEntries.push({
    objectID: post.uuid,
    title: post.name,
    description: postDescription,
    path: postUrl,
    content: striptags(renderedContent),
    date: postDate,
  })

  rssEntries.item({
    title: post.name,
    description: postDescription,
    url: postUrl,
    guid: postUrl,
    date: postDate,
  })

  sitemapEntries.urlset.push({
    url: [
      { loc: postUrl },
      { lastMod: postDate },
      { changefreq: 'daily' },
      { priority: 0.5 },
    ],
  })
})

const algolia = getAlgoliaIndex(true)
await algolia
  .saveObjects(algoliaEntries)
  .then(() => {
    logInfo(
      `${algoliaEntries.length} entries uploaded to Algolia index ${algolia.indexName}`
    )
  })
  .catch((error) => {
    logError('Unable to upload records to Algolia', error)
  })
writeFileSync(OUTPUT_ALGOLIA, JSON.stringify(algoliaEntries, null, 2))

writeFileSync(OUTPUT_RSS, rssEntries.xml({ indent: true }))
logInfo(`${cachedFiles.length} RSS entries written`)

const sitemapXml = xml(sitemapEntries, { declaration: true, indent: '    ' })
writeFileSync(OUTPUT_SITEMAP, sitemapXml)
logInfo(`${sitemapEntries.urlset.length} sitemap entries written`)

logOutcome('Finished writing catalogs')
