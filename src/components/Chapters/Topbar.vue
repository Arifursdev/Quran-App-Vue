<template>
    <div class="chapters__topbar">
        <Search/>
        <Sort/>
    </div>
</template>

<script>
import Search from './Search.vue'
import Sort from './Sort.vue'

export default {
    name: 'Topbar',
    components: {
        Search,
        Sort
    }
}
</script>

<style>

</style>