<script>
  import DateTime from '$lib/components/DateTime.svelte'

  export let index
  export let namedTags
  export let showCategories = true
  export let story

  const isFirst = index === 0
</script>

<div class="post grid gap-4" class:first={isFirst}>
  <div class="font-sans font-bold grid">
    <div class="post-title" class:first={isFirst}>
      <a href={`/${story.full_slug}`} class="text-cyan-700">{story.name}</a>
    </div>

    <div class="post-meta md:flex gap-2" class:first={isFirst}>
      {#if showCategories}
        <div class="flex gap-2 text-pink-700">
          <span class="sr-only">
            Posted in {story.tag_list.length === 1 ? 'category' : 'categories'}
          </span>

          {#each story.tag_list as tag, i}
            {#if i !== 0}
              <span aria-hidden="true">&bull;</span>
            {/if}

            <a href={`/category/${namedTags[tag]}`} class="text-inherit">
              {tag}
            </a>
          {/each}
        </div>
      {/if}

      {#if showCategories}
        <span aria-hidden="true" class="hidden md:inline">&bull;</span>
      {/if}

      <DateTime {story} />
    </div>
  </div>

  {#if isFirst}
    <div class="order-3 md:mt-4">
      {story.content.description}

      <a href={`/${story.full_slug}`} class="text-pink-700">
        <svg
          viewBox="0 0 100 125"
          fill="currentColor"
          aria-label="Read this post"
          class="inline ml-2 h-auto w-6 align-top">
          <path
            d="M67.34,15.9a3.55,3.55,0,1,0-5,5L87.85,46.44H3.53a3.56,3.56,0,0,0,0,7.11H87.85L62.3,79.06a3.62,3.62,0,0,0,0,5,3.53,3.53,0,0,0,5,0l31.6-31.6a3.47,3.47,0,0,0,0-5Z" />
        </svg>
      </a>
    </div>
  {/if}
</div>
