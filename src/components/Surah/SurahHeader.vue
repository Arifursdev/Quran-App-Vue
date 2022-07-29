<template>
    <div class="surah__header" :class="surahInfo === null ? 'loading': ''">
        <template v-if="surahInfo === null">
            <Loading/>
        </template>

        <template v-if="surahInfo !== null">
            <h2>{{ surahInfo.name_simple }}</h2>
            <p>{{ surahInfo.translated_name.name }}</p>

            <button type="button" class="surah__play">
                <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32"><path fill="currentColor" d="M7 28a1 1 0 0 1-1-1V5a1 1 0 0 1 1.482-.876l20 11a1 1 0 0 1 0 1.752l-20 11A1 1 0 0 1 7 28ZM8 6.69v18.62L24.925 16Z"></path></svg>
                <!-- <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M7 5v14M17 5v14"/></svg> -->
            </button>
        </template>

    </div>
</template>

<script>
import Loading from '../Loading.vue'

export default {
    name: "Header",
    components: {
        Loading,
    },
    computed: {
        surahInfo(){
            var currentSurah = this.$store.getters.getCurrentSurah
            if(currentSurah === null) {
                return null;
            }

            var chapters = this.$store.getters.getChapters

            if(chapters.length === 0) {
                return null;
            }

            var chapterInfo = chapters.filter(item => {
                return item.id === currentSurah;
            })

            return chapterInfo[0];
        }
    }
}
</script>