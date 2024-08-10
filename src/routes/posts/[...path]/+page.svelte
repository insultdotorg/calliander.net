<script>
  import DateTime from '$lib/components/DateTime.svelte'
  import Link from '$lib/components/Link.svelte'
  import RichTextResolver from 'storyblok-js-client/richTextResolver'

  export let data

  const { namedTags, story } = data

  const resolver = new RichTextResolver()
</script>

<div class="grid gap-4">
  <div class="font-bold">{story.name}</div>

  <div class="text-sm flex gap-4">
    {#each story.tag_list as tag}
      <Link href={`/category/${namedTags[tag]}`} label={tag} />
    {/each}
  </div>

  <DateTime {story} />

  <div class="grid gap-4 prose">
    <div class="italic">{story.content.description}</div>

    <div>{@html resolver.render(story.content.content)}</div>
  </div>
</div>
