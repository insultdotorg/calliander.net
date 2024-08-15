<script>
  import DateTime from '$lib/components/DateTime.svelte'
  import RichTextResolver from 'storyblok-js-client/richTextResolver'

  export let data

  const { namedTags, story } = data

  const resolver = new RichTextResolver()
</script>

<div>
  <div>{story.name}</div>

  <div>
    {#each story.tag_list as tag}
      <a href={`/category/${namedTags[tag]}`}>{tag}</a>
    {/each}
  </div>

  <DateTime {story} />

  <div>
    <div>{story.content.description}</div>

    <div>{@html resolver.render(story.content.content)}</div>
  </div>
</div>
