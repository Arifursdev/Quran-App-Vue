<template>
    <div class="chapters-wrapper">
        <Topbar/>

        <div class="chapters__list">
            <Loading v-if="!chaptersList.length"/>
            <template v-if="chaptersList.length">
                <Chapter v-for="chapter in chaptersList" :chapter="chapter" :key="chapter.id"/>
            </template>
        </div>

    </div>
</template>

<script>
import Topbar from './Chapters/Topbar.vue'
import Chapter from './Chapters/Chapter.vue'
import Loading from './Loading.vue'

export default {
    name: "Chapters",
    components: {
        Topbar,
        Chapter,
        Loading
    },
    computed: {
        chaptersList(){
            return this.$store.getters.getChapters;
        }
    }
}
</script>