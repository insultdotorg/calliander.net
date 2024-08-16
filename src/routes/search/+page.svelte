<script>
  import { onMount } from 'svelte'
  import { page } from '$app/stores'
  import Page from '$lib/components/Page.svelte'

  let term

  // @todo Algolia search
  onMount(() => {
    term = $page.url.searchParams.get('term')
  })
</script>

<Page title="Search">
  {#if term}
    <div class="text-4xl break-all">{term}</div>

    <div>...results...</div>
  {:else}
    <div class="text-3xl">Enter a term to search</div>
  {/if}
</Page>
