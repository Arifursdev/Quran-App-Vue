<template>
  <Header/>
  
  <main class="main-content" id="main">
    <Chapters v-if="showChapters"/>
    <Surah v-if="currentSurahIsNotNull"/>
  </main>

  <Overlay/>
</template>

<script>
import Header from './components/Header.vue'
import Chapters from './components/Chapters.vue'
import Surah from './components/Surah.vue'
import Overlay from './components/Overlay.vue'

export default {
  name: 'App',
  components: {
    Header,
    Chapters,
    Surah,
    Overlay,
  },
  methods: {
    colorScheme(){
      var classList = document.querySelector('html').classList;

      var userSelected = localStorage.getItem('dark_mode_enabled')
      if(userSelected !== null) {
        userSelected === 'true' ? (classList.remove('mode:light'), classList.add('mode:dark')) : (classList.remove('mode:dark'), classList.add('mode:light'))
        return;
      }

      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
          classList.remove('mode:light')
          classList.add('mode:dark')
      } else {
          classList.remove('mode:dark')
          classList.add('mode:light')
      }
    },
    fetchChapters(){
      let app = this
      app.axios.get( 'https://api.quran.com/api/v3/chapters' )
        .then(function(resp){
          app.$store.commit('setChapter', resp.data.chapters)
        })
        .catch(function(error){
          console.log(error);
        });
    },
    urlParamRoute(){
      let app = this
      let url = new URL(window.location);

      if(window.outerWidth < 992) {
        var id = url.searchParams.get('id');

        if(id !== null) {
          id = parseInt(id)
          id = id > 0 && id < 115 ? id : 1;
          app.$store.commit('setCurrentSurah', id)
        }
      }

    }
  },
  computed: {
      currentSurahIsNotNull(){
        return this.$store.getters.getCurrentSurah !== null;
      },
      showChapters(){
        if(window.outerWidth < 992) {
          return this.$store.getters.getCurrentSurah === null;
        }
        
        return true;
      }
  },
  created(){
    var app = this;

    app.colorScheme();

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        app.colorScheme();
    });

    window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', e => {
        app.colorScheme();
    });

    app.fetchChapters();
    app.urlParamRoute();
  
  }
}
</script>