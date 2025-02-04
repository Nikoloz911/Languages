<!-- Svelte -->
<!--
  Svelte is a modern JavaScript framework that compiles components to efficient, imperative code at build time.
  It's used for building reactive web applications with less boilerplate compared to other frameworks like React or Vue.
-->
<!--
  Svelte files are usually compiled into JavaScript at build time.
  Example of a Svelte component (in a .svelte file):
-->
<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<button on:click={increment}>Click me</button>
<p>Count: {count}</p>