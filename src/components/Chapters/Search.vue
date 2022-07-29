<template>
    <form action="" class="chapters__search" @submit.prevent>
        <input type="search" name="q" id="search" placeholder="Search Surah" v-model="query" @input="typing" @change="typing">
        <button type="submit" class="chapters__search-btn">
            <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m20.71 19.29l-3.4-3.39A7.92 7.92 0 0 0 19 11a8 8 0 1 0-8 8a7.92 7.92 0 0 0 4.9-1.69l3.39 3.4a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.42ZM5 11a6 6 0 1 1 6 6a6 6 0 0 1-6-6Z"/></svg>
        </button>
    </form>
</template>

<script>
export default {
    name: "Search",
    data(){
        return {
            query: ''
        }
    },
    methods: {
        typing(){
            let query = this.query;
            this.$store.commit('setSearchQuery', query)
        }
    }
}
</script>