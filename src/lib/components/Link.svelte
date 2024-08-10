<script>
  export let href
  export let label = undefined

  // @todo Determine if link is active
</script>

<a href={href} class="font-bold underline">
  {#if label}
    <span>{label}</span>
  {:else}
    <slot />
  {/if}
</a>
