<script>
  import DateTime from '$lib/components/DateTime.svelte'

  export let story
</script>

<div>
  <div>
    <div>
      <a href={`/${story.full_slug}`}>{story.name}</a>
    </div>

    <DateTime
      isDraft={!story.first_published_at}
      storyDate={story.first_published_at || story.created_at} />
  </div>
</div>
