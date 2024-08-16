<script>
  export let full = false
  export let isDraft = false
  export let storyDate

  const date = new Date(storyDate)
  const locale = 'en-US'
  const isoDate = date.toISOString()
  const month = date.toLocaleString(locale, { month: full ? 'long' : 'short' })
  const year = date.toLocaleString(locale, { year: full ? 'numeric' : '2-digit' })
  const day = date.getDate()
  const separator = full ? ', ' : ' &CloseCurlyQuote;'
</script>

<time datetime={isoDate} class="uppercase text-accent text-lg">
  <span class="sr-only">{isDraft ? 'Drafted' : 'Published'}</span>

  {month} {day}{@html separator}{year}
</time>
