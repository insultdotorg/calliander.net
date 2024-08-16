<script>
  import DateTime from '$lib/components/DateTime.svelte'
  import Divider from '$lib/components/Divider.svelte'

  export let isDraft = false
  export let storyDate
  export let title
</script>

<div>
  <div>
    <div>{title}</div>

    <Divider />
  </div>

  <div>
    <slot />
  </div>

  {#if storyDate}
    <DateTime {isDraft} {storyDate} />
  {/if}
</div>
