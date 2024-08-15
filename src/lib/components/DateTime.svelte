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

<time datetime={isoDate}>
  <span>{isDraft ? 'Draft' : 'Published'} date</span>

  {prettyDate}
</time>
