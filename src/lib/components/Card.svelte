<script>
  import DateTime from '$lib/components/DateTime.svelte'

  export let namedTags
  export let showCategories = true
  export let story
</script>

<div>
  <div>
    <div>
      <a href={`/${story.full_slug}`}>{story.name}</a>
    </div>

    <div>
      {#if showCategories}
        <div>
          <span>
            Posted in {story.tag_list.length === 1 ? 'category' : 'categories'}
          </span>

          {#each story.tag_list as tag, i}
            {#if i !== 0}
              <span aria-hidden="true">&bull;</span>
            {/if}

            <a href={`/category/${namedTags[tag]}`}>
              {tag}
            </a>
          {/each}
        </div>
      {/if}

      {#if showCategories}
        <span aria-hidden="true">&bull;</span>
      {/if}

      <DateTime {story} />
    </div>
  </div>
</div>
