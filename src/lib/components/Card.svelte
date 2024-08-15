<script>
  import DateTime from '$lib/components/DateTime.svelte'

  export let story
</script>

<div>
  <div>
    <div>
      <a href={`/${story.full_slug}`}>{story.name}</a>
    </div>

    <DateTime {story} />
  </div>
</div>
