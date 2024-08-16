<script>
  import { writable } from 'svelte/store'
  import Card from '$lib/components/Card.svelte'

  export let stories

  const count = stories.length
  const toShow = 1
  const posts = writable(toShow)
  const totalPages = Math.ceil(stories.length / toShow)
  let paginatedPosts = []
  let page = 0

  function loadMore() {
    if ($posts < count) {
      $posts += toShow
    }

    if ($posts > count) {
      $posts = count
    }
  }

  $: {
    paginatedPosts = stories.slice(0, $posts)
    page++
  }
</script>

<div class="pt-24 pb-12">
  <div class="grid gap-12 px-6">
    {#each paginatedPosts as story}
      <Card {story} />
    {/each}
  </div>

  {#if $posts < count}
    <div class="grid grid-cols-3 items-center px-8 pt-20 text-base">
      <button
        type="button"
        class="flex gap-1 items-center uppercase"
        on:click={() => {
          loadMore()
        }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-4 w-4">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>

        <span class="underline">Older</span>
      </button>

      <div class="text-center">
        {page} of {totalPages}
      </div>
    </div>
  {/if}
</div>
