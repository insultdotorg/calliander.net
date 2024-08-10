import algoliasearch from 'algoliasearch'
import chalk from 'chalk'
import dotenv from 'dotenv'
import StoryblokClient from 'storyblok-js-client'

dotenv.config()

const STORYBLOK_SPACE_ID = process.env.STORYBLOK_SPACE_ID
const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN
const STORYBLOK_PREVIEW_TOKEN = process.env.STORYBLOK_PREVIEW_TOKEN
const STORYBLOK_PUBLIC_TOKEN = process.env.STORYBLOK_PUBLIC_TOKEN
const ALGOLIA_APPLICATION_ID = process.env.ALGOLIA_APPLICATION_ID
const ALGOLIA_SEARCH_API_KEY = process.env.ALGOLIA_SEARCH_API_KEY
const ALGOLIA_WRITE_API_KEY = process.env.ALGOLIA_WRITE_API_KEY

const PRIME_URL = process.env.DEPLOY_PRIME_URL

export const isProd = !!PRIME_URL
export const siteUrl = isProd
  ? 'https://calliander.net'
  : 'https://localhost:4173'
export const awsUrl = 'https://s3.amazonaws.com/a-us.storyblok.com'
export const sbUrl = 'https://a-us.storyblok.com'
export const assetsUrl = `spaces/${STORYBLOK_SPACE_ID}/assets`

export async function fetchPaginatedStories(client, options) {
  const stories = []
  const perPage = options.per_page
  let totalPages = 1

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    options.page = currentPage

    const response = await client.get('cdn/stories', options).catch((error) => {
      logError('Encountered an issue accessing the Storyblok API', error)
      process.exit(1)
    })

    if (response.data.stories.length > 0) {
      totalPages = Math.ceil(response.total / perPage)

      stories.push(...response.data.stories)

      isProd &&
        logInfo(
          `Collecting Storyblok stories, page ${currentPage} of ${totalPages}`
        )
    }
  }

  return stories
}

export async function fetchTags(client) {
  const tags = {}

  const response = await client
    .get('cdn/tags', {
      version: isProd ? 'published' : 'draft',
    })
    .catch((error) => {
      logError('Encountered an issue accessing the Storyblok API', error)
      process.exit(1)
    })

  if (response.data.tags.length > 0) {
    response.data.tags.forEach((tag) => {
      tags[slugify(tag.name)] = tag.name
    })
  }

  return tags
}

export function fixStoryblokSlugs(stories) {
  return stories.map((story) => {
    story.full_slug = `posts/${urlDate(story)}/${story.slug}`

    return story
  })
}

export function getAlgoliaIndex(write = false) {
  const client = algoliasearch(
    ALGOLIA_APPLICATION_ID,
    write ? ALGOLIA_WRITE_API_KEY : ALGOLIA_SEARCH_API_KEY
  )
  const index = client.initIndex(isProd ? 'main' : 'test')

  return index
}

export async function getCachedFiles() {
  const cachedFiles = getStoryFiles()

  const stories = []

  for (const path in cachedFiles) {
    const story = await cachedFiles[path]()

    stories.push(story.default)
  }

  return stories
}

export async function getSingleCachedFile(path) {
  const cachedFiles = getStoryFiles()

  const filePath = Object.keys(cachedFiles).find((file) => file.includes(path))

  const story = cachedFiles[filePath]

  if (story) {
    return await story()
  }

  return undefined
}

export function getDeliveryClient(preview = false) {
  return new StoryblokClient({
    accessToken: preview ? STORYBLOK_PREVIEW_TOKEN : STORYBLOK_PUBLIC_TOKEN,
    region: 'us',
  })
}

export function getManagementClient() {
  return new StoryblokClient({
    oauthToken: STORYBLOK_OAUTH_TOKEN,
    region: 'us',
  })
}

export function logError(message, details = undefined) {
  writeLog(chalk.red(`⭒ ${message}`), details)
}

export function logHeading(message, details = undefined) {
  writeLog(chalk.bold(`◆ ${message}`), details)
}

export function logInfo(message, details = undefined) {
  writeLog(chalk.grey(`▫︎ ${message}`), details)
}

export function logOutcome(message, details = undefined) {
  writeLog(chalk.green(`✔ ${message}`), details)
}

export function logWarning(message, details = undefined) {
  writeLog(chalk.yellow(`△ ${message}`), details)
}

export function slugify(string) {
  if (!string) {
    return ''
  }

  let slug = string.toLowerCase().trim()

  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim()
  slug = slug.replace(/[\s-]+/g, '-')

  return slug
}

export function sortCachedStories(stories) {
  return stories.sort((a, b) => {
    const aDate = new Date(a.sort_by_date)
    const bDate = new Date(b.sort_by_date)

    if (aDate > bDate) {
      return -1
    }

    if (bDate > aDate) {
      return 1
    }

    return 0
  })
}

export function urlDate(story) {
  const date = story.first_published_at || story.created_at

  return date.split('T').shift().split('-').join('/')
}

function getStoryFiles() {
  return import.meta.glob('$lib/cms/stories/**/*.json', {
    query: '?inline',
  })
}

function writeLog(message, details = undefined) {
  if (details) {
    console.log(`${message}\n`, details)
  } else {
    console.log(message)
  }
}
