<script>
  export let href
  export let label = undefined

  // @todo Determine if link is active
</script>

<a {href} class="underline">
  {#if label}
    <span>{label}</span>
  {:else}
    <slot />
  {/if}
</a>
