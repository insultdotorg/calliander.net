import {
  assetsUrl,
  getManagementClient,
  logError,
  logHeading,
  logInfo,
  logOutcome,
  logWarning,
} from '../lib/common.js'
import { createWriteStream, existsSync, mkdirSync, statSync } from 'fs'
import { finished } from 'stream/promises'
import { Readable } from 'stream'

logHeading('Downloading assets from Storyblok')

const CLEAR = process.argv[2] === 'clear'
let CACHED_FILES = 0
let SKIPPED_FILES = 0

if (CLEAR) {
  logWarning('Cache clearing requested, will download all assets')
}

const client = getManagementClient()

let totalPages = 1
for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
  const response = await client
    .get(assetsUrl, {
      page: currentPage,
      per_page: 100,
    })
    .catch((error) => {
      logError('Encountered an issue accessing the Storyblok API', error)
      process.exit(1)
    })

  if (response.data.assets.length > 0) {
    totalPages = Math.ceil(response.total / 100)

    logInfo(`Collecting assets, page ${currentPage} of ${totalPages}`)

    response.data.assets.forEach(async (asset) => await downloadAsset(asset))
  }
}

logOutcome(`Finishing downloading collected (may take some time)`)

async function downloadAsset(asset) {
  const filename = asset.filename.replace(/^.*\//, '')
  const path = asset.filename
    .replace('https://', '')
    .replace('s3.amazonaws.com/', '')
    .replace('a-us.storyblok.com/', '')
  const destinationPath = `static/${path.replace(`/${filename}`, '')}`
  const destinationFile = `${destinationPath}/${filename}`

  if (existsSync(destinationFile)) {
    const fileStats = statSync(destinationFile)
    const isNewer =
      new Date(asset.updated_at || asset.created_at) < fileStats.mtime
    const isSameSize = asset.content_length === fileStats.size

    if (isNewer && isSameSize && !CLEAR) {
      SKIPPED_FILES++

      return
    }
  }

  const download = await fetch(asset.filename).catch((error) => {
    logError(`Encountered an error downloading ${asset.filename}`, error)
    process.exit(1)
  })

  mkdirSync(destinationPath, { recursive: true })

  const writer = createWriteStream(destinationFile)

  finished(Readable.fromWeb(download.body).pipe(writer))

  CACHED_FILES++
}
