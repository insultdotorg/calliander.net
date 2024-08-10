<script>
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'

  export let data

  const { namedTags, stories } = data
</script>

<ListOfPosts {namedTags} {stories} />
