import { dev } from '$app/environment'
import {
  fetchPaginatedPosts,
  getCachedFiles,
  getDeliveryClient,
  sortCachedStories
} from '$lib/common'

export const load = async () => {
  if (dev) {
    const client = getDeliveryClient(true)

    const stories = await fetchPaginatedPosts(client, {
      per_page: 100,
      sort_by: ['published_at:desc', 'created_at:desc'],
      version: dev ? 'draft' : 'published',
    })

    return {
      stories,
    }
  }

  const stories = await getCachedFiles()

  return {
    stories: sortCachedStories(stories),
  }
}

export const prerender = !dev
