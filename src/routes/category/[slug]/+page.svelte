<script>
  import Link from '$lib/components/Link.svelte'
  import ListOfPosts from '$lib/components/ListOfPosts.svelte'

  export let data

  const { namedTags, stories, tag } = data

  const showCategories = false
</script>

<div>
  <div>
    Viewing posts in {tag} category (<Link href="/" label="View all posts" />)
  </div>

  <ListOfPosts {namedTags} {stories} {showCategories} />
</div>
