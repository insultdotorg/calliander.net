<script>
  import Page from '$lib/components/Page.svelte'
  import RichTextResolver from 'storyblok-js-client/richTextResolver'

  export let data

  const { story } = data

  const resolver = new RichTextResolver()
</script>

<Page
  title={story.name}
  isDraft={!story.first_published_at}
  storyDate={story.first_published_at || story.created_at}>
  {@html resolver.render(story.content.content)}
</Page>
