<script>
  import Link from '$lib/components/Link.svelte'
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'

  export let data

  const { namedTags, stories, tag } = data

  const showCategories = false
</script>

<div class="grid gap-4">
  <div class="border rounded bg-zinc-100 px-3 py-1">
    Viewing posts in {tag} category (<Link href="/" label="View all posts" />)
  </div>

  <ListOfPosts {namedTags} {stories} {showCategories} />
</div>
