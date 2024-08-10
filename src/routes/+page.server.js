import { dev } from '$app/environment'
import {
  fetchPaginatedStories,
  fixStoryblokSlugs,
  getCachedFiles,
  getDeliveryClient,
  sortCachedStories,
} from '$lib/common'

export const load = async () => {
  if (dev) {
    const client = getDeliveryClient(true)

    const stories = await fetchPaginatedStories(client, {
      per_page: 100,
      sort_by: ['published_at:desc', 'created_at:desc'],
      version: dev ? 'draft' : 'published',
    })

    return {
      stories: fixStoryblokSlugs(stories),
    }
  }

  const stories = await getCachedFiles()

  return {
    stories: sortCachedStories(stories),
  }
}
