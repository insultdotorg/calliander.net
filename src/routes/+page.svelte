<script>
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'
  import PageTitle from '$lib/components/PageTitle.svelte'

  export let data

  const { stories } = data
</script>

<div class="bg-background">
  <div class="text-center px-6 pt-12 md:pt-32">
    <div class="text-6xl md:text-9xl">calliander.net</div>

    <div class="pt-4 text-2xl text-accent md:pt-8 md:text-6xl">Some descriptive text goes here.</div>
  </div>

  <PageTitle>Contents</PageTitle>

  <ListOfPosts {stories} />
</div>
