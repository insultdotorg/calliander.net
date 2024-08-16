<script>
  import DateTime from '$lib/components/DateTime.svelte'

  export let story
</script>

<div class="grid gap-2">
  <div class="order-2 text-2xl">
    <a href={`/${story.full_slug}`} class="underline">{story.name}</a>
  </div>

  <DateTime
    isDraft={!story.first_published_at}
    storyDate={story.first_published_at || story.created_at} />
</div>
