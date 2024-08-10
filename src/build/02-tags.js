import {
  fetchTags,
  getDeliveryClient,
  isProd,
  logHeading,
  logOutcome,
} from '../lib/common.js'
import { writeFileSync } from 'fs'

logHeading('Retrieving tags from Storyblok')

const CACHE_FILE = 'src/lib/cms/tags.json'

const client = getDeliveryClient(!isProd)

const sluggedTags = await fetchTags(client)

writeFileSync(CACHE_FILE, JSON.stringify(sluggedTags, null, 2))

logOutcome(`${Object.keys(sluggedTags).length} tags written to cache`)
