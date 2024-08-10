<script>
  export let href
  export let label = undefined
</script>

<a
  {href}
  target="_blank"
  rel="noopener noreferrer"
  aria-labelledby="label-external"
  class="font-bold underline inline-flex gap-1 items-baseline">
  {#if label}
    <span>{label}</span>
  {:else}
    <slot />
  {/if}

  <svg
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="h-3.5 w-3.5">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
</a>
