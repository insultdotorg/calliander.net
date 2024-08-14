import { dev } from '$app/environment'
import { error } from '@sveltejs/kit'
import { getDeliveryClient, getSingleCachedFile } from '$lib/common'

export const load = async ({ params }) => {
  if (dev) {
    const slug = `posts/${params.path}`

    const client = getDeliveryClient(true)

    const response = await client
      .get(`cdn/stories/${slug}`, {
        version: dev ? 'draft' : 'published',
      })
      .catch(() => {
        error(404, `The requested post doesn't exist`)
      })

    return {
      story: response.data.story,
    }
  }

  const story = await getSingleCachedFile(params.path)

  if (!story) {
    error(404, `The requested post doesn't exist`)
  }

  return {
    story: story.default,
  }
}

export const prerender = !dev
