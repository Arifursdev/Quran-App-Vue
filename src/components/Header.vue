<template>
  <header class="site-header">
      <div class="header__inner">

        <Logo/>
        <Search/>
        <Options/>

      </div>
    </header>
</template>

<script>
import Logo from './Header/Logo.vue'
import Options from './Header/Options.vue'
import Search from './Header/Search.vue'

export default {
    name: "Header",
    components: {
      Logo,
      Search,
      Options,
    }
}
</script>