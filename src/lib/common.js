import chalk from 'chalk'
import dotenv from 'dotenv'
import StoryblokClient from 'storyblok-js-client'

dotenv.config()

const APP_URL = process.env.APP_URL
const STORYBLOK_SPACE_ID = process.env.STORYBLOK_SPACE_ID
const STORYBLOK_OAUTH_TOKEN = process.env.STORYBLOK_OAUTH_TOKEN
const STORYBLOK_PREVIEW_TOKEN = process.env.STORYBLOK_PREVIEW_TOKEN
const STORYBLOK_PUBLIC_TOKEN = process.env.STORYBLOK_PUBLIC_TOKEN

const PRIME_URL = process.env.DEPLOY_PRIME_URL

export const isProd = !!PRIME_URL
export const siteUrl = isProd && !APP_URL
  ? PRIME_URL
  : APP_URL
export const awsUrl = 'https://s3.amazonaws.com/a-us.storyblok.com'
export const sbUrl = 'https://a-us.storyblok.com'
export const assetsUrl = `spaces/${STORYBLOK_SPACE_ID}/assets`

export async function fetchPaginatedPosts(client, options) {
  const posts = []
  const perPage = options.per_page
  let totalPages = 1
  options.starts_with = 'posts/'

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    options.page = currentPage

    const response = await client.get('cdn/stories', options).catch((error) => {
      logError('Encountered an issue accessing the Storyblok API', error)
      process.exit(1)
    })

    if (response.data.stories.length > 0) {
      totalPages = Math.ceil(response.total / perPage)

      posts.push(...response.data.stories)

      isProd &&
        logInfo(
          `Collecting posts from Storyblok (page ${currentPage} of ${totalPages})`
        )
    }
  }

  return posts
}

export async function getCachedFiles() {
  const cachedFiles = getPostFiles()

  const stories = []

  for (const path in cachedFiles) {
    const story = await cachedFiles[path]()

    stories.push(story.default)
  }

  return stories
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

export async function getSingleCachedFile(path) {
  const cachedFiles = getPostFiles()

  const filePath = Object.keys(cachedFiles).find((file, index) => file.includes(path))

  const story = cachedFiles[filePath]

  if (story) {
    return await story()
  }

  return undefined
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
    const aDate = new Date(a.first_published_at || a.created_at)
    const bDate = new Date(b.first_published_at || b.created_at)

    if (aDate > bDate) {
      return -1
    }

    if (bDate > aDate) {
      return 1
    }

    return 0
  })
}

export function urlDate(post) {
  const date = post.first_published_at || post.created_at

  return date.split('T').shift().split('-').join('/')
}

function getPostFiles() {
  return import.meta.glob('$lib/cms/posts/**/*.json', {
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
