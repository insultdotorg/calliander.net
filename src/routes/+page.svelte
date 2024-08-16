<script>
  import Divider from '$lib/components/Divider.svelte'
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'

  export let data

  const { stories } = data
</script>

<div>
  <div>
    <div>calliander.net</div>

    <div>Some descriptive text goes here.</div>
  </div>

  <div>
    <div>Contents</div>
    <Divider />
  </div>

  <ListOfPosts {stories} />
</div>
