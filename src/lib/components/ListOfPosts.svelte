<script>
  import { writable } from 'svelte/store'
  import Card from '$lib/components/Card.svelte'

  export let stories

  const count = stories.length
  const toShow = 10
  const posts = writable(toShow)
  let paginatedPosts = []
  let remaining = count

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
    remaining = remaining - paginatedPosts.length
  }
</script>

<div>
  <div>
    {#each paginatedPosts as story}
      <Card {story} />
    {/each}
  </div>

  {#if $posts < count}
    <div>
      <button
        type="button"
        on:click={() => {
          loadMore()
        }}>
        Load Next {toShow} of {remaining}
      </button>
    </div>
  {/if}
</div>
