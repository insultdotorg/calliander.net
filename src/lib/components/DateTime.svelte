<script>
  export let story

  const isDraft = !story.first_published_at
  const date = new Date(story.first_published_at || story.created_at)
  const isoDate = date.toISOString()
  const prettyDate = date.toLocaleString('en-US', {
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    month: 'long',
    weekday: 'long',
    year: 'numeric',
  })
</script>

<time datetime={isoDate} class="text-sm" class:text-zinc-500={isDraft}>{prettyDate}</time>
