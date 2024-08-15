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

<div>
  <div>
    {#each paginatedPosts as story, index}
      <Card {index} {namedTags} {showCategories} {story} />
    {/each}
  </div>

  {#if $posts < count}
    <div>
      <button
        type="button"
        on:click={() => {
          loadMore()
        }}>
        Load More Posts
      </button>
    </div>
  {/if}
</div>
