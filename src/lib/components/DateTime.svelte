<script>
  export let isDraft = false
  export let storyDate

  const date = new Date(storyDate)
  const locale = 'en-US'
  const isoDate = date.toISOString()
  const month = date.toLocaleString(locale, { month: 'short' })
  const year = date.toLocaleString(locale, { year: '2-digit' })
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const timeZone = date
    .toLocaleString(locale, {
      day: '2-digit',
      timeZoneName: 'longOffset',
    })
    .substring(4)
  const prettyDate = `${month} ${day} '${year} / ${hours}:${minutes} [${timeZone}]`
</script>

<time datetime={isoDate}>
  <span>{isDraft ? 'Drafted' : 'Published'}</span>

  {prettyDate}
</time>
