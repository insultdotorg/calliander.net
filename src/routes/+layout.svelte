<script>
  import '../app.css'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import Logo from '$lib/components/Logo.svelte'

  const year = new Date().getFullYear()
</script>

<div>
  <header>
    <a href="/">
      <Logo />
    </a>
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
</div>
