<script>
  import DateTime from '$lib/components/DateTime.svelte'
  import Link from '$lib/components/Link.svelte'

  export let namedTags
  export let showCategories = true
  export let story
</script>

<div class="grid gap-4">
  <div>
    <Link href={`/${story.full_slug}`} label={story.name} />
  </div>

  {#if showCategories}
    <div class="text-sm flex gap-4">
      {#each story.tag_list as tag}
        <Link href={`/category/${namedTags[tag]}`} label={tag} />
      {/each}
    </div>
  {/if}

  <DateTime {story} />

  <div class="text-zinc-800">{story.content.description}</div>
</div>
