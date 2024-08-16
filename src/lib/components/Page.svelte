<script>
  import DateTime from '$lib/components/DateTime.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'

  export let isDraft = false
  export let storyDate
  export let title
</script>

<div>
  <PageTitle>{title}</PageTitle>

  <div>
    <slot />
  </div>

  {#if storyDate}
    <DateTime {isDraft} {storyDate} />
  {/if}
</div>
