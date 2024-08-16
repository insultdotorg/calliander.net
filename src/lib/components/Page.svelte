<script>
  import DateTime from '$lib/components/DateTime.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'

  export let isDraft = false
  export let storyDate = undefined
  export let title

  const full = true
</script>

<div class="bg-white shadow-xl max-w-5xl m-auto">
  <PageTitle>{title}</PageTitle>

  <div id="rich-text" class="grid px-6 pt-24 pb-20 indent-8 max-w-lg m-auto md:px-0">
    <slot />
  </div>

  {#if storyDate}
    <div class="-mt-6 px-6 pb-20 text-right max-w-lg m-auto md:px-0">
      <div>Calliander</div>

      <DateTime {full} {isDraft} {storyDate} />
    </div>
  {/if}
</div>
