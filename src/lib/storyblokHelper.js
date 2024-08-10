import {
  apiPlugin,
  storyblokInit,
  useStoryblokApi as useStoryblokApiDefault,
} from '@storyblok/svelte'
import { dev } from '$app/environment'
import chalk from 'chalk'
import dotenv from 'dotenv'
import Page from '$lib/storyblok/Page.svelte'

const storyblokApi = undefined

export const doStoryblokInit = () => {
  dotenv.config()

  storyblokInit({
    accessToken: dev
      ? process.env.STORYBLOK_PREVIEW_TOKEN
      : process.env.STORYBLOK_PUBLIC_TOKEN,
    apiOptions: {
      region: 'us',
    },
    bridge: dev,
    components: {
      Page,
    },
    use: [apiPlugin],
  })

  return useStoryblokApiDefault()
}

export const useStoryblokApi = () => {
  if (storyblokApi !== undefined) {
    return storyblokApi
  }

  return doStoryblokInit()
}

export async function fetchPaginatedStories(client, options) {
  const entries = []
  const perPage = options.per_page
  let totalPages = 1

  for (let currentPage = 1; currentPage <= totalPages; currentPage++) {
    options.page = currentPage

    const response = await client.get('cdn/stories', options).catch((error) => {
      chalk.red('Encountered an issue accessing the Storyblok API:', error)
      process.exit(1)
    })

    if (response.data.stories.length > 0) {
      totalPages = Math.ceil(response.total / perPage)

      entries.push(...response.data.stories)
    }
  }

  return entries
}

export function slugify(string) {
  if (!string) {
    return ''
  }

  let slug = string.toLowerCase().trim()

  slug = slug.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  slug = slug.replace(/[^a-z0-9\s-]/g, ' ').trim()
  slug = slug.replace(/[\s-]+/g, '-')

  return slug
}
