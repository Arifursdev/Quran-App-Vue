<template>
  <div class="chapter__item" @click="selectSurah(chapter.chapter_number)" :class="isCurrentSurah === chapter.chapter_number ? 'active' : ''">
        <span class="chapter__no">{{ chapter.chapter_number }}</span>
        <span class="chapter__name">{{ chapter.name_simple }}</span>
        <p class="chapter__name-translation">{{ chapter.translated_name.name }}</p>
        <span class="chapter__verses">{{ chapter.verses_count }} Verses</span>
    </div>
</template>

<script>
export default {
  name: "Chapter",
  props: [
    'chapter'
  ],
  methods: {
    selectSurah(id){
      this.$store.commit('setCurrentSurah', id)
      let url = new URL(window.location);
      url.searchParams.set('id', id);
      window.history.pushState({}, '', url);
    }
  },
  computed: {
    isCurrentSurah(){
      return this.$store.getters.getCurrentSurah
    }
  }
}
</script>