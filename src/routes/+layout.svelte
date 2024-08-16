<script>
  import '../app.css'
  import ExternalLink from '$lib/components/ExternalLink.svelte'
  import Navigation from '$lib/components/Navigation.svelte'

  const year = new Date().getFullYear()
</script>

<div class="text-xl">
  <a href="#content">Skip to content</a>

  <header class="py-6">
    <Navigation />
  </header>

  <main id="content">
    <slot />
  </main>

  <footer class="pt-12">
    <form action="/search" method="get" class="pb-4 text-center">
      <input
        type="text"
        name="term"
        placeholder="Search..."
        class="w-64 bg-transparent text-copy placeholder:underline placeholder:text-accent placeholder:decoration-accent" />

      <button type="submit" class="sr-only">Submit search</button>
    </form>

    <Navigation />

    <div class="flex gap-1 items-center justify-center pb-12 text-base">
      &copy; 1997&mdash;{year} by <ExternalLink
        href="https://insult.org/author/calliander"
        label="Calliander" />

      <span aria-hidden="true" class="mx-1">&centerdot;</span>

      <ExternalLink
        href="https://github.com/insultdotorg/calliander.net"
        label="Source code" />
    </div>
  </footer>
</div>
