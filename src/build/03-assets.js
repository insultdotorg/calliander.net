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

    response.data.assets.forEach((asset) => downloadAsset(asset))

    logInfo(`Collecting assets, page ${currentPage} of ${totalPages}`)
  }
}

logOutcome(`Finishing downloading collected assets (may take some time)`)

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
    const incomingDate = new Date(asset.updated_at || asset.created_at)
    const isNewer = incomingDate > fileStats.mtime
    const isSameSize = asset.content_length === fileStats.size

    if (isNewer && isSameSize && !CLEAR) {
      return false
    }
  }

  mkdirSync(destinationPath, { recursive: true })

  const stream = createWriteStream(destinationFile)

  const { body } = await fetch(asset.filename).catch((error) => {
    logError(`Encountered an error downloading ${asset.filename}`, error)
    process.exit(1)
  })

  Readable.fromWeb(body).pipe(stream)

  return true
}
