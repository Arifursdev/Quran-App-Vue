<template>
  <div class="surah-wrapper">
    <SurahHeader/>

    <div class="surah__verses">
      <Loading v-if="!currentSurahVerses"/>
      <template v-if="currentSurahVerses">
        <Verse v-for="verse in currentSurahVerses" :verse="verse" :key="verse.verse_number"/>
      </template>

      <div class="go-to-top__wrapper" :class="showGoToTop ? 'show' : ''">
        <button type="button" @click="goToTop">
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20V4m-7 7l7-7l7 7"/></svg>
        </button>
      </div>
      
      
    </div>
    
  </div>
</template>

<script>
import Loading from './Loading.vue'
import SurahHeader from './Surah/SurahHeader.vue'
import Verse from './Surah/Verse.vue'

export default {
    name: "Surah",
    components: {
      Loading,
      SurahHeader,
      Verse
    },
    data(){
      return {
        showGoToTop: false,
      }
    },
    methods: {
      goToTop(){
        window.scroll(0,0)
        document.querySelector('.surah-wrapper').scroll(0,0)
      }
    },
    computed: {
      currentSurahVerses(){
        var app = this;
        let currentSurah = this.$store.getters.getCurrentSurah;

        if(currentSurah === null) {
          return [];
        }

        var currentSurahData = this.$store.getters.getChapterDataByID(currentSurah);
        var dataExists = currentSurahData !== undefined && currentSurahData !== 'undefined';

        let url = new URL(window.location);
        var id = url.searchParams.get('id')

        if(id === null) {
          url.searchParams.set('id', currentSurah);
          window.history.pushState({}, '', url);
        } else {
          var id = parseInt(url.searchParams.get('id')),
          id = id > 0 && id < 115 ? id : 1;

          url.searchParams.set('id', id);
          window.history.pushState({}, '', url);
          if(id !== currentSurah) {
            this.$store.commit('setCurrentSurah', id)
          }
        }
        

        if(!dataExists) {

          app.axios.get( 'https://api.qurancdn.com/api/qdc/verses/by_chapter/'+ currentSurah +'?words=true&translation_fields=resource_name%2Clanguage_id&per_page=500&fields=chapter_id&translations=20%2C131&reciter=7&word_translation_language=en&page=1&word_fields=verse_key%2Cverse_id%2Cpage_number%2Clocation%2Ctext_uthmani%2Ctajweed%2Cqpc_uthmani_hafs&mushaf=11' )
          .then(function(resp){
            var verses = resp.data.verses;
            var data = [];

            verses.forEach(verse => {
                data.push({
                    'verse_number' : verse.verse_number,
                    'chapter_id' : verse.chapter_id,
                    'verse_key' : verse.verse_key,
                    'translations' : verse.translations,
                })
            });

            app.$store.commit('setSurah', {
              id: currentSurah,
              data: data
            })

            return data;
          })
          .catch(function(error){
            console.log(error);
          });

        } else {
          return currentSurahData;
        }
      }
    },
    mounted(){
      let self = this

      window.onscroll = (e) => {
        if(window.scrollY > 150) {
          self.showGoToTop = true
        } else {
          self.showGoToTop = false
        }
      }

      let surahWrapper = document.querySelector('.surah-wrapper');
      surahWrapper.onscroll = (e) => {
        if(surahWrapper.scrollTop > 150) {
          self.showGoToTop = true
        } else {
          self.showGoToTop = false
        }
      }
    }
}
</script>