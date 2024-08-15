<script>
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'

  export let data

  const { stories } = data
</script>

<ListOfPosts {stories} />
