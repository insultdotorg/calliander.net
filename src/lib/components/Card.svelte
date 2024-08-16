<script>
  import DateTime from '$lib/components/DateTime.svelte'

  export let story
</script>

<div class="grid gap-4 text-xl">
  <div class="order-2">
    <a href={`/${story.full_slug}`}>{story.name}</a>
  </div>

  <DateTime
    isDraft={!story.first_published_at}
    storyDate={story.first_published_at || story.created_at} />
</div>
