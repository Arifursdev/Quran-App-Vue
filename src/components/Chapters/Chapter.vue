<template>
  <div 
    :data-id="chapter.chapter_number" 
    class="chapter__item" 
    @click="selectSurah(chapter.chapter_number)" 
    :class="isCurrentSurah === chapter.chapter_number ? 'active' : ''">
        <a @click.prevent="selectSurah(chapter.chapter_number)" :href="getSurahLink(chapter)"></a>
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
    },
    setSurahPosition(id){
        let chapter = document.querySelector('.chapter__item[data-id="'+ id +'"]')
        var loaded;
        
        if(chapter) {
            clearTimeout(loaded);
            loaded = setTimeout(function(){
              let list = document.querySelector('.chapters__list')
              list.scroll({
                  top: chapter.offsetTop - 20,
                  left: 0,    
                  behavior: 'smooth'
              });
            }, 300) 
        }
    },
    openSurahInNewTab(){
      let url = new URL(window.location);
      url.searchParams.set('id', this.$props.chapter.chapter_number);
      url.searchParams.set('verse', 0);

      var evLink = document.createElement('a');
      evLink.href = url;
      evLink.target = '_blank';
      document.body.appendChild(evLink);
      evLink.click();
      evLink.parentNode.removeChild(evLink);

      // window.open(url, "_blank");
    },
    getSurahLink(chapter){
      return '?id=' + chapter.chapter_number
    }
  },
  computed: {
    isCurrentSurah(){
        return this.$store.getters.getCurrentSurah
    },
    currentSurah(){
        return this.$store.getters.getCurrentSurah;
    },
    sortChanges(){
        return this.$store.getters.getSort;
    }
  },
  watch: {
    currentSurah(newValue, oldValue){
        this.setSurahPosition(newValue)
    },
    sortChanges(newValue, oldValue){
      this.setSurahPosition(this.currentSurah)
    }
  },
  mounted(){
    let currentSurah = this.$store.getters.getCurrentSurah

    this.$nextTick(() => {
        this.setSurahPosition(currentSurah)
    });
  }
}
</script>