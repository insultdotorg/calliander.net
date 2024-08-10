<script>
  import { writable } from 'svelte/store'
  import Card from '$lib/components/Card.svelte'

  export let namedTags
  export let showCategories = true
  export let stories

  let paginatedPosts = []
  const count = stories.length
  const toShow = 10
  const posts = writable(toShow)

  function loadMore() {
    if ($posts < count) {
      $posts += toShow
    }

    if ($posts > count) {
      $posts = count
    }
  }

  $: paginatedPosts = stories.slice(0, $posts)
</script>

<div class="grid gap-4">
  <div class="grid gap-4">
    {#each paginatedPosts as story}
      <Card {namedTags} {showCategories} {story} />
    {/each}
  </div>

  {#if $posts < count}
    <div>
      <button
        type="button"
        on:click={() => {
          loadMore()
        }}
        class="border border-black rounded py-1 px-2 font-bold">
        Load More
      </button>
    </div>
  {/if}
</div>
