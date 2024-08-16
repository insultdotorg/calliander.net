<script>
  import Page from '$lib/components/Page.svelte'

  export let data

  // @todo Algolia search
</script>

<Page title="Search">
  <div class="text-4xl break-all">{data.term}</div>
</Page>
