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

const STORIES_PATH = 'src/lib/cms/stories'
const MOD_FILE = `${STORIES_PATH}/lastMod.txt`
const TAGS_FILE = 'src/lib/cms/tags.json'
const OUTPUT_ALGOLIA = 'src/lib/cms/algolia.json'
const OUTPUT_RSS = 'static/feed.xml'
const OUTPUT_SITEMAP = 'static/sitemap.xml'

logHeading('Building Algolia, RSS, and sitemap catalogs')

if (!existsSync(STORIES_PATH)) {
  logError('Stories cache is missing')
  process.exit(1)
}

if (!existsSync(TAGS_FILE)) {
  logError('Tags cache is missing')
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
const cachedFiles = await glob(`${STORIES_PATH}/**/*.json`)

cachedFiles.forEach((file) => {
  const story = JSON.parse(readFileSync(file, 'utf-8'))

  const storyDate = story.first_published_at || story.created_at
  const storyUrl = `${siteUrl}/${story.full_slug}`
  const storyDescription = story.content.description
  const renderedContent = resolver.render(story.content.content)

  algoliaEntries.push({
    objectID: story.uuid,
    title: story.name,
    description: storyDescription,
    path: storyUrl,
    content: striptags(renderedContent),
    date: storyDate,
  })

  rssEntries.item({
    title: story.name,
    description: storyDescription,
    url: storyUrl,
    guid: storyUrl,
    date: storyDate,
  })

  sitemapEntries.urlset.push({
    url: [
      { loc: storyUrl },
      { lastMod: storyDate },
      { changefreq: 'daily' },
      { priority: 0.5 },
    ],
  })
})

const tags = JSON.parse(readFileSync(TAGS_FILE, 'utf-8'))
Object.entries(tags).forEach((tag) => {
  sitemapEntries.urlset.push({
    url: [
      { loc: `${siteUrl}/category/${tag[0]}` },
      { lastMod: modDate.toISOString() },
      { changefreq: 'daily' },
      { priority: 0.2 },
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
