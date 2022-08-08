<template>
    <div class="chapters-wrapper">
        <Topbar/>

        <div class="chapters__list">
            <Loading v-if="!chaptersList.length"/>
            <template v-if="chaptersList.length">
                <div class="chapters__sorted-by">Sorted by: <span>{{ selectedSorting }}</span></div>
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
        },
        selectedSorting(){
            let sort =  this.$store.getters.getSort;
            if(sort === 'DESC') return 'Descending';
            if(sort === 'REVELATION_ORDER') return 'Revelation Order';

            return 'ASCENDING';
        }
    },
    mounted(){
        let app = this
        
        let url = new URL(window.location);
        var sort = url.searchParams.get('sortBy')

        if(sort !== null) {
            var availableSortOptions = ['ASC', 'DESC', 'REVELATION_ORDER']

            if(availableSortOptions.includes(sort)) {
                app.$store.commit('setSort', sort)
            } else {
                url.searchParams.set('sortBy', 'ASC');
                window.history.pushState({}, '', url);
            }
        }
    }
}
</script>