<script>
  import '../app.css'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import Navigation from '$lib/components/Navigation.svelte'

  const year = new Date().getFullYear()
</script>

<div class="text-copy">
  <a href="#content" class="hidden">Skip to content</a>

  <header class="bg-background">
    <Navigation />
  </header>

  <main id="content">
    <slot />
  </main>

  <footer class="bg-background">
    <div class="hidden">...search...</div>

    <Navigation />

    <div class="grid text-center">
      <div>
        &copy; 1997&mdash;{year} by <ExternalLink
          href="https://insult.org/author/calliander"
          label="Calliander" />
      </div>

      <div>
        <ExternalLink
          href="https://github.com/insultdotorg/calliander.net"
          label="Source code" />
      </div>
    </div>
  </footer>
</div>
