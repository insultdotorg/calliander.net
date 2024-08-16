<script>
  import '../app.css'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import Navigation from '$lib/components/Navigation.svelte'

  const year = new Date().getFullYear()
</script>

<div>
  <a href="#content">Skip to content</a>

  <header>
    <Navigation />
  </header>

  <main id="content">
    <slot />
  </main>

  <footer>
    <div>...search...</div>

    <Navigation />

    <div>
      <div>
        &copy; 1997&mdash;{year} by <ExternalLink
          href="https://insult.org/author/calliander"
          label="Calliander" />
      </div>

      <div>
        <ExternalLink href="https://github.com/insultdotorg/calliander.net" label="Source code" />
      </div>
    </div>
  </footer>
</div>
