<script>
  import '../app.css'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import Link from '$lib/components/Link.svelte'

  export let data

  const isDev = data.source === 'storyblok'

  const year = new Date().getFullYear()
</script>

<div class="grid gap-4">
  <header>
    <Link href="/" label="Home" />
  </header>

  <main>
    <slot />
  </main>

  <footer>
    <span>
      &copy; 1997&mdash;{year} by <ExternalLink
        href="https://insult.org/author/calliander"
        label="Calliander" />
    </span>
  </footer>

  {#if isDev}
    <div
      class="font-mono text-xs absolute right-0 top-0 p-4 bg-zinc-200/50 rounded-bl">
      @todo print debug stuff in here
    </div>
  {/if}
</div>
