import { dev } from '$app/environment'
import { fetchTags, getDeliveryClient } from '$lib/common'

export const load = async () => {
  const sluggedTags = dev
    ? await fetchTags(getDeliveryClient(true))
    : await import('$lib/cms/tags.json')

  const namedTags = Object.fromEntries(
    Object.entries(sluggedTags).map((a) => a.reverse())
  )

  return {
    namedTags,
    sluggedTags,
    source: dev ? 'storyblok' : 'cached',
  }
}
