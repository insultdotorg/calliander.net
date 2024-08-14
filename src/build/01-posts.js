import {
  awsUrl,
  fetchPaginatedPosts,
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

logHeading('Caching posts')

const POSTS_PATH = 'src/lib/cms/posts'
const MOD_FILE = `${POSTS_PATH}/lastMod.txt`

if (process.argv[2] === 'clear') {
  logWarning('Cache clearing requested, removing')
  rmSync(POSTS_PATH, { recursive: true, force: true })
}

mkdirSync(POSTS_PATH, { recursive: true })

const cachedFiles = await glob(`${POSTS_PATH}/**/*.json`)
const cachedPosts = cachedFiles.map((file) => {
  const post = JSON.parse(readFileSync(file, 'utf-8'))

  return {
    filePath: file,
    uuid: post.uuid,
  }
})

const modDate = new Date(
  existsSync(MOD_FILE)
    ? readFileSync(MOD_FILE, 'utf-8')
    : '2024-08-01T00:00:00.000Z'
)
let lastMod = new Date(modDate.getTime() + 1800000).toISOString()

const client = getDeliveryClient(!isProd)

const storyblokPosts = await fetchPaginatedPosts(client, {
  per_page: 100,
  published_at_gt: lastMod,
  sort_by: ['published_at:desc', 'created_at:desc'],
  version: isProd ? 'published' : 'draft',
})

if (storyblokPosts.length > 0) {
  const latestPost = storyblokPosts[0]
  writeFileSync(MOD_FILE, latestPost.published_at || latestPost.created_at)

  storyblokPosts.forEach((post) => {
    const cachedPost = cachedPosts.find(
      (cachedPost) => cachedPost.uuid === post.uuid
    )

    const slug = post.slug.replace(/^\/|\/$/, '')
    const date = urlDate(post)
    const parentPath = `${POSTS_PATH}/${date}`
    const filePath = `${parentPath}/${slug}.json`

    if (cachedPost && cachedPost.filePath !== filePath) {
      rmSync(cachedPost.filePath)
    }

    post.full_slug = `posts/${date}/${slug}`

    mkdirSync(parentPath, { recursive: true })
    writeFileSync(filePath, postToWrite(post))
  })

  logInfo(`${storyblokPosts.length} posts processed`)
}

logOutcome('Finished writing cache for posts')

function postToWrite(post) {
  let contents = JSON.stringify(post, null, 2)

  contents = contents.replaceAll(sbUrl, siteUrl)
  contents = contents.replaceAll(awsUrl, siteUrl)

  return contents
}
