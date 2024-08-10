import { dev } from '$app/environment'
import { error } from '@sveltejs/kit'
import {
  fetchPaginatedStories,
  fetchTags,
  fixStoryblokSlugs,
  getCachedFiles,
  getDeliveryClient,
  slugify,
  sortCachedStories,
} from '$lib/common'

export const load = async ({ params, parent }) => {
  const { sluggedTags } = await parent()

  const tag = sluggedTags[params.slug]

  if (!tag) {
    error(404, `The requested category doesn't exist`)
  }

  if (dev) {
    const client = getDeliveryClient(true)

    const stories = await fetchPaginatedStories(client, {
      per_page: 100,
      sort_by: ['published_at:desc', 'created_at:desc'],
      version: dev ? 'draft' : 'published',
      with_tag: [tag],
    })

    return {
      stories: fixStoryblokSlugs(stories),
      tag
    }
  }

  const cachedStories = await getCachedFiles()

  const stories = cachedStories.filter((story) => story.tag_list.includes(tag))

  return {
    stories: sortCachedStories(stories),
    tag
  }
}
