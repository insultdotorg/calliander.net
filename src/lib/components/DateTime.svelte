<script>
  export let story

  const ordinal = (number) => {
    if (number > 3 && number < 21) {
      return 'th'
    }

    switch (number % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  const isDraft = !story.first_published_at
  const date = new Date(story.first_published_at || story.created_at)
  const isoDate = date.toISOString()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const year = date.getFullYear()
  const day = date.getDate()
  const time = date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  })
  const prettyDate = `${month} ${day}${ordinal(day)}, ${year} / ${time}`
</script>

<time datetime={isoDate} class="post-date" class:draft={isDraft}>
  <span class="sr-only">{isDraft ? 'Draft' : 'Published'} date</span>

  {#if isDraft}
    <svg
      aria-hidden="true"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="h-icon w-icon">
      <path d="M12 20h9"></path>
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
    </svg>
  {/if}

  {prettyDate}
</time>
