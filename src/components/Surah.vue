<template>
  <div class="surah-wrapper">
    <SurahHeader/>

    <div class="surah__verses">
      <Loading v-if="!currentSurahVerses"/>
      <template v-if="currentSurahVerses">

        <Verse v-for="(verse, index) in currentSurahVerses" @verseMounted="verseMounted" :index="index" :verse="verse" :key="verse.verse_number"/>
        
        <div class="chapters__pagination" v-if="showPagination">
            <button type="button" @click="changeChapter('prev')" v-if="currentSurah > 0" class="prev__chapter"><svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.75 16.25a.74.74 0 0 1-.53-.22l-3.5-3.5a.75.75 0 0 1 0-1.06L13.22 8a.75.75 0 0 1 1.06 1l-3 3l3 3a.75.75 0 0 1 0 1.06a.74.74 0 0 1-.53.19Z"/></svg> Prev Chapter</button>
            <button type="button" @click="changeChapter('next')" v-if="currentSurah < 113" class="next__chapter">Next Chapter <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10.25 16.25a.74.74 0 0 1-.53-.25a.75.75 0 0 1 0-1.06l3-3l-3-3A.75.75 0 0 1 10.78 8l3.5 3.5a.75.75 0 0 1 0 1.06L10.78 16a.74.74 0 0 1-.53.25Z"/></svg></button>
        </div>

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
        verseMountedTimeout: null
      }
    },
    methods: {
      goToTop(){
        window.scroll(0,0)
        document.querySelector('.surah-wrapper').scroll(0,0)
      },
      changeChapter(nextOrPrev = 'next'){
        let app = this
        let currentSurah = this.$store.getters.getCurrentSurah;
        var chapters = this.$store.getters.getChapters;
        var chaptersIds = chapters.map(chapter => chapter.id )

        var surahIndex = chaptersIds.indexOf(currentSurah);
        surahIndex = nextOrPrev === 'next' ? surahIndex + 1 : surahIndex - 1
        var nextSurah = chaptersIds[surahIndex]

        app.$store.commit('setCurrentSurah', nextSurah)

        let url = new URL(window.location);
        url.searchParams.set('id', nextSurah);
        window.history.pushState({}, '', url);
      },
      verseMounted: function(){
        clearTimeout(this.verseMountedTimeout)
        this.verseMountedTimeout = setTimeout(function(){

          let url = new URL(window.location.href).searchParams
          let verse = parseInt(url.get('verse'));
          let header = document.querySelector('.surah__header')
          let surah = document.querySelector('.surah-wrapper')
          let verseDiv = document.querySelector('#verse_' + verse)

          if(verse !== NaN && surah && verseDiv && header) {
            let desktopOffset = verseDiv.offsetTop - header.clientHeight;
            let mobileOffset = verseDiv.offsetTop;
            window.outerWidth < 769 ? window.scrollTo(0, mobileOffset) : surah.scrollTo(0, desktopOffset)
          }

          const targets = document.querySelectorAll('.surah__verse');
          const setVerseReadHistory = target => {
              const io = new IntersectionObserver((entries, observer) => {
                  entries.forEach(entry => {
                    console.log(entry);
                      if (entry.isIntersecting) {
                          let element = entry.target;
                          let id = element.dataset.index
                          
                          let url = new URL(window.location);
                          url.searchParams.set('verse', id);
                          window.history.pushState({}, '', url);
                      }
                  });
              });
              
              io.observe(target)
          };
          
          targets.forEach(setVerseReadHistory);


        }, 150)
      }
    },
    computed: {
      currentSurah(){
        let currentSurah = this.$store.getters.getCurrentSurah;
        var chapters = this.$store.getters.getChapters;

        return chapters.map(chapter => chapter.id ).indexOf(currentSurah)
      },
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

          let url = new URL('https://api.qurancdn.com/api/qdc/verses/by_chapter/'+ currentSurah)
          let urlParam = url.searchParams;
          
          urlParam.set('words', true)
          urlParam.set('translation_fields', 'resource_name,language_id')
          urlParam.set('per_page', 500)
          urlParam.set('fields', 'text_uthmani,chapter_id,hizb_number,text_imlaei_simple')
          let translations = localStorage.getItem('adevSavedTranslators');
          urlParam.set('translations', translations === null ? '20,131,22,85,17,19,167,95,171,57,163,122' : translations)
          urlParam.set('reciter', 3)
          urlParam.set('word_translation_language', 'en')
          urlParam.set('page', 1)
          urlParam.set('word_fields', 'verse_key,verse_id,page_number,location,text_uthmani,tajweed,qpc_uthmani_hafs')
          urlParam.set('mushaf', 11)

          app.axios.get( url.href )
          .then(function(resp){
            var verses = resp.data.verses;
            var data = [];

            verses.forEach(verse => {
                data.push({
                    'id' : verse.id,
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

      },
      showPagination(){
        if(this.$store.getters.getSearchQuery !== '') {
          return false;
        }
        
        return true;
      }
    },
    mounted(){
      let self = this

      window.scroll(0,0)
      document.querySelector('.surah-wrapper').scroll(0,0)

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