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

<div class="">
  <div class="grid gap-4">
    {#each paginatedPosts as story}
      <Card {story} />
    {/each}
  </div>

  {#if $posts < count}
    <div class="text-center">
      <button
        type="button"
        class="border border-copy border-dashed py-2 px-6 uppercase"
        on:click={() => {
          loadMore()
        }}>
        Load next {toShow} of {remaining} post{remaining !== 1 ? 's' : ''}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="h-6 w-6 m-auto">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
    </div>
  {/if}
</div>
