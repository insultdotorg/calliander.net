import {
  awsUrl,
  fetchPaginatedStories,
  getDeliveryClient,
  isProd,
  logHeading,
  logInfo,
  logOutcome,
  logWarning,
  siteUrl,
  sbUrl,
  urlDate,
} from '../lib/common.js'
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { glob } from 'glob'

logHeading('Retrieving stories from Storyblok')

const CACHE_PATH = 'src/lib/cms/stories'
const MOD_FILE = `${CACHE_PATH}/lastMod.txt`

if (process.argv[2] === 'clear') {
  logWarning('Cache clearing requested, removing')
  rmSync(CACHE_PATH, { recursive: true, force: true })
}

mkdirSync(CACHE_PATH, { recursive: true })

const cachedFiles = await glob(`${CACHE_PATH}/**/*.json`)
const cachedStories = cachedFiles.map((file) => {
  const story = JSON.parse(readFileSync(file, 'utf-8'))

  return {
    filePath: file,
    uuid: story.uuid,
  }
})

const modDate = new Date(
  existsSync(MOD_FILE)
    ? readFileSync(MOD_FILE, 'utf-8')
    : '2024-08-01T00:00:00.000Z'
)
let lastMod = new Date(modDate.getTime() + 1800000).toISOString()

const client = getDeliveryClient(!isProd)

const storyblokStories = await fetchPaginatedStories(client, {
  per_page: 100,
  published_at_gt: lastMod,
  sort_by: ['published_at:desc', 'created_at:desc'],
  version: isProd ? 'published' : 'draft',
})

if (storyblokStories.length > 0) {
  const latestStory = storyblokStories[0]
  writeFileSync(MOD_FILE, latestStory.published_at || latestStory.created_at)

  storyblokStories.forEach((story) => {
    const cachedStory = cachedStories.find(
      (cachedStory) => cachedStory.uuid === story.uuid
    )

    const slug = story.slug.replace(/^\/|\/$/, '')
    const date = urlDate(story)
    const parentPath = `${CACHE_PATH}/${date}`
    const filePath = `${parentPath}/${slug}.json`

    if (cachedStory && cachedStory.filePath !== filePath) {
      rmSync(cachedStory.filePath)
    }

    story.full_slug = `posts/${date}/${slug}`

    let storyToWrite = JSON.stringify(story, null, 2)
    storyToWrite = storyToWrite.replaceAll(sbUrl, siteUrl)
    storyToWrite = storyToWrite.replaceAll(awsUrl, siteUrl)

    mkdirSync(parentPath, { recursive: true })
    writeFileSync(filePath, storyToWrite)
  })

  logInfo(`${storyblokStories.length} stories cached`)
}

logOutcome('Finished writing cache for stories')
