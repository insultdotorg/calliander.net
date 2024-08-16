<script>
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'

  export let data

  const { stories } = data
</script>

<div class="bg-background">
  <div class="text-center pt-12">
    <div class="text-6xl">calliander.net</div>

    <div class="pt-4 text-2xl text-accent">Some descriptive text goes here.</div>
  </div>

  <PageTitle>Contents</PageTitle>

  <ListOfPosts {stories} />
</div>
