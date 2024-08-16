<script>
  export let isDraft = false
  export let storyDate

  const date = new Date(storyDate)
  const locale = 'en-US'
  const isoDate = date.toISOString()
  const month = date.toLocaleString(locale, { month: 'short' })
  const year = date.toLocaleString(locale, { year: '2-digit' })
  const day = date.getDate()
  const prettyDate = `${month} ${day} '${year}`
</script>

<time datetime={isoDate} class="uppercase text-accent">
  <span class="sr-only">{isDraft ? 'Drafted' : 'Published'}</span>

  {prettyDate}
</time>
