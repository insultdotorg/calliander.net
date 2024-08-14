<script>
  import '../app.css'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import Logo from '$lib/components/Logo.svelte'

  const year = new Date().getFullYear()
</script>

<div class="font-serif grid gap-8 pl-16 pr-4 py-4 md:pl-32 md:pr-8 md:py-8">
  <header
    class="bg-neutral-900 text-neutral-50 fixed left-0 top-0 bottom-0 w-12 flex flex-col items-center md:w-24">
    <a href="/" class="h-8 w-8 mt-5 md:mt-9">
      <Logo />
    </a>
  </header>

  <main>
    <slot />
  </main>

  <footer class="font-sans font-bold text-neutral-500 text-sm uppercase">
    <span>
      &copy; 1997&mdash;{year} by <ExternalLink
        href="https://insult.org/author/calliander"
        label="Calliander" />
    </span>
  </footer>
</div>
