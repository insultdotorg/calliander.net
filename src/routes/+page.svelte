<script>
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'

  export let data

  const { stories } = data
</script>

<div class="bg-background">
  <div class="grid gap-4 text-center">
    <div class="text-6xl">calliander.net</div>

    <div class="text-2xl text-accent">Some descriptive text goes here.</div>
  </div>

  <div class="">
    <PageTitle>Contents</PageTitle>
  </div>

  <ListOfPosts {stories} />
</div>
