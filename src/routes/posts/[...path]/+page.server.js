import { dev } from '$app/environment'
import { error } from '@sveltejs/kit'
import { getDeliveryClient, getSingleCachedFile, urlDate } from '$lib/common'

export const load = async ({ params }) => {
  if (dev) {
    const path = params.path.split('/')
    const slug = path.pop()

    const client = getDeliveryClient(true)

    const response = await client
      .get(`cdn/stories/${slug}`, {
        version: dev ? 'draft' : 'published',
      })
      .catch(() => {
        error(404, `The requested post doesn't exist`)
      })

    const pathDate = path.join('/')
    const storyDate = urlDate(response.data.story)

    if (pathDate !== storyDate) {
      error(404, `The requested post doesn't exist`)
    }

    return {
      story: response.data.story,
    }
  }

  const story = await getSingleCachedFile(params.path)

  if (!story) {
    error(404, `The requested post doesn't exist`)
  }

  return {
    source: 'cached',
    story: story.default,
  }
}
