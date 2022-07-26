<template>
    <div class="chapters-wrapper">
        <Topbar/>

        <div class="chapters__list">
            <Loading v-if="!ChaptersList.length"/>
            <template v-if="ChaptersList.length">
                <Chapter v-for="chapter in ChaptersList" :chapter="chapter" :key="chapter.id"/>
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
        ChaptersList(){
            return this.$store.getters.getChapters;
        }
    },
    created(){
        console.log('chapters created');
    }
}
</script>